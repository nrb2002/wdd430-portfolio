import SkillsCard from "@/components/SkillsCard";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">
        About Me
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        I am a software development student interested in web
        development, backend APIs, databases, and cloud technologies.
        I enjoy creating responsive websites and scalable applications
        using modern JavaScript frameworks.
      </p>

      <SkillsCard
        title="Technical Skills"
        skills={[
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Express",
          "MongoDB",
          "Tailwind CSS",
        ]}
      />
    </main>
  );
}