import { useIsMobile } from '../hooks/useIsMobile'
import Users from '../assets/imgs/Users.png'
import Loved from '../assets/imgs/Loved.png'
import Downloads from '../assets/imgs/Downloads.png'

type ChangeTheme = {
  isDark: boolean;
}

function Introduction({ isDark }: ChangeTheme) {

  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile? 'h-auto w-full flex-col px-[1rem] py-[2rem]' : 'h-auto w-[96%] flex-col gap-[1rem] p-[2rem]'}
        ${isDark? 'border-[var(--light-color)]' : 'border-[var(--dark-color)]'}
        border-t-2 flex items-center justify-start gap-[1rem]`}>
        <div className='h-auto w-full'>
            <span className={`${isMobile?  'text-[1.2rem]' : 'text-[1rem]'}
                font-semibold cursor-pointer`}>About Us</span>
        </div>
        <div className={`${isMobile?  'flex-col gap-[1rem]' : 'flex-row'}
            h-auto w-full flex items-center justify-between`}>
            <span className={`${isMobile?  'text-[2.2rem]' : 'text-[3rem]'}
                flex-1 font-bold cursor-pointer`}>Getting to know Vask</span>
            <span className='flex-1 font-semibold text-[1rem] cursor-pointer'>Vask helps you track, organize, and optimize every aspect of vehicle management — all in one intuitive platform.</span>
        </div>
        <div className={`${isMobile?  'flex-col' : 'flex-row'}
            h-auto w-full flex items-center justify-between gap-[1rem]`}>
            {isMobile && <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Users} className='h-[19rem] w-[19rem]' alt="" />
            </div>}
            <div className='h-full flex-1 flex flex-col items-start justify-start rounded-xl bg-[var(--highlight-color)] text-[var(--light-color)] gap-[1rem] p-[1rem]'>
                <div className='h-auto flex-2 flex flex-row items-start justify-start gap-[1rem]'>
                    <span className={`${isMobile? 'text-[2rem] text-center' : 'text-[3rem]'} font-bold cursor-pointer`}>10k+</span>
                    <span className={`${isMobile? 'text-[1rem] text-center' : 'text-[2rem]'} font-semibold cursor-pointer`}>users</span>
                </div>
                <div className='h-auto flex-2 flex flex-row items-start justify-start'>
                    <span className='font-semibold text-[1rem] cursor-pointer'>Lazada user based customers within its first year of operation.</span>
                </div>        
            </div>
            {isMobile && <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Loved} className='h-[18rem] w-[18rem]' alt="" />
            </div>}
            <div className='h-full flex-1 flex flex-col items-start justify-start rounded-xl bg-[var(--primary-color)] text-[var(--light-color)] gap-[1rem] p-[1rem]'>
                <div className='h-auto flex-2 flex flex-row items-start justify-start'>
                    <span className={`${isMobile? 'text-[2rem] text-center' : 'text-[3rem]'} font-bold cursor-pointer`}>98%</span>
                </div>
                <div className='h-auto flex-2 flex flex-row items-start justify-start'>
                    <span className='font-semibold text-[1rem] cursor-pointer'>Users loved how it makes their life easier in terms of vehicle monitoring.<br /></span>
                </div> 
            </div>
            {isMobile && <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Downloads} className='h-[18rem] w-[18rem]' alt="" />
            </div>}
            <div className='h-full flex-1 flex flex-col items-start justify-start rounded-xl bg-[var(--secondary-color)] text-[var(--light-color)] gap-[1rem] p-[1rem]'>
                <div className='flex-2 flex flex-row items-start justify-start'>
                    <span className={`${isMobile? 'text-[2rem] text-center' : 'text-[3rem]'} font-bold cursor-pointer`}>15k+</span>
                </div>
                <div className='flex-2 flex flex-row items-start justify-start'>
                    <span className='font-semibold text-[1rem] cursor-pointer'>Downloads on playstore and appstore worldwide.</span>
                </div> 
            </div>
        </div>
        {!isMobile && <div className='h-auto w-full flex flex-row items-center justify-between mt-[-1rem]'>
            <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Users} className='h-[19rem] w-[19rem]' alt="" />
            </div>
            <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Loved} className='h-[18rem] w-[18rem]' alt="" />
            </div>
            <div className='flex flex-row items-center justify-center flex-1'>
                <img src={Downloads} className='h-[18rem] w-[18rem]' alt="" />
            </div>
        </div>}
    </div>
  )
}

export default Introduction