"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Eye,
  GitPullRequest,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Minus,
  FileCode,
  Shield,
  Key,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface ReviewResult {
  type: "security" | "secret" | "quality" | "safe"
  severity: "critical" | "high" | "medium" | "low" | "safe"
  file: string
  line: number
  change: "added" | "removed" | "modified"
  description: string
  suggestion?: string
}

const examplePRCode = `diff --git a/api/auth.ts b/api/auth.ts
index 1234567..abcdefg 100644
--- a/api/auth.ts
+++ b/api/auth.ts
@@ -10,6 +10,15 @@ export async function login(req: Request) {
   const { email, password } = await req.json();
   
+  // Quick fix for production
+  const ADMIN_PASSWORD = "admin123";
+  if (password === ADMIN_PASSWORD) {
+    return Response.json({ token: "admin-token" });
+  }
+
   const user = await db.query(\`
-    SELECT * FROM users WHERE email = ? AND password = ?
+    SELECT * FROM users WHERE email = '\${email}' AND password = '\${password}'
   \`, [email, password]);
   
+  // Debug: log user credentials
+  console.log("Login attempt:", { email, password });
+
   if (user) {
     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
     return Response.json({ token });
   }
   
   return Response.json({ error: "Invalid credentials" }, { status: 401 });
 }

diff --git a/.env.example b/.env.example
index 7654321..1234abc 100644
--- a/.env.example
+++ b/.env.example
@@ -1,3 +1,5 @@
 DATABASE_URL=postgresql://localhost:5432/mydb
 JWT_SECRET=your-secret-here
+AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
+AWS_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

const mockResults: ReviewResult[] = [
  {
    type: "secret",
    severity: "critical",
    file: "api/auth.ts",
    line: 13,
    change: "added",
    description: "Hardcoded admin password added to authentication logic",
    suggestion: "Remove hardcoded password and use secure authentication flow",
  },
  {
    type: "security",
    severity: "critical",
    file: "api/auth.ts",
    line: 20,
    change: "modified",
    description: "SQL injection vulnerability introduced - user input directly in query",
    suggestion: "Use parameterized queries: db.query('SELECT * FROM users WHERE email = ?', [email])",
  },
  {
    type: "security",
    severity: "high",
    file: "api/auth.ts",
    line: 24,
    change: "added",
    description: "Sensitive credentials being logged - potential data exposure",
    suggestion: "Remove console.log statement that exposes user passwords",
  },
  {
    type: "secret",
    severity: "critical",
    file: ".env.example",
    line: 4,
    change: "added",
    description: "AWS credentials exposed in example environment file",
    suggestion: "Never commit real credentials, even in example files",
  },
  {
    type: "safe",
    severity: "safe",
    file: "api/auth.ts",
    line: 28,
    change: "added",
    description: "JWT signing uses environment variable - good practice",
  },
]

export default function PRReviewPage() {
  const [code, setCode] = useState("")
  const [isReviewing, setIsReviewing] = useState(false)
  const [results, setResults] = useState<ReviewResult[]>([])

const handleReview = async () => {
  if (!code.trim()) return

  setIsReviewing(true)
  setResults([])

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    const response = await fetch(`${API_URL}/review-pr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code_content: code,
      }),
    })

    const data = await response.json()

    const formattedResults: ReviewResult[] = data.findings.map((item: any, index: number) => ({
      type: item.type?.toLowerCase().includes("key") || item.type?.toLowerCase().includes("password")
        ? "secret"
        : "security",
      severity: item.severity.toLowerCase(),
      file: "PR Changes",
      line: index + 1,
      change: "added",
      description: item.ai_explanation || item.message,
      suggestion: item.recommended_fix || item.recommendation,
    }))

    setResults(formattedResults)
  } catch (error) {
    console.error("PR review failed:", error)
  } finally {
    setIsReviewing(false)
  }
}

  const loadExample = () => {
    setCode(examplePRCode)
    setResults([])
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/30"
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/30"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      case "low":
        return "text-blue-500 bg-blue-500/10 border-blue-500/30"
      case "safe":
        return "text-green-500 bg-green-500/10 border-green-500/30"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return AlertTriangle
      case "secret":
        return Key
      case "safe":
        return CheckCircle
      default:
        return FileCode
    }
  }

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "added":
        return { icon: Plus, color: "text-green-500" }
      case "removed":
        return { icon: Minus, color: "text-red-500" }
      default:
        return { icon: FileCode, color: "text-yellow-500" }
    }
  }

  const criticalCount = results.filter((r) => r.severity === "critical").length
  const highCount = results.filter((r) => r.severity === "high").length
  const safeCount = results.filter((r) => r.severity === "safe").length

  return (
    <main className="min-h-screen bg-background relative">
      <CyberBackground />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <GitPullRequest className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Pull Request Security Review</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Review <span className="text-secondary glow-text-green">PR Changes</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Paste your pull request diff to analyze code changes for newly 
              introduced security vulnerabilities and risky patterns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PR Input */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">PR Diff / Code Changes</h2>
              <Button variant="outline" size="sm" onClick={loadExample}>
                <GitPullRequest className="mr-2 h-4 w-4" />
                Load Example
              </Button>
            </div>
            
            <Textarea
              placeholder="Paste your PR diff or code changes here for security review..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm bg-background border-border resize-none"
            />
            
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleReview}
                disabled={isReviewing || !code.trim()}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isReviewing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Reviewing...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Review Changes
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      <AnimatePresence>
        {isReviewing && (
          <section className="px-4 pb-8">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-secondary animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Reviewing Pull Request...
                </h3>
                <p className="text-muted-foreground">
                  AI is analyzing code changes for security risks
                </p>
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <section className="px-4 pb-12">
            <div className="container mx-auto max-w-4xl">
              {/* Merge Safety */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 mb-6 ${
                  criticalCount > 0
                    ? "bg-red-500/10 border border-red-500/30"
                    : highCount > 0
                    ? "bg-orange-500/10 border border-orange-500/30"
                    : "bg-green-500/10 border border-green-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {criticalCount > 0 ? (
                    <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  ) : highCount > 0 ? (
                    <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${
                      criticalCount > 0
                        ? "text-red-500"
                        : highCount > 0
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}>
                      {criticalCount > 0
                        ? "Do Not Merge - Critical Issues Found"
                        : highCount > 0
                        ? "Review Required - High Risk Changes"
                        : "Safe to Merge"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Found {criticalCount} critical, {highCount} high, and {safeCount} safe changes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-4 gap-4 mb-8"
              >
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{highCount}</div>
                  <div className="text-xs text-muted-foreground">High</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{safeCount}</div>
                  <div className="text-xs text-muted-foreground">Safe</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{results.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </motion.div>

              {/* Review Items */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Review Findings</h2>
                
                {results.map((result, index) => {
                  const Icon = getTypeIcon(result.type)
                  const { icon: ChangeIcon, color: changeColor } = getChangeIcon(result.change)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getSeverityColor(result.severity)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getSeverityColor(result.severity)}`}>
                              {result.severity}
                            </span>
                            <span className="text-foreground font-semibold">{result.file}</span>
                            <span className="text-muted-foreground text-sm">Line {result.line}</span>
                            <span className={`flex items-center gap-1 text-xs ${changeColor}`}>
                              <ChangeIcon className="h-3 w-3" />
                              {result.change}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{result.description}</p>
                          
                          {result.suggestion && (
                            <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4 text-secondary" />
                                <span className="text-sm font-medium text-secondary">Suggestion</span>
                              </div>
                              <p className="text-sm text-muted-foreground font-mono">{result.suggestion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!isReviewing && results.length === 0 && !code && (
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <GitPullRequest className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Review Pull Request Changes
              </h3>
              <p className="text-muted-foreground mb-6">
                Paste your PR diff above to analyze for security vulnerabilities before merging.
              </p>
              <Button onClick={loadExample} variant="outline">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Load Example PR
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
