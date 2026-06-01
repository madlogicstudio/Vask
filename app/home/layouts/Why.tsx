'use client'

import WhyCard from "../components/WhyCard"
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "../hooks/useGSAP"
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type WhyProps = {
    isDark: boolean;
}

const Why = ({isDark}: WhyProps) => {

    const isMobile = useIsMobile();
    const whyRef = useRef<HTMLDivElement>(null);
    const titleRef1 = useRef<HTMLDivElement>(null);
    const titleRef2 = useRef<HTMLDivElement>(null);
    const cardRef1 = useRef<HTMLDivElement>(null);
    const cardRef2 = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                titleRef1.current,
                titleRef2.current,
                cardRef1.current,
                cardRef2.current,
            ],
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
                    trigger: whyRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    return (
         <div ref={whyRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "px-[calc(0.6vw+0.4rem)]" : ""}
            relative h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(1.2vw+0.8rem)] py-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={titleRef1} className='w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--title-font)] cursor-pointer transition duration-300 ease-in-out hovered'>
                    [ 04 ] Why choose us?
                </span>
                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>
            <div ref={titleRef2} className='h-full w-full flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out hovered'>
                    At Vask, we redefine fleet and vehicle management through innovation, efficiency, and reliability. Our smart and modern platform is designed 
                    to simplify operations, reduce manual work, and help businesses stay in control of their vehicles anytime, anywhere.
                </span>
            </div>
            <div ref={cardRef1} className={`${isMobile? "flex-col" : "flex-row"}
                h-full w-full flex items-start justify-start gap-[calc(0.6vw+0.4rem)]`}>
                <WhyCard isDark={isDark} icon="bx-brain" title="Smart Monitoring" text="Track vehicle usage, maintenance schedules, fuel consumption, and driver activities in one centralized system. 
                    VASK provides real-time insights that help improve decision-making and operational efficiency." />
                <WhyCard isDark={isDark} icon="bx-happy-heart-eyes" title="User-Friendly Interface" text="Built with a clean and intuitive design, VASK makes vehicle management easier for administrators, fleet supervisors,
                    and drivers. Access important information quickly without complicated processes."/>
            </div>
            <div ref={cardRef2} className={`${isMobile? "flex-col" : "flex-row"}
                h-full w-full flex items-start justify-start gap-[calc(0.6vw+0.4rem)]`}>
                <WhyCard isDark={isDark} icon="bx-target" title="Improved Efficiency" text="Say goodbye to paper-based records and scattered spreadsheets. We automates data recording and reporting, 
                    reducing human error while saving time and effort."/>
                <WhyCard isDark={isDark} icon="bx-wallet-alt" title="Cost-Effective Solution" text="Here in Vask we monitor fuel usage, maintenance, and vehicle performance. We helps businesses reduce unnecessary expenses and 
                    maximize fleet productivity." />
            </div>
            

        </div>
    )
}

export default Why