'use client'

import type { User } from "../../page"
import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { useEffect, useState } from "react"
import { getDocs, collection, onSnapshot } from "firebase/firestore"
import { db } from "@/app/home/firebase/FirebaseConfig"

type DriverTabProps = {
    isDark: boolean;
    activeTab: any;
}

export const DriverTab = ({isDark, activeTab}: DriverTabProps) => {

    const isMobile = useIsMobile();
    const [user, setUser] = useState<User | null>(null);
    const [hubId, setHubId] = useState("");
    const [drivers, setDrivers] = useState<any[]>([]);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
    
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    
    useEffect(() => {
        console.log(
            `User Profile: Id:${user?.uid}, Email:${user?.email}`
        )
    }, [user]);

    //fetch hubid
    useEffect(() => {
        if (!user) return;

        const fetchHub = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "operators", user.uid, "hubs")
                );

                if (!snapshot.empty) {
                    const hubDoc = snapshot.docs[0];

                    setHubId(hubDoc.id);
                }
            } catch (error) {
                console.error("Error fetching hub:", error);
            }
        };

        fetchHub();
    }, [user]);

    //fetchDrivers
    useEffect(() => {
        if (!user || !hubId) return;

        const ref = collection(
            db,
            "operators",
            user.uid,
            "hubs",
            hubId,
            "drivers"
        );

        const unsub = onSnapshot(ref, (snapshot) => {
            const driverList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setDrivers(driverList);
        });

        return () => unsub();
    }, [user, hubId]);

    return (
        <>
            {activeTab == "drivers" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                ${isMobile? " overflow-y-auto hide-scrollbar" : ""}
                h-full w-full flex flex-col items-start justify-start rounded-lg p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>
                
                <span className="poppins text-lg font-semibold pb-[calc(0.6vw+0.4rem)]">
                    Active Drivers:  
                </span>

                {drivers.map((driver) => (
                    <div key={driver.id}>
                        <p>{driver.driverName}</p>
                        <p>{driver.vehicleType}</p>
                    </div>
                ))}

            </div>}
        </>
    )
}
