import Header from "@/app/components/Header";
import Background from "@/app/about/founders/portfolios/0/components/Background";
import LandingHero from "@/app/components/LandingHero";
import Passion from "@/app/about/founders/portfolios/0/components/Passion";
import ChatBot from "@/app/about/founders/portfolios/0/components/ChatBot";
import BrandBar from "@/app/components/BrandBar";
import About from "@/app/about/founders/portfolios/0/components/About";
import { Projects } from "@/app/about/founders/portfolios/0/components/Projects";
import { Services } from "@/app/about/founders/portfolios/0/components/Services";
import { TechStack } from "@/app/about/founders/portfolios/0/components/TechStack";
import { Journey } from "@/app/about/founders/portfolios/0/components/Journey";
import { Contact } from "@/app/about/founders/portfolios/0/components/Contact";
import { Footer } from "@/app/about/founders/portfolios/0/components/Footer";

export default function TempPage() {
  return (
    <main>
      <Header />
      <section className="relative overflow-hidden">
        <Background />
        <LandingHero />
        <Passion />
        <ChatBot />
        <BrandBar />
        <About />
        <Projects />
        <Services />
        <TechStack />
        <Journey />
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
