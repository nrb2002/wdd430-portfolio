// app/(projects)/projects/create/page.tsx

import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold">
        Create New Project
      </h2>

      <form
        action={createProject}
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
            placeholder="Next.js, React, PostgreSQL"
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
          Create Project
        </button>
      </form>
    </section>
  );
}