"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "@/public/assets/candor-logo-transparent.png";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white border-gray-200 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            
            src={Logo}
            alt="Candor Survey"
            width={180}
            height={60}
            priority
            className=" w-auto h-10 sm:h-12 small tablets md:h-14 tablets lg:h-16 xl:h-18"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          <a
            href="#about"
            className={`transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:text-[#0099ff]"
                : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            About
          </a>
          <a
            href="/services"
            className={`transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:text-[#0099ff]"
                : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Services
          </a>
          <a
            href="#industries"
            className={`transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:text-[#0099ff]"
                : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Industries
          </a>
          <a
            href="#contact"
            className={`transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:text-[#0099ff]"
                : "text-white/80 hover:text-[#0099ff]"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 -mr-2 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-white border-gray-200 shadow-lg"
            : "bg-[#1e3a8a]/95 backdrop-blur-lg"
        } border-t`}
      >
        <div className="px-4 py-6 flex flex-col gap-1 max-h-[calc(100vh-60px)] overflow-y-auto">
          <a
            href="#about"
            className={`py-3 px-4 rounded-lg transition-all duration-200 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100 hover:text-[#0099ff] active:bg-gray-200"
                : "text-white/90 hover:bg-white/10 hover:text-[#0099ff] active:bg-white/20"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="/services"
            className={`py-3 px-4 rounded-lg transition-all duration-200 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100 hover:text-[#0099ff] active:bg-gray-200"
                : "text-white/90 hover:bg-white/10 hover:text-[#0099ff] active:bg-white/20"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#industries"
            className={`py-3 px-4 rounded-lg transition-all duration-200 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100 hover:text-[#0099ff] active:bg-gray-200"
                : "text-white/90 hover:bg-white/10 hover:text-[#0099ff] active:bg-white/20"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Industries
          </a>
          <a
            href="#contact"
            className={`py-3 px-4 rounded-lg transition-all duration-200 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100 hover:text-[#0099ff] active:bg-gray-200"
                : "text-white/90 hover:bg-white/10 hover:text-[#0099ff] active:bg-white/20"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
