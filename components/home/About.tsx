"use client"

import { useState } from "react"
import { Target, Eye } from "lucide-react"
import Image from "next/image"
import InfoPopup from "@/components/home/InfoPopup"

// Define missionPoints and visionPoints
const missionPoints = [
  {
    label: "Capture Voices",
    text: "We capture genuine, unfiltered human voices.",
    popupTitle: "Capture Voices",
    popupSubtitle: "Our Approach",
    popupDescription:
      "At Candor Survey, we prioritize capturing authentic feedback to ensure our insights are accurate and actionable.",
  },
  {
    label: "Transform Data",
    text: "Transform them into precise strategies.",
    popupTitle: "Transform Data",
    popupSubtitle: "Our Expertise",
    popupDescription:
      "Our team of data scientists and analysts work together to convert raw data into meaningful insights that drive business growth.",
  },
]

const visionPoints = [
  {
    label: "Reshape Standards",
    text: "We reshape industry standards.",
    popupTitle: "Reshape Standards",
    popupSubtitle: "Our Ambition",
    popupDescription:
      "Our vision is to set new benchmarks in market research, providing businesses with the tools they need to lead with clarity.",
  },
  {
    label: "Drive Transformation",
    text: "Drive positive societal and commercial transformation.",
    popupTitle: "Drive Transformation",
    popupSubtitle: "Our Impact",
    popupDescription:
      "Through ethical understanding and strategic insights, we help businesses make a positive impact on society and the economy.",
  },
]

const About = () => {
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
    <section id="about" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="  text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-4">
            About Candor Survey
          </h2>
          <div className="w-16 h-1 bg-[#22d3ee] mx-auto mb-4" />
          <p className="text-lg text-[#6b7280]">Uncovering the Truth Behind Every Data Point</p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Team analyzing data"
              className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]"
              width={600}
              height={450}
            />
          </div>

          <div className="space-y-6">
            <h3 className="  text-2xl md:text-3xl text-[#1a1a2e]">
              We are a trusted market research agency
            </h3>
            <p className="text-[#6b7280] leading-relaxed">
              Candor Survey isn`&apos;`t just a research firm; we are your strategic partner in navigating complexity. We
              combine advanced data science with genuine human empathy to deliver unbiased, crystal-clear insights that
              empower your most critical business decisions.
            </p>
            <p className="text-[#6b7280] leading-relaxed">
              We are committed to delivering precise, data-driven insights that empower businesses to grow sustainably,
              innovate strategically, and lead with clarity in an increasingly complex and fast-evolving market
              environment.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card - Dark Blue */}
          <div className="bg-[#1e3a5f] rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-xl bg-[#22d3ee]/20 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#22d3ee]" />
            </div>
            <h3 className="  text-2xl text-white mb-4">Our Mission</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              At Candor Survey, our mission is to move beyond mere reporting. We actively decode the silent language of
              the market by capturing genuine, unfiltered human voices, transforming them into precise strategies that
              ignite business growth.
            </p>
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-2 cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                  onClick={() => openPopup(point.popupTitle, point.popupSubtitle, point.popupDescription)}
                >
                  <span className="text-[#22d3ee]">•</span>
                  <p className="text-sm text-white/90">
                    <span className="text-[#22d3ee] font-medium">{point.label}</span> {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision Card - Teal/Cyan Gradient */}
          <div className="bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="  text-2xl text-white mb-4">Our Vision</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              We aspire to be the force that reshapes industry standards. Our vision is to create a dynamic business
              environment where market leaders don`&apos;`t just react to change, but drive positive societal and commercial
              transformation through deep, ethical understanding.
            </p>
            <ul className="space-y-4">
              {visionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-2 cursor-pointer hover:bg-white/10 p-2 -mx-2 rounded-lg transition-colors"
                  onClick={() => openPopup(point.popupTitle, point.popupSubtitle, point.popupDescription)}
                >
                  <span className="text-white">•</span>
                  <p className="text-sm text-white/95">
                    <span className="font-semibold">{point.label}</span> {point.text}
                  </p>
                </li>
              ))}
            </ul>
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

export default About
