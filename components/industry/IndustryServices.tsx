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
          "We conduct in-depth interviews with C-suite executives, industry experts, and key decision-makers to gather strategic insights. Our interviewers are trained in executive communication and use structured protocols to ensure consistency and depth.",
      },
      {
        title: "Product/Service Feasibility & Needs Assessment",
        icon: Target,
        popupTitle: "Product/Service Feasibility & Needs Assessment",
        popupSubtitle: "Validating market opportunities",
        popupDescription:
          "Through comprehensive market validation, we test your product concepts with target buyers, assess market readiness, identify feature priorities, and provide go/no-go recommendations backed by quantitative and qualitative data.",
      },
      {
        title: "Vendor Evaluation & Competitive Benchmarking",
        icon: TrendingUp,
        popupTitle: "Vendor Evaluation & Competitive Benchmarking",
        popupSubtitle: "Know where you stand",
        popupDescription:
          "We evaluate suppliers and partners against industry standards, assess their capabilities, reliability, and value proposition, and provide comparative analysis to support your procurement and partnership decisions.",
      },
      {
        title: "Sales Channel Optimization & Partner Strategy",
        icon: Handshake,
        popupTitle: "Sales Channel Optimization & Partner Strategy",
        popupSubtitle: "Maximizing go-to-market effectiveness",
        popupDescription:
          "Our channel analysis identifies the most effective distribution routes, evaluates partner performance, recommends channel mix optimization, and provides strategies to maximize market coverage and sales efficiency.",
      },
      {
        title: "Technology Adoption & Trend Forecasting",
        icon: Zap,
        popupTitle: "Technology Adoption & Trend Forecasting",
        popupSubtitle: "Stay ahead of digital transformation",
        popupDescription:
          "We track emerging technologies, assess adoption curves, identify early adopters vs. laggards, and provide technology roadmaps that align with market evolution and your business strategy.",
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
        popupTitle: "Consumer Segmentation & Persona Development",
        popupSubtitle: "Know your customers deeply",
        popupDescription:
          "Using advanced clustering algorithms and behavioral analysis, we create detailed consumer segments and personas that bring your target audience to life with demographics, psychographics, needs, and behaviors.",
      },
      {
        title: "Brand Perception & Health Tracking",
        icon: Eye,
        popupTitle: "Brand Perception & Health Tracking",
        popupSubtitle: "Monitor and protect your brand",
        popupDescription:
          "We measure brand awareness, consideration, preference, and loyalty over time. Our tracking includes brand equity metrics, competitive positioning, and early warning indicators for brand health issues.",
      },
      {
        title: "Customer Experience (CX) & Journey Mapping",
        icon: Map,
        popupTitle: "Customer Experience (CX) & Journey Mapping",
        popupSubtitle: "Optimize every touchpoint",
        popupDescription:
          "Through touchpoint analysis, we map the complete customer journey, identify pain points and moments of delight, measure satisfaction at each stage, and recommend experience improvements that drive loyalty.",
      },
      {
        title: "Multimedia & Concept Testing",
        icon: TestTube,
        popupTitle: "Multimedia & Concept Testing",
        popupSubtitle: "Validate before you launch",
        popupDescription:
          "We test ads, packaging, messaging, and creative concepts with your target audience using both quantitative metrics (recall, persuasion) and qualitative feedback (emotional response, clarity) to optimize before launch.",
      },
      {
        title: "Product Concept & Packaging Testing",
        icon: Package,
        popupTitle: "Product Concept & Packaging Testing",
        popupSubtitle: "Design for success",
        popupDescription:
          "Our testing methodology evaluates purchase intent, uniqueness, value perception, and shelf appeal. We use A/B testing, conjoint analysis, and sensory evaluation to optimize product-market fit.",
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
          "We recruit and interview medical specialists, key opinion leaders, and healthcare practitioners using medically-trained interviewers. Our research covers clinical practices, treatment protocols, and emerging medical trends.",
      },
      {
        title: "Patient Journey & Needs Assessment",
        icon: Heart,
        popupTitle: "Patient Journey & Needs Assessment",
        popupSubtitle: "Understanding the patient experience",
        popupDescription:
          "Through empathetic patient research, we map the complete healthcare journey from symptom awareness to treatment and follow-up, identifying unmet needs, barriers to care, and opportunities for intervention.",
      },
      {
        title: "Regulatory Compliance & Data Security",
        icon: Shield,
        popupTitle: "Regulatory Compliance & Data Security",
        popupSubtitle: "Research you can trust",
        popupDescription:
          "All healthcare research is HIPAA-compliant, with IRB approval when required. We maintain the highest standards of patient privacy, data encryption, and regulatory adherence across all jurisdictions.",
      },
      {
        title: "Clinical Trial Recruitment Support",
        icon: UserPlus,
        popupTitle: "Clinical Trial Recruitment Support",
        popupSubtitle: "Accelerating patient recruitment",
        popupDescription:
          "We assist with patient recruitment for clinical trials through targeted outreach, screening, and enrollment support. Our database includes pre-qualified patients interested in trial participation.",
      },
      {
        title: "Pharma/Device Concept Testing",
        icon: Microscope,
        popupTitle: "Pharma/Device Concept Testing",
        popupSubtitle: "Validate with HCPs and patients",
        popupDescription:
          "We test pharmaceutical products, medical devices, and digital health solutions with patients and providers, assessing efficacy perceptions, usability, adoption barriers, and market potential.",
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
