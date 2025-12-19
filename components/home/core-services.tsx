"use client";

import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, Users, Target, Lightbulb, X, Info } from "lucide-react";

const CoreServices = () => {
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const coreServices = [
    {
      title: "Market Size & Growth Projections",
      description:
        "Understand the current landscape and future potential of your industry with reliable data and clear forecasts.",
      detailedInfo:
        "Our market sizing methodology combines top-down and bottom-up approaches, validated through multiple data sources. We provide 5-year forecasts with quarterly updates, scenario planning, and sensitivity analysis to help you make confident investment decisions.",
      icon: TrendingUp,
      image:
        "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
    {
      title: "Consumer Behavior Analysis",
      description:
        "Get detailed insights into evolving customer preferences, motivations, and purchase behavior.",
      detailedInfo:
        "We employ advanced behavioral economics principles, neuromarketing techniques, and psychological profiling to understand the 'why' behind consumer choices. Our analysis includes purchase journey mapping, decision-making triggers, and emotional drivers.",
      icon: Users,
      image:
        "https://images.pexels.com/photos/7567537/pexels-photo-7567537.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
    {
      title: "Competitive Landscape Overview",
      description:
        "Analyze key competitors, their strategies, market share, and positioning to identify gaps and opportunities.",
      detailedInfo:
        "Our competitive intelligence includes SWOT analysis, Porter's Five Forces evaluation, strategic group mapping, and white space identification. We track competitor moves in real-time and provide early warning signals for market disruptions.",
      icon: Target,
      image:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
    {
      title: "Strategic Recommendations",
      description:
        "Turn data into actionable strategies that drive growth, optimize operations, and enhance market positioning.",
      detailedInfo:
        "We don't just deliver insights - we provide implementation roadmaps. Our strategic recommendations include prioritized action plans, resource allocation guidance, risk mitigation strategies, and KPIs to measure success.",
      icon: Lightbulb,
      image:
        "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&h=350",
    },
  ];

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openPopover !== null) {
        const popoverElement = popoverRefs.current[openPopover];
        const target = event.target as Node;
        if (popoverElement && !popoverElement.contains(target)) {
          setOpenPopover(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPopover]);

  // Close popover on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openPopover !== null) {
        setOpenPopover(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openPopover]);

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-cyan-400 text-center mb-12">
          Core Services
        </h3>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={() =>
                  setOpenPopover(openPopover === index ? null : index)
                }
                className="group relative overflow-hidden rounded-xl h-[320px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/90 to-[#0a1128]/60" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-[#0f1c3f]" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Popover */}
                  {openPopover === index && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                      <div className="bg-white text-gray-900 max-w-xl w-full rounded-2xl shadow-2xl animate-scaleIn">
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b">
                          <div className="pr-4">
                            <h3 className="text-2xl font-bold">
                              {service.title}
                            </h3>
                          </div>

                          <button
                            onClick={() => setOpenPopover(null)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                            aria-label="Close"
                          >
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <p className="text-gray-700 leading-relaxed">
                            {service.detailedInfo}
                          </p>

                          {/* Footer */}
                          <div className="mt-6 text-right">
                            <button
                              onClick={() => setOpenPopover(null)}
                              className="px-5 py-2 bg-[#0099ff] text-white rounded-lg font-semibold hover:opacity-90 transition"
                            >
                              Got it
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CoreServices;
