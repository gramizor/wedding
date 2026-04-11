"use client";

import { wedding } from "@/config/wedding";
import { useCountdown, countdownLabels } from "@/hooks/useCountdown";
import { BotanicalWreath } from "./decorative/BotanicalWreath";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[3.5rem]">
      <span className="font-serif text-3xl font-light text-burgundy sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] tracking-[0.15em] text-text/50">
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span className="self-start pt-1 font-serif text-2xl text-taupe">:</span>
  );
}

export function Hero() {
  const { months, days, hours, minutes, seconds } = useCountdown(
    new Date(wedding.date)
  );

  return (
    <section className="flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      <div className="relative flex flex-col items-center justify-center">
        <BotanicalWreath className="w-[320px] sm:w-[480px] md:w-[560px]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="mb-2 font-serif text-xs tracking-[0.3em] uppercase text-text/40 sm:mb-3 sm:text-sm">
            Свадьба
          </p>

          <h1 className="font-script text-4xl leading-tight text-burgundy sm:text-6xl md:text-7xl">
            {wedding.couple.name1}
            <span className="mx-2 font-serif text-[0.6em] italic text-taupe sm:mx-3">&amp;</span>
            {wedding.couple.name2}
          </h1>

          <p className="mt-2 max-w-[220px] font-serif text-sm font-light italic leading-relaxed text-text/60 sm:mt-3 sm:max-w-xs sm:text-base">
            Будем счастливы
            <br />
            разделить этот день с Вами
          </p>

          <div className="mt-2 h-px w-12 bg-taupe/50 sm:mt-3 sm:w-16" />

          <p className="mt-2 font-serif text-base tracking-[0.15em] text-text/80 sm:mt-3 sm:text-xl">
            {wedding.dateFormatted}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-1 sm:mt-8 sm:gap-5">
        {months > 0 && (
          <>
            <CountdownUnit value={months} label={countdownLabels(months, "month")} />
            <CountdownSeparator />
          </>
        )}
        <CountdownUnit value={days} label={countdownLabels(days, "day")} />
        <CountdownSeparator />
        <CountdownUnit value={hours} label={countdownLabels(hours, "hour")} />
        <CountdownSeparator />
        <CountdownUnit value={minutes} label={countdownLabels(minutes, "minute")} />
        <CountdownSeparator />
        <CountdownUnit value={seconds} label={countdownLabels(seconds, "second")} />
      </div>
    </section>
  );
}
