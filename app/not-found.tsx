import { notFoundPage, site } from "@/content";
import { Corners } from "@/components/Corners";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-16 sm:px-8">
      <p className="font-mono text-[0.8rem] text-muted">{site.wordmark}</p>
      <p className="mt-8 font-mono text-[clamp(5rem,20vw,9rem)] leading-none tracking-[-0.06em] text-accent">
        {notFoundPage.code}
      </p>

      <div className="group relative mt-10 rounded-md border border-line bg-surface/80 font-mono text-[0.78rem] backdrop-blur-sm">
        <Corners />
        <div className="border-b border-line px-5 py-3 text-text">
          <span className="text-accent">{notFoundPage.status.split(" ").slice(0, 2).join(" ")}</span>{" "}
          {notFoundPage.status.split(" ").slice(2).join(" ")}
        </div>
        <ul className="space-y-1 px-5 py-4 text-muted">
          {notFoundPage.headers.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <h1 className="mt-10 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
        {notFoundPage.heading}
      </h1>
      <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{notFoundPage.body}</p>
      <p className="mt-10">
        <a
          href={notFoundPage.link.href}
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-5 text-[0.9rem] font-medium text-on-accent"
        >
          {notFoundPage.link.label}
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </p>
    </main>
  );
}
