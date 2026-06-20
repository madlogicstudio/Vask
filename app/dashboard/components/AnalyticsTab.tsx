'use client'

import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { User } from "@/app/page"
import { useState, useEffect } from "react"
import { db } from "@/app/home/firebase/FirebaseConfig"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    ComposedChart,
    Area,
    Scatter,
    Legend,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

type AnalyticsTabProps = {
    isDark: boolean;
    activeTab: any;
    totalDrivers: any;
    totalDelivered: any;
    avgDeliveryTime: any;
    pending: any;
}

export const AnalyticsTab = ({isDark, activeTab, totalDrivers, totalDelivered, avgDeliveryTime, pending}: AnalyticsTabProps) => {

    const isMobile = useIsMobile();
    const [user, setUser] = useState<User | null>(null);
    const [hubId, setHubId] = useState("");

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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (activeTab === "analytics") {
            setMounted(true);
        }
    }, [activeTab]);

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
    
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (!user || !hubId) return;

        const unsubscribe = onSnapshot(
            collection(
                db,
                "operators",
                user.uid,
                "hubs",
                hubId,
                "reports"
            ),
            (snapshot) => {
                let sum = 0;

                snapshot.forEach((doc) => {
                    sum += Number(doc.data().cost) || 0;
                });

                setTotalCost(sum);
            }
        );

        return () => unsubscribe();
    }, [user, hubId]);

    //passTotalDriversData
    const driverData = [
        { month: "May", drivers: 0 },
        { month: "Jun", drivers: totalDrivers },
        { month: "Jul", drivers: 0 },
        { month: "Aug", drivers: 0 },
        { month: "Sep", drivers: 0 },
        { month: "Oct", drivers: 0 },
        { month: "Nov", drivers: 0 },
        { month: "Dec", drivers: 0 },
    ];

    //passsDeliveredData
    const deliveredData = [
        { month: "May", delivered: 0 },
        { month: "Jun", delivered: totalDelivered },
        { month: "Jul", delivered: 0 },
        { month: "Aug", delivered: 0 },
        { month: "Sep", delivered: 0 },
        { month: "Oct", delivered: 0 },
        { month: "Nov", delivered: 0 },
        { month: "Dec", delivered: 0 },
    ];

    //convertTimeBacktoServerTimeStamp
    const convertToMinutes = (time: string) => {
        const hours = Number(time.match(/(\d+)h/)?.[1] || 0);
        const minutes = Number(time.match(/(\d+)m/)?.[1] || 0);

        return hours * 60 + minutes;
    };

    //pasDeliverytimeData
    const deliveryTimeData = [
        {
            label: "Your Service",
            value: convertToMinutes(avgDeliveryTime),
            fill: isDark ? "#3B82F6" : "#455A64",
        },
        {
            label: "PH Average",
            value: 5760,
            fill: isDark ? "#455A64" : "#3B82F6",
        },
    ];

    //fetchResolvedLogs 
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const fetchReports = async () => {
        if (!user || !hubId) return;

        try {
            const reportData = await getDocs(
                collection(
                    db,
                    "operators",
                    user.uid,
                    "hubs",
                    hubId,
                    "reports"
                )
            );

            let approved = 0;
            let rejected = 0;

            reportData.forEach((doc) => {
                const status = doc.data().status;

                if (status === "approved") {
                    approved++;
                } else if (status === "rejected") {
                    rejected++;
                }
            });

            setApprovedCount(approved);
            setRejectedCount(rejected);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [user, hubId]);

    //passIssueData
    const reportStatusData = [
        {
            name: "Pending",
            value: pending,
            fill: isDark ? "#455A64" : "#3B82F6",
        },
        {
            name: "Approved",
            value: approvedCount,
            fill: isDark ? "#3B82F6" : "#455A64",
        },
        {
            name: "Rejected",
            value: rejectedCount,
            fill: "#EF4444", 
        },
    ];

    //fetchMaintenance&fuelCost
    const [maintenanceCost, setMaintenanceCost] = useState(0);
    const [fuelCost, setFuelCost] = useState(0);

    useEffect(() => {
        if (!user || !hubId) return;

        const fetchApprovedCosts = async () => {
            const snap = await getDocs(
                collection(db, "operators", user.uid, "hubs", hubId, "reports")
            );

            let maintenance = 0;
            let fuel = 0;

            snap.forEach((doc) => {
                const data = doc.data();

                if (data.status !== "approved") return;

                const type = data.reportType;

                if (type === "maintenance") {
                    maintenance += Number(data.cost) || 0;
                }

                if (type === "fuelLog") {
                    const liters = Number(data.liters) || 0;
                    const amount = Number(data.amount) || 0;

                    fuel += liters * amount;
                }
            });

            setMaintenanceCost(maintenance);
            setFuelCost(fuel);
        };

        fetchApprovedCosts();
    }, [user, hubId]);

    //passthedatahere
    const costData = [
        {
            name: "Approved costs this month",
            maintenance: maintenanceCost,
            fuel: fuelCost,
            total: maintenanceCost + fuelCost,
        },
    ];


    if (!mounted) return null;

    return (
        <>
            {activeTab == "analytics" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                ${isMobile? " overflow-y-auto hide-scrollbar" : "hide-scrollbar"}
                h-full w-full flex flex-col items-start justify-start rounded-lg p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>
                
                <div className="flex flex-row gap-3">

                    <div className="w-[400px] h-[400px] min-h-[400px] relative my-3 flex flex-col items-start justify-start gap-1">
                        <span className="poppins text-lg font-semibold pb-[calc(0.6vw+0.4rem)]">
                            Total Active Drivers:  
                        </span>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={driverData}>
                                <CartesianGrid
                                    stroke={isDark ? "#4B5563" : "#E5E7EB"}
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke={isDark ? "#FFFFFF" : "#000000"}
                                    tick={{ fill: isDark ? "#FFFFFF" : "#000000" }}
                                />

                                <YAxis
                                    stroke={isDark ? "#FFFFFF" : "#000000"}
                                    tick={{ fill: isDark ? "#FFFFFF" : "#000000" }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                                        border: isDark ? "1px solid #374151" : "1px solid #D1D5DB",
                                        color: isDark ? "#FFFFFF" : "#000000",
                                    }}
                                />

                                <Bar
                                    dataKey="drivers"
                                    fill={isDark ? "#3B82F6" : "#455A64"}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-[400px] h-[400px] min-h-[400px] relative my-3 flex flex-col items-start justify-start gap-1">
                        <span className="poppins text-lg font-semibold pb-[calc(0.6vw+0.4rem)]">
                            Total Delivered:
                        </span>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={deliveredData}>
                                <CartesianGrid
                                    stroke={isDark ? "#4B5563" : "#E5E7EB"}
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke={isDark ? "#FFFFFF" : "#000000"}
                                    tick={{ fill: isDark ? "#FFFFFF" : "#000000" }}
                                />

                                <YAxis
                                    stroke={isDark ? "#FFFFFF" : "#000000"}
                                    tick={{ fill: isDark ? "#FFFFFF" : "#000000" }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                                        border: isDark
                                            ? "1px solid #374151"
                                            : "1px solid #D1D5DB",
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="delivered"
                                    stroke={isDark ? "#3B82F6" : "#455A64"}
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-[400px] h-[400px] min-h-[400px] relative my-3 flex flex-col gap-1">
                        <span className="poppins text-lg font-semibold">
                            Total Pending Issues: 
                        </span>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={reportStatusData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                />

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div className="flex flex-row gap-3">

                    <div className="w-[400px] h-[400px] min-h-[400px] relative my-3 flex flex-col gap-1">
                        <span className="poppins text-lg font-semibold">
                            Average Delivery Time Comparison
                        </span>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deliveryTimeData}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                                        border: isDark
                                            ? "1px solid #374151"
                                            : "1px solid #D1D5DB",
                                        color: isDark ? "#FFFFFF" : "#000000",
                                    }}
                                />

                                <Legend
                                    wrapperStyle={{
                                        color: isDark ? "#FFFFFF" : "#000000",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <span className="text-sm opacity-70">
                            Philippine parcel delivery benchmark: approximately 4 business days nationwide via Transportify Philippines and major courier delivery estimates.
                        </span>
                    </div>
                    
                    <div className="w-[400px] h-[400px] min-h-[400px] relative my-3 flex flex-col gap-1">
                        <span className="poppins text-lg font-semibold mb-3">
                            Approved Costs:
                        </span>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={costData}>
                                
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />
                                <YAxis />

                                <Tooltip />
                                <Legend />

                                <Bar dataKey="maintenance" fill="#3B82F6" name="Maintenance Cost" />
                                <Bar dataKey="fuel" fill="#F59E0B" name="Fuel Cost" />

                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    name="Total Cost"
                                />

                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                </div>
        
            </div>}
        </>
    )
}
