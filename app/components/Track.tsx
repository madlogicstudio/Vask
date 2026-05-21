
type TrackProps = {
    isDark: boolean;
}

export const Track = ({isDark}: TrackProps) => {
    return (
        <div className="flex flex-col items-start justify-start">
            <div className='w-full flex flex-row items-center justify-between'>
                <span className="anek text-[length:var(--hero-font)] font-bold cursor-pointer hovered"> 
                    stay on 
                </span>
                <i className="bx bx-cursor-crosshair bx-spin-hover text-[length:var(--hero-font)] hovered cursor-pointer" />
            </div>
            <div className='flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)] mt-[-1rem]'>
                <span className={`${isDark? "text-[color:var(--blue-color)]" : "text-[color:var(--primary-color)]"}
                    momo text-[length:var(--hero-font)] font-bold cursor-pointer hovered`}> 
                    track
                </span>
                <span className="anek text-[length:var(--hero-font)] font-bold cursor-pointer hovered"> 
                    with Vask
                </span>
            </div>
        </div>
    )
}
