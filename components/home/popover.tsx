"use client";

import { X } from "lucide-react";

interface ProcessPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  additionalInfo: string;
}

export function ProcessPopover({
  isOpen,
  onClose,
  color,
  title,
  subtitle,
  fullDescription,
  additionalInfo,
}: ProcessPopoverProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        
        {/* Header */}
        <div
          className="p-4 sm:p-6 border-b flex justify-between items-start sticky top-0 bg-white rounded-t-xl sm:rounded-t-2xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <div className="pr-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1628] mb-1">
              {title}
            </h3>
            <p className="font-semibold text-sm sm:text-base" style={{ color }}>
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#0a1628] mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
              {fullDescription}
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#0a1628] mb-2">
              What We Deliver
            </h4>
            <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
              {additionalInfo}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg font-semibold text-white hover:shadow-lg transition"
              style={{ backgroundColor: color }}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
