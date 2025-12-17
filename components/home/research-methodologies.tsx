"use client";

import { useState } from "react";

export default function ResearchMethodologiesSection() {
  const [activeTab, setActiveTab] = useState("quantitative");

  const tabs = [
    { id: "quantitative", label: "Quantitative Research" },
    { id: "qualitative", label: "Qualitative Research" },
    { id: "support", label: "Research Support" },
  ];

  return (
    <section id="industries" className="scroll-mt-20 py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Research Methodologies
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyan-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Comprehensive research solutions powered by proven methodologies
          </p>
        </div>

        {/* Container */}
        <div className="bg-[#1e3a5f] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Tabs */}
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              const tabStyles = {
                quantitative: isActive
                  ? "bg-cyan-500 text-white ring-2 ring-cyan-300/40"
                  : "bg-[#2c4a6f] text-cyan-300 hover:bg-cyan-500/10 active:bg-cyan-500/20",

                qualitative: isActive
                  ? "bg-purple-500 text-white ring-2 ring-purple-300/40"
                  : "bg-[#2c4a6f] text-purple-300 hover:bg-purple-500/10 active:bg-purple-500/20",

                support: isActive
                  ? "bg-emerald-500 text-white ring-2 ring-emerald-300/40"
                  : "bg-[#2c4a6f] text-emerald-300 hover:bg-emerald-500/10 active:bg-emerald-500/20",
              };

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full xs:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full 
                    text-xs sm:text-sm font-semibold
                    transition-all duration-300
                    ${tabStyles[tab.id]}
                    ${isActive ? "scale-105 shadow-lg" : "hover:scale-[1.03] active:scale-95"}
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-cyan-500/20">
            {/* Quantitative */}
            {activeTab === "quantitative" && (
              <div className="animate-fadeIn">
                <div className="bg-[#0ea5e9] inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    Quantitative Research
                  </h3>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h4 className="text-cyan-400 font-semibold text-sm sm:text-base mb-2 sm:mb-3">
                    Robust data collection
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    We specialize in quantitative data collection via CLTs for
                    sensory evaluation, alongside efficient interview methods
                    like CAPI and CATI.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Central Location Tests (CLT)",
                      desc: "Standardized, controlled venues ensuring high data quality for sensory testing, concept evaluation, and packaging feedback.",
                    },
                    {
                      title: "Computer-Assisted Personal Interviewing (CAPI)",
                      desc: "Digital face-to-face data collection with offline functionality, ideal for complex surveys and visual aids.",
                    },
                    {
                      title: "Computer-Assisted Telephone Interviewing (CATI)",
                      desc: "Centralized quality assurance with real-time scripting and built-in quality control for efficient large-scale sampling.",
                    },
                    {
                      title: "Digital Data Collection",
                      desc: "Online surveys with advanced programming, mobile optimization, and real-time analytics for rapid insights.",
                    },
                    {
                      title: "Real-Time Analysis",
                      desc: "Live dashboards and automated reporting that transform data into insights as responses come in.",
                    },
                  ].map((item, i) => (
                    <MethodCard
                      key={i}
                      index={i}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Qualitative */}
            {activeTab === "qualitative" && (
              <div className="animate-fadeIn">
                <div className="bg-[#0ea5e9] inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    Qualitative Research
                  </h3>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h4 className="text-cyan-400 font-semibold text-sm sm:text-base mb-2 sm:mb-3">
                    Deep insights through conversation
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Our qualitative methods uncover the "why" behind behavior
                    through direct human interaction and observation.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Focus Group Discussions (FGD)",
                      desc: "Leveraging group synergy for collective ideation, opinion contagion, and collaborative memory to refine concepts.",
                    },
                    {
                      title: "In-Depth Interviews (IDI)",
                      desc: "One-on-one conversations that dive deep into individual experiences, motivations, and decision-making processes.",
                    },
                    {
                      title: "Projective Techniques",
                      desc: "Accessing subconscious motivations through metaphors, storytelling, and visual associations.",
                    },
                    {
                      title: "Ethnographic Research",
                      desc: "Observing consumers in their natural environments to understand context, behavior, and unspoken needs.",
                    },
                    {
                      title: "Online Communities",
                      desc: "Longitudinal digital communities enabling continuous engagement and deeper qualitative insights.",
                    },
                  ].map((item, i) => (
                    <MethodCard
                      key={i}
                      index={i}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Support */}
            {activeTab === "support" && (
              <div className="animate-fadeIn">
                <div className="bg-[#0ea5e9] inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    Research Support
                  </h3>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h4 className="text-cyan-400 font-semibold text-sm sm:text-base mb-2 sm:mb-3">
                    End-to-end research support
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    We ensure your research runs smoothly from design to final
                    delivery.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      title: "Professional Panel Sourcing",
                      desc: "Recruiting hard-to-reach professionals, executives, and specialists from our verified database.",
                    },
                    {
                      title: "Data Transformation",
                      desc: "Converting raw survey data into clean, structured datasets ready for analysis and reporting.",
                    },
                    {
                      title: "Statistical Analysis",
                      desc: "Advanced analytics including regression, factor analysis, conjoint, and predictive modeling.",
                    },
                    {
                      title: "Multilingual Support",
                      desc: "Translation and cultural adaptation in 40+ languages with native-speaking project managers.",
                    },
                    {
                      title: "Transcription & Coding",
                      desc: "Accurate transcription and systematic coding to prepare qualitative data for analysis.",
                    },
                  ].map((item, i) => (
                    <MethodCard
                      key={i}
                      index={i}
                      title={item.title}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

/* Reusable Card */
function MethodCard({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#2c4a6f] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:bg-[#3a5a85] active:bg-[#455f90] transition-colors duration-300">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="bg-cyan-500 rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-cyan-400 font-semibold text-sm sm:text-base mb-1 break-words">
            {title}
          </h5>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words">{desc}</p>
        </div>
      </div>
    </div>
  );
}