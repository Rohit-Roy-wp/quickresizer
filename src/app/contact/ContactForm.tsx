"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Exam Preset Request",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "8f6054f0-0f24-4340-aa63-d2caa79bdeaa";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `[QuickResizer Support] ${formData.subject} - from ${formData.name}`,
          message: formData.message,
          from_name: "QuickResizer Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.message ||
            "Failed to send message. Please try again or email us directly at quickresizer.help@gmail.com."
        );
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please try again or email us directly at quickresizer.help@gmail.com."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-green-600 mb-2" />
        <h3 className="text-base font-bold text-green-900">Message Delivered!</h3>
        <p className="mt-1 text-xs text-green-700 max-w-sm mx-auto">
          Thank you for reaching out, {formData.name}. Your message has been sent to our support team at <strong>quickresizer.help@gmail.com</strong>. We review all inquiries within 24 to 48 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "Exam Preset Request", message: "" });
          }}
          className="mt-4 text-xs font-semibold text-blue-600 underline hover:text-blue-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Rahul Sharma"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
          Your Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. rahul@example.com"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
          Inquiry Type
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="Exam Preset Request">Request a New Exam Preset</option>
          <option value="Preset Update / Correction">Report a Notification Specification Change</option>
          <option value="Bug Report">Technical Issue / Bug Report</option>
          <option value="Advertising / Business">Advertising & Business Inquiries</option>
          <option value="General Feedback">General Feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your question, required exam dimensions, or the issue you experienced..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}

