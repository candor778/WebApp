"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, LogIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/public/assets/candor-logo-transparent.png";

const Header = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1724]/80 backdrop-blur-xl border-b border-[#2a3f5f]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Candor Survey"
            width={150}
            height={50}
            priority
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto transition-all"
          />
        </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-[#8a9bb5] hover:text-[#e5e9f0] transition-colors text-sm font-medium"
            >
              About
            </button>
            <Link
              href="/services"
              className="text-[#8a9bb5] hover:text-[#e5e9f0] transition-colors text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/industry"
              className="text-[#8a9bb5] hover:text-[#e5e9f0] transition-colors text-sm font-medium"
            >
              Industry
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-[#8a9bb5] hover:text-[#e5e9f0] transition-colors text-sm font-medium"
            >
              Contact
            </button>
          </nav>

          <Button
            size="sm"
            className="hidden md:flex bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] text-[#0a1628] hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
