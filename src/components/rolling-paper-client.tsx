"use client"

import { useState, useEffect } from "react"
import { PasswordScreen } from "./password-screen"
import { RollingPaper } from "./rolling-paper"
import type { Letter } from "@/lib/config"

interface RollingPaperClientProps {
  slug: string
  recipientName: string
  password: string
  sheetUrl?: string
  letters?: Letter[]
}

export function RollingPaperClient({ slug, recipientName, password, sheetUrl, letters }: RollingPaperClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // 세션 스토리지에서 인증 상태 확인
  useEffect(() => {
    const authKey = `auth_${slug}`
    const isAuth = sessionStorage.getItem(authKey) === "true"
    setIsAuthenticated(isAuth)
    setIsChecking(false)
  }, [slug])

  const handleAuthenticated = () => {
    const authKey = `auth_${slug}`
    sessionStorage.setItem(authKey, "true")
    setIsAuthenticated(true)
  }

  if (isChecking) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <PasswordScreen
        slug={slug}
        recipientName={recipientName}
        expectedPassword={password}
        onAuthenticated={handleAuthenticated}
      />
    )
  }

  return (
    <RollingPaper
      recipientName={recipientName}
      sheetUrl={sheetUrl || ""}
      initialLetters={letters}
    />
  )
}
