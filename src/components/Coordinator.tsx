import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

export function Coordinator() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="fade-in mx-auto max-w-2xl text-center">
        <Divider className="mb-6" />
        <h2 className="mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          Наши помощники
        </h2>
        <Divider className="mb-10" />

        <p className="font-serif text-lg leading-relaxed text-text/70 italic sm:text-xl">
          Если у вас есть вопросы или идеи — свяжитесь с людьми, которые помогают нам создать этот праздник
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {wedding.contacts.map((contact, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-taupe/30 bg-card px-8 py-6 shadow-sm"
            >
              <p className="font-serif text-xl font-semibold text-text">
                {contact.name}
              </p>
              <p className="mt-1 text-sm text-text/40">
                {contact.role}
              </p>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="mt-3 font-serif text-lg text-burgundy transition-colors hover:text-burgundy-dark"
              >
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
