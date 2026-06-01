'use client'

import { useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type CtaProps = {
    isDark: boolean;
}

const Cta = ({isDark}: CtaProps) => {

    const isMobile = useIsMobile();
    const ctaRef = useRef<HTMLDivElement>(null);
    const titleRef1 = useRef<HTMLDivElement>(null);
    const titleRef2 = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                titleRef1.current,
                titleRef2.current,
                mainRef.current
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
                    trigger: ctaRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    return (
        <div ref={ctaRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "px-[calc(0.6vw+0.4rem)] mt-[2rem]" : ""}
            relative h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(1.2vw+0.8rem)] py-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={titleRef1} className='w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]'>
                <span className='anek text-[length:var(--title-font)] leading-[1.1] hovered cursor-pointer'>
                    Ready to Modernize Your Fleet?
                </span>

                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>
            <div ref={titleRef2} className={`${isMobile? "p-[calc(0.6vw+0.4rem)]" : ""}
                w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                <span className='anek text-[length:var(--medium-font)] leading-[1.1] hovered cursor-pointer'>
                    Transform the way you manage vehicles, drivers, and daily operations with Vask — a smart and modern fleet 
                    management platform built for speed, efficiency, and scalability.
                </span>
            </div>

            <div ref={mainRef} className={`${isMobile? "flex-col-reverse" : "flex-row"}
                h-full w-full flex  items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>

                <div className="h-full flex-1 flex flex-col items-start justify-between bg-[var(--primary-color)] px-[calc(1.2vw+0.8rem)] py-[calc(1.8vw+1.2rem)] rounded-lg">

                    <div className="w-full flex flex-col items-start justify-start gap-[calc(0.6vw+0.4rem)] cursor-pointer">

                        <input type="text" placeholder="Name" className="poppins w-full p-[calc(0.6vw+0.4rem)] rounded-lg text-[color:var(--light-color)] border-none outline-none 
                            bg-[var(--secondary-color)]"/>
                        
                        <input type="email" placeholder="Email" className="poppins w-full p-[calc(0.6vw+0.4rem)] rounded-lg text-[color:var(--light-color)] border-none outline-none 
                            bg-[var(--secondary-color)]"/>

                        <div className="flex items-start gap-[calc(0.4vw+0.3rem)] p-[0.3em] cursor-pointer">

                            <input type="checkbox"className="mt-1 cursor-pointer" />

                            <p className="text-[color:var(--light-color)] text-[length:var(--small-font)] leading-[1.4]">
                                By subscribing to our newsletter, you agree to our{" "}
                                
                                <span className="text-[color:var(--pink-color)] text-[length:var(--small-font)] cursor-pointer">
                                    privacy statement
                                </span>

                            </p>

                        </div>

                    </div>
                    <div className="mt-[2rem] flex flex-row items-center justify-center gap-[calc(0.4vw+0.3rem)] bg-[var(--secondary-color)] 
                        rounded-full p-[0.3em] cursor-pointer">
                        <i className="bx bx-send-alt-2 p-[0.6em] bg-[var(--primary-color)] text-[color:var(--light-color)] 
                            text-[length:var(--medium-font)] rounded-full" />
                        <span className='text-[color:var(--light-color)] pr-[0.6em] text-[length:var(--small-font)] cursor-pointer'>
                            Subscribe
                        </span>
                    </div>

                </div>

                <div className={`${isMobile? "flex-col-reverse" : ""}
                    h-full flex-2 flex flex-col items-start justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>

                    <div className="flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)] p-[0.3em] rounded-full cursor-pointer">
                        <i className="bx bx-envelope p-[0.6em] bg-[var(--primary-color)] text-[color:var(--light-color)] 
                            text-[length:var(--medium-font)] rounded-full" />
                        <span className='text-[color:var(--primary-color)] pr-[0.6em] text-[length:var(--medium-font)] cursor-pointer'>
                            Subscribe to our newsletter
                        </span>
                    </div>  

                    <div className="flex flex-col items-start justify-start gap-[calc(0.6vw+0.4rem)] cursor-pointer">
                        <span className='anek text-[length:var(--hero-font)] font-bold leading-[1.3] hovered cursor-pointer'>
                            Start Your Vask Journey Today
                        </span>
                        <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                            Join us towards smarter fleet management with real-time insights, better 
                            operational visibility, and data-driven decision making powered by Vask.
                        </span>
                    </div> 

                </div>

            </div>

        </div>
    )
}

export default Cta