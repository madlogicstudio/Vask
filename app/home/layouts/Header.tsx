'use client'

import { useState, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Theme } from '../components/Theme'
import { Brand } from '../components/Brand'
import { Track } from '../components/Track'
import { useGSAP } from '../hooks/useGSAP'
import gsap from 'gsap'
import { useRouter } from "next/navigation";

type HeaderProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({isDark, setIsDark} : HeaderProps) {

    const [isHover, setIsHover] = useState("");
    const isMobile = useIsMobile();
    const router = useRouter();

    const headerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const header = headerRef.current
        if (!header) return

        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: document.body,
            start: 80,
            end: 200,
            scrub: 1,
            },
        })

        tl.to(header, {
            height: 60,
            ease: "none",
        }, 0)
        .to(".track", {
            opacity: 0,
            y: -10,
            ease: "none",
        }, 0)
        .to(".bottom-nav", {
            opacity: 0,
            y: -15,
            ease: "none",
        }, 0)
    }, []);

    return (
        <div id='header' ref={headerRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "" : ""}
            w-full flex flex-col items-center fixed top-0 left-0 z-10 gap-[calc(0.6vw+0.4rem)] transition-all duration-300 overflow-hidden`}>
            
            <div className={`w-full flex flex-row items-center justify-between px-[calc(0.6vw+0.4rem)]`}>

                <Brand isDark={isDark} />
                
                <Theme 
                    systemIcon="bx bx-desktop"
                    lightIcon="bx bx-sun"
                    darkIcon="bx bx-moon"
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
                
            </div>
            <div id='track' ref={trackRef} className={`w-full flex flex-row items-center justify-center px-[calc(0.6vw+0.4rem)] px-[calc(0.4vw+0.3rem)`}>

                <Track isDark={isDark}/>
                
            </div>
            <div className='bottom-nav w-full flex items-center justify-between gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]'>
                <div className='flex justify-center'>
                    <span className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--small-font)]"}
                        cursor-pointer transition duration-300 ease-in-out hovered`}
                        onMouseEnter={() => setIsHover("AboutUs")}
                        onMouseLeave={() => setIsHover("")}
                        >
                        {isHover === "AboutUs" ? "[ About us ]" : "About us"}
                    </span>
                </div>
                <div className='flex-1 flex justify-center'>
                    <span className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--small-font)]"}
                        cursor-pointer transition duration-300 ease-in-out hovered`}
                        onMouseEnter={() => setIsHover("Careers")}
                        onMouseLeave={() => setIsHover("")}
                        >
                        {isHover === "Careers" ? "[ Careers ]" : "Careers"}
                    </span>
                </div>
                <div className='flex-1 flex justify-center'>
                    <span className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--small-font)]"}
                        cursor-pointer transition duration-300 ease-in-out hovered`}
                        onMouseEnter={() => setIsHover("Github")}
                        onMouseLeave={() => setIsHover("")}
                        onClick={() => window.open('https://github.com/madlogicstudio/Vask')}>
                        {isHover === "Github" ? "[ Github ]" : "Github"}
                    </span>
                </div>
                <div className='flex justify-center'>
                    <span 
                        className={`text-[length:var(--small-font)]
                        cursor-pointer transition duration-300 ease-in-out hovered`}
                        onMouseEnter={() => setIsHover("Signin")}
                        onMouseLeave={() => setIsHover("")}
                        onClick={() => router.push('/home/signin')}
                        >
                        {isHover === "Signin" ? "[ Sign in ]" : "Sign in"}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Header