"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface InfoPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  description: string
}

const InfoPopup = ({ isOpen, onClose, title, subtitle, description }: InfoPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-[#1e3a5f] to-[#1a2942] border-[#22d3ee]/20 text-[#e5e9f0]">
        <DialogHeader>
          <DialogTitle className="  text-2xl md:text-3xl text-[#e5e9f0]">
            {title}
          </DialogTitle>
          {subtitle && <p className="text-[#22d3ee] text-lg mt-2">{subtitle}</p>}
        </DialogHeader>
        <div className="mt-4 p-6 rounded-xl bg-[#1e3a5f]/80 border border-[#22d3ee]/10">
          <p className="text-[#8a9bb5] leading-relaxed">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InfoPopup
