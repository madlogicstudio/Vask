'use client'

import { TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/app/home/hooks/useIsMobile";

type DashboardCardProps = { 
    isDark: boolean;
    title: string;
    count: any;
    icon: string;
}

const DashboardCard = ({isDark, title, count, icon}: DashboardCardProps) => {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            ${isMobile? "h-[120px] flex-1 p-3" : "h-auto flex-1 p-6"}
            flex flex-row items-start justify-center rounded-lg`}>

            <div className={`${isMobile? "h-full justify-between" : "justify-center"} flex-1 h-full flex flex-col items-start`}>
                <span className={`${isMobile? "text-sm max-w-[100px]" : "text-md"} poppins `}>
                    {title}
                </span>
                <span className={`${isMobile? "text-2xl max-w-[100px]" : "text-5xl py-3" } font-bold`}>
                    {count}
                </span>
            </div>
            <div className="w-auto h-full flex flex-row items-start justify-center ">
                <i className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                    bx bx-${icon} text-[32px] p-3 rounded-lg cursor-pointer`} />
            </div>
            
        </div>
    )
}

export default DashboardCard