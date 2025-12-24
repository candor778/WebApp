import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Candor Survey",
    template: "%s | Candor Survey",
  },
  description: "Market research and consumer insights platform",

  metadataBase: new URL("https://candorsurvey.com"),

  icons: {
    icon: "/favicon.ico",          // 👈 Google Search icon
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Candor Survey",
    description: "Market research and consumer insights platform",
    url: "https://candorsurvey.com",
    siteName: "Candor Survey",
    images: [
      {
        url: "/assets/candor-survey-logo.png", // 👈 PREVIEW IMAGE
        width: 1200,
        height: 630,
        alt: "Candor Survey",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Candor Survey",
    description: "Market research and consumer insights platform",
    images: ["/assets/candor-survey-logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
