import { useRef, useEffect, useState } from "react";
import { useGSAP } from "../hooks/useGSAP"
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type ImpactCardProps = {
    number: string;
    title: string;
    text: string;
    isDark: boolean
}

const ImpactCard = ({number, title, text, isDark}: ImpactCardProps) => {

    const isMobile = useIsMobile();
    const impactRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                textRef1.current,
                textRef2.current
            ],
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            [
                numRef.current
            ],
            {
                opacity: 0.2,
            },
            {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    return (
        <div ref={impactRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "px-[calc(0.6vw+0.4rem)] py-[calc(1.2vw+0.8rem)]" : "p-[calc(0.6vw+0.4rem)]"}
            h-auto w-full flex flex-row items-start justify-start gap-[calc(0.6vw+0.4rem)] border-b-2 border-gray-300`}>
            
            <div className="flex flex-col items-start justify-start">
                <span ref={numRef} className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                    ${isMobile? "text-[length:var(--large-font)]" : "text-[length:var(--large-font)]"}
                    poppins font-bold cursor-pointer transition duration-300 ease-in-out`}>
                    {number}
                </span>
            </div>
            <div className="flex flex-col items-start justify-start">
                <span ref={textRef1} className={`${isMobile? "text-[length:var(--title-font)]" : "leading-[4rem] text-[length:var(--large-font)]"}
                    anek w-full font-semibold cursor-pointer transition duration-300 ease-in-out`}>
                    {title}
                </span>
                <span ref={textRef2} className='anek w-full text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out'>
                    {text}
                </span>
            </div>
        </div>  
    )
}

export default ImpactCard