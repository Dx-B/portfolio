"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ScrollHeader() {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const passedFirstScreen = window.scrollY > window.innerHeight;
      setShowHeader(passedFirstScreen);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 z-50 w-full",
        "border-b border-white/10 bg-black/70 backdrop-blur-md",
        "transition-all duration-300 ease-in-out",
        showHeader
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <div className="text-lg font-semibold">My Portfolio</div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="#about" className="hover:text-blue-300 transition">
            About
          </Link>
          <Link href="#projects" className="hover:text-blue-300 transition">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-blue-300 transition">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}