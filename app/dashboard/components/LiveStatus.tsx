'use client'

import { useEffect } from "react";
import { StatusInput } from "./StatusInput"
import { useIsMobile } from "@/app/home/hooks/useIsMobile";

type LiveStatusProps= {
    isDark: boolean;
    inTransitData: any[];
}

const LiveStatus = ({isDark, inTransitData}: LiveStatusProps) => {
    
    const isMobile = useIsMobile();

    useEffect(() => {
        console.log("inTransit Datas: ", inTransitData);
    }, [])

    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            ${isMobile? "p-3 gap-2 overflow-x-hidden" : "p-6 gap-3"}
            h-full flex-1 flex flex-col items-start justify-start rounded-lg`}>
            <span className="poppins text-lg font-semibold">
                Status
            </span>

            <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
                ${isMobile? "" : "overflow-y-auto hide-scrollbar"}
                h-full w-full `}>
                
                {!isMobile && <div className={`flex items-center justify-start p-3 border-b border-gray-500 flex-wrap`}>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Id
                    </span>
                    <span className="poppins flex-1 text-lg font-semibold text-center">
                        Route
                    </span>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Status
                    </span>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Time Started
                    </span>
                </div>}

                {isMobile && <div className={`flex items-center justify-start p-2 border-b border-gray-500`}>
                    <span className={`poppins w-[100px] text-sm font-semibold text-center`}>
                        Id
                    </span>
                    <span className={`w-[100px] text-sm poppins font-semibold text-center`}>
                        Route
                    </span>
                    <span className={`w-[100px] text-sm poppins font-semibold text-center`}>
                        Status
                    </span>
                    <span className={`w-[100px] text-sm poppins font-semibold text-center`}>
                        Time Started
                    </span>
                </div>}

                <div className="flex flex-col items-center justify-center">
                    {inTransitData.map((item) => (
                        <StatusInput
                            key={item.id}
                            isDark={isDark}
                            id={item.deliveryData.deliveryId}
                            from={item.deliveryData.pickupAdress}
                            to={item.deliveryData.dropoffAddress}
                            status="In-Transit"
                            driverName={item.driverName}
                            driverId={item.deliveryData.driverId}
                            time={item.deliveryData.time}
                        />
                    ))}
                </div>

            </div>

        </div>
    )
}

export default LiveStatus