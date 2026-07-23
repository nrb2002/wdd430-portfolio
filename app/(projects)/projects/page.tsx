// app/(projects)/page.tsx

import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";

import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const query = params.query ?? "";

  const page = Math.max(
    Number.parseInt(params.page ?? "1", 10) || 1,
    1
  );

  const projects = await fetchFilteredProjects(
    query,
    page
  );

  const totalPages = await fetchProjectsPages(
    query
  );

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">
        All Projects
      </h2>

      <p className="mb-6">
        Welcome to my projects page.
      </p>

      {/* Search */}
      <ProjectSearch />

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article
              key={project.id}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-2">
                {project.description}
              </p>

              <p className="mt-2">
                <strong>Type:</strong>{" "}
                {project.type}
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
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">
            No projects found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </section>
  );
}