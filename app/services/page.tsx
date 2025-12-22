
import Footer from "@/components/home/FooterLayout";
import Header from "@/components/home/Header";
import CoreServices from "@/components/services/CoreServices";
import DeepDiveAnalysis from "@/components/services/DeepDIveAnanlysis";
import Methodologies from "@/components/services/Methodologies";
import Process from "@/components/services/Process";


export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />
      <main className="pt-16">
        {/* Hero Banner for Services Page */}
        <section className="py-20 bg-[#0a1628]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Services
            </h1>
            <div className="w-20 h-1 bg-[#22d3ee] mx-auto mb-6"></div>
            <p className="text-lg text-[#cbd5e1] max-w-3xl mx-auto">
              Comprehensive market research solutions tailored to your needs
            </p>
          </div>
        </section>

        <Methodologies />
        <CoreServices />
        <Process />
        <DeepDiveAnalysis />
      </main>
      <Footer />
    </div>
  )
}
