"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Uncovering the Truth
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-400 mb-6">
            Behind Every Data Point
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            We combine advanced data science with genuine human empathy to deliver unbiased, crystal-clear insights that
            empower your most critical business decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button className="group relative px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Get Started
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#services" className="px-8 py-3 bg-transparent border-2 border-gray-400 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10">
              Explore Services
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:bg-white/15 hover:scale-105`}
            >
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-300 text-sm">Market Analysis</div>
            </div>

            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:bg-white/15 hover:scale-105`}
            >
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-gray-300 text-sm">Global Clients</div>
            </div>

            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} hover:bg-white/15 hover:scale-105`}
            >
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
