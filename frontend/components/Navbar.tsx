"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/district/arena", label: "远行竞技场" },
  { href: "/district/theater", label: "光影剧场" },
  { href: "/district/gallery", label: "高级画廊" },
  { href: "/district/tower", label: "记忆高塔" },
  { href: "/about", label: "关于" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D946EF] to-[#5A189A] text-lg font-bold"
            aria-hidden="true"
          >
            🌃
          </span>
          <span className="text-lg font-bold tracking-tight">
            Neon Zoo City
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#8b8d9a] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile nav drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-x-0 top-[65px] bottom-0 z-40 flex flex-col border-t border-white/10 bg-[#0a0b12]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-center text-lg font-medium text-white transition-colors hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
