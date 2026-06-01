'use client'

import { Slider } from "@/components/ui/slider"
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type HowProps = {
    isDark: boolean;
}

const How = ({isDark}: HowProps) => {

    const isMobile = useIsMobile();
    const [slider, setSlider] = useState(0);
    const howRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const textRef3 = useRef<HTMLDivElement>(null);
    const textRef4 = useRef<HTMLDivElement>(null);
    const textRef5 = useRef<HTMLDivElement>(null);
    const textRef6 = useRef<HTMLDivElement>(null);
    const numRef1 = useRef<HTMLDivElement>(null);
    const numRef2 = useRef<HTMLDivElement>(null);
    const numRef3 = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const obj = { value: 0 };

            gsap.to(obj, {
                value: 100,
                duration: 3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: howRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
                onUpdate: () => {
                    setSlider(obj.value);
                },
            }
        );

        gsap.fromTo(
            [
                textRef1.current,
                textRef2.current,
                textRef3.current,
                textRef4.current,
                textRef5.current,
                textRef6.current,
                titleRef.current,
            ],
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: howRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            [
                numRef1.current,
                numRef2.current,
                numRef3.current,
            ],
            {
                opacity: 0.2,
            },
            {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: howRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    return (
        <div ref={howRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "h-[620px]" : "h-[800px]"}
            max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={titleRef} className='w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--title-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1] hovered'>
                    [ 03 ] How it works?
                </span>
                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>
            <div className='h-full w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)] py-[calc(0.6vw+0.4rem)]'>

                <div className="flex-1 h-full p-[calc(0.6vw+0.4rem)] gap-[calc(1.2vw+0.8rem)] flex flex-col items-end justify-around">
                    <i ref={numRef1} className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                        fa-solid fa-1 text-[length:var(--hero-font)]`}></i>
                    <span ref={textRef1} className='anek hovered text-[length:var(--large-font)] text-end font-bold cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        Connect your vehicle and use vask features
                    </span>
                    <span ref={textRef5} className='anek hovered text-[length:var(--medium-font)] text-right cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        unlock a complete suite of smart fleet management features designed to improve efficiency, visibility, and operational control.
                    </span>
                    <i ref={numRef3} className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                        fa-solid fa-3 text-[length:var(--hero-font)]`}></i>
                </div>
                <Slider
                    value={[slider]}
                    max={100}
                    step={1}
                    orientation="vertical"
                    className={`${isMobile ? "h-[100vh]" : "h-40"}
                        rotate-180 transition duration-300 ease-in-out
                        [&_[data-radix-slider-range]]:bg-[var(--primary-color)]
                        [&_[data-radix-slider-thumb]]:bg-[var(--primary-color)]`}
                />
                <div className="flex-1 h-full p-[calc(0.6vw+0.4rem)] gap-[calc(1.2vw+0.8rem)] flex flex-col items-start justify-around">
                    <span ref={textRef2} className='anek hovered text-[length:var(--large-font)] font-bold cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        Join to an existing operator hub
                    </span>
                    <span ref={textRef4} className='anek hovered text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        To instantly connect your fleet with a smarter and more efficient management ecosystem.
                    </span>
                    <i ref={numRef2} className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                        fa-solid fa-2 text-[length:var(--hero-font)]`}></i>
                    <span ref={textRef3} className='anek hovered text-[length:var(--large-font)] font-bold cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        Monitor and optimize operations with smart insights 
                    </span>
                    <span ref={textRef6} className='anek hovered text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                        Gain complete visibility into vask tools through a centralized intelligent dashboard.
                    </span>
                </div>
            </div>
            

        </div>
    )
}

export default How