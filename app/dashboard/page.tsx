'use client'

import type { User } from "../page"
import Error from '../home/assets/404.png'
import { useIsMobile } from "../home/hooks/useIsMobile"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

type DashboardProps = {
    isDark: boolean;
}

function page({isDark}: DashboardProps) {

  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log(
      `Logged user: Id:${user?.uid}, Email:${user?.email}`
    )
  }, [user]);

  if(user?.uid) return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-center justify-center scroll-smooth`}>
        Dashboard
    </div>
  )

  return(
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-center justify-center scroll-smooth`}>
        
        <img src={Error.src} className={`${isMobile? "h-[420px] w-[420px]" : "h-[620px] w-[620px]"}`} alt="" />

        <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
          ${isMobile? "w-[320px] p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
          cursor-pointer rounded-full text-center`}
          onClick={() => router.push('/')}>
          Go back
        </span>
    </div>
  )

}

export default page