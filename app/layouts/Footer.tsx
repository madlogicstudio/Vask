import { useRef } from 'react';
import DarkBanner from '../assets/Banner-light.png'
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

type FooterProps = {
    isDark: boolean;
}

function Footer({isDark}: FooterProps) {

    const isMobile = useIsMobile();
    const footerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            [
                footerRef.current,
                navRef.current,
                heroRef.current
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
                    trigger: footerRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.to(heroRef.current, {
            color: "#141215",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

    }, []);

    const scrollToTop = () => {
            window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div ref={footerRef} className={`${isDark ? "text-[var(--light-color)] bg-[var(--blue-color)]" : "bg-[var(--secondary-color)] text-[var(--light-color)]"}
            relative h-full w-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] py-[calc(0.6vw+0.4rem)] pb-0 rounded-lg rounded-b-none`}>
            
            <div ref={navRef} className={`${isMobile? "flex-col" : "flex-row"}
                flex-2 w-full flex items-satrt justify-center gap-[calc(0.6vw+0.4rem)] pt-[calc(0.6vw+0.4rem)]`}>
            
                <div className={`${isMobile? "gap-[calc(1.2vw+0.8rem)]" : ""}
                    h-full flex-2 flex flex-col items-start justify-between p-[calc(0.6vw+0.4rem)]`}>

                    <div className="w-full flex flex-col items-start justify-between">

                        <div className={`${isMobile? "items-center w-full" : "items-start"}
                            flex flex-col justify-between leading-[1]`}>
                            <span className='anek text-[length:var(--hero-font)] text-[color:var(--dark-color)] font-bold hovered cursor-pointer'>
                                Vehicle
                            </span>
                            <span className='anek text-[length:var(--hero-font)] text-[color:var(--light-color)] font-bold hovered cursor-pointer'>
                                Management 
                            </span>
                            <span className='anek text-[length:var(--hero-font)] text-[color:var(--pink-color)] font-bold hovered cursor-pointer'>
                                Reimagined.
                            </span>
                        </div>

                    </div>

                    <div className={`${isMobile? "justify-center" : "justify-start"}
                        w-full flex flex-row items-start gap-[calc(0.6vw+0.4rem)]`}>
                        <i className="bxl bx-facebook-circle bx-tada-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                        <i className="bxl bx-instagram bx-tada-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                        <i className="bxl bx-bluesky bx-tada-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                        <i className="bxl bx-github bx-tada-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                        <i className="bxl bx-vercel bx-tada-hover text-[length:var(--logo-size)] hovered cursor-pointer" />
                    </div>

                    <div className={`${isMobile? "flex-col justify-center" : "flex-row justify-start"}
                        h-auto w-full flex items-center`}>
                        <span className='text-[length:var(--medium-font)] text-[color:var(--dark-color)]  font-bold hovered cursor-pointer'>
                            Designed & Created By
                        </span>
                        <img src={DarkBanner.src} className='h-[240px] w-full object-contain cursor-pointer' alt="" />
                    </div>

                </div>

                <div className="h-full flex-1 flex flex-col items-center justify-start">

                    <div className={`${isMobile? "items-center" : "items-start"}
                        h-full w-full flex flex-col justify-between p-[calc(0.6vw+0.4rem)]`}>

                        <div className={`${isMobile? "items-center" : "items-start"}
                            flex flex-col justify-between gap-[calc(0.6vw+0.4rem)]`}>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                Home
                            </span>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                Support
                            </span>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                Account
                            </span>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                Our Team
                            </span>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                About Us
                            </span>
                            <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                                Madlogicstudio
                            </span>
                        </div>

                    </div>

                </div>

                <div className="flex-1 flex flex-col items-start justify-start">

                    <div className={`${isMobile? "items-center w-full" : "items-start"}
                        flex flex-col justify-between gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>

                        <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                            Contact
                        </span>
                        <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                            123 Example Road <br/> New York, NY 12345
                        </span>
                        <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                            madlogicstudiox@gmail.com
                        </span>
                        <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                            (555) 555-555
                        </span>
                        
                    </div>

                    <div className={`${isMobile? "items-center w-full" : "items-end"}
                        flex flex-col justify-start gap-[calc(0.6vw+0.4rem)]`}>
                        <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--hero-font)] hovered cursor-pointer" />
                    </div>

                </div>

            </div>

            <div ref={navRef} className={`${isMobile? "flex-col" : "flex-row"}
                flex-2 max-w-[1280px] w-full flex items-center justify-between gap-[calc(0.6vw+0.4rem)] pt-[calc(0.6vw+0.4rem)]`}>
                <div className={`${isMobile? "flex-col-reverse" : "flex-row"}
                    flex items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                    <span className={`${isMobile? "text-center" : ""}
                        poppins text-[length:var(--small-font)] hovered cursor-pointer`}>
                        © 2026 Vask. Madlogic. All rights reserved.
                    </span>
                    <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                        Privacy Policy
                    </span>
                    <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                        Terms of Service
                    </span>
                </div>
                <div className={`${isMobile? "w-full p-[calc(0.6vw+0.4rem)]" : ""}
                    flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                    <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                        Cookie Policy
                    </span>
                    <div className='flex flex-row items-center justify-between gap-[0.3em]'>
                        <span className='poppins text-[length:var(--small-font)] hovered cursor-pointer'>
                            Back to Top
                        </span>
                        <i className="bx bx-chevron-up bx-tada-hover text-[length:var(--title-font)] hovered cursor-pointer" 
                            onClick={scrollToTop}/>
                    </div>
                </div>
            </div>

            <span ref={heroRef} className={`${isMobile? "text-[length:var(--normalhuge-font)]" : "text-[length:var(--extrahuge-font)]"}
                poppins fadeIn w-full text-center cursor-pointer font-extrabold leading-[0.5em] overflow-hidden p-0 m-0`}
                style={{ color: "#ededed" }}>
                VASK
            </span>
        </div>
    )
}

export default Footer