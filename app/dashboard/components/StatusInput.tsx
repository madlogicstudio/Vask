'use client'

import { useEffect, useState } from "react";

type StatusInputProps = {
    isDark: boolean;
    id: string;
    from: string;
    vehicle: string;
    to: string;
    status: string;
    time: string;
}

export const StatusInput = ({isDark, id, from, vehicle, to, status, time}: StatusInputProps) => {

    const [parcelStatus, setParcelStatus] = useState("intransit");

    useEffect(() => {
        if(status === "In-Transit"){
            setParcelStatus("intransit");
        }
        else if(status === "Delivered"){
            setParcelStatus("delivered");
        }
        else{
            setParcelStatus("canceled");   
        }
    }, [status]);

    const [vehicleType, setVehicleType] = useState("motorcycle");

    useEffect(() => {
        if(vehicle === "motorcycle"){
            setVehicleType("motorcycle")
        }
        else if(vehicle === "car"){
            setVehicleType("car")
        }
        else if(vehicle === "truck"){
            setVehicleType("truck")
        }
    }, [vehicleType])

    return (
        <div className={`${isDark? "border-[var(--dashboard-light)]" : "border-[var(--dashboard-dark)]"}
            w-full flex flex-row items-center justify-start p-3 border-b border-gray-500`}>
            <span className="poppins w-[300px] text-lg text-center">
                {id}
            </span>
            <div className="w-[300px] flex flex-row items-center justify-start gap-3">

                <i className={`
                    ${vehicleType === "motorcycle" ? "bx bx-motorcycle text-[32px] text-white p-3 bg-[var(--primary-color)] rounded-lg cursor-pointer" : ""}
                    ${vehicleType === "car" ? "bx bx-car text-[32px] text-white p-3 bg-[var(--pink-color)] rounded-lg cursor-pointer" : ""}
                    ${vehicleType === "truck" ? "bx bx-truck text-[32px] text-white p-3 bg-[var(--blue-color)] rounded-lg cursor-pointer" : ""}
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
                {time}
            </span>
        </div>
    )
}
