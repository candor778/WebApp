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
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Ready to transform your business with data-driven insights? Let’s
            start a conversation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              Let’s Work Together
            </h3>

            <p className="text-gray-300 mb-10 text-sm sm:text-base leading-relaxed">
              Whether you need market research, consumer insights, or competitive
              analysis, our team is ready to help you make informed decisions
              that drive growth.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 sm:space-y-6 mb-10">
              {/* Phone */}
              <div className="bg-[#2a4a6f] p-5 sm:p-6 rounded-xl flex items-center gap-4 hover:bg-[#345a82] transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a5f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Call Us</p>
                  <p className="font-semibold text-sm sm:text-lg">
                    +91 76888 85925
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#2a4a6f] p-5 sm:p-6 rounded-xl flex items-center gap-4 hover:bg-[#345a82] transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a5f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Email Us</p>
                  <p className="font-semibold text-sm sm:text-lg">
                    contact@candorsurvey.com
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-52 sm:h-64 md:h-72 object-cover"
              />
            </div>
          </div>

          {/* Right Column – Form */}
          <div className="bg-[#2a4a6f] p-6 sm:p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Full Name", name: "fullName", required: true },
                { label: "Email Address", name: "email", type: "email", required: true },
                { label: "Phone Number", name: "phone", required: true },
                { label: "Company Name", name: "company" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </label>
                  <input
                    type={field.type ?? "text"}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 bg-[#1e3a5f] rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none placeholder:text-gray-500"
                  />
                </div>
              ))}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1e3a5f] rounded-lg border border-[#3a5a7f] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none resize-none placeholder:text-gray-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-cyan-400 text-[#1e3a5f] font-semibold py-3.5 rounded-lg hover:bg-cyan-300 transition transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
