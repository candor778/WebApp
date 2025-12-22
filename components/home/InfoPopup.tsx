"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InfoPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  description: string
}

const InfoPopup = ({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
}: InfoPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-gradient-to-br
          from-[hsl(220,50%,15%)]
          to-[hsl(220,50%,20%)]
          border-[#0fb6cc33]/20
          text-white
        "
      >
        {/* Header */}
        <DialogHeader className="flex flex-col space-y-1.5 text-center sm:text-left text-white">
          <DialogTitle
            className="
              font-serif
              text-2xl
              md:text-3xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            {title}
          </DialogTitle>

          {subtitle && (
            <p className="text-[#0fb6cc] text-lg mt-2">
              {subtitle}
            </p>
          )}
        </DialogHeader>

        {/* Description Card */}
        <div
          className="
            mt-4
            p-6
            rounded-xl
            bg-[hsl(220,50%,18%)]
            border
            border-[#0fb6cc33]/10
          "
        >
          <p className="text-white leading-relaxed">
            {description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InfoPopup
