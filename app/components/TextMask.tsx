"use client";

import { useState, useRef, useEffect } from "react"
import { useIsMobile } from "../hooks/useIsMobile";

type TextMaskProps = {
    title: string;
    video: string;
}

export const TextMask = ({title, video}: TextMaskProps) => {

    const [isHover ,setIsHover] = useState(false);
    const isMobile = useIsMobile();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2; // 2x speed
        }
    }, []);

    return (
        <div className="relative h-[60px] w-[90px] overflow-hidden transition duration-300 ease-in-out
            flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>

            {!isHover && !isMobile && <span className="tracking-[-0.035em] text-[32px] font-black cursor-pointer 
                transition duration-300 ease-in-out">
                {title}
            </span>}
            {!isHover && isMobile && <span className="tracking-[-0.035em] text-[28px] font-black cursor-pointer 
                transition duration-300 ease-in-out">
                {title}
            </span>}

            {isHover && <svg viewBox="0 0 280 200" className="absolute inset-0 h-full w-full cursor-pointer">
                <defs>
                <mask id="text-mask">
                    
                    {/* Hidden area */}
                    <rect width="100%" height="100%" fill="black" />

                    {/* Visible text */}
                    <text x="50%" y="50%" textAnchor="middle" fill="white" dy=".35em" fontSize="90" fontWeight="800" fontStyle="normal"
                        stroke="black" strokeWidth="3" paintOrder="stroke">
                        {title}
                    </text>
                </mask>
                </defs>

                {/* Video only visible inside text */}
                <foreignObject width="100%" height="100%" mask="url(#text-mask)">

                    <video ref={videoRef} autoPlay muted loop playsInline className="h-full w-full object-cover">
                        <source src={video} type="video/mp4" />
                    </video>
                </foreignObject>
            </svg>}

        </div>
    )
}
