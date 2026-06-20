'use client'

import { TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

type DashboardCardProps = { 
    isDark: boolean;
    title: string;
    count: any;
    icon: string;
}

const DashboardCard = ({isDark, title, count, icon}: DashboardCardProps) => {

    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            h-auto flex-1 flex flex-row items-start justify-center rounded-lg p-6`}>

            <div className="flex-1 h-full flex flex-col items-start justify-center">
                <span className="poppins text-md">
                    {title}
                </span>
                <span className="text-5xl font-bold py-3">
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