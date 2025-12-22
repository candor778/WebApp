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
    popupSubtitle: "Crystal-clear, unfiltered analysis",
    popupDescription:
      "Our commitment to objectivity ensures every insight we deliver is free from bias or hidden agendas. We apply rigorous research methodologies, use blind analysis techniques, and maintain strict independence from external influence so your decisions are based on pure, reliable truth.",
  },
  {
    title: "Ethical Standards",
    description: "Highest standards of integrity and transparency in all our research",
    icon: Shield,
    popupTitle: "Ethical Standards",
    popupSubtitle: "Integrity and transparency in everything we do",
    popupDescription:
      "Ethics are the foundation of our work. We ensure GDPR compliance, obtain proper participant consent, protect anonymity, and follow strict data-handling protocols. Our transparent reporting clearly shows how every conclusion is reached.",
  },
  {
    title: "Strategic Partnership",
    description: "We don't just provide data - we partner with you for long-term success",
    icon: Handshake,
    popupTitle: "Strategic Partnership",
    popupSubtitle: "Your success is our mission",
    popupDescription:
      "We move beyond transactional relationships to become true strategic partners. Through ongoing support, proactive recommendations, and a deep understanding of your goals, we work alongside you to overcome challenges and celebrate successes.",
  },
  {
    title: "Human-Centered Research",
    description: "We uncover the human stories behind the numbers for deeper understanding",
    icon: EyeIcon,
    popupTitle: "Human-Centered Research",
    popupSubtitle: "Stories behind the statistics",
    popupDescription:
      "Numbers alone don’t tell the full story. Our human-centered approach uncovers the emotions, motivations, and real-life experiences behind consumer behavior by combining quantitative data with rich qualitative insights.",
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
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
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
