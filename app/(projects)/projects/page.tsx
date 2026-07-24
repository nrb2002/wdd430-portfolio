// app/(projects)/projects/page.tsx

import ProjectSearch from "@/components/ProjectSearch";
import ProjectFilters from "@/components/ProjectFilters";
import Pagination from "@/components/Pagination";

import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string;
    type?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  // Get search query from URL
  const query = params.query ?? "";

  // Validate project type from URL
  const type =
    params.type === "opensource" ||
    params.type === "school"
      ? params.type
      : undefined;

  // Validate page number from URL
  const page = Math.max(
    Number.parseInt(params.page ?? "1", 10) || 1,
    1
  );

  // Fetch filtered and paginated projects
  const projects = await fetchFilteredProjects({
    query,
    type,
    page,
  });

  // Calculate total pages using the same filters
  const totalPages = await fetchProjectsPages({
    query,
    type,
  });

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">
        All Projects
      </h2>

      <p className="mb-6">
        Welcome to my projects page.
      </p>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <ProjectSearch />

        <ProjectFilters />
      </div>

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
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold">
              No projects found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </section>
  );
}

