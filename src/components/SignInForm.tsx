import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import Logo from "../assets/imgs/Logo.png"
import Google from "../assets/imgs/Google.jpg"
import { useNavigate } from "react-router-dom";

type SignInFormProps = {
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

function SignInForm({setIsSignIn}: SignInFormProps) {

    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();

    const handleSwitch = () => {
        setIsSignIn(true);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        getRedirectResult(auth)
        .then((result) => {
            if (result && result.user) {
                console.log("Google redirect sign-in successful", result.user);
                navigate("/dashboard");
            }
        })
        .catch((error) => {
            console.error("Redirect error:", error);
        });
    }, [navigate]);

    const handleEmailSignIn = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully!");
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };      

    const handleGoogleSignIn = async () => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            signInWithRedirect(auth, googleProvider);
        } else {
            signInWithPopup(auth, googleProvider)
              .then((result) => {
                console.log("Google sign-in successful", result.user);
                navigate("/dashboard");
              })
              .catch((error) => {
                console.error(error);
              });
        }
    };

    return (
        <div className="h-auto w-full flex flex-col items-center justify-start px-[2rem] gap-[calc(0.4vw+0.6rem)]">
            <img src={Logo} alt="" className="h-16 w-16 cursor-pointer" />
            <span className="text-[1.4rem] font-bold cursor-pointer">Welcome Back!</span>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-[#F5FBE6] text-[0.8rem] placeholder:text-[0.8rem] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] outline-none border-b border-[#B8CFCE]"/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full bg-[#F5FBE6] text-[0.8rem] placeholder:text-[0.8rem] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] outline-none border-b border-[#B8CFCE]"/>
            <div className="flex flex-col items-center justify-center gap-[0.2rem]">
                <span className="text-[0.8rem] text-gray-500 text-center cursor-pointer">By signing in you agree to our company's</span>
                <span className="text-[0.8rem] text-blue-500 cursor-pointer">Terms and Privacy.</span>
            </div>
            <span onClick={handleEmailSignIn} className="p-[1rem] w-full text-[0.8rem] text-center text-white bg-black cursor-pointer">
                {loading ? "Signing in..." : "Sign In"}
            </span>
            <div className="flex flex-row items-center justify-center gap-[0.2rem]">
                <span className="text-[0.8rem] text-gray-500 cursor-pointer">Don't have an account yet?</span>
                <span onClick={() => handleSwitch()} className="text-[0.8rem] text-blue-500 cursor-pointer">Sign up</span>
            </div>
            <div onClick={handleGoogleSignIn} className="flex flex-row items-center justify-center gap-[0.4rem] p-[0.4rem] bg-blue-500 cursor-pointer">
                <img src={Google} className="h-10 w-10" alt="" />
                <span className="text-[0.8rem] text-white px-[1rem]">
                    Sign in with Google
                </span>
            </div>
        </div>
    )
}

export default SignInForm;
