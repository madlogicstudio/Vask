'use client'

import { ZCOOL_KuaiLe } from "next/font/google";
import { useIsMobile } from "../hooks/useIsMobile"
import { useState } from "react"

type FeatureCardProps = {
    display: string;
    title: string;
    text: string;
    isDark: boolean;
}

const FeatureCard = ({display, title, text, isDark}: FeatureCardProps) => {

    const isMobile = useIsMobile();
    const [flipped, setFlipped] = useState(false);

    return (
        <div className={`${isMobile? "h-[24em] w-full" : "h-[32em] w-[24em]"}
            group perspective-[1000px] cursor-pointer`}
            
            onClick={() => {
                if (isMobile) {
                    setFlipped(!flipped)
                }
            }}
            
            onMouseEnter={() => {
                if (!isMobile) {
                    setFlipped(true)
                }
            }}

            onMouseLeave={() => {
                if (!isMobile) {
                    setFlipped(false)
                }
            }}>

            <div className={`${flipped ? "rotate-y-180" : ""}
                ${isMobile? "h-[320px] w-[180px]" : "h-full w-full"}
                relative rounded-lg shadow-xl transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180`}>
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden bg-white">
                    <video autoPlay muted loop playsInline className="h-full w-full object-contain">
                        <source src={display} type="video/mp4" />
                    </video>
                </div>

                {/* Back Side */}
                <div className={`${isDark? "bg-[color:var(--blue-color)]" : "bg-[color:var(--primary-color)]"}
                    absolute inset-0 rotate-y-180 backface-hidden rounded-lg text-white flex flex-col items-center justify-center p-8`}>
                    
                    <h2 className={`${isMobile? "text-[length:var(--emdium-font)]" : "text-[length:var(--large-font)]"}
                        font-bold mb-4 text-center`}>
                        {title}
                    </h2>

                    <p className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--small-font)]"}
                        text-[length:var(--medium-font)] text-center leading-relaxed`}>
                        {text}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default FeatureCard