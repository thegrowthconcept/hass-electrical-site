"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await addDoc(collection(db, "leads"), {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        service: formData.get("service"),
        message: formData.get("message"),
        createdAt: serverTimestamp(),
        status: "new",
      });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Failed to submit lead:", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Request a quote
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tell us a bit about the job and we&apos;ll get back to you to
            schedule a visit or provide an estimate.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-slate-200 p-8 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(704) 555-0123"
                  className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-slate-700"
              >
                Service needed
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="lighting">Accent & Decorative Lighting</option>
                <option value="outlets">Outlet & Switch Installation</option>
                <option value="panel">Panel Upgrade</option>
                <option value="breaker">Breaker Repair</option>
                <option value="fans">Ceiling Fans & Fixtures</option>
                <option value="rewiring">Whole-Home Rewiring</option>
                <option value="troubleshooting">
                  Troubleshooting & Repairs
                </option>
                <option value="inspection">
                  Inspection & Code Correction
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700"
              >
                Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us a bit about what you need done..."
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Sending..." : "Request a Quote"}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-green-600">
                Thanks! We&apos;ve received your request and will be in touch
                soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-600">
                Something went wrong sending your request. Please try again
                or call us directly.
              </p>
            )}
          </form>

          <div className="rounded-xl bg-slate-900 p-8 text-white lg:col-span-2">
            <h3 className="text-lg font-semibold">Contact us directly</h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-medium text-slate-400">Phone</dt>
                {/* TODO: replace with finalized business phone number */}
                <dd className="mt-1">
                  <a
                    href="tel:+17045550123"
                    className="text-base font-semibold text-white hover:text-amber-400"
                  >
                    (704) 555-0123
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Email</dt>
                {/* TODO: replace with finalized business email address */}
                <dd className="mt-1">
                  <a
                    href="mailto:info@hasselectricalnc.com"
                    className="text-base font-semibold text-white hover:text-amber-400"
                  >
                    info@hasselectricalnc.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Hours</dt>
                <dd className="mt-1 text-slate-200">
                  Mon&ndash;Fri: 7:00 AM &ndash; 6:00 PM
                  <br />
                  Saturday: By appointment
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Service Area</dt>
                <dd className="mt-1 text-slate-200">
                  Matthews, NC &amp; the greater Charlotte metro
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
