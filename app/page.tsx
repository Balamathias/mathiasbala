import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[54rem] px-6 sm:px-8">
      <Hero />
      <main>
        <Projects />
        <ArchitectureDiagram />
        <Experience />
        <Stack />
      </main>
      <Footer />
    </div>
  );
}
