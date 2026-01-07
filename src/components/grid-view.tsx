"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { LetterCard } from "./letter-card"
import type { Letter } from "@/lib/config"

interface GridViewProps {
  letters: Letter[]
  recipientName: string
}

export function GridView({ letters, recipientName }: GridViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === "Escape") {
        setSelectedIndex(null)
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : letters.length - 1))
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev! < letters.length - 1 ? prev! + 1 : 0))
      }
    }

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
      // 모달이 열려있을 때 스크롤 방지 (html 태그 기준)
      document.documentElement.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.documentElement.style.overflow = ""
    }
  }, [selectedIndex, letters.length])

  if (letters.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">아직 편지가 없어요</p>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">총 {letters.length}개의 마음이 담겼어요💚</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
            >
              <LetterCard
                letter={letter}
                variant="preview"
                className="hover:scale-[1.02] hover:border-primary/40 transition-all cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>

            <LetterCard letter={letters[selectedIndex]} variant="full" />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : letters.length - 1))}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← 이전 페이퍼
              </button>
              <span className="text-sm text-muted-foreground">
                {selectedIndex + 1} / {letters.length}
              </span>
              <button
                onClick={() => setSelectedIndex((prev) => (prev! < letters.length - 1 ? prev! + 1 : 0))}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                다음 페이퍼 →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
