"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(slugify(val));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError("Title, slug, and content are required.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        content: content.trim(),
      }),
    });

    if (res.ok) {
      const post = await res.json();
      router.push(`/blogs/${post.slug}`);
    } else {
      const { error: msg } = await res.json();
      setError(msg ?? "Failed to create post.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#818cf8]/50 transition-colors";
  const labelClass = "block text-[11px] uppercase tracking-[0.16em] text-white/35 mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="My great post"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="my-great-post"
          className={inputClass}
        />
        <p className="mt-1.5 text-[10px] text-white/20">
          billyzhang.dev/blogs/{slug || "…"}
        </p>
      </div>

      <div>
        <label className={labelClass}>Excerpt</label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary shown on the listing page"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="nextjs, design, ai"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Content (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="# My great post&#10;&#10;Start writing..."
          rows={18}
          className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="relative rounded-xl bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] p-px disabled:opacity-40"
        >
          <span className="block rounded-[11px] bg-[#080808] px-6 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors">
            {submitting ? "Publishing..." : "Publish Post"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push("/blogs")}
          className="text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
