import { useState } from 'react';
import Icon from '../assets/imgs/Icon.png'
import WebIcon from '../assets/imgs/Web-icon.png'
import { useIsMobile } from '../hooks/useIsMobile'
import Sidenav from '../components/Sidenav';
import AppModal from '../components/AppModal';
import UserAuth from '../components/UserAuth';

type ChangeTheme = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isDark, setIsDark }: ChangeTheme) {

    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [isModal, setModal] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)] border-[var(--light-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)] border-[var(--dark-color)]"}
            ${isMobile? 'h-[4rem] px-[0.5rem]' : 'h-auto px-[1rem] py-[0.5rem]'}
            w-full flex flex-row items-center justify-between gap-[1rem] border-b-2 fixed z-2`}>
            <div className="flex flex-row items-center justify-center gap-[0.5rem]">
                {isMobile && <i title="Menu" className="fa-solid fa-bars cursor-pointer hovered-dark text-[1.5rem]"
                onClick={() => setIsOpen((prev) => !prev)}></i>}
                {isOpen && <Sidenav setIsOpen={setIsOpen} isDark={isDark} />}
                {isDark? <img src={WebIcon} alt="" className='h-[3rem] w-[3rem] cursor-pointer'/> : <img src={Icon} alt="" className='h-[3rem] w-[3rem] cursor-pointer'/>}
                <span className='font-bold text-[1.5rem] cursor-pointer'>Vask</span>
            </div>
            {!isMobile && <div className="flex flex-row items-center justify-center gap-[1rem]">
                <span className='font-semibold text-[1rem] cursor-pointer hovered-light'>Home</span>
                <span className='font-semibold text-[1rem] cursor-pointer hovered-light'>Docs</span>
                <span className='font-semibold text-[1rem] cursor-pointer hovered-light'>Contact</span>
                <span className='font-semibold text-[1rem] cursor-pointer hovered-light'>About Us</span>
            </div>}
            <div className="flex flex-row items-center justify-center gap-[0.5rem]">
                {isDark? <i title="Light mode" className="fa-solid fa-sun cursor-pointer hovered-dark text-[1.2rem]" onClick={() => setIsDark((prev) => !prev)}></i> :
                <i title="Dark mode" className="fa-solid fa-moon cursor-pointer hovered-light text-[1.2rem]" onClick={() => setIsDark((prev) => !prev)}></i> }
                {!isMobile && <span className={`${isDark? 'bg-[var(--primary-color)]' : 'bg-[var(--dark-color)]'}
                font-semibold text-[0.9rem] text-[var(--light-color)] px-[1rem] py-[0.5rem] cursor-pointer rounded-full hovered-button`}
                onClick={() => setModal((prev) => !prev)}>Try our App</span>}
                <span className={`${isDark? 'bg-[var(--highlight-color)]' : 'bg-[var(--highlight-color)]'}
                font-semibold text-[0.9rem] text-[var(--light-color)] px-[1rem] py-[0.5rem] cursor-pointer rounded-full hovered-button`}
                onClick={() => setIsAuth((prev) => !prev)}>Sign In</span>
            </div>

            {isModal && <AppModal setModal={setModal}/>}
            {isAuth && <UserAuth setIsAuth={setIsAuth} isDark={isDark} />}
        </div>
    )
}

export default Header