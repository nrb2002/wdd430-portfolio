// app/(projects)/projects/create/page.tsx

"use client";

import { useActionState } from "react";
import { createProject } from "@/lib/actions";

const initialState = {
  message: "",
  errors: {
    title: [],
    description: [],
    type: [],
    technologies: [],
    yearCompleted: [],
    link: [],
  },
};

export default function CreateProjectPage() {
  const [state, formAction] = useActionState(
    createProject,
    initialState
  );

  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold">
        Create New Project
      </h2>

      <form
        action={formAction}
        className="max-w-2xl space-y-6"
      >
        {/* General Error Message */}
        {state.message && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700"
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
            required
            aria-invalid={Boolean(
              state.errors?.title?.length
            )}
            aria-describedby="title-error"
            className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
          />

          <div
            id="title-error"
            aria-live="polite"
          >
            {state.errors?.title?.map(
              (error: string) => (
                <p
                  key={error}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
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
            required
            aria-invalid={Boolean(
              state.errors?.description?.length
            )}
            aria-describedby="description-error"
            className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
          />

          <div
            id="description-error"
            aria-live="polite"
          >
            {state.errors?.description?.map(
              (error: string) => (
                <p
                  key={error}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
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
            required
            aria-invalid={Boolean(
              state.errors?.type?.length
            )}
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

          <div
            id="type-error"
            aria-live="polite"
          >
            {state.errors?.type?.map(
              (error: string) => (
                <p
                  key={error}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
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
            placeholder="Next.js, React, PostgreSQL"
            required
            aria-invalid={Boolean(
              state.errors?.technologies?.length
            )}
            aria-describedby="technologies-help technologies-error"
            className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
          />

          <p
            id="technologies-help"
            className="mt-1 text-sm text-gray-500"
          >
            Separate technologies with commas.
          </p>

          <div
            id="technologies-error"
            aria-live="polite"
          >
            {state.errors?.technologies?.map(
              (error: string) => (
                <p
                  key={error}
                  className="text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
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
            placeholder="https://github.com/username/project"
            aria-invalid={Boolean(
              state.errors?.link?.length
            )}
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

          <div
            id="link-error"
            aria-live="polite"
          >
            {state.errors?.link?.map(
              (error: string) => (
                <p
                  key={error}
                  className="text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
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
            min="1900"
            max={new Date().getFullYear()}
            required
            aria-invalid={Boolean(
              state.errors?.yearCompleted?.length
            )}
            aria-describedby="yearCompleted-error"
            className="w-full rounded-lg border p-3 focus:border-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
          />

          <div
            id="yearCompleted-error"
            aria-live="polite"
          >
            {state.errors?.yearCompleted?.map(
              (error: string) => (
                <p
                  key={error}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="rounded-lg bg-[#0B2545] px-6 py-3 text-white hover:bg-[#081C33] focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
        >
          Create Project
        </button>
      </form>
    </section>
  );
}