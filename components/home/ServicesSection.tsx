"use client";

import {
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Code,
  Globe,
  Eye,
  ShieldCheck,
} from "lucide-react";
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

export default function ServicesSection() {
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

  const processItems = [
  {
    title: "Analytics",
    short:
      "We use strong data analysis to predict market changes and maximize ROI.",
    long:
      "Our analytics suite includes predictive modeling, machine learning algorithms, statistical forecasting, and real-time dashboards. We transform raw data into clear, visual insights that enable faster decisions and measurable business impact.",
    icon: BarChart3,
  },
  {
    title: "Programming",
    short:
      "We build complex surveys and trackers that work seamlessly across platforms.",
    long:
      "Our survey programming leverages adaptive questioning, logic branching, and mobile-first design. We ensure cross-device compatibility, accessibility compliance, and 99.9% uptime for a smooth respondent experience.",
    icon: Code,
  },
  {
    title: "Diverse Insights",
    short:
      "We gather real opinions from a broad and verified respondent base.",
    long:
      "Our panel includes over 10 million verified respondents across 50+ countries, covering diverse demographics, professions, and psychographic profiles. Rigorous sampling and quality checks ensure reliable and representative insights.",
    icon: Users,
  },
  {
    title: "Global Reach",
    short:
      "We deliver insights from diverse international markets worldwide.",
    long:
      "With research teams operating in 30+ countries and multilingual capabilities across 40+ languages, we provide global perspectives while respecting local culture, behavior, and market dynamics.",
    icon: Globe,
  },
  {
    title: "Mystery Shopping",
    short:
      "We secretly evaluate real customer experiences to assess service quality.",
    long:
      "Our mystery shopping programs use trained evaluators, standardized scoring, photo and video documentation, and detailed reporting. We conduct both announced and unannounced audits for unbiased performance insights.",
    icon: Eye,
  },
  {
    title: "Survey Audit",
    short:
      "We verify data accuracy to ensure unbiased and high-quality results.",
    long:
      "Our audit framework includes response validation, fraud detection, pattern analysis, and quality scoring. Every dataset is thoroughly reviewed to meet strict reliability and ethical research standards.",
    icon: ShieldCheck,
  },
];

  const industryServices = {
    b2b: [
      "Key Stakeholder & Expert Interviews",
      "Product/Service Feasibility & Needs Assessment",
      "Vendor Evaluation & Competitive Benchmarking",
      "Sales Channel Optimization & Partner Strategy",
      "Technology Adoption & Trend Forecasting",
    ],
    b2c: [
      "Consumer Segmentation & Persona Development",
      "Brand Perception & Health Tracking",
      "Customer Experience (CX) & Journey Mapping",
      "Multimedia & Concept Testing",
      "Product Concept & Packaging Testing",
    ],
    healthcare: [
      "Physician & KOL Interviews",
      "Patient Journey & Needs Assessment",
      "Regulatory Compliance & Data Security",
      "Clinical Trial Recruitment Support",
      "Pharma/Device Concept Testing",
    ],
  };

  return (
    <section id="services"  className="bg-[#0f1c3f] scroll-mt-20 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
            <div className="w-20 h-1 bg-cyan-400 mx-auto mt-3"></div>
          </h2>
          <p className="text-gray-300 text-lg">
            Comprehensive market research solutions tailored to your needs
          </p>
        </div>

        {/* Core Services Title */}
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
                className="group relative overflow-hidden rounded-xl h-[320px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                ></div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/90 to-[#0a1128]/60"></div>

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
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-cyan-400 mb-2">
              Our Process
            </h3>
          </div>

          {/* Process Grid - 3x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-6 transition-all duration-300 hover:bg-[#1e3159] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 hover:scale-105"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0f1c3f]" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.short}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry-Specific Services Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-cyan-400 mb-2">
              Industry-Specific Services
            </h3>
          </div>

          {/* Industry Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* B2B */}
            <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">
                B2B
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {industryServices.b2b.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* B2C */}
            <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">
                B2C
              </h4>
              <div className="space-y-4">
                {industryServices.b2c.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Healthcare */}
            <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">
                Healthcare
              </h4>
              <div className="space-y-4">
                {industryServices.healthcare.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Deep Dive Analysis Box */}
        <div className="mt-16 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-10 border border-cyan-500/20">
          {/* Header */}
          <h3 className="text-2xl font-bold text-white mb-10 text-center">
            Deep Dive Analysis
          </h3>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                number: "01",
                title: "Understand Buying Motivations",
                description:
                  "Identify the emotional, psychological, and rational factors that influence purchasing decisions across different customer segments.",
              },
              {
                number: "02",
                title: "Predict Future Consumer Trends",
                description:
                  "Gain foresight into shifting behaviors and preferences to stay ahead of market changes and customer expectations.",
              },
              {
                number: "03",
                title: "Improve Targeting and Messaging",
                description:
                  "Craft more effective marketing campaigns by aligning your message with what truly matters to your audience.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-5 px-4"
              >
                {/* Number */}
                <div
                  className="w-14 h-14 rounded-full bg-cyan-400/90
                     flex items-center justify-center
                     text-[#0f1c3f] font-bold text-lg shadow-md"
                >
                  {item.number}
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-white max-w-xs">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
