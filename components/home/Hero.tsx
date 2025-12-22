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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0d1e36]/90 to-[#0a1628]/95" />
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
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-6">
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
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] text-[#0a1628] hover:opacity-90 transition-opacity"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a href="/services">
              <Button
                size="lg"
                className="px-8 bg-transparent border-2 border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee]/10"
              >
                Explore Services
              </Button>
            </a>
          </div>
          {/* Stats */}
          <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 md:mb-6 xl:mb-8 max-w-3xl mx-auto">
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
      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1724] to-transparent" />
    </section>
  );
};

export default Hero;
