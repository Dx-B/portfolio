"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LikeButton({
  slug,
  initialCount,
  initialLiked,
  isSignedIn,
}: {
  slug: string;
  initialCount: number;
  initialLiked: boolean;
  isSignedIn: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    if (!isSignedIn) { router.push("/sign-in"); return; }
    if (loading) return;
    setLoading(true);
    const res = await fetch(`/api/blogs/${slug}/likes`, { method: "POST" });
    if (res.ok) {
      const { liked: nowLiked } = await res.json();
      setLiked(nowLiked);
      setCount((c) => c + (nowLiked ? 1 : -1));
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 transition-colors ${
        liked ? "text-[#ec4899]" : "text-white/25 hover:text-white/50"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      {count} {count === 1 ? "like" : "likes"}
    </button>
  );
}
