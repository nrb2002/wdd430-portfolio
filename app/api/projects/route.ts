import { NextRequest } from "next/server";
import { getProjects } from "@/lib/projects-db";

// Define a Route Handler that responds to GET requests
export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get("type");
    const projects = getProjects(type);

    return new Response(JSON.stringify(projects), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}