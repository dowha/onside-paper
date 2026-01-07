import { recipients } from "@/lib/config"
import { notFound } from "next/navigation"
import { RollingPaperClient } from "@/components/rolling-paper-client"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function RollingPaperPage({ params }: PageProps) {
  const { slug } = await params
  const config = recipients[slug]

  if (!config) {
    notFound()
  }

  return (
    <RollingPaperClient
      slug={slug}
      recipientName={config.name}
      password={config.password}
      sheetUrl={config.sheetUrl}
      letters={config.letters}
    />
  )
}

// 정적 생성을 위한 params
export function generateStaticParams() {
  return Object.keys(recipients).map((slug) => ({ slug }))
}
