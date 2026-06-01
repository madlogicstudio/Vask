'use client'

import { useRef } from "react"
import FeatureCard from "../components/FeatureCard"
import { useGSAP } from "../hooks/useGSAP"
import gsap from "gsap"
import { useIsMobile } from "../hooks/useIsMobile"

type FeaturesProps = {
    isDark: boolean;
}

const Features = ({isDark}: FeaturesProps) => {

    const featureRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useGSAP(() => {

        gsap.fromTo(
            [
                titleRef.current,
                textRef.current,
                cardRef.current
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
                    trigger: featureRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    return (
        <div ref={featureRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={titleRef} className='w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--title-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1] hovered'>
                    [ 02 ] Key Features
                </span>
                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>
            <span ref={textRef} className={`${isMobile? "text-[length:var(--medium-font)] text-center" : "text-[length:var(--medium-font)] leading-[1.1]"}
                anek cursor-pointer transition duration-300 ease-in-out hovered py-[calc(0.6vw+0.4rem)]`}>
                Vask is a smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient. 
            </span>

            <div ref={cardRef} className={`${isMobile? "flex-row p-[calc(0.6vw+0.4rem)] scroll-hidden overflow-x-scroll" : "flex-row"}
                w-full flex items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                <FeatureCard isDark={isDark} display="/Tracking.mp4" title="Real-Time Tracking" text="Monitor vehicle locations, routes, and driver activity live with smart GPS tracking."/>
                <FeatureCard isDark={isDark} display="/Towing.mp4" title="Smart Maintenance" text="Receive automated service reminders and keep every vehicle in peak condition effortlessly."/>
                <FeatureCard isDark={isDark} display="/Analytics.mp4" title="Advanced Analytics" text="Track fuel usage, expenses, and performance with powerful data-driven insights."/>
            </div>
        </div>
    )
}

export default Features