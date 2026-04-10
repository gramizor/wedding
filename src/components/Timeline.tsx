import { wedding } from "@/config/wedding";
import { TimelineIcon } from "./decorative/TimelineIcon";
import { Divider } from "./decorative/Divider";

export function Timeline() {
  return (
    <section className="bg-ivory-dark px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 text-center font-script text-4xl text-burgundy sm:text-5xl">
          Программа дня
        </h2>
        <Divider className="mb-14" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-taupe/40 sm:left-1/2 sm:-translate-x-px" />

          {wedding.timeline.map((event, i) => (
            <div
              key={i}
              className="fade-in relative mb-12 last:mb-0 pl-16 sm:mb-16 sm:pl-0"
            >
              {/* Dot on timeline */}
              <div className="absolute left-[18px] top-1 size-4 rounded-full border-2 border-burgundy bg-ivory-dark sm:left-1/2 sm:-translate-x-1/2" />

              <div
                className={`sm:w-[calc(50%-40px)] ${
                  i % 2 === 0 ? "sm:ml-auto sm:pl-8" : "sm:mr-auto sm:pr-8 sm:text-right"
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    i % 2 !== 0 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <TimelineIcon
                    icon={event.icon}
                    className="size-6 shrink-0 text-burgundy"
                  />
                  <span className="font-serif text-2xl font-semibold text-burgundy">
                    {event.time}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-xl font-medium text-text">
                  {event.title}
                </h3>

                {"location" in event && event.location && (
                  <p className="mt-1 text-sm text-text/60">
                    {event.location}
                  </p>
                )}
                {"address" in event && event.address && (
                  <p className="mt-0.5 text-sm text-text/40">
                    {event.address}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
