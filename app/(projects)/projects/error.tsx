// app/(projects)/projects/error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('An uncaught error occurred:', error);
    }, [error]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500">Error</h1>
            <p className="text-lg text-gray-700 mt-4">
                An unexpected error occurred.
            </p>

            {/* Reset the boundary and attempt to re-render the component that caused the error. */}
            <button
                onClick={reset}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Try Again
            </button>
            <Link href="/projects" className="mt-4 text-blue-500 hover:underline">
                Go back to Projects
            </Link>
            <Link href="/" className="mt-4 text-blue-500 hover:underline">
                Go back to Home Page
            </Link>
        </div>
    );
}
