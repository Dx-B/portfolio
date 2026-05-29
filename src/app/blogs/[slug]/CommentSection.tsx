"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Comment = {
  id: number;
  author_name: string;
  author_image: string | null;
  content: string;
  created_at: string;
};

export default function CommentSection({
  slug,
  initialComments,
  isSignedIn,
}: {
  slug: string;
  initialComments: Comment[];
  isSignedIn: boolean;
}) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError("");
    const res = await fetch(`/api/blogs/${slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.trim() }),
    });
    if (res.ok) {
      const comment = await res.json();
      setComments((c) => [...c, comment]);
      setText("");
    } else {
      setError("Failed to post comment. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-6">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      {/* Comment list */}
      <div className="space-y-5 mb-8">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            {c.author_image ? (
              <Image
                src={c.author_image}
                alt={c.author_name}
                width={32}
                height={32}
                className="rounded-full shrink-0 mt-0.5"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-white/10 shrink-0 mt-0.5 flex items-center justify-center text-xs text-white/40 font-medium">
                {c.author_name[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-medium text-white/80">{c.author_name}</span>
                <span className="text-[10px] text-white/25">
                  {new Date(c.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">{c.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-white/25">No comments yet. Be the first.</p>
        )}
      </div>

      {/* Comment form */}
      {isSignedIn ? (
        <form onSubmit={submit} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a comment..."
            rows={3}
            className="w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#818cf8]/50 resize-none transition-colors"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="relative rounded-xl bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] p-px disabled:opacity-40"
          >
            <span className="block rounded-[11px] bg-[#080808] px-5 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors">
              {submitting ? "Posting..." : "Post Comment"}
            </span>
          </button>
        </form>
      ) : (
        <div className="rounded-xl border border-white/8 bg-white/[0.025] px-5 py-4 text-sm text-white/40">
          <Link href="/sign-in" className="text-[#818cf8] hover:underline">Sign in</Link> to leave a comment.
        </div>
      )}
    </div>
  );
}
