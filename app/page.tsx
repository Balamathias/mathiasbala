import { site } from "@/content";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Projects } from "@/components/Projects";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/Toaster";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {site.skipLink}
      </a>
      <TopBar />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
        <main id="main">
          <Metrics />
          <Projects />
          <ArchitectureDiagram />
          <Experience />
          <Stack />
        </main>
        <Footer />
      </div>
      <CommandPalette />
      <Toaster />
    </>
  );
}
