interface SkillsCardProps {
  title: string;
  skills: string[];
}

export default function SkillsCard({
  title,
  skills,
}: SkillsCardProps) {
  return (
    <section className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-md">
      <h3 className="mb-4 text-2xl font-bold text-blue-700">
        {title}
      </h3>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}