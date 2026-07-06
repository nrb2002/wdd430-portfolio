export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Baron Tshibasu | All
          rights reserved
        </p>
      </div>
    </footer>
  );
}