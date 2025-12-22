
import Footer from "@/components/home/FooterLayout";
import Header from "@/components/home/Header";
import IndustryServices from "@/components/industry/IndustryServices";


export default function IndustryPage() {
  return (
    <div className="min-h-screen bg-[#0f1724]">
      <Header />
      <main className="pt-16">
        {/* Hero Banner for Industry Page */}
        <section className="py-20 bg-[#0a1628]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="  text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Industry Solutions
            </h1>
            <div className="w-20 h-1 bg-[#22d3ee] mx-auto mb-6"></div>
            <p className="text-lg text-[#cbd5e1] max-w-3xl mx-auto">
              Specialized research services tailored to your industry
            </p>
          </div>
        </section>

        <IndustryServices />
      </main>
      <Footer />
    </div>
  )
}
