// app/(projects)/projects/[id]/delete/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold">
        Project Not Found
      </h2>

      <p className="mt-4 text-gray-600">
        This project does not exist or may have been deleted.
      </p>

      <Link
        href="/projects"
        className="mt-6 inline-block rounded-lg bg-[#0B2545] px-6 py-3 text-white hover:bg-[#081C33]"
      >
        Back to Projects
      </Link>
    </section>
  );
}