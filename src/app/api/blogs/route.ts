import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql, { isAdmin } from "@/lib/db";

export async function GET() {
  const posts = await sql`
    SELECT
      p.id, p.slug, p.title, p.excerpt, p.tags, p.created_at,
      COUNT(DISTINCT l.user_id)::int  AS like_count,
      COUNT(DISTINCT c.id)::int       AS comment_count
    FROM blog_posts p
    LEFT JOIN blog_likes    l ON l.post_id = p.id
    LEFT JOIN blog_comments c ON c.post_id = p.id
    WHERE p.published = true
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, slug, content, excerpt, tags } = await req.json();
  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
  }

  const [post] = await sql`
    INSERT INTO blog_posts (slug, title, content, excerpt, tags, author_id)
    VALUES (${slug}, ${title}, ${content}, ${excerpt ?? null}, ${tags ?? []}, ${userId})
    RETURNING *
  `;
  return NextResponse.json(post, { status: 201 });
}
