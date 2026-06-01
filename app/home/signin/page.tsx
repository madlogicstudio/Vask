'use client'

import { useIsMobile } from '../hooks/useIsMobile'
import { Brand } from '../components/Brand';
import { Theme } from '../components/Theme';
import lightIcon from '../assets/Icon.png'
import darkIcon from '../assets/Dark-icon.png'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../layouts/Footer';
import ImageCarousel from '../components/ImageCarousel';

function page() {

    const isMobile = useIsMobile();
    const router = useRouter();
    const [isDark, setIsDark] = useState(false);
    const [showPass, setShowPass] = useState(false);

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "" : ""}
            h-auto w-full flex flex-col items-center justify-start fadeIn pt-[calc(0.4vw+0.3rem)] px-[calc(0.6vw+0.4rem)]`}>

            <div className={`w-full flex flex-row items-center justify-between px-[calc(0.6vw+0.4rem)]`}>

                <div className={`w-full flex flex-row items-center justify-start gap-[calc(0.6vw+0.4rem)]`}>
                    <img src={isDark? lightIcon.src : darkIcon.src} alt="" className='h-[var(--logo-size)] w-[var(--logo-size)] cursor-pointer'
                    onClick={() => router.push('/')}/>
                    <span className="tracking-[-0.035em] text-[28px] font-black cursor-pointer 
                        transition duration-300 ease-in-out hovered"
                        onClick={() => router.push('/')}>
                        Vask
                    </span>
                </div>
                
                <Theme 
                    systemIcon="bx bx-desktop"
                    lightIcon="bx bx-sun"
                    darkIcon="bx bx-moon"
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
                
            </div>

            <div className={`${isMobile? "h-screen flex-col" : "h-screen flex-row p-[calc(0.6vw+0.4rem)]"}
                w-full flex items-center justify-between`}>

                <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    
                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between`}>
                        <span className='anek text-[length:var(--hero-font)] cursor-pointer transition duration-300 ease-in-out hovered'>
                            Welcome Back!
                        </span>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}>
                            Sign in to continue managing your vehicles with vask.
                        </span>
                    </div>

                    {isMobile && <div className={`h-auto flex flex-col items-start justify-between gap-[calc(0.6vw+0.4rem)] rounded-lg bg-white mt-2 mb-4`}>
                        <ImageCarousel />
                    </div>}

                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                        <input type="text" placeholder="Email" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                            ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                        
                        <div className='w-full flex flex-row items-center justify-center relative'>
                            <input type="text" placeholder="Password" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                                ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                                poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                            
                        </div>

                        <span className='self-end poppins text-sm cursor-pointer transition duration-300 ease-in-out hovered'>
                            Forgot Password?
                        </span>
                    </div>

                    {/* <div className={`${isMobile? "w-full text-sm" : "w-[480px] text-md"}
                        flex flex-row items-start justify-start gap-[calc(0.6vw+0.4rem)]`}>

                        <input type="checkbox"className="mt-1 cursor-pointer" />

                        <p className="">
                            By subscribing to our newsletter, you agree to our{" "}
                            
                            <span className="text-[color:var(--pink-color)] cursor-pointer">
                                privacy statement
                            </span>

                        </p>

                    </div> */}

                    <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
                        ${isMobile? "w-full p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                        cursor-pointer rounded-full text-center`}>
                        Login
                    </span>

                    <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                        poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}>
                        Don't have an account yet? Signup now
                    </span>

                </div>

                {!isMobile && <div className={`flex-2 h-auto flex flex-col items-start justify-between gap-[calc(0.6vw+0.4rem)] rounded-lg bg-white`}>
                    <ImageCarousel />
                </div>}

            </div>

            <Footer isDark={isDark} />
            
        </div>
    )
}

export default page