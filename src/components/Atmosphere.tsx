import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

export function Atmosphere() {
  return (
    <section className="bg-ivory-dark px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          {wedding.atmosphere.title}
        </h2>
        <Divider className="mb-10" />

        <p className="fade-in font-serif text-lg leading-relaxed text-text/70 italic sm:text-xl">
          {wedding.atmosphere.text}
        </p>

        <div className="mx-auto my-8 h-px w-16 bg-taupe/40" />

        <p className="fade-in font-serif text-base leading-relaxed text-text/60 italic">
          {wedding.atmosphere.format}
        </p>
      </div>
    </section>
  );
}
