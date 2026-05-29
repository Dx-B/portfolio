"use client";

import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { GradientTitle } from "./GradientTitle";
import Image from "next/image";

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
    details:
      "Streaming architecture with memory persistence and low-latency response handling for AI workloads.",
    stack: ["Next.js", "OpenAI", "Streaming API"],
    category: "AI",
    image: "/projects/aichat.jpg",
    featured: true,
  },
  {
    title: "Portfolio System",
    description: "Modular UI system powering this site.",
    details:
      "Reusable component system with glass UI, collapsible layouts, and performance-first rendering.",
    stack: ["React", "Next.js", "Tailwind"],
    category: "UI",
    image: "/projects/portfolio.jpg",
    featured: true,
  },
  {
    title: "Task Manager",
    description: "Offline-first productivity tool.",
    details:
      "Local-first architecture with instant hydration and zero-latency task interactions.",
    stack: ["TypeScript", "IndexedDB"],
    category: "Systems",
    image: "/projects/tasks.jpg",
  },
  {
    title: "E-commerce UI",
    description: "High-performance storefront interface.",
    details:
      "Conversion-focused UX with optimized checkout flow and component-driven architecture.",
    stack: ["Next.js", "Stripe"],
    category: "Backend",
    image: "/projects/hero.jpg",
  },
];

// 👇 top 2 open by default
const DEFAULT_OPEN = new Set([0, 1]);

export function Projects() {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(DEFAULT_OPEN)
  );

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);

      if (next.has(index)) {
        next.delete(index); // close
      } else {
        next.add(index); // open
      }

      return next;
    });
  };

  return (
    <div id="projects" className="space-y-4 m-4">

      <GradientTitle>Projects</GradientTitle>

      <div className="grid md:grid-cols-2 gap-4">

        {projects.map((project, index) => {
          const isOpen = openSet.has(index);

          return (
            <GlassCard
              key={project.title}
              className="p-0 overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image width={500} height={500} src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left"
                >

                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2">

                      {project.featured && (
                        <span className="text-xs px-2 py-0.5 bg-indigo-500/30 text-indigo-200 rounded">
                          Featured
                        </span>
                      )}

                      {project.title}
                    </h3>

                    <span className="text-gray-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mt-2">
                    {project.description}
                  </p>

                </button>

                {/* EXPANDABLE */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >

                  <p className="text-sm text-gray-300">
                    {project.details}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-300">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-black/30 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

            </GlassCard>
          );
        })}

      </div>
    </div>
  );
}
