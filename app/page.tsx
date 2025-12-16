"use client";

import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import WhyChooseUs from "@/components/home/why-choose-us";
import ResearchProcess from "@/components/home/research-process";
import ServicesSection from "@/components/home/ServicesSection";
import ResearchMethodologiesSection from "@/components/home/research-methodologies";
import ContactSection from "@/components/home/contact-section";
import Footer from "@/components/home/footer";

export default function LandingPage() {
  return (
    <div className="w-full overflow-hidden">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <ResearchProcess />
      <ServicesSection />
      <ResearchMethodologiesSection />
      <ContactSection />

      <Footer />
    </div>
  );
}
