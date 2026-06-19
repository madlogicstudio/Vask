'use client'

import type { User } from "../page"
import { SideNav } from "./components/SideNav"
import Error from '../home/assets/404.png'
import { useIsMobile } from "../home/hooks/useIsMobile"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import DashboardCard from "./components/DashboardCard"
import LiveStatus from "./components/LiveStatus"
import { CreateHub } from "./components/CreateHub"
import { db } from "../home/firebase/FirebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { CreateChat } from "./components/CreateChat"
import ReportsTab from "./components/ReportsTab"
import { HistoryTab } from "./components/HistoryTab"
import { DriverTab } from "./components/DriverTab"

type InTransitData = {
  id: string;
  deliveryData: {
    pickupAdress: string;
    deliveryId: string;
    dropoffAddress: string;
    distance: number;
    time: any;
    driverName: string;
    driverId: string;
  };
};

function page() {

  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(true);
  const isMobile = useIsMobile();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hubName, setHubName] = useState("");
  const [hubId, setHubId] = useState("");
  const [loading, setLoading] = useState(true);
  const [inTransitData, setInTransitData] = useState<InTransitData[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //fetch hubs
  useEffect(() => {
    const fetchHubs = async () => {
      const uid = user?.uid;
      if (!uid) return;

      try {
          const snap = await getDocs(
              collection(db, "operators", uid, "hubs")
          );

          const hubs = snap.docs.map(doc => ({
              id: doc.id,
                ...(doc.data() as { hubName: string; createdAt?: any })

          }));

          console.log("Hubs:", hubs);

          //set first hub as active 
          if (hubs.length > 0) {
              setHubName(hubs[0].hubName);
              console.log("Hub: ", hubName);
          }

          setHubId(hubs[0].id);

          const deliveries = snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
          }));

          console.log(deliveries);
          // setInTransitData(deliveries);

      } catch (error) {
          console.error("Error fetching hubs:", error);
      }
    };
    fetchHubs();
  }, [user]);

  useEffect(() => {
    console.log(
      `Logged user: Id:${user?.uid}, Email:${user?.email}`
    )
  }, [user]);

  //fetchDrivers
  const [driverIds, setDriverIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      if (!user?.uid) return;

      try {
        const snap = await getDocs(
          collection(db, "operators", user.uid, "drivers")
        );

        const ids = snap.docs.map(doc => doc.id);

        setDriverIds(ids);

        console.log("Driver IDs:", driverIds);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, [user]);

  //fetchIntransits
  
    useEffect(() => {
      const fetchInTransits = async () => {
          if (!user?.uid || !hubId) return;

          try {
              const snap = await getDocs(
                  collection(
                      db,
                      "operators",
                      user.uid,
                      "hubs",
                      hubId,
                      "inTransit"
                  )
              );

              const deliveries = snap.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
              })) as InTransitData[];

              console.log("InTransit Data:", deliveries);

              setInTransitData(deliveries);

          } catch (error) {
              console.error("Error fetching inTransit collection:", error);
          }
      };

      fetchInTransits();
  }, [user, hubId]);


  if (loading) {
    return (
      <div className={`w-screen h-screen flex flex-col items-center justify-center bg-white gap-[calc(0.6vw+0.4rem)]`}>

        <div className={`h-[360px] w-[360px] md:h-[600px] md:w-[600px]
            flex flex-col items-center justify-center`}>
          <video autoPlay muted loop playsInline className="h-full w-full object-contain">
            <source src="Catronaut.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`w-16 h-16 md:w-24 md:h-24
          border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin`}></div>
        
      </div>
    )
  }

  if(user?.uid) return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-start justify-start scroll-smooth p-[calc(0.6vw+0.4rem)]`}>
  

        {/* dashboard */}

        <div className="h-full w-full flex flex-row items-center justify-center gap-3">

          <SideNav isDark={isDark} setIsDark={setIsDark} setActiveTab={setActiveTab} hubName={hubName} setHubName={setHubName}/>

          {activeTab == "dashboard" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            ${isMobile? "overflow-y-scroll hide-scrollbar" : ""}
            flex-1 h-full w-full flex flex-col items-center justify-start rounded-lg`}>

            {!hubName && <CreateHub />}
            
            {hubName && <div className="w-full flex flex-row items-center justify-center gap-3 p-3 flex-wrap">
              <DashboardCard isDark={isDark} title={"Total Shipments"} count={"12,345"} trend={"up"} percent={"32%"} icon="cube"/>
              <DashboardCard isDark={isDark} title={"On-Time Delivery"} count={"94.2%"} trend={"up"} percent={"0.5%"} icon="check-circle"/>
              <DashboardCard isDark={isDark} title={"Active Alerts"} count={"23"} trend={"down"} percent={"0.8%"} icon="alert-triangle"/>
              <DashboardCard isDark={isDark} title={"Avg. Transit Time"} count={"3.2d"} trend={"up"} percent={"0.8%"} icon="clock-5"/>
            </div>}
            
            {hubName && <div className="h-full w-full flex flex-row items-center justify-center gap-3 p-3">
              <LiveStatus isDark={isDark} inTransitData={inTransitData}/>
            </div>}
            
          </div>}

          {activeTab == "history" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg overflow-y-scroll`}>

            <HistoryTab isDark={isDark} activeTab={activeTab}/>
            
          </div>}

          {activeTab == "drivers" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg overflow-y-scroll`}>

            <DriverTab isDark={isDark} activeTab={activeTab}/>
            
          </div>}

          {activeTab == "reports" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg`}>

            <ReportsTab isDark={isDark} activeTab={activeTab} />

          </div>}

          {activeTab == "analytics" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg overflow-y-scroll`}>

            Analytics Tab
            
          </div>}

          {activeTab == "chat" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg`}>

            <CreateChat isDark={isDark} hubName={hubName} />

          </div>}

          {activeTab == "settings" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-center rounded-lg overflow-y-scroll`}>

            Settings Tab
            
          </div>}

        </div>

    </div>
  )

  return(
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-center justify-center scroll-smooth`}>
        
        <img src={Error.src} className={`${isMobile? "h-[420px] w-[420px]" : "h-[620px] w-[620px]"}`} alt="" />

        <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
          ${isMobile? "w-[320px] p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
          cursor-pointer rounded-full text-center`}
          onClick={() => router.push('/')}>
          Go back
        </span>
    </div>
  )

}

export default page