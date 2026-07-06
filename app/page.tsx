import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "TikCat Event Ticketing API",
    description:
      "A RESTful API for managing events, venues, tickets, users, and orders using Node.js and MongoDB.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Swagger",
      "JWT",
    ],
    link: "https://tikcat-api.onrender.com/",
  },
  {
    title: "Congo Empire Travel",
    description:
      "A responsive travel website promoting tourism in the Democratic Republic of the Congo.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Vite",
    ],
    link: "https://congoempire.org/",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          My Portfolio
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome! I'm a software developer passionate about full-stack development, modern web technologies, and building useful applications with React and Next.js.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}