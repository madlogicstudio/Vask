'use client'

import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { useEffect, useState } from "react";
import { db, auth } from "@/app/home/firebase/FirebaseConfig";
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc, serverTimestamp, addDoc } from "firebase/firestore";

type ReportsTabProps = {
    isDark: boolean;
    activeTab: any;
}

type MaintenanceData = {
    id: string;
    description: string;
    cost: string;
    maintenanceImg: string;
    status: string;
    driverName: string;
    driverId: string;
};

type FuelLogData = {
    id: string;
    liters: string;
    amount: string;
    fuelLogImg: string;
    status: string;
    driverName: string;
    driverId: string;
};

function ReportsTab({isDark, activeTab }: ReportsTabProps) {

    const isMobile = useIsMobile();

    const [maintenanceData, setMaintenanceData] = useState<MaintenanceData[]>([]);
    const [fuelLogData, setFuelLogData] = useState<FuelLogData[]>([]);
    const [operatorId, setOperatorId] = useState("");
    const [hubId, setHubId] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

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

    //fetchmaintenance&fuel
    const fetchReports = async () => {
        if (!operatorId || !hubId) return;

        const maintenanceSnapshot = await getDocs(
            collection(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "maintenance"
            )
        );

        setMaintenanceData(
            maintenanceSnapshot.docs.map((doc) => ({
                id: doc.id,
                description: doc.data().description || "",
                cost: doc.data().cost || "",
                maintenanceImg: doc.data().maintenanceImg || "",
                status: doc.data().pending || "",
                driverName: doc.data().driverName || "",
                driverId: doc.data().driverId || ""
            }))
        );

        const fuelSnapshot = await getDocs(
            collection(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "fuelLog"
            )
        );

        setFuelLogData(
            fuelSnapshot.docs.map((doc) => ({
                id: doc.id,
                liters: doc.data().liters || "",
                amount: doc.data().amount || "",
                fuelLogImg: doc.data().fuelLogImg || "",
                status: doc.data().pending || "",
                driverName: doc.data().driverName || "",
                driverId: doc.data().driverId || ""
            }))
        );
    };

    useEffect(() => {
        fetchReports();
    }, [operatorId, hubId]);

    //approvedMaintenance
    const approveMaintenance = async (maintenanceId: string) => {
        if (!operatorId || !hubId) return;

        try {
            // Reference to maintenance document
            const maintenanceRef = doc(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "maintenance",
                maintenanceId
            );

            const maintenanceSnap = await getDoc(maintenanceRef);

            if (!maintenanceSnap.exists()) return;

            const maintenanceData = maintenanceSnap.data();

            // Save to reports collection
            await addDoc(
                collection(
                    db,
                    "operators",
                    operatorId,
                    "hubs",
                    hubId,
                    "reports",
                ),               
                {
                    ...maintenanceData,
                    reportType: "maintenance",
                    status: "approved",
                    approvedAt: serverTimestamp()
                }
            );

            // Delete from maintenance collection
            await deleteDoc(maintenanceRef);

            // Refresh UI
            fetchReports();

        } catch (error) {
            console.error(error);
        }
    };

    //approvedFuelLog
    const approveFuelLog = async (fuelLogId: string) => {
        const fuelRef = doc(
            db,
            "operators",
            operatorId,
            "hubs",
            hubId,
            "fuelLog",
            fuelLogId
        );

        const fuelSnap = await getDoc(fuelRef);

        if (!fuelSnap.exists()) return;

        await addDoc(
            collection(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "reports",
            ),
            {
                ...fuelSnap.data(),
                reportType: "fuelLog",
                status: "approved",
                approvedAt: serverTimestamp()
            }
        );

        await deleteDoc(fuelRef);

        fetchReports();
    };

    //rejectedMaintenance
    const rejectMaintenance = async (maintenanceId: string) => {
        if (!operatorId || !hubId) return;

        try {
            // Reference to maintenance document
            const maintenanceRef = doc(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "maintenance",
                maintenanceId
            );

            const maintenanceSnap = await getDoc(maintenanceRef);

            if (!maintenanceSnap.exists()) return;

            const maintenanceData = maintenanceSnap.data();

            // Save to reports collection
            await addDoc(
                collection(
                    db,
                    "operators",
                    operatorId,
                    "hubs",
                    hubId,
                    "reports",
                ),               
                {
                    ...maintenanceData,
                    reportType: "maintenance",
                    status: "rejected",
                    approvedAt: serverTimestamp()
                }
            );

            // Delete from maintenance collection
            await deleteDoc(maintenanceRef);

            // Refresh UI
            fetchReports();

        } catch (error) {
            console.error(error);
        }
    };

    //rejectedFuelLog
    const rejectFuelLog = async (fuelLogId: string) => {
        const fuelRef = doc(
            db,
            "operators",
            operatorId,
            "hubs",
            hubId,
            "fuelLog",
            fuelLogId
        );

        const fuelSnap = await getDoc(fuelRef);

        if (!fuelSnap.exists()) return;

        await addDoc(
            collection(
                db,
                "operators",
                operatorId,
                "hubs",
                hubId,
                "reports",
            ),
            {
                ...fuelSnap.data(),
                reportType: "fuelLog",
                status: "rejected",
                approvedAt: serverTimestamp()
            }
        );

        await deleteDoc(fuelRef);

        fetchReports();
    };

    return (
        <>
            {activeTab == "reports" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                ${isMobile? " overflow-y-auto hide-scrollbar" : ""}
                h-full w-full flex flex-row items-center justify-start rounded-lg p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>
                
                <div className="flex-1 h-full flex flex-col items-start justify-start">
                    
                    <span className="poppins text-lg font-semibold pb-[calc(0.6vw+0.4rem)]">
                        Fuel Log :
                    </span>

                    <div className="flex-1 w-full overflow-y-auto hide-scrollbar">

                        <div className="w-full flex flex-col gap-3">
                            {fuelLogData.map((item) => (

                                <div key={item.id} className="flex flex-col bg-[var(--primary-color)] rounded-lg">

                                    <div
                                          className="p-[calc(0.6vw+0.4rem)] flex flex-row justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                <span>Liters:</span>
                                                <span>{item.liters}</span>
                                            </div>

                                            <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                <span>Amount:</span>
                                                <span>₱{item.amount}</span>
                                            </div>

                                            <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                <span>Status: </span>
                                                <span>{item.status}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end gap-1">
                                            {item.fuelLogImg && (
                                                <span
                                                    className="text-[color:var(--pink-color)] underline cursor-pointer"
                                                    onClick={() => setSelectedImage(item.fuelLogImg)}
                                                >
                                                    View Receipt
                                                </span>
                                            )}
                                            <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                <span>{item.driverId}</span>
                                            </div>

                                            <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                <span>{item.driverName}</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full flex flex-row justify-end p-[calc(0.6vw+0.4rem)] pt-0 gap-3">
                                        <span className="poppins bg-[var(--blue-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                                            py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md"
                                            onClick={() => approveFuelLog(item.id)}>
                                            Approve
                                        </span>
                                        <span className="poppins bg-[var(--red-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                                            py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md"
                                             onClick={() => rejectFuelLog(item.id)}>
                                            Reject
                                        </span>
                                    </div>

                                </div>
                                
                            ))}

                        </div>

                    </div>

                </div>

                <div className="flex-1 h-full flex flex-col items-start justify-start">
                    
                    <span className="poppins text-lg font-semibold pb-[calc(0.6vw+0.4rem)]">
                        Maintenance Log :
                    </span>

                    <div className="flex-1 w-full overflow-y-auto hide-scrollbar">

                        <div className="w-full flex flex-col gap-3">

                                {maintenanceData.map((item) => (

                                    <div key={item.id} className="flex flex-col bg-[var(--primary-color)] rounded-lg">

                                        <div
                                            className="p-[calc(0.6vw+0.4rem)] flex flex-row justify-between">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                    <span>{item.description}</span>
                                                </div>

                                                <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                    <span>Amount:</span>
                                                    <span>₱{item.cost}</span>
                                                </div>

                                                <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                    <span>Status: </span>
                                                    <span>{item.status}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-1">
                                                {item.maintenanceImg && (
                                                    <span
                                                        className="text-[color:var(--pink-color)] underline cursor-pointer"
                                                        onClick={() => setSelectedImage(item.maintenanceImg)}
                                                    >
                                                        View Receipt
                                                    </span>
                                                )}
                                                <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                    <span>{item.driverId}</span>
                                                </div>

                                                <div className="flex flex-row items-center gap-[calc(0.4vw+0.3rem)]">
                                                    <span>{item.driverName}</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="w-full flex flex-row justify-end p-[calc(0.6vw+0.4rem)] pt-0 gap-3">
                                            <span className="poppins bg-[var(--blue-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                                                py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md"
                                                onClick={() => approveMaintenance(item.id)}>
                                                Approve
                                            </span>
                                            <span className="poppins bg-[var(--red-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                                                py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md"
                                                 onClick={() => rejectMaintenance(item.id)}>
                                                Reject
                                            </span>
                                        </div>

                                    </div>
                                    
                                ))}
                            
                        </div>

                    </div>

                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setSelectedImage("")}
                    >
                        <div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="absolute top-[-10px] right-[-12px] h-9 w-9 bg-[var(--primary-color)] rounded-full
                                    flex flex-col items-center justify-center"
                                onClick={() => setSelectedImage("")}
                            >
                                <i className="bx bx-x text-[24px]" />
                            </div>

                            <img
                                src={selectedImage}
                                alt="Receipt"
                                className="max-h-[80vh] max-w-full "
                            />
                        </div>
                    </div>
                )}

            </div>}
        </>
    )
}

export default ReportsTab