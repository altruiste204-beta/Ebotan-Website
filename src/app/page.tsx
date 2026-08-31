"use client";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { LocaleProvider } from "@/components/ui/LocaleProvider";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { GeometricShapes } from "@/components/ui/GeometricShapes";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <main className="relative">
          <GeometricShapes />
          <Navbar />
          <Hero />
          <Products />
          <Services />
          <Pricing />
          <About />
          <Contact />
          <Footer />
          <WhatsAppButton />
        </main>
      </LocaleProvider>
    </ThemeProvider>
  );
}
