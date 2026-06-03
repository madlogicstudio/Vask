'use client'

import { useIsMobile } from '../hooks/useIsMobile'
import { Brand } from '../components/Brand';
import { Theme } from '../components/Theme';
import lightIcon from '../assets/Icon.png'
import darkIcon from '../assets/Dark-icon.png'
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../layouts/Footer';
import Signin from '../assets/Signin.png'
import Signup from '../assets/Signup.png'
import { auth } from "../firebase/FirebaseConfig";
import { signInWithEmailAndPassword ,sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Successful from '../assets/Successful.png'
import Error from '../assets/Error.png'

function page() {

    const isMobile = useIsMobile();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [successSignin, setSuccessSignin] = useState(false);
    const [failedSignin, setFailedSignin] = useState(false);
    const [successSignup, setSuccessSignup] = useState(false);
    const [failedSignup, setFailedSignup] = useState(false);

    const signinEmail = useRef<HTMLInputElement>(null);
    const signinPassword = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        try {
            const email = signinEmail.current?.value || "";
            const password = signinPassword.current?.value || "";

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const firebaseUser = userCredential.user;

            const user = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
            };

            sessionStorage.setItem("user", JSON.stringify(user));

            setSuccessSignin(true);

        } catch (err) {
            console.error(err);
            setFailedSignin(true);
        }
    };

    const signupEmail = useRef<HTMLInputElement>(null);
    const signupPassword = useRef<HTMLInputElement>(null);
    const signupConfirmEmail = useRef<HTMLInputElement>(null);

    const handleSignUp = async () => {
        try {
            const email = signupEmail.current?.value || "";
            const confirmEmail = signupConfirmEmail.current?.value || "";
            const password = signupPassword.current?.value || "";

            if (email !== confirmEmail) {
                alert("Emails do not match!");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const newUser = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            };

            sessionStorage.setItem("user", JSON.stringify(newUser));

            await setDoc(doc(db, "operators", userCredential.user.uid), {
                email: newUser.email,
                createdAt: new Date(),
            });

            await sendEmailVerification(userCredential.user);

            setSuccessSignup(true);
        } catch (error: any) {
            console.error(error.message);
            setFailedSignup(true);
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

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "" : ""}
            h-auto w-full flex flex-col items-center justify-start fadeIn pt-[calc(0.4vw+0.3rem)]`}>
            
            {successSignin && 
                <div className={`z-10 fadeIn h-screen w-full flex flex-col items-center justify-center px-[calc(0.6vw+0.4rem)] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}>
                    
                    <div className={`${isMobile? "h-[480px] w-full px-[calc(0.6vw+0.4rem)]" : "h-[680px] w-[680px] p-[calc(0.6vw+0.4rem)]"}
                        relative flex flex-col items-center justify-center bg-[var(--light-color)] rounded-lg rounded-tr-none`}>

                        <i className={`${isMobile? "text-[length:var(--medium-font)] top-[-8px] right-[-8px]" : "text-[length:var(--extrasmall-font)] top-[-16px] right-[-16px]"}
                            bx bx-x p-[calc(0.4vw+0.3rem)] rounded-full bg-[var(--primary-color)] text-[var(--light-color)] cursor-pointer absolute`} 
                            onClick={() => {
                                setSuccessSignin(false);
                                setLoading(true);

                                setTimeout(() => {
                                    router.push('/dashboard');
                                }, 3000);
                            }}/>

                        <img src={Successful.src} className='h-[480px] h-[480px] object-contain' alt="" />

                        <span className={`${isMobile? "text-[length:var(--title-font)] mb-[2rem]" : "text-[length:var(--large-font)]"}
                            poppins font-semibold cursor-pointer transition duration-300 ease-in-out text-[var(--dark-color)] hovered`}>
                            Signed in Successfully!
                        </span>

                    </div>

                </div>
            }
            {successSignup && 
                <div className={`z-10 fadeIn h-screen w-full flex flex-col items-center justify-center px-[calc(0.6vw+0.4rem)] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}>
                    
                    <div className={`${isMobile? "h-[480px] w-full px-[calc(0.6vw+0.4rem)]" : "h-[680px] w-[680px] p-[calc(0.6vw+0.4rem)]"}
                        relative flex flex-col items-center justify-center bg-[var(--light-color)] rounded-lg rounded-tr-none`}>

                        <i className={`${isMobile? "text-[length:var(--medium-font)] top-[-8px] right-[-8px]" : "text-[length:var(--extrasmall-font)] top-[-16px] right-[-16px]"}
                            bx bx-x p-[calc(0.4vw+0.3rem)] rounded-full bg-[var(--primary-color)] text-[var(--light-color)] cursor-pointer absolute`} 
                            onClick={() => {
                                setSuccessSignup(false);
                                setLoading(true);

                                setTimeout(() => {
                                    router.push('/home/verify');
                                }, 3000);
                            }}/>

                        <img src={Successful.src} className='h-[480px] h-[480px] object-contain' alt="" />

                        <span className={`${isMobile? "text-[length:var(--title-font)] mb-[2rem]" : "text-[length:var(--large-font)]"}
                            poppins font-semibold cursor-pointer transition duration-300 ease-in-out text-[var(--dark-color)] hovered`}>
                            Signed up Successfully!
                        </span>

                    </div>

                </div>
            }
            {failedSignin && 
                <div className={`z-10 fadeIn h-screen w-full flex flex-col items-center justify-center px-[calc(0.6vw+0.4rem)] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}>
                    
                    <div className={`${isMobile? "h-[480px] w-full px-[calc(0.6vw+0.4rem)]" : "h-[680px] w-[680px] p-[calc(0.6vw+0.4rem)]"}
                        relative flex flex-col items-center justify-center bg-[var(--light-color)] rounded-lg rounded-tr-none`}>

                        <i className={`${isMobile? "text-[length:var(--medium-font)] top-[-8px] right-[-8px]" : "text-[length:var(--extrasmall-font)] top-[-16px] right-[-16px]"}
                            bx bx-x p-[calc(0.4vw+0.3rem)] rounded-full bg-[var(--primary-color)] text-[var(--light-color)] cursor-pointer absolute`} 
                            onClick={() => {
                                setFailedSignin(false);

                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            }}/>

                        <img src={Error.src} className='h-[480px] h-[480px] object-contain' alt="" />

                        <span className={`${isMobile? "text-[length:var(--title-font)] mb-[2rem]" : "text-[length:var(--medium-font)]"}
                            poppins font-semibold cursor-pointer transition duration-300 ease-in-out text-[var(--dark-color)] text-center hovered`}>
                            Incorrect email or password!
                        </span>

                    </div>

                </div>
            }
            {failedSignup && 
                <div className={`z-10 fadeIn h-screen w-full flex flex-col items-center justify-center px-[calc(0.6vw+0.4rem)] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}>
                    
                    <div className={`${isMobile? "h-[480px] w-full px-[calc(0.6vw+0.4rem)]" : "h-[680px] w-[680px] p-[calc(0.6vw+0.4rem)]"}
                        relative flex flex-col items-center justify-center bg-[var(--light-color)] rounded-lg rounded-tr-none`}>

                        <i className={`${isMobile? "text-[length:var(--medium-font)] top-[-8px] right-[-8px]" : "text-[length:var(--extrasmall-font)] top-[-16px] right-[-16px]"}
                            bx bx-x p-[calc(0.4vw+0.3rem)] rounded-full bg-[var(--primary-color)] text-[var(--light-color)] cursor-pointer absolute`} 
                            onClick={() => {
                                setFailedSignup(false);

                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            }}/>

                        <img src={Error.src} className='h-[480px] h-[480px] object-contain' alt="" />

                        <span className={`${isMobile? "text-[length:var(--title-font)] mb-[2rem]" : "text-[length:var(--medium-font)]"}
                            poppins font-semibold cursor-pointer transition duration-300 ease-in-out text-[var(--dark-color)] text-center hovered`}>
                            Sign up Failed!
                        </span>

                    </div>

                </div>
            }

            <div className={`h-full w-full flex flex-row items-center justify-center px-[calc(0.6vw+0.4rem)]`}>

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

            {!isSignup && <div className={`${isMobile? "h-auto flex-col my-4 px-[calc(0.6vw+0.4rem)]" : "h-screen flex-row p-[calc(0.6vw+0.4rem)]"}
                w-full max-w-[1280px] flex items-center justify-center`}>

                <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    
                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between`}>
                        <span className={`${isMobile? "text-[length:var(--hero-font)]" : "text-[length:var(--title-font)]"}
                            poppins font-bold cursor-pointer transition duration-300 ease-in-out hovered`}>
                            Welcome Back!
                        </span>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}>
                            Sign in to continue managing your vehicles with vask.
                        </span>
                    </div>

                    {isMobile && <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                        <img src={Signin.src} alt="" />
                    </div>}

                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                        <input ref={signinEmail} type="email" placeholder="Email" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                            ${isMobile? "py-[calc(0.6vw+0.4rem)] px-[calc(1.2vw+0.8rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                        
                        <div className='w-full flex flex-row items-center justify-center relative'>
                            <input ref={signinPassword} type={`${showPass? "text" : "password"}`} placeholder="Password" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                                ${isMobile? "py-[calc(0.6vw+0.4rem)] px-[calc(1.2vw+0.8rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                                poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                            <i className={`${isMobile? "text-[length:var(--large-font)] right-[calc(0.4vw+0.3rem)]" : "text-[length:var(--small-font)] right-0"}
                                bx ${showPass? "bx-eye" : "bx-eye-slash"} bx-tada-hover cursor-pointer absolute hovered p-[calc(0.6vw+0.4rem)]`} 
                                onClick={() => setShowPass(prev => !prev)}/>
                        </div>

                        <span className='self-end poppins text-sm cursor-pointer transition duration-300 ease-in-out hovered'>
                            Forgot Password?
                        </span>
                    </div>

                    <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
                        ${isMobile? "w-full p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                        cursor-pointer rounded-full text-center`}
                        onClick={handleLogin}>
                        Login
                    </span>

                    <div className='flex flex-row items-center gap-[calc(0.4vw+0.3rem)]'>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center`}>
                            Don't have an account yet? 
                        </span>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}
                            onClick={() => setIsSignup(true)}>
                            Sign up here
                        </span>
                    </div>
                    

                </div>

                {!isMobile && <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    <img src={Signin.src} alt="" />
                </div>}

            </div>}

            {isSignup && <div className={`${isMobile? "h-screen flex-col my-4 px-[calc(0.6vw+0.4rem)]" : "h-screen flex-row p-[calc(0.6vw+0.4rem)]"}
                w-full max-w-[1280px] flex items-center justify-between`}>

                {!isMobile && <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    <img src={Signup.src} alt="" />
                </div>}

                <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    
                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between`}>
                        <span className={`${isMobile? "text-[length:var(--hero-font)]" : "text-[length:var(--title-font)]"}
                            poppins font-bold cursor-pointer transition duration-300 ease-in-out hovered`}>
                            Get Started
                        </span>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}>
                            Sign up to start managing your vehicles with vask.
                        </span>
                    </div>

                    {isMobile && <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                        <img src={Signin.src} alt="" />
                    </div>}

                    <div className={`${isMobile? "w-full" : "w-[480px]"}
                        flex flex-col items-center justify-between gap-[calc(0.6vw+0.4rem)]`}>
                        <input ref={signupEmail} type="email" placeholder="Email" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                            ${isMobile? "py-[calc(0.6vw+0.4rem)] px-[calc(1.2vw+0.8rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>

                        <input ref={signupConfirmEmail} type="email" placeholder="Confirm Email" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                            ${isMobile? "py-[calc(0.6vw+0.4rem)] px-[calc(1.2vw+0.8rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                        
                        <div className='w-full flex flex-row items-center justify-center relative'>
                            <input ref={signupPassword} type={`${showPass? "text" : "password"}`} placeholder="Password" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                                ${isMobile? "py-[calc(0.6vw+0.4rem)] px-[calc(1.2vw+0.8rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                                poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                            <i className={`${isMobile? "text-[length:var(--large-font)] right-[calc(0.4vw+0.3rem)]" : "text-[length:var(--small-font)] right-0"}
                                bx ${showPass? "bx-eye" : "bx-eye-slash"} bx-tada-hover cursor-pointer absolute hovered p-[calc(0.6vw+0.4rem)]`} 
                                onClick={() => setShowPass(prev => !prev)}/>
                        </div>

                        <span className='self-end poppins text-sm cursor-pointer transition duration-300 ease-in-out hovered'>
                            Forgot Password?
                        </span>

                    </div>

                    <span className={`${isDark ? "text-[var(--dark-color)] bg-[var(--light-color)]" : "bg-[var(--dark-color)] text-[var(--light-color)]"}
                        ${isMobile? "w-full p-[calc(0.6vw+0.4rem)]" : "w-[480px] px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                        cursor-pointer rounded-full text-center`}
                        onClick={handleSignUp}>
                        Sign up
                    </span>

                    <div className='flex flex-row items-center gap-[calc(0.4vw+0.3rem)]'>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center`}>
                            Already have an account? 
                        </span>
                        <span className={`${isMobile? "text-sm" : "text-md mb-12"}
                            poppins cursor-pointer transition duration-300 ease-in-out text-center hovered`}
                            onClick={() => setIsSignup(false)}>
                            Sign in here
                        </span>
                    </div>
                    

                </div>

            </div>}

            <Footer isDark={isDark} />
            
        </div>
    )
}

export default page