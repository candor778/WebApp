"use client"

import { useState } from "react"
import { User, Shield, Target, Eye } from "lucide-react"
import InfoPopup from "./InfoPopup"

const features = [
  {
    title: "Privacy",
    description: "Your data is safe with us.",
    icon: Shield,
    popupTitle: "Privacy Policy",
    popupSubtitle: "Protecting Your Information",
    popupDescription: "We take the privacy of your data very seriously and ensure it is protected at all times.",
  },
  {
    title: "Accuracy",
    description: "Get reliable results.",
    icon: Target,
    popupTitle: "Accuracy Standards",
    popupSubtitle: "High-Quality Data",
    popupDescription: "Our methods ensure that the data collected is accurate and reliable.",
  },
  {
    title: "Transparency",
    description: "See behind the scenes.",
    icon: Eye,
    popupTitle: "Transparency Report",
    popupSubtitle: "Open and Honest",
    popupDescription: "We believe in transparency and provide detailed reports on our processes.",
  },
  {
    title: "User-Friendly",
    description: "Easy to use.",
    icon: User,
    popupTitle: "User Experience",
    popupSubtitle: "Intuitive Design",
    popupDescription: "Our platform is designed to be user-friendly, making it easy for anyone to use.",
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
            <h2 className="  text-3xl md:text-4xl lg:text-5xl text-white mb-6">
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
