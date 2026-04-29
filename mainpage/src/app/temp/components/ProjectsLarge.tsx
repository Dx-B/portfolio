"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  details: string;
  stack: string[];
  category: "AI" | "UI" | "Backend" | "Systems";
  image: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "AI Chat Platform",
    description: "Real-time AI chat system with streaming responses.",
    details: "Streaming architecture with memory persistence and low-latency response handling for AI workloads.",
    stack: ["Next.js", "OpenAI", "Streaming API"],
    category: "AI",
    image: "/projects/aichat.jpg",
    featured: true,
  },
  {
    title: "Portfolio System",
    description: "Modular UI system powering this site.",
    details: "Reusable component system with glass UI, collapsible layouts, and performance-first rendering.",
    stack: ["React", "Next.js", "Tailwind"],
    category: "UI",
    image: "/projects/portfolio.jpg",
    featured: true,
  },
  {
    title: "Task Manager",
    description: "Offline-first productivity tool.",
    details: "Local-first architecture with instant hydration and zero-latency task interactions.",
    stack: ["TypeScript", "IndexedDB"],
    category: "Systems",
    image: "/projects/tasks.jpg",
  },
  {
    title: "E-commerce UI",
    description: "High-performance storefront interface.",
    details: "Conversion-focused UX with optimized checkout flow and component-driven architecture.",
    stack: ["Next.js", "Stripe"],
    category: "Backend",
    image: "/projects/hero.jpg",
  },
];

export function ProjectsLarge() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0, 1]));

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <motion.div
      className="px-8 py-16 md:px-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between border-b border-white/[0.06] pb-6">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-white/20">{projects.length} total</span>
        </div>

        {/* Grid — 1 col → 2 col (md) → 4 col (xl) */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => {
            const isOpen = openSet.has(index);
            return (
              <div
                key={project.title}
                className="flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f0f0f]"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Category + featured */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] uppercase tracking-[0.18em] text-indigo-400/60">
                        · Featured
                      </span>
                    )}
                  </div>

                  {/* Title + toggle */}
                  <button onClick={() => toggle(index)} className="flex items-start justify-between gap-2 text-left">
                    <h3 className="font-semibold text-white/90">{project.title}</h3>
                    <span className="mt-0.5 shrink-0 text-white/30 text-sm">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <p className="mt-1.5 text-sm text-white/40">{project.description}</p>

                  {/* Expandable detail */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm leading-6 text-white/55">{project.details}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
