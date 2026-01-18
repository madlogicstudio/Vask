import { useIsMobile } from "../hooks/useIsMobile"
import BannerLight from '../assets/imgs/Banner-light.png'
import BannerDark from '../assets/imgs/Banner-dark.png'

type ChangeTheme = {
    isDark: boolean;
}

function Footer({ isDark }: ChangeTheme) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isMobile? 'h-auto w-full flex-col p-[1rem]' : 'h-auto w-[96%] flex-col gap-[1rem] p-[2rem]'}
            ${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
            border-t-2 flex items-center justify-start gap-[1rem] overflow-hidden`}>

            <div className={`${isMobile? 'flex-col' : 'flex-row'}
                h-auto w-full flex items-center justify-between gap-[1rem]`}>
                <div className="h-auto w-[24rem] flex flex-col items-start justify-start">
                    {!isMobile && <span className='font-semibold text-[1.2rem] cursor-pointer pl-[3rem]'>Created By</span>}
                    {isDark?  <img src={BannerDark} className="h-[12rem] w-[32rem] cursor-pointer" alt="" /> : 
                        <img src={BannerLight} className="h-[12rem] w-[32rem] cursor-pointer" alt="" />}
                </div>
                <div className={`${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
                    ${isMobile? 'w-full flex-col border-t-2' : 'flex-row border-l-2'}
                    h-full flex-1 flex flex-col items-start justify-start`}>
                    <ul className="p-[2rem] flex flex-col items-start justify-start gap-[1rem]">
                        <li className="cursor-pointer text-[1.2rem] font-bold">Vask</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Documentation</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Showcase</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Sponsors</li>
                    </ul>
                </div>
                <div className={`${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
                    ${isMobile? 'w-full flex-col border-t-2' : 'flex-row border-l-2'}
                    h-full flex-1 flex flex-col items-start justify-start`}>
                    <ul className="p-[2rem] flex flex-col items-start justify-start gap-[1rem]">
                        <li className="cursor-pointer text-[1.2rem] font-bold">Resources</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Stories</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Press room</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Training</li>
                    </ul>
                </div>
                <div className={`${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
                    ${isMobile? 'w-full flex-col border-t-2' : 'flex-row border-l-2'}
                    h-full flex-1 flex flex-col items-start justify-start`}>
                    <ul className="p-[2rem] flex flex-col items-start justify-start gap-[1rem]">
                        <li className="cursor-pointer text-[1.2rem] font-bold">Our Team</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">About</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Security</li>
                        <li className="hovered-light cursor-pointer text-[1rem] font-semibold">Contact Us</li>
                    </ul>
                </div>
            </div>

            <div className={`${isMobile? 'w-full flex-col items-start gap-[2rem] py-[1rem]' : 'flex-row items-end'}
                h-auto w-full flex justify-between`}>
                <div className={`
                    flex flex-row items-end justify-center gap-[0.5rem]`}>
                    <i title="Facebook" className='bxl bx-facebook-square bx-tada-hover cursor-pointer text-[3rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Instagram" className='bxl bx-instagram bx-tada-hover cursor-pointer text-[3rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Discord" className='bxl bx-discord-alt bx-tada-hover cursor-pointer text-[3rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                    <i title="Github" className='bxl bx-github bx-tada-hover cursor-pointer text-[3rem]'
                        onClick={() => location.replace("https://www.starbucks.com/")}></i> 
                </div>
                
                <span className="font-semibold text-[1rem] cursor-pointer">Copyright © 2026 MadLogicStudio. - Trademark Policy</span>
            </div>
            
        </div>
    )
}

export default Footer