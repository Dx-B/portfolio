import HeroLarge from "@/app/temp/components/HeroLarge";
import PassionLarge from "@/app/temp/components/PassionLarge";
import ChatBotLarge from "@/app/temp/components/ChatBotLarge";
import BrandBar from "@/app/components/BrandBar";
import { AboutLarge } from "@/app/temp/components/AboutLarge";
import { ProjectsLarge } from "@/app/temp/components/ProjectsLarge";
import { ServicesLarge } from "@/app/temp/components/ServicesLarge";
import { TechStackLarge } from "@/app/temp/components/TechStackLarge";
import { JourneyLarge } from "@/app/temp/components/JourneyLarge";
import ScrollHero from "@/app/components/ScrollHero";
import { ContactLarge } from "@/app/temp/components/ContactLarge";
import { FooterLarge } from "@/app/temp/components/FooterLarge";

export default function TempPage() {
  return (
    <main className="bg-[#080808]">
      <HeroLarge />
      <PassionLarge />
      <ChatBotLarge />
      <BrandBar />
      <AboutLarge />
      <ProjectsLarge />
      <ServicesLarge />
      <TechStackLarge />
      <JourneyLarge />
      {/* <ScrollHero /> */}
      <ContactLarge />
      <FooterLarge />
    </main>
  );
}
