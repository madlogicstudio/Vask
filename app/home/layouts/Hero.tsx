'use client'

import HeroImg from '../assets/Hero.png'
import { useIsMobile } from '../hooks/useIsMobile'
import { useGSAP } from '../hooks/useGSAP'
import gsap from 'gsap'
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
    isDark: boolean;
}

function Hero({isDark}: HeroProps) {

    const heroRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useGSAP(() => {
        const hero = heroRef.current;
        const page = pageRef.current;

        if (!page || !hero ) return

        gsap.fromTo(page, 
            {
                yPercent: isMobile ? 100 : 300
            },
            {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    endTrigger: page,
                    end: 'top top',
                    scrub: 1,
                },
            }
        );

        gsap.fromTo(hero,
            {
                scale: isMobile ? 2 : 1.4
            },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            }
        );

    }, []);

    useGSAP(() => {

        gsap.fromTo(textRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);


    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-[120vh] md:h-[300vh]
            w-full flex flex-col items-center justify-center`}>

            <div ref={heroRef} className='h-auto w-full flex flex-col items-center justify-center sticky top-0 overflow-hidden'>
                <img src={HeroImg.src} alt="" className='h-full w-full' />
            </div>

            <div ref={pageRef} className={`${isMobile? "h-screen" : "h-auto"}
                ${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
                w-full flex flex-row items-center justify-center absolute top-0 left-0 z-10 px-[calc(0.6vw+0.4rem)] py-[calc(2.4vw+1.6rem)]`}>
                
                <div ref={textRef} className={`
                    w-full h-full max-w-[1280px] flex flex-col items-start justify-center gap-[calc(1.8vw+1.2rem)]`}>
                    <div className='w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                        <span className='anek text-[length:var(--title-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1] hovered'>
                            [ 01 ] Who we are?
                        </span>
                        <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                    </div>
                    
                    <div className={`${isMobile? "" : ""}
                        w-full flex flex-col items-center justify-center`}>

                        <div className={`${isMobile? "" : ""}
                            w-full flex flex-col items-center justify-center`}>
                            <span className='anek text-[length:var(--huge-font)] font-semibold text-[color:var(--primary-color)] mr-[calc(0.4vw+0.3rem)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                                Smart Tracking
                            </span>
                            <span className='anek text-[length:var(--huge-font)] font-semibold text-[color:var(--secondary-color)] mr-[calc(0.4vw+0.3rem)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                                Seamless Controll.
                            </span>
                        </div>

                        <div className={`${isMobile? "" : ""}
                            w-full flex flex-col items-center justify-center`}>
                            <span className='anek text-[length:var(--huge-font)] font-semibold text-[color:var(--blue-color)] mr-[calc(0.4vw+0.3rem)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                                Vehicle Management
                            </span>
                            <span className='anek text-[length:var(--huge-font)] font-semibold text-[color:var(--pink-color)] mr-[calc(0.4vw+0.3rem)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                                Reimagined.
                            </span>

                        </div>  
                    
                    </div>

                    <span className={`${isMobile? "text-[length:var(--medium-font)]" : "text-[length:var(--medium-font)]"}
                        anek text-center cursor-pointer transition duration-300 ease-in-out hovered`}>
                        Vask is a smart and modern vehicle management system built to simplify how businesses track, manage, and optimize their fleets. 
                        Designed with real-time intelligence and scalability in mind, Vask brings together vehicle tracking, driver management, maintenance scheduling, 
                        and operational analytics into one unified platform. 
                    </span>
                    <span className={`${isMobile? "text-[length:var(--medium-font)]" : "text-[length:var(--medium-font)]"}
                        anek text-[length:var(--large-font)] text-center font-semibold cursor-pointer transition duration-300 ease-in-out hovered`}>
                        Designed for logistics companies to simplify fleet operations, optimize delivery performance, and improve real-time vehicle management through smart automation and intelligent tracking.
                    </span>
                </div>

            </div>

        </div>
    )
}

export default Hero