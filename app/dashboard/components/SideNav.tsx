'use client'

import { useRef, useState } from "react"
import { UserProfile } from "./UserProfile"
import Icon from '../../home/assets/Dark-icon.png'
import DarkIcon from '../../home/assets/Icon.png'
import { Theme } from "@/app/home/components/Theme"

type SideNavProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideNav = ({isDark, setIsDark}: SideNavProps) => {

    const [active, setActive] = useState("dashboard");

    const activeStyle = isDark ? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]";

    return (
        <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
            h-full w-[240px] flex flex-col items-start justify-start scroll-smooth p-3 gap-[calc(0.6vw+0.4rem)] rounded-lg`}>
            
            <div className="w-full flex flex-row items-center justify-between">
                <img src={`${isDark? DarkIcon.src : Icon.src}`} className="h-12 w-12" alt="" />
                <Theme 
                    systemIcon="bx bx-desktop"
                    lightIcon="bx bx-sun"
                    darkIcon="bx bx-moon"
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
            </div>

            <UserProfile isDark={isDark}/>

            <div className="flex-1 w-full flex flex-col items-center justify-between">

                <div className="w-full flex flex-col items-center justify-between gap-3">
                    
                    <div className={`${active === "dashboard" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("dashboard")}>
                        <i className="bx bx-sparkle-square text-[32px]" />
                        <span className="poppins text-sm">
                            Dashboard
                        </span>
                    </div>
                    <div className={`${active === "drivers" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("drivers")}>
                        <i className="bx bx-steering-wheel text-[32px]" />
                        <span className="poppins text-sm">
                            Drivers
                        </span>
                    </div>
                    <div className={`${active === "vehicles" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("vehicles")}>
                        <i className="bx bx-truck text-[32px]" />
                        <span className="poppins text-sm">
                            Vehicles
                        </span>
                    </div>
                    <div className={`${active === "analytics" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("analytics")}>
                        <i className="bx bx-chart-trend text-[32px]" />
                        <span className="poppins text-sm">
                            Analytics
                        </span>
                    </div>

                </div>
                
                <div className="w-full flex flex-col items-center justify-between">
                    <div className={`${active === "settings" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("settings")}>
                        <i className="bx bx-cog text-[32px]" />
                        <span className="poppins flex flex-col items-center justify-center text-sm">
                            Settings
                        </span>
                    </div>
                    <div className={`${active === "signout" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setActive("signout")}>
                        <i className="bx bx-arrow-out-right-square-half text-[32px] text-[color:var(--pink-color)]" />
                        <span className="poppins flex flex-col items-center justify-center text-[color:var(--pink-color)] text-sm">
                            Sign out
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}
