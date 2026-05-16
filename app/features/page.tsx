"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  GitBranch,
  AlertTriangle,
  Key,
  Eye,
  Database,
  Bot,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Scan,
  FileCode,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const features = [
  {
    title: "GitHub Repository Scanner",
    description: "Scan entire GitHub repositories for vulnerabilities, exposed secrets, and security misconfigurations. Get comprehensive analysis of your codebase structure and dependencies.",
    icon: GitBranch,
    href: "/github-scanner",
    color: "primary",
    stats: ["Real-time Scanning", "Full Repo Analysis", "Dependency Check"],
    severity: "Enterprise",
  },
  {
    title: "Vulnerability Detection",
    description: "AI-powered detection of SQL injection, XSS, CSRF, and all OWASP Top 10 vulnerabilities. Upload or paste code for instant security analysis.",
    icon: AlertTriangle,
    href: "/vulnerability-scanner",
    color: "destructive",
    stats: ["OWASP Top 10", "SQL Injection", "XSS Detection"],
    severity: "Critical",
  },
  {
    title: "Secret Leak Detection",
    description: "Find exposed API keys, JWT secrets, AWS credentials, database passwords, and other sensitive data hiding in your codebase.",
    icon: Key,
    href: "/secret-scanner",
    color: "yellow-500",
    stats: ["API Keys", "AWS Credentials", "JWT Secrets"],
    severity: "High Risk",
  },
  {
    title: "Pull Request Security Review",
    description: "Automatically review pull request code changes for newly introduced security vulnerabilities and risky patterns before merging.",
    icon: Eye,
    href: "/pr-review",
    color: "secondary",
    stats: ["Change Analysis", "Risk Detection", "Merge Safety"],
    severity: "Review",
  },
  {
    title: "Security Score Dashboard",
    description: "Track your overall security posture with real-time analytics, vulnerability trends, and severity distribution charts.",
    icon: Database,
    href: "/security-dashboard",
    color: "primary",
    stats: ["Security Score", "Trend Analysis", "Risk Overview"],
    severity: "Analytics",
  },
  {
    title: "AI Security Assistant",
    description: "Chat with our AI assistant for security guidance, secure coding recommendations, and beginner-friendly cybersecurity explanations.",
    icon: Bot,
    href: "/ai-assistant",
    color: "secondary",
    stats: ["24/7 Available", "Secure Coding Tips", "Best Practices"],
    severity: "Assistant",
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <CyberBackground />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Select a Security Feature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Security <span className="text-primary glow-text-blue">Features</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Choose from our comprehensive suite of AI-powered security scanning tools. 
              Each feature is designed to protect your code from specific threats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden cursor-pointer">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Glow effect */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${feature.color}/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 rounded-xl bg-${feature.color}/10 flex items-center justify-center group-hover:bg-${feature.color}/20 transition-colors`}>
                          <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${feature.color}/10 text-${feature.color} border border-${feature.color}/20`}>
                          {feature.severity}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className={`text-2xl font-bold text-foreground mb-3 group-hover:text-${feature.color} transition-colors`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {feature.description}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {feature.stats.map((stat) => (
                          <span
                            key={stat}
                            className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className={`flex items-center gap-2 text-${feature.color} font-medium group-hover:gap-4 transition-all`}>
                        <span>Open Feature</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Scan line animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/github-scanner">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary group">
                  <Scan className="h-6 w-6 text-primary" />
                  <span className="text-sm">Scan Repo</span>
                </Button>
              </Link>
              <Link href="/vulnerability-scanner">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-destructive/30 hover:bg-destructive/10 hover:border-destructive group">
                  <FileCode className="h-6 w-6 text-destructive" />
                  <span className="text-sm">Check Code</span>
                </Button>
              </Link>
              <Link href="/secret-scanner">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-500 group">
                  <Lock className="h-6 w-6 text-yellow-500" />
                  <span className="text-sm">Find Secrets</span>
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-secondary/30 hover:bg-secondary/10 hover:border-secondary group">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                  <span className="text-sm">Ask AI</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IBM Badge */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Powered by</p>
                <p className="font-semibold text-foreground">IBM watsonx.ai</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Using</p>
                <p className="font-semibold text-foreground">IBM Granite Models</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
