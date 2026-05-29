import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import ReactMarkdown from "react-markdown";
import sql from "@/lib/db";
import { NavBar } from "@/app/temp/components/NavBar";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

export const revalidate = 30;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId } = await auth();

  const [post] = await sql`
    SELECT
      p.*,
      COUNT(DISTINCT l.user_id)::int AS like_count,
      COUNT(DISTINCT c.id)::int      AS comment_count
    FROM blog_posts p
    LEFT JOIN blog_likes    l ON l.post_id = p.id
    LEFT JOIN blog_comments c ON c.post_id = p.id
    WHERE p.slug = ${slug} AND p.published = true
    GROUP BY p.id
  `;
  if (!post) notFound();

  const comments = await sql`
    SELECT id, author_name, author_image, content, created_at
    FROM blog_comments
    WHERE post_id = ${post.id}
    ORDER BY created_at ASC
  `;

  const userLiked = userId
    ? (await sql`SELECT 1 FROM blog_likes WHERE post_id = ${post.id} AND user_id = ${userId}`).length > 0
    : false;

  return (
    <main className="min-h-screen bg-[#080808]">
      <NavBar />

      <article className="max-w-3xl mx-auto px-6 py-24 md:px-12">
        {/* Back */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-white/25 hover:text-white/50 transition-colors mb-10"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Blogs
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
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

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-white/25 mb-10 pb-10 border-b border-white/8">
          <span>
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <LikeButton
            slug={slug}
            initialCount={Number(post.like_count)}
            initialLiked={userLiked}
            isSignedIn={!!userId}
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm md:prose-base max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-p:text-white/60 prose-p:leading-relaxed
          prose-a:text-[#818cf8] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-code:text-[#a855f7] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/8 prose-pre:rounded-xl
          prose-blockquote:border-l-[#818cf8] prose-blockquote:text-white/40
          prose-hr:border-white/8
          prose-li:text-white/60">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Comments */}
        <div className="mt-16 pt-10 border-t border-white/8">
          <CommentSection
            slug={slug}
            initialComments={comments as Comment[]}
            isSignedIn={!!userId}
          />
        </div>
      </article>
    </main>
  );
}

type Comment = {
  id: number;
  author_name: string;
  author_image: string | null;
  content: string;
  created_at: string;
};
