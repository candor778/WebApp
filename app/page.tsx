"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Target,
  Zap,
  Compass,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whyChooseItems = [
    {
      icon: Eye,
      title: "Deep Market Insights",
      description:
        "Our proprietary research methods reveal hidden consumer behaviors and market trends.",
    },
    {
      icon: Zap,
      title: "Rapid Turnaround",
      description:
        "Fast, efficient research processes without compromising on quality or depth of analysis.",
    },
    {
      icon: Compass,
      title: "Strategic Guidance",
      description:
        "Beyond data - we provide strategic recommendations tailored to your business goals.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Track record of delivering research that directly impacts revenue and market position.",
    },
  ];

  const services = [
    {
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Consumer Research",
      description: "Understand your target audience better",
    },
    {
      image:
        "https://images.pexels.com/photos/3182815/pexels-photo-3182815.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Market Analysis",
      description: "Competitive intelligence and market trends",
    },
    {
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Brand Perception",
      description: "How the market sees your brand",
    },
    {
      image:
        "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product Testing",
      description: "Validate concepts before market launch",
    },
  ];

  const methodItems = [
    { icon: Users, label: "Focus Groups" },
    { icon: BarChart3, label: "Surveys" },
    { icon: Target, label: "Interviews" },
    { icon: TrendingUp, label: "Analytics" },
    { icon: Eye, label: "Monitoring" },
    { icon: Compass, label: "Strategy" },
  ];

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 153, 255, 0.2);
        }
        .gradient-hero {
          background: linear-gradient(
            to bottom right,
            #0a1628,
            #0f1f35,
            #1a2f4d
          );
        }
        .text-glow {
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(to right, #0099ff, #00d4ff);
        }
        .btn-primary {
          padding: 0.75rem 1.5rem;
          background-color: #0099ff;
          color: white;
          font-weight: 600;
          border-radius: 0.25rem;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          background-color: #00d4ff;
          transform: scale(1.05);
        }
        .btn-primary:active {
          transform: scale(0.95);
        }
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border: 2px solid #0099ff;
          color: #0099ff;
          font-weight: 600;
          border-radius: 0.25rem;
          transition: all 0.3s;
          background: transparent;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: #0099ff;
          color: white;
        }
        .card-dark {
          background-color: #0f1f35;
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.3s;
        }
        .card-dark:hover {
          box-shadow: 0 10px 25px rgba(0, 153, 255, 0.3);
        }
        .card-blue {
          background: linear-gradient(to bottom right, #0099ff, #00d4ff);
          border-radius: 0.5rem;
          padding: 1.5rem;
          color: white;
        }
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex !important;
          }
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .md\\:order-1 {
            order: 1;
          }
          .md\\:order-2 {
            order: 2;
          }
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <nav
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "rgba(10, 22, 40, 0.8)",
            backdropFilter: "blur(12px)",
            zIndex: 50,
            borderBottom: "1px solid rgba(0, 153, 255, 0.2)",
          }}
        >
          <div
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              padding: "1rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              src="/assets/candor-logo-transparent.png"
              alt="Candor Survey"
              width={150}
              height={40}
              style={{ height: "auto" }}
            />
            <div style={{ display: "none", gap: "2rem" }} className="md:flex">
              {["about", "services", "methodology"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    transition: "color 0.3s",
                    textTransform: "capitalize",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0099ff")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section
          className="gradient-hero"
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            paddingTop: "5rem",
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div
              className="animate-float"
              style={{
                position: "absolute",
                top: "5rem",
                right: 0,
                width: "24rem",
                height: "24rem",
                backgroundColor: "rgba(0, 153, 255, 0.1)",
                borderRadius: "9999px",
                filter: "blur(80px)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "-8rem",
                left: 0,
                width: "24rem",
                height: "24rem",
                backgroundColor: "rgba(0, 212, 255, 0.05)",
                borderRadius: "9999px",
                filter: "blur(80px)",
              }}
            ></div>
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "72rem",
              margin: "0 auto",
              padding: "8rem 1.5rem",
              textAlign: "center",
            }}
          >
            <h1
              className="animate-fadeInDown"
              style={{
                fontSize: "clamp(3rem, 7vw, 4.5rem)",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1.5rem",
                lineHeight: 1.2,
              }}
            >
              Uncovering the <span className="text-glow">Truth</span>
            </h1>
            <p
              className="animate-fadeIn"
              style={{
                fontSize: "1.5rem",
                color: "#00d4ff",
                marginBottom: "0.5rem",
                animationDelay: "0.2s",
              }}
            >
              Behind Every Data Point
            </p>
            <p
              className="animate-fadeIn"
              style={{
                fontSize: "1.125rem",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "3rem",
                maxWidth: "42rem",
                margin: "0 auto 3rem",
                animationDelay: "0.4s",
              }}
            >
              Transform raw data into actionable insights with precision
              research methodologies backed by expert analysis
            </p>
            <div
              className="animate-fadeInUp"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1.5rem",
                justifyContent: "center",
                marginBottom: "4rem",
                animationDelay: "0.6s",
                flexWrap: "wrap",
              }}
            >
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
            <div
              className="animate-fadeInUp"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
                marginTop: "5rem",
                animationDelay: "0.8s",
              }}
            >
              {[
                { icon: BarChart3, label: "Analytics" },
                { icon: Users, label: "Research" },
                { icon: Target, label: "Insights" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    className="hover-lift"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      backgroundColor: "rgba(0, 153, 255, 0.2)",
                      borderRadius: "9999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <item.icon
                      style={{
                        width: "2rem",
                        height: "2rem",
                        color: "#0099ff",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-[#0a1628] mb-16 text-center">
              About Candor Survey
            </h2>

            {/* Top content */}
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
              <div className="animate-slideInLeft">
                <img
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg hover-lift w-full"
                />
              </div>

              <div className="animate-slideInRight">
                <p className="text-lg text-[#4b5563] leading-relaxed mb-6">
                  We are a dedicated team of market research professionals
                  committed to delivering exceptional insights. Our approach
                  combines cutting-edge methodology with human expertise to
                  uncover the truth behind every data point.
                </p>
                <p className="text-lg text-[#4b5563] leading-relaxed">
                  With over a decade of experience across diverse industries,
                  we&apos;ve helped hundreds of organizations make data-driven
                  decisions that transform their business outcomes.
                </p>
              </div>
            </div>

            {/* Bottom cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-blue hover-lift">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  Our Mission
                </h3>
                <p className="leading-relaxed">
                  To provide comprehensive market research solutions that
                  empower businesses with genuine insights and competitive
                  advantages in their industries.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-lg p-6 text-white hover-lift">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  Our Values
                </h3>
                <p className="leading-relaxed">
                  We believe in transparency, accuracy, and delivering
                  actionable intelligence that drives real business growth and
                  measurable success.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 gradient-hero">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">
              Why Choose Candor Survey?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {whyChooseItems.map((item, idx) => (
                <div
                  key={idx}
                  className="card-dark hover-lift group"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <item.icon className="w-12 h-12 text-[#0099ff] mb-4 group-hover:scale-110 transition-transform" />

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f9fafb]">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-[#0a1628] mb-6">
                Our Research <span className="text-glow">Process</span>
              </h2>

              <div className="flex justify-center mb-6">
                <div className="h-1 w-20 bg-[#0099ff] rounded-full" />
              </div>

              <p className="text-lg text-[#4b5563]">
                A systematic approach to delivering exceptional insights
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-20">
              {[
                {
                  num: "01",
                  icon: Users,
                  title: "Listen & Align",
                  subtitle: "We start by understanding you",
                  desc: "We don't just take orders; we are partnering with you. We sit down to understand your business goals, your specific challenges, and exactly what you need to learn. We ask tough questions to ensure our research strategy is perfectly aligned with your objectives.",
                  img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
                  color: "#0099ff",
                  order: false,
                },
                {
                  num: "02",
                  icon: Eye,
                  title: "Research & Gather",
                  subtitle: "We go where the data is",
                  desc: "Using our global network, we reach out to the right people—whether that's hard-to-find C-suite executives, medical specialists, or everyday consumers.",
                  img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
                  color: "#06b6d4",
                  order: true,
                },
                {
                  num: "03",
                  icon: BarChart3,
                  title: "Analyze & Deliver",
                  subtitle: "We turn data into direction",
                  desc: "Data without context is just noise. We rigorously scrub, validate, and analyze the data to find the patterns that matter.",
                  img: "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=600",
                  color: "#0066cc",
                  order: false,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    step.order ? "animate-slideInRight" : "animate-slideInLeft"
                  }`}
                >
                  <div className={step.order ? "md:order-2" : ""}>
                    <img
                      src={step.img}
                      alt={step.title}
                      className="rounded-2xl shadow-lg hover-lift h-80 w-full object-cover"
                    />
                  </div>

                  <div className={step.order ? "md:order-1" : ""}>
                    <div className="flex items-start gap-6">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            step.num === "03"
                              ? "linear-gradient(to bottom right, #0066cc, #0099ff)"
                              : step.color,
                        }}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </div>

                      <div className="flex-1">
                        <div
                          className="text-5xl font-bold mb-2"
                          style={{ color: step.color }}
                        >
                          {step.num}
                        </div>
                        <h3 className="text-3xl font-bold text-[#0a1628] mb-3">
                          {step.title}
                        </h3>
                        <p
                          className="font-semibold mb-4"
                          style={{ color: step.color }}
                        >
                          {step.subtitle}
                        </p>
                        <p className="text-[#4b5563] leading-relaxed mb-4">
                          {step.desc}
                        </p>
                        <a
                          href="#"
                          className="font-semibold flex items-center gap-2"
                          style={{ color: step.color }}
                        >
                          Click to learn more <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f9fafb]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slideInLeft">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Research showcase"
                  className="rounded-lg shadow-lg hover-lift w-full"
                />
              </div>

              <div className="animate-slideInRight">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0099ff] flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0a1628] mb-2">
                      Advanced Analytics
                    </h3>
                    <p className="text-[#4b5563]">
                      Leveraging AI-powered tools to extract deeper insights
                      from research data and identify emerging patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 gradient-hero">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              Our Services
            </h2>

            <p className="text-[#00d4ff] text-center mb-16 max-w-2xl mx-auto">
              Comprehensive research solutions tailored to your business needs
            </p>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer overflow-hidden rounded-lg hover-lift"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0a1628]/60 group-hover:bg-[#0a1628]/40 transition-all" />
                  </div>

                  <div className="p-6 bg-[#0f1f35]">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/70">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Methods Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {methodItems.map((item, idx) => (
                <div
                  key={idx}
                  className="card-dark hover-lift text-center"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <item.icon className="w-10 h-10 text-[#0099ff] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="methodology" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-[#0a1628] mb-16 text-center">
              Research Methodology
            </h2>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left */}
              <div className="lg:w-1/2 animate-slideInLeft">
                <div className="card-dark">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Our Approach
                  </h3>

                  <div className="space-y-4">
                    {[
                      "Comprehensive problem definition and research design",
                      "Multi-method data collection strategies",
                      "Advanced statistical and qualitative analysis",
                      "Strategic insight synthesis and recommendation",
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#0099ff] flex items-center justify-center flex-shrink-0 text-[#0a1628] font-bold text-sm mt-1">
                          {idx + 1}
                        </div>
                        <p className="text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="lg:w-1/2 animate-slideInRight">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Methodology"
                  className="rounded-lg shadow-lg hover-lift w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="gradient-hero"
          style={{
            padding: "5rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "2.5rem",
                width: "24rem",
                height: "24rem",
                backgroundColor: "rgba(0, 212, 255, 0.05)",
                borderRadius: "9999px",
                filter: "blur(80px)",
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "48rem",
              margin: "0 auto",
              padding: "0 1.5rem",
              textAlign: "center",
            }}
          >
            <h2
              className="animate-fadeInDown"
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1.5rem",
              }}
            >
              Ready to Uncover Your Insights?
            </h2>

            <p
              className="animate-fadeIn"
              style={{
                fontSize: "1.25rem",
                color: "#00d4ff",
                marginBottom: "2.5rem",
                animationDelay: "0.2s",
              }}
            >
              Let`&apos;`s transform your business with data-driven decisions
            </p>

            <button
              className="btn-primary animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              Start Your Research Journey
            </button>
          </div>
        </section>

        <footer className="bg-[#0a1628] border-t border-[#0099ff]/20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h4 className="text-white font-bold mb-4">Candor Survey</h4>
                <p className="text-white/60 text-sm">
                  Leading provider of market research and consumer insights.
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>
                    <a
                      href="#services"
                      className="hover:text-[#0099ff] transition"
                    >
                      Consumer Research
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-[#0099ff] transition"
                    >
                      Market Analysis
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-[#0099ff] transition"
                    >
                      Brand Research
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>
                    <a
                      href="#about"
                      className="hover:text-[#0099ff] transition"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#methodology"
                      className="hover:text-[#0099ff] transition"
                    >
                      Methodology
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#0099ff] transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <p className="text-white/60 text-sm">Email: info@candor.com</p>
                <p className="text-white/60 text-sm">
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#0099ff]/20 pt-8 text-center text-white/50 text-sm">
              <p>&copy; 2024 Candor Survey. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
