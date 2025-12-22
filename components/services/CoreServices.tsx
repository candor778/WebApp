"use client"

import { useState } from "react"
import {
  TrendingUp,
  Users,
  BarChart3,
  Lightbulb,
  Code,
  Globe,
  ShoppingCart,
  ClipboardCheck,
  BarChart2,
  Brain,
} from "lucide-react"
import InfoPopup from "@/components/home/InfoPopup"
import Image from "next/image"

const coreServices = [
  {
    icon: TrendingUp,
    title: "Market Size & Growth Projections",
    description:
      "Understand the current landscape and future potential of your industry with reliable data and clear forecasts.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Market Size & Growth Projections",
    popupSubtitle: "Data-driven market intelligence",
    popupDescription:
      "Our market sizing methodology combines top-down and bottom-up analysis with primary research validation. We provide current market valuations, 5-year growth projections, segment breakdowns, and regional analysis. Our forecasts include multiple scenarios (conservative, moderate, aggressive) with clear assumptions and sensitivity analysis.",
  },
  {
    icon: Users,
    title: "Consumer Behavior Analysis",
    description: "Get detailed insights into evolving customer preferences, motivations, and purchase behavior.",
    image: "https://images.pexels.com/photos/7567537/pexels-photo-7567537.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Consumer Behavior Analysis",
    popupSubtitle: "Understanding the 'why' behind decisions",
    popupDescription:
      "We go beyond demographics to understand psychographics, decision journeys, and behavioral triggers. Our analysis includes purchase path mapping, brand perception studies, price sensitivity testing, and emotional driver identification. We help you understand not just what consumers do, but why they do it.",
  },
  {
    icon: BarChart3,
    title: "Competitive Landscape Overview",
    description:
      "Analyze key competitors, their strategies, market share, and positioning to identify gaps and opportunities.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Competitive Landscape Overview",
    popupSubtitle: "Strategic competitive intelligence",
    popupDescription:
      "Our competitive analysis covers market share estimation, positioning maps, SWOT analysis, pricing strategies, marketing spend analysis, and product portfolio comparison. We identify white space opportunities, potential threats, and strategic recommendations for differentiation.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Recommendations",
    description:
      "Turn data into actionable strategies that drive growth, optimize operations, and enhance market positioning.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&h=350",
    popupTitle: "Strategic Recommendations",
    popupSubtitle: "From insight to action",
    popupDescription:
      "Every research project culminates in clear, prioritized strategic recommendations. We provide implementation roadmaps, resource requirements, timeline estimates, and success metrics. Our team can also support post-research strategy workshops and ongoing advisory services.",
  },
]

const processItems = [
  {
    icon: BarChart2,
    title: "Analytics",
    description:
      "We use strong data analysis to predict market changes and help you get the best return on your investment.",
    popupTitle: "Advanced Analytics",
    popupSubtitle: "Predictive intelligence for smarter decisions",
    popupDescription:
      "Our analytics capabilities include regression analysis, cluster segmentation, conjoint analysis, MaxDiff, and predictive modeling. We employ machine learning algorithms to identify patterns in large datasets and provide statistical confidence levels for all findings.",
  },
  {
    icon: Code,
    title: "Programming",
    description:
      "We carefully build complex surveys and trackers, so they are easy for people to use on every platform.",
    popupTitle: "Survey Programming",
    popupSubtitle: "Technical excellence in data collection",
    popupDescription:
      "Our programming team builds mobile-first, accessible surveys with advanced logic, multimedia capabilities, and real-time validation. We support 40+ languages, complex routing, quota management, and integration with client systems. All surveys undergo rigorous QA testing before launch.",
  },
  {
    icon: Brain,
    title: "Diverse Insights",
    description: "We have a diverse variety of respondents who provide us with real and accurate opinions.",
    popupTitle: "Diverse Insights",
    popupSubtitle: "Authentic voices from every demographic",
    popupDescription:
      "Our panels represent true population diversity across age, gender, ethnicity, income, geography, and lifestyle. We actively recruit hard-to-reach segments and maintain strict quality controls to ensure genuine, thoughtful responses from engaged participants.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We maintain a dedicated global footprint, drawing perspectives from diverse international markets.",
    popupTitle: "Global Research Capabilities",
    popupSubtitle: "Local expertise, global scale",
    popupDescription:
      "With operations in 50+ countries and native-speaking research teams, we deliver culturally nuanced insights from any market. Our global operations center ensures consistent methodology while our local teams provide market-specific expertise and respondent recruitment capabilities.",
  },
  {
    icon: ShoppingCart,
    title: "Mystery Shopping",
    description: "We check real customer experiences secretly to provide honest information on service quality.",
    popupTitle: "Mystery Shopping Programs",
    popupSubtitle: "Real experiences, real insights",
    popupDescription:
      "Our mystery shopping network includes trained evaluators who assess customer experience touchpoints across retail, hospitality, financial services, and more. We provide detailed scoring, photo/video documentation, benchmarking against competitors, and trend analysis over time.",
  },
  {
    icon: ClipboardCheck,
    title: "Survey Audit",
    description:
      "We check surveys to make sure the data is accurate and high-quality, giving reliable and unbiased results.",
    popupTitle: "Data Quality Assurance",
    popupSubtitle: "Rigorous validation for reliable results",
    popupDescription:
      "Every dataset undergoes multi-stage quality checks including speeder detection, straight-liner identification, open-end quality review, and consistency validation. We remove fraudulent responses and provide transparency on data cleaning decisions and final sample composition.",
  },
]

const CoreServices = () => {
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
    <section id="core-services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="  text-3xl md:text-4xl lg:text-5xl text-[#1a1a2e] mb-2">
            Core Services
          </h2>
          <div className="w-16 h-1 bg-[#22d3ee] mx-auto mb-4" />
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Comprehensive market research solutions tailored to your needs
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreServices.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => openPopup(service.popupTitle, service.popupSubtitle, service.popupDescription)}
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={300}
                  height={160}
                />
              </div>
              <div className="p-5">
                <div className="w-10 h-10 rounded-lg bg-[#22d3ee] flex items-center justify-center mb-3">
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-2">{service.title}</h4>
                <p className="text-sm text-[#6b7280]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="  text-2xl md:text-3xl text-[#1a1a2e] mb-2">
              Our Capabilities
            </h3>
            <div className="w-12 h-1 bg-[#22d3ee] mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processItems.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  index % 2 === 0
                    ? "bg-[#0a1628] hover:bg-[#0d1d35]"
                    : "bg-gradient-to-br from-[#22d3ee] to-[#14b8a6] hover:from-[#06b6d4] hover:to-[#0891b2]"
                }`}
                onClick={() => openPopup(item.popupTitle, item.popupSubtitle, item.popupDescription)}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    index % 2 === 0 ? "bg-[#22d3ee]/20" : "bg-white/20"
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${index % 2 === 0 ? "text-[#22d3ee]" : "text-white"}`} />
                </div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className={`text-sm ${index % 2 === 0 ? "text-[#8a9bb5]" : "text-white/80"}`}>{item.description}</p>
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

export default CoreServices
