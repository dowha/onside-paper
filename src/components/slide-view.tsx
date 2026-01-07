"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LetterCard } from "./letter-card"
import type { Letter } from "@/lib/config"
import { cn } from "@/lib/utils"

interface SlideViewProps {
  letters: Letter[]
  recipientName: string
}

export function SlideView({ letters, recipientName }: SlideViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = letters.length + 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  if (letters.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">아직 편지가 없어요</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-6xl mx-auto flex flex-col items-center justify-start px-6 py-8">
      {/* Card Container */}
      <div className="relative w-full max-w-lg flex-1 flex flex-col justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          aria-label="이전 편지"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          aria-label="다음 편지"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Letter Card */}
        <div className="relative">
          {/* Stacked cards effect */}
          <div className="absolute inset-0 bg-card rounded-2xl border border-border transform rotate-2 translate-x-2 translate-y-2 opacity-30" />
          <div className="absolute inset-0 bg-card rounded-2xl border border-border transform -rotate-1 translate-x-1 translate-y-1 opacity-50" />

          {currentIndex === 0 ? (
            <div className="relative bg-card rounded-xl border-2 border-primary/20 min-h-[280px] max-h-[70vh] flex flex-col items-center justify-center p-10 text-center shadow-sm">
              <div className="space-y-1 mb-8">
                <p className="text-muted-foreground text-sm font-medium">
                  2년간 고생 많이 한
                </p>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  {recipientName}에게 💚
                </h3>
              </div>
              <button
                onClick={goToNext}
                className="px-8 py-2.5 bg-primary text-primary-foreground rounded-full font-bold shadow-md hover:opacity-90 transition-all active:scale-95"
              >
                편지 읽기 시작
              </button>
            </div>
          ) : (
            <LetterCard letter={letters[currentIndex - 1]} variant="full" className="relative" />
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 flex items-center gap-2 shrink-0">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>

      {/* Dot Indicators */}
      <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center max-w-md shrink-0">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-primary w-4" : "bg-border hover:bg-muted-foreground",
            )}
            aria-label={`${index === 0 ? "시작 페이지" : index + "번째 편지"}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
