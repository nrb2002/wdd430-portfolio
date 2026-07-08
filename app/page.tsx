import Image from "next/image";
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
    link: "https://github.com/nrb2002/tikcat-api",
  },
  {
    title: "FountTechs API",
    description:
      "A RESTful API for managing a collection of technologies, allowing users to perform CRUD operations on technology data.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Vite",
    ],
    link: "https://github.com/nrb2002/FountTechs-API",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          My Portfolio
        </h1>
        <Image
          src="/baron.jpg"
          alt="Baron Tshibasu profile picture"
          width={180}
          height={180}
          className="mx-auto rounded-full object-cover shadow-md mb-6"
        />

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to My Portfolio site! I'm a software developer passionate about full-stack
          development, modern web technologies, and building useful
          applications with React and Next.js.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}