// app/(projects)/school/page.tsx

import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";

import { getProjects } from "@/lib/projects-db";

export default async function SchoolProjectsPage() {
  const projects = await getProjects("school");

  return (
    <section>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          School Projects Page
        </h2>

        <p className="mt-2">
          Explore my school projects and
          contributions.
        </p>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showActions={false}
            />
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

    </section>
  );
}