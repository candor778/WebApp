import About from "@/components/home/About"
import Contact from "@/components/home/Contact"
import Footer from "@/components/home/FooterLayout"
import Header from "@/components/home/Header"
import Hero from "@/components/home/Hero"
import WhyChooseUs from "@/components/home/WhyChooseUs"

export default function Home() {
  return (
    <>
      {/* ✅ Organization Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Candor Survey",
            url: "https://candorsurvey.com",
            logo: "https://candorsurvey.com/assets/candor-favicon-bg.png",
          }),
        }}
      />

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
    </>
  )
}
