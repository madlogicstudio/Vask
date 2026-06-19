'use client'

import { useEffect } from "react";
import { StatusInput } from "./StatusInput"

type LiveStatusProps= {
    isDark: boolean;
    inTransitData: any[];
}

const LiveStatus = ({isDark, inTransitData}: LiveStatusProps) => {
    
    useEffect(() => {
        console.log("inTransit Datas: ", inTransitData);
    }, [])

    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            h-full flex-1 flex flex-col items-start justify-start rounded-lg p-6 gap-3`}>
            <span className="poppins text-lg font-semibold">
                Status
            </span>

            <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
                h-full w-full overflow-y-auto hide-scrollbar`}>
                
                <div className={`
                    flex flex-row items-center justify-start p-3 border-b border-gray-500`}>
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
                </div>

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