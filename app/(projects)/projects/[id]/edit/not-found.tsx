// app/(projects)/projects/[id]/edit/not-found.tsx

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500">Project not found!</h1>
            <p className="text-lg text-gray-700 mt-4">
                The project you are looking for does not exist.
            </p>
            <Link href="/projects" className="mt-4 text-blue-500 hover:underline">
                Go back to the Projects Page
            </Link>
        </div>
    );
}
