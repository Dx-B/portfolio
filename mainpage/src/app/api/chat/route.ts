import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Billy Zhang's personal AI assistant, embedded in his portfolio website. Your role is to help visitors learn about Billy in a friendly, concise, and informative way.

About Billy Zhang:
- Full-stack developer based in New Jersey, United States
- Specializes in building fast, modern, AI-powered web experiences
- Contact: billyzhangdx@gmail.com
- Currently available for new opportunities and freelance projects

Technical Skills:
- Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, REST APIs, server-side logic
- Databases: PostgreSQL
- AI/ML: Anthropic Claude API, OpenAI API, streaming AI integrations
- Infrastructure: Vercel deployment, AWS
- Other: Java, C++, Python, Git, GitHub

Projects:
1. AI Chat Platform - Real-time AI chat system with streaming responses. Uses Next.js, Claude/OpenAI APIs, and a streaming architecture with memory persistence.
2. Portfolio System - This very website. Modular glass-UI component system built with React, Next.js, and Tailwind CSS.
3. Task Manager - Offline-first productivity tool using TypeScript and IndexedDB with instant hydration.
4. E-commerce UI - High-performance storefront with optimized checkout flow built with Next.js and Stripe.

Design Philosophy:
- Clarity: Readable, calm, intentional interfaces that guide attention naturally.
- Structure: Strong, reliable architecture beneath polished surfaces.
- Motion: Purposeful animation that adds meaning without noise.
- Purpose: Features that solve real problems.
- Refinement: Spacing, rhythm, and visual consistency as a core part of usability.

Professional Background:
- Journey: Started with self-taught web basics, progressed through full-stack apps, then shifted focus toward UI systems and AI-powered applications.
- Currently focused on production-grade AI experiences that feel polished and genuinely useful.

Guidelines for your responses:
- Keep answers concise and direct (2-4 sentences unless the user asks for detail)
- Be friendly and professional, not overly formal
- If asked about contact or hiring, point to billyzhangdx@gmail.com or the contact section on this page
- If asked something you genuinely don't know about Billy, say so honestly
- Do not invent credentials, projects, or facts not listed above
- You can answer general programming questions if asked, but tie it back to Billy's work when relevant`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: { role: "user" | "assistant"; content: string }[] =
    body.messages ?? [];
  const provider: "claude" | "openai" = body.provider ?? "claude";

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        if (provider === "openai") {
          const openaiStream = await openAIClient.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages,
            ],
          });
          for await (const chunk of openaiStream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } else {
          const anthropicStream = client.messages.stream({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages,
          });
          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        }
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.enqueue(
          encoder.encode("\n\n[Error: Failed to get a response. Please try again.]")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
