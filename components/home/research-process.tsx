import React, { useState } from "react";
import { BarChart3, Users, Eye, X } from "lucide-react";

const ResearchProcess = () => {
  const [activePopover, setActivePopover] = useState(null);

  const processDetails = {
    0: {
      title: "Listen & Align",
      subtitle: "We start by understanding you",
      fullDescription: "We don't just take orders; we are partnering with you. We sit down to understand your business goals, your specific challenges, and exactly what you need to learn. We ask tough questions to ensure our research strategy is perfectly aligned with your objectives.",
      additionalInfo: "Our discovery process includes stakeholder workshops, business objective mapping, research design consultation, and timeline planning. We document success criteria and establish clear KPIs to measure research impact."
    },
    1: {
      title: "Research & Gather",
      subtitle: "We go where the data is",
      fullDescription: "Using our global network, we reach out to the right people—whether that's hard-to-find C-suite executives, medical specialists, or everyday consumers. We use a mix of surveys, interviews, and secret shopping to gather authentic, high-quality data from the source.",
      additionalInfo: "We deploy multi-method approaches including online surveys, telephone interviews, face-to-face interactions, and observational research. Our quality control includes real-time monitoring, data validation, and respondent verification."
    },
    2: {
      title: "Analyze & Deliver",
      subtitle: "We turn data into direction",
      fullDescription: "Data without context is just noise. We rigorously scrub, validate, and analyze the data to find the patterns that matter. Then, we deliver a clear, visually engaging report with actionable recommendations that you can implement immediately to drive growth.",
      additionalInfo: "Our deliverables include executive summaries, detailed findings reports, interactive dashboards, and presentation decks. We provide strategic recommendations prioritized by impact and feasibility, with clear implementation roadmaps."
    }
  };

  const steps = [
    {
      num: "01",
      icon: Users,
      title: "Listen & Align",
      subtitle: "We start by understanding you",
      desc: "We don't just take orders; we are partnering with you. We sit down to understand your business goals, your specific challenges, and exactly what you need to learn. We ask tough questions to ensure our research strategy is perfectly aligned with your objectives.",
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "#0099ff",
      order: false,
    },
    {
      num: "02",
      icon: Eye,
      title: "Research & Gather",
      subtitle: "We go where the data is",
      desc: "Using our global network, we reach out to the right people—whether that's hard-to-find C-suite executives, medical specialists, or everyday consumers.",
      img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "#06b6d4",
      order: true,
    },
    {
      num: "03",
      icon: BarChart3,
      title: "Analyze & Deliver",
      subtitle: "We turn data into direction",
      desc: "Data without context is just noise. We rigorously scrub, validate, and analyze the data to find the patterns that matter.",
      img: "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "#0066cc",
      order: false,
    },
  ];

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-[#f9fafb] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-4 sm:mb-6 px-2">
              Our Research <span className="text-[#0099ff]">Process</span>
            </h2>

            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="h-1 w-16 sm:w-20 bg-[#0099ff] rounded-full" />
            </div>

            <p className="text-base sm:text-lg text-[#4b5563] px-4">
              A systematic approach to delivering exceptional insights
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {steps.map((step, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center"
              >
                <div className={step.order ? "md:order-2" : ""}>
                  <img
                    src={step.img}
                    alt={step.title}
                    className="rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-64 sm:h-72 md:h-80 w-full object-cover"
                  />
                </div>

                <div className={step.order ? "md:order-1" : ""}>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-row gap-3 sm:gap-4 items-center mb-3 sm:mb-4">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background:
                              step.num === "03"
                                ? "linear-gradient(to bottom right, #0066cc, #0099ff)"
                                : step.color,
                          }}
                        >
                          <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div
                          className="text-4xl sm:text-5xl font-bold"
                          style={{ color: step.color }}
                        >
                          {step.num}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1628] mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base font-semibold mb-3 sm:mb-4"
                        style={{ color: step.color }}
                      >
                        {step.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed mb-3 sm:mb-4">
                        {step.desc}
                      </p>
                      <button
                        onClick={() => setActivePopover(i)}
                        className="font-semibold text-sm sm:text-base flex items-center gap-2 hover:gap-3 transition-all duration-300"
                        style={{ color: step.color }}
                      >
                        Click to learn more <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popover Modal */}
      {activePopover !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Header */}
            <div 
              className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-start sticky top-0 bg-white rounded-t-xl sm:rounded-t-2xl"
              style={{ backgroundColor: `${steps[activePopover].color}15` }}
            >
              <div className="flex-1 pr-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1628] mb-1 sm:mb-2">
                  {processDetails[activePopover].title}
                </h3>
                <p 
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: steps[activePopover].color }}
                >
                  {processDetails[activePopover].subtitle}
                </p>
              </div>
              <button
                onClick={() => setActivePopover(null)}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-[#0a1628] mb-2 sm:mb-3">
                  Overview
                </h4>
                <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  {processDetails[activePopover].fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-[#0a1628] mb-2 sm:mb-3">
                  What We Deliver
                </h4>
                <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  {processDetails[activePopover].additionalInfo}
                </p>
              </div>

              {/* Close button at bottom */}
              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  onClick={() => setActivePopover(null)}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: steps[activePopover].color }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ResearchProcess;