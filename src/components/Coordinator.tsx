import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

export function Coordinator() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="fade-in mx-auto max-w-lg text-center">
        <Divider className="mb-6" />
        <h2 className="mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          Координатор
        </h2>
        <Divider className="mb-10" />

        <p className="font-serif text-lg leading-relaxed text-text/70 italic sm:text-xl">
          {wedding.coordinator.text}
        </p>

        <div className="mt-8 inline-flex flex-col items-center rounded-2xl border border-taupe/30 bg-card px-10 py-6 shadow-sm">
          <p className="font-serif text-xl font-semibold text-text">
            {wedding.coordinator.name}
          </p>
          <a
            href={`tel:${wedding.coordinator.phone.replace(/[^+\d]/g, "")}`}
            className="mt-2 font-serif text-lg text-burgundy transition-colors hover:text-burgundy-dark"
          >
            {wedding.coordinator.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
