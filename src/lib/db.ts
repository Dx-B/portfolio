import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export default sql;

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id          SERIAL PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      title       TEXT NOT NULL,
      content     TEXT NOT NULL,
      excerpt     TEXT,
      tags        TEXT[],
      author_id   TEXT NOT NULL,
      published   BOOLEAN DEFAULT true,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS blog_comments (
      id           SERIAL PRIMARY KEY,
      post_id      INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
      author_id    TEXT NOT NULL,
      author_name  TEXT NOT NULL,
      author_image TEXT,
      content      TEXT NOT NULL,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS blog_likes (
      post_id     INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
      user_id     TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (post_id, user_id)
    )
  `;
}

export function isAdmin(userId: string) {
  return userId === process.env.ADMIN_USER_ID;
}
