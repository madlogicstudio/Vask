'use client'

import type { User } from "../page"
import { SideNav } from "./components/SideNav"
import Error from '../home/assets/404.png'
import { useIsMobile } from "../home/hooks/useIsMobile"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import DashboardCard from "./components/DashboardCard"
import LiveStatus from "./components/LiveStatus"

function page() {

  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(true);
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isHue, setIsHue] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log(
      `Logged user: Id:${user?.uid}, Email:${user?.email}`
    )
  }, [user]);

  if(user?.uid) return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-start justify-start scroll-smooth p-[calc(0.6vw+0.4rem)]`}>
        
        {/* colors used */}
        {isHue && <div className={`h-screen w-full flex flex-col items-center justify-center scroll-smooth gap-[calc(0.6vw+0.4rem)]
          bg-white text-[var(--dark-color)]`}>

          <span className={`${isMobile? "w-[320px] p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"} 
            text-[length:var(--small-font)] font-semibold text-center`}>
            Dashboard Palette
          </span>

          <div className="flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)]">
            <div title="#141414" className="flex flex-col items-center justify-center bg-[var(--dashboard-dark)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#333333" className="flex flex-col items-center justify-center bg-[var(--dashboard-primary)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#777777" className="flex flex-col items-center justify-center bg-[var(--dashboard-secondary)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#ededed" className="flex flex-col items-center justify-center bg-[var(--dashboard-light)] rounded-lg p-12 cursor-pointer"></div>
          </div>

          <div className="flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)]">
            <div title="#455A64" className="flex flex-col items-center justify-center bg-[var(--primary-color)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#597683" className="flex flex-col items-center justify-center bg-[var(--secondary-color)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#576A8F" className="flex flex-col items-center justify-center bg-[var(--blue-color)] rounded-lg p-12 cursor-pointer"></div>
            <div title="#EA7B7B" className="flex flex-col items-center justify-center bg-[var(--pink-color)] rounded-lg p-12 cursor-pointer"></div>
          </div>

        </div>}

        {/* dashboard */}

        {!isHue && <div className="h-full w-full flex flex-row items-center justify-center gap-3">

          <SideNav isDark={isDark} setIsDark={setIsDark}/>

          <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
            flex-1 h-full w-full flex flex-col items-center justify-start rounded-lg overflow-y-scroll`}>
            
            <div className="w-full flex flex-row items-center justify-center gap-3 p-3 flex-wrap">
              <DashboardCard isDark={isDark} title={"Total Shipments"} count={"12,345"} trend={"up"} percent={"32%"} icon="cube"/>
              <DashboardCard isDark={isDark} title={"On-Time Delivery"} count={"94.2%"} trend={"up"} percent={"0.5%"} icon="check-circle"/>
              <DashboardCard isDark={isDark} title={"Active Alerts"} count={"23"} trend={"down"} percent={"0.8%"} icon="alert-triangle"/>
              <DashboardCard isDark={isDark} title={"Avg. Transit Time"} count={"3.2d"} trend={"up"} percent={"0.8%"} icon="clock-5"/>
            </div>
            
            <div className="h-full w-full flex flex-row items-center justify-center gap-3 p-3">
              <LiveStatus isDark={isDark} />
            </div>
            
          </div>

        </div>}

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