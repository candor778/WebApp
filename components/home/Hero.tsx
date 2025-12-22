"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "500+", label: "Market Analysis" },
  { icon: Users, value: "200+", label: "Global Clients" },
  { icon: Target, value: "98%", label: "Success Rate" },
];

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/90 to-blue-900/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1628]/50 to-[#0a1628]" />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(229 233 240) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Uncovering the Truth</span>
            <br />
            <span className="bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] bg-clip-text text-transparent">
              Behind Every Data Point
            </span>
          </h1>
          <p className="hero-subtitle text-base md:text-lg text-[#8a9bb5] max-w-2xl mx-auto mb-10 leading-relaxed">
            We combine advanced data science with genuine human empathy to
            deliver unbiased, crystal-clear insights that empower your most
            critical business decisions.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#contact">
              <button
                className="
    inline-flex items-center justify-center gap-2
    whitespace-nowrap font-semibold
    ring-offset-background
    transition-all duration-300
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    bg-[linear-gradient(135deg,rgb(15,182,204)_0%,rgb(43,212,189)_100%)]
    shadow-lg shadow-primary/30
    hover:shadow-xl hover:shadow-[#0fb6cc4d]/40
    hover:scale-105
    h-12 px-8
    rounded-lg text-[#0f1729]
  "
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </a>

            <a href="/services">
              <button
                className="
    inline-flex items-center justify-center gap-2
    whitespace-nowrap font-medium
    ring-offset-background
    transition-all duration-300
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
    border-2 border-[#2b3b55]
    bg-[#0f1729]/50 hover:border-[#0fb6cc]/50
    backdrop-blur-sm
    h-12 px-8
    rounded-lg text-white
  "
              >
                Explore Services
              </button>
            </a>
          </div>
          {/* Stats */}
          <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-6 text-center transition-all duration-300 group bg-[#1a2942]/60 border border-[#2a3f5f]/50 backdrop-blur-sm hover:border-[#22d3ee]/40"
              >
                <stat.icon className="w-6 h-6 text-[#22d3ee] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#8a9bb5]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Fixed to bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
        <div className="animate-bounce">
          <div className="w-7 h-11 sm:w-8 sm:h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1724] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
