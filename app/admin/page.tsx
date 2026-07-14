"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import LeadCard from "./LeadCard";
import { STATUS_FILTERS, type Lead, type LeadStatus } from "./utils";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!user) {
      router.replace("/admin/login");
    }
  }, [authChecked, user, router]);

  useEffect(() => {
    if (!user) return;

    const leadsRef = collection(db, "leads");
    const q =
      statusFilter === "all"
        ? query(leadsRef, orderBy("createdAt", "desc"))
        : query(
            leadsRef,
            where("status", "==", statusFilter),
            orderBy("createdAt", "desc")
          );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setLeads(
          snapshot.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as Lead
          )
        );
        setLeadsLoading(false);
        setLeadsError(null);
      },
      (err) => {
        console.error("Failed to load leads:", err);
        setLeadsError("Failed to load leads.");
        setLeadsLoading(false);
      }
    );

    return unsubscribe;
  }, [user, statusFilter]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Redirecting to login…</p>
      </div>
    );
  }

  // Urgent leads float to the top; sort() is stable, so createdAt order is
  // preserved within each partition.
  const sortedLeads = [...leads].sort(
    (a, b) => Number(b.urgent ?? false) - Number(a.urgent ?? false)
  );

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Leads</h1>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>

        <div className="mx-auto mt-3 flex max-w-4xl gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === f.value
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
        {leadsError && (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {leadsError}
          </p>
        )}

        {leadsLoading ? (
          <p className="text-sm text-slate-500">Loading leads…</p>
        ) : sortedLeads.length === 0 ? (
          <p className="text-sm text-slate-500">
            No leads {statusFilter === "all" ? "yet" : "with this status"}.
          </p>
        ) : (
          <div className="space-y-4">
            {sortedLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
