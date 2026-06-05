'use client'

import type { User } from "../../page"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/app/home/hooks/useIsMobile"

type UserProfileProps = {
    isDark: boolean;
}

export const UserProfile = ({isDark}: UserProfileProps) => {

    const [user, setUser] = useState<User | null>(null);
    const isMobile = useIsMobile();

    const username = user?.email?.split("@")[0] ?? "Guest";

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



    return (
        <div className={`${isDark ? 
            "text-[var(--dashboard-light)] bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)] text-[var(--dashboard-dark)]"}
            h-auto w-full flex flex-col items-start justify-start gap-3 p-3 rounded-lg`}>
            
            <div className="flex flex-row items-center justify-center gap-3">
                <div className="flex flex-row items-center justify-center">
                    {user?.uid && <img src={user.uid} className="bg-black p-6 rounded-full" alt="" />}
                    {!user?.uid && <div className="flex items-center bg-black p-3 rounded-full cursor-pointer">
                        <i className="bx bx-user text-3xl text-[var(--dashboard-light)]" />
                    </div>}
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                    <span className={`poppins cursor-pointer text-md text-[color:var(--pink-color)] transition duration-300 ease-in-out `}>
                        {username}
                    </span>
                    <span className={`poppins cursor-pointer text-sm transition duration-300 ease-in-out`}>
                        Operator
                    </span>
                </div>
            </div>
            <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                w-full flex flex-row items-center justify-between gap-3 p-3 rounded-lg cursor-pointer`}>
                <span className="poppins flex flex-col items-center justify-center text-sm">
                    Hub Name
                </span>
                <div className="flex flex-col items-center justify-center">
                    <i className="bx bx-chevron-up" />
                    <i className="bx bx-chevron-down" />
                </div>
            </div>
            
        </div>
    )
}
