# GH-600 Cert Prep — Learning Journal
*Billy's thoughts and journey preparing for GitHub Certified: Agentic AI Developer*

---

## Why I'm Doing This

Registered for the GH-600 beta exam (May 29, 5:30–8PM) after discovering the certification literally days after it launched. Got in with the 80% beta discount — exam cost me ~$33. As one of the first ~100 people globally to sit this exam, the early-mover signal felt worth it regardless of the prep crunch.

The cert validates expertise in deploying, operating, integrating, and governing AI agents in production SDLC workflows using GitHub as the control plane. It maps almost directly to what I've been building with menu-lens — a multilingual AI menu reader with parallel extraction pipelines, multi-phase caching, and translation passes.

---

## Domain 1: Agent Architecture & SDLC

**What clicked immediately:**
Planning and execution need to be separated — not just for token efficiency, but because an agent that plans and acts simultaneously can take irreversible actions before anyone catches a reasoning error. I framed this in terms of menu-lens: a vague plan leads to the agent filling gaps with assumptions, and those assumptions may be wrong in ways that are expensive to undo.

**Observability vs. logging:**
I hate reading 4000-line log files in folders of 300 similarly named files. Observability is about meeting developers where they already work — GitHub PRs, Issues, workflow summaries — so you can narrow in on a problem decrementally rather than hunting through raw logs. The distinction isn't just philosophical, it's about whose workflow the artifact serves.

**Autonomy levels:**
I mapped this to my own branching model instinctively. Local/dev — agent can act freely. Staging — agent acts, human reviews artifacts. Production — human approves before any irreversible action. The exam also factors in action type, not just environment. Even in prod, posting a PR comment is low risk. Merging, deploying, deleting — always need sign-off.

**Exam performance:** 4.5/5 on practice questions. Main gap: remembering to explicitly state the rollback/recovery path in open-ended answers. I have the instinct, I just don't always verbalize it.

---

## Domain 2: Tool Use & Environment Interaction

**MCP mental model:**
I immediately mapped MCP to my Claude API calls in menu-lens. Each phase (extraction, structuring, translation) wrapped as an MCP tool would give any permitted agent a standardized interface to my pipeline. MCP is less like a single API and more like a USB standard — it makes tools pluggable into any compatible host without proprietary connectors.

**The context bloat problem:**
I independently derived the solution to MCP's biggest criticism before being told what it was — store tool definitions like a HashMap, load only the index at session start, retrieve full definitions on demand when the agent's reasoning determines it needs them. The industry landed on this as "Agent Skills" with progressive disclosure. Satisfying to arrive at it independently.

**Key insight on MCP vs Skills:**
MCP is for live system interaction — databases, GitHub, cloud infra, authenticated APIs. Skills are for teaching an agent conventions and patterns. They solve different problems. The "MCP is dead" discourse is mostly about overcomplicated local implementations, not the enterprise remote MCP use case the cert actually tests.

**Branch scope realization:**
If an agent is scoped to feature/fastAPI and follows a dependency chain back to main, it might rewrite functions outside its intended scope without explicit permission. Read access across branches is fine. Write access must be locked to the working branch. Scope creep via dependency chain is the real danger, not just obvious out-of-bounds access.

**Exam performance:** 3/3 on practice questions. Clean sweep. Instincts are strong on security/permission questions — zero-trust IAM background transfers directly.

---

## On the MCP Debate

The industry backlash against MCP in early 2026 is real but nuanced. The criticism is aimed at local stdio implementations with bloated tool registries. Remote MCP over Streamable HTTP for enterprise systems is a different story — AWS, Cloudflare, and GitHub all doubled down on it. The exam was written by GitHub about GitHub tooling. MCP in that context is first-party and tested. Know it cold regardless of the discourse.

---

## Meta-Observations on Learning

**The solo developer gap:** I apply most of these patterns mentally at small scale and get away with it. The translation needed for this exam is: mental bookkeeping → externalized, structured artifacts in the repo. What I track in my head, a production system writes to a checkpoint file. What I notice visually, a production system detects with automated drift checks.

**Vocabulary is the real gap:** My mental models are correct. The concepts map to things I've built. The risk is that exam/interview vocabulary like "durable artifact," "context drift," or "least-privilege execution context" won't immediately register as things I already understand deeply. Solution: build explicit vocabulary maps as we go through each domain.

---

## Domain 3: Memory, State & Execution

**The analogy that clicked:**
The surgeon analogy — a power outage mid-operation with three outcomes: no memory (restart from scratch, dangerous), partial memory (whiteboard checklist, recoverable), full durable record (resume exactly where you left off). An agent's memory architecture determines which outcome you get when something inevitably fails.

**Memory types — how I think about them in menu-lens terms:**
- Short-term = the active prompt context per API call. Gone when the call ends.
- Long-term = my JSON cache files. Survive crashes, restarts, everything.
- External = reading from GitHub Issues or a live API at runtime. I don't own it, it can change.

**Key insight on state persistence:**
I already implement a raw state output system in menu-lens — on unexpected termination, a raw file is generated capturing current progress. The production upgrade I identified myself: add a write-ahead log pattern — log the *intention* before executing the step, not just the output after. This handles the edge case where the agent completes a step but crashes before writing the checkpoint.

**Context drift — the concept I had to think hardest about:**
An agent reads repo state at step 1, spends 40 minutes analyzing, then posts a summary. Meanwhile the world changed. The summary is accurate to a snapshot that no longer exists. Fix: periodic re-validation + change queue. Finish current task, process queued changes, then output. I got the fix right but initially skipped naming the root cause — a pattern I need to fix for the exam.

**Memory pruning vs reset — reframe needed:**
I initially framed this around model weights/conversation history (the ChatGPT mental model). The exam means task context specifically. Pruning = dropping low-relevance data mid-task to prevent context overflow (dropping Phase 1 raw data once Phase 2 completes). Reset = clearing all task context between unrelated tasks so prior assumptions don't contaminate new ones.

**Exam performance:** 3/3 but B+ on Q3 due to wrong framing. Consistent pattern identified: I jump to the fix before naming the root cause. Exam structure wants: problem → root cause → fix → recovery behavior. Training myself to name the anti-pattern first.

**Production gap in menu-lens identified:**
Explicit checkpoint with completion percentage and rollback pointer. Cache captures output but not execution progress or intention. Write-ahead logging would close this gap.

---

## Domains Remaining
- [x] Domain 1: Agent Architecture & SDLC
- [x] Domain 2: Tool Use & Environment Interaction
- [x] Domain 3: Memory, State & Execution
- [ ] Domain 5: Multi-Agent Coordination ← current
- [ ] Domain 4: Evaluation, Error Analysis & Tuning
- [ ] Domain 6: Guardrails & Accountability

---
*Updated progressively during exam prep — May 2026*
