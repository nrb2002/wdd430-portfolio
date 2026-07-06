interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border-l-4 border-blue-600 bg-gray-50 p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="mb-4 text-gray-700">{description}</p>

      <p className="text-sm text-gray-600">
        <strong>Technologies:</strong> {technologies.join(", ")}
      </p>

      {link && (
        <p className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Project
          </a>
        </p>
      )}
    </article>
  );
}