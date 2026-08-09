import { projects, projectsLabel, type Project } from "@/content";
import { SectionLabel } from "./SectionLabel";

const METRIC = /(\d[\d,]*(?:\+|%))/g;

function withMetrics(text: string) {
  return text.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-mono font-normal text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal border border-line bg-surface p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-2 text-muted">{project.description}</p>

      <ul className="mt-6 space-y-3">
        {project.points.map((point) => (
          <li key={point} className="flex gap-3 leading-relaxed">
            <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-line-strong" />
            <span>{withMetrics(point)}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border border-line px-2 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="border-b border-line pb-0.5 text-[0.95rem] transition-colors hover:border-accent hover:text-accent"
              >
                {link.label} <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Projects() {
  return (
    <section className="py-16">
      <SectionLabel>{projectsLabel}</SectionLabel>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
