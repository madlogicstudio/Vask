'use client'

import { User } from "@/app/page";
import { useEffect, useState } from "react";
import { db } from "@/app/home/firebase/FirebaseConfig";
import { getDocs, collection, doc, getDoc, query, where } from "firebase/firestore";
import { useIsMobile } from "@/app/home/hooks/useIsMobile";

type StatusInputProps = {
    isDark: boolean;
    id: string;
    from: string;
    to: string;
    status: string;
    time: any;
    driverName: string;
    driverId: string;
}

export const StatusInput = ({isDark, id, from, to, status, time, driverName, driverId}: StatusInputProps) => {

    const isMobile = useIsMobile();
    const [user, setUser] = useState<User | null>(null);
    const [parcelStatus, setParcelStatus] = useState("intransit");
    const [hubId, setHubId] = useState("");
    const [vehicleType, setVehicleType] = useState<string>("motorcycle");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
    
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    
    useEffect(() => {
        console.log(
            `User Profile: Id:${user?.uid}, Email:${user?.email}, 
            Driver Ids: ${driverId}`
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

    useEffect(() => {
        if (!user || !hubId || !driverId) return;

        const fetchDriver = async () => {
            try {
                const q = query(
                    collection(db, "operators", user.uid, "hubs", hubId, "drivers"),
                    where("driverId", "==", driverId)
                );

                const snap = await getDocs(q);

                if (!snap.empty) {
                    const data = snap.docs[0].data();
                    setVehicleType(data.vehicleType ?? "motorcycle");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchDriver();
    }, [user, hubId, driverId]);

    return (
        <>
            {!isMobile && <div className={`${isDark? "border-[var(--dashboard-light)]" : "border-[var(--dashboard-dark)]"}
                ${isMobile? "overflow-x-scroll hide-scrollbar p-2" : "p-3"}
                w-full flex flex-row items-center justify-start border-b border-gray-500`}>
                {!isMobile && <span className="poppins w-[300px] text-lg text-center">
                    {id}
                </span>}

                {isMobile && <div className="w-[80px] flex flex-col items-center justify-center gap-3 border border-white">
                    <span className="poppins text-sm text-center">
                        {id}
                    </span>
                    <i className={`
                        ${vehicleType === "motorcycle" ? "bx bx-motorcycle text-[26px] text-white p-3 bg-[var(--primary-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "car" ? "bx bx-car text-[26px] text-white p-3 bg-[var(--pink-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "truck" ? "bx bx-truck text-[26px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "van" ? "bx bx-van text-[2px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                    `} />
                </div>}

                <div className="flex-1 flex flex-row items-center justify-start gap-3">

                    {!isMobile && <i className={`
                        ${vehicleType === "motorcycle" ? "bx bx-motorcycle text-[32px] text-white p-3 bg-[var(--primary-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "car" ? "bx bx-car text-[32px] text-white p-3 bg-[var(--pink-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "truck" ? "bx bx-truck text-[32px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                        ${vehicleType === "van" ? "bx bx-van text-[32px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                        `} />}

                    <span className="poppins text-lg  text-center">
                        {from}
                    </span>
                    <i className="bx bx-arrow-right text-[32px]" />
                    <span className="poppins text-lg text-center">
                        {to}
                    </span>
                </div>
                <div className="w-[300px] flex flex-row items-center justify-center">
                    <span className={`
                        ${parcelStatus === "intransit" ? "poppins p-3 text-md text-center text-blue-200 bg-blue-900 rounded-md cursor-pointer" : ""}
                        ${parcelStatus === "delivered" ? "poppins p-3 text-md text-center text-green-200 bg-green-900 rounded-md cursor-pointer" : ""}
                        ${parcelStatus === "canceled" ? "poppins p-3 text-md text-center text-red-200 bg-red-900 rounded-md cursor-pointer" : ""}
                        `}>
                        {status}
                        
                    </span>
                </div>
                
                <span className="poppins w-[300px] text-lg text-center">
                    {time?.toDate?.().toLocaleString()}
                </span>
            </div>}

            {isMobile && <div
                className={`
                w-full border-b border-gray-500
                ${isDark ? "border-[var(--dashboard-light)]" : "border-[var(--dashboard-dark)]"}
                p-3
                `}
            >
                <div
                className={`
                    flex flex-col md:flex-row md:items-center md:justify-between
                    gap-3
                `}
                >
                {/* ID + Vehicle */}
                <div className="flex items-center gap-3 md:w-[180px]">
                    <i
                    className={`
                        bx text-[26px] md:text-[32px] text-white p-2 md:p-3 rounded-lg
                        ${
                        vehicleType === "motorcycle"
                            ? "bx-motorcycle bg-[var(--primary-color)]"
                            : vehicleType === "car"
                            ? "bx-car bg-[var(--pink-color)]"
                            : vehicleType === "truck"
                            ? "bx-truck bg-[var(--blue-color)]"
                            : "bx-van bg-[var(--blue-color)]"
                        }
                    `}
                    />
                    <span className="poppins text-sm md:text-lg text-center">
                        {id}
                    </span>
                </div>

                {/* Route */}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-1">
                    <span className="poppins text-sm md:text-lg text-center">
                    {from}
                    </span>

                    <i className="bx bx-arrow-right text-[24px] md:text-[32px]" />

                    <span className="poppins text-sm md:text-lg text-center">
                    {to}
                    </span>
                </div>

                {/* Status */}
                <div className="flex justify-center md:w-[180px]">
                    <span
                    className={`
                        poppins px-3 py-2 text-sm md:text-md text-center rounded-md
                        ${
                        parcelStatus === "intransit"
                            ? "text-blue-200 bg-blue-900"
                            : status === "delivered"
                            ? "text-green-200 bg-green-900"
                            : "text-red-200 bg-red-900"
                        }
                    `}
                    >
                    {status}
                    </span>
                </div>

                {/* Time */}
                <div className="md:w-[200px] text-center">
                    <span className="poppins text-sm md:text-lg">
                    {time?.toDate?.().toLocaleString()}
                    </span>
                </div>
                </div>
            </div>}
        </>
    )
}
