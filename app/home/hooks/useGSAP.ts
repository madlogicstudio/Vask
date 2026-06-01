'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export function useGSAP(callback: () => void, deps: React.DependencyList = []) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(SplitText)

    const ctx = gsap.context(() => {
      callback()
    })

    return () => ctx.revert()
  }, deps)
}