'use client'

import { useIsMobile } from "../hooks/useIsMobile"

type CookieProps = {
    isDark: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cookie = ({isDark, setIsVisible}: CookieProps) => {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            ${isMobile? "p-[calc(0.6vw+0.4rem)]" : "p-[calc(0.6vw+0.4rem)]"}
            h-auto w-full flex flex-col items-start justify-start fadeIn`}>
            
            <div className={`${isMobile? "flex-col" : "flex-row items-center justify-between"}
                w-full flex gap-[calc(0.6vw+0.4rem)]`}>
                <span className='text-[length:var(--medium-font)] font-semibold cursor-pointer transition duration-300 ease-in-out'>
                    We value your privacy
                </span>
                <div className={`${isMobile? "justify-start py-[calc(0.6vw+0.4rem)]" : "justify-center"}
                    flex items-center gap-[0.5em]`}>
                    <span className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--extrasmall-font)]"}
                        px-[calc(1.2vw+0.8rem)] py-[calc(0.4vw+0.3rem)] rounded-full text-white bg-black cursor-pointer
                        hover:text-[color:var(--purple-color)] hover:bg-gray-300 transition duration-300 ease-in-out`}
                        onClick={() => setIsVisible(false)}>
                        Accept all
                    </span>
                    <span className={`${isMobile? "text-[length:var(--small-font)]" : "text-[length:var(--extrasmall-font)]"}
                        px-[calc(1.2vw+0.8rem)] py-[calc(0.4vw+0.3rem)] rounded-full text-white bg-black cursor-pointer
                        hover:text-[color:var(--purple-color)] hover:bg-gray-300 transition duration-300 ease-in-out`}
                        onClick={() => setIsVisible(false)}>
                        Reject all
                    </span>
                </div>
            </div>
            <div className={`${isMobile? "flex-col items-start" : "flex-row items-center"}
                w-full flex justify-start gap-[calc(0.4vw+0.3rem)] mt-[calc(0.6vw+0.4rem)]`}>
                <span className='anek text-[length:var(--small-font)] cursor-pointer transition duration-300 ease-in-out'>
                    This website uses cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                    By clicking "Accept all" you consent to our use of cookies.
                </span>
                <span className='anek text-[length:var(--small-font)] text-blue-500 underline cursor-pointer transition duration-300 ease-in-out'>
                    Cookie Policy
                </span>
            </div>
        </div>
    )
}

export default Cookie