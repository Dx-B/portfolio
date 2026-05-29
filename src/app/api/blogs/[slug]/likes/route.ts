import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const [post] = await sql`SELECT id FROM blog_posts WHERE slug = ${slug} AND published = true`;
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const existing = await sql`
    SELECT 1 FROM blog_likes WHERE post_id = ${post.id} AND user_id = ${userId}
  `;

  if (existing.length > 0) {
    await sql`DELETE FROM blog_likes WHERE post_id = ${post.id} AND user_id = ${userId}`;
    return NextResponse.json({ liked: false });
  } else {
    await sql`INSERT INTO blog_likes (post_id, user_id) VALUES (${post.id}, ${userId})`;
    return NextResponse.json({ liked: true });
  }
}
