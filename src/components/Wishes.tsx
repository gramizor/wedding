"use client";

import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

function MicIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-burgundy">
      <rect x="14" y="4" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 20a10 10 0 0020 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="30" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15" y1="36" x2="25" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-burgundy">
      <rect x="4" y="10" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 13l16 10 16-10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function Wishes() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 text-center font-script text-4xl text-burgundy sm:text-5xl">
          Пожелания
        </h2>
        <Divider className="mb-14" />

        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {/* Greetings */}
          <div className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <MicIcon />
            </div>
            <h3 className="mb-3 font-serif text-xl font-semibold text-text">
              {wedding.wishes.greeting.title}
            </h3>
            <p className="font-serif text-base leading-relaxed text-text/60 italic">
              {wedding.wishes.greeting.text}
            </p>
            <p className="mt-3 text-sm text-text/40">
              {wedding.wishes.greeting.contactNote}:
              {" "}
              <a
                href="tel:+79169074447"
                className="text-burgundy hover:text-burgundy-dark transition-colors"
              >
                +7 (916) 907 44-47
              </a>
            </p>
          </div>

          {/* Budget */}
          <div className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <EnvelopeIcon />
            </div>
            <h3 className="mb-3 font-serif text-xl font-semibold text-text">
              {wedding.wishes.budget.title}
            </h3>
            <p className="font-serif text-base leading-relaxed text-text/60 italic">
              {wedding.wishes.budget.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
