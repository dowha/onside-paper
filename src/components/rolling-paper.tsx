"use client"
import Image from "next/image"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ViewToggle } from "./view-toggle"
import { SlideView } from "./slide-view"
import { GridView } from "./grid-view"
import { Loader2 } from "lucide-react"

import type { Letter } from "@/lib/config"

interface RollingPaperProps {
  recipientName: string
  sheetUrl?: string
  initialLetters?: Letter[]
}

const defaultLetters: Letter[] = [
  { content: "롤링페이퍼에 도착한 메시지가 아직 없습니다.", author: "온사이드" },
]

export function RollingPaper({ recipientName, sheetUrl, initialLetters }: RollingPaperProps) {
  const [viewMode, setViewMode] = useState<"slide" | "grid">("slide")
  const [letters, setLetters] = useState<Letter[]>(initialLetters && initialLetters.length > 0 ? initialLetters : defaultLetters)
  const [isLoading, setIsLoading] = useState(!initialLetters || initialLetters.length === 0)

  useEffect(() => {
    if (!initialLetters || initialLetters.length === 0) {
      fetchSheetData(sheetUrl || "")
    }
  }, [sheetUrl, initialLetters])

  const fetchSheetData = async (url: string) => {
    if (!url || !url.includes("docs.google.com")) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      let csvUrl = url

      // 이미 CSV나 export URL이 아니라면 변환 시도
      if (!url.includes("format=csv") && !url.includes("output=csv")) {
        const sheetId = extractSheetId(url)
        const gid = extractGid(url)

        if (!sheetId) {
          setIsLoading(false)
          return
        }
        csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gid ? `&gid=${gid}` : ""}`
      }

      const response = await fetch(csvUrl)
      if (!response.ok) throw new Error("Network response was not ok")

      const csvText = await response.text()
      const parsedLetters = parseCSV(csvText)

      if (parsedLetters.length > 0) {
        setLetters(parsedLetters)
      }
    } catch (error) {
      console.error("Failed to fetch sheet data:", error)
      // 에러 발생 시 기본 메시지 혹은 현재 상태 유지
    } finally {
      setIsLoading(false)
    }
  }

  const extractSheetId = (url: string): string | null => {
    // 일반 /d/ ID 또는 웹 게시용 /d/e/ ID 모두 대응
    const match = url.match(/\/spreadsheets\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/)
    return match ? match[1] : null
  }

  const extractGid = (url: string): string | null => {
    const match = url.match(/[#&?]gid=([0-9]+)/)
    return match ? match[1] : null
  }

  const parseCSV = (csv: string): Letter[] => {
    const results: Letter[] = []
    let currentField = ""
    let inQuotes = false
    let currentRow: string[] = []

    // 쉼표로 구분된 CSV를 따옴표와 줄바꿈을 고려하여 순회
    for (let i = 0; i < csv.length; i++) {
      const char = csv[i]
      const nextChar = csv[i + 1]

      if (inQuotes) {
        if (char === '"' && nextChar === '"') {
          // 따옴표 이스케이프 ("") 처리
          currentField += '"'
          i++
        } else if (char === '"') {
          // 따옴표 닫힘
          inQuotes = false
        } else {
          currentField += char
        }
      } else {
        if (char === '"') {
          inQuotes = true
        } else if (char === ",") {
          // 필드 구분
          currentRow.push(currentField.trim())
          currentField = ""
        } else if (char === "\n" || char === "\r") {
          // 행 구분
          if (currentField || currentRow.length > 0) {
            currentRow.push(currentField.trim())
            if (currentRow.length >= 2) {
              results.push({
                content: currentRow[0] || "",
                author: currentRow[1] || "익명",
              })
            }
            currentField = ""
            currentRow = []
          }
          if (char === "\r" && nextChar === "\n") i++ // CRLF 처리
        } else {
          currentField += char
        }
      }
    }

    // 마지막 행 처리
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField.trim())
      if (currentRow.length >= 2) {
        results.push({
          content: currentRow[0] || "",
          author: currentRow[1] || "익명",
        })
      }
    }

    // 첫 번째 줄이 헤더인지 데이터인지 확인
    const hasHeader = results.length > 0 &&
      (results[0].content.toLowerCase().includes("content") ||
        results[0].content.includes("내용") ||
        results[0].content.includes("편지") ||
        results[0].author.toLowerCase().includes("author") ||
        results[0].author.includes("작성자"));

    const finalLetters = hasHeader ? results.slice(1) : results;

    // 빈 내용 필터링
    return finalLetters.filter((letter) => letter.content.trim());
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="bg-secondary rounded-lg p-1">
            <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card text-foreground shadow-sm hover:opacity-80 transition-all">
              <Image src="/logo.png" alt="ONSIDE Logo" width={20} height={20} className="w-5 h-5 object-contain" unoptimized />
              <span className="text-sm font-bold leading-tight">온사이드 롤링페이퍼</span>
            </Link>
          </div>
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </header>

      <div className="pt-16">
        {isLoading ? (
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : viewMode === "slide" ? (
          <SlideView letters={letters} recipientName={recipientName} />
        ) : (
          <GridView letters={letters} recipientName={recipientName} />
        )}
      </div>
    </main>
  )
}
