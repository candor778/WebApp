import Link from "next/link"
import { Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">CANDOR SURVEY</h3>
                <p className="text-xs text-cyan-300">Market Research Excellence</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Uncovering truth through data-driven insights. Your strategic partner in navigating market complexity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#industries" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-300" />
                <span className="text-sm text-gray-300">+91 76888 95925</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-300" />
                <span className="text-sm text-gray-300">contact@candorsurvey.com</span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-800/50 rounded-lg flex items-center justify-center hover:bg-cyan-400 hover:text-blue-900 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-800/50 rounded-lg flex items-center justify-center hover:bg-cyan-400 hover:text-blue-900 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-800/50 rounded-lg flex items-center justify-center hover:bg-cyan-400 hover:text-blue-900 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-blue-700/50 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 Candor Survey. All rights reserved. | Uncovering Truth Through Data Driven Insights
          </p>
        </div>
      </div>
    </footer>
  )
}
