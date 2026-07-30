// app/(projects)/projects/[id]/edit/page.tsx

import Link from "next/link";

import { getProjectById } from "@/lib/projects-db";
import EditProjectForm from "./EditProjectForm";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  // Validate project ID
  if (
    !Number.isInteger(projectId) ||
    projectId < 1
  ) {
    return (
      <section>
        <h2 className="text-3xl font-bold">
          Invalid Project ID
        </h2>

        <Link
          href="/projects"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  // Get project
  const project = await getProjectById(projectId);

  // Handle missing project
  if (!project) {
    return (
      <section>
        <h2 className="text-3xl font-bold">
          Project Not Found
        </h2>

        <p className="mt-4">
          The project you are trying to edit does
          not exist.
        </p>

        <Link
          href="/projects"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold">
        Edit Project
      </h2>

      <EditProjectForm
        project={project}
        id={id}
      />
    </section>
  );
}