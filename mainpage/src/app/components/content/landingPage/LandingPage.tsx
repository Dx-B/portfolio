"use client"
import React, { useEffect, useState } from 'react'
import FadeIn from '@/app/components/animations/FadeIn';


const LandingPage = () => {
  const [active, setActive] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);

  const scrollScreen = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="flex inset-0 h-screen w-full relative z-0 bg-opacity-80 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]">
      {/* <div className="bg-black bg-opacity-40 w-full h-screen flex items-center text-white text-shadow-lg font-sans relative z-1"> */}
        {/* Fade in */}
        <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm opacity-90"></div>
        <div className="absolute inset-x-0 m-80 h-96 max-w-xl bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[110px]"></div>
        <div className="absolute top-0 left-0 z-10 bg-gradient-to-b from-black mix-blend-multiply opacity-100 w-full h-80"></div>
        
        {/* Left and Right separate gradient */}
        <div className="absolute top-0 z-0 bg-gradient-to-r from-black from-15% opacity-100 w-32 h-full"></div>
        <div className="absolute top-0 right-0 z-0 bg-gradient-to-l from-black from-15% opacity-100 w-full h-full"></div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 z-0 bg-gradient-to-t from-black from-15% opacity-100 w-full h-96"></div>

        {/* Both left and right gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black h-screen w-full"></div> */}

        {/* Fun */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 h-screen w-screen"></div> */}
        
        <div className={`opacity-0 transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        {/* <div className={`transform ${active ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500 ease-in-out`}> */}
        <div className="ml-32 drop-shadow-[0_5px_5px_rgba(255,255,255,0.18)]">
          <section id="header-name" className={`transform ${active ? 'translate-y-0' : 'translate-y-full'} text-6xl transition-transform duration-1000 ease-in-out`}>
            <h1 className="text-10xl font-bold h-full">Berta Medical</h1>
          </section>
          <section id="header-description" className={`transform ${active ? 'translate-y-0 delay-300' : 'translate-y-full'} p-3 transition-transform duration-1000 ease-in-out`}>
            <div className={`opacity-0 transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100 delay-500' : 'opacity-0'}`}>
              <div className="text-6xl flex flex-row">
                <p>
                  Welcome to 
                </p>
                <div className={`transition-colors ${active ? 'text-indigo-400' : 'text-white'} duration-1000 delay-1000 ease-in-out`}>
                  <b>&nbsp;your&nbsp;</b>
                </div> 
                 <p>
                   future.
                 </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Down Button */}
        <FadeIn>
          <button onClick={scrollScreen} className={`absolute left-[49%] bottom-24 transform ${active ? 'translate-y-0 delay-300' : 'translate-y-full'} transition-transform duration-1000 ease-in-out motion-safe:animate-bounce`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </FadeIn>
      </div>
  )
}

export default LandingPage