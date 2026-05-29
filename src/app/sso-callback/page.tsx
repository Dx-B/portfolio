"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const dest = sessionStorage.getItem("clerk_redirect") ?? "/";
    sessionStorage.removeItem("clerk_redirect");

    handleRedirectCallback(
      { signInForceRedirectUrl: dest, signUpForceRedirectUrl: dest },
      (to) => { router.push(to); return Promise.resolve(); }
    );
  }, [handleRedirectCallback, router]);

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#818cf8] animate-spin" />
        <p className="text-sm text-white/30 tracking-wide">Signing you in…</p>
      </div>
    </main>
  );
}
