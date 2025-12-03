"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monitor, Globe, Calendar, User } from "lucide-react";

interface Respondent {
  id: string;
  projectId: string;
  userId?: string;
  ipAddress: string | null;
  deviceType: string | null;
  browserName: string | null;
  status: string;
  createdAt: string;
  completedAt: string | null;
  respondentName: string;
  respondentEmail: string | null;
  respondentPhone: string;
}

interface RespondentDetailDrawerProps {
  respondent: Respondent | null;
  surveyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RespondentDetailDrawer({
  respondent,
  surveyId,
  open,
  onOpenChange,
}: RespondentDetailDrawerProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-600">Completed</Badge>;

      case "TERMINATED":
        return <Badge variant="destructive">Terminated</Badge>;

      case "STARTED":
        return <Badge variant="secondary">Started</Badge>;

      case "QUOTA_FULL":
        return <Badge className="bg-yellow-500 text-black">Quota Full</Badge>;
      
      case "QUALITY_TERMINATED":
        return <Badge className="bg-orange-500 text-black">Quality_Terminated</Badge>;

      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!respondent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Response Details</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            ID: {respondent.id}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-100px)] px-6 pb-6">
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              {getStatusBadge(respondent.status)}
            </div>

            <Separator />

            {/* Respondent Info */}
            <div className="space-y-3">
              <h4 className="font-semibold">Respondent Information</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs">
                      User ID
                    </span>
                    <p className="font-mono">
                      {respondent.userId || respondent.respondentName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Technical Info */}
            <div className="space-y-3">
              <h4 className="font-semibold">Technical Details</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Submitted
                    </span>
                    <p>{new Date(respondent.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {respondent.completedAt && (
                  <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Completed
                      </span>
                      <p>{new Date(respondent.completedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                  <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Device
                    </span>
                    <p>
                      {respondent.browserName
                        ? respondent.browserName.charAt(0) +
                          respondent.browserName.slice(1).toLowerCase()
                        : "Unknown"}{" "}
                      on{" "}
                      {respondent.deviceType
                        ? respondent.deviceType.charAt(0) +
                          respondent.deviceType.slice(1).toLowerCase()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-xs">
                      IP Address
                    </span>
                    <p className="font-mono text-xs">
                      {respondent.ipAddress || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note about simplified schema */}
            <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p>
                This system captures metadata only. Survey answers are collected
                by the external survey tool.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
