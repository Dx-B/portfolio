import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const { content } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }

  const [post] = await sql`SELECT id FROM blog_posts WHERE slug = ${slug} AND published = true`;
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Anonymous";
  const [comment] = await sql`
    INSERT INTO blog_comments (post_id, author_id, author_name, author_image, content)
    VALUES (${post.id}, ${user.id}, ${name}, ${user.imageUrl ?? null}, ${content.trim()})
    RETURNING *
  `;
  return NextResponse.json(comment, { status: 201 });
}
