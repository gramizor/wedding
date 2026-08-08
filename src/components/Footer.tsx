"use client";

import { wedding } from "@/config/wedding";
import { BotanicalWreath } from "./decorative/BotanicalWreath";
import { CrystalMark } from "./decorative/CrystalMark";

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M8 2v8M8 10L4.5 6.5M8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-20 sm:py-28">
      <BotanicalWreath className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-30 sm:w-[500px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-script text-3xl text-burgundy sm:text-4xl">
          {wedding.couple.name1}
          <span className="mx-2 font-serif text-[0.6em] italic text-taupe">&amp;</span>
          {wedding.couple.name2}
        </p>

        <p className="mt-3 font-serif text-base tracking-[0.15em] text-text/50">
          {wedding.dateFormatted}
        </p>

        <div className="mt-6 h-px w-16 bg-taupe/40" />

        <p className="mt-6 font-serif text-lg text-text/60 italic">
          {wedding.footer.text}
        </p>

        <a
          href="/memo"
          target="_blank"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-taupe/40 px-5 py-2.5 text-sm text-text/50 transition-colors hover:border-burgundy/40 hover:text-burgundy"
        >
          <DownloadIcon />
          Скачать памятку (PDF)
        </a>
        <p className="mt-2 text-xs text-text/30">
          на случай, если не будет интернета
        </p>

        <a
          href="https://gramizor.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 inline-flex items-center gap-2.5 text-xs text-text/30 transition-colors duration-200 hover:text-burgundy"
        >
          <span>Разработка сайта —</span>
          <CrystalMark className="h-3.5 w-auto transition-colors duration-200 group-hover:text-[#e01b24]" />
          <span className="tracking-[0.18em] uppercase">GRAMIZOR</span>
        </a>
      </div>
    </footer>
  );
}
