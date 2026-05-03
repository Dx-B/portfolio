import HeroLarge from "@/app/temp/components/HeroLarge";
import PassionLarge from "@/app/temp/components/PassionLarge";
import ChatBotLarge from "@/app/temp/components/ChatBotLarge";
import TextMarquee from "@/app/components/TextMarquee";
import { AboutLarge } from "@/app/temp/components/AboutLarge";
import { ProjectsLarge } from "@/app/temp/components/ProjectsLarge";
import { ServicesLarge } from "@/app/temp/components/ServicesLarge";
import { TechStackLarge } from "@/app/temp/components/TechStackLarge";
import { JourneyLarge } from "@/app/temp/components/JourneyLarge";
import { ContactLarge } from "@/app/temp/components/ContactLarge";
import { FooterLarge } from "@/app/temp/components/FooterLarge";
import { TOCIndexDynamic } from "@/app/temp/components/TOCIndexDynamic";

export default function TempPage() {
  return (
    <main className="bg-[#080808]">
      <HeroLarge />
      <TextMarquee />
      <TOCIndexDynamic />
      <div id="toc-passion"><PassionLarge /></div>
      <div id="toc-chatbot"><ChatBotLarge /></div>
      <div id="toc-about"><AboutLarge /></div>
      <div id="toc-projects"><ProjectsLarge /></div>
      <div id="toc-process"><ServicesLarge /></div>
      <div id="toc-techstack"><TechStackLarge /></div>
      <div id="toc-journey"><JourneyLarge /></div>
      {/* <ScrollHero /> */}
      <div id="toc-contact"><ContactLarge /></div>
      <FooterLarge />
    </main>
  );
}
