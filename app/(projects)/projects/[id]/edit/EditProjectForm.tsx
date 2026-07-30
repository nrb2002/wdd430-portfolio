// app/(projects)/projects/[id]/edit/EditProjectForm.tsx

"use client";

import { useActionState } from "react";
import { updateProject } from "@/lib/actions";

interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  yearCompleted: number;
  link?: string;
}

interface EditProjectFormProps {
  project: Project;
  id: string;
}

const initialState = {
  message: "",
  errors: {},
};

export default function EditProjectForm({
  project,
  id,
}: EditProjectFormProps) {
  const [state, formAction] = useActionState(
    updateProject.bind(null, id),
    initialState
  );

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-6"
    >
      {/* General Message */}
      {state?.message && (
        <div
          aria-live="polite"
          className="rounded-lg bg-red-50 p-4 text-red-700"
        >
          {state.message}
        </div>
      )}

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
          aria-invalid={!!state?.errors?.title}
          aria-describedby="title-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />

        <div aria-live="polite">
          <p
            id="title-error"
            className="mt-1 text-sm text-red-600"
          >
            {state?.errors?.title?.join(", ")}
          </p>
        </div>
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
          aria-invalid={!!state?.errors?.description}
          aria-describedby="description-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />

        <div aria-live="polite">
          <p
            id="description-error"
            className="mt-1 text-sm text-red-600"
          >
            {state?.errors?.description?.join(", ")}
          </p>
        </div>
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
          aria-invalid={!!state?.errors?.type}
          aria-describedby="type-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        >
          <option value="opensource">
            Open Source
          </option>

          <option value="school">
            School
          </option>
        </select>

        <div aria-live="polite">
          <p
            id="type-error"
            className="mt-1 text-sm text-red-600"
          >
            {state?.errors?.type?.join(", ")}
          </p>
        </div>
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
          aria-invalid={!!state?.errors?.technologies}
          aria-describedby="technologies-help technologies-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />

        <p
          id="technologies-help"
          className="mt-1 text-sm text-gray-500"
        >
          Separate technologies with commas.
        </p>

        <div aria-live="polite">
          <p
            id="technologies-error"
            className="text-sm text-red-600"
          >
            {state?.errors?.technologies?.join(", ")}
          </p>
        </div>
      </div>

      {/* Year Completed */}
      <div>
        <label
          htmlFor="yearCompleted"
          className="mb-2 block font-medium"
        >
          Year Completed
        </label>

        <input
          id="yearCompleted"
          name="yearCompleted"
          type="number"
          defaultValue={project.yearCompleted}
          min={2000}
          max={new Date().getFullYear()}
          required
          aria-invalid={!!state?.errors?.yearCompleted}
          aria-describedby="yearCompleted-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />

        <div aria-live="polite">
          <p
            id="yearCompleted-error"
            className="mt-1 text-sm text-red-600"
          >
            {state?.errors?.yearCompleted?.join(", ")}
          </p>
        </div>
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
          aria-invalid={!!state?.errors?.link}
          aria-describedby="link-help link-error"
          className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        />

        <p
          id="link-help"
          className="mt-1 text-sm text-gray-500"
        >
          Optional. Add the GitHub repository or live
          project URL.
        </p>

        <div aria-live="polite">
          <p
            id="link-error"
            className="text-sm text-red-600"
          >
            {state?.errors?.link?.join(", ")}
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded-lg bg-[#0B2545] px-6 py-3 text-white hover:bg-[#081C33] focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
      >
        Update Project
      </button>
    </form>
  );
}