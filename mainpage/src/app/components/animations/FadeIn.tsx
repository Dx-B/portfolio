"use client"
import React, { useEffect, useState } from 'react'

type input = {
    children: React.ReactNode
    className?: string
}

const FadeIn = ({children, className}: input) => {
  const [active, setActive] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);
  return (
    <div className={`transition-opacity duration-[1500ms] delay-1000 ease-in ${active ? 'opacity-100 delay-[1300ms]' : 'opacity-0'} + ${className}`}>
        {children}
    </div>
  )
}

export default FadeIn;