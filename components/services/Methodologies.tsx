"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const quantitativeMethods = [
  {
    icon: Users,
    title: "Central Location Tests (CLT)",
    description: "Controlled environment testing for product evaluation",
  },
  {
    icon: Headphones,
    title: "Computer-Assisted Personal Interviewing (CAPI)",
    description: "Face-to-face interviews with digital data capture",
  },
  {
    icon: MessageSquare,
    title: "Computer-Assisted Telephone Interviewing (CATI)",
    description: "Efficient telephone-based data collection",
  },
  { icon: Laptop, title: "Digital Data Collection", description: "Online surveys and mobile-first research methods" },
  { icon: Zap, title: "Real-Time Analysis", description: "Live data processing and immediate insights" },
]

const qualitativeMethods = [
  { icon: Focus, title: "Focus Groups", description: "Moderated group discussions for deep insights" },
  {
    icon: Users,
    title: "In-Depth Interviews (IDIs)",
    description: "One-on-one conversations for detailed exploration",
  },
  { icon: Video, title: "Ethnographic Research", description: "Observational studies in natural environments" },
  { icon: MessageSquare, title: "Online Communities", description: "Long-term digital engagement platforms" },
]

const supportServices = [
  { icon: FileText, title: "Questionnaire Design", description: "Expert survey development and optimization" },
  { icon: Presentation, title: "Data Visualization", description: "Clear, impactful presentation of findings" },
  { icon: BarChart2, title: "Statistical Analysis", description: "Advanced analytics and modeling" },
]

const Methodologies = () => {
  return (
    <section
      id="methodologies"
      className="py-24 bg-[#0f1724] relative"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.03) 0%, transparent 40%)`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="  text-3xl md:text-4xl lg:text-5xl text-[#e5e9f0] mb-4">
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
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-[#1a2942] border border-[#2a3f5f]">
            <TabsTrigger
              value="quantitative"
              className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628]"
            >
              Quantitative Research
            </TabsTrigger>
            <TabsTrigger
              value="qualitative"
              className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628]"
            >
              Qualitative Research
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0a1628]"
            >
              Research Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quantitative">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="  text-2xl text-[#e5e9f0] mb-2">
                  Quantitative Research
                </h3>
                <p className="text-[#22d3ee] font-medium mb-4">Robust data collection</p>
                <p className="text-[#8a9bb5]">
                  We specialize in quantitative data collection via CLTs for sensory evaluation, alongside highly
                  efficient interview methods like CAPI and CATI, ensuring robust sample reach and exceptional data
                  accuracy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quantitativeMethods.map((method, index) => (
                  <div
                    key={method.title}
                    className="p-4 rounded-xl bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee] font-semibold text-sm">
                        {index + 1}
                      </span>
                      <method.icon className="w-5 h-5 text-[#22d3ee]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{method.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{method.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/20">
                <p className="text-[#22d3ee] italic text-center">
                  `&quot;`Data-driven methods for robust, scalable insights.`&quot;`
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qualitative">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="  text-2xl text-[#e5e9f0] mb-2">
                  Qualitative Research
                </h3>
                <p className="text-[#22d3ee] font-medium mb-4">Deep human understanding</p>
                <p className="text-[#8a9bb5]">
                  Our qualitative methods uncover the `&apos;`why`&apos;` behind consumer behavior, providing rich narratives and
                  emotional insights that quantitative data alone cannot reveal.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {qualitativeMethods.map((method, index) => (
                  <div
                    key={method.title}
                    className="p-4 rounded-xl bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#14b8a6]/20 flex items-center justify-center text-[#14b8a6] font-semibold text-sm">
                        {index + 1}
                      </span>
                      <method.icon className="w-5 h-5 text-[#14b8a6]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{method.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="  text-2xl text-[#e5e9f0] mb-2">Research Support</h3>
                <p className="text-[#22d3ee] font-medium mb-4">End-to-end assistance</p>
                <p className="text-[#8a9bb5]">
                  From questionnaire design to final presentation, our support services ensure your research project
                  runs smoothly and delivers maximum impact.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {supportServices.map((service, index) => (
                  <div
                    key={service.title}
                    className="p-4 rounded-xl bg-[#1e293b]/50 hover:bg-[#1e293b] transition-colors group text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center mx-auto mb-3">
                      <service.icon className="w-6 h-6 text-[#22d3ee]" />
                    </div>
                    <h4 className="font-medium text-[#e5e9f0] text-sm mb-1">{service.title}</h4>
                    <p className="text-xs text-[#8a9bb5]">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Methodologies
