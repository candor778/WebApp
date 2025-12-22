"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Logo from "@/public/assets/candor-logo-transparent.png"

const Header = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active ? "text-white" : "text-[#8a9bb5] hover:text-[#e5e9f0]"
    }`

  const mobileLinkClass = (active: boolean) =>
    `text-lg font-medium transition-colors block py-3 text-left w-full ${
      active ? "text-white" : "text-[#8a9bb5] hover:text-[#e5e9f0]"
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1724]/80 border-b border-[#2a3f5f]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50" onClick={handleLinkClick}>
            <Image
              src={Logo}
              alt="Candor Survey"
              width={150}
              height={50}
              priority
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")} className={linkClass(false)}>
              About
            </button>
            <Link href="/services" className={linkClass(pathname === "/services")}>
              Services
            </Link>
            <Link href="/industry" className={linkClass(pathname === "/industry")}>
              Industry
            </Link>
            <button onClick={() => scrollToSection("contact")} className={linkClass(false)}>
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50 p-2 text-[#8a9bb5] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 bottom-0 w-64 bg-[#0f1724] border-l border-[#2a3f5f]/50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start px-6 py-8">
          <button
            onClick={() => scrollToSection("about")}
            className={mobileLinkClass(false)}
          >
            About
          </button>
          <Link 
            href="/services" 
            className={mobileLinkClass(pathname === "/services")}
            onClick={handleLinkClick}
          >
            Services
          </Link>
          <Link 
            href="/industry" 
            className={mobileLinkClass(pathname === "/industry")}
            onClick={handleLinkClick}
          >
            Industry
          </Link>
          <button
            onClick={() => scrollToSection("contact")}
            className={mobileLinkClass(false)}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header