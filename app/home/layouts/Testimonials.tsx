"use client";

import { useState, useRef } from "react";
import ProofCard from "../components/ProofCard";
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type TestimonialsProps = {
    isDark: boolean;
}

const Testimonials = ({ isDark }: TestimonialsProps) => {

    const isMobile = useIsMobile();
    const [current, setCurrent] = useState(0);
    const proofRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                numRef.current,
                titleRef.current,
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
                    trigger: proofRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    const testimonials = [
        {
            message: "Working with this platform has really improved our efficiency in ways we didn't expect. The interface feels intuitive, the navigation is seamless, and the support team responds quickly.",
            userImage: "/Profile.png",
            userName: "Olivia Turner",
            position: "Operations Manager",
        },
        {
            message: "The analytics and monitoring tools gave us complete visibility over our operations. We reduced delays and improved coordination significantly.",
            userImage: "/Profile.png",
            userName: "James Carter",
            position: "Fleet Supervisor",
        },
        {
            message: "Implementation was smooth and the automation features helped us minimize paperwork and manual reporting almost immediately.",
            userImage: "/Profile.png",
            userName: "Sophia Lee",
            position: "Logistics Coordinator",
        },
    ];

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    return (
        <div ref={proofRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            relative h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(1.2vw+0.8rem)] py-[calc(0.6vw+0.4rem)]`}>

            <div ref={numRef} className={`${isMobile? "p-[calc(0.6vw+0.4rem)]" : ""}
                w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                <span className='anek text-[length:var(--title-font)] leading-[1.1] hovered cursor-pointer'>
                    [ 06 ] Testimonials
                </span>

                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>

            <div ref={titleRef} className={`${isMobile? "flex-col p-[calc(1.2vw+0.8rem)]" : "flex-row"}
                h-full w-full flex items-center justify-between gap-[calc(1vw+0.8rem)]`}>

                <div className="flex-1 h-[240px] flex flex-col items-start justify-center gap-[calc(0.6vw+0.4rem)]">

                    <span className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                        anek text-[length:var(--title-font)] leading-[1.1] hovered cursor-pointer`}>
                        What our users are saying
                    </span>

                    <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                        Our platform has delivered consistent and measurable improvements for professionals across various industries.
                    </span>

                </div>

                <div ref={cardRef} className="flex-2 w-full overflow-hidden relative">

                    <div className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                        }}
                    >
                        {testimonials.map((item, index) => (
                            <div key={index} className="min-w-full">
                                <ProofCard
                                    message={item.message}
                                    userImage={item.userImage}
                                    userName={item.userName}
                                    position={item.position}
                                    isDark={isDark}
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </div>
            <div className={`${isMobile? "justify-center" : "justify-end"}
                w-full flex flex-row items-center gap-[calc(0.4vw+0.3rem)]`}>

                <i
                    onClick={prevSlide}
                    className="bx bx-chevron-left text-[length:var(--logo-size)] hovered cursor-pointer"
                />

                <i
                    onClick={nextSlide}
                    className="bx bx-chevron-right text-[length:var(--logo-size)] hovered cursor-pointer"
                />

            </div>

        </div>
    );
}

export default Testimonials;