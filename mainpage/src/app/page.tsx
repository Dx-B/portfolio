import Header from "@/app/components/Header";
import Background from "./about/founders/portfolios/0/components/Background";
import LandingHero from "./components/LandingHero";
import Passion from "./about/founders/portfolios/0/components/Passion";
import ChatBot from "./about/founders/portfolios/0/components/ChatBot";
import BrandBar from "./components/BrandBar";
import About from "./about/founders/portfolios/0/components/About";
import { Projects } from "./about/founders/portfolios/0/components/Projects";
import { Services } from "./about/founders/portfolios/0/components/Services";
import { TechStack } from "./about/founders/portfolios/0/components/TechStack";
import { Journey } from "./about/founders/portfolios/0/components/Journey";
import { Contact } from "./about/founders/portfolios/0/components/Contact";
import { Footer } from "./about/founders/portfolios/0/components/Footer";

export default function Home() {
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
