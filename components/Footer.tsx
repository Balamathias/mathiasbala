import { footer } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {footer.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="border-b border-line pb-0.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-xs text-muted">{footer.location}</p>
    </footer>
  );
}
