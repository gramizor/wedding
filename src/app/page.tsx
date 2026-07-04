import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Locations } from "@/components/Locations";
import { Atmosphere } from "@/components/Atmosphere";
import { DressCode } from "@/components/DressCode";
import { Wishes } from "@/components/Wishes";
import { Coordinator } from "@/components/Coordinator";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { FadeInProvider } from "@/components/FadeInProvider";

export default function Home() {
  return (
    <>
      <FadeInProvider />
      <main>
        <Hero />
        <Timeline />
        <Locations />
        <Atmosphere />
        <DressCode />
        <Wishes />
        <Coordinator />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}
