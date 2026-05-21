'use client'

type WhyCardProps = {
    isDark: boolean;
    icon: string;
    title: string;
    text: string;
}

const WhyCard = ({isDark, icon, title, text}: WhyCardProps) => {

    return (
        <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
            h-full flex flex-col items-start justify-start`}>

            <div className="h-full w-full flex flex-col items-start justify-start shadow-lg rounded-lg gap-[calc(0.6vw+0.4rem)] p-[calc(0.6vw+0.4rem)]">

                <i className={`bx ${icon} bx-tada-hover text-[length:var(--logo-size)] text-[color:var(--primary-color)] bg-gray-300 p-[0.3em] 
                    rounded-full hovered cursor-pointer`} />

                <span className='anek text-[length:var(--large-font)] font-semibold cursor-pointer transition duration-300 ease-in-out hovered'>
                    {title}
                </span>
                <span className='anek h-full text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out hovered'>
                    {text}
                </span>

            </div>

        </div>
    )
}

export default WhyCard 