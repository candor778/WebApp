import React, { useEffect, useState } from "react";
import { Eye, ShieldCheck, Handshake, Users } from "lucide-react";

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 md:p-20">
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-center px-2">
            Why Choose Candor Survey?
          </h2>

          {/* Intro Text */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 leading-relaxed px-2">
            At Candor Survey, we believe that the most valuable business asset
            is the truth. In a world full of noise and conflicting data, we
            stand for clarity. Our goal is to do more than just hand you a
            spreadsheet of numbers; we uncover the human stories that drive
            those numbers.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Eye,
                title: "Unbiased Insights",
                description:
                  "We deliver crystal-clear, unfiltered insights free from bias or agenda.",
              },
              {
                icon: ShieldCheck,
                title: "Ethical Standards",
                description:
                  "Highest standards of integrity and transparency in all our research.",
              },
              {
                icon: Handshake,
                title: "Strategic Partnership",
                description:
                  "We don't just provide data — we partner with you for long-term success.",
              },
              {
                icon: Users,
                title: "Human-Centered",
                description:
                  "We uncover the human stories behind the numbers for deeper understanding.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:bg-white/15 hover:scale-105 active:scale-95`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#0099ff] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;