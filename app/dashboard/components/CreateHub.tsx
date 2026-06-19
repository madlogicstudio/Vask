'use client'

import Parcel from '../../home/assets/Parcel.png'

export const CreateHub = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <img src={Parcel.src} className='h-[620px] w-[620px]' alt="" />
            <span className={`poppins cursor-pointer text-sm transition duration-300 ease-in-out`}>
                [ Create a Hub ]
            </span>
        </div>
    )
}
