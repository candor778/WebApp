"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/public/assets/candor-logo-transparent.png";
import LogoBlue from "@/public/assets/candor-survey-logo.png";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isIndustriesPage = pathname === "/industries";
  const aboutPage = pathname === "/about";


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  /* -------------------------
     Derived UI States
  -------------------------- */
  const showLightNavbar = isIndustriesPage || isScrolled || aboutPage;
  const currentLogo = showLightNavbar ? LogoBlue : Logo;
  const navTextColor = showLightNavbar
    ? "text-gray-900 hover:text-[#0099ff]"
    : "text-white hover:text-[#0099ff]";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showLightNavbar ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={currentLogo}
            alt="Candor Survey"
            width={180}
            height={60}
            priority
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          <Link href="/about" className={`transition-colors ${navTextColor}`}>
            About
          </Link>
          <Link href="/services" className={`transition-colors ${navTextColor}`}>
            Services
          </Link>
          <Link href="/industries" className={`transition-colors ${navTextColor}`}>
            Industries
          </Link>
          <Link href="/contact" className={`transition-colors ${navTextColor}`}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 -mr-2 ${
            showLightNavbar ? "text-gray-800" : "text-white"
          }`}
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

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 transition-all duration-300 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } bg-white border-t shadow-lg`}
      >
        <div className="px-4 py-6 flex flex-col gap-1">
          {["about", "services", "industries", "contact"].map((item) => (
            <Link
              key={item}
              href={item.startsWith("/") ? item : `/${item}`}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100 hover:text-[#0099ff] transition"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
