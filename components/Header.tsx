import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4">

        <div className="flex items-center justify-between">

          {/* Logo / Name */}
          <h1 className="text-2xl font-bold">
            Baron Tshibasu
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-200 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-200 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>


          {/* Mobile Menu */}
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none text-2xl">
              ☰
            </summary>

            <nav className="absolute right-0 mt-3 w-40 rounded-lg bg-white text-gray-800 shadow-lg">
              <ul className="flex flex-col p-4 gap-2">

                <li>
                  <Link
                    href="/"
                    className="block rounded-md px-3 py-2 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="block rounded-md px-3 py-2 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    About
                  </Link>
                </li>

              </ul>
            </nav>
          </details>

        </div>

      </div>
    </header>
  );
}