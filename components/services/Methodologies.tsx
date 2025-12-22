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
    description: "Face-to-face interviews with digital data capture",
    popupTitle: "Computer-Assisted Personal Interviewing (CAPI)",
    popupSubtitle: "Face-to-face interviews enhanced with digital technology",
    popupDescription:
      "CAPI combines the personal touch of face-to-face interviews with the efficiency of digital data collection. Our interviewers use tablets or laptops to capture responses in real-time, ensuring data accuracy and enabling complex skip patterns and validation rules.",
  },
  {
    icon: MessageSquare,
    title: "Computer-Assisted Telephone Interviewing (CATI)",
    description: "Efficient telephone-based data collection",
    popupTitle: "Computer-Assisted Telephone Interviewing (CATI)",
    popupSubtitle: "Reaching respondents efficiently via telephone",
    popupDescription:
      "Our CATI system enables trained interviewers to conduct structured telephone interviews while capturing responses directly into a database. This method is ideal for reaching geographically dispersed samples quickly and cost-effectively.",
  },
  {
    icon: Laptop,
    title: "Digital Data Collection",
    description: "Online surveys and mobile-first research methods",
    popupTitle: "Digital Data Collection",
    popupSubtitle: "Modern, flexible online research methods",
    popupDescription:
      "We leverage cutting-edge digital platforms to reach respondents where they are—on desktop, mobile, or tablet. Our surveys are optimized for all devices, ensuring high completion rates and quality data through engaging, user-friendly interfaces.",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Live data processing and immediate insights",
    popupTitle: "Real-Time Analysis",
    popupSubtitle: "Instant insights as data comes in",
    popupDescription:
      "Our real-time dashboards allow you to monitor fieldwork progress and analyze results as they come in. Make faster decisions with live data visualization, automatic alerts for quota fulfillment, and instant access to preliminary findings.",
  },
]

const qualitativeMethods: Method[] = [
  {
    icon: Focus,
    title: "Focus Groups",
    description: "Moderated group discussions for deep insights",
    popupTitle: "Focus Groups",
    popupSubtitle: "Facilitated group discussions for rich insights",
    popupDescription:
      "Our experienced moderators facilitate engaging discussions that uncover group dynamics, consensus, and divergent opinions. Focus groups are ideal for exploring perceptions, generating ideas, and understanding the 'why' behind consumer behavior.",
  },
  {
    icon: Users,
    title: "In-Depth Interviews (IDIs)",
    description: "One-on-one conversations for detailed exploration",
    popupTitle: "In-Depth Interviews (IDIs)",
    popupSubtitle: "Deep, personal conversations revealing individual perspectives",
    popupDescription:
      "IDIs provide a confidential setting for exploring sensitive topics, complex decision-making processes, and personal experiences. Our skilled interviewers build rapport quickly and probe deeply to uncover motivations and barriers.",
  },
  {
    icon: Video,
    title: "Ethnographic Research",
    description: "Observational studies in natural environments",
    popupTitle: "Ethnographic Research",
    popupSubtitle: "Understanding behavior in context",
    popupDescription:
      "We observe consumers in their natural environments—homes, stores, workplaces—to understand how they actually behave versus what they say. This method reveals unarticulated needs and unconscious behaviors that surveys cannot capture.",
  },
  {
    icon: MessageSquare,
    title: "Online Communities",
    description: "Long-term digital engagement platforms",
    popupTitle: "Online Communities",
    popupSubtitle: "Ongoing conversations with your target audience",
    popupDescription:
      "Build lasting relationships with customers through private online communities. Conduct multiple activities over days or weeks—discussions, diaries, concept tests—allowing for deeper engagement and longitudinal insights.",
  },
]

const supportServices: Method[] = [
  {
    icon: FileText,
    title: "Questionnaire Design",
    description: "Expert survey development and optimization",
    popupTitle: "Questionnaire Design",
    popupSubtitle: "Crafting effective research instruments",
    popupDescription:
      "Our research experts design questionnaires that minimize bias, maximize response quality, and align perfectly with your objectives. We apply best practices in question wording, scale selection, and survey flow to ensure reliable data.",
  },
  {
    icon: Presentation,
    title: "Data Visualization",
    description: "Clear, impactful presentation of findings",
    popupTitle: "Data Visualization",
    popupSubtitle: "Transforming data into compelling stories",
    popupDescription:
      "We create intuitive charts, infographics, and interactive dashboards that make complex findings accessible to all stakeholders. Our visualizations highlight key insights and support data-driven decision-making.",
  },
  {
    icon: BarChart2,
    title: "Statistical Analysis",
    description: "Advanced analytics and modeling",
    popupTitle: "Statistical Analysis",
    popupSubtitle: "Rigorous analysis for actionable insights",
    popupDescription:
      "Our statisticians apply advanced techniques—regression analysis, segmentation, conjoint analysis, and more—to uncover patterns, test hypotheses, and predict outcomes. We translate statistical findings into clear business recommendations.",
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