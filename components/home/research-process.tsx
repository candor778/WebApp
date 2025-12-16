import React from "react";
import { BarChart3, Users, Eye } from "lucide-react";

const ResearchProcess = () => {
  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[#0a1628] mb-6">
            Our Research <span className="text-glow">Process</span>
          </h2>

          <div className="flex justify-center mb-6">
            <div className="h-1 w-20 bg-[#0099ff] rounded-full" />
          </div>

          <p className="text-lg text-[#4b5563]">
            A systematic approach to delivering exceptional insights
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {[
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
          ].map((step, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                step.order ? "animate-slideInRight" : "animate-slideInLeft"
              }`}
            >
              <div className={step.order ? "md:order-2" : ""}>
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-2xl shadow-lg hover-lift h-80 w-full object-cover"
                />
              </div>

              <div className={step.order ? "md:order-1" : ""}>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-row gap-2 items-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            step.num === "03"
                              ? "linear-gradient(to bottom right, #0066cc, #0099ff)"
                              : step.color,
                        }}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div
                        className="text-5xl font-bold mb-2"
                        style={{ color: step.color }}
                      >
                        {step.num}
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-[#0a1628] mb-3">
                      {step.title}
                    </h3>
                    <p
                      className="font-semibold mb-4"
                      style={{ color: step.color }}
                    >
                      {step.subtitle}
                    </p>
                    <p className="text-[#4b5563] leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <a
                      href="#"
                      className="font-semibold flex items-center gap-2"
                      style={{ color: step.color }}
                    >
                      Click to learn more <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchProcess;
