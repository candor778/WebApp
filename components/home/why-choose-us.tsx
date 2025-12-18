import React, { useEffect, useState } from "react";
import { Eye, ShieldCheck, Handshake, Users, X } from "lucide-react";

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePopover, setActivePopover] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const items = [
    {
      icon: Eye,
      title: "Unbiased Insights",
      short:
        "We deliver crystal-clear, unfiltered insights free from bias or agenda.",
      long:
        "Our research methodology is built on scientific rigor and ethical standards. We employ multiple validation techniques and cross-reference data sources to ensure complete objectivity. Every insight is backed by verifiable data and transparent analysis.",
    },
    {
      icon: ShieldCheck,
      title: "Ethical Standards",
      short:
        "Highest standards of integrity and transparency in all our research.",
      long:
        "We adhere to international research ethics guidelines including ESOMAR and MRS codes of conduct. All participant data is protected with enterprise-grade security, and we maintain complete confidentiality throughout the research process.",
    },
    {
      icon: Handshake,
      title: "Strategic Partnership",
      short:
        "We don't just provide data — we partner with you for long-term success.",
      long:
        "Beyond delivering reports, we work alongside your team to implement insights. We provide ongoing support, strategic consultation, and help translate research findings into actionable business strategies that drive measurable results.",
    },
    {
      icon: Users,
      title: "Human-Centered",
      short:
        "We uncover the human stories behind the numbers for deeper understanding.",
      long:
        "Through qualitative research, ethnographic studies, and behavioral analysis, we reveal the motivations, emotions, and contexts that drive consumer decisions and market trends.",
    },
  ];

  return (
    <>
      <div className="px-4 py-12 sm:px-6 sm:py-16 md:p-20">
        <section className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Why Choose Candor Survey?
            </h2>

            <p className="text-white/70 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
              We stand for clarity, ethics, and human-first insights that drive
              real business decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePopover(idx)}
                  className={`group bg-white/10 cursor-pointer backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-500
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                  hover:bg-white/15 hover:scale-[1.03]`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <item.icon className="w-12 h-12 text-[#0099ff] mb-4 group-hover:scale-110 transition-transform" />

                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                  <p className="text-white/70 mb-4">{item.short}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Popover */}
      {activePopover !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-gray-900 max-w-xl w-full rounded-2xl shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold">
                  {items[activePopover].title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {items[activePopover].short}
                </p>
              </div>
              <button
                onClick={() => setActivePopover(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {items[activePopover].long}
              </p>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setActivePopover(null)}
                  className="px-5 py-2 bg-[#0099ff] text-white rounded-lg font-semibold hover:opacity-90"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default WhyChooseUs;
