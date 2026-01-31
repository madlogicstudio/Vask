import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile"
import SignInForm from "./SignInForm";

type UserAuthProps = {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
    isDark: boolean;
}

function UserAuth({setIsAuth, isDark}: UserAuthProps) {

    const [isSignIn, setIsSignIn] = useState(false);

    const isMobile = useIsMobile();

    setIsSignIn

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,0.8)] absolute top-0 left-0">
            <div className={`${isMobile? 'h-auto w-[90%] p-[0.5rem]' : 'h-auto w-[60%] p-[2rem]'}
                bg-[var(--light-color)] text-[var(--dark-color)] relative flex flex-row items-center justify-center rounded-xl rounded-tr-none`}>
                <i onClick={() => setIsAuth((prev) => !prev)} className="fa-solid fa-circle-xmark text-[2rem]
                    cursor-pointer absolute top-0 right-0 mt-[-10px] mr-[-13px]"></i>
                <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
                    {!isSignIn && <SignInForm isDark={isDark}/>}
                </div>
            </div>
        </div>
    )
}

export default UserAuth