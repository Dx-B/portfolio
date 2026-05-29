"use client";

import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { GradientTitle } from "./GradientTitle";
import { BsArrowRight, BsEnvelope, BsSend, BsBriefcase, BsCodeSlash } from "react-icons/bs";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // placeholder for backend
    console.log("Form submitted:", form);

    // later: POST to /api/contact
  }

  return (
    <section id="contact" className="m-4 space-y-4">
      <GradientTitle>Contact</GradientTitle>

      <GlassCard className="relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.02] p-5 md:p-6">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(120,100,255,0.06),transparent_30%)]" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* TOP SECTION (unchanged structure, improved badge) */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[34rem]">
              {/* 🔥 improved badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-gradient-to-r from-indigo-500/20 via-purple-500/18 to-fuchsia-500/16 px-4 py-2.5 text-[11px] uppercase tracking-[0.26em] text-indigo-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_rgba(120,80,255,0.18)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_10px_rgba(165,180,252,0.9)]" />
                Open to opportunities
              </div>

              <h3 className="mt-4 max-w-[14ch] text-2xl font-semibold leading-tight text-white/90 md:text-3xl">
              Want to build something together?
            </h3>

            <p className="mt-4 max-w-[58ch] text-sm leading-7 text-white/42 md:text-[0.96rem]">
              I’m interested in design-forward software, AI products, and systems
              that feel polished, useful, and memorable.
            </p>

              <p className="mt-4 text-sm leading-7 text-white/46">
                Have something in mind? I’m open to thoughtful projects,
                collaborations, and new opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 text-sm font-medium text-white transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(120,80,255,0.18)]">
                Hire Me
                <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72 transition hover:border-white/18 hover:bg-white/[0.04] hover:text-white">
                <BsEnvelope className="h-4 w-4" />
                Message
              </button>
            </div>
          </div>

          {/* 🔥 FORM (new section below) */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 border-t border-white/[0.06] pt-6 md:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.04]"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.04]"
              required
            />

            <textarea
              placeholder="Send me a quick query..."
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              rows={4}
              className="md:col-span-2 resize-none rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/16 focus:bg-white/[0.04]"
              required
            />

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/20"
              >
                Send
                <BsSend className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </GlassCard>
    </section>
  );
}