"use client";

import { useState } from "react";
import { BsArrowRight, BsEnvelope, BsSend } from "react-icons/bs";
import { motion } from "framer-motion";

export function ContactLarge() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted:", form);
  }

  return (
    <motion.div
      id="contact"
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 border-b border-white/[0.06] pb-6">
          <h2 className="text-3xl font-bold text-white">Contact</h2>
        </div>

        <div className="space-y-6">
            {/* Top */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[34rem]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  Open to opportunities
                </div>

                <h3 className="mt-4 max-w-[30ch] text-2xl font-semibold leading-tight md:text-3xl">
                  <span className="text-white/92 text-shadow-[0_0_12px_rgba(255,255,255,0.16)]">
                    Want to build something together?
                  </span>
                </h3>

                <p className="mt-4 max-w-[80ch] text-sm leading-7 text-white/45">
                  I&apos;m interested in design-forward software, AI products, and systems that feel polished, useful, and memorable.
                  Have something in mind? I&apos;m open to thoughtful projects, collaborations, and new opportunities.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <button className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
                  Hire Me
                  <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white">
                  <BsEnvelope className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 border-t border-white/[0.06] pt-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.03]"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.03]"
                required
              />
              <textarea
                placeholder="Send me a quick query..."
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                className="resize-none rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.03] md:col-span-2"
                required
              />
              <div className="flex justify-end md:col-span-2">
                <button type="submit"
                  className="group cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white">
                  Send
                  <BsSend className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
      </div>
    </motion.div>
  );
}
