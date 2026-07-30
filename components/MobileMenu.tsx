// components/MobileMenu.tsx

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen]);

  // Close menu when pressing Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="relative md:hidden"
    >
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={
          isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-white hover:bg-[#081C33] focus:outline-none focus:ring-2 focus:ring-white"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="absolute right-0 mt-3 w-48 rounded-xl border border-white/20 bg-[#0B2545]/95 text-white shadow-xl backdrop-blur-md"
        >
          <ul className="flex flex-col gap-2 p-3">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
              >
                Home
              </Link>
            </li>

            {/* Projects */}
            <li>
              <details>
                <summary className="cursor-pointer list-none rounded-lg px-4 py-2 text-white hover:bg-[#081C33]">
                  Projects ▾
                </summary>

                <div className="mt-2 ml-2 flex flex-col gap-1 border-l border-white/20 pl-2">
                  <Link
                    href="/projects"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                  >
                    All Projects
                  </Link>

                  <Link
                    href="/projects/opensource"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
                  >
                    Open Source
                  </Link>

                  <Link
                    href="/projects/school"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
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
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-2 text-white hover:bg-[#081C33]"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}