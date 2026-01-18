import { useIsMobile } from "../hooks/useIsMobile"
import Work from '../assets/imgs/Work.png'

type ChangeTheme = {
    isDark: boolean;
}

function Features({ isDark } : ChangeTheme) {

    const isMobile = useIsMobile();

    return (
        <div className={`${isMobile? 'h-auto w-full flex-col px-[1rem] py-[2rem]' : 'h-screen w-[96%] flex-col gap-[1rem] p-[2rem]'}
            ${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
            border-t-2 flex items-center justify-start gap-[1rem] overflow-hidden`}>
            <div className='h-auto w-full'>
                <span className='font-semibold text-[1rem] cursor-pointer'>Features</span>
            </div>
            <div className={`${isMobile? 'flex-col' : 'flex-row'}
                h-auto w-full flex items-center justify-between`}>
                <span className={`${isDark? 'bg-[var(--dark-color)]' : 'bg-[var(--light-color)]'}
                    ${isMobile? 'text-[2.2rem]' : 'text-[3rem]'}
                    flex-1 font-bold cursor-pointer z-1 p-[1rem]`}>All in one platform for vehicle monitoring</span>
                {isMobile && <div className='flex flex-row items-center justify-center'>
                    <img src={Work} className='h-full w-w-full' alt="" />
                </div>}
                <span className={`${isDark? 'bg-[var(--dark-color)]' : 'bg-[var(--light-color)]'}
                    flex-1 font-semibold text-[1rem] z-1 cursor-pointer`}>Vask combines real-time tracking, intelligent analytics, and automated reporting into a single, easy-to-use system, Vask simplifies fleet management while improving safety, efficiency, and cost control.</span>
            </div>
            {!isMobile && <div className='h-full w-full flex flex-row items-center justify-center'>
                <div className='flex flex-row items-center justify-center'>
                    <img src={Work} className='h-full w-w-full' alt="" />
                </div>
            </div>}
        </div>
    )
}

export default Features