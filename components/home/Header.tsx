"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/public/assets/candor-logo-transparent.png"

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

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active
        ? "text-white"
        : "text-[#8a9bb5] hover:text-[#e5e9f0]"
    }`

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

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Home Sections */}
            <button
              onClick={() => scrollToSection("about")}
              className={linkClass(false)}
            >
              About
            </button>

            {/* Routes */}
            <Link href="/services" className={linkClass(pathname === "/services")}>
              Services
            </Link>

            <Link href="/industry" className={linkClass(pathname === "/industry")}>
              Industry
            </Link>

            <button
              onClick={() => scrollToSection("contact")}
              className={linkClass(false)}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
