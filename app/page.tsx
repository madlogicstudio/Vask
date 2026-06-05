'use client'

import { useState, useEffect } from "react"
import Landing from "./home/pages/Landing";
import Dashboard from "./dashboard/page"

export type User = {
  uid: string;
  email: string | null;
}

function page() {

  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (user) {

    return(
      <Dashboard />
    )

  }

  if (loading) {
    return (
      <div className={`w-screen h-screen flex flex-col items-center justify-center bg-white gap-[calc(0.6vw+0.4rem)]`}>

        <div className={`h-[360px] w-[360px] md:h-[600px] md:w-[600px]
            flex flex-col items-center justify-center`}>
          <video autoPlay muted loop playsInline className="h-full w-full object-contain">
            <source src="Catronaut.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`w-16 h-16 md:w-24 md:h-24
          border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin`}></div>
        
      </div>
    )
  }

  return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        flex flex-col items-center justify-start scroll-smooth`}>
        <Landing isDark={isDark} setIsDark={setIsDark}/>
    </div>
  )
}

export default page