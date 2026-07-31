"use client";

import { useState, useEffect, useRef } from "react";
import {
  calculateCountdown,
  type CountdownState,
} from "@/lib/countdown";

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

export function useCountdown(targetDate: Date): CountdownState {
  const targetMs = useRef(targetDate.getTime());
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(targetDate)
  );

  useEffect(() => {
    const target = new Date(targetMs.current);
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(target));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
