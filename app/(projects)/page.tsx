// app/projects/page.tsx

import { getProjects } from "@/lib/projects-db";

interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export default async function ProjectsPage() {
  const projects: Project[] = await getProjects();

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">Projects Overview</h2>

      <p className="mb-6">Welcome to my projects page.</p>

      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-lg border p-4 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>

            <p className="mt-2">{project.description}</p>

            <p className="mt-2">
              <strong>Type:</strong> {project.type}
            </p>

            <p className="mt-2">
              <strong>Technologies:</strong>{" "}
              {project.technologies.join(", ")}
            </p>

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
          </article>
        ))}
      </div>
    </section>
  );
}