'use client'

import { useEffect, useRef } from 'react'

const items = [
  'Stay on track',
  ,
  'with vask',
]

type CtaMarquee = {
    isDark: boolean;
}

function CtaMarquee({isDark}: CtaMarquee) {

  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current

    if (!marquee) return

    let animationFrame: number
    let position = 0

    const animate = () => {
      position -= 1

      if (Math.abs(position) >= marquee.scrollWidth / 2) {
        position = 0
      }

      marquee.style.transform = `translateX(${position}px)`

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        h-full w-full overflow-hidden`}>

      <div ref={marqueeRef}
        className="flex flex-row items-center justify-center w-max gap-12 whitespace-nowrap">

        {[...items, ...items].map((item, index) => (
            <span key={index}
                className="anek text-[length:var(--hero-font)] font-semibold tracking-wide">
                {item}
            </span>
        ))}

      </div>

    </div>
  )
}

export default CtaMarquee