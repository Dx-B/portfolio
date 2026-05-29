"use client";

import { useSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "email" | "code";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { signIn, fetchStatus } = useSignIn();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const isLoading = fetchStatus === "fetching";

  function handleClose() {
    setStep("email");
    setEmail("");
    setCode("");
    setError("");
    onClose();
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || isLoading) return;
    setError("");

    const { error: createErr } = await signIn.create({ identifier: email.trim() });
    if (createErr) { setError(createErr.longMessage ?? createErr.message); return; }

    const { error: sendErr } = await signIn.emailCode.sendCode();
    if (sendErr) { setError(sendErr.longMessage ?? sendErr.message); return; }

    setStep("code");
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6 || isLoading) return;
    setError("");

    const { error: verifyErr } = await signIn.emailCode.verifyCode({ code: code.trim() });
    if (verifyErr) { setError(verifyErr.longMessage ?? verifyErr.message); setCode(""); return; }

    const { error: finalErr } = await signIn.finalize();
    if (finalErr) { setError(finalErr.longMessage ?? finalErr.message); return; }

    handleClose();
  }

  async function signInWithGoogle() {
    if (isLoading) return;
    const dest = typeof window !== "undefined" ? window.location.pathname : "/";
    sessionStorage.setItem("clerk_redirect", dest);
    await signIn.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: dest,
    });
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#818cf8]/60 transition-colors";
  const labelClass =
    "block text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2";
  const primaryBtn =
    "w-full rounded-xl cursor-pointer bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] p-px disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute cursor-pointer top-4 right-4 text-white/25 hover:text-white/60 transition-colors"
              aria-label="Close"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 mb-2">
                {step === "email" ? "Welcome back" : "Check your email"}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {step === "email" ? "Sign in" : "Enter code"}
              </h2>
              <p className="mt-1.5 text-sm text-white/45">
                {step === "email"
                  ? "Continue to your account."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            {/* Invisible CAPTCHA mount point required by Clerk for bot protection */}
            <div id="clerk-captcha" />

            <AnimatePresence mode="wait">
              {step === "email" ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Google */}
                  <button
                    onClick={signInWithGoogle}
                    disabled={isLoading}
                    className="w-full cursor-pointer flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white mb-5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/8" />
                    <span className="text-[11px] text-white/30">or</span>
                    <div className="flex-1 h-px bg-white/8" />
                  </div>

                  {/* Email form */}
                  <form onSubmit={submitEmail} className="space-y-4">
                    <div>
                      <label className={labelClass}>Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoFocus
                        className={inputClass}
                      />
                    </div>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <button
                      type="submit"
                      disabled={isLoading || !email.trim()}
                      className={primaryBtn}
                    >
                      <span className="flex items-center justify-center gap-2 rounded-[11px] bg-[#0d0d0d] px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                        {isLoading ? "Sending…" : "Continue →"}
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <form onSubmit={submitCode} className="space-y-4">
                    <div>
                      <label className={labelClass}>Verification code</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={code}
                        onChange={(e) =>
                          setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="000000"
                        autoFocus
                        className={`${inputClass} font-mono tracking-[0.35em] text-center text-base`}
                      />
                    </div>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <button
                      type="submit"
                      disabled={isLoading || code.length < 6}
                      className={primaryBtn}
                    >
                      <span className="flex items-center justify-center rounded-[11px] bg-[#0d0d0d] px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                        {isLoading ? "Verifying…" : "Verify →"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setStep("email"); setCode(""); setError(""); }}
                      className="w-full text-xs text-white/30 hover:text-white/55 transition-colors pt-1"
                    >
                      ← Use a different email
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
