import { useState, useRef } from "react";
import { FaqCard } from "../components/FaqCard"
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";
import { useIsMobile } from "../hooks/useIsMobile";

type FaqProps = {
    isDark: boolean;
}

const Faq = ({isDark}: FaqProps) => {

    const isMobile = useIsMobile();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                numRef.current,
                iconRef.current,
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
                    trigger: faqRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

    }, []);

    const Faqs = [
        {
            title: "How does Vask improve fleet management?",
            text: "We centralizes vehicle monitoring, driver management, maintenance scheduling, and operational analytics into a single platform. This helps businesses reduce downtime, improve efficiency, lower operational costs, and make faster data-driven decisions."
        },
        {
            title: "Does Vask support real-time vehicle tracking?",
            text: "Yes we provides 24/7 real-time GPS tracking that allows fleet managers to monitor vehicle locations, routes, fuel usage, and driver activity through a centralized dashboard."
        },
        {
            title: "Can Vask help reduce operational costs?",
            text: "We helps reduce fuel consumption, maintenance expenses, and administrative workload through route optimization, predictive maintenance alerts, and digital automation features."
        },
        {
            title: "How does predictive maintenance work in Vask?",
            text: "The system continuously monitors vehicle conditions and automatically detects potential maintenance issues. Managers receive alerts for scheduled servicing, diagnostics, and component health checks to prevent unexpected breakdowns."
        },
        {
            title: "Is Vask suitable for small and large fleets?",
            text: "Yes, we is scalable and can support both small businesses with a few vehicles and large enterprises managing extensive fleet operations."
        },
        {
            title: "Does Vask provide reporting and analytics?",
            text: "Absolutely. Vask includes smart analytics and reporting tools that generate operational insights, maintenance records, fuel reports, and driver performance analytics to support strategic decision-making."
        }
    ];

    return (
        <div ref={faqRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "" : "mb-[4rem]"}
            relative h-auto max-w-[1280px] w-full flex flex-col items-center justify-center gap-[calc(1.2vw+0.8rem)] py-[calc(0.6vw+0.4rem)]`}>
            
            <div ref={numRef} className={`${isMobile? "p-[calc(0.6vw+0.4rem)]" : ""}
                w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                <span className='anek text-[length:var(--title-font)] leading-[1.1] hovered cursor-pointer'>
                    [ 07 ] FAQs
                </span>

                <i ref={iconRef} className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
            </div>
            <div className={`${isMobile? "p-[calc(1.2vw+0.8rem)]" : ""}
                h-full w-full flex flex-row items-center justify-between gap-[calc(1vw+0.8rem)]`}>

                <div ref={cardRef} className="w-full flex flex-col items-start justify-center gap-[calc(0.6vw+0.4rem)]">

                    <span className={`${isDark? "text-[color:var(--pink-color)]" : "text-[color:var(--primary-color)]"}
                        anek text-[length:var(--title-font)] leading-[1.1] hovered cursor-pointer`}>
                        Frequently asked questions
                    </span>

                    <span className='anek text-[length:var(--medium-font)] leading-[1.3] hovered cursor-pointer'>
                        Here are some common questions about our services to help you understand better.
                    </span>

                    {Faqs.map((item, index) => (
                        <div key={index} className="w-full overflow-hidden relative rounded-lg shadow-xl">
                            <FaqCard isDark={isDark} title={item.title} text={item.text}
                                setDropDown={() => setOpenIndex(openIndex === index ? null : index)} dropDown={openIndex === index}/>
                        </div>
                    ))}

                </div>

            </div>
            
        </div>
    )
}

export default Faq