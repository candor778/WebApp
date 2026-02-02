"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InfoPopup from "@/components/home/InfoPopup"
import {
  BarChart2,
  MessageSquare,
  Headphones,
  Laptop,
  Zap,
  Users,
  Video,
  Focus,
  FileText,
  Presentation,
} from "lucide-react"

interface Method {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  popupTitle?: string
  popupSubtitle?: string
  popupDescription?: string
}

interface PopupState {
  isOpen: boolean
  title: string
  subtitle: string
  description: string
}

const quantitativeMethods: Method[] = [
  {
    icon: Users,
    title: "Central Location Tests (CLT)",
    description: "Controlled environment testing for product evaluation",
    popupTitle: "Central Location Tests (CLT)",
    popupSubtitle: "Standardized, controlled venues ensuring high data quality for sensory testing, concept evaluation, and packaging feedback.",
    popupDescription:
      "Our CLT facilities are equipped with state-of-the-art technology for product testing, sensory evaluation, and concept validation. We maintain controlled environments that eliminate external biases and ensure data consistency across multiple test locations.",
  },
  {
    icon: Headphones,
    title: "Computer-Assisted Personal Interviewing (CAPI)",
    description: "Digital face-to-face data collection with offline functionality, ideal for complex surveys and visual aids.",
    popupTitle: "Computer-Assisted Personal Interviewing (CAPI)",
    popupSubtitle: "Digital face-to-face data collection with offline functionality, ideal for complex surveys and visual aids.",
    popupDescription:
      "CAPI combines the personal touch of face-to-face interviews with digital efficiency. Our interviewers use tablets with intelligent skip logic, real-time data validation, and multimedia capabilities to enhance respondent engagement and data quality.",
  },
  {
    icon: MessageSquare,
    title: "Computer-Assisted Telephone Interviewing (CATI)",
    description: "Centralized quality assurance with real-time scripting and built-in quality control for efficient large-scale sampling.",
    popupTitle: "Computer-Assisted Telephone Interviewing (CATI)",
    popupSubtitle: "Centralized quality assurance with real-time scripting and built-in quality control for efficient large-scale sampling.",
    popupDescription:
      "Our CATI system features automatic dialing, call recording, supervisor monitoring, and real-time data dashboards. We achieve high response rates through trained interviewers and optimal call-time algorithms.",
  },
  {
    icon: Laptop,
    title: "Digital Data Collection",
    description: "Online surveys with advanced programming, mobile optimization, and real-time analytics for rapid insights.",
    popupTitle: "Digital Data Collection",
    popupSubtitle: "Online surveys with advanced programming, mobile optimization, and real-time analytics for rapid insights.",
    popupDescription:
      "Our digital platform supports complex survey logic, multimedia integration, and works seamlessly across devices. We use geolocation, time-stamping, and fraud detection to ensure data authenticity.",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Live dashboards and automated reporting that transform data into insights as responses come in.",
    popupTitle: "Real-Time Analysis",
    popupSubtitle: "Live dashboards and automated reporting that transform data into insights as responses come in.",
    popupDescription:
      "Our analytics engine processes data in real-time, generating automated reports, trend alerts, and predictive insights. Stakeholders can access live dashboards showing response patterns, demographic breakdowns, and key metrics.",
  },
]

const qualitativeMethods: Method[] = [
  {
    icon: Focus,
    title: "Focus Group Discussions (FGD)",
    description: "Leveraging group synergy for collective ideation, opinion contagion, and collaborative memory to refine concepts.",
    popupTitle: "Focus Group Discussions (FGD)",
    popupSubtitle: "Leveraging group synergy for collective ideation, opinion contagion, and collaborative memory to refine concepts.",
    popupDescription:
      "Our FGDs are moderated by experienced facilitators who create safe spaces for honest dialogue. We use specialized techniques like brainstorming, concept boards, and group activities to stimulate discussion and uncover deeper insights through group dynamics.",
  },
  {
    icon: Users,
    title: "In-Depth Interviews (IDIs)",
    description: "One-on-one conversations that dive deep into individual experiences, motivations, and decision-making processes.",
    popupTitle: "In-Depth Interviews (IDIs)",
    popupSubtitle: "One-on-one conversations that dive deep into individual experiences, motivations, and decision-making processes.",
    popupDescription:
      "IDIs allow us to explore sensitive topics, complex behaviors, and personal narratives without group influence. Our interviewers are trained in active listening, probing techniques, and building rapport to elicit authentic, detailed responses.",
  },
  {
    icon: Video,
    title: "Ethnographic Research",
    description: "Observing consumers in their natural environments to understand context, behavior, and unspoken needs.",
    popupTitle: "Ethnographic Research",
    popupSubtitle: "Observing consumers in their natural environments to understand context, behavior, and unspoken needs.",
    popupDescription:
      "Our ethnographers conduct home visits, shop-alongs, and workplace observations to see how products fit into real life. We capture video, photos, and field notes to document the rich context surrounding consumer behavior.",
  },
  {
    icon: MessageSquare,
    title: "Online Communities",
    description: "Multi-day digital discussions that build deeper relationships and allow for longitudinal insight gathering.",
    popupTitle: "Online Communities",
    popupSubtitle: "Multi-day digital discussions that build deeper relationships and allow for longitudinal insight gathering.",
    popupDescription:
      "Our private online communities enable ongoing dialogue, homework assignments, and multimedia sharing. Participants engage at their convenience, leading to more thoughtful responses and relationship building over time.",
  },
]

const supportServices: Method[] = [
  {
    icon: FileText,
    title: "Professional Panel Sourcing",
    description: "Recruiting hard-to-reach professionals, executives, and specialists from our verified database.",
    popupTitle: "Professional Panel Sourcing",
    popupSubtitle: "Recruiting hard-to-reach professionals, executives, and specialists from our verified database.",
    popupDescription:
      "We maintain relationships with over 100,000 verified professionals across industries. Our recruitment process includes identity verification, credential checking, and profile validation to ensure you reach the right respondents.",
  },
  {
    icon: Presentation,
    title: "Statistical Analysis",
    description: "Advanced analytics including regression, factor analysis, conjoint, and predictive modeling.",
    popupTitle: "Statistical Analysis",
    popupSubtitle: "Advanced analytics including regression, factor analysis, conjoint, and predictive modeling.",
    popupDescription:
      "Our statisticians employ sophisticated techniques like multivariate analysis, structural equation modeling, and machine learning to uncover patterns, test hypotheses, and build predictive models.",
  },
  {
    icon: BarChart2,
    title: "Data Transformation",
    description: "Converting raw survey data into clean, structured datasets ready for analysis and reporting.",
    popupTitle: "Data Transformation",
    popupSubtitle: "Converting raw survey data into clean, structured datasets ready for analysis and reporting.",
    popupDescription:
      "Our data processing includes cleaning, coding, weighting, and validation. We handle open-ends with text analytics, create derived variables, and prepare data files in multiple formats (SPSS, Excel, CSV).",
  },
]

const Methodologies = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
  })

  const openPopup = (method: Method) => {
    if (method.popupTitle && method.popupDescription) {
      setPopup({
        isOpen: true,
        title: method.popupTitle,
        subtitle: method.popupSubtitle || "",
        description: method.popupDescription,
      })
    }
  }

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false })
  }

  return (
    <section
      id="methodologies"
      className="py-24 bg-[#072657] relative"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.03) 0%, transparent 40%)`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#e5e9f0] mb-4">
            Research{" "}
            <span className="bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] bg-clip-text text-transparent">
              Methodologies
            </span>
          </h2>
          <p className="text-lg text-[#8a9bb5] max-w-2xl mx-auto">
            Comprehensive research solutions powered by proven methodologies
          </p>
        </div>

        <Tabs defaultValue="quantitative" className="w-full">
          <TabsList className="grid w-full h-auto max-w-2xl mx-auto grid-cols-1 md:grid-cols-3 mb-12 p-2 bg-[#1a2942] border border-[#2a3f5f] rounded-xl gap-2">
            <TabsTrigger
              value="quantitative"
              className="py-3 px-4 w-full rounded-lg text-sm md:text-base transition-all text-white data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628] hover:bg-white/5"
            >
              Quantitative Research
            </TabsTrigger>
            <TabsTrigger
              value="qualitative"
              className="py-3 px-4 w-full rounded-lg text-sm md:text-base transition-all text-white data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628] hover:bg-white/5"
            >
              Qualitative Research
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="py-3 px-4 w-full rounded-lg text-sm md:text-base transition-all text-white data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628] hover:bg-white/5"
            >
              Research Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quantitative">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#111c31] rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl text-[#e5e9f0] mb-2">Quantitative Research</h3>
                <p className="text-[#22d3ee] font-medium mb-4">Robust data collection</p>
                <p className="text-[#8a9bb5]">
                  We specialize in quantitative data collection via CLTs for sensory evaluation, alongside highly
                  efficient interview methods like CAPI and CATI, ensuring robust sample reach and exceptional data
                  accuracy.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quantitativeMethods.map((method, index) => (
                  <button
                    key={method.title}
                    onClick={() => openPopup(method)}
                    className="p-4 rounded-xl bg-[#15213b] hover:bg-[#1e293b] transition-all group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee] font-semibold text-sm">
                        {index + 1}
                      </span>
                      <method.icon className="w-5 h-5 text-[#22d3ee]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{method.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{method.description}</p>
                  </button>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/20">
                <p className="text-[#22d3ee] italic text-center">
                  &quot;Data-driven methods for robust, scalable insights&quot;
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qualitative">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#111c31] rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl text-[#e5e9f0] mb-2">Qualitative Research</h3>
                <p className="text-[#22d3ee] font-medium mb-4">Deep human understanding</p>
                <p className="text-[#8a9bb5]">
                  Our qualitative methods uncover the &apos;why&apos; behind consumer behavior, providing rich
                  narratives and emotional insights that quantitative data alone cannot reveal.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {qualitativeMethods.map((method, index) => (
                  <button
                    key={method.title}
                    onClick={() => openPopup(method)}
                    className="p-4 rounded-xl bg-[#15213b] hover:bg-[#1e293b] transition-all group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center text-[#14b8a6] font-semibold text-sm">
                        {index + 1}
                      </span>
                      <method.icon className="w-5 h-5 text-[#14b8a6]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{method.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#111c31] rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl text-[#e5e9f0] mb-2">Research Support</h3>
                <p className="text-[#22d3ee] font-medium mb-4">End-to-end assistance</p>
                <p className="text-[#8a9bb5]">
                  From questionnaire design to final presentation, our support services ensure your research project
                  runs smoothly and delivers maximum impact.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {supportServices.map((service, index) => (
                  <button
                    key={service.title}
                    onClick={() => openPopup(service)}
                    className="p-4 rounded-xl bg-[#15213b] hover:bg-[#1e293b] transition-all group text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center mx-auto mb-3">
                      <service.icon className="w-6 h-6 text-[#22d3ee]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{service.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
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

export default Methodologies
