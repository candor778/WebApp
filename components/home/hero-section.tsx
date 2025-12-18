"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-25 sm:pt-29 md:pt-21 pb-16 sm:pb-20 md:pb-12">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Headlines */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 px-2 leading-tight">
            Uncovering the Truth
          </h1>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 mb-4 sm:mb-6 md:mb-8 px-2 leading-tight">
            Behind Every Data Point
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-4">
            We combine advanced data science with genuine human empathy to
            deliver unbiased, crystal-clear insights that empower your most
            critical business decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 px-4">
            <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Get Started
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <a
              href="#services"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border-2 border-gray-300 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 active:bg-white/20 text-center shadow-lg hover:shadow-xl"
            >
              Explore Services
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            {/* Card 1 */}
            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20
    rounded-xl sm:rounded-2xl
    p-4 sm:p-5 md:p-6
    transition-all duration-700 delay-200
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    hover:bg-white/15 hover:scale-105 active:scale-95`}
            >
              <div className="flex justify-center mb-2 sm:mb-3">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 text-center">
                500+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm text-center">
                Market Analysis
              </div>
            </div>

            {/* Card 2 */}
            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20
    rounded-xl sm:rounded-2xl
    p-4 sm:p-5 md:p-6
    transition-all duration-700 delay-300
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    hover:bg-white/15 hover:scale-105 active:scale-95`}
            >
              <div className="flex justify-center mb-2 sm:mb-3">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 text-center">
                200+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm text-center">
                Global Clients
              </div>
            </div>

            {/* Card 3 */}
            <div
              className={`bg-white/10 backdrop-blur-sm border border-white/20
    rounded-xl sm:rounded-2xl
    p-4 sm:p-5 md:p-6
    transition-all duration-700 delay-400
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    hover:bg-white/15 hover:scale-105 active:scale-95`}
            >
              <div className="flex justify-center mb-2 sm:mb-3">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 text-center">
                98%
              </div>
              <div className="text-gray-300 text-xs sm:text-sm text-center">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Hidden on small phones */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="animate-bounce">
          <div className="w-7 h-11 sm:w-8 sm:h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
