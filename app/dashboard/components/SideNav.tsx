'use client'

import { useEffect, useRef, useState } from "react"
import { UserProfile } from "./UserProfile"
import Icon from '../../home/assets/Dark-icon.png'
import DarkIcon from '../../home/assets/Icon.png'
import { Theme } from "@/app/home/components/Theme"
import { auth } from "@/app/home/firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/app/home/hooks/useIsMobile"

type SideNavProps = {
    isDark: boolean;
    hubName: string;
    setHubName: React.Dispatch<React.SetStateAction<string>>;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideNav = ({isDark, hubName, setHubName, setIsDark, setActiveTab, setShowNav}: SideNavProps) => {

    const [active, setActive] = useState("dashboard");
    const router = useRouter();
    const [signout, setSignout] = useState(false);
    const isMobile = useIsMobile();
    const activeStyle = isDark ? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]";

    return (
        <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
            ${isMobile? 
                "h-full w-[240px] flex flex-col items-start justify-start scroll-smooth p-3 gap-3 absolute top-0 left-0 z-20 overflow-y-scroll" 
                : 
                "h-full w-[240px] flex flex-col items-start justify-start scroll-smooth p-3 gap-3 rounded-lg"
            }`}>
            
            <div className="w-full flex flex-row items-center justify-between">
                <img src={`${isDark? DarkIcon.src : Icon.src}`} className={`${isMobile? "h-10 w-10" : "h-12 w-12"}`} alt="" />
                {!isMobile && <Theme 
                    systemIcon="bx bx-desktop"
                    lightIcon="bx bx-sun"
                    darkIcon="bx bx-moon"
                    isDark={isDark}
                    setIsDark={setIsDark}
                />}
                {isMobile && <i className="bx bx-x text-[32px]" onClick={() => setShowNav((prev) => !prev)}/>}
            </div>

            <UserProfile isDark={isDark} hubName={hubName} setHubName={setHubName}/>

            <div className="flex-1 w-full flex flex-col items-center justify-between">

                {!hubName && <div className={`${active === "dashboard" ? activeStyle : ""}
                    w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                    onClick={() => {
                        setActive("dashboard");
                        setActiveTab("dashboard");
                    }}>
                    <i className="bx bx-sparkle-square text-[32px]" />
                    <span className="poppins text-sm">
                        Dashboard
                    </span>
                </div>}

                {hubName && <div className="w-full flex flex-col items-center justify-between gap-3">
                    
                    <div className={`${active === "dashboard" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("dashboard");
                            setActiveTab("dashboard");
                        }}>
                        <i className="bx bx-sparkle-square text-[32px]" />
                        <span className="poppins text-sm">
                            Dashboard
                        </span>
                    </div>
                    <div className={`${active === "reports" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("reports");
                            setActiveTab("reports");

                        }}>
                        <i className="bx bx-article text-[32px]" />
                        <span className="poppins text-sm">
                            Reports
                        </span>
                    </div>
                    <div className={`${active === "history" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("history");
                            setActiveTab("history");

                        }}>
                        <i className="bx bx-history text-[32px]" />
                        <span className="poppins text-sm">
                            History
                        </span>
                    </div>
                    <div className={`${active === "drivers" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("drivers");
                            setActiveTab("drivers");

                        }}>
                        <i className="bx bx-steering-wheel text-[32px]" />
                        <span className="poppins text-sm">
                            Drivers
                        </span>
                    </div>
                    <div className={`${active === "analytics" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("analytics");
                            setActiveTab("analytics");
                        }}>
                        <i className="bx bx-chart-trend text-[32px]" />
                        <span className="poppins text-sm">
                            Analytics
                        </span>
                    </div>
                    <div className={`${active === "chat" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("chat");
                            setActiveTab("chat");
                        }}>
                        <i className="bx bx-message-circle text-[32px]" />
                        <span className="poppins text-sm">
                            Chat
                        </span>
                    </div>

                </div>}
                
                <div className={`${hubName? "justify-betwee" : "flex-1 justify-end"}
                    w-full flex flex-col items-center`}>
                    <div className={`${active === "settings" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => {
                            setActive("settings");
                            setActiveTab("settings");
                        }}>
                        <i className="bx bx-cog text-[32px]" />
                        <span className="poppins flex flex-col items-center justify-center text-sm">
                            Settings
                        </span>
                    </div>
                    <div className={`${active === "signout" ? activeStyle : ""}
                        w-full flex flex-row items-center gap-3 p-3 cursor-pointer rounded-lg`}
                        onClick={() => setSignout(true)}>
                        <i className="bx bx-arrow-out-right-square-half text-[32px] text-[color:var(--pink-color)]" />
                        <span className="poppins flex flex-col items-center justify-center text-[color:var(--pink-color)] text-sm">
                            Sign out
                        </span>
                    </div>
                </div>

            </div>

            {signout && <div className="h-screen w-full flex flex-col items-center justify-center absolute top-0 left-0 z-20 bg-[rgba(0,0,0,0.5)]">
                <div className="flex flex-col items-center justify-center h-auto w-auto bg-white p-6 gap-3 rounded-lg">
                    <span className="poppins cursor-pointer text-sm transition duration-300 ease-in-out
                        text-[var(--dashboard-dark)] p-3">
                        Are you sure you want to sign out?
                    </span>
                    <div className="w-full flex flex-row gap-3">
                        <span className="flex-1 poppins cursor-pointer text-sm transition duration-300 ease-in-out
                            text-[var(--dashboard-light)] p-3 bg-[var(--dashboard-dark)] text-center"
                            onClick={() => setSignout(false)}>
                            Cancel
                        </span>
                        <span className="flex-1 poppins cursor-pointer text-sm transition duration-300 ease-in-out
                            text-[var(--dashboard-light)] p-3 bg-[var(--pink-color)] text-center"
                            onClick={async () => {
                                try {
                                    await signOut(auth);
                                    // optional cleanup
                                    sessionStorage.removeItem("user");
                                    
                                    router.push("/");
                                } catch (error) {
                                    console.error("Sign out error:", error);
                                }
                            }}>
                            Sign Out
                        </span>
                    </div>
                </div>
            </div>}

        </div>
    )
}
