"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ProjectFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  function updateFilter(
    name: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Changing a filter always starts from page 1
    params.set("page", "1");

    push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <label
        htmlFor="project-type"
        className="sr-only"
      >
        Filter projects by type
      </label>

      <select
        id="project-type"
        value={searchParams.get("type") ?? ""}
        onChange={(event) =>
          updateFilter(
            "type",
            event.target.value
          )
        }
        className="rounded-lg border px-4 py-2"
      >
        <option value="">
          All Types
        </option>

        <option value="opensource">
          Open Source
        </option>

        <option value="school">
          School
        </option>
      </select>
    </div>
  );
}