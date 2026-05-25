"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SignInModal } from "./SignInModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

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

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm cursor-pointer font-semibold tracking-wide text-white/55 transition-colors duration-200 hover:text-white/90"
        >
          Billy Zhang
        </button>

        {/* Center links */}
        <div className="flex items-center gap-7">
          {NAV_LINKS.map(({ label, id, priority }) => (
            <button
              key={id}
              onClick={() => navTo(id)}
              className={`text-sm cursor-pointer font-medium transition-colors duration-200 ${
                priority
                  ? "bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  : "text-white/40 hover:text-white/75"
              }`}
            >
              {label}
            </button>
          ))}

          <Link
            href="/blogs"
            className="text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white/75"
          >
            Blogs
          </Link>

          <button
            onClick={() => navTo("toc-contact")}
            className="rounded-lg cursor-pointer border border-white/10 bg-white/4 px-4 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/20 hover:bg-white/7 hover:text-white/90"
          >
            Let&apos;s Chat
          </button>
        </div>

        {/* Auth — far right. Button always rendered to prevent CLS; click wired once Clerk loads */}
        <div className="flex items-center justify-end" style={{ minWidth: "6rem" }}>
          {isLoaded && isSignedIn ? (
            <UserButton
              appearance={{
                baseTheme: dark,
                elements: {
                  avatarBox: "h-8 w-8",
                  userButtonPopoverCard: "bg-[#0d0d0d] border border-white/10",
                  userButtonPopoverActionButton: "text-white/60 hover:text-white hover:bg-white/5",
                  userButtonPopoverActionButtonText: "text-white/60",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          ) : (
            <button
              onClick={() => isLoaded && setModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/20 hover:bg-white/7 hover:text-white/90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Sign In
            </button>
          )}
        </div>
      </nav>

      <SignInModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
