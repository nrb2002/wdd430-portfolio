// app/projects/page.tsx

interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Projects Overview</h2>

      <p className="mb-6">Welcome to my projects page.</p>

      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>

            <p className="mt-2">{project.description}</p>

            <p className="mt-2">
              <strong>Type:</strong> {project.type}
            </p>

            <p className="mt-2">
              <strong>Technologies:</strong>{" "}
              {project.technologies.join(", ")}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Project
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}