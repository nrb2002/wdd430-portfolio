import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-dark shadow-md">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo / Name */}
          <h1 className="text-2xl font-bold">
            Baron Tshibasu
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6">

              {/* Home */}
              <li>
                <Link
                  href="/"
                  className="rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                >
                  Home
                </Link>
              </li>

              {/* Projects Dropdown */}
              <li className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                >
                  Projects
                  <span className="text-sm">▾</span>
                </button>

                {/* Desktop Dropdown */}
                <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-white/20 bg-[#0B2545]/95 p-2 text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:opacity-100">

                  <Link
                    href="/projects"
                    className="block rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    All Projects
                  </Link>

                  <Link
                    href="/opensource"
                    className="block rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    Open Source
                  </Link>

                  <Link
                    href="/school"
                    className="block rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    School Projects
                  </Link>

                </div>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/about"
                  className="rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
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

            <nav className="absolute right-0 mt-3 w-48 rounded-xl border border-white/20 bg-[#0B2545]/90 text-white shadow-xl backdrop-blur-md">
              <ul className="flex flex-col gap-2 p-3">

                {/* Home */}
                <li>
                  <Link
                    href="/"
                    className="block rounded-lg px-4 py-2 hover:bg-[#081C33]"
                  >
                    Home
                  </Link>
                </li>

                {/* Projects Mobile Dropdown */}
                <li>
                  <details>
                    <summary className="cursor-pointer list-none rounded-lg px-4 py-2 hover:bg-[#081C33]">
                      Projects ▾
                    </summary>

                    <div className="mt-2 ml-2 flex flex-col gap-1 border-l border-white/20 pl-2">

                      <Link
                        href="/projects"
                        className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
                      >
                        All Projects
                      </Link>

                      <Link
                        href="/opensource"
                        className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
                      >
                        Open Source
                      </Link>

                      <Link
                        href="/school"
                        className="rounded-lg px-4 py-2 hover:bg-[#081C33]"
                      >
                        School Projects
                      </Link>

                    </div>
                  </details>
                </li>

                {/* About */}
                <li>
                  <Link
                    href="/about"
                    className="block rounded-lg px-4 py-2 hover:bg-[#081C33]"
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