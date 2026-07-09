"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D946EF] to-[#5A189A] text-lg font-bold">
            🌃
          </span>
          <span className="text-lg font-bold tracking-tight">
            Neon Zoo City
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#8b8d9a] md:flex">
          <Link href="/district/arena" className="transition-colors hover:text-white">
            远行竞技场
          </Link>
          <Link href="/district/theater" className="transition-colors hover:text-white">
            光影剧场
          </Link>
          <Link href="/district/gallery" className="transition-colors hover:text-white">
            高级画廊
          </Link>
          <Link href="/district/tower" className="transition-colors hover:text-white">
            记忆高塔
          </Link>
          <Link href="/about" className="transition-colors hover:text-white">
            关于
          </Link>
        </div>
      </nav>
    </header>
  );
}
