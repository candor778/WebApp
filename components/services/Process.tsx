"use client"

import { useState } from "react"
import { ArrowRight, Users, Search, BarChart3 } from "lucide-react"
import InfoPopup from "@/components/home/InfoPopup"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Listen & Align",
    subtitle: "We start by understanding you",
    description:
      "We don't just take orders; we are partnering with you. We sit down to understand your business goals, your specific challenges, and exactly what you need to learn. We ask tough questions to ensure our research strategy is perfectly aligned with your objectives.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=350",
    icon: Users,
    popupTitle: "Listen & Align",
    popupSubtitle: "Building the foundation for success",
    popupDescription:
      "Our discovery process involves in-depth stakeholder interviews, competitive landscape analysis, and objective mapping. We identify key success metrics, potential research pitfalls, and ensure every team member understands the project's strategic importance.",
  },
  {
    number: "02",
    title: "Research & Gather",
    subtitle: "We go where the data is",
    description:
      "Using our global network, we reach out to the right people—whether that's hard-to-find C-suite executives, medical specialists, or everyday consumers.",
    image:
      "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&h=350",
    icon: Search,
    popupTitle: "Research & Gather",
    popupSubtitle: "Reaching the right respondents globally",
    popupDescription:
      "Our proprietary respondent network spans 50+ countries with access to over 100 million verified participants.",
  },
  {
    number: "03",
    title: "Analyze & Deliver",
    subtitle: "We turn data into direction",
    description:
      "Data without context is just noise. We rigorously scrub, validate, and analyze the data to find the patterns that matter.",
    image:
      "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg?auto=compress&cs=tinysrgb&h=350",
    icon: BarChart3,
    popupTitle: "Analyze & Deliver",
    popupSubtitle: "Transforming data into strategic action",
    popupDescription:
      "Our analytics team combines statistical methods with AI to uncover insights that manual analysis would miss.",
  },
]

const Process = () => {
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
  })

  const openPopup = (title: string, subtitle: string, description: string) => {
    setPopup({ isOpen: true, title, subtitle, description })
  }

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-2">
            Our Research Process
          </h2>
          <div className="w-16 h-1 bg-[#22d3ee] mx-auto mb-4" />
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            A systematic approach to delivering exceptional insights
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isReversed = index % 2 === 1

            return (
              <div
                key={step.number}
                className="
                  group
                  grid lg:grid-cols-2 gap-12 items-center
                  transition-all duration-300
                "
              >
                {/* Image */}
                <div className={isReversed ? "lg:order-2" : ""}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={450}
                    className="
                      rounded-xl shadow-lg w-full object-cover aspect-[4/3]
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Content */}
                <div
                  className={`
                    ${isReversed ? "lg:order-1" : ""}
                    
                  `}
                >
                  {/* Icon + Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 group-hover:scale-110  transition-all duration-300 bg-[#22d3ee] rounded-lg flex items-center justify-center">
                      <IconComponent
                        className="
                          w-6 h-6 text-white
                          transition-transform duration-300
                          
                        "
                      />
                    </div>
                    <span className="text-4xl group-hover:scale-110 transition-all duration-300 font-light text-[#22d3ee]">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#22d3ee] font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-[#6b7280] mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() =>
                      openPopup(
                        step.popupTitle,
                        step.popupSubtitle,
                        step.popupDescription
                      )
                    }
                    className="
                      inline-flex items-center gap-2
                      text-[#22d3ee] font-medium
                      transition-colors
                      group-hover:text-[#06b6d4]
                    "
                  >
                    Click to learn more
                    <ArrowRight
                      className="
                        w-4 h-4
                        transition-transform duration-300
                        group-hover:translate-x-2
                      "
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Popup */}
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

export default Process
