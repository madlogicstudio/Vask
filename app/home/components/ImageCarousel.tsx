'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

import Hub from '../assets/Hub.png'
import Bike from '../assets/Bike.png'
import Parcel from '../assets/Parcel.png'

export default function ImageCarousel() {

    const isMobile = useIsMobile();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 3000)

        return () => clearInterval(interval)
    }, [emblaApi])

    return (
        <div className="w-auto">
            
            <div className={`${isMobile? "h-auto" : "h-[720px]"}
                w-auto overflow-hidden object-contain`} ref={emblaRef}>
                
                <div className="flex">

                    <div className="min-w-full flex items-center justify-center">
                        <img src={Hub.src} className={`${isMobile? "" : ""}
                            brightness cursor-pointer object-contain fadeIn`} alt="" />

                    </div>
                    <div className="min-w-full flex items-center justify-center">
                        <img src={Bike.src} className={`${isMobile? "" : ""}
                            brightness cursor-pointer h-full w-full fadeIn`} alt="" />
                    </div>
                    <div className="min-w-full flex items-center justify-center">
                        <img src={Parcel.src} className={`${isMobile? "" : ""}
                            brightness cursor-pointer h-full w-full fadeIn`} alt="" />
                    </div>

                </div>
            </div>

            {/* <div className="flex flex-row items-cente justify-center gap-[calc(0.4vw+0.6rem)] p-[calc(0.4vw+0.6rem)]">
                <button onClick={scrollPrev}>
                    <i className="bx bx-chevron-left text-[length:var(--icon-size)] hovered cursor-pointer fadeIn" />
                </button>
                <button onClick={scrollNext}>
                    <i className="bx bx-chevron-right text-[length:var(--icon-size)] hovered cursor-pointer fadeIn" />
                </button>
            </div> */}

        </div>
    )
}