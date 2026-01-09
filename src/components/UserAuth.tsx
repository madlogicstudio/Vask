import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile"
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type UserAuthProps = {
    setIsStart: React.Dispatch<React.SetStateAction<boolean>>
}

function UserAuth({setIsStart}: UserAuthProps) {

    const [isSignIn, SetIsSignIn] = useState(false);

    const isMobile = useIsMobile();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 absolute z-2">
            <div className={`${isMobile? 'h-[520px] w-[90%]' : 'h-[520px] w-[480px]'}
                bg-white rounded-xl rounded-tr-none flex flex-col items-center justify-start`}>
                <i className={`
                    fa-solid fa-circle-xmark self-end text-[1.8rem] cursor-pointer mt-[-9px] mr-[-12px]`}
                    onClick={() => setIsStart(false)}></i>
                <div className="w-full flex-1 flex flex-col items-center justify-center">
                    {!isSignIn && <SignInForm setIsSignIn={SetIsSignIn}/>}
                    {isSignIn && <SignUpForm setIsSignIn={SetIsSignIn}/>}
                </div>
            </div>
        </div>
    )
}

export default UserAuth