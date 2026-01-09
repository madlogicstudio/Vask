import Logo from "../assets/imgs/Logo.png"
import Laz from "../assets/imgs/Laz-icon.png"
import { useIsMobile } from "../hooks/useIsMobile"

function Header() {
    
    const isMobile = useIsMobile();

    return (
        <div className="h-auto w-full flex flex-row items-center justify-between px-[calc(0.4vw+0.6rem)] absolute z-1">
            <div className="flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)]">
                <img src={Logo} alt="" className={`${isMobile? 'h-11 w-11' : 'h-12 w-12'}
                    cursor-pointer`} />
                <span className="text-[1.6rem] font-bold cursor-pointer">Vask</span>
                <span className="text-[1rem] font-bold cursor-pointer">for</span>
                <img src={Laz} alt="" className={`${isMobile? 'h-16 w-16' : 'h-18 w-18 '}
                    cursor-pointer`} />
            </div>
            <div className="flex flex-row items-center justify-center">
                <span className="text-[1rem] font-bold cursor-pointer">Go to Docs</span>
            </div>
        </div>
    )
}

export default Header