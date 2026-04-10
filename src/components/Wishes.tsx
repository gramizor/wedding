"use client";

import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

function EnvelopeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-burgundy">
      <rect x="4" y="10" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 13l16 10 16-10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-burgundy">
      <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="10" rx="3" ry="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <ellipse cx="14.5" cy="13.5" rx="3" ry="5" transform="rotate(-45 14.5 13.5)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <ellipse cx="25.5" cy="13.5" rx="3" ry="5" transform="rotate(45 25.5 13.5)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <ellipse cx="14.5" cy="18.5" rx="3" ry="5" transform="rotate(-80 14.5 18.5)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <ellipse cx="25.5" cy="18.5" rx="3" ry="5" transform="rotate(80 25.5 18.5)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="20" y1="20" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 28 C16 24, 13 26, 12 28" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M20 25 C24 21, 27 23, 28 25" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Wishes() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 text-center font-script text-4xl text-burgundy sm:text-5xl">
          Пожелания
        </h2>
        <Divider className="mb-14" />

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Gifts */}
          <div className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <EnvelopeIcon />
            </div>
            <h3 className="mb-3 font-serif text-xl font-semibold text-text">
              {wedding.wishes.gifts.title}
            </h3>
            <p className="font-serif text-base leading-relaxed text-text/60 italic">
              {wedding.wishes.gifts.text}
            </p>
          </div>

          {/* Flowers */}
          <div className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <FlowerIcon />
            </div>
            <h3 className="mb-3 font-serif text-xl font-semibold text-text">
              {wedding.wishes.flowers.title}
            </h3>
            <p className="font-serif text-base leading-relaxed text-text/60 italic">
              {wedding.wishes.flowers.text}
            </p>
            {wedding.wishes.flowers.link ? (
              <a
                href={wedding.wishes.flowers.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-2.5 text-sm font-medium text-card transition-colors hover:bg-burgundy-dark"
              >
                Оформить подписку на цветы
              </a>
            ) : (
              <button
                type="button"
                onClick={() => alert("Ссылка на цветочную подписку скоро появится!")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-2.5 text-sm font-medium text-card transition-colors hover:bg-burgundy-dark cursor-pointer"
              >
                Оформить подписку на цветы
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
