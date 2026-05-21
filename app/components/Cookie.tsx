

type CookieProps = {
    isDark: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cookie = ({isDark, setIsVisible}: CookieProps) => {
    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-auto w-full flex flex-col items-start justify-start p-[calc(0.6vw+0.4rem)] fadeIn`}>
            
            <div className="w-full flex flex-row items-center justify-between gap-[calc(0.6vw+0.4rem)]">
                <span className='text-[length:var(--medium-font)] font-semibold cursor-pointer transition duration-300 ease-in-out'>
                    We value your privacy
                </span>
                <div className="flex flex-row items-center justify-center gap-[0.5em]">
                    <span className="px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)] text-[length:var(--small-font)] rounded-full text-white bg-black cursor-pointer
                        hover:text-[color:var(--purple-color)] hover:bg-gray-300 transition duration-300 ease-in-out"
                        onClick={() => setIsVisible(false)}>
                        Accept all
                    </span>
                    <span className="px-[calc(0.6vw+0.4rem)] py-[calc(0.4vw+0.3rem)] text-[length:var(--small-font)] rounded-full text-white bg-black cursor-pointer
                        hover:text-[color:var(--purple-color)] hover:bg-gray-300 transition duration-300 ease-in-out"
                        onClick={() => setIsVisible(false)}>
                        Reject all
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start gap-[calc(0.4vw+0.3rem)]">
                <span className='text-[length:var(--small-font)] cursor-pointer transition duration-300 ease-in-out'>
                    This website uses cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                    By clicking "Accept all" you consent to our use of cookies.
                </span>
                <span className='text-[length:var(--small-font)] text-blue-500 underline cursor-pointer transition duration-300 ease-in-out'>
                    Cookie Policy
                </span>
            </div>
        </div>
    )
}

export default Cookie