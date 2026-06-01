'use client'

import ImpactCard from "../components/ImpactCard"
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "../hooks/useGSAP"
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type ImpactProps = {
    isDark: boolean;
}

const Impact = ({isDark}: ImpactProps) => {

    const isMobile = useIsMobile();
    const impactRef = useRef<HTMLDivElement>(null);
    const titleRef1 = useRef<HTMLDivElement>(null);
    const titleRef2 = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [slider, setSlider] = useState(0);

    useGSAP(() => {

        const obj = { value: 0 };

            gsap.to(obj, {
                value: 100,
                duration: 3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
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
                titleRef1.current,
                titleRef2.current,
                cardRef.current
            ],
            {
                opacity: 0,
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
    })

    return (
        <div ref={impactRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "px-[calc(0.6vw+0.4rem)]" : ""}
            relative h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(1.2vw+0.8rem)] py-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={titleRef1} className='h-auto w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--title-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1] hovered'>
                    [ 05 ] Projected results & business impact
                </span>
                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>

            <div className={`${isMobile? "flex-col" : "flex-row"}
                h-auto w-full flex items-start justify-start gap-[calc(1.2vw+0.8rem)] overflow-y-hidden`}>
                
                <div className={`${isMobile? "px-[calc(0.6vw+0.4rem)]" : ""}
                    flex-1 w-full flex flex-col items-start justify-start gap-[calc(0.6vw+0.4rem)] py-[calc(0.6vw+0.4rem)]`}>
                    
                    <div className="w-full flex flex-row items-center justify-between">
                        <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                            01
                        </span>
                        <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                            02
                        </span>
                        <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                            03
                        </span>
                        <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                            04
                        </span>
                    </div> 

                    <div className="w-full h-2 bg-gray-300 overflow-hidden">
                        <div className="h-full bg-[var(--primary-color)] transition-all duration-300 ease-out"
                            style={{ width: `${slider}%` }}
                        />
                    </div>

                    <span ref={titleRef2} className='anek text-[length:var(--hero-font)] text-[color:var(--blue-color)] font-bold leading-[1.3] hovered cursor-pointer py-[calc(0.6vw+0.4rem)]'>
                        We Transform Traditional Fleet Operations.
                    </span>

                </div>

                <div ref={cardRef} className="h-full flex flex-col items-start justify-start">
                    <ImpactCard
                        number="01"
                        title="Faster Fleet Monitoring"
                        text="We significantly improves monitoring efficiency by consolidating all fleet information into a centralized smart dashboard.  
                        Fleet managers can instantly access real-time vehicle locations, operational status, maintenance updates, and driver performance 
                        data from a single interface."
                        isDark={isDark}
                    />
                    <ImpactCard
                        number="02"
                        title="Decrease in Manual Paperwork"
                        text="Traditional fleet management often relies heavily on paper-based records, manual logs, and time-consuming reporting processes.
                        Vask digitizes these operations by automating maintenance schedules, inspection records, trip logs, fuel reports, and driver documentation. "
                        isDark={isDark}
                    />
                    <ImpactCard
                        number="03"
                        title="Vehicle Uptime Efficiency"
                        text="We improve fleet reliability by using predictive maintenance technology and automated diagnostics to detect vehicle issues before they 
                        become major problems. The system continuously monitors engine conditions, maintenance schedules, battery status, tire performance, and other 
                        critical vehicle components."
                        isDark={isDark}
                    />
                    <ImpactCard
                        number="04"
                        title="Enhanced Decision-Making"
                        text="We uses advanced analytics and intelligent reporting tools to transform operational data into actionable insights. Managers can analyze 
                        trends in fuel consumption, vehicle performance, maintenance frequency, and driver behavior to identify inefficiencies and optimize fleet 
                        operations."
                        isDark={isDark}
                    />
                </div>
                
                
            </div>

        </div>
    )
}

export default Impact