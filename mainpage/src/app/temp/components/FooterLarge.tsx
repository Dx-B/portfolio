"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";
import { motion } from "framer-motion";

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
      { label: "GitHub", href: "https://github.com/Dx-B", external: true },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Dx-B", icon: BsGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/billy-zhang-dx", icon: BsLinkedin },
  { label: "Email", href: "mailto:billyzhangdx@gmail.com", icon: BsEnvelope },
];

export function FooterLarge() {
  return (
    <motion.footer
      className="relative mt-16 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-sm font-semibold tracking-[0.18em] text-white/70">
                BZ
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-tight text-white/85">Billy Zhang</h2>
                <p className="text-sm text-white/35">Design-forward systems, interfaces, and AI experiences.</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/40">
              Building thoughtful digital products with a focus on mood, interaction, and real-world usefulness.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    aria-label={item.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-white/45 transition hover:border-white/16 hover:text-white/80">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 space-y-3 text-sm text-white/35">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/25" />
                <a href="mailto:billyzhangdx@gmail.com" className="transition hover:text-white/65">billyzhangdx@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/25" />
                <span>New Jersey, United States</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/25" />
                <span>Available for selected projects</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">{section.title}</h3>
                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => {
                    const content = (
                      <>
                        <span>{link.label}</span>
                        {"external" in link && link.external && (
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                        )}
                      </>
                    );
                    return (
                      <li key={link.label}>
                        {"external" in link && link.external ? (
                          <a href={link.href} target="_blank" rel="noreferrer noopener"
                            className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition hover:text-white/75">
                            {content}
                          </a>
                        ) : (
                          <Link href={link.href}
                            className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition hover:text-white/75">
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
          <div className="flex flex-col gap-3 text-sm text-white/28 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Billy Zhang. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="transition hover:text-white/55">Privacy</Link>
              <Link href="/terms" className="transition hover:text-white/55">Terms</Link>
              <p>Trademark and brand assets protected.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
