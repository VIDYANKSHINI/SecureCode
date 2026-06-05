"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Send,
  User,
  Shield,
  Zap,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What is SQL injection and how do I prevent it?",
  "How should I store API keys securely?",
  "What are the OWASP Top 10 vulnerabilities?",
  "How do I implement secure authentication?",
  "What is XSS and how can I protect against it?",
  "Best practices for password hashing?",
]

const aiResponses: Record<string, string> = {
  "sql injection": `**SQL Injection** is a code injection technique that exploits security vulnerabilities in an application's database layer.

**How it works:**
Attackers insert malicious SQL code into input fields that are directly concatenated into SQL queries.

**Prevention Methods:**

1. **Use Parameterized Queries (Prepared Statements)**
\`\`\`javascript
// BAD - Vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// GOOD - Using parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
\`\`\`

2. **Use ORM/Query Builders** like Prisma, Drizzle, or Sequelize

3. **Input Validation** - Validate and sanitize all user inputs

4. **Least Privilege** - Database accounts should have minimal permissions

5. **Web Application Firewall (WAF)** - Additional layer of protection`,

  "api keys": `**Secure API Key Storage Best Practices:**

1. **Never hardcode API keys in source code**
\`\`\`javascript
// BAD
const API_KEY = "sk-1234567890";

// GOOD
const API_KEY = process.env.API_KEY;
\`\`\`

2. **Use Environment Variables**
   - Store in \`.env\` files (never commit to git)
   - Use \`.env.example\` with placeholder values
   - Add \`.env\` to \`.gitignore\`

3. **Use Secret Management Services**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Vercel Environment Variables

4. **Rotate Keys Regularly**
   - Implement key rotation policies
   - Have a process for emergency rotation

5. **Use Different Keys for Different Environments**
   - Development, staging, and production should use separate keys`,

  "owasp": `**OWASP Top 10 (2021) Security Risks:**

1. **A01:2021 - Broken Access Control**
   - Users acting outside intended permissions

2. **A02:2021 - Cryptographic Failures**
   - Weak encryption, exposed sensitive data

3. **A03:2021 - Injection**
   - SQL, NoSQL, OS command injection

4. **A04:2021 - Insecure Design**
   - Missing security controls in design phase

5. **A05:2021 - Security Misconfiguration**
   - Default configs, unnecessary features enabled

6. **A06:2021 - Vulnerable Components**
   - Using outdated or vulnerable dependencies

7. **A07:2021 - Authentication Failures**
   - Weak passwords, session management issues

8. **A08:2021 - Software & Data Integrity Failures**
   - Code/infrastructure without integrity verification

9. **A09:2021 - Security Logging Failures**
   - Insufficient logging and monitoring

10. **A10:2021 - Server-Side Request Forgery (SSRF)**
    - Fetching remote resources without validation`,

  "authentication": `**Secure Authentication Best Practices:**

1. **Password Requirements**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Check against breached password databases

2. **Password Hashing**
\`\`\`javascript
import bcrypt from 'bcrypt';

// Hashing
const hash = await bcrypt.hash(password, 12);

// Verification
const valid = await bcrypt.compare(password, hash);
\`\`\`

3. **Multi-Factor Authentication (MFA)**
   - TOTP (Time-based One-Time Password)
   - SMS (less secure, but better than nothing)
   - Hardware keys (most secure)

4. **Session Management**
   - Use HTTP-only, secure cookies
   - Implement session expiration
   - Regenerate session IDs after login

5. **Rate Limiting**
   - Prevent brute force attacks
   - Implement account lockout after failed attempts

6. **JWT Best Practices**
   - Short expiration times
   - Use refresh tokens
   - Store securely (HTTP-only cookies)`,

  "xss": `**Cross-Site Scripting (XSS) Prevention:**

**What is XSS?**
Attackers inject malicious scripts into web pages viewed by other users.

**Types of XSS:**
1. **Reflected XSS** - Script in URL parameters
2. **Stored XSS** - Script saved in database
3. **DOM-based XSS** - Script manipulates DOM

**Prevention Methods:**

1. **Output Encoding**
\`\`\`javascript
// BAD
element.innerHTML = userInput;

// GOOD
element.textContent = userInput;
\`\`\`

2. **Content Security Policy (CSP)**
\`\`\`
Content-Security-Policy: default-src 'self'
\`\`\`

3. **Use Safe APIs**
   - \`textContent\` instead of \`innerHTML\`
   - Frameworks with auto-escaping (React, Vue)

4. **Sanitize HTML**
\`\`\`javascript
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);
\`\`\`

5. **HTTP-Only Cookies**
   - Prevents JavaScript access to session cookies`,

  "password": `**Password Hashing Best Practices:**

**Never store passwords in plain text!**

1. **Use Modern Hashing Algorithms**
   - **bcrypt** (recommended for most cases)
   - **Argon2** (winner of Password Hashing Competition)
   - **scrypt** (memory-hard function)

2. **Bcrypt Example:**
\`\`\`javascript
import bcrypt from 'bcrypt';

// Hash password
const saltRounds = 12;
const hash = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(inputPassword, hash);
\`\`\`

3. **Cost Factor**
   - Higher = more secure but slower
   - Target ~250ms hash time
   - bcrypt: 10-12 rounds
   - Argon2: tune memory/time parameters

4. **Salt Handling**
   - bcrypt/Argon2 handle salts automatically
   - Never reuse salts across passwords

5. **Upgrade Strategy**
   - Re-hash on successful login if using old algorithm`,
}

const getAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes("sql") && lowerQuestion.includes("injection")) {
    return aiResponses["sql injection"]
  }
  if (lowerQuestion.includes("api") && lowerQuestion.includes("key")) {
    return aiResponses["api keys"]
  }
  if (lowerQuestion.includes("owasp")) {
    return aiResponses["owasp"]
  }
  if (lowerQuestion.includes("authentication") || lowerQuestion.includes("auth")) {
    return aiResponses["authentication"]
  }
  if (lowerQuestion.includes("xss") || lowerQuestion.includes("cross-site")) {
    return aiResponses["xss"]
  }
  if (lowerQuestion.includes("password") && lowerQuestion.includes("hash")) {
    return aiResponses["password"]
  }
  
  return `Great question! As an AI security assistant powered by IBM watsonx.ai, I can help you with:

- **Vulnerability Detection** - Understanding and preventing security flaws
- **Secure Coding Practices** - Best practices for writing secure code
- **OWASP Guidelines** - Industry-standard security recommendations
- **Cryptography** - Encryption, hashing, and key management
- **Authentication & Authorization** - Securing user access

Try asking about specific topics like "SQL injection prevention", "secure password storage", or "OWASP Top 10 vulnerabilities".`
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm SecureBob AI, your cybersecurity assistant powered by IBM watsonx.ai and Granite models. Ask me anything about security vulnerabilities, secure coding practices, or cybersecurity concepts!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000))

let response = ""

try {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const apiResponse = await fetch(`${API_URL}/review-pr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code_content: messageText,
    }),
  })

  const data = await apiResponse.json()

  if (data.findings && data.findings.length > 0) {
    response = data.findings
      .map(
        (item: any) =>
          `🔒 ${item.type}\n\n${item.ai_explanation}\n\n✅ Fix: ${item.recommended_fix}`
      )
      .join("\n\n")
  } else {
    response = getAIResponse(messageText)
  }
} catch (error) {
  response = getAIResponse(messageText)
}
    
    const assistantMessage: Message = {
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. How can I help you with cybersecurity today?",
        timestamp: new Date(),
      },
    ])
    setShowSuggestions(true)
  }

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <CyberBackground />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Bot className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">AI Security Assistant</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Ask <span className="text-secondary glow-text-green">SecureBob</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get instant security guidance and secure coding recommendations from AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex-1 px-4 pb-4">
        <div className="container mx-auto max-w-4xl h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">SecureBob AI</h3>
                  <div className="flex items-center gap-1 text-xs text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Online - Powered by IBM watsonx.ai
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearChat}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-secondary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="prose prose-sm prose-invert max-w-none">
                        {message.content.split("```").map((part, i) => {
                          if (i % 2 === 1) {
                            const [lang, ...code] = part.split("\n")
                            return (
                              <pre key={i} className="bg-black/50 rounded-lg p-3 my-2 overflow-x-auto">
                                <code className="text-xs">{code.join("\n")}</code>
                              </pre>
                            )
                          }
                          return part.split("\n").map((line, j) => {
                            if (line.startsWith("**") && line.endsWith("**")) {
                              return <p key={j} className="font-bold">{line.slice(2, -2)}</p>
                            }
                            if (line.startsWith("- ")) {
                              return <li key={j} className="ml-4">{line.slice(2)}</li>
                            }
                            if (line.match(/^\d+\.\s/)) {
                              return <li key={j} className="ml-4 list-decimal">{line.slice(3)}</li>
                            }
                            return line ? <p key={j}>{line}</p> : null
                          })
                        })}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center justify-end mt-2 pt-2 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => handleCopy(message.content, index)}
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2 border-t border-border"
                >
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleSend(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about security vulnerabilities, best practices..."
                  className="flex-1 bg-background"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by IBM watsonx.ai and Granite foundation models
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
