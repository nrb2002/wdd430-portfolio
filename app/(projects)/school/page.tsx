// app/(projects)/school/page.tsx

import { Suspense } from "react";

import { getProjects } from "@/lib/projects-db";

// Skeleton shown while SchoolProjectList is loading
function SchoolProjectListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <article
          key={item}
          className="rounded-lg border p-4 shadow-sm"
        >
          {/* Project title */}
          <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200" />

          {/* Description */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Technologies */}
          <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

          {/* View Project link */}
          <div className="mt-4 h-5 w-28 animate-pulse rounded bg-gray-200" />
        </article>
      ))}
    </div>
  );
}

// Async Server Component
async function SchoolProjectList() {
  // Temporary delay for testing Suspense
  // await new Promise((res) => setTimeout(res, 2000));

  const projects = await getProjects("school");

  return (
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
            No School Projects Found
          </h3>

          <p className="mt-2 text-gray-500">
            There are currently no school projects
            to display.
          </p>
        </div>
      )}
    </div>
  );
}

// Page component
export default function SchoolProjectsPage() {
  return (
    <section>
      {/* This renders immediately */}
      <h2 className="mb-4 text-3xl font-bold">
        School Projects
      </h2>

      {/* Only the project list waits for the data */}
      <Suspense fallback={<SchoolProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </section>
  );
}