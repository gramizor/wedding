import { wedding } from "@/config/wedding";
import { Divider } from "./decorative/Divider";

export function Gallery() {
  const hasPhotos = wedding.gallery.photos.length > 0;

  return (
    <section className="bg-ivory-dark px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Divider className="mb-6" />
        <h2 className="fade-in mb-4 font-script text-4xl text-burgundy sm:text-5xl">
          Фотографии
        </h2>
        <Divider className="mb-14" />

        {hasPhotos ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {wedding.gallery.photos.map((photo, i) => (
              <div
                key={i}
                className="fade-in aspect-[3/4] overflow-hidden rounded-xl border border-taupe/20"
              >
                <img
                  src={photo}
                  alt={`Фото ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="fade-in rounded-2xl border border-dashed border-taupe/40 bg-card/50 px-8 py-16">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="mx-auto mb-4 text-taupe"
            >
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M4 34 L16 22 L26 32 L32 26 L44 34" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <p className="font-serif text-lg text-text/40 italic">
              {wedding.gallery.text}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
