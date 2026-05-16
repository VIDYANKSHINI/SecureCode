"use client"

import Link from "next/link"
import { Shield, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                Secure<span className="text-primary">Bob</span> AI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered DevSecOps assistant for detecting vulnerabilities before deployment.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/github-scanner" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub Scanner
                </Link>
              </li>
              <li>
                <Link href="/vulnerability-scanner" className="text-muted-foreground hover:text-primary transition-colors">
                  Vulnerability Detection
                </Link>
              </li>
              <li>
                <Link href="/secret-scanner" className="text-muted-foreground hover:text-primary transition-colors">
                  Secret Leak Detection
                </Link>
              </li>
              <li>
                <Link href="/pr-review" className="text-muted-foreground hover:text-primary transition-colors">
                  PR Security Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/security-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Security Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Documentation</span>
              </li>
              <li>
                <span className="text-muted-foreground">API Reference</span>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Powered By</h4>
            <div className="space-y-3">
              <div className="glass-card rounded-lg p-3">
                <p className="text-sm font-medium text-primary">IBM watsonx.ai</p>
                <p className="text-xs text-muted-foreground">Enterprise AI Platform</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-sm font-medium text-secondary">IBM Granite</p>
                <p className="text-xs text-muted-foreground">Foundation Models</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 SecureBob AI. Built for IBM watsonx Hackathon.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
