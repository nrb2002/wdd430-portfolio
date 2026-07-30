import Image from "next/image";

import ProjectCard from "@/components/ProjectCard";
import { getLatestProjects } from "@/lib/projects-db";

export default async function Home() {
  const projects = await getLatestProjects(2);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">
          My Portfolio
        </h1>

        <Image
          src="/images/baron.jpg"
          alt="Baron Tshibasu profile picture"
          width={180}
          height={180}
          className="mx-auto mb-6 rounded-full object-cover shadow-md"
        />

        <p className="mx-auto max-w-2xl text-lg text-gray-700">
          Welcome to My Portfolio site! I&apos;m a software
          developer passionate about full-stack development,
          modern web technologies, and building useful
          applications with React and Next.js.
        </p>
      </section>

      {/* Latest Projects */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">
          Latest Projects
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No projects available.
          </p>
        )}
      </section>
    </main>
  );
}