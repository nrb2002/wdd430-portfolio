import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-dark shadow-md">
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
                  className="rounded-lg px-4 py-2 hover:bg-[#081C33] text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                  <Link
                    href="/projects"
                    className="rounded-lg px-4 py-2 hover:bg-[#081C33] text-white"
                  >
                    Projects
                  </Link>
                </li>

              <li>
                <Link
                  href="/about"
                  className="rounded-lg px-4 py-2 hover:bg-[#081C33] text-white"
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

            <nav className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0B2545]/90 backdrop-blur-md text-white shadow-xl border border-white/20">
              <ul className="flex flex-col gap-2 p-3">
                <li>
                  <Link
                    href="/"
                    className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/projects"
                    className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    Projects
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
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