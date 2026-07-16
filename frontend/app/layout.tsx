import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://neon-zoo-city.vercel.app"
  ),
  title: {
    default: "Neon Zoo City | 研学×AI数字产品创作者",
    template: "%s | Neon Zoo City",
  },
  description:
    "一座未来数字动物城，记录研学设计、AIGC 创作、数字产品探索与国际交流的轨迹。",
  keywords: [
    "研学",
    "AIGC",
    "数字产品",
    "国际教育",
    "城市探索",
    "个人档案",
    "Lilia",
  ],
  authors: [{ name: "Lilia" }],
  creator: "Lilia",
  publisher: "Lilia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Neon Zoo City",
    title: "Neon Zoo City | 研学×AI数字产品创作者",
    description:
      "五只动物，五座街区，一座记录研学、AIGC 创作与数字产品成长的未来城市。",
    images: [
      {
        url: "/hero/team-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Neon Zoo City - 五只动物居民掌管的数字城市",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neon Zoo City | 研学×AI数字产品创作者",
    description:
      "五只动物，五座街区，一座记录研学、AIGC 创作与数字产品成长的未来城市。",
    images: ["/hero/team-banner.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b12" },
    { media: "(prefers-color-scheme: light)", color: "#f0f0f5" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0a0b12] text-[#f0f0f5]">
        {children}
      </body>
    </html>
  );
}
