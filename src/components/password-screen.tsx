"use client"
import Image from "next/image"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PasswordScreenProps {
  slug: string
  recipientName: string
  expectedPassword: string
  onAuthenticated: () => void
}

export function PasswordScreen({ slug, recipientName, expectedPassword, onAuthenticated }: PasswordScreenProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // 정적 배포(GitHub Pages)를 위해 클라이언트 사이드에서 검증
    setTimeout(() => {
      if (password === expectedPassword) {
        onAuthenticated()
      } else {
        setError("비밀번호가 올바르지 않습니다")
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="ONSIDE Logo" width={80} height={80} className="w-full h-full object-contain p-2" unoptimized />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">ONSIDE</p>
              <h1 className="text-2xl font-bold text-foreground">{recipientName}에게</h1>
              <p className="text-muted-foreground mt-2 text-sm">비밀번호를 입력해주세요</p>
            </div>
          </div>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="text-center bg-card"
              autoFocus
            />
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !password}>
            {isLoading ? "확인 중..." : "입장하기"}
          </Button>
        </form>
      </div>
    </main>
  )
}
