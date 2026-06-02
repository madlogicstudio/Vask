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
import { User } from '@/app/page';

function page() {

    const isMobile = useIsMobile();
    const router = useRouter();
    const [isDark, setIsDark] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

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

            alert("Sign in successfully!");

            router.push("/");
        } catch (err) {
            console.error(err);
            alert("Wrong email or password!");
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

            alert("Account created successfully!");
            router.push("/home/verify");
        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "" : ""}
            h-auto w-full flex flex-col items-center justify-start fadeIn pt-[calc(0.4vw+0.3rem)] px-[calc(0.6vw+0.4rem)]`}>

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

            {!isSignup && <div className={`${isMobile? "h-screen flex-col my-4" : "h-screen flex-row p-[calc(0.6vw+0.4rem)]"}
                w-full max-w-[1280px] flex items-center justify-between`}>

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
                            ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                        
                        <div className='w-full flex flex-row items-center justify-center relative'>
                            <input ref={signinPassword} type="password" placeholder="Password" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                                ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                                poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                            
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
                            Signup now
                        </span>
                    </div>
                    

                </div>

                {!isMobile && <div className={`flex-1 h-full flex flex-col items-center justify-center gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]`}>
                    <img src={Signin.src} alt="" />
                </div>}

            </div>}

            {isSignup && <div className={`${isMobile? "h-screen flex-col my-4" : "h-screen flex-row p-[calc(0.6vw+0.4rem)]"}
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
                            ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>

                        <input ref={signupConfirmEmail} type="email" placeholder="Confirm Email" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                            ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                            poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                        
                        <div className='w-full flex flex-row items-center justify-center relative'>
                            <input ref={signupPassword} type="password" placeholder="Password" className={`${isDark? "border-[color:var(--light-color)]" : "border-[color:var(--dark-color)]"}
                                ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)]"}
                                poppins w-full rounded-full border outline-none bg-transparent placeholder:text-sm text-sm`}/>
                            
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
                            Signin here
                        </span>
                    </div>
                    

                </div>

            </div>}

            <Footer isDark={isDark} />
            
        </div>
    )
}

export default page