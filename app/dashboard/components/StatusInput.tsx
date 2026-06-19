'use client'

import { User } from "@/app/page";
import { useEffect, useState } from "react";
import { db } from "@/app/home/firebase/FirebaseConfig";
import { getDocs, collection, doc, getDoc, query, where } from "firebase/firestore";

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
        <div className={`${isDark? "border-[var(--dashboard-light)]" : "border-[var(--dashboard-dark)]"}
            w-full flex flex-row items-center justify-start p-3 border-b border-gray-500`}>
            <span className="poppins w-[300px] text-lg text-center">
                {id}
            </span>
            <div className="flex-1 flex flex-row items-center justify-start gap-3">

                <i className={`
                    ${vehicleType === "motorcycle" ? "bx bx-motorcycle text-[32px] text-white p-3 bg-[var(--primary-color)] rounded-lg cursor-pointer" : ""}
                    ${vehicleType === "car" ? "bx bx-car text-[32px] text-white p-3 bg-[var(--pink-color)] rounded-lg cursor-pointer" : ""}
                    ${vehicleType === "truck" ? "bx bx-truck text-[32px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                    ${vehicleType === "van" ? "bx bx-van text-[32px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
                    `} />

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
        </div>
    )
}
