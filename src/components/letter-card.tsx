"use client"

import type { Letter } from "@/lib/config"
import { cn } from "@/lib/utils"

interface LetterCardProps {
  letter: Letter
  className?: string
  variant?: "full" | "preview"
}

export function LetterCard({ letter, className, variant = "full" }: LetterCardProps) {
  const isPreview = variant === "preview"

  return (
    <article
      className={cn(
        "bg-card rounded-xl border-2 border-primary/20 p-8 shadow-sm",
        "flex flex-col",
        "relative overflow-hidden",
        isPreview ? "h-[280px]" : "min-h-[280px] max-h-[70vh]",
        className,
      )}
    >
      {/* 축구장 라인 장식 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 border-2 border-t-0 border-primary/10 rounded-b-full" />

      <div className={cn("flex-1 pt-4", isPreview ? "overflow-hidden" : "overflow-y-auto pr-2 scrollbar-thin")}>
        <blockquote className={cn("text-lg leading-relaxed text-card-foreground", isPreview && "line-clamp-5")}>
          {letter.content}
        </blockquote>
      </div>

      {isPreview && letter.content.length > 150 && (
        <p className="text-xs text-muted-foreground mt-2">클릭해서 전체 보기...</p>
      )}

      <footer className="mt-4 pt-4 border-t border-border shrink-0">
        <p className="text-right text-primary font-semibold">- {letter.author}</p>
      </footer>
    </article>
  )
}
