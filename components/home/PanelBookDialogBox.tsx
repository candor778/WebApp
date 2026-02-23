"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255),
  contact: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .max(20, "Contact number too long")
    .regex(/^[+\d\s\-()]+$/, "Invalid contact number"),
  message: z.string().trim().max(1000, "Message too long").optional(),
});

type FormData = z.infer<typeof formSchema>;

// ✅ Replace with your actual Cloudinary raw file URL
const PANEL_BOOK_URL =
  "https://res.cloudinary.com/dt5h8byda/raw/upload/pannelbook.pdf";

const PanelBookDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const downloadPanelBook = () => {
    const link = document.createElement("a");
    link.href = PANEL_BOOK_URL;
    link.download = "Candor-Survey-Panel-Book.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
            "88c1d037-376d-4731-a174-d57d6b20c176",
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: formData.message || "Panel Book download request",
          subject: "Panel Book Download Request - Candor Survey",
          from_name: "Candor Survey Website",
        }),
      });

      const data = await response.json();

      if (data.success) {
        downloadPanelBook();
        toast({
          title: "Panel Book Downloaded!",
          description: "Thank you for your interest. We'll be in touch soon.",
        });
        setFormData({ name: "", email: "", contact: "", message: "" });
        setErrors({});
        onOpenChange(false);
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0d1f35] border border-[#22d3ee]/20 text-[#e5e9f0] shadow-[0_0_60px_rgba(34,211,238,0.1)] overflow-hidden p-0">

        {/* Teal gradient accent bar at top */}
        <div className="h-1 w-full bg-gradient-to-r from-[#22d3ee] to-[#14b8a6]" />

        <div className="px-6 pb-6 pt-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] bg-clip-text text-transparent">
              Get Panel Book
            </DialogTitle>
            <DialogDescription className="text-[#8a9bb5]">
              Fill in your details below to download our panel book.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pb-name" className="text-[#c8d4e8] text-sm font-medium">Name *</Label>
              <Input
                id="pb-name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                className="bg-[#0a1628] border-[#2a3f5f] focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30 text-white placeholder:text-[#4a5f7a] h-10"
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pb-email" className="text-[#c8d4e8] text-sm font-medium">Email *</Label>
              <Input
                id="pb-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
                className="bg-[#0a1628] border-[#2a3f5f] focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30 text-white placeholder:text-[#4a5f7a] h-10"
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pb-contact" className="text-[#c8d4e8] text-sm font-medium">Contact Number *</Label>
              <Input
                id="pb-contact"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                maxLength={20}
                className="bg-[#0a1628] border-[#2a3f5f] focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30 text-white placeholder:text-[#4a5f7a] h-10"
              />
              {errors.contact && <p className="text-sm text-red-400">{errors.contact}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pb-message" className="text-[#c8d4e8] text-sm font-medium">
                Message <span className="text-[#4a5f7a] font-normal">(optional)</span>
              </Label>
              <Textarea
                id="pb-message"
                placeholder="Any additional details..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                maxLength={1000}
                rows={3}
                className="bg-[#0a1628] border-[#2a3f5f] focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30 resize-none text-white placeholder:text-[#4a5f7a]"
              />
              {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#22d3ee] to-[#14b8a6] hover:opacity-90 text-[#0a1628] font-semibold h-11 mt-2"
            >
              {isSubmitting ? "Processing..." : "Download Panel Book"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanelBookDialog;