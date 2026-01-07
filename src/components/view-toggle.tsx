"use client"

import { LayoutGrid, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewToggleProps {
  viewMode: "slide" | "grid"
  onViewModeChange: (mode: "slide" | "grid") => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-secondary rounded-lg p-1">
      <button
        onClick={() => onViewModeChange("slide")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          viewMode === "slide" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline">한 장씩</span>
      </button>
      <button
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          viewMode === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">모아보기</span>
      </button>
    </div>
  )
}
