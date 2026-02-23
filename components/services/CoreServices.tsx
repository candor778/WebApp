"use client"

import { useState } from "react"
import {
  TrendingUp,
  Users,
  BarChart3,
  Lightbulb,
  Code,
  Globe,
  ShoppingCart,
  ClipboardCheck,
  BarChart2,
  Brain,
} from "lucide-react"
import InfoPopup from "@/components/home/InfoPopup"
import Image from "next/image"

const coreServices = [
  {
    icon: TrendingUp,
    title: "Market Size & Growth Projections",
    description:
      "Understand the current landscape and future potential of your industry with reliable data and clear forecasts.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Market Size & Growth Projections",
    popupSubtitle: "Understand the current landscape and future potential of your industry with reliable data and clear forecasts.",
    popupDescription:
      "Our market sizing methodology combines top-down and bottom-up approaches, validated through multiple data sources. We provide 5-year forecasts with quarterly updates, scenario planning, and sensitivity analysis to help you make confident investment decisions.",
  },
  {
    icon: Users,
    title: "Consumer Behavior Analysis",
    description: "Get detailed insights into evolving customer preferences, motivations, and purchase behavior.",
    image: "https://images.pexels.com/photos/7567537/pexels-photo-7567537.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Consumer Behavior Analysis",
    popupSubtitle: "Get detailed insights into evolving customer preferences, motivations, and purchase behavior.",
    popupDescription:
      "We employ advanced behavioral economics principles, neuromarketing techniques, and psychological profiling to understand the 'why' behind consumer choices. Our analysis includes purchase journey mapping, decision-making triggers, and emotional drivers.",
  },
  {
    icon: BarChart3,
    title: "Competitive Landscape Overview",
    description:
      "Analyze key competitors, their strategies, market share, and positioning to identify gaps and opportunities.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Competitive Landscape Overview",
    popupSubtitle: "Analyze key competitors, their strategies, market share, and positioning to identify gaps and opportunities.",
    popupDescription:
      "Our competitive intelligence includes SWOT analysis, Porter's Five Forces evaluation, strategic group mapping, and white space identification. We track competitor moves in real-time and provide early warning signals for market disruptions.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Recommendations",
    description:
      "Turn data into actionable strategies that drive growth, optimize operations, and enhance market positioning.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Strategic Recommendations",
    popupSubtitle: "Turn data into actionable strategies that drive growth, optimize operations, and enhance market positioning.",
    popupDescription:
      "We don't just deliver insights - we provide implementation roadmaps. Our strategic recommendations include prioritized action plans, resource allocation guidance, risk mitigation strategies, and KPIs to measure success.",
  },
]

const processItems = [
  {
    icon: BarChart2,
    title: "Analytics",
    description:
      "We use strong data analysis to predict market changes and help you get the best return on your investment.",
    popupTitle: "Analytics",
    popupSubtitle: "We use strong data analysis to predict market changes and help you get the best return on your investment.",
    popupDescription:
      "Our analytics suite includes predictive modeling, machine learning algorithms, statistical forecasting, and real-time dashboards. We transform raw data into visual insights that drive immediate action.",
  },
  {
    icon: Code,
    title: "Programming",
    description:
      "We carefully build complex surveys and trackers, so they are easy for people to use on every platform.",
    popupTitle: "Programming",
    popupSubtitle: "We carefully build complex surveys and trackers, so they are easy for people to use on every platform.",
    popupDescription:
      "Our survey programming uses adaptive questioning, logic branching, and mobile-first design. We ensure 99.9% uptime, cross-device compatibility, and accessibility compliance for all respondents.",
  },
  {
    icon: Brain,
    title: "Diverse Insights",
    description: "We have a diverse variety of respondents who provide us with real and accurate opinions.",
    popupTitle: "Diverse Insights",
    popupSubtitle: "We have a diverse variety of respondents who provide us with real and accurate opinions.",
    popupDescription:
      "Our panel includes over 10 million verified respondents across 50+ countries, representing diverse demographics, professions, and psychographic profiles. We ensure representative sampling and quality control.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We maintain a dedicated global footprint, drawing perspectives from diverse international markets.",
    popupTitle: "Global Reach",
    popupSubtitle: "We maintain a dedicated global footprint, drawing perspectives from diverse international markets.",
    popupDescription:
      "With research teams in 30+ countries and multilingual capabilities in 40+ languages, we provide truly global insights while respecting local cultural nuances and market-specific dynamics.",
  },
  {
    icon: ShoppingCart,
    title: "Mystery Shopping",
    description: "We check real customer experiences secretly to provide honest information on service quality.",
    popupTitle: "Mystery Shopping",
    popupSubtitle: "We check real customer experiences secretly to provide honest information on service quality.",
    popupDescription:
      "Our mystery shopping program includes trained evaluators, standardized assessment criteria, photo/video documentation, and detailed reporting. We conduct both announced and unannounced evaluations.",
  },
  {
    icon: ClipboardCheck,
    title: "Survey Audit",
    description:
      "We check surveys to make sure the data is accurate and high-quality, giving reliable and unbiased results.",
    popupTitle: "Survey Audit",
    popupSubtitle: "We check surveys to make sure the data is accurate and high-quality, giving reliable and unbiased results.",
    popupDescription:
      "Our audit process includes data validation, response pattern analysis, fraud detection, and quality scoring. We ensure every data point meets our rigorous standards before delivery.",
  },
]

const CoreServices = () => {
  const [popup, setPopup] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
    description: string
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
  })

  const openPopup = (title: string, subtitle: string, description: string) => {
    setPopup({ isOpen: true, title, subtitle, description })
  }

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false })
  }

  return (
    <section id="core-services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="  text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-2">
            Result That Matter
          </h2>
          <div className="w-16 h-1 bg-[#22d3ee] mx-auto mb-4" />
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Comprehensive market research solutions tailored to your needs
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreServices.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => openPopup(service.popupTitle, service.popupSubtitle, service.popupDescription)}
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={300}
                  height={160}
                />
              </div>
              <div className="p-5">
                <div className="w-10 h-10 rounded-lg bg-[#22d3ee] flex items-center justify-center mb-3">
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-2">{service.title}</h4>
                <p className="text-sm text-[#6b7280]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="  text-2xl md:text-3xl text-[#1a1a2e] mb-2">
              Our Capabilities
            </h3>
            <div className="w-12 h-1 bg-[#22d3ee] mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processItems.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-[#1e3a5f] via-slate-800 to-[#1e3a5f] hover:bg-[#0d1d35]"
                    : "bg-gradient-to-br from-[#22d3ee] to-[#14b8a6] hover:from-[#06b6d4] hover:to-[#0891b2]"
                }`}
                onClick={() => openPopup(item.popupTitle, item.popupSubtitle, item.popupDescription)}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    index % 2 === 0 ? "bg-[#22d3ee]/20" : "bg-white/20"
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${index % 2 === 0 ? "text-[#22d3ee]" : "text-white"}`} />
                </div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className={`text-sm ${index % 2 === 0 ? "text-[#8a9bb5]" : "text-white/80"}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InfoPopup
        isOpen={popup.isOpen}
        onClose={closePopup}
        title={popup.title}
        subtitle={popup.subtitle}
        description={popup.description}
      />
    </section>
  )
}

export default CoreServices
