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
    <section className="flex flex-col items-center overflow-hidden px-6 pt-16 pb-20 sm:pt-24">
      {/* Wreath with text overlay */}
      <div className="relative flex flex-col items-center justify-center">
        <BotanicalWreath className="w-[340px] sm:w-[500px] md:w-[600px]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="mb-3 font-serif text-xs tracking-[0.3em] uppercase text-text/40 sm:mb-4 sm:text-sm">
            Свадьба
          </p>

          <h1 className="font-script text-4xl leading-tight text-burgundy sm:text-6xl md:text-7xl">
            {wedding.couple.name1}
            <span className="mx-2 font-serif text-[0.6em] italic text-taupe sm:mx-3">&amp;</span>
            {wedding.couple.name2}
          </h1>

          <p className="mt-4 max-w-sm font-serif text-base font-light italic text-text/60 sm:mt-6 sm:max-w-md sm:text-lg">
            {wedding.couple.greeting}
          </p>

          <div className="mt-3 h-px w-16 bg-taupe/50 sm:mt-4 sm:w-20" />

          <p className="mt-3 font-serif text-lg tracking-[0.15em] text-text/80 sm:mt-4 sm:text-2xl">
            {wedding.dateFormatted}
          </p>
        </div>
      </div>

      {/* Countdown — below the wreath */}
      <div className="mt-8 flex items-start gap-1 sm:mt-10 sm:gap-5">
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
