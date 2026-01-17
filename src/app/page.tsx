import Image from "next/image"
import Link from "next/link"
import { recipients } from "@/lib/config"
import logo from "../../public/logo.png"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
            <Image src={logo} alt="ONSIDE Logo" width={96} height={96} className="w-full h-full object-contain p-2" unoptimized />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">온사이드 롤링페이퍼</h1>
            <p className="text-muted-foreground">for 2기 운영진💚</p>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(recipients).map(([slug, config]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="block w-full py-4 px-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <span className="font-medium text-foreground">{config.name}에게</span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
