import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import WIPContent from './WIPContent'

const WIPage = () => {

  return (
    <div className="flex inset-0 h-screen w-full relative z-0 bg-opacity-80 items-center bg-black bg-[linear-gradient(to_right,#88888836_1px,transparent_1px),linear-gradient(to_bottom,#80808836_1px,transparent_1px)] bg-[size:48px_48px]">
        {/* Fade in */}
        <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm opacity-90"></div>
        <div className="absolute inset-x-0 ml-[35%] h-96 max-w-xl bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[110px]"></div>
        <div className="absolute top-0 left-0 z-10 bg-gradient-to-b from-black mix-blend-multiply opacity-100 w-full h-80"></div>
        
        {/* Left and Right separate gradient */}
        <div className="absolute top-0 right-0 z-0 bg-gradient-to-l from-black from-15% opacity-20 w-full h-full"></div>
        <div className="absolute top-0 right-0 z-0 bg-gradient-to-r from-black from-15% opacity-20 w-full h-full"></div>


        {/* Bottom gradient */}
        <div className="absolute bottom-0 z-0 bg-gradient-to-t from-black from-15% opacity-60 w-full h-96"></div>

        {/* Content */}
        <WIPContent/>
    </div>
  )
}

export default WIPage