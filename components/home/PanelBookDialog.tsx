import { useState } from "react";
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

  const generateAndDownloadPDF = () => {
    // Generate a simple PDF using a Blob
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 220 >>
stream
BT
/F1 24 Tf
50 700 Td
(Candor Survey Research) Tj
0 -40 Td
/F1 14 Tf
(Panel Book) Tj
0 -30 Td
/F1 12 Tf
(Thank you for your interest!) Tj
0 -20 Td
(We will contact you shortly.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000538 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
625
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Candor-Survey-Panel-Book.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate a brief delay then download
    setTimeout(() => {
      generateAndDownloadPDF();
      toast({
        title: "Panel Book Downloaded!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", contact: "", message: "" });
      setErrors({});
      setIsSubmitting(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Get Panel Book</DialogTitle>
          <DialogDescription>
            Fill in your details below to download our panel book.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="pb-name">Name *</Label>
            <Input
              id="pb-name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              maxLength={100}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pb-email">Email *</Label>
            <Input
              id="pb-email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              maxLength={255}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pb-contact">Contact Number *</Label>
            <Input
              id="pb-contact"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              maxLength={20}
            />
            {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pb-message">Message (optional)</Label>
            <Textarea
              id="pb-message"
              placeholder="Any additional details..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              maxLength={1000}
              rows={3}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full teal-gradient hover:opacity-90 text-white font-semibold"
          >
            {isSubmitting ? "Processing..." : "Download Panel Book"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PanelBookDialog;
