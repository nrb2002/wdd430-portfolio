// app/(projects)/projects/[id]/edit/page.tsx

import Link from "next/link";

import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";

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

  const project =
    await getProjectById(projectId);

  if (!project) {
    return (
      <section>
        <h2 className="text-3xl font-bold">
          Project Not Found
        </h2>

        <p className="mt-4">
          The project you are trying to edit
          does not exist.
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

      <form
        action={updateProject.bind(null, id)}
        className="max-w-2xl space-y-6"
      >
        {/* Project Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block font-medium"
          >
            Project Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            defaultValue={project.title}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={project.description}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Project Type */}
        <div>
          <label
            htmlFor="type"
            className="mb-2 block font-medium"
          >
            Project Type
          </label>

          <select
            id="type"
            name="type"
            defaultValue={project.type}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="opensource">
              Open Source
            </option>

            <option value="school">
              School
            </option>
          </select>
        </div>

        {/* Technologies */}
        <div>
          <label
            htmlFor="technologies"
            className="mb-2 block font-medium"
          >
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            type="text"
            defaultValue={project.technologies.join(", ")}
            required
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-1 text-sm text-gray-500">
            Separate technologies with commas.
          </p>
        </div>

        {/* Project Link */}
        <div>
          <label
            htmlFor="link"
            className="mb-2 block font-medium"
          >
            Project Link
          </label>

          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link ?? ""}
            placeholder="https://github.com/username/project"
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-1 text-sm text-gray-500">
            Optional. Add the GitHub repository or live
            project URL.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="rounded-lg bg-[#0B2545] px-6 py-3 text-white hover:bg-[#081C33]"
        >
          Update Project
        </button>
      </form>
    </section>
  );
}