"use client"

import { useEffect, useState } from "react";
import Image from "next/image"
export default function Hero() {
    return(
        <div>
            <section className="flex flex-col items-center space-y-4">
                <Image className="invert dark:invert-0" src="/berta.ico" height={200} width={100} alt="berta"/>

                <h1 className="text-5xl text-shadow-[0_0_12px_rgba(255,255,255,0.3)] font-semibold">
                    B E R T A
                </h1>
                <h2 className="text-shadow-[0_0_12px_rgba(255,255,255,0.3)] font-semibold">
                    Turning Dreams to Reality
                </h2>
            </section>
        </div>
    );
}