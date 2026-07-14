import type { Timestamp } from "firebase/firestore";

export type ServiceKey =
  | "lighting"
  | "outlets"
  | "panel"
  | "breaker"
  | "fans"
  | "rewiring"
  | "troubleshooting"
  | "inspection"
  | "other";

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "scheduled"
  | "completed"
  | "closed_lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: ServiceKey;
  message: string;
  createdAt: Timestamp | null;
  status: LeadStatus;
  adminNotes?: string;
  quotedAmount?: number;
  scheduledDate?: Timestamp | null;
  urgent?: boolean;
  lastUpdatedAt?: Timestamp | null;
}

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  lighting: "Accent & Decorative Lighting",
  outlets: "Outlet & Switch Installation",
  panel: "Panel Upgrade",
  breaker: "Breaker Repair",
  fans: "Ceiling Fans & Fixtures",
  rewiring: "Whole-Home Rewiring",
  troubleshooting: "Troubleshooting & Repairs",
  inspection: "Inspection & Code Correction",
  other: "Other",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  scheduled: "Scheduled",
  completed: "Completed",
  closed_lost: "Closed – Lost",
};

export const STATUS_FILTERS: Array<{ value: LeadStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "closed_lost", label: "Closed Lost" },
];

const STATUS_BADGE_CLASSES: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  quoted: "bg-purple-100 text-purple-800",
  scheduled: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  closed_lost: "bg-slate-200 text-slate-600",
};

export function statusBadgeClass(status: LeadStatus): string {
  return STATUS_BADGE_CLASSES[status] ?? "bg-slate-200 text-slate-600";
}

export function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);

  if (diffSec < 60) return "just now";

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;

  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;

  const diffMonth = Math.round(diffDay / 30);
  return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
}

export function formatAbsoluteTime(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

// datetime-local inputs need "YYYY-MM-DDTHH:mm" in local time, no timezone suffix.
export function timestampToLocalInputValue(ts: Timestamp | null | undefined): string {
  if (!ts) return "";
  const d = ts.toDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
