"use client";

import { wedding } from "@/config/wedding";
import { BotanicalWreath } from "@/components/decorative/BotanicalWreath";
const strokeImages = ["/first-colored.svg", "/second-colored.svg", "/third-colored.svg"];
import { TimelineIcon } from "@/components/decorative/TimelineIcon";

export default function MemoPage() {
  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Download button — hidden in print */}
      <div className="no-print fixed top-6 right-6 z-50">
        <button
          onClick={() => window.print()}
          className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-medium text-card shadow-lg transition-colors hover:bg-burgundy-dark cursor-pointer"
        >
          Скачать PDF
        </button>
      </div>

      <div className="mx-auto max-w-[600px] bg-ivory px-10 py-16 print:max-w-none print:px-12 print:py-10">
        {/* Header */}
        <div className="relative flex flex-col items-center text-center mb-12">
          <BotanicalWreath className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-[52%] opacity-40" />
          <div className="relative z-10">
            <h1 className="font-script text-5xl text-burgundy leading-tight">
              {wedding.couple.name1}
              <span className="mx-2 font-serif text-[0.6em] italic text-taupe">&</span>
              {wedding.couple.name2}
            </h1>
            <p className="mt-4 font-serif text-lg tracking-[0.15em] text-text/70">
              11 августа 2026
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="h-px w-24 bg-taupe/50" />
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="mb-6 text-center font-script text-3xl text-burgundy">
            Программа дня
          </h2>
          <div className="space-y-5">
            {wedding.timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-4">
                <TimelineIcon icon={event.icon} className="mt-0.5 size-5 shrink-0 text-burgundy" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg font-semibold text-burgundy">
                      {event.time}
                    </span>
                    <span className="font-serif text-base text-text">
                      — {event.title}
                    </span>
                  </div>
                  {"location" in event && event.location && (
                    <p className="text-sm text-text/50">{event.location}</p>
                  )}
                  {"address" in event && event.address && (
                    <p className="text-sm text-text/40">{event.address}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="h-px w-24 bg-taupe/50" />
        </div>

        {/* Locations */}
        <div className="mb-12">
          <h2 className="mb-6 text-center font-script text-3xl text-burgundy">
            Адреса
          </h2>
          <div className="space-y-4">
            {wedding.locations.map((loc, i) => (
              <div key={i} className="rounded-xl border border-taupe/30 bg-card p-5">
                <p className="font-serif text-lg font-semibold text-text">{loc.name}</p>
                <p className="mt-1 text-sm text-text/50">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="h-px w-24 bg-taupe/50" />
        </div>

        {/* Dress code */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-script text-3xl text-burgundy">
            Дресс-код
          </h2>
          <div className="flex items-center justify-center gap-6 mb-6">
            {wedding.dresscode.colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={strokeImages[i]} alt={c.name} className="w-24" draggable={false} />
                <span className="mt-2 text-xs tracking-[0.15em] uppercase text-text/40">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
          <p className="font-serif text-base leading-relaxed text-text/60 italic">
            {wedding.dresscode.text}
          </p>
          <p className="mt-3 text-xs text-text/40">
            {wedding.dresscode.note}
          </p>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="h-px w-24 bg-taupe/50" />
        </div>

        {/* Coordinator */}
        <div className="text-center mb-12">
          <h2 className="mb-4 font-script text-3xl text-burgundy">
            Координатор
          </h2>
          <p className="font-serif text-lg text-text">
            {wedding.coordinator.name}
          </p>
          <p className="mt-1 font-serif text-lg text-burgundy">
            {wedding.coordinator.phone}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4">
          <div className="text-center">
            <div className="h-px w-16 bg-taupe/40 mx-auto mb-4" />
            <p className="font-serif text-base text-text/50 italic">
              {wedding.footer.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
