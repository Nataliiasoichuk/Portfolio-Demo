import { ProjectCard, type ProjectCardProps } from "../project-card/ProjectCard";

// The case pages are not built yet, so every card is disabled for now.
// When a page exists, add its `href` and drop `disabled`.
const projects: ProjectCardProps[] = [
  { index: "01", title: "Group Fitness booking", kind: "Web platform · Study project", disabled: true },
  { index: "02", title: "Personalised menu app", kind: "Mobile app · Study project", disabled: true },
  { index: "03", title: "Barbershop redesign", kind: "Website redesign · Study project", disabled: true },
];

/**
 * "Projects" block of the home page: header and three project cards.
 */
export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-section">
      <div className="mx-auto max-w-page">
        <header className="grid gap-6 border-b border-line pb-block lg:grid-cols-3 lg:items-end">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <p className="font-body text-caption font-semibold uppercase tracking-widest text-accent">01 — Selected work</p>
            <h2 className="font-display text-title text-ink">Projects</h2>
          </div>
          <p className="font-body text-body text-ink-muted">
            Three study projects. Each case shows the problem, my research and design process, and the result.
          </p>
        </header>
        <div className="mt-block grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} {...project} className={i === 1 ? "lg:mt-offset" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
