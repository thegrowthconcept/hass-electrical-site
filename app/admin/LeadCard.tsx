"use client";

import { useState } from "react";
import {
  doc,
  updateDoc,
  deleteField,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  type Lead,
  type LeadStatus,
  SERVICE_LABELS,
  STATUS_LABELS,
  statusBadgeClass,
  formatRelativeTime,
  formatAbsoluteTime,
  formatCurrency,
  timestampToLocalInputValue,
} from "./utils";

const STATUS_OPTIONS: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "scheduled",
  "completed",
  "closed_lost",
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function LeadCard({ lead }: { lead: Lead }) {
  const [notesDraft, setNotesDraft] = useState(lead.adminNotes ?? "");
  const [notesDirty, setNotesDirty] = useState(false);
  const [quotedDraft, setQuotedDraft] = useState(
    lead.quotedAmount != null ? String(lead.quotedAmount) : ""
  );
  const [scheduledDraft, setScheduledDraft] = useState(
    timestampToLocalInputValue(lead.scheduledDate)
  );
  const [savingField, setSavingField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function saveFields(patch: Record<string, unknown>, field: string) {
    setSavingField(field);
    setError(null);
    try {
      await updateDoc(doc(db, "leads", lead.id), {
        ...patch,
        lastUpdatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(`Failed to save ${field}:`, err);
      setError("Failed to save. Try again.");
    } finally {
      setSavingField(null);
    }
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    saveFields({ status: event.target.value as LeadStatus }, "status");
  }

  function handleUrgentToggle() {
    saveFields({ urgent: !lead.urgent }, "urgent");
  }

  function handleNotesBlur() {
    if (notesDraft === (lead.adminNotes ?? "")) return;
    setNotesDirty(false);
    saveFields({ adminNotes: notesDraft }, "adminNotes");
  }

  function handleQuotedBlur() {
    const trimmed = quotedDraft.trim();
    if (trimmed === "") {
      if (lead.quotedAmount != null) {
        saveFields({ quotedAmount: deleteField() }, "quotedAmount");
      }
      return;
    }
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed) || parsed < 0) {
      setQuotedDraft(lead.quotedAmount != null ? String(lead.quotedAmount) : "");
      return;
    }
    if (parsed === lead.quotedAmount) return;
    saveFields({ quotedAmount: parsed }, "quotedAmount");
  }

  function handleScheduledBlur() {
    if (scheduledDraft === "") {
      if (lead.scheduledDate) {
        saveFields({ scheduledDate: deleteField() }, "scheduledDate");
      }
      return;
    }
    const date = new Date(scheduledDraft);
    if (Number.isNaN(date.getTime())) return;
    const current = lead.scheduledDate?.toDate().getTime();
    if (current === date.getTime()) return;
    saveFields({ scheduledDate: Timestamp.fromDate(date) }, "scheduledDate");
  }

  const created = lead.createdAt?.toDate() ?? null;
  const isPastNew = lead.status !== "new";

  return (
    <div
      className={`rounded-lg border p-4 shadow-sm sm:p-5 ${
        lead.urgent
          ? "border-red-300 bg-red-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              {lead.name}
            </h3>
            {lead.urgent && (
              <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                Urgent
              </span>
            )}
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(
                lead.status
              )}`}
            >
              {STATUS_LABELS[lead.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {SERVICE_LABELS[lead.service] ?? lead.service}
          </p>
        </div>

        {created && (
          <div className="shrink-0 text-right text-xs text-slate-500">
            <div>{formatRelativeTime(created)}</div>
            <div>{formatAbsoluteTime(created)}</div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <a
          href={telHref(lead.phone)}
          className="font-medium text-amber-700 hover:underline"
        >
          {lead.phone}
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="font-medium text-amber-700 hover:underline break-all"
        >
          {lead.email}
        </a>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
        {lead.message}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`status-${lead.id}`}
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Status
          </label>
          <select
            id={`status-${lead.id}`}
            value={lead.status}
            onChange={handleStatusChange}
            disabled={savingField === "status"}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Urgent
          </label>
          <button
            type="button"
            onClick={handleUrgentToggle}
            disabled={savingField === "urgent"}
            className={`mt-1 w-full rounded-md border px-3 py-2.5 text-sm font-semibold transition-colors ${
              lead.urgent
                ? "border-red-300 bg-red-100 text-red-700 hover:bg-red-200"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {lead.urgent ? "Unmark urgent" : "Mark urgent"}
          </button>
        </div>

        <div className={isPastNew ? "" : "opacity-70"}>
          <label
            htmlFor={`quoted-${lead.id}`}
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Quoted amount{" "}
            {quotedDraft && !Number.isNaN(Number(quotedDraft)) && (
              <span className="normal-case text-slate-400">
                ({formatCurrency(Number(quotedDraft))})
              </span>
            )}
          </label>
          <input
            id={`quoted-${lead.id}`}
            type="number"
            inputMode="decimal"
            min={0}
            step="1"
            placeholder="No quote yet"
            value={quotedDraft}
            onChange={(e) => setQuotedDraft(e.target.value)}
            onBlur={handleQuotedBlur}
            disabled={savingField === "quotedAmount"}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div
          className={
            lead.status === "scheduled"
              ? "rounded-md border border-teal-300 bg-teal-50 p-2"
              : ""
          }
        >
          <label
            htmlFor={`scheduled-${lead.id}`}
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Scheduled date
          </label>
          <input
            id={`scheduled-${lead.id}`}
            type="datetime-local"
            value={scheduledDraft}
            onChange={(e) => setScheduledDraft(e.target.value)}
            onBlur={handleScheduledBlur}
            disabled={savingField === "scheduledDate"}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor={`notes-${lead.id}`}
          className="block text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Admin notes {notesDirty && <span className="text-amber-600">(unsaved)</span>}
          {savingField === "adminNotes" && (
            <span className="text-slate-400"> (saving…)</span>
          )}
        </label>
        <textarea
          id={`notes-${lead.id}`}
          rows={2}
          value={notesDraft}
          onChange={(e) => {
            setNotesDraft(e.target.value);
            setNotesDirty(e.target.value !== (lead.adminNotes ?? ""));
          }}
          onBlur={handleNotesBlur}
          placeholder="Left voicemail, wants quote for 3 outlets…"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
