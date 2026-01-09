import { useIsMobile } from '../hooks/useIsMobile'
import Parcel from '../assets/gif/Parcel.gif'
import { useState, useEffect } from 'react';
import UserAuth from '../components/UserAuth';
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function Content() {

    const isMobile = useIsMobile();

    const [isStart, setIsStart] = useState(false);

    const handleStart = () => {
        setIsStart(true);
    }

    const navigate = useNavigate();
    const [checkingRedirect, setCheckingRedirect] = useState(true);

    useEffect(() => {
        getRedirectResult(auth)
        .then((result) => {
            if (result?.user) {
            console.log("Google redirect login success", result.user);
            navigate("/dashboard");
            }
        })
        .catch(console.error)
        .finally(() => setCheckingRedirect(false));

        const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in:", user);
        }
        });

        return unsub;
    }, [navigate]);

    if (checkingRedirect) {
        return <div>Loading...</div>; 
    }

    return (
        <div className={`${isMobile? 'flex-col items-center justify-center' : 'flex-row items-center justify-start'}
            h-screen w-full flex bg-[#FEAE1A] p-[calc(0.6vw+0.4rem)]`}>
            {isStart && <UserAuth setIsStart={setIsStart} />}
            <div className={`${isMobile? 'mt-12 gap-[calc(1.2vw+0.8rem)] p-[calc(0.6vw+0.4rem)]' : 'flex-1 gap-[2rem]'}
                flex flex-col items-start justify-center`}> 
                <span className={`text-[2rem] font-bold`}>
                    Enhancing Vehicle Efficiency Through Digital Monitoring
                </span>
                {!isMobile && <span className={`p-[1rem] rounded-xl text-[0.9rem] text-[#FEAE1A] bg-black cursor-pointer`}
                    onClick={() => handleStart()}>Get Started</span>}
                {!isMobile && <span className={`text-[1rem]`}>
                    Vask is a smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.
                </span>}
            </div>
            <div className={`${isMobile? 'p-[calc(0.6vw+0.4rem)] gap-[calc(1.2vw+0.8rem)]' : 'flex-1'}
                flex flex-col items-start justify-center`}>
                <img src={Parcel} alt="" className={`${isMobile? 'h-auto' : 'h-[32rem]'}`} />
                {isMobile && <span className={`p-[0.9rem] rounded-xl text-[0.9rem] text-[#FEAE1A] bg-black cursor-pointer`}
                    onClick={() => handleStart()}>Get Started</span>}
                {isMobile && <span className={`text-[1rem]`}>
                    Vask is a smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.
                </span>}
            </div>
        </div>
    )
} 

export default Content