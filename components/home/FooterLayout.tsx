import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/candor-logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f1724] border-t border-[#2a3f5f] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Candor Survey"
                width={180}
                height={60}
                priority
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all"
              />
            </Link>
            <p className="text-[#8a9bb5] text-sm">
              Uncovering the truth behind every data point. Your trusted partner
              in market research and consumer insights.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1e293b] hover:bg-[#22d3ee]/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#8a9bb5]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1e293b] hover:bg-[#22d3ee]/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-[#8a9bb5]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#1e293b] hover:bg-[#22d3ee]/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#8a9bb5]" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#e5e9f0] mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#methodologies"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Market Research
                </Link>
              </li>
              <li>
                <Link
                  href="/services#core-services"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Consumer Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/services#deep-dive"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Competitive Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Strategic Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#e5e9f0] mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services#process"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/services#methodologies"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Methodologies
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-[#8a9bb5] hover:text-[#22d3ee] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#e5e9f0] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-[#8a9bb5]">
                <Phone className="w-4 h-4 text-[#22d3ee]" />
                <a
                  href="tel:+91 88823 93935"
                  className="hover:text-white transition-colors"
                >
                  +91 88823 93935
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-[#8a9bb5]">
                <Mail className="w-4 h-4 text-[#22d3ee]" />
                <a
                  href="mailto:Infocandorsurvey@gmail.com"
                  className="hover:text-white transition-colors lowercase"
                >
                  Infocandorsurvey@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-[#8a9bb5]">
                <MapPin className="w-4 h-4 text-[#22d3ee] flex-shrink-0 mt-0.5" />
                Bhopal, MP - 462023
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a3f5f] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#8a9bb5]">
            © 2025 Candor Survey. All rights reserved.
          </p>
          <div className="flex md:mr-24">
            <a
              href="https://sanjeetfolio.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-white hover:underline"
            >
              Crafted By THE Dot.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
