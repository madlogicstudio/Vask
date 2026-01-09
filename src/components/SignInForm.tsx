import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  getRedirectResult
} from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import Logo from "../assets/imgs/Logo.png";
import Google from "../assets/imgs/Google.jpg";

type SignInFormProps = {
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
};

function SignInForm({ setIsSignIn }: SignInFormProps) {
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSwitch = () => setIsSignIn(true);

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    console.log("Redirect login successful", result.user);
                    navigate("/dashboard");
                }
            })
            .catch(console.error);

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) console.log("Logged in:", user);
        });

        return unsub;
    }, []);

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

    const handleGoogleSignIn = () => {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            signInWithRedirect(auth, googleProvider); // mobile
        } else {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    console.log("Google sign-in successful", result.user);
                    navigate("/dashboard");
                })
                .catch(console.error);
        }
    };

    return (
        <div className="h-auto w-full flex flex-col items-center justify-start px-[2rem] gap-[calc(0.4vw+0.6rem)]">
            <img src={Logo} alt="" className="h-16 w-16 cursor-pointer" />
            <span className="text-[1.4rem] font-bold cursor-pointer">Welcome Back!</span>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full ..." />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full ..." />
            <span onClick={handleEmailSignIn} className="p-[1rem] w-full text-center text-white bg-black cursor-pointer">
                {loading ? "Signing in..." : "Sign In"}
            </span>
            <div onClick={handleGoogleSignIn} className="flex flex-row items-center justify-center gap-[0.4rem] p-[0.4rem] bg-blue-500 cursor-pointer">
                <img src={Google} className="h-10 w-10" alt="" />
                <span className="text-[0.8rem] text-white px-[1rem]">Sign in with Google</span>
            </div>
        </div>
    );
}

export default SignInForm;
