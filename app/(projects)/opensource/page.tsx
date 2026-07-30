// app/(projects)/opensource/page.tsx

import Link from "next/link";

import { getProjects } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  const projects = await getProjects("opensource");

  return (
    <section>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Open Source Projects
        </h2>

        <p className="mt-2">
          Explore my open source projects and
          contributions.
        </p>
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
                <strong>Technologies:</strong>{" "}
                {project.technologies.join(", ")}
              </p>

              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-600 hover:underline"
                >
                  View Project
                </Link>
              )}
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold">
              No Open Source Projects Found
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no open source projects
              to display.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}