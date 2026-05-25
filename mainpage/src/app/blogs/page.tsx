import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import sql, { isAdmin } from "@/lib/db";
import { NavBar } from "@/app/temp/components/NavBar";

export const revalidate = 60;

export default async function BlogsPage() {
  const { userId } = await auth();
  const admin = userId ? isAdmin(userId) : false;

  const posts = await sql`
    SELECT
      p.id, p.slug, p.title, p.excerpt, p.tags, p.created_at,
      COUNT(DISTINCT l.user_id)::int AS like_count,
      COUNT(DISTINCT c.id)::int      AS comment_count
    FROM blog_posts p
    LEFT JOIN blog_likes    l ON l.post_id = p.id
    LEFT JOIN blog_comments c ON c.post_id = p.id
    WHERE p.published = true
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;

  return (
    <main className="min-h-screen bg-[#080808]">
      <NavBar />

      <div className="max-w-5xl mx-auto px-6 py-24 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/25 mb-3">
              Writing
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Blogs
            </h1>
            <p className="mt-2 text-white/40 text-base">
              Thoughts on engineering, design, and building things.
            </p>
          </div>
          {admin && (
            <Link
              href="/blogs/admin"
              className="relative rounded-xl bg-linear-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] p-px"
            >
              <span className="block rounded-[11px] bg-[#080808] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5">
                + New Post
              </span>
            </Link>
          )}
        </div>

        {/* Gradient rule */}
        <div className="h-px w-full bg-linear-to-r from-[#818cf8]/30 via-[#a855f7]/30 to-[#ec4899]/30 mb-12" />

        {/* Post grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24 text-white/25 text-sm">
            No posts yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-200 hover:border-white/16 hover:bg-white/[0.04]"
              >
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#818cf8]/30 text-[#818cf8]/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-lg font-semibold text-white group-hover:text-white/90 leading-snug mb-2">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-4 text-[11px] text-white/25">
                  <span>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {post.like_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {post.comment_count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
