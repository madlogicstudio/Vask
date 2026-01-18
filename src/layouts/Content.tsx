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
    <div className={`${isMobile? 'h-auto mt-[4rem] mb-[2rem] flex-col pt-[2rem]' : 'h-screen flex-row gap-[1rem] px-[2rem]'}
        w-[96%] flex items-center justify-center relative`}>
        <div className={`${isMobile? '' : 'flex-1'} flex flex-col items-start justify-center gap-[1rem]`}>
          <span className={`${isMobile? 'text-[2.2rem] text-center' : 'text-[3rem]'} font-bold cursor-pointer`}>Enhancing Vehicle Efficiency Through Digital Monitoring</span>
          {!isMobile && 
            <>
              <span className='font-semibold text-[1rem] cursor-pointer'>Lazada's smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.</span>
              <span className={`${isDark? 'bg-[var(--primary-color)]' : 'bg-[var(--dark-color)]'}
                font-semibold text-[1rem] text-[var(--light-color)] px-[1rem] py-[0.5rem] cursor-pointer rounded-full hovered-button`}>Get Started</span>
              <div className='h-auto w-full flex flex-row items-start justify-between flex-wrap gap-[1rem] px-[2rem] mb-[2rem] absolute bottom-0 left-0'>
                <i className='bx bx-quote-left text-[2rem] cursor-pointer'></i> 
                <span className='font-bold text-[2rem] cursor-pointer'>Stay</span>
                <span className='font-bold text-[2rem] cursor-pointer'>On</span>
                <span className='font-bold text-[2rem] cursor-pointer'>Track</span>
                <span className='font-bold text-[2rem] cursor-pointer'>With</span>
                <span className='font-bold text-[2rem] cursor-pointer'>Vask</span>
                <i className='bx bx-quote-right text-[2rem] cursor-pointer'></i> 
              </div>
            </>
          }
        </div>
        <div className={`${isMobile? '' : 'flex-1'} flex flex-row items-center justify-center`}>
          <img src={Bike} className={`${isMobile? 'h-[24rem] w-screen' : 'h-full w-full'}`} alt="" />
        </div>
        {isMobile && 
        <>
          <div className='flex flex-col items-center justify-center'>
            <span className='font-semibold text-[1.2rem] cursor-pointer text-center'>Lazada's smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.</span>  
          </div>
          <div className='h-auto w-full flex flex-row items-start justify-between flex-wrap gap-[1rem] p-[1rem] mt-[1rem]'>
            <i className='bx bx-quote-left text-[2rem] cursor-pointer'></i> 
            <span className='font-bold text-[2rem] cursor-pointer'>Stay</span>
            <span className='font-bold text-[2rem] cursor-pointer'>On</span>
            <span className='font-bold text-[2rem] cursor-pointer'>Track</span>
            <span className='font-bold text-[2rem] cursor-pointer'>With</span>
            <span className='font-bold text-[2rem] cursor-pointer'>Vask</span>
            <i className='bx bx-quote-right text-[2rem] cursor-pointer'></i> 
          </div>
        </>
        }
    </div>
  )
}

export default Content