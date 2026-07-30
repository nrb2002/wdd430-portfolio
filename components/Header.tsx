// components/Header.tsx

import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="bg-primary text-dark shadow-md">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <h1 className="text-2xl font-bold">
            <Link href="/">
              Baron Tshibasu
            </Link>
            
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className="flex h-10 items-center rounded-lg px-4 text-white transition-colors hover:bg-[#081C33]"
                >
                  Home
                </Link>
              </li>

              {/* Projects Dropdown */}
              <li className="group relative">
                <button
                  type="button"
                  className="flex h-10 items-center gap-1 rounded-lg border-0 bg-transparent px-4 text-white transition-colors hover:bg-[#081C33]"
                >
                  <span>Projects</span>
                  <span className="text-sm">▾</span>
                </button>

                {/* Desktop Dropdown */}
                <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-white/20 bg-[#0B2545]/95 p-2 text-white opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/projects"
                    className="block rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                  >
                    All Projects
                  </Link>

                  <Link
                    href="/projects/opensource"
                    className="block rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                  >
                    Open Source
                  </Link>

                  <Link
                    href="/projects/school"
                    className="block rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                  >
                    School Projects
                  </Link>
                </div>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/about"
                  className="flex h-10 items-center rounded-lg px-4 text-white transition-colors hover:bg-[#081C33]"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}