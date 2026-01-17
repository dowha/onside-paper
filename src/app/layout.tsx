import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://dowha.github.io/onside-paper"),
  title: "롤링페이퍼 | ONSIDE",
  description: "온사이드 멤버들의 마음이 담긴 롤링페이퍼입니다.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "온사이드 롤링페이퍼",
    description: "마음을 담은 편지들",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "온사이드 롤링페이퍼",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "온사이드 롤링페이퍼",
    description: "마음을 담은 편지들",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
