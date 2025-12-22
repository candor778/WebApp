import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
