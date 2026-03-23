"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

export function ExpandableSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full space-y-2">

      {/* HEADER */}
      <button onClick={() => setOpen(!open)} className="w-full">
        <GlassCard className="flex justify-between items-center p-4">
          <span className="font-semibold text-white">{title}</span>
          <span className="text-sm text-gray-400">
            {open ? "Close" : "Open"}
          </span>
        </GlassCard>
      </button>

      {/* BODY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <GlassCard className="p-5">
                {children}
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
