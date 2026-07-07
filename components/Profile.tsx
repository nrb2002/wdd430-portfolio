import Image from "next/image";

export default function Profile() {
  return (
    <section className="flex flex-col items-center text-center py-8">
      <Image
        src="/baron.jpg"
        alt="Baron Tshibasu profile picture"
        width={200}
        height={200}
        className="rounded-full object-cover shadow-lg"
      />

      <h2 className="mt-4 text-3xl font-bold">
        Baron Tshibasu
      </h2>

      <p className="mt-2 text-gray-700">
        Full-stack developer building modern web applications.
      </p>
    </section>
  );
}