import { hero } from "@/content";

export function Hero() {
  return (
    <header className="pt-20 pb-6 sm:pt-28 sm:pb-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {hero.name}
      </h1>

      <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl">
        {hero.summary}
      </p>

      <p className="mt-8 max-w-[52ch] border-l-2 border-accent bg-surface py-3 pr-4 pl-4 text-[0.95rem] leading-relaxed text-accent">
        {hero.availability}
      </p>

      <nav aria-label="Contact and profiles" className="mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {hero.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="border-b border-line pb-0.5 text-[0.95rem] transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
