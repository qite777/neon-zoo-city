import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0b12] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#39FF14] to-[#009624] text-lg">
              🦥
            </span>
            <div>
              <p className="font-bold">Slate 的慢闪档案馆</p>
              <p className="text-sm text-[#8b8d9a]">城市电力稳定，档案持续归档中。</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm text-[#8b8d9a]">
            <Link href="/" className="transition-colors hover:text-white">
              首页
            </Link>
            <Link href="/district/arena" className="transition-colors hover:text-white">
              研学日志
            </Link>
            <Link href="/district/theater" className="transition-colors hover:text-white">
              作品
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              关于
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[#8b8d9a]">
          © 2026 Neon Zoo City. Built with Next.js + Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
