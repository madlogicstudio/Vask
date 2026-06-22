'use client'

import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { User } from "@/app/page"
import { useState, useEffect } from "react"
import { db } from "@/app/home/firebase/FirebaseConfig"
import { doc, collection, getDocs, onSnapshot, setDoc, query, where, getDoc } from "firebase/firestore"
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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [totalFuelCost, setTotalFuelCost] = useState(0);
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

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

    //getTripsandDistance
    useEffect(() => {
        if (!user || !hubId) return;

        const fetchCompleted = async () => {
            const snap = await getDocs(
            collection(db, "operators", user.uid, "hubs", hubId, "completed")
            );

            const now = new Date();
            const m = now.getMonth();
            const y = now.getFullYear();

            let trips = 0;
            let distance = 0;

            snap.forEach((doc) => {
            const data = doc.data();

            const date = data.completedAt?.toDate?.();
            if (!date) return;

            if (date.getMonth() !== m || date.getFullYear() !== y) return;

            trips += 1;
            distance += Number(data.distance || 0);
            });

            setTotalTrips(trips);
            setTotalDistance(distance);
        };

        fetchCompleted();
    }, [user, hubId]);

    //fetchtotalFuelconsumption
    useEffect(() => {
        if (!user || !hubId) return;

        const fetchFuelCost = async () => {
            const snap = await getDocs(
            query(
                collection(db, "operators", user.uid, "hubs", hubId, "reports"),
                where("status", "==", "approved"),
                where("reportType", "==", "fuelLog")
            )
            );

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            let fuelTotal = 0;

            snap.forEach((doc) => {
            const data = doc.data();

            const date = data.approvedAt?.toDate?.();
            if (!date) return;

            // filter THIS MONTH
            if (
                date.getMonth() !== currentMonth ||
                date.getFullYear() !== currentYear
            ) return;

            // your fuel formula (same as earlier logic)
            const liters = Number(data.liters || 0);
            const amount = Number(data.amount || 0);

            fuelTotal += liters * amount;
            });

            setTotalFuelCost(fuelTotal);
        };

        fetchFuelCost();
    }, [user, hubId]);

    //fetchResolvedLogs 
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    useEffect(() => {
        if (!user || !hubId) return;

        const ref = collection(
            db,
            "operators",
            user.uid,
            "hubs",
            hubId,
            "reports"
        );

        const unsub = onSnapshot(ref, (snapshot) => {
            let approved = 0;
            let rejected = 0;

            snapshot.forEach((doc) => {
                const status = doc.data().status;

                if (status === "approved") approved++;
                if (status === "rejected") rejected++;
            });

            setApprovedCount(approved);
            setRejectedCount(rejected);

        });

        return () => unsub();
    }, [user, hubId, selectedMonth, selectedYear]);

    //addtoAnalytics

    useEffect(() => {
        if (!user || !hubId) return;

        const now = new Date();
        const docId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        const reportRef = doc(
            db,
            "operators",
            user.uid,
            "hubs",
            hubId,
            "analytics",
            docId
        );

        setDoc(reportRef, {
            approved: approvedCount,
            rejected: rejectedCount,
            updatedAt: new Date(),
        }, { merge: true });

    }, [approvedCount, rejectedCount, user, hubId]);

    //passIssueData

    const isEmpty = approvedCount === 0 && rejectedCount === 0;

    const reportStatusData = isEmpty
    ? [
        {
            name: "No Data",
            value: 1,
            fill: "rgba(0,0,0,0.05)",
        },
        ]
    : [
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
    const [fuelByDay, setFuelByDay] = useState<{ date: string; fuel: number }[]>([]);

    useEffect(() => {
        if (!user || !hubId) return;

        const fetchFuelCosts = async () => {
            const q = query(
                collection(db, "operators", user.uid, "hubs", hubId, "reports"),
                where("status", "==", "approved"),
                where("reportType", "==", "fuelLog")
            );

            const snap = await getDocs(q);

            const year = selectedYear;
            const month = selectedMonth;

            // get last day of selected month
            const lastDay = new Date(year, month + 1, 0).getDate();

            const fuelMap: Record<number, number> = {};

            // 1 → last day
            for (let day = 1; day <= lastDay; day++) {
                fuelMap[day] = 0;
            }

            snap.forEach((d) => {
                const data = d.data();

                const date = data.approvedAt?.toDate?.();
                if (!date) return;

                // filter selected month/year
                if (
                    date.getFullYear() !== year ||
                    date.getMonth() !== month
                ) return;

                const day = date.getDate();

                const liters = Number(data.liters) || 0;
                const amount = Number(data.amount) || 0;

                fuelMap[day] += liters * amount;
            });

            const result = Object.keys(fuelMap).map((day) => ({
                date: `${months[month]} ${day}`,
                fuel: fuelMap[Number(day)],
            }));

            setFuelByDay(result);
        };
    
        fetchFuelCosts();
    }, [user, hubId, selectedMonth, selectedYear]);


    //fetchSelectedMonthAndYear
    const selectedDocId = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}`;

    useEffect(() => {
        if (!user || !hubId) return;

        const fetchAnalytics = async () => {
            const ref = doc(
                db,
                "operators",
                user.uid,
                "hubs",
                hubId,
                "analytics",
                selectedDocId
            );

            const snap = await getDoc(ref);

            if (snap.exists()) {
                const data = snap.data();
                setApprovedCount(data.approved || 0);
                setRejectedCount(data.rejected || 0);
            } else {
                setApprovedCount(0);
                setRejectedCount(0);
            }
        };

        fetchAnalytics();
    }, [user, hubId, selectedDocId]);

    if (!mounted) return null;

    return (
        <>
            {activeTab == "analytics" && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                ${isMobile? " overflow-y-auto hide-scrollbar" : "hide-scrollbar"}
                h-full w-full flex flex-col items-start justify-start rounded-lg p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>
                
                {/* display */}
                <div className={`${isMobile? "flex-col" : "flex-row"} 
                    w-full flex items-start justify-between`}>

                    {isMobile && <div className="h-full w-full flex flex-col items-center justify-center gap-3 my-6">
                        <div className={`${isMobile? "w-full justify-center" : ""}
                            flex flex-row gap-3 items-start mb-4`}>
            
                            {/* Month Selector */}
                            <Select
                                value={String(selectedMonth)}
                                onValueChange={(value) => setSelectedMonth(Number(value))}
                                >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>

                                <SelectContent>
                                    {months.map((m, i) => (
                                    <SelectItem key={i} value={String(i)}>
                                        {m}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Year Selector */}
                            <Select
                                value={String(selectedYear)}
                                onValueChange={(value) => setSelectedYear(Number(value))}
                                >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>

                                <SelectContent>
                                    {[2026, 2027, 2028].map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                        {y}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                        <span className="poppins bg-[var(--blue-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                            py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md max-w-[160px] text-center"
                            >
                            Generate report
                        </span>
                    </div>}

                    {/* cards */}
                    <div className={`${isMobile? "w-full flex-col items-center justify-center" : "flex-row"}
                        flex-1 flex gap-3 my-3`}>
                        {/* Fuel Cost */}
                        <div className={`${isDark? "bg-[var(--primary-color)] text-[color:var(--dashboard-light)]" : "bg-[var(--dashboard-light)] text-[color:var(--primary-color)]"}
                            ${isMobile? "w-[260px] p-6" : "w-[360px] p-12"}
                            rounded-lg shadow flex flex-col items-start justify-center relative cursor-pointer`}>
                            <p className="text-[16px]">Total Fuel Cost</p>
                            <h2 className="text-[24px] font-semibold">
                            ₱{totalFuelCost.toLocaleString()}
                            </h2>
                            <i className="bx bx-petrol-pump absolute top-0 right-0 p-3 text-[48px]" />
                        </div>

                        {/* Trips */}
                        <div className={`${isDark? "bg-[var(--primary-color)] text-[color:var(--dashboard-light)]" : "bg-[var(--dashboard-light)] text-[color:var(--primary-color)]"}
                            ${isMobile? "w-[260px] p-6" : "w-[360px] p-12"}
                            rounded-lg shadow flex flex-col items-start justify-center relative cursor-pointer`}>
                            <p className="text-[16px]">Completed Trips</p>
                            <h2 className="text-[24px] font-semibold">{totalTrips}</h2>
                            <i className="bx bx-trip absolute top-0 right-0 p-3 text-[48px]" />
                        </div>

                        {/* Distance */}
                        <div className={`${isDark? "bg-[var(--primary-color)] text-[color:var(--dashboard-light)]" : "bg-[var(--dashboard-light)] text-[color:var(--primary-color)]"}
                            ${isMobile? "w-[260px] p-6" : "w-[360px] p-12"}
                            rounded-lg shadow flex flex-col items-start justify-center relative cursor-pointer`}>
                            <p className="ttext-[16px]">Total Distance</p>
                            <h2 className="text-[24px] font-semibold">
                            {totalDistance.toFixed(1)} km
                            </h2>
                            <i className="bx bx-road absolute top-0 right-0 p-3 text-[48px]" />
                        </div>
                    </div>

                    {/* selector&generate */}
                    {!isMobile && <div className="flex flex-col items-end justify-end gap-3 my-3">
                        <div className={`${isMobile? "w-full justify-center" : "h-full"}
                            flex flex-row gap-3 items-center mb-4`}>
            
                            {/* Month Selector */}
                            <Select
                                value={String(selectedMonth)}
                                onValueChange={(value) => setSelectedMonth(Number(value))}
                                >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>

                                <SelectContent>
                                    {months.map((m, i) => (
                                    <SelectItem key={i} value={String(i)}>
                                        {m}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Year Selector */}
                            <Select
                                value={String(selectedYear)}
                                onValueChange={(value) => setSelectedYear(Number(value))}
                                >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>

                                <SelectContent>
                                    {[2026, 2027, 2028].map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                        {y}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>

                        <span className="poppins bg-[var(--blue-color)] text-sm text-[color:var(--light-color)] px-[calc(0.6vw+0.4rem)] 
                            py-[calc(0.4vw+0.3rem)] cursor-pointer rounded-md max-w-[160px] text-center"
                            >
                            Generate report
                        </span>
                    </div>}

                </div>

                {/* charts */}
                <div className={`${isMobile? "w-full justify-center flex-col" : "flex-row"}
                    flex gap-6`}>

                    <div className={`${isMobile? "w-full items-center" : "w-[600px]"}
                        h-[400px]`}>
                        <div className={`${isMobile? "flex-col justify-center" : "flex-row"}
                            flex items-center gap-3 mb-3`}>
                            <span className="poppins text-lg font-semibold">
                                Daily Fuel Cost
                            </span>
                            <span className="poppins text-sm font-semibold text-gray-300">
                                this month of {months[selectedMonth]} {selectedYear}
                            </span>
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fuelByDay}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => {
                                        const amount = Number(value ?? 0);
                                        return [`₱${amount.toLocaleString()}`, "Fuel Cost"];
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="fuel"
                                    fill={isDark ? "#3B82F6" : "#455A64"}
                                    radius={[5, 5, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={`${isMobile? "w-full items-center mt-16" : "w-[400px] min-h-[400px]"}
                        h-[400px] relative mb-3 flex flex-col gap-1`}>
                        <div className={`${isMobile? "flex-col justify-center" : "flex-row"}
                            flex items-center gap-3 mb-3`}>
                            <span className="poppins text-lg font-semibold">
                                Reports
                            </span>
                            <span className="poppins text-sm font-semibold text-gray-300">
                                this month of {months[selectedMonth]} {selectedYear}
                            </span>
                        </div>

                        {isEmpty && <span className="w-full poppins text-md text-gray-500 text-center mt-3">
                            No data available.
                        </span>}

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

                                <Legend
                                formatter={(value) =>
                                    isEmpty ? "No data available" : value
                                }
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>

                </div>

            </div>}
        </>
    )
}
