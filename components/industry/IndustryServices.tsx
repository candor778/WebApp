"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import InfoPopup from "@/components/home/InfoPopup"


const industries = [
  {
    id: "b2b",
    name: "B2B",
    badgeColor: "bg-[#22d3ee]",
    services: [
      {
        title: "Key Stakeholder & Expert Interviews",
        popupTitle: "Key Stakeholder & Expert Interviews",
        popupSubtitle: "Insights from decision-makers",
        popupDescription:
          "We conduct in-depth interviews with C-suite executives, industry experts, and key decision-makers. Our experienced moderators use discussion guides tailored to your objectives and can accommodate various formats including video calls, phone interviews, or in-person meetings.",
      },
      {
        title: "Product/Service Feasibility & Needs Assessment",
        popupTitle: "Feasibility & Needs Assessment",
        popupSubtitle: "Validating market opportunities",
        popupDescription:
          "Before you invest in development, we help validate product-market fit through needs assessment studies, concept testing, and feasibility analysis. We identify unmet needs, willingness to pay, and potential barriers to adoption.",
      },
      {
        title: "Vendor Evaluation & Competitive Benchmarking",
        popupTitle: "Vendor Evaluation & Benchmarking",
        popupSubtitle: "Know where you stand",
        popupDescription:
          "We conduct comprehensive vendor perception studies, competitive benchmarking, and win/loss analysis. Understand how your offering compares to alternatives and identify opportunities for differentiation and improvement.",
      },
      {
        title: "Sales Channel Optimization & Partner Strategy",
        popupTitle: "Channel & Partner Strategy",
        popupSubtitle: "Maximizing go-to-market effectiveness",
        popupDescription:
          "Evaluate channel performance, identify optimal partner profiles, and develop strategies for channel expansion. We help you understand partner needs, motivations, and how to create mutually beneficial relationships.",
      },
      {
        title: "Technology Adoption & Trend Forecasting",
        popupTitle: "Technology Adoption Research",
        popupSubtitle: "Stay ahead of digital transformation",
        popupDescription:
          "Track technology adoption curves, identify early adopters, and understand barriers to adoption. We help you anticipate market shifts and position your technology offerings for maximum impact.",
      },
    ],
  },
  {
    id: "b2c",
    name: "B2C",
    badgeColor: "bg-gradient-to-r from-pink-500 to-purple-500",
    services: [
      {
        title: "Consumer Segmentation & Persona Development",
        popupTitle: "Consumer Segmentation",
        popupSubtitle: "Know your customers deeply",
        popupDescription:
          "We create data-driven consumer segments based on behaviors, attitudes, needs, and values. Each segment includes detailed personas with demographics, psychographics, media habits, and marketing implications.",
      },
      {
        title: "Brand Perception & Health Tracking",
        popupTitle: "Brand Health Tracking",
        popupSubtitle: "Monitor and protect your brand",
        popupDescription:
          "Continuous or periodic brand tracking studies measure awareness, consideration, preference, and loyalty over time. We benchmark against competitors and identify drivers of brand equity.",
      },
      {
        title: "Customer Experience (CX) & Journey Mapping",
        popupTitle: "Customer Experience Research",
        popupSubtitle: "Optimize every touchpoint",
        popupDescription:
          "Map the complete customer journey from awareness to advocacy. We identify pain points, moments of truth, and opportunities to exceed expectations. Our CX research combines surveys, interviews, and behavioral data.",
      },
      {
        title: "Multimedia & Concept Testing",
        popupTitle: "Concept & Creative Testing",
        popupSubtitle: "Validate before you launch",
        popupDescription:
          "Test advertising concepts, packaging designs, product ideas, and marketing messages before investing in full production. We provide diagnostic feedback and optimization recommendations.",
      },
      {
        title: "Product Concept & Packaging Testing",
        popupTitle: "Product & Packaging Research",
        popupSubtitle: "Design for success",
        popupDescription:
          "Evaluate product concepts, features, pricing, and packaging options with your target consumers. We use conjoint analysis, shelf testing, and home use tests to optimize your product offering.",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    badgeColor: "bg-gradient-to-r from-green-500 to-teal-500",
    services: [
      {
        title: "Physician & KOL Interviews",
        popupTitle: "Physician & KOL Research",
        popupSubtitle: "Expert medical insights",
        popupDescription:
          "We have extensive experience recruiting and interviewing physicians, specialists, and key opinion leaders across therapeutic areas. Our healthcare-trained moderators understand medical terminology and can probe deeply on clinical topics.",
      },
      {
        title: "Patient Journey & Needs Assessment",
        popupTitle: "Patient Journey Research",
        popupSubtitle: "Understanding the patient experience",
        popupDescription:
          "Map the complete patient journey from symptom onset through treatment and beyond. We identify unmet needs, information gaps, and opportunities to improve patient outcomes and satisfaction.",
      },
      {
        title: "Regulatory Compliance & Data Security",
        popupTitle: "Healthcare Compliance",
        popupSubtitle: "Research you can trust",
        popupDescription:
          "All healthcare research follows strict ethical guidelines, IRB protocols, and data security standards including HIPAA compliance. We maintain rigorous informed consent procedures and data anonymization practices.",
      },
      {
        title: "Clinical Trial Recruitment Support",
        popupTitle: "Clinical Trial Support",
        popupSubtitle: "Accelerating patient recruitment",
        popupDescription:
          "We help pharma and biotech companies understand patient awareness, willingness to participate, and barriers to clinical trial enrollment. Our insights help optimize recruitment strategies and improve enrollment rates.",
      },
      {
        title: "Pharma/Device Concept Testing",
        popupTitle: "Medical Product Testing",
        popupSubtitle: "Validate with HCPs and patients",
        popupDescription:
          "Test pharmaceutical concepts, medical devices, and therapeutic approaches with both healthcare providers and patients. We provide insights on perceived efficacy, safety concerns, adoption barriers, and positioning strategies.",
      },
    ],
  },
]

const IndustryServices = () => {
  const [activeItems, setActiveItems] = useState<{ [key: string]: number }>({
    b2b: 0,
    b2c: 0,
    healthcare: 0,
  })
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

  const handleItemClick = (industryId: string, index: number, service: (typeof industries)[0]["services"][0]) => {
    setActiveItems((prev) => ({ ...prev, [industryId]: index }))
    openPopup(service.popupTitle, service.popupSubtitle, service.popupDescription)
  }

  const openPopup = (title: string, subtitle: string, description: string) => {
    setPopup({ isOpen: true, title, subtitle, description })
  }

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false })
  }

  return (
    <section className="py-24 bg-[#0f1724]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#22d3ee] mb-4">Industry-Specific Services</h2>
        </div>

        {/* Industry Cards */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {industries.map((industry) => (
            <div key={industry.id} className="rounded-2xl border border-[#2a3f5f] bg-[#1a2942] p-8">
              {/* Industry Badge */}
              <div
                className={`inline-block px-6 py-2 rounded-lg ${industry.badgeColor} text-white font-bold text-lg mb-6`}
              >
                {industry.name}
              </div>

              {/* Services List */}
              <div className="space-y-2">
                {industry.services.map((service, index) => {
                  const isActive = activeItems[industry.id] === index

                  return (
                    <button
                      key={service.title}
                      onClick={() => handleItemClick(industry.id, index, service)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 text-left ${
                        isActive ? "bg-[#1e293b]/80 border border-[#2a3f5f]" : "hover:bg-[#1e293b]/30"
                      }`}
                    >
                      {/* Number or Chevron */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-[#22d3ee] text-[#0a1628]" : "bg-[#2a3f5f] text-[#8a9bb5]"
                        }`}
                      >
                        {isActive ? (
                          <ChevronRight className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>

                      {/* Service Title */}
                      <span
                        className={`font-medium transition-colors ${isActive ? "text-[#e5e9f0]" : "text-[#8a9bb5]"}`}
                      >
                        {service.title}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Hint Text */}
              <p className="text-[#22d3ee] text-sm text-center mt-6">Click the next item to reveal more services</p>
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

export default IndustryServices
