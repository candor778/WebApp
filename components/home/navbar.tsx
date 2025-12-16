"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Logo from "@/public/assets/candor-logo-transparent.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white border-gray-200 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Candor Survey"
            width={180}
            height={60}
            priority
            className="h-18 w-auto"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          <a
            href="#about"
            className={`transition-colors duration-300 ${
              isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            About
          </a>
          <a
            href="#services"
            className={`transition-colors duration-300 ${
              isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Services
          </a>
          <a
            href="#industries"
            className={`transition-colors duration-300 ${
              isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Industries
          </a>
          <a
            href="#contact"
            className={`transition-colors duration-300 ${
              isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isScrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden backdrop-blur-lg border-t ${
            isScrolled ? "bg-white border-gray-200" : "bg-[#1e3a8a]/95 border-[#0099ff]/20"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#about"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#methodology"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-700 hover:text-[#0099ff]" : "text-white/80 hover:text-[#0099ff]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Methodology
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
