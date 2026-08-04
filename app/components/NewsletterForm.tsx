"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        setFeedbackMsg(result.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setFeedbackMsg(result.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("Failed to send request. Please check your connection.");
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubscribe}
        className="relative border-b border-white/20 pb-2.5 flex items-center justify-between w-full"
      >
        <input
          id="newsletter-email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          disabled={status === "loading"}
          className="w-full bg-transparent text-brand-cream placeholder-brand-cream focus:outline-none pr-8 font-sans disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe to newsletter"
          className="text-white/70 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 stroke-[1.75]" />
        </button>
      </form>

      {feedbackMsg && (
        <p
          className={`text-xs mt-2 font-sans ${
            status === "success" ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {feedbackMsg}
        </p>
      )}
    </div>
  );
}
