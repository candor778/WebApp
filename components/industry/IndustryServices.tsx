"use client"
import { useState } from "react"
import { ChevronRight, Users, Target, TrendingUp, Handshake, Zap, UserCheck, Eye, Map, TestTube, Package, Stethoscope, Heart, Shield, UserPlus, Microscope } from "lucide-react"

const InfoPopup = ({ isOpen, onClose, title, subtitle, description }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-[#1a2942] rounded-2xl border border-[#2a3f5f] p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-2xl font-bold text-[#22d3ee] mb-2">{title}</h3>
        <p className="text-[#8a9bb5] text-sm mb-4">{subtitle}</p>
        <p className="text-[#e5e9f0] leading-relaxed mb-6">{description}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#22d3ee] text-[#0a1628] rounded-lg font-medium hover:bg-[#1db9d4] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const industries = [
  {
    id: "b2b",
    name: "B2B",
    badgeColor: "bg-[#22d3ee]",
    services: [
      {
        title: "Key Stakeholder & Expert Interviews",
        icon: Users,
        popupTitle: "Key Stakeholder & Expert Interviews",
        popupSubtitle: "Insights from decision-makers",
        popupDescription:
          "We conduct in-depth interviews with C-suite executives, industry experts, and key decision-makers. Our experienced moderators use discussion guides tailored to your objectives and can accommodate various formats including video calls, phone interviews, or in-person meetings.",
      },
      {
        title: "Product/Service Feasibility & Needs Assessment",
        icon: Target,
        popupTitle: "Feasibility & Needs Assessment",
        popupSubtitle: "Validating market opportunities",
        popupDescription:
          "Before you invest in development, we help validate product-market fit through needs assessment studies, concept testing, and feasibility analysis. We identify unmet needs, willingness to pay, and potential barriers to adoption.",
      },
      {
        title: "Vendor Evaluation & Competitive Benchmarking",
        icon: TrendingUp,
        popupTitle: "Vendor Evaluation & Benchmarking",
        popupSubtitle: "Know where you stand",
        popupDescription:
          "We conduct comprehensive vendor perception studies, competitive benchmarking, and win/loss analysis. Understand how your offering compares to alternatives and identify opportunities for differentiation and improvement.",
      },
      {
        title: "Sales Channel Optimization & Partner Strategy",
        icon: Handshake,
        popupTitle: "Channel & Partner Strategy",
        popupSubtitle: "Maximizing go-to-market effectiveness",
        popupDescription:
          "Evaluate channel performance, identify optimal partner profiles, and develop strategies for channel expansion. We help you understand partner needs, motivations, and how to create mutually beneficial relationships.",
      },
      {
        title: "Technology Adoption & Trend Forecasting",
        icon: Zap,
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
        icon: UserCheck,
        popupTitle: "Consumer Segmentation",
        popupSubtitle: "Know your customers deeply",
        popupDescription:
          "We create data-driven consumer segments based on behaviors, attitudes, needs, and values. Each segment includes detailed personas with demographics, psychographics, media habits, and marketing implications.",
      },
      {
        title: "Brand Perception & Health Tracking",
        icon: Eye,
        popupTitle: "Brand Health Tracking",
        popupSubtitle: "Monitor and protect your brand",
        popupDescription:
          "Continuous or periodic brand tracking studies measure awareness, consideration, preference, and loyalty over time. We benchmark against competitors and identify drivers of brand equity.",
      },
      {
        title: "Customer Experience (CX) & Journey Mapping",
        icon: Map,
        popupTitle: "Customer Experience Research",
        popupSubtitle: "Optimize every touchpoint",
        popupDescription:
          "Map the complete customer journey from awareness to advocacy. We identify pain points, moments of truth, and opportunities to exceed expectations. Our CX research combines surveys, interviews, and behavioral data.",
      },
      {
        title: "Multimedia & Concept Testing",
        icon: TestTube,
        popupTitle: "Concept & Creative Testing",
        popupSubtitle: "Validate before you launch",
        popupDescription:
          "Test advertising concepts, packaging designs, product ideas, and marketing messages before investing in full production. We provide diagnostic feedback and optimization recommendations.",
      },
      {
        title: "Product Concept & Packaging Testing",
        icon: Package,
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
        icon: Stethoscope,
        popupTitle: "Physician & KOL Research",
        popupSubtitle: "Expert medical insights",
        popupDescription:
          "We have extensive experience recruiting and interviewing physicians, specialists, and key opinion leaders across therapeutic areas. Our healthcare-trained moderators understand medical terminology and can probe deeply on clinical topics.",
      },
      {
        title: "Patient Journey & Needs Assessment",
        icon: Heart,
        popupTitle: "Patient Journey Research",
        popupSubtitle: "Understanding the patient experience",
        popupDescription:
          "Map the complete patient journey from symptom onset through treatment and beyond. We identify unmet needs, information gaps, and opportunities to improve patient outcomes and satisfaction.",
      },
      {
        title: "Regulatory Compliance & Data Security",
        icon: Shield,
        popupTitle: "Healthcare Compliance",
        popupSubtitle: "Research you can trust",
        popupDescription:
          "All healthcare research follows strict ethical guidelines, IRB protocols, and data security standards including HIPAA compliance. We maintain rigorous informed consent procedures and data anonymization practices.",
      },
      {
        title: "Clinical Trial Recruitment Support",
        icon: UserPlus,
        popupTitle: "Clinical Trial Support",
        popupSubtitle: "Accelerating patient recruitment",
        popupDescription:
          "We help pharma and biotech companies understand patient awareness, willingness to participate, and barriers to clinical trial enrollment. Our insights help optimize recruitment strategies and improve enrollment rates.",
      },
      {
        title: "Pharma/Device Concept Testing",
        icon: Microscope,
        popupTitle: "Medical Product Testing",
        popupSubtitle: "Validate with HCPs and patients",
        popupDescription:
          "Test pharmaceutical concepts, medical devices, and therapeutic approaches with both healthcare providers and patients. We provide insights on perceived efficacy, safety concerns, adoption barriers, and positioning strategies.",
      },
    ],
  },
]

const IndustryServices = () => {
  const [activeItems, setActiveItems] = useState({
    b2b: 0,
    b2c: 0,
    healthcare: 0,
  })

  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
  })

  const handleItemClick = (industryId, index, service) => {
    setActiveItems((prev) => ({ ...prev, [industryId]: index }))
    openPopup(service.popupTitle, service.popupSubtitle, service.popupDescription)
  }

  const openPopup = (title, subtitle, description) => {
    setPopup({ isOpen: true, title, subtitle, description })
  }

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false })
  }

  return (
    <section className="py-24 bg-[#072657]">
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
                  const IconComponent = service.icon
                  return (
                    <button
                      key={service.title}
                      onClick={() => handleItemClick(industry.id, index, service)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 text-left ${
                        isActive ? "bg-[#1e293b]/80 border border-[#2a3f5f]" : "hover:bg-[#1e293b]/30"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-[#22d3ee] text-[#0a1628]" : "bg-[#2a3f5f] text-[#8a9bb5]"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Service Title */}
                      <span
                        className={`font-medium transition-colors ${isActive ? "text-[#e5e9f0]" : "text-[#8a9bb5]"}`}
                      >
                        {service.title}
                      </span>

                      {/* Chevron for active items */}
                      {isActive && <ChevronRight className="w-5 h-5 text-[#22d3ee] ml-auto" />}
                    </button>
                  )
                })}
              </div>
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