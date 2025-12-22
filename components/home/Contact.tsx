"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface FormData {
  fullName: string
  email: string
  phone: string
  company: string
  message: string
}

interface ToastState {
  show: boolean
  type: "success" | "error"
  message: string
}

interface Web3FormsResponse {
  success: boolean
  message?: string
}

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "88c1d037-376d-4731-a174-d57d6b20c176", // Use environment variable
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          subject: "New Contact Form Submission from Candor Survey",
          from_name: "Candor Survey Website",
        }),
      })

      const result: Web3FormsResponse = await response.json()

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        })
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-[#1e293b]/30 relative"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.03) 0%, transparent 40%)`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#e5e9f0] mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-[#8a9bb5] max-w-2xl mx-auto">
            Ready to transform your business with data-driven insights? Let&apos;s start a conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-[#e5e9f0] mb-4">Let&apos;s Work Together</h3>
              <p className="text-[#8a9bb5]">
                Whether you need market research, consumer insights, or competitive analysis, our team is ready to
                help you make informed decisions that drive growth.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+917688895925"
                className="flex items-center gap-4 p-4 backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-xl hover:border-[#22d3ee]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#0a1628]" />
                </div>
                <div>
                  <div className="text-sm text-[#8a9bb5]">Call Us</div>
                  <div className="text-[#e5e9f0] font-medium">+91 76888 95925</div>
                </div>
              </a>

              <a
                href="mailto:info@candorsurvey.com"
                className="flex items-center gap-4 p-4 backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-xl hover:border-[#22d3ee]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#0a1628]" />
                </div>
                <div>
                  <div className="text-sm text-[#8a9bb5]">Email Us</div>
                  <div className="text-[#e5e9f0] font-medium">Info@candorsurvey.com</div>
                </div>
              </a>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#22d3ee]/20 to-[#14b8a6]/20 rounded-2xl blur-xl opacity-50" />
              <Image
                src="https://images.pexels.com/photos/7691696/pexels-photo-7691696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-video"
                width={940}
                height={529}
                priority
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="backdrop-blur-xl border border-[#2a3f5f]/50 bg-[#1a2942]/80 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#e5e9f0] mb-2">
                  Full Name <span className="text-[#22d3ee]">*</span>
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="bg-[#1e293b]/50 border-[#2a3f5f] focus:border-[#22d3ee] text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#e5e9f0] mb-2">
                  Email Address <span className="text-[#22d3ee]">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#1e293b]/50 border-[#2a3f5f] focus:border-[#22d3ee] text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#e5e9f0] mb-2">
                  Phone Number <span className="text-[#22d3ee]">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-[#1e293b]/50 border-[#2a3f5f] focus:border-[#22d3ee] text-white"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#e5e9f0] mb-2">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-[#1e293b]/50 border-[#2a3f5f] focus:border-[#22d3ee] text-white"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#e5e9f0] mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-[#1e293b]/50 border-[#2a3f5f] focus:border-[#22d3ee] resize-none text-white"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] text-[#0a1628] hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact