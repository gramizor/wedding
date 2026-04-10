"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path
        d="M9 1C5.7 1 3 3.7 3 7c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-taupe/30 px-3 py-2 text-sm text-text/50 transition-colors hover:border-burgundy/30 hover:text-burgundy cursor-pointer"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Скопировано
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 4.5V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5A1.5 1.5 0 003 9.5h1.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Скопировать
        </>
      )}
    </button>
  );
}

export function Locations() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 text-center font-script text-4xl text-burgundy sm:text-5xl">
          Локации
        </h2>
        <Divider className="mb-14" />

        <div className="grid gap-8 sm:grid-cols-2">
          {wedding.locations.map((loc, i) => (
            <div
              key={i}
              className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 shadow-sm"
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-0.5 text-burgundy">
                  <MapIcon />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-text">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-sm text-text/50">{loc.address}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={loc.yandexMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 px-4 py-2 text-sm font-medium text-burgundy transition-colors hover:bg-burgundy hover:text-card"
                >
                  Яндекс Карты
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href={loc.twoGis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 px-4 py-2 text-sm font-medium text-burgundy transition-colors hover:bg-burgundy hover:text-card"
                >
                  2ГИС
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <CopyButton text={loc.address} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
