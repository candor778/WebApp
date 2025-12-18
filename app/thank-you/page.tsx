"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"
import Logo from "@/public/assets/candor-survey-logo.png"
import { CheckCircle2, AlertTriangle } from "lucide-react"

function ThankYouContent() {
  const searchParams = useSearchParams()

  const projectId = searchParams.get("projectId")
  const userId = searchParams.get("userId")
  const status = searchParams.get("status")
  const ipAddress = searchParams.get("ipAddress")
  const responseId = searchParams.get("responseId")
  const isDuplicate = searchParams.get("duplicate") === "true"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b3750] via-[#2a4a63] to-[#1b3750] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTAgMThjMC0zLjMxNCAyLjY4Ni02IDYtNnM2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNnptMzYgMzZjMC0zLjMxNCAyLjY4Ni02IDYtNnM2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNnpNMCA1NGMwLTMuMzE0IDIuNjg2LTYgNi02czYgMi42ODYgNiA2LTIuNjg2IDYtNiA2LTYtMi42ODYtNi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full border-0 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
            <Image
              src={Logo}
              alt="Candor Survey"
              width={160}
              height={64}
              className="object-contain"
              priority
            />
        </div>

        {/* Status Header */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-6 shadow-lg ${
              isDuplicate
                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                : "bg-gradient-to-br from-green-400 to-emerald-500"
            }`}
          >
            {isDuplicate ? (
              <AlertTriangle className="w-10 h-10 text-white" />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-white" />
            )}
          </div>

          <h1 className="text-4xl font-bold text-[#1b3750] mb-3">
            {isDuplicate ? "Already Submitted" : "Thank You!"}
          </h1>

          <p className="text-lg text-[#1b3750]/70 max-w-md mx-auto">
            {isDuplicate
              ? "You have already submitted a response for this project."
              : "Your response has been recorded successfully."}
          </p>
        </div>

        {/* Response Details */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 flex-1 bg-gradient-to-r from-[#1b3750] to-transparent rounded"></div>
            <h2 className="text-xl font-semibold text-[#1b3750]">
              Response Details
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-[#1b3750] to-transparent rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-[#1b3750]/60 font-medium mb-2">Project ID</p>
              <p className="text-base font-mono font-semibold text-[#1b3750] break-all">
                {projectId || "N/A"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-[#1b3750]/60 font-medium mb-2">User ID</p>
              <p className="text-base font-mono font-semibold text-[#1b3750] break-all">
                {userId || "N/A"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-[#1b3750]/60 font-medium mb-2">Status</p>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                  status?.toLowerCase() === "completed"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : status?.toLowerCase() === "started"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                }`}
              >
                {status || "N/A"}
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-[#1b3750]/60 font-medium mb-2">IP Address</p>
              <p className="text-base font-mono font-semibold text-[#1b3750]">
                {ipAddress || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center pt-8 border-t border-[#1b3750]/10">
          <p className="text-[#1b3750]/60 mb-2">
            You can safely close this page now.
          </p>
          <p className="text-sm text-[#1b3750]/40">
            Thank you for participating in our survey
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

function ThankYouSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b3750] via-[#2a4a63] to-[#1b3750] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full animate-pulse">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-40 bg-gray-200 rounded-xl" />
        </div>
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6" />
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-6 w-80 bg-gray-200 rounded mx-auto" />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouSkeleton />}>
      <ThankYouContent />
    </Suspense>
  )
}