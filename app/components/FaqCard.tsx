import React from 'react'

type FaqCardProps = {
    isDark: boolean;
    dropDown: boolean;
    setDropDown: () => void;
    title: string;
    text: string;
}

export const FaqCard = ({isDark, dropDown, setDropDown, title, text}: FaqCardProps) => {
  return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        w-full flex flex-col items-start justify-start p-[calc(0.6vw+0.4rem)] gap-[calc(0.6vw+0.4rem)]`}>

        <div className='h-auto w-full flex flex-row items-center justify-between'>
            <span className='anek text-[length:var(--medium-font)] hovered cursor-pointer'>
                {title}
            </span>
            <i className={`bx ${dropDown ? "bx-chevron-up" : "bx-chevron-down"}
                text-[length:var(--logo-size)] hovered cursor-pointer`}
                onClick={setDropDown}/>
        </div>
        {dropDown && <div className='flex flex-row items-center justify-start'>
            <span className='anek text-[length:var(--medium-font)] fadeIn cursor-pointer'>
                {text}
            </span>
        </div>}

    </div>
  )
}
