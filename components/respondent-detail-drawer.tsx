"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Monitor,
  Globe,
  Calendar,
  User,
  MapPin,
  Wifi,
  Clock,
  Smartphone,
  Hash,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldAlert,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

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
  country?: string | null;
  countryCode?: string | null;
  city?: string | null;
  state?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  isp?: string | null;
  timezone?: string | null;
}

interface RespondentDetailDrawerProps {
  respondent: Respondent | null;
  surveyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ── Pure helpers ──────────────────────────────────────────────────────────────

function getCountryFlag(code: string | null | undefined): string | null {
  if (!code || code === "Unknown" || code.length !== 2) return null;
  const upper = code.toUpperCase();
  return String.fromCodePoint(
    ...upper.split("").map((c) => 0x1f1e0 - 65 + c.charCodeAt(0))
  );
}

function isKnown(val: string | null | undefined): val is string {
  return !!val && val !== "Unknown" && val !== "-";
}

function titleCase(str: string | null | undefined): string {
  if (!str) return "Unknown";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ── Module-level sub-components ───────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    COMPLETED:          { label: "Completed",          cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: <CheckCircle2 className="h-3 w-3" /> },
    TERMINATED:         { label: "Terminated",         cls: "bg-red-500/10 text-red-600 border-red-500/20",            icon: <XCircle className="h-3 w-3" /> },
    STARTED:            { label: "Started",            cls: "bg-sky-500/10 text-sky-600 border-sky-500/20",            icon: <AlertCircle className="h-3 w-3" /> },
    QUOTA_FULL:         { label: "Quota Full",         cls: "bg-amber-500/10 text-amber-600 border-amber-500/20",      icon: <AlertCircle className="h-3 w-3" /> },
    QUALITY_TERMINATED: { label: "Quality Terminated", cls: "bg-violet-500/10 text-violet-600 border-violet-500/20",  icon: <ShieldAlert className="h-3 w-3" /> },
  };
  const { label, cls, icon } = cfg[status] ?? {
    label: status,
    cls: "bg-muted text-muted-foreground border-border",
    icon: null,
  };
  return (
    <span className={cn(
      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      cls
    )}>
      {icon}{label}
    </span>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      "pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60",
      className
    )}>
      {children}
    </p>
  );
}

function InfoRow({
  icon, label, value, mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/40">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </span>
      {/* min-w-0 is critical — without it flex children don't shrink below content size */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </p>
        <p className={cn(
          "mt-0.5 break-all text-sm leading-snug text-foreground",
          mono && "font-mono text-xs"
        )}>
          {value}
        </p>
      </div>
    </div>
  );
}

function StatPill({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-lg border bg-muted/30 px-3 py-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </span>
      <span
        className={cn("truncate text-sm font-medium text-foreground", mono && "font-mono text-xs")}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function RespondentDetailDrawer({
  respondent,
  surveyId,
  open,
  onOpenChange,
}: RespondentDetailDrawerProps) {
  if (!respondent) return null;

  const flag          = getCountryFlag(respondent.countryCode);
  const hasCoords     = isKnown(respondent.latitude) && isKnown(respondent.longitude);
  const mapsUrl       = hasCoords
    ? `https://www.google.com/maps?q=${respondent.latitude},${respondent.longitude}`
    : null;
  const locationParts = [respondent.city, respondent.state, respondent.country]
    .filter(isKnown)
    .join(", ");
  const displayName   = respondent.userId || respondent.respondentName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/*
        Layout contract:
        ┌─ DialogContent (flex col, fixed height, overflow-hidden) ─┐
        │  Header (shrink-0)                                         │
        │  ┌─ Tabs wrapper (flex-1, min-h-0, overflow-hidden) ──┐   │
        │  │  Tab bar (shrink-0)                                 │   │
        │  │  ScrollArea (flex-1, min-h-0) ← only this scrolls  │   │
        │  └─────────────────────────────────────────────────────┘   │
        └────────────────────────────────────────────────────────────┘
      */}
      <DialogContent className="flex h-[88vh] max-h-[88vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <DialogHeader className="shrink-0 border-b px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3 pr-5">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-semibold leading-tight">
                Response Details
              </DialogTitle>
              <DialogDescription className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                {respondent.id}
              </DialogDescription>
            </div>
            <StatusBadge status={respondent.status} />
          </div>

          {/* Identity strip */}
          <div className="mt-3 flex min-w-0 items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="min-w-0 truncate font-mono text-xs font-medium text-foreground">
              {displayName}
            </span>
            {flag && (
              <>
                <span className="shrink-0 text-muted-foreground/30">·</span>
                <span className="shrink-0 text-base leading-none">{flag}</span>
              </>
            )}
            {locationParts && (
              <span className="min-w-0 truncate text-xs text-muted-foreground">
                {locationParts}
              </span>
            )}
          </div>
        </DialogHeader>

        {/* ── Tabs ───────────────────────────────────────────────────── */}
        <Tabs
          defaultValue="overview"
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          {/* Tab bar — never scrolls */}
          <div className="shrink-0 border-b px-5 py-2.5">
            <TabsList className="h-8 rounded-lg bg-muted p-0.5">
              <TabsTrigger value="overview"  className="h-7 rounded-md px-3 text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="geo"       className="h-7 rounded-md px-3 text-xs">
                <MapPin className="mr-1 h-3 w-3" />Location
              </TabsTrigger>
              <TabsTrigger value="technical" className="h-7 rounded-md px-3 text-xs">
                Technical
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Scrollable content area */}
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-5 pb-8 pt-1">

              {/* ── Overview tab ───────────────────────────────────── */}
              <TabsContent value="overview" className="mt-0">
                <SectionLabel>Identity</SectionLabel>
                <InfoRow icon={<User className="h-3.5 w-3.5" />}     label="User ID"    value={displayName}          mono />
                <InfoRow icon={<Hash className="h-3.5 w-3.5" />}     label="Project ID" value={respondent.projectId} mono />

                <SectionLabel>Timeline</SectionLabel>
                <InfoRow
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  label="Submitted"
                  value={new Date(respondent.createdAt).toLocaleString()}
                />
                {respondent.completedAt && (
                  <InfoRow
                    icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                    label="Completed"
                    value={new Date(respondent.completedAt).toLocaleString()}
                  />
                )}

                <SectionLabel>Device</SectionLabel>
                <InfoRow
                  icon={<Smartphone className="h-3.5 w-3.5" />}
                  label="Browser · Device"
                  value={`${titleCase(respondent.browserName)} on ${titleCase(respondent.deviceType)}`}
                />
                <InfoRow
                  icon={<Globe className="h-3.5 w-3.5" />}
                  label="IP Address"
                  value={respondent.ipAddress || "Unknown"}
                  mono
                />

                {locationParts && (
                  <>
                    <SectionLabel>Location</SectionLabel>
                    <InfoRow
                      icon={flag
                        ? <span className="text-base leading-none">{flag}</span>
                        : <MapPin className="h-3.5 w-3.5" />}
                      label="Country · State · City"
                      value={locationParts}
                    />
                  </>
                )}
              </TabsContent>

              {/* ── Location tab ───────────────────────────────────── */}
              <TabsContent value="geo" className="mt-0 space-y-2">
                {/* Hero card */}
                <div className="mt-1 overflow-hidden rounded-xl border bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 p-4">
                  <div className="flex items-start gap-3">
                  
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-foreground">
                        {isKnown(respondent.country) ? respondent.country : "Unknown Country"}
                      </p>
                      {locationParts && (
                        <p className="mt-0.5 truncate text-sm text-muted-foreground" title={locationParts}>
                          {locationParts}
                        </p>
                      )}
                      {isKnown(respondent.countryCode) && (
                        <span className="mt-1.5 inline-block rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {respondent.countryCode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-500/20 dark:text-sky-400"
                    >
                      <Navigation className="h-3 w-3" />
                      Open in Google Maps
                    </a>
                  )} */}
                </div>

                {hasCoords && (
                  <div className="grid grid-cols-2 gap-2">
                    <StatPill label="Latitude"  value={respondent.latitude!}  mono />
                    <StatPill label="Longitude" value={respondent.longitude!} mono />
                  </div>
                )}

                <SectionLabel className="pt-1">Network</SectionLabel>
                <InfoRow icon={<Globe className="h-3.5 w-3.5" />} label="IP Address"
                  value={respondent.ipAddress || "Unknown"} mono />
                <InfoRow icon={<Wifi className="h-3.5 w-3.5" />}  label="ISP"
                  value={isKnown(respondent.isp) ? respondent.isp : "Unknown"} />
                <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Timezone"
                  value={isKnown(respondent.timezone) ? respondent.timezone : "Unknown"} />
              </TabsContent>

              {/* ── Technical tab ──────────────────────────────────── */}
              <TabsContent value="technical" className="mt-0">
                <SectionLabel>Device</SectionLabel>
                <InfoRow icon={<Smartphone className="h-3.5 w-3.5" />} label="Device Type"
                  value={titleCase(respondent.deviceType)} />
                <InfoRow icon={<Monitor className="h-3.5 w-3.5" />}    label="Browser"
                  value={titleCase(respondent.browserName)} />

                <SectionLabel>Network</SectionLabel>
                <InfoRow icon={<Globe className="h-3.5 w-3.5" />} label="IP Address"
                  value={respondent.ipAddress || "Unknown"} mono />
                <InfoRow icon={<Wifi className="h-3.5 w-3.5" />}  label="ISP"
                  value={isKnown(respondent.isp) ? respondent.isp : "Unknown"} />

                <SectionLabel>Timestamps</SectionLabel>
                <InfoRow
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  label="Created At"
                  value={new Date(respondent.createdAt).toLocaleString()}
                />
                {respondent.completedAt && (
                  <InfoRow
                    icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                    label="Completed At"
                    value={new Date(respondent.completedAt).toLocaleString()}
                  />
                )}

                <Separator className="my-4" />
                <p className="rounded-lg bg-muted/40 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                  This system captures metadata only. Survey answers are collected by the external survey tool.
                </p>
              </TabsContent>

            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}