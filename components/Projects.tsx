import { moreWork, projects, projectsSection, type MoreWork, type Project } from "@/content";
import { Corners } from "./Corners";
import { SectionHeader } from "./SectionHeader";
import { ArrowUpRight } from "./icons";

const METRIC = /(\d[\d,]*(?:\+|%))/g;

function withMetrics(text: string) {
  return text.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-accent tabular-nums">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 border-t border-line py-3 text-sm">
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint pt-0.5">
        {label}
      </dt>
      <dd className="text-text">{children}</dd>
    </div>
  );
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const s = projectsSection.specLabels;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-labelledby={`project-${index}`}
      className="reveal group relative rounded-md border border-line bg-surface/70 backdrop-blur-sm transition-colors duration-500 hover:border-line-strong"
    >
      <Corners />
      <span aria-hidden className="sweep" />

      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.75rem] text-accent">{num}</span>
            {project.flagship && (
              <span className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent">
                {projectsSection.flagship}
              </span>
            )}
          </div>

          <h3
            id={`project-${index}`}
            className="mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.035em]"
          >
            {project.name}
          </h3>
          <p className="mt-3 max-w-[38ch] leading-relaxed text-muted">{project.description}</p>

          <dl className="mt-8 border-b border-line">
            {project.role && <Spec label={s.role}>{project.role}</Spec>}
            {project.scale && <Spec label={s.scale}>{project.scale}</Spec>}
            <Spec label={s.status}>
              <span className="inline-flex items-center gap-2">
                <span className="pulse" aria-hidden />
                {project.status}
              </span>
            </Spec>
          </dl>

          {project.links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group/link inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 font-mono text-[0.75rem] transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col lg:col-span-7">
          <ol className="space-y-5">
            {project.points.map((point, i) => (
              <li key={point} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed">
                <span
                  aria-hidden
                  className="pt-[0.2rem] font-mono text-[0.68rem] text-faint tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.98rem] text-text/90">{withMetrics(point)}</span>
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-10">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
              {s.stack}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[0.7rem] text-muted transition-colors group-hover:border-line-strong"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkCard({ item }: { item: MoreWork }) {
  return (
    <article className="reveal group relative flex flex-col rounded-md border border-line bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-line-strong sm:p-8">
      <Corners />
      <span aria-hidden className="sweep" />
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
          {item.kind}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-muted">
          <span className="pulse" aria-hidden />
          {moreWork.live}
        </span>
      </div>
      <h4 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{item.name}</h4>
      <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
      <ul className="mt-6 space-y-2.5">
        {item.points.map((p) => (
          <li key={p} className="flex gap-3 text-[0.92rem] leading-relaxed text-text/90">
            <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" />
            <span>{withMetrics(p)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[0.68rem] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
        <a
          href={item.link.href}
          className="group/link inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-text transition-colors hover:text-accent"
        >
          {item.link.label}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <SectionHeader
        id="work"
        index={projectsSection.index}
        label={projectsSection.label}
        heading={projectsSection.heading}
      />
      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, i) => (
          <ProjectCase key={project.name} project={project} index={i} />
        ))}
      </div>

      <div className="mt-20 sm:mt-24">
        <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.03em]">
            {moreWork.heading}
          </h3>
          <p className="text-muted">{moreWork.sub}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {moreWork.items.map((item) => (
            <WorkCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
