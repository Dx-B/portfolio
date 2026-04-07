"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const WIPContent = () => {
    const [quackCountState, setQuackCountState] = useState(0)
  const [showQuacker, setShowQuacker] = useState(false)
  const [quackPosition, setQuackPosition] = useState({ x: 0, y: 0 });
  const [quackVisible, setQuackVisible] = useState(false);
  const [funnyVisible, setFunnyVisible] = useState(false);

  const playQuack = () => {
    const audio = new Audio('/quack.mp3');
    audio.play();

    setQuackCountState(quackCountState + 1);
    setShowQuacker(true);

    const randomX = Math.floor(Math.random() * 200);
    const randomY = Math.floor(Math.random() * 200);
    setQuackPosition({ x: randomX, y: randomY });

    setQuackVisible(true);
    setTimeout(() => {
      setQuackVisible(false);
    }, 1000);

    if (quackCountState > 300) {
      setFunnyVisible(true);
    }
  }

  useEffect(() => {
    // Reset the counter and hide the "quack" text when the component unmounts
    return () => {
      setQuackCountState(0);
      setShowQuacker(false);
      setQuackVisible(false);
    };
  }, []);
  return (
    <div className="absolute inset-x-0 z-10 h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mb-12">
                <div className="text-white text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">What happened?</div>
                <p className='w-max text-center text-white text-[1rem] sm:text-[1.5rem]'>
                  Hello! We&apos;re still working on this page.
                </p>
                <p className='sm:w-max w-3/4 text-center text-white text-[0.8rem] lg:text-[1rem] mt-2 sm:mt-0'>
                  It looks like you have a friend to keep you company until we&apos;re done.                
                </p>
                <button onClick={playQuack} className='relative flex justify-center items-center'>
                  <Image src="/quack.gif" alt="logo" width={200} height={200} unoptimized/>
                  {showQuacker && (
                  <p style={{ position: 'absolute', top: quackPosition.y, left: quackPosition.x }} className='text-yellow-400 text-[30px]'>
                    Quack!
                  </p>
                  )}
                  {showQuacker && <p className='absolute bottom-0'>Quacks: {quackCountState}</p>}
                </button>
                {funnyVisible && <p className='text-red-400'>Did you actually sit here clicking for over 300 quacks?</p>}
            </div>
        </div>
  )
}

export default WIPContent