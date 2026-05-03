"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Projects", id: "toc-projects", priority: true  },
  { label: "About",    id: "toc-about",    priority: false },
  { label: "Contact",  id: "toc-contact",  priority: false },
];

function navTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#080808]/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo — scrolls back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm cursor-pointer font-semibold tracking-wide text-white/55 transition-colors duration-200 hover:text-white/90"
        >
          Billy Zhang
        </button>

        {/* Section links */}
        <div className="flex items-center gap-7">
          {NAV_LINKS.map(({ label, id, priority }) => (
            <button
              key={id}
              onClick={() => navTo(id)}
              className={`text-sm cursor-pointer font-medium transition-colors duration-200 ${
                priority
                  ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "text-white/40 hover:text-white/75"
              }`}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => navTo("toc-contact")}
            className="rounded-lg cursor-pointer border border-white/10 bg-white/4 px-4 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/20 hover:bg-white/7 hover:text-white/90"
          >
            Let&apos;s Chat
          </button>
        </div>
      </nav>
    </header>
  );
}
