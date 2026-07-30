// components/ProjectCard.tsx

import Link from "next/link";

import { deleteProject } from "@/lib/actions";
import { Project } from "@/lib/projects-db";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
}

export default function ProjectCard({
  project,
  showActions = false,
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border p-4 shadow-sm">
      {/* Project Title */}
      <h3 className="text-xl font-semibold">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-2">
        {project.description}
      </p>

      {/* Project Type */}
      <p className="mt-2">
        <strong>Type:</strong>{" "}
        {project.type}
      </p>

      {/* Year Completed */}
      <p className="mt-2">
        <strong>Year Completed:</strong>{" "}
        {project.yearCompleted}
      </p>

      {/* Technologies */}
      <p className="mt-2">
        <strong>Technologies:</strong>{" "}
        {project.technologies.join(", ")}
      </p>

      {/* Project Link */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          View Project
        </a>
      )}

      {/* Edit and Delete Actions */}
      {showActions && (
        <div className="mt-4 flex gap-3">
          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-lg border bg-[#0B2545] px-4 py-2 text-white hover:bg-[#081C33]"
          >
            Edit
          </Link>

          <form
            action={deleteProject.bind(
              null,
              project.id.toString()
            )}
          >
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </article>
  );
}