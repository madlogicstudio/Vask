'use client'

import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { useState, useEffect } from "react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/app/home/firebase/FirebaseConfig";

type HistoryTabProps = {
    isDark: boolean;
    activeTab: any;
}

type ReportData = {
    id: string;
    reportType: string;
    status: string;
    driverName: string;
    driverId: string;
    approvedAt: any;

    // Maintenance fields
    description?: string;
    cost?: string;

    // Fuel fields
    liters?: string;
    amount?: string;
};

type CompletedData = {
    id: string;
    completedAt: number;
    deliveryId: string;
    distance: number;
    dropoffAddress: any;
    pickupAddress: any;
    time: number;
    driverId: string;
    driverName: string;
    vehicleType?: string;
}

export const HistoryTab = ({isDark, activeTab}: HistoryTabProps) => {

    const isMobile = useIsMobile();
    const [operatorId, setOperatorId] = useState("");
    const [hubId, setHubId] = useState("");
    const [reports, setReports] = useState<ReportData[]>([]);
    const [completed, setCompleted] = useState<CompletedData[]>([]);

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //fetch hubs
    useEffect(() => {
        const fetchHubs = async () => {
            if (!user?.uid) return;

            try {
                const snap = await getDocs(
                    collection(
                        db,
                        "operators",
                        user.uid,
                        "hubs"
                    )
                );

                if (!snap.empty) {
                    setOperatorId(user.uid);
                    setHubId(snap.docs[0].id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchHubs();
    }, [user]);

    //fetchReports
    const fetchReports = async () => {
        if (!operatorId || !hubId) return;

        try {
            const snapshot = await getDocs(
                collection(
                    db,
                    "operators",
                    operatorId,
                    "hubs",
                    hubId,
                    "reports"
                )
            );

            setReports(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as ReportData[]
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [operatorId, hubId]);
    
    //fetchCompletedDeliveries
    const fetchCompletedDeliveries = async () => {
        if (!operatorId || !hubId) return;

        try {
            const snapshot = await getDocs(
                collection(
                    db,
                    "operators",
                    operatorId,
                    "hubs",
                    hubId,
                    "completed"
                )
            );

            const completedData = await Promise.all(
                snapshot.docs.map(async (completedDoc) => {
                    const data = completedDoc.data();

                    let vehicleType = "";

                    if (data.driverId) {
                        const driverSnap = await getDoc(
                            doc(
                                db,
                                "operators",
                                operatorId,
                                "hubs",
                                hubId,
                                "drivers",
                                data.driverId
                            )
                        );

                        if (driverSnap.exists()) {
                            vehicleType = driverSnap.data().vehicleType || "";
                        }
                    }

                    return {
                        id: completedDoc.id,
                        ...data,
                        vehicleType,
                        completedAt: data.completedAt?.toDate?.()?.getTime?.() ?? 0,
                    };
                })
            );

            setCompleted(completedData as CompletedData[]);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCompletedDeliveries();
    }, [operatorId, hubId]);


    //sortToNewest
    const activities = [
        ...reports.map(report => ({
            type: "report" as const,
            timestamp: report.approvedAt?.toDate?.().getTime?.() ?? 0,
            data: report,
        })),
        ...completed.map(delivery => ({
            type: "completed" as const,
            timestamp: delivery.completedAt ?? 0,
            data: delivery,
        })),
    ].sort((a, b) => b.timestamp - a.timestamp);

    return (    
        <>
            {activeTab == "history" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                ${isMobile? " overflow-y-auto hide-scrollbar" : "rounded-lg"}
                h-full w-full flex flex-col items-start justify-start p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>

                <span className={`${isMobile? "text-md" : "text-lg"} poppins font-semibold py-3`}>
                    Recent activities: 
                </span>

                {!isMobile && <div className="flex-1 w-full overflow-y-auto hide-scrollbar">
                    {activities.map((activity, index) =>

                        activity.type === "report" ? (
                            <div
                                key={`report-${activity.data.id}-${index}`}
                                className="flex flex-row items-start justify-end bg-[var(--primary-color)] rounded-lg p-[calc(0.6vw+0.4rem)] mb-3"
                            >
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <span>{activity.data.driverName}</span>
                                    </div>

                                    <div className="pt-1">
                                        {activity.data.reportType === "maintenance" ? (
                                            <div className="flex flex-col gap-1">
                                                <span>Description: {activity.data.description}</span>
                                                <span>Cost: ₱{activity.data.cost}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                <span>Liters: {activity.data.liters}</span>
                                                <span>Amount: ₱{activity.data.amount}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="pt-1">
                                        {activity.data.approvedAt?.toDate?.().toLocaleString()}
                                    </p>
                                </div>

                                <span
                                    className={`poppins bg-[var(--white-color)] text-sm px-[calc(0.6vw+0.4rem)] 
                                    py-[calc(0.4vw+0.3rem)] rounded-md ${
                                        activity.data.status === "approved"
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {activity.data.status === "approved"
                                        ? "Approved"
                                        : "Rejected"}
                                </span>
                            </div>
                        ) : (
                            <div
                                key={`completed-${activity.data.id}-${index}`}
                                className="flex flex-row items-start justify-between bg-[var(--primary-color)] rounded-lg p-[calc(0.6vw+0.4rem)] mb-3"
                            >
                                <div className="flex flex-col gap-1">
                                    <span>Driver Id: {activity.data.driverId}</span>
                                    <span>Driver Name: {activity.data.driverName}</span>
                                    <span>
                                        Delivery Id: {activity.data.deliveryId}
                                    </span>
                                    <span>
                                        Distance: {(activity.data.distance / 1000).toFixed(2)} Km
                                    </span>
                                </div>

                                <div className="self-stretch flex flex-col items-end">     
                                    <span className="poppins bg-[var(--white-color)] text-sm px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)] text-[color:var(--primary-color)] rounded-md">
                                        Completed
                                    </span>
                                    <span className="mt-auto">
                                        Completed At: {new Date(activity.data.completedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>}

                {isMobile && <div className="flex-1 w-full overflow-y-auto hide-scrollbar">
                    {activities.map((activity, index) =>
                        activity.type === "report" ? (
                        <div
                            key={`report-${activity.data.id}-${index}`}
                            className="
                            flex flex-col sm:flex-row
                            gap-3
                            items-start sm:items-start
                            justify-between
                            bg-[var(--primary-color)]
                            rounded-lg
                            p-3 md:p-[calc(0.6vw+0.4rem)]
                            mb-3
                            "
                        >
                            {/* LEFT CONTENT */}
                            <div className="w-full flex flex-col gap-2 text-sm md:text-base">
                            <span className="font-medium">
                                {activity.data.driverName}
                            </span>

                            <div className="flex flex-col gap-1">
                                {activity.data.reportType === "maintenance" ? (
                                <>
                                    <span>Description: {activity.data.description}</span>
                                    <span>Cost: ₱{activity.data.cost}</span>
                                </>
                                ) : (
                                <>
                                    <span>Liters: {activity.data.liters}</span>
                                    <span>Amount: ₱{activity.data.amount}</span>
                                </>
                                )}
                            </div>

                            <span className="text-xs md:text-sm opacity-80">
                                {activity.data.approvedAt?.toDate?.().toLocaleString()}
                            </span>
                            </div>

                            {/* STATUS BADGE */}
                            <span
                            className={`
                                poppins text-[12px] px-3 py-2 rounded-md self-start sm:self-auto
                                bg-[var(--white-color)]
                                ${
                                activity.data.status === "approved"
                                    ? "text-green-400"
                                    : "text-red-400"
                                }
                            `}
                            >
                            {activity.data.status === "approved" ? "Approved" : "Rejected"}
                            </span>
                        </div>
                        ) : (
                        <div
                            key={`completed-${activity.data.id}-${index}`}
                            className="
                            flex flex-col sm:flex-row
                            gap-3
                            justify-between
                            bg-[var(--primary-color)]
                            rounded-lg
                            p-3 md:p-[calc(0.6vw+0.4rem)]
                            mb-3
                            "
                        >
                            {/* LEFT CONTENT */}
                            <div className="flex flex-col gap-1 text-sm md:text-base">
                            <span>Driver Id: {activity.data.driverId}</span>
                            <span>Driver Name: {activity.data.driverName}</span>
                            <span>Delivery Id: {activity.data.deliveryId}</span>
                            <span>
                                Distance: {(activity.data.distance / 1000).toFixed(2)} Km
                            </span>
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="flex flex-col sm:items-end gap-2 text-sm md:text-base">
                            <span
                                className="
                                poppins bg-[var(--white-color)]
                                text-[12px] px-3 py-2 text-[color:var(--primary-color)]
                                rounded-md
                                self-start sm:self-auto
                                "
                            >
                                Completed
                            </span>

                            <span className="text-xs md:text-sm opacity-80">
                                Completed At:{" "}
                                {new Date(activity.data.completedAt).toLocaleString()}
                            </span>
                            </div>
                        </div>
                        )
                    )}
                </div>}

            </div>}
        </>
    )
}
