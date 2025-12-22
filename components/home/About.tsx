"use client"

import { useState } from "react"
import { Target, Eye } from "lucide-react"
import Image from "next/image"
import InfoPopup from "@/components/home/InfoPopup"

// Define missionPoints and visionPoints
const missionPoints = [
  {
    label: "Decode the Silent Language",
    text: "Transform raw data into clear, human-centered narratives",
    popupTitle: "Decode the Silent Language",
    popupSubtitle: "Transform raw data into clear, human-centered narratives",
    popupDescription:
      "We don't just collect data - we interpret the unspoken signals in consumer behavior, market trends, and competitive dynamics. Our analysts are trained to identify patterns that others miss and translate complex data into compelling stories that drive decision-making."
  },
  {
    label: "Ignite Growth",
    text: "Provide insights that directly lead to new products and market entry success",
    popupTitle: "Ignite Growth",
    popupSubtitle: "Provide insights that directly lead to new products and market entry success",
    popupDescription:
      "Our research doesn't just inform - it transforms. We focus on actionable insights that directly contribute to revenue growth, successful product launches, and strategic market expansions. Every recommendation is designed to create measurable business impact.",
  },
  {
    label: "Champion Ethics",
    text: "Provide insights that directly lead to new products and market entry success",
    popupTitle: "Champion Ethics",
    popupSubtitle: "Provide insights that directly lead to new products and market entry success",
    popupDescription:
      "Integrity is the foundation of everything we do. We adhere to strict ethical guidelines, ensure participant privacy, and maintain complete transparency in our methodologies. Our clients trust us because we never compromise on ethical standards.",
  },
]

const visionPoints = [
  {
    label: "Reshape Industry Standards",
    text: "Set the benchmark for insightful, reliable analysis globally",
    popupTitle: "Reshape Industry Standards",
    popupSubtitle: "Set the benchmark for insightful, reliable analysis globally",
    popupDescription:
      "We're not content with following industry norms - we're here to redefine them. Our innovative methodologies and commitment to excellence are setting new standards for what market research can achieve on a global scale.",
  },
  {
    label: "Drive Transformation",
    text: "Drive positive societal and commercial transformation.",
    popupTitle: "Drive Transformation",
    popupSubtitle: "Drive positive societal and commercial transformation",
    popupDescription:
      "Beyond business metrics, we believe in research that leads to products and services that make a real difference in people's lives. We help companies understand not just what consumers want, but what they truly need.",
  },
  {
    label: "Be the Future Predictor",
    text: "Utilize advanced analytics to foresee market shifts",
    popupTitle: "Be the Future Predictor",
    popupSubtitle: "Utilize advanced analytics to foresee market shifts",
    popupDescription:
      "Using cutting-edge predictive analytics and AI-driven insights, we help our clients anticipate market changes before they happen. Our forward-looking approach ensures you're always prepared for tomorrow's challenges and opportunities.",
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
          <h2 className="  text-3xl font-bold md:text-4xl lg:text-5xl text-[#1a1a2e] mb-4">
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
              className="rounded-xl shadow-lg w-full object-cover"
              width={600}
              height={450}
            />
          </div>

          <div className="space-y-6">
            <h3 className="  text-2xl md:text-3xl font-semibold text-[#1a1a2e]">
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
          <div className="bg-[#1e3a5f] hover:scale-105 transition-all duration-300 rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-xl bg-[#22d3ee]/20 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#22d3ee]" />
            </div>
            <h3 className="  text-2xl text-white font-bold mb-4">Our Mission</h3>
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
          <div className="bg-gradient-to-br hover:scale-105 transition-all duration-300 from-[#0891b2] to-[#06b6d4] rounded-2xl p-8 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="  text-2xl text-white font-bold mb-4">Our Vision</h3>
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
