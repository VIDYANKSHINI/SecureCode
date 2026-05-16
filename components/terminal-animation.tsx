"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const terminalLines = [
  { text: "$ securebob scan --repo github.com/example/app", color: "text-secondary" },
  { text: "[INFO] Initializing AI security analysis...", color: "text-muted-foreground" },
  { text: "[SCAN] Analyzing 1,247 files across 42 directories", color: "text-primary" },
  { text: "[AI] Loading IBM Granite security model...", color: "text-muted-foreground" },
  { text: "[WARN] Detected exposed API key in config.js:24", color: "text-yellow-400" },
  { text: "[CRITICAL] SQL injection vulnerability in api/users.ts:156", color: "text-destructive" },
  { text: "[WARN] Hardcoded JWT secret in auth.ts:12", color: "text-yellow-400" },
  { text: "[INFO] Generating security report...", color: "text-muted-foreground" },
  { text: "[DONE] Found 3 vulnerabilities, 2 secrets exposed", color: "text-secondary" },
  { text: "$ _", color: "text-secondary" },
]

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentChar, setCurrentChar] = useState<number>(0)

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          return 0
        }
        return prev + 1
      })
    }, 800)

    return () => clearInterval(lineInterval)
  }, [])

  return (
    <motion.div
      className="terminal rounded-lg p-4 font-mono text-sm overflow-hidden max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-secondary/20">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-secondary/80" />
        <span className="ml-2 text-muted-foreground text-xs">securebob-ai-terminal</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 min-h-[240px]">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${line.color} ${index === visibleLines - 1 && line.text.endsWith("_") ? "cursor-blink" : ""}`}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}