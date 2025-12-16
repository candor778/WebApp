"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add form submission logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact"  className="scroll-mt-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">
            Ready to transform your business with data-driven insights? Let's start a conversation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Let's Work Together</h3>
            <p className="text-gray-300 mb-12">
              Whether you need market research, consumer insights, or competitive analysis, our team is ready to help
              you make informed decisions that drive growth.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6 mb-8">
              {/* Phone Card */}
              <div className="bg-[#2a4a6f] p-6 rounded-xl flex items-center gap-4 hover:bg-[#345a82] transition-colors">
                <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Call Us</p>
                  <p className="text-white font-semibold text-lg">+91 76888 85925</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#2a4a6f] p-6 rounded-xl flex items-center gap-4 hover:bg-[#345a82] transition-colors">
                <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email Us</p>
                  <p className="text-white font-semibold text-lg">contact@candorsurvey.com</p>
                </div>
              </div>
            </div>

            {/* Team Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration meeting"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#2a4a6f] p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-medium mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-[#1e3a5f] text-white rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all placeholder:text-gray-500"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="w-full px-4 py-3 bg-[#1e3a5f] text-white rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all placeholder:text-gray-500"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-3 bg-[#1e3a5f] text-white rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all placeholder:text-gray-500"
                />
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="company" className="block text-white font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full px-4 py-3 bg-[#1e3a5f] text-white rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all placeholder:text-gray-500"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your research needs..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1e3a5f] text-white rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none placeholder:text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-cyan-400 text-[#1e3a5f] font-semibold py-4 rounded-lg hover:bg-cyan-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
