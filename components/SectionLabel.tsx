export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {children}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}
