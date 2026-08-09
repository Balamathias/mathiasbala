import { notFoundPage } from "@/content";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[54rem] flex-col justify-center px-6 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {notFoundPage.code}
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        {notFoundPage.heading}
      </h1>
      <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
        {notFoundPage.body}
      </p>
      <p className="mt-8">
        <a
          href={notFoundPage.link.href}
          className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
        >
          {notFoundPage.link.label}
        </a>
      </p>
    </main>
  );
}
