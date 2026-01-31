import { useIsMobile } from "../hooks/useIsMobile"
import { useState, useRef, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import SigninAnim from "../assets/vids/Signin.mp4"
import { auth } from "../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

type SignInFormProps = {
    isDark: boolean;
}

function SignInForm({ isDark } : SignInFormProps) {

    const isMobile = useIsMobile();

    const [isVisible, setIsVisible] = useState(false);

    const [switchForm, setSwitchForm] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    
    useEffect(() => {
        if (!switchForm && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
    }, [switchForm]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Signed in successfully!");
            console.log(user);
        })
        .catch((error) => {
            alert("Wrong email or password!");
            console.log("Wrong email or password.", error);
        });
    }

    return (
        <div className={`${isMobile? 'flex-col' : 'flex-row'}
            ${isDark? '' : 'bg-[var(--light-color)] text-[var(--dark-color)] border-[var(--dark-color)]'}
            h-full w-full flex items-center justify-center`}>
            {!isMobile && !switchForm && <div className='flex-1 h-full w-full flex flex-col items-center justify-center'>
                <video 
                ref={videoRef}
                src={SigninAnim}
                muted
                playsInline>
                </video>
            </div>}
            {!switchForm && <div className={`${isMobile? 'items-start' : 'items-start'}
                flex-1 h-full w-full flex flex-col justify-center gap-[1rem] p-[1rem]`}>
                <span className='font-semibold text-[1rem] cursor-pointer'>Welcome Back!</span>
                <span className='font-semibold text-[1.5rem] cursor-pointer'>Sign In to Vask</span>
                <div className="relative w-full flex items-center">
                    <input type="email" required placeholder=" "
                        className={`peer w-full pt-6 pb-2 px-2 text-[1rem] outline-none border-b-2 
                        invalid:not-focus:[&:not(:placeholder-shown)]:border-red-500
                        ${isDark? '' : 'border-[var(--dark-color)]'}`}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className={`absolute left-2 top-4 text-[var(--primary-color)] text-base transition-all
                        peer-focus:top-1 peer-focus:text-sm
                        peer-[&:not(:placeholder-shown)]:top-1
                        peer-[&:not(:placeholder-shown)]:text-sm`}>
                        Email
                    </label>
                    <i className='bx bx-envelope bx-tada-hover absolute right-2 text-[1.2rem] text-[var(--primary-color)] cursor-pointer'></i> 
                </div>
                <div className="relative w-full flex items-center">
                    <input type={isVisible? 'text' : 'password'} required
                        className={`${isDark? '' : 'border-[var(--dark-color)]'}
                            peer w-full pt-6 pb-2 px-2 text-[1rem] outline-none border-b-2 border-[var(--dark-color)]`}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="absolute left-2 top-4 text-[var(--primary-color)] text-base transition-all
                        peer-focus:top-1 peer-focus:text-sm
                        peer-valid:top-1 peer-valid:text-sm">
                        Password
                    </label>
                    <i className={`${isVisible? 'bx bx-eye bx-tada-hover absolute right-2 text-[1.3rem] text-[var(--primary-color)] cursor-pointer' : 
                        'bx bx-eye-closed bx-tada-hover absolute right-2 text-[1.3rem] text-[var(--primary-color)] cursor-pointer'}
                    `}
                    onClick={() => setIsVisible((prev) => !prev)}></i> 
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row item-center gap-[0.5rem] pl-[0.5rem]">
                        <input type="checkbox" className="text-[1rem] cursor-pointer" />
                        <span className='text-[1rem] cursor-pointer'>Remeber me</span>
                    </div>
                    <div className="flex flex-row item-center gap-[0.5rem] pl-[0.5rem]">
                        <span className={`${isDark? '' : 'text-[var(--dark-color)]'}
                            text-[0.9rem] underline hovered-light cursor-pointer`}>Forgot Password</span>
                    </div>
                </div>
                <span className={`${isDark? '' : ''}
                    w-full text-[var(--light-color)] bg-[var(--dark-color)] text-center hovered-button text-[1rem] p-[1rem] cursor-pointer`}
                    onClick={handleSignIn} 
                    >Sign In</span>
                <div className="flex flex-row item-center gap-[0.5rem] pl-[0.5rem]">
                    <span className={`text-[var(--dark-color)]
                        text-[0.9rem] cursor-pointer`}>Don't have an account yet?</span>
                    <span className={`text-[var(--dark-color)]
                    text-[0.9rem] underline hovered-light cursor-pointer`}
                    onClick={() => setSwitchForm((prev) => !prev)}>Sign Up</span>
                </div>
            </div>}
            {switchForm && <SignUpForm isDark={isDark} switchForm={switchForm} setSwitchForm={setSwitchForm} />}
        </div>
    )
}

export default SignInForm