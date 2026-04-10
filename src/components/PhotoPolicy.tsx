import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

function CameraOffIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-burgundy">
      <rect x="6" y="14" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 14 L18 8 H30 L32 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PhotoPolicy() {
  return (
    <section className="bg-ivory-dark px-6 py-20 sm:py-28">
      <div className="fade-in mx-auto max-w-lg text-center">
        <Divider className="mb-6" />
        <h2 className="mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          Фото и видео
        </h2>
        <Divider className="mb-10" />

        <div className="mb-6 flex justify-center">
          <CameraOffIcon />
        </div>

        <p className="font-serif text-lg leading-relaxed text-text/70 italic sm:text-xl">
          {wedding.photoPolicy.text}
        </p>
      </div>
    </section>
  );
}
