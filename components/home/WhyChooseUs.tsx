"use client"

import { useState } from "react"
import { User, Shield,Handshake, EyeIcon } from "lucide-react"
import InfoPopup from "./InfoPopup"

const features = [
  {
    title: "Unbiased Insights",
    description: "We deliver crystal-clear, unfiltered insights free from bias or agenda",
    icon: User,
    popupTitle: "Unbiased Insights",
    popupSubtitle: "We deliver crystal-clear, unfiltered insights free from bias or agenda",
    popupDescription:
      "Our research methodology is built on scientific rigor and ethical standards. We employ multiple validation techniques and cross-reference data sources to ensure complete objectivity. Every insight is backed by verifiable data and transparent analysis.",
  },
  {
    title: "Ethical Standards",
    description: "Highest standards of integrity and transparency in all our research",
    icon: Shield,
    popupTitle: "Ethical Standards",
    popupSubtitle: "Highest standards of integrity and transparency in all our research",
    popupDescription:
      "We adhere to international research ethics guidelines including ESOMAR and MRS codes of conduct. All participant data is protected with enterprise-grade security, and we maintain complete confidentiality throughout the research process.",
  },
  {
    title: "Strategic Partnership",
    description: "We don't just provide data - we partner with you for long-term success",
    icon: Handshake,
    popupTitle: "Strategic Partnership",
    popupSubtitle: "We don't just provide data - we partner with you for long-term success",
    popupDescription:
      "Beyond delivering reports, we work alongside your team to implement insights. We provide ongoing support, strategic consultation, and help translate research findings into actionable business strategies that drive measurable results.",
  },
  {
    title: "Human-Centered Research",
    description: "We uncover the human stories behind the numbers for deeper understanding",
    icon: EyeIcon,
    popupTitle: "Human-Centered Research",
    popupSubtitle: "We uncover the human stories behind the numbers for deeper understanding",
    popupDescription:
      "Numbers tell part of the story, but we go deeper. Through qualitative research, ethnographic studies, and behavioral analysis, we reveal the motivations, emotions, and contexts that drive consumer decisions and market trends.",
  },
]

const WhyChooseUs = () => {
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
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Dark Navy Container */}
        <div className="bg-gradient-to-br hover:scale-105 transition-all duration-300 from-[#1e3a5f] via-slate-800 to-[#1e3a5f] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="  text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Candor Survey?
            </h2>
            <p className="text-base text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              At Candor Survey, we believe that the most valuable business asset is the truth. In a world full of noise
              and conflicting data, we stand for clarity. Our goal is to do more than just hand you a spreadsheet of
              numbers; we want to uncover the human stories that drive those numbers.
            </p>
          </div>

          {/* Features Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#1e3a5f]/80 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:bg-[#1e3a5f] hover:scale-[1.02] hover:shadow-xl border border-white/5"
                onClick={() => openPopup(feature.popupTitle, feature.popupSubtitle, feature.popupDescription)}
              >
                <div className="w-12 h-12 rounded-full bg-transparent border-2 border-[#22d3ee] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#22d3ee]" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94a3b8]">{feature.description}</p>
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

export default WhyChooseUs
