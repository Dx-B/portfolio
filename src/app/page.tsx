import { Suspense } from "react";
import HeroLarge from "@/app/temp/components/HeroLarge";
import PassionLarge from "@/app/temp/components/PassionLarge";
import ChatBotLarge from "@/app/temp/components/ChatBotLarge";
import TextMarquee from "@/app/components/TextMarquee";
import { AboutLarge } from "@/app/temp/components/AboutLarge";
import { ProjectsLarge } from "@/app/temp/components/ProjectsLarge";
import { ServicesLarge } from "@/app/temp/components/ServicesLarge";
import { TechStackLarge } from "@/app/temp/components/TechStackLarge";
import { ContactLarge } from "@/app/temp/components/ContactLarge";
import { FooterLarge } from "@/app/temp/components/FooterLarge";
import { TOCIndexDynamic } from "@/app/temp/components/TOCIndexDynamic";
import { NavBar } from "@/app/temp/components/NavBar";
import { getLiveCardData, LIVE_FALLBACK, type LiveCardData } from "@/lib/psi";

type GitInfo = { branch: string; commit: string; message: string };

async function HeroStream({
  promise,
  region,
  git,
}: {
  promise: Promise<LiveCardData>;
  region?: string;
  git?: GitInfo;
}) {
  const liveData = await promise;
  return <HeroLarge liveData={liveData} region={region} git={git} />;
}

export default function Home() {
  const liveDataPromise = getLiveCardData();
  const region = process.env.VERCEL_REGION;
  const git = {
    branch:  process.env.VERCEL_GIT_COMMIT_REF     ?? "dev",
    commit:  (process.env.VERCEL_GIT_COMMIT_SHA ?? "b446c81").slice(0, 7),
    message: process.env.VERCEL_GIT_COMMIT_MESSAGE  ?? "TOC LCP LL Fix 1",
  };

  return (
    <main className="bg-[#080808]">
      <NavBar />
      <Suspense fallback={<HeroLarge liveData={LIVE_FALLBACK} region={region} git={git} />}>
        <HeroStream promise={liveDataPromise} region={region} git={git} />
      </Suspense>
      <TextMarquee />
      <TOCIndexDynamic />
      <div id="toc-passion"><PassionLarge /></div>
      <div id="toc-chatbot"><ChatBotLarge /></div>
      <div id="toc-about"><AboutLarge /></div>
      <div id="toc-projects"><ProjectsLarge /></div>
      <div id="toc-process"><ServicesLarge /></div>
      <div id="toc-techstack"><TechStackLarge /></div>
      <div id="toc-contact"><ContactLarge /></div>
      <FooterLarge />
    </main>
  );
}
