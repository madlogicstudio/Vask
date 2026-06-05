'use client'

import { Theme } from '../components/Theme';
import lightIcon from '../assets/Icon.png'
import darkIcon from '../assets/Dark-icon.png'
import Footer from "../layouts/Footer"
import { useIsMobile } from "../hooks/useIsMobile"
import OTP from "../assets/Successful.png"
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { User } from '@/app/page';
import Error from '../assets/404.png'
import NotVerified from '../assets/Error.png'

function page() {

    const [isDark, setIsDark] = useState(true);
    const isMobile = useIsMobile();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [notVerified, setNotVerified] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const resendEmail = async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            alert("Verification email resent!");
        }
    };

    const checkVerification = async () => {
        try {
            const user = auth.currentUser;

            if (!user) return;

            await user.reload(); 

            if (user.emailVerified) {
                setLoading(true);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
                
            } else {
                setNotVerified(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if(loading){
        return(
            <div className={`w-screen h-screen flex flex-col items-center justify-center bg-white gap-[calc(0.6vw+0.4rem)]`}>

                <div className={`h-[360px] w-[360px] md:h-[600px] md:w-[600px]
                    flex flex-col items-center justify-center`}>
                <video autoPlay muted loop playsInline className="h-full w-full object-contain">
                    <source src="/Catronaut.mp4" type="video/mp4" />
                </video>
                </div>
                <div className={`w-16 h-16 md:w-24 md:h-24
                border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin`}></div>
                
            </div>
        )
    }

    if(user?.uid) return (
        <div className={`${isDark? "bg-[var(--dark-color)] text-[var(--light-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            relative w-full flex flex-col items-center justify-center pt-[calc(0.6vw+0.4rem)]`}>

            {notVerified && 
                <div className={`z-10 fadeIn h-screen w-full flex flex-col items-center justify-center px-[calc(0.6vw+0.4rem)] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}>
                    
                    <div className={`${isMobile? "h-[480px] w-full px-[calc(0.6vw+0.4rem)]" : "h-[680px] w-[680px] p-[calc(0.6vw+0.4rem)]"}
                        relative flex flex-col items-center justify-center bg-[var(--light-color)] rounded-lg rounded-tr-none`}>

                        <i className={`${isMobile? "text-[length:var(--medium-font)] top-[-8px] right-[-8px]" : "text-[length:var(--extrasmall-font)] top-[-16px] right-[-16px]"}
                            bx bx-x p-[calc(0.4vw+0.3rem)] rounded-full bg-[var(--primary-color)] text-[var(--light-color)] cursor-pointer absolute`} 
                            onClick={() => {
                                setNotVerified(false);

                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            }}/>

                        <img src={NotVerified.src} className='h-[480px] h-[480px] object-contain' alt="" />

                        <span className={`${isMobile? "text-[length:var(--title-font)] mb-[2rem]" : "text-[length:var(--medium-font)]"}
                            poppins font-semibold cursor-pointer transition duration-300 ease-in-out text-[var(--dark-color)] text-center hovered`}>
                            Not Verified Yet.
                        </span>

                    </div>

                </div>
            }
            
            <div className={`h-full w-full flex flex-row items-center justify-between px-[calc(0.6vw+0.4rem)]`}>

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

            <div className={`${isMobile? "h-auto my-[2rem] p-[calc(0.6vw+0.4rem)]" : "h-screen mt-[2rem]"}
                w-full max-w-[1200px] flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)]`}> 

                <span className={`${isDark? "text-[color:var(--light-color)]" : "text-[color:var(--primary-color)]"} 
                    text-[length:var(--medium-font)] font-bold cursor-pointer w-full
                    hover:text-[var(--highlight-color)] transition 300 ease-in-out text-center`}>
                    We’ve sent a verification link to your email
                </span>

                <div className={`${isMobile? "flex-col" : "flex-row"}
                    w-full flex items-center justify-center gap-[calc(0.3vw+0.2rem)]`}>
                    <span className={`${isDark? "text-[var(--light-color)]" : "text-[var(--dark-color)]"}
                        text-[length:var(--small-font)] font-normal text-[var(--dark-color)] text-center`}>
                        Please check your inbox (and spam folder) to continue.
                    </span>
                    <span className={`${isDark? "text-[var(--light-color)]" : "text-[var(--dark-color)]"}
                        text-[length:var(--small-font)] font-normal text-[var(--dark-color)] text-center`}>
                        Didn't receive a verification link? 
                    </span>
                    <span className={`${isDark? "text-[var(--pink-color)]" : "text-[var(--pink-color)]"}
                        text-[length:var(--small-font)] font-normal text-[var(--dark-color) ] text-center cursor-pointer hovered`}
                        onClick={() => {
                            resendEmail()
                        }}>
                        Resend
                    </span>
                </div>

                {isMobile && <div className={`${isDark? "bg-[var(--primary-color)]" : "bg-[var(--secondary-color)]"}
                    ${isMobile? "bg-transparent" : ""}
                    flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    <img src={OTP.src} className={`${isMobile? "w-[260px] " : "w-[540px]"}
                        h-auto object-cover`} alt="" />
                </div>}

                {!isMobile && <div className={`flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    <img src={OTP.src} className={`${isMobile? "w-[320px] " : "w-[540px]"}
                        h-auto object-cover`} alt="" />
                </div>}

                <span className={`${isDark? "bg-[var(--primary-color)]" : "bg-[var(--secondary-color)]"}
                    p-[calc(0.4vw+0.6rem)] text-[length:var(--small-font)] bg-[var(--dark-color)] text-[var(--light-color)] cursor-pointer
                    transition 300 ease-in-out `}
                    onClick={() => {
                        checkVerification()
                    }}>I’ve verified my email</span> 

            </div>

            <Footer isDark={isDark} />
        </div>
    )

    return(
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-screen flex flex-col items-center justify-center scroll-smooth`}>
            
            <img src={Error.src} className={`${isMobile? "h-[420px] w-[420px]" : "h-[620px] w-[620px]"}`} alt="" />

            <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
                ${isMobile? "w-[320px] p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                cursor-pointer rounded-full text-center`}
                onClick={() => router.push('/')}>
                Go back
            </span>
        </div>
    )
}

export default page