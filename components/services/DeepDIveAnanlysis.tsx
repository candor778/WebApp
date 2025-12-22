"use client"

import { useState } from "react"
import InfoPopup from "@/components/home/InfoPopup"

const deepDiveItems = [
  {
    number: "1",
    title: "Understand Buying Motivations",
    description:
      "Identify the emotional, psychological, and rational factors that influence purchasing decisions across different customer segments.",
    popupTitle: "Buying Motivation Analysis",
    popupSubtitle: "The psychology behind purchase decisions",
    popupDescription:
      "We use qualitative and quantitative methods to uncover the hierarchy of needs, emotional triggers, and rational justifications that drive purchase decisions. Our analysis identifies key motivators by segment and provides actionable targeting and messaging recommendations.",
  },
  {
    number: "2",
    title: "Predict Future Consumer Trends",
    description:
      "Gain foresight into shifting behaviors and preferences to stay ahead of market changes and customer expectations.",
    popupTitle: "Trend Forecasting",
    popupSubtitle: "See around corners",
    popupDescription:
      "Our trend research combines social listening, expert interviews, early adopter studies, and historical pattern analysis. We identify emerging trends, assess their potential impact, and provide strategic recommendations for positioning your brand for the future.",
  },
  {
    number: "3",
    title: "Improve Targeting and Messaging",
    description:
      "Craft more effective marketing campaigns by aligning your message with what truly matters to your audience.",
    popupTitle: "Targeting & Messaging Optimization",
    popupSubtitle: "Right message, right audience",
    popupDescription:
      "We help you identify high-value target segments and develop messaging that resonates. Our research includes message testing, media consumption analysis, and channel optimization recommendations to maximize marketing ROI.",
  },
]

const DeepDiveAnalysis = () => {
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
    <section id="deep-dive" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="  text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-2">
            Deep Dive Analysis
          </h2>
          <div className="w-16 h-1 bg-[#22d3ee] mx-auto mb-4" />
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Go beyond surface-level data to uncover actionable insights
          </p>
        </div>

        {/* Deep Dive Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deepDiveItems.map((item, index) => (
            <div
              key={item.number}
              className={`rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                index % 2 === 0
                  ? "bg-[#0a1628] hover:bg-[#0d1d35]"
                  : "bg-gradient-to-br from-[#22d3ee] to-[#14b8a6] hover:from-[#06b6d4] hover:to-[#0891b2]"
              }`}
              onClick={() => openPopup(item.popupTitle, item.popupSubtitle, item.popupDescription)}
            >
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl mb-6 ${
                  index % 2 === 0 ? "bg-[#22d3ee] text-white" : "bg-white/20 text-white"
                }`}
              >
                {item.number}
              </span>
              <h4 className="font-semibold text-white text-xl mb-4">{item.title}</h4>
              <p className={`text-sm leading-relaxed ${index % 2 === 0 ? "text-[#8a9bb5]" : "text-white/80"}`}>
                {item.description}
              </p>
            </div>
          ))}
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

export default DeepDiveAnalysis
