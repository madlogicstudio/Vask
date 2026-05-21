'use client'

import { useState, useEffect } from "react"
import Header from "../layouts/Header"
import Hero from "../layouts/Hero"
import Cookie from "../components/Cookie"
import Features from "../layouts/Features"
import How from "../layouts/How"
import Why from "../layouts/Why"
import Impact from "../layouts/Impact"
import Testimonials from "../layouts/Testimonials"
import Faq from "../layouts/Faq"
import Cta from "../layouts/Cta"
import Footer from "../layouts/Footer"
import { useIsMobile } from "../hooks/useIsMobile"

type LandingProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Landing({isDark, setIsDark}: LandingProps) {

    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-auto w-full flex flex-col items-center justify-start`}>
            <Header isDark={isDark} setIsDark={setIsDark} />
            <div className="relative w-full relative flex flex-col items-center justify-center overflow-hidden">
                <Hero isDark={isDark} />
                <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                    ${isMobile? "h-auto" : "h-screen"}
                    w-full flex flex-col items-center justify-center z-[5]`}>
                    <Features isDark={isDark}/>
                </div>
            </div>

            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                h-[800px] w-full flex flex-col items-center justify-center z-[5]`}>
                <How isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                h-auto w-full flex flex-col items-center justify-center z-[5] mt-[calc(2.4vw+1.8rem)] mb-[calc(1.8vw+1.2rem)]`}>
                <Why isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                h-auto w-full flex flex-col items-center justify-start z-[5]`}>
                <Impact isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                ${isMobile? "h-auto" : "h-screen"}
                mt-[calc(1.2vw+0.8rem)] w-full flex flex-col items-center justify-center z-[5]`}>
                <Testimonials isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                ${isMobile? "h-auto" : "h-screen"}
                w-full flex flex-col items-center justify-center z-[5]`}>
                <Faq isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                ${isMobile? "h-auto" : "h-screen"}
                w-full flex flex-col items-center justify-center z-[5]`}>
                <Cta isDark={isDark}/>
            </div>
            <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                ${isMobile? "mt-[1rem]" : "p-[calc(0.6vw+0.4rem)]"}
                h-auto w-full flex flex-col items-center justify-center z-[5] pb-0`}>
                <Footer isDark={isDark}/>
            </div>
            
            {isVisible && <div className="h-screen w-full flex flex-col items-center justify-end fixed top-0 left-0 z-10">
                <Cookie isDark={isDark} setIsVisible={setIsVisible}/>
            </div>}
        </div>
    )
}

export default Landing