// app/(projects)/projects/not-found.tsx

import { getProjectById } from "@/lib/projects-db";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: {id: number}}) {
    const project = await getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return <div>...</div>
}