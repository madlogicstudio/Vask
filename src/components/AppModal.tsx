import Googleplay from '../assets/imgs/logo.png'
import Appstore from '../assets/imgs/apple.png'
import Qr from '../assets/imgs/Qr.png'
import Download from '../assets/imgs/Review.png'

type ModalProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AppModal = ({setModal} : ModalProps) => {

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] absolute top-0 left-0">
            <div className={`
                relative h-[80%] w-[60%] flex flex-row items-center justify-center p-[2rem] bg-[var(--light-color)] rounded-xl rounded-tr-none`}>
                <i onClick={() => setModal((prev) => !prev)} className="fa-solid fa-circle-xmark text-[2rem] text-[var(--dark-color)] 
                    cursor-pointer absolute top-0 right-0 mt-[-10px] mr-[-13px]"></i>
                <div className='h-full flex-1 flex flex-col items-start justify-center'>
                    <span className='font-semibold text-[1.5rem] ml-[1rem] mt-[1rem] text-[var(--dark-color)] cursor-pointer hovered-light'>Download our App</span>
                    <img src={Download} className='h-[26rem] w-[26rem] cursor-pointer' alt="" />
                </div>
                <div className='h-auto w-auto flex flex-col items-start justify-center gap-[1rem] pl-[1rem]'>
                    <img src={Qr} className='h-[18rem] w-[18rem] cursor-pointer' alt="" />
                    <div className='flex flex-row items-center justify-center cursor-pointer p-[0.5rem] w-full gap-[0.5rem] bg-[var(--dark-color)] rounded-xl'
                        onClick={() => location.replace("https://play.google.com/store/apps?hl=en")}>
                        <img src={Googleplay} className='h-[2.5rem] w-[2.5rem]' alt="" />
                        <div className='flex flex-col items-start justify-center'>
                            <span className='font-semibold text-[0.7rem] text-[var(--light-color)] cursor-pointer'>Get it on</span>
                            <span className='font-semibold text-[1rem] text-[var(--light-color)] cursor-pointer'>Google Play</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center cursor-pointer p-[0.5rem] w-full gap-[0.5rem] bg-[var(--dark-color)] rounded-xl'
                        onClick={() => location.replace("https://apps.apple.com/ph/app/apple-store/id375380948")}>
                        <img src={Appstore} className='h-[2.5rem] w-[2.5rem]' alt="" />
                        <div className='flex flex-col items-start justify-center'>
                            <span className='font-semibold text-[0.7rem] text-[var(--light-color)] cursor-pointer'>Download on</span>
                            <span className='font-semibold text-[1rem] text-[var(--light-color)] cursor-pointer'>App Store</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppModal