"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Key,
  Shield,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Database,
  Cloud,
  Lock,
  Zap,
  FileCode,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface SecretResult {
  type: string
  severity: "critical" | "high" | "medium"
  line: number
  value: string
  maskedValue: string
  description: string
  platform: string
}

const exampleCode = `// Configuration file with exposed secrets
require('dotenv').config();

// API Keys
const STRIPE_SECRET_KEY = "sk_test_REDACTED_FOR_DEMO";
const OPENAI_API_KEY = "sk_test_REDACTED_FOR_DEMO";
const SENDGRID_API_KEY = "SG_REDACTED_FOR_DEMO";

// AWS Credentials
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// Database Credentials
const DATABASE_URL = "postgresql://admin:SuperSecretPassword123@db.example.com:5432/production";
const MONGODB_URI = "mongodb+srv://user:MyPassword456@cluster.mongodb.net/mydb";

// JWT Secrets
const JWT_SECRET = "my-super-secret-jwt-key-that-should-not-be-here";
const SESSION_SECRET = "keyboard-cat-secret-123";

// Firebase Config
const FIREBASE_API_KEY = "AIzaSyDOCAbC123dEf456GhI789jKl0-MnOpQr";

// GitHub Token
const GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// Private Keys
const PRIVATE_KEY = \`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF1w
-----END RSA PRIVATE KEY-----\`;`

const mockResults: SecretResult[] = [
  {
    type: "Stripe Secret Key",
    severity: "critical",
    line: 5,
    value: "sk_test_REDACTED_FOR_DEMO",
    maskedValue: "sk_test_***REDACTED***",
    description: "Stripe API key exposed - can process payments",
    platform: "Stripe",
  },
  {
    type: "OpenAI API Key",
    severity: "high",
    line: 6,
    value: "sk-proj-abcdef1234567890ABCDEF",
    maskedValue: "sk-proj-abcd***************DEF",
    description: "OpenAI API key can incur charges on your account",
    platform: "OpenAI",
  },
  {
    type: "AWS Access Key",
    severity: "critical",
    line: 10,
    value: "AKIAIOSFODNN7EXAMPLE",
    maskedValue: "AKIA***************PLE",
    description: "AWS credentials can access cloud resources",
    platform: "AWS",
  },
  {
    type: "AWS Secret Key",
    severity: "critical",
    line: 11,
    value: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    maskedValue: "wJal*********************KEY",
    description: "AWS secret key paired with access key",
    platform: "AWS",
  },
  {
    type: "Database Password",
    severity: "critical",
    line: 14,
    value: "SuperSecretPassword123",
    maskedValue: "Super***************123",
    description: "Production database credentials exposed",
    platform: "PostgreSQL",
  },
  {
    type: "MongoDB URI",
    severity: "critical",
    line: 15,
    value: "MyPassword456",
    maskedValue: "MyPas***456",
    description: "MongoDB connection string with password",
    platform: "MongoDB",
  },
  {
    type: "JWT Secret",
    severity: "high",
    line: 18,
    value: "my-super-secret-jwt-key-that-should-not-be-here",
    maskedValue: "my-super***************here",
    description: "JWT signing key - can forge authentication tokens",
    platform: "JWT",
  },
  {
    type: "Firebase API Key",
    severity: "medium",
    line: 22,
    value: "AIzaSyDOCAbC123dEf456GhI789jKl0-MnOpQr",
    maskedValue: "AIzaS***************OpQr",
    description: "Firebase API key exposed",
    platform: "Firebase",
  },
  {
    type: "GitHub Token",
    severity: "high",
    line: 25,
    value: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    maskedValue: "ghp_xx***************xxxx",
    description: "GitHub personal access token",
    platform: "GitHub",
  },
  {
    type: "RSA Private Key",
    severity: "critical",
    line: 28,
    value: "-----BEGIN RSA PRIVATE KEY-----",
    maskedValue: "-----BEGIN RSA PRIVATE KEY-----",
    description: "Private cryptographic key exposed",
    platform: "Crypto",
  },
]

export default function SecretScannerPage() {
  const [code, setCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<SecretResult[]>([])
  const [showSecrets, setShowSecrets] = useState<Record<number, boolean>>({})

  const handleScan = () => {
    if (!code.trim()) return
    setIsScanning(true)
    setResults([])
    
    setTimeout(() => {
      setIsScanning(false)
      setResults(mockResults)
    }, 2000)
  }

  const loadExample = () => {
    setCode(exampleCode)
    setResults([])
  }

  const toggleSecret = (index: number) => {
    setShowSecrets((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/30"
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/30"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "AWS":
        return Cloud
      case "PostgreSQL":
      case "MongoDB":
        return Database
      case "JWT":
      case "Crypto":
        return Lock
      default:
        return Key
    }
  }

  const criticalCount = results.filter((r) => r.severity === "critical").length
  const highCount = results.filter((r) => r.severity === "high").length

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
              <Key className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Secret Leak Detection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Find <span className="text-yellow-500">Exposed Secrets</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detect API keys, JWT secrets, AWS credentials, passwords, and other 
              sensitive data hiding in your codebase.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Secret Types */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {["API Keys", "AWS Creds", "JWT Secrets", "Passwords", "Private Keys", "Tokens"].map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full text-sm bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
              >
                {type}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code Input */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Paste Your Code</h2>
              <Button variant="outline" size="sm" onClick={loadExample}>
                <FileCode className="mr-2 h-4 w-4" />
                Load Example
              </Button>
            </div>
            
            <Textarea
              placeholder="Paste code, config files, or environment variables to scan for secrets..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[250px] font-mono text-sm bg-background border-border resize-none"
            />
            
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleScan}
                disabled={isScanning || !code.trim()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Detect Secrets
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      <AnimatePresence>
        {isScanning && (
          <section className="px-4 pb-8">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Scanning for Secrets...
                </h3>
                <p className="text-muted-foreground">
                  AI is analyzing your code for exposed credentials
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
              {/* Alert Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-500">Critical Security Alert</h3>
                    <p className="text-sm text-muted-foreground">
                      Found {results.length} exposed secrets. Rotate these credentials immediately.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-500">{criticalCount}</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-500">{highCount}</div>
                  <div className="text-sm text-muted-foreground">High</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-foreground">{results.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </motion.div>

              {/* Secret List */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Detected Secrets</h2>
                
                {results.map((result, index) => {
                  const PlatformIcon = getPlatformIcon(result.platform)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getSeverityColor(result.severity)}`}>
                          <PlatformIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getSeverityColor(result.severity)}`}>
                              {result.severity}
                            </span>
                            <span className="text-foreground font-semibold">{result.type}</span>
                            <span className="text-muted-foreground text-sm">Line {result.line}</span>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{result.description}</p>
                          
                          <div className="bg-black/50 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                            <code className="text-red-400">
                              {showSecrets[index] ? result.value : result.maskedValue}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSecret(index)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {showSecrets[index] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <span className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                              {result.platform}
                            </span>
                          </div>
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
      {!isScanning && results.length === 0 && !code && (
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                <Key className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Detect Exposed Secrets
              </h3>
              <p className="text-muted-foreground mb-6">
                Paste code or config files above to scan for API keys, passwords, and credentials.
              </p>
              <Button onClick={loadExample} variant="outline">
                <FileCode className="mr-2 h-4 w-4" />
                Load Example
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
