"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GitBranch,
  Search,
  AlertTriangle,
  Shield,
  FileCode,
  FolderTree,
  Key,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface ScanResult {
  type: "vulnerability" | "secret" | "info" | "success"
  severity: "critical" | "high" | "medium" | "low" | "info"
  file: string
  line: number
  message: string
  code?: string
}

const mockScanResults: ScanResult[] = [
  {
    type: "secret",
    severity: "critical",
    file: "config/database.js",
    line: 12,
    message: "Exposed database password in plain text",
    code: 'const DB_PASSWORD = "admin123secure"',
  },
  {
    type: "vulnerability",
    severity: "critical",
    file: "api/users.ts",
    line: 45,
    message: "SQL Injection vulnerability detected",
    code: 'query(`SELECT * FROM users WHERE id = ${userId}`)',
  },
  {
    type: "secret",
    severity: "high",
    file: ".env.example",
    line: 3,
    message: "AWS Access Key exposed in example file",
    code: "AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE",
  },
  {
    type: "vulnerability",
    severity: "medium",
    file: "components/Form.tsx",
    line: 89,
    message: "Potential XSS vulnerability - unescaped user input",
    code: "<div dangerouslySetInnerHTML={{__html: userInput}} />",
  },
  {
    type: "info",
    severity: "low",
    file: "package.json",
    line: 15,
    message: "Outdated dependency with known vulnerabilities",
    code: '"lodash": "^4.17.10"',
  },
  {
    type: "success",
    severity: "info",
    file: "auth/middleware.ts",
    line: 1,
    message: "Secure authentication implementation detected",
  },
]

const terminalLogs = [
  "[INIT] Initializing SecureBob AI scanner...",
  "[INFO] Connecting to GitHub repository...",
  "[AUTH] Authentication successful",
  "[SCAN] Cloning repository structure...",
  "[INFO] Analyzing 1,247 files across 42 directories",
  "[AI] Loading IBM Granite security model...",
  "[SCAN] Scanning JavaScript/TypeScript files...",
  "[SCAN] Scanning configuration files...",
  "[SCAN] Analyzing dependencies...",
  "[AI] Running deep vulnerability analysis...",
  "[WARN] Potential security issues detected",
  "[INFO] Generating detailed report...",
  "[DONE] Scan complete!",
]

export default function GitHubScannerPage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [currentLog, setCurrentLog] = useState(0)
  const [results, setResults] = useState<ScanResult[]>([])

  const startScan = () => {
    if (!repoUrl) return
    setIsScanning(true)
    setScanComplete(false)
    setCurrentLog(0)
    setResults([])
  }

  useEffect(() => {
    if (isScanning && currentLog < terminalLogs.length) {
      const timer = setTimeout(() => {
        setCurrentLog((prev) => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    } else if (isScanning && currentLog >= terminalLogs.length) {
      setIsScanning(false)
      setScanComplete(true)
      setResults(mockScanResults)
    }
  }, [isScanning, currentLog])

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
      default:
        return "text-green-500 bg-green-500/10 border-green-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vulnerability":
        return AlertTriangle
      case "secret":
        return Key
      case "success":
        return CheckCircle
      default:
        return FileCode
    }
  }

  const criticalCount = results.filter((r) => r.severity === "critical").length
  const highCount = results.filter((r) => r.severity === "high").length
  const mediumCount = results.filter((r) => r.severity === "medium").length

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
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">GitHub Repository Scanner</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Scan Your <span className="text-primary glow-text-blue">Repository</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter a GitHub repository URL to perform a comprehensive security analysis 
              powered by IBM watsonx.ai and Granite models.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scanner Input */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <GitBranch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="pl-12 h-12 bg-background border-border text-foreground"
                />
              </div>
              <Button
                onClick={startScan}
                disabled={isScanning || !repoUrl}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground glow-blue"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Start Scan
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Output */}
      <AnimatePresence>
        {(isScanning || scanComplete) && (
          <section className="px-4 pb-8">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="terminal rounded-xl overflow-hidden"
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-secondary/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-muted-foreground text-xs font-mono">securebob-scanner</span>
                </div>

                {/* Terminal content */}
                <div className="p-4 font-mono text-sm max-h-64 overflow-y-auto">
                  {terminalLogs.slice(0, currentLog).map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-1 ${
                        log.includes("[WARN]")
                          ? "text-yellow-400"
                          : log.includes("[DONE]")
                          ? "text-green-400"
                          : log.includes("[AI]")
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  {isScanning && (
                    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Scan Results */}
      <AnimatePresence>
        {scanComplete && (
          <section className="px-4 pb-12">
            <div className="container mx-auto max-w-6xl">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-destructive">{criticalCount}</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-500">{highCount}</div>
                  <div className="text-sm text-muted-foreground">High</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-500">{mediumCount}</div>
                  <div className="text-sm text-muted-foreground">Medium</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-foreground">{results.length}</div>
                  <div className="text-sm text-muted-foreground">Total Issues</div>
                </div>
              </motion.div>

              {/* Results List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Scan Results</h2>
                  <Button variant="outline" size="sm" onClick={startScan}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rescan
                  </Button>
                </div>

                {results.map((result, index) => {
                  const Icon = getTypeIcon(result.type)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card rounded-xl p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getSeverityColor(result.severity)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getSeverityColor(result.severity)}`}>
                              {result.severity}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {result.file}:{result.line}
                            </span>
                          </div>
                          <p className="text-foreground font-medium mb-2">{result.message}</p>
                          {result.code && (
                            <pre className="bg-black/50 rounded-lg p-3 text-sm font-mono text-muted-foreground overflow-x-auto">
                              {result.code}
                            </pre>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!isScanning && !scanComplete && (
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <GitBranch className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to Scan
              </h3>
              <p className="text-muted-foreground mb-6">
                Enter a GitHub repository URL above to start the security analysis.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Vulnerability Detection
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-yellow-500" />
                  Secret Scanning
                </div>
                <div className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4 text-secondary" />
                  Structure Analysis
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
