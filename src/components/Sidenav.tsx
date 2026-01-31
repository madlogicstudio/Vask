import { useState } from "react";
import Googleplay from '../assets/imgs/logo.png'
import Appstore from '../assets/imgs/apple.png'
import Qr from '../assets/imgs/Qr.png'

type SidenavProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDark: boolean;
}

function Sidenav({setIsOpen, isDark} : SidenavProps) {

    const [closing, setClosing] = useState(false);

    const handleClose = () => {
      setClosing(true);
      setTimeout(() => setIsOpen(false), 300);
    };

    return (
        <div className={`${isDark? 'text-[var(--light-color)] bg-[var(--dark-color)] border-[var(--light-color)]' : 'bg-[var(--light-color)] text-[var(--dark-color)] border-[var(--light-color)]'}
            h-screen w-full flex flex-col items-start justify-start gap-[1rem] py-[1rem] px-[0.5rem] absolute top-0 left-0 z-3
            ${closing ? "slide-left" : "slide-right"}`}>
            <i className='bx bx-arrow-in-left-circle-half text-[2.2rem]'
                onClick={handleClose}>
            </i> 
            <div className="flex-1 w-full flex flex-col items-start justify-start gap-[0.5rem] p-[0.5rem] pb-[0rem]">
                <span className='w-full border-b-2 py-[0.5rem] font-semibold text-[1rem] cursor-pointer hovered-light'>Home</span>
                <span className='w-full border-b-2 py-[0.5rem] font-semibold text-[1rem] cursor-pointer hovered-light'>Docs</span>
                <span className='w-full border-b-2 py-[0.5rem] font-semibold text-[1rem] cursor-pointer hovered-light'>Contact</span>
                <span className='w-full border-b-2 py-[0.5rem] font-semibold text-[1rem] cursor-pointer hovered-light'>About Us</span>
            </div>  

            <div className="flex-1 w-full flex flex-col items-start justify-start gap-[0.5rem] pt-0 pb-[1rem] px-[0.5rem]">
                <div className="w-full flex flex-col items-start justify-start gap-[0.5rem]">
                    <img src={Qr} className={`${isDark? 'px-[1rem bg-[var(--light-color)]' : ''}
                        h-[14rem] w-[14rem] cursor-pointer`} alt="" />
                    <div className="h-full w-full flex flex-row items-center justify-start gap-[0.5rem] pt-[1rem]">
                        <div className={`${isDark? 'text-[var(--dark-color)] bg-[var(--light-color)]' : 'bg-[var(--dark-color)] text-[var(--light-color)]'}
                            w-full flex-1 flex flex-row items-center justify-center cursor-pointer p-[0.5rem] gap-[0.5rem] rounded-xl`}
                            onClick={() => location.replace("https://play.google.com/store/apps?hl=en")}>
                            <img src={Googleplay} className='h-[2rem] w-[2rem]' alt="" />
                            <div className='flex flex-col items-start justify-center'>
                                <span className='font-semibold text-[0.7rem] cursor-pointer'>Get it on</span>
                                <span className='font-semibold text-[1rem] cursor-pointer'>Google Play</span>
                            </div>
                        </div>
                        <div className={`${isDark? 'text-[var(--dark-color)] bg-[var(--light-color)]' : 'bg-[var(--dark-color)] text-[var(--light-color)]'}
                            w-full flex-1 flex flex-row items-center justify-center cursor-pointer p-[0.5rem] gap-[0.5rem] rounded-xl`}
                            onClick={() => location.replace("https://apps.apple.com/ph/app/apple-store/id375380948")}>
                            <img src={Appstore} className='h-[2rem] w-[2rem]' alt="" />
                            <div className='flex flex-col items-start justify-center'>
                                <span className='font-semibold text-[0.7rem] cursor-pointer'>Download on</span>
                                <span className='font-semibold text-[1rem] cursor-pointer'>App Store</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex-1 w-full flex flex-col items-start justify-start justify-between gap-[1rem] px-[0.5rem]`}>
                <div className={`
                    flex flex-row items-end justify-center gap-[0.5rem]`}>
                    <i title="Facebook" className='bxl bx-facebook-square bx-tada-hover cursor-pointer text-[2.5rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Instagram" className='bxl bx-instagram bx-tada-hover cursor-pointer text-[2.5rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Discord" className='bxl bx-discord-alt bx-tada-hover cursor-pointer text-[2.5rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Github" className='bxl bx-github bx-tada-hover cursor-pointer text-[2.5rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                </div>
                
                <span className="font-semibold text-[1rem] cursor-pointer">Copyright © 2026 MadLogicStudio. - Trademark Policy</span>
            </div>
        </div>
    )
}

export default Sidenav