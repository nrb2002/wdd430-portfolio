"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }

      // Always reset pagination when starting a new search
      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="mb-6">
      <label
        htmlFor="project-search"
        className="sr-only"
      >
        Search projects
      </label>

      <input
        id="project-search"
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}