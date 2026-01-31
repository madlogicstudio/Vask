import { useEffect, useRef } from "react";
// import Bike from '../assets/imgs/Bike.mp4'
import Bike from '../assets/imgs/Bike.png'
import { useIsMobile } from '../hooks/useIsMobile'

type ChangeTheme = {
  isDark: boolean;
}

function Content({ isDark }: ChangeTheme) {

  const isMobile = useIsMobile();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <div className={`${isMobile? 'h-auto mt-[4rem] mb-[2rem] flex-col pt-[1rem]' : 'h-auto flex-col px-[4rem]'}
        w-[96%] flex items-center justify-center relative`}>

        <div className={`${isMobile? 'flex-col px-[1rem]' : 'flex-row'}
          w-full flex items-center justify-center`}>
          <div className={`${isMobile? 'gap-[1rem]' : 'flex-1 gap-[1rem]'} w-full flex flex-col items-start justify-center`}>
            <span className={`${isMobile? 'text-[2.2rem]' : 'text-[3rem]'} font-bold cursor-pointer`}>Enhancing Vehicle Efficiency Through Digital Monitoring</span>
            {isMobile && <img src={Bike} className={`${isMobile? 'h-auto w-full' : 'h-full w-full'}`} alt="" />}
            <span className={`${isMobile? '' : ''} font-semibold text-[1rem] cursor-pointer`}>Lazada's smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.</span>
            <span className={`${isDark? 'bg-[var(--primary-color)]' : 'bg-[var(--dark-color)]'}
              ${isMobile? 'mt-[1rem]' : 'mb-[2rem] mt-[1rem]'}
              font-semibold text-[1rem] text-[var(--light-color)] px-[1rem] py-[0.5rem] cursor-pointer rounded-full hovered-button`}>Get Started</span>
          </div>
          {!isMobile && <div className={`${isMobile? '' : 'flex-1'} flex flex-row items-start justify-start`}>
            <img src={Bike} className={`${isMobile? 'h-full w-full' : 'h-full w-full'}`} alt="" />
          </div>}
        </div>

        <div className={`${isMobile? '' : 'flex-1 gap-[1rem]'} w-full flex flex-col items-start justify-center`}>
          
          <div className={`${isMobile? 'mt-[2rem]' : 'mb-[2rem]'} h-auto w-full flex flex-row items-start justify-between flex-wrap gap-[1rem] px-[1rem]`}>
            <i className='bx bx-quote-left text-[2rem] cursor-pointer'></i> 
            <span className='font-bold text-[2rem] cursor-pointer'>Stay</span>
            <span className='font-bold text-[2rem] cursor-pointer'>On</span>
            <span className='font-bold text-[2rem] cursor-pointer'>Track</span>
            <span className='font-bold text-[2rem] cursor-pointer'>With</span>
            <span className='font-bold text-[2rem] cursor-pointer'>Vask</span>
            <i className='bx bx-quote-right text-[2rem] cursor-pointer'></i> 
          </div>
        </div>
        
    </div>
  )
}

export default Content