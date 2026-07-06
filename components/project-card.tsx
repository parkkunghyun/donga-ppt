import Link from "next/link";
import type { Project } from "@/lib/types";
import { IconArrowRight } from "./icons";
import { ImpactDisplay } from "./impact-display";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg hover:border-accent"
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="flex-1 text-[18px] font-bold leading-snug text-main">
            {project.title}
          </h3>
          <IconArrowRight
            size={18}
            className="shrink-0 text-muted group-hover:text-accent"
          />
        </div>
        {project.participants && (
          <p className="mb-4 text-[13px] text-muted">{project.participants}</p>
        )}

        <div className="mt-auto border-t border-border pt-4">
          <ImpactDisplay
            value={project.impactValue}
            label={project.impactLabel}
            size="card"
          />
        </div>
      </div>
    </Link>
  );
}
