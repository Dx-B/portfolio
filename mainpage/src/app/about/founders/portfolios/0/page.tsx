"use client";

import Header from "@/app/components/Header";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Passion from "./components/Passion";
import ChatBot from "./components/ChatBot";
import BrandBar from "@/app/components/BrandBar";
import About from "./components/About";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <main>
        <Header/>
      <section className="relative min-h-screen overflow-hidden">
        <Background/>
        <Hero />
        <Passion />
        <ChatBot />
        <BrandBar/>
        <About/>
        <Projects/>
        <Services/>
        <TechStack/>
        <Journey/>
        <Contact/>
      </section>
    </main>
  );
}
