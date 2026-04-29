"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Journey", href: "/journey" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "AI Applications", href: "/projects?category=ai" },
      { label: "UI Systems", href: "/projects?category=ui" },
      { label: "Backend", href: "/projects?category=backend" },
      { label: "Systems", href: "/projects?category=systems" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
      { label: "Notes", href: "/notes" },
      { label: "GitHub", href: "https://github.com/yourusername", external: true },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    icon: BsGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: BsLinkedin,
  },
  {
    label: "Email",
    href: "mailto:you@example.com",
    icon: BsEnvelope,
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.06] bg-black/80">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.04),transparent_22%),radial-gradient(circle_at_82%_78%,rgba(130,150,255,0.05),transparent_24%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold tracking-[0.18em] text-white/80 shadow-[0_0_20px_rgba(255,255,255,0.04)]">
                BZ
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white/90">
                  Billy Zhang
                </h2>
                <p className="text-sm text-white/38">
                  Design-forward systems, interfaces, and AI experiences.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/42">
              Building thoughtful digital products with a focus on mood,
              interaction, and real-world usefulness.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    aria-label={item.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-white/52 transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white/85"
                  >
                    <Icon className="h-4 w-4 transition duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 space-y-3 text-sm text-white/36">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/30" />
                <a
                  href="mailto:you@example.com"
                  className="transition hover:text-white/70"
                >
                  billyzhangdx@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/30" />
                <span>New Jersey, United States</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/30" />
                <span>Available for selected projects</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/32">
                  {section.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => {
                    const content = (
                      <>
                        <span>{link.label}</span>
                        {link.external && (
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                        )}
                      </>
                    );

                    return (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex items-center gap-1.5 text-sm text-white/46 transition hover:text-white/82"
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1.5 text-sm text-white/46 transition hover:text-white/82"
                          >
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6">
          <div className="flex flex-col gap-3 text-sm text-white/30 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Billy Zhang. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="transition hover:text-white/60">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-white/60">
                Terms
              </Link>
              <p>Trademark and brand assets protected.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}