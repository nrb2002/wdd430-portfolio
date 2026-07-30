// app/(projects)/projects/[id]/delete/page.tsx

import Link from "next/link";

import { deleteProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";

interface DeleteProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeleteProjectPage({
  params,
}: DeleteProjectPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  if (
    !Number.isInteger(projectId) ||
    projectId < 1
  ) {
    return (
      <section>
        <h2 className="text-3xl font-bold">
          Invalid Project ID
        </h2>

        <p className="mt-4">
          The project ID provided is invalid.
        </p>

        <Link
          href="/projects"
          className="mt-4 inline-block text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  const project =
    await getProjectById(projectId);

  if (!project) {
    return (
      <section>
        <h2 className="text-3xl font-bold">
          Project Not Found
        </h2>

        <p className="mt-4">
          The project you are trying to delete
          does not exist.
        </p>

        <Link
          href="/projects"
          className="mt-4 inline-block text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2
        id="delete-heading"
        className="mb-4 text-3xl font-bold"
      >
        Delete Project
      </h2>

      <p
        id="delete-description"
        className="mb-6"
      >
        Are you sure you want to delete this
        project? This action cannot be undone.
      </p>

      {/* Project Information */}
      <div
        className="mb-6 rounded-lg border p-4 shadow-sm"
        aria-labelledby="delete-heading"
        aria-describedby="delete-description"
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
      </div>

      {/* Future status messages */}
      <div aria-live="polite">
        <p
          id="delete-status"
          className="text-sm text-red-600"
        />
      </div>

      {/* Confirmation Form */}
      <form
        action={deleteProject.bind(null, id)}
        aria-labelledby="delete-heading"
        aria-describedby="delete-description"
        className="flex gap-4"
      >
        <button
          type="submit"
          className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          Yes, Delete Project
        </button>

        <Link
          href="/projects"
          className="rounded-lg border px-6 py-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
        >
          Cancel
        </Link>
      </form>
    </section>
  );
}