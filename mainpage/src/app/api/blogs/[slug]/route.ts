import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql, { isAdmin } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { userId } = await auth();

  const [post] = await sql`
    SELECT
      p.*,
      COUNT(DISTINCT l.user_id)::int  AS like_count,
      COUNT(DISTINCT c.id)::int       AS comment_count
    FROM blog_posts p
    LEFT JOIN blog_likes    l ON l.post_id = p.id
    LEFT JOIN blog_comments c ON c.post_id = p.id
    WHERE p.slug = ${slug} AND p.published = true
    GROUP BY p.id
  `;
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comments = await sql`
    SELECT id, author_name, author_image, content, created_at
    FROM blog_comments
    WHERE post_id = ${post.id}
    ORDER BY created_at ASC
  `;

  const userLiked = userId
    ? (await sql`
        SELECT 1 FROM blog_likes WHERE post_id = ${post.id} AND user_id = ${userId}
      `).length > 0
    : false;

  return NextResponse.json({ ...post, comments, user_liked: userLiked });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { slug } = await params;
  await sql`DELETE FROM blog_posts WHERE slug = ${slug}`;
  return NextResponse.json({ ok: true });
}
