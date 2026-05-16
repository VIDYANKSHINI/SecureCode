"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Shield,
  GitBranch,
  AlertTriangle,
  Lock,
  Key,
  Database,
  Bot,
  ChevronRight,
  Zap,
  Code,
  Eye,
  CheckCircle,
  Users,
  ArrowRight,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CyberBackground } from "@/components/cyber-background"
import { TerminalAnimation } from "@/components/terminal-animation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeatureCard } from "@/components/feature-card"

const features = [
  {
    title: "GitHub Repository Scanner",
    description: "Scan entire repositories for vulnerabilities, secrets, and security issues in real-time.",
    icon: GitBranch,
    href: "/github-scanner",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Vulnerability Detection",
    description: "AI-powered detection of SQL injection, XSS, and OWASP Top 10 vulnerabilities.",
    icon: AlertTriangle,
    href: "/vulnerability-scanner",
    gradient: "from-destructive/20 to-destructive/5",
  },
  {
    title: "Secret Leak Detection",
    description: "Find exposed API keys, JWT secrets, AWS credentials, and passwords in your code.",
    icon: Key,
    href: "/secret-scanner",
    gradient: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "PR Security Review",
    description: "Automatically review pull requests for newly introduced security risks.",
    icon: Eye,
    href: "/pr-review",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    title: "Security Score Dashboard",
    description: "Track your security posture with real-time analytics and vulnerability trends.",
    icon: Database,
    href: "/security-dashboard",
    gradient: "from-primary/20 to-secondary/5",
  },
  {
    title: "AI Security Assistant",
    description: "Get instant security guidance and secure coding recommendations from AI.",
    icon: Bot,
    href: "/ai-assistant",
    gradient: "from-secondary/20 to-primary/5",
  },
]

const problems = [
  {
    title: "Exposed API Keys",
    description: "Developers accidentally commit API keys and secrets to public repositories.",
    icon: Key,
    severity: "Critical",
  },
  {
    title: "Insecure Code",
    description: "SQL injection, XSS, and other vulnerabilities slip through code reviews.",
    icon: Code,
    severity: "High",
  },
  {
    title: "GitHub Secret Leaks",
    description: "Sensitive data exposed in commit history and public repositories.",
    icon: GitBranch,
    severity: "Critical",
  },
  {
    title: "SQL Injection Attacks",
    description: "Unvalidated user input leads to database compromise and data theft.",
    icon: Database,
    severity: "Critical",
  },
  {
    title: "Authentication Flaws",
    description: "Weak authentication mechanisms allow unauthorized access.",
    icon: Lock,
    severity: "High",
  },
]

const workflowSteps = [
  { title: "Developer", description: "Writes code and pushes to repository", icon: Users },
  { title: "SecureBob AI", description: "Intercepts and analyzes code changes", icon: Shield },
  { title: "IBM Granite Analysis", description: "AI models detect vulnerabilities", icon: Zap },
  { title: "Security Reports", description: "Detailed findings with fix suggestions", icon: AlertTriangle },
  { title: "Secure Deployment", description: "Clean code reaches production", icon: CheckCircle },
]

const team = [
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    description: "React, Next.js, and UI/UX specialist",
  },
  {
    name: "Sarah Johnson",
    role: "Backend + AI Developer",
    description: "Python, IBM watsonx.ai integration",
  },
  {
    name: "Michael Park",
    role: "Security Research Lead",
    description: "Cybersecurity and threat analysis",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <CyberBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm text-muted-foreground">AI-Powered Security Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              >
                <span className="text-foreground">Secure</span>
                <span className="text-primary">Bob</span>
                <span className="text-foreground"> AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl font-semibold text-secondary mb-6"
              >
                Scan Before You Push.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 text-pretty"
              >
                AI-powered vulnerability scanning using IBM Granite foundation models. 
                Detect security flaws, secret leaks, and code vulnerabilities before they reach production.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/features">
                  <Button size="lg" className="bg-card hover:bg-card/80 text-foreground border border-border text-base px-6">
                    <Shield className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" className="text-primary hover:bg-primary/10 text-base px-6">
                  View Demo
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              {/* Floating Badge - Protected */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 left-4 z-20"
              >
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 border border-primary/30">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Protected</span>
                </div>
              </motion.div>

              {/* Floating Badge - Encrypted */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-1/3 -right-4 z-20 hidden sm:block"
              >
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 border border-muted/30">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Encrypted</span>
                </div>
              </motion.div>

              <TerminalAnimation />

              {/* Floating Badge - Scanned */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -bottom-4 left-8 z-20"
              >
                <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 border border-secondary/30">
                  <GitBranch className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-foreground">Scanned</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What is <span className="text-primary">SecureBob AI</span>?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg text-pretty">
              SecureBob AI is your intelligent security guardian for the software development lifecycle. 
              We leverage cutting-edge IBM watsonx.ai technology to analyze your code in real-time, 
              identifying vulnerabilities before they become threats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Proactive Security</h3>
              <p className="text-muted-foreground">
                Catch vulnerabilities before they reach production. Our AI scans code in real-time 
                during development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                IBM Granite foundation models provide intelligent vulnerability detection with 
                contextual understanding.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Developer-Friendly</h3>
              <p className="text-muted-foreground">
                Seamless integration into your workflow with clear explanations and 
                actionable fix recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 px-4 relative bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              The <span className="text-destructive">Security Crisis</span> in Modern Development
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every day, thousands of security vulnerabilities slip through code reviews and reach production.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    problem.severity === "Critical" 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {problem.severity}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Powerful <span className="text-primary">Security Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive security scanning tools powered by IBM watsonx.ai for complete code protection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* IBM Technologies Section */}
      <section className="py-20 px-4 relative bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Powered by <span className="text-primary">IBM Enterprise AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Built on industry-leading IBM watsonx.ai platform and Granite foundation models.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">IBM watsonx.ai</h3>
                <p className="text-muted-foreground mb-4">
                  Enterprise-grade AI platform providing scalable, secure, and reliable 
                  foundation model deployment for security analysis.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Enterprise security compliance
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Scalable inference pipeline
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    Real-time code analysis
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Code className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">IBM Granite Models</h3>
                <p className="text-muted-foreground mb-4">
                  State-of-the-art foundation models specifically trained for code understanding 
                  and security vulnerability detection.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Code-optimized architecture
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Multi-language support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Security-focused training
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How <span className="text-primary">SecureBob</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Seamless integration into your development workflow for continuous security.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="glass-card rounded-xl p-6 text-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                      <step.icon className="h-6 w-6 text-primary" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Meet the <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The talented developers behind SecureBob AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 group-hover:glow-blue transition-all">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Secure Your Code?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                Start scanning your repositories today and catch vulnerabilities before they become threats.
              </p>
              <Link href="/features">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-blue text-lg px-8">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
