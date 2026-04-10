"use client";

import { useState, useEffect, useRef } from "react";

interface CountdownValues {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;
  if (abs >= 11 && abs <= 19) return many;
  if (lastDigit === 1) return one;
  if (lastDigit >= 2 && lastDigit <= 4) return few;
  return many;
}

export function countdownLabels(n: number, unit: "month" | "day" | "hour" | "minute" | "second"): string {
  const forms: Record<typeof unit, [string, string, string]> = {
    month:  ["месяц",  "месяца",  "месяцев"],
    day:    ["день",   "дня",     "дней"],
    hour:   ["час",    "часа",    "часов"],
    minute: ["минута", "минуты",  "минут"],
    second: ["секунда","секунды", "секунд"],
  };
  return pluralize(n, ...forms[unit]);
}

function calculate(targetDate: Date): CountdownValues {
  const now = new Date();
  if (now >= targetDate) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Count full months
  let months = 0;
  const cursor = new Date(now);
  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > targetDate) break;
    cursor.setMonth(cursor.getMonth() + 1);
    months++;
  }

  const remainderMs = targetDate.getTime() - cursor.getTime();
  const days = Math.floor(remainderMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainderMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainderMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainderMs % (1000 * 60)) / 1000);

  return { months, days, hours, minutes, seconds };
}

export function useCountdown(targetDate: Date): CountdownValues {
  const targetMs = useRef(targetDate.getTime());
  const [countdown, setCountdown] = useState<CountdownValues>(() =>
    calculate(targetDate)
  );

  useEffect(() => {
    const target = new Date(targetMs.current);
    const interval = setInterval(() => {
      setCountdown(calculate(target));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
