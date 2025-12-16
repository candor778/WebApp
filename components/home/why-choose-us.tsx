import React, { useEffect, useState } from "react";
import { Eye, ShieldCheck, Handshake, UsersIcon } from "lucide-react";

const WhyChooseUs = () => {
      const [isVisible, setIsVisible] = useState(false)
    
      useEffect(() => {
        setIsVisible(true)
      }, [])
  return (
    <div className="p-20 ">
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-12 text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Why Choose Candor Survey?
          </h2>

          {/* Intro Text */}
          <p className="text-white/70 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            At Candor Survey, we believe that the most valuable business asset
            is the truth. In a world full of noise and conflicting data, we
            stand for clarity. Our goal is to do more than just hand you a
            spreadsheet of numbers; we uncover the human stories that drive
            those numbers.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
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
                  "We don’t just provide data — we partner with you for long-term success.",
              },
              {
                icon: UsersIcon,
                title: "Human-Centered",
                description:
                  "We uncover the human stories behind the numbers for deeper understanding.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:bg-white/15 hover:scale-105`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <item.icon className="w-12 h-12 text-[#0099ff] mb-4 group-hover:scale-110 transition-transform" />

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-white/70 leading-relaxed">
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
