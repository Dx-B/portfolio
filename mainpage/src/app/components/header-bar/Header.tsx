"use client"
import MoveUp from '@/app/components/animations/MoveUp';
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const Header = () => {

    const [active, setActive] = useState(false);

    useEffect(() => {
      setActive(true);
    }, []);

    return (
      <div id="header" className={`bg-black bg-opacity-20 h-18 w-full text-white text-shadow-lg font-sans z-50 fixed opacity-0 transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100 delay-100' : 'opacity-0'}`}>
        <div className="w-full p-2 flex flex-row justify-between text-white text-shadow-lg font-sans z-50 fixed">
          <div className={`transform ${active ? 'translate-y-0 delay=100' : '-translate-y-full'} transition-transform duration-1000 ease-in-out flex-row flex pl-2 max-h-12 text-5xl font-bold tracking-wider`}>
            <Link href="/" className="flex flex-row w-max mr-12">
              <Image
              src="/neologo.png"
              width={40}
              height={1}
              alt="Berta logo :D"
              />
              <section id="top-logo" className="w-max ml-5 mb-1 font-bold tracking-wider hidden sm:block">
                <h1 className='text-5xl w-max'>B E R T A</h1>
              </section>
            </Link>
          </div>
          <div id="account-buttons" className="my-auto w-max space-x-12 pr-6 flex flex-row text-lg items-center overflow-x-scroll sm:overflow-hidden">
            <section id="patient-button" className={`transform ${active ? 'translate-y-0 delay-[275ms]' : '-translate-y-full'} transition-transform duration-1000 ease-in-out text-5xl ml-6 font-bold tracking-wider`}>
              <Link href="/patient" className="items-center flex flex-col">
                <MdOutlineSick size={35}/>
              </Link>
            </section>
            <section id="doctor-button" className={`transform ${active ? 'translate-y-0 delay-[250ms]' : '-translate-y-full'} transition-transform duration-1000 ease-in-out text-5xl ml-6 font-bold tracking-wider`}>
              <Link href="/doctor" className="items-center flex flex-col">
                <FaUserDoctor size={30}/>
              </Link>
            </section>
            <section id="latest-button" className={`transform ${active ? 'translate-y-0 delay-200' : '-translate-y-full'} transition-transform duration-1000 ease-in-out text-5xl ml-6 font-bold tracking-wider`}>
              <Link href="/latest" className="items-center flex flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 justify-center">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
                {/* <p>What's New</p> */}
              </Link>
            </section>
            <section id="store-button" className={`transform ${active ? 'translate-y-0 delay-100' : '-translate-y-full'} transition-transform duration-1000 ease-in-out justify-center items-center`}>
              
              <Link href="/products">
                {/* Place cart here ^^ */}

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {/* <p>Store</p> */}
              </Link>
            </section>
            <section id="account-button" className={`transform ${active ? 'translate-y-0 delay-0' : '-translate-y-full'} transition-transform duration-1000 ease-in-out justify-center items-center`}>
              <Link href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Link>
            </section>
          </div>
        </div>
      </div>
    );
};

export default Header;