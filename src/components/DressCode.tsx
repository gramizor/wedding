import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

const fabricImages = ["/dark-red.png", "/black.png", "/milk.png"];

export function DressCode() {
  return (
    <section className="bg-ivory-dark px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          Дресс-код
        </h2>
        <Divider className="mb-12" />

        <div className="fade-in flex items-center justify-center gap-6 sm:gap-10">
          {wedding.dresscode.colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="size-20 overflow-hidden rounded-full border border-taupe/30 shadow-sm sm:size-24">
                <img
                  src={fabricImages[i]}
                  alt={c.name}
                  className="h-full w-full object-cover scale-110"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className="mt-3 text-xs tracking-[0.15em] uppercase text-text/40">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        <p className="fade-in mt-10 font-serif text-lg leading-relaxed text-text/70 italic sm:text-xl">
          {wedding.dresscode.text}
        </p>

        <p className="fade-in mt-6 text-sm text-text/40">
          {wedding.dresscode.note}
        </p>
      </div>
    </section>
  );
}
