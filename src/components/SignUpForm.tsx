import type React from "react"
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Logo from "../assets/imgs/Logo.png"
import Google  from "../assets/imgs/Google.jpg"

type SignUpFormProps = {
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

function SignUpForm({setIsSignIn}: SignUpFormProps) {

    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignIn(false);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkingRedirect, setCheckingRedirect] = useState(true); 

    const googleProviderInstance = new GoogleAuthProvider();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Logged in:", user);
            } else {
                console.log("Logged out");
            }
        });
      
        return unsub;
    }, []);

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    console.log("Google redirect sign-up successful", result.user);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Redirect error:", error);
            } finally {
                setCheckingRedirect(false);
            }
        };
        handleRedirect();
    }, [navigate]);

    if (checkingRedirect) {
        return <div>Loading...</div>;
    }

    const handleEmailSignUp = async () => {
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }
        else if (!checked) {
            alert("You need to agree to our terms and privacy to sign up");
            return;
        }
      
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleSignUp = async () => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            signInWithRedirect(auth, googleProviderInstance);
        } else {
            signInWithPopup(auth, googleProviderInstance)
                .then((result) => {
                    console.log("Google sign-up successful", result.user);
                    navigate("/dashboard");
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
    };     

    return (
        <div className="h-auto w-full flex flex-col items-center justify-start px-[2rem] gap-[calc(0.4vw+0.6rem)]">
            <img src={Logo} alt="" className="h-16 w-16 cursor-pointer" />
            <span className="text-[1.4rem] font-bold cursor-pointer">Create an Account</span>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-[#F5FBE6] text-[0.8rem] placeholder:text-[0.8rem] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] outline-none border-b border-[#B8CFCE]"/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full bg-[#F5FBE6] text-[0.8rem] placeholder:text-[0.8rem] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] outline-none border-b border-[#B8CFCE]"/>
            <div className="flex flex-row items-center justify-center gap-[0.2rem]">
                <input onChange={(e) => setChecked(e.target.checked)} type="checkbox" name="" id="" />
                <span className="text-[0.8rem] text-gray-500 text-center cursor-pointer">I agree to the</span>
                <span className="text-[0.8rem] text-blue-500 cursor-pointer">Terms and Privacy.</span>
            </div>
            <span className="p-[1rem] w-full text-[0.8rem] text-center text-white bg-black cursor-pointer"
                onClick={handleEmailSignUp}>
                {loading ? "Creating account..." : "Sign Up"}
            </span>
            <div className="flex flex-row items-center justify-center gap-[0.2rem]">
                <span className="text-[0.8rem] text-gray-500 cursor-pointer">Already have an account yet?</span>
                <span className="text-[0.8rem] text-blue-500 cursor-pointer"
                    onClick={handleSwitch}>Sign in</span>
            </div>
            <div onClick={handleGoogleSignUp} className="flex flex-row items-center justify-center gap-[0.2rem] p-[0.2rem] bg-blue-500 cursor-pointer">
                <img src={Google} className="h-10 w-10" alt="" />
                <span className="text-[0.8rem] text-white px-[1rem]">
                    Sign up with Google
                </span>
            </div>
        </div>
    )
}

export default SignUpForm;
