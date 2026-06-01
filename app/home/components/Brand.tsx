import lightIcon from '../assets/Icon.png'
import darkIcon from '../assets/Dark-icon.png'
import { TextMask } from './TextMask';

type BrandProps = {
    isDark: boolean;
}

export const Brand = ({isDark}: BrandProps) => {
    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            flex flex-row items-center justify-center gap-[calc(0.4vw+0.3rem)]`}>
            
            <img src={isDark? lightIcon.src : darkIcon.src} alt="" className='h-[var(--logo-size)] w-[var(--logo-size)] cursor-pointer'/>

            <TextMask title={'Vask'} video={'./Hana.mp4'} />

        </div>
    )
}
