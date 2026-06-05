'use client'

import { TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

type DashboardCardProps = { 
    isDark: boolean;
    title: string;
    count: string;
    trend: string;
    percent: string;
    icon: string;
}

const DashboardCard = ({isDark, title, count, trend, percent, icon}: DashboardCardProps) => {

    const [trendColor, setTrendColor] = useState(false);

    useEffect(() => {
        if (trend === "up"){
            setTrendColor(true);  
        }
        else if(trend === "down"){
            setTrendColor(false);  
        }
    }, [trend]);
        

    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            h-60 flex-1 flex flex-row items-start justify-center rounded-lg p-6`}>

            <div className="flex-1 h-full flex flex-col items-start justify-center">
                <span className="poppins text-md">
                    {title}
                </span>
                <span className="text-5xl font-bold py-3">
                    {count}
                </span>
                <div className="flex flex-row items-center pt-6">
                    <i className={`bx bx-chevrons-${trend} text-[32px]  
                        ${trendColor ? "text-green-500" : "text-red-500"}`} />
                    <span className="text-md font-bold">
                        {percent}
                    </span>
                </div>
            </div>
            <div className="w-auto h-full flex flex-row items-start justify-center ">
                <i className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                    bx bx-${icon} text-[32px] p-3 rounded-lg cursor-pointer`} />
            </div>
            
        </div>
    )
}

export default DashboardCard