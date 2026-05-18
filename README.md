# SecureBob AI — Scan Before You Push

SecureBob AI is a premium, next-generation code security analysis suite. It combines automated vulnerability scanners and enterprise-grade AI-powered explanations to help developers find, prioritize, and remediate security issues earlier in the development lifecycle—long before they reach production.

Powered by **IBM watsonx.ai** and **IBM Granite foundation models for code**, SecureBob AI acts as an intelligent security guardian for modern engineering teams.

---

## Key Features

SecureBob AI integrates six powerful modules into a unified, high-performance security platform:

### 1. GitHub Repository Scanner (`/github-scanner`)
* Clone and scan any public or private GitHub repository on-demand.
* Analyze full repository history and files to identify potential security exposures.

### 2. AI-Powered Vulnerability Detection (`/vulnerability-scanner`)
* Detects SQL injection, Cross-Site Scripting (XSS), insecure deserialization, and other OWASP Top 10 vulnerabilities.
* Context-aware scanning of code snippets with real-time feedback.

### 3. Secret Leak Detection (`/secret-scanner`)
* Scans files for exposed API keys, JWT secrets, AWS credentials, database strings, and passwords.
* Uses precise regex profiling combined with entropy analysis to avoid false positives.

### 4. Pull Request Security Review (`/pr-review`)
* Automatically inspects incoming PRs for newly introduced vulnerabilities and secret leaks.
* Provides a diff-focused security review to protect the main codebase.

### 5. Security Score Dashboard (`/security-dashboard`)
* View real-time security postures, aggregate risk ratings, and security scores.
* Track vulnerability trends, severity distribution, and history logs.

### 6. AI Security Assistant (`/ai-assistant`)
* An interactive conversational chatbot powered by **IBM Granite** code-trained models.
* Provides instant security guidance, vulnerability explanations, and refactored secure code suggestions.

---

## Technology Stack

SecureBob AI uses a premium, cutting-edge technology stack engineered for high performance, visual brilliance, and security:

* **Frontend**: Next.js 16 (App Router), React 19, TypeScript
* **Styling & UI**: Tailwind CSS v4, Radix UI primitives (shadcn/ui), Lucide icons
* **Animations**: Framer Motion for smooth micro-animations and cybernetic UI transitions
* **AI Core**: IBM watsonx.ai platform & IBM Granite code foundation models
* **Scanning Engine**: Custom Regex Engines, Semgrep rulesets, and AST parser hooks
* **Package Manager**: `pnpm` (fast, space-efficient dependency management)

---

## System Architecture

SecureBob AI splits responsibilities between a rich, reactive client interface and a high-performance scanning coordinator powered by Watsonx:

```mermaid
graph TD
    User([Developer / Security Team]) -->|Interacts| UI[Next.js 16 Frontend /app]
    
    subgraph Frontend [Next.js App & UI]
        UI --> Dashboard[/security-dashboard]
        UI --> Scanner[/github-scanner]
        UI --> Assistant[/ai-assistant]
    end

    subgraph Security Coordinator & Engines
        Scanner -->|Trigger Scan| Orchestrator[Python Scan Coordinator]
        Orchestrator -->|Git Clone| RepoCloner[Repo Cloner / Temp Storage]
        RepoCloner -->|Static Analysis| SemgrepEngine[Semgrep Scanner]
        RepoCloner -->|Pattern Matching| SecretEngine[Secret & Key Scanner]
    end

    subgraph IBM Enterprise AI Pipeline
        Assistant -->|Queries / Code Explanation| Watsonx[IBM watsonx.ai Platform]
        SemgrepEngine -->|Raw Findings| Watsonx
        Watsonx -->|Granite Models| ExplanationEngine[AI Security Assistant]
        ExplanationEngine -->|Remediation & Score| UI
    end
    
    classDef frontend fill:#1e293b,stroke:#0ea5e9,stroke-width:2px,color:#fff;
    classDef backend fill:#1e1b4b,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    classDef ai fill:#062f4f,stroke:#10b981,stroke-width:2px,color:#fff;
    class UI,Dashboard,Scanner,Assistant frontend;
    class Orchestrator,RepoCloner,SemgrepEngine,SecretEngine backend;
    class Watsonx,ExplanationEngine ai;
```

---

## Project Structure

```filepath
secure-bob-ai-app/
├── app/                      # Next.js 16 App Router Routes
│   ├── ai-assistant/         # AI Chat and Remediation Assistant
│   ├── features/             # Feature Overview Page
│   ├── github-scanner/       # Git Repository Cloning & Scanning interface
│   ├── pr-review/            # PR Code Diff Security Checking
│   ├── secret-scanner/       # Secret and API Key Detection UI
│   ├── security-dashboard/   # Real-time Metrics and Vulnerability Analytics
│   ├── vulnerability-scanner/# SAST & OWASP Top 10 Analyzer UI
│   ├── globals.css           # Tailwind v4 Global Styles
│   ├── layout.tsx            # Main Application Layout
│   └── page.tsx              # Cyber-inspired Landing Page
├── components/               # Reusable UI & Layout Components
│   ├── ui/                   # Base Radix Primitives (Buttons, Dialogs, Cards)
│   ├── cyber-background.tsx  # Interactive glowing background animation
│   ├── terminal-animation.tsx# Immersive typewriter terminal visualization
│   ├── navbar.tsx            # Global Navigation Bar
│   └── footer.tsx            # Footer
├── hooks/                    # Custom React Hooks
├── lib/                      # Shared Utilities (cn, formatting)
├── public/                   # Static assets, logos, and screenshots
├── styles/                   # Style variables
├── tsconfig.json             # TypeScript config
├── package.json              # Client scripts & dependencies
└── pnpm-lock.yaml            # pnpm lockfile
```

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
* **Node.js** (v18.x or above recommended)
* **pnpm** (`npm install -g pnpm`)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VIDYANKSHINI/SecureCode.git
   cd secure-bob-ai-app
   ```

2. **Install Dependencies**
   Using `pnpm` ensures fast, shared, and deterministic dependency trees.
   ```bash
   pnpm install
   ```

3. **Start the Local Development Server**
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to **`http://localhost:3000`** to view the app!

4. **Building for Production**
   Verify the Next.js production build and linting:
   ```bash
   pnpm build
   ```

---

## Premium Design Aesthetics

SecureBob AI utilizes a premium, cyber-inspired design system created to wow users at first glance:
* **CyberBackground & Glow Effects**: A sleek, animated cybernetic background that breathes life into the application.
* **Glassmorphism & Neon Gradients**: Cards use custom backdrop-filter styling combined with neon primary and secondary gradients.
* **Terminal Animation**: Built-in visual sandbox in the landing page showing real-time scanning feedback in retro-terminal styling.
* **Responsive Layouts**: Fully responsive layouts using Flexbox and Grid systems optimized for desktop, tablet, and mobile screens.

---

## Hackathon Team

This project was built by a talented trio for the IBM watsonx.ai & Granite match-up:
* **Alex Chen** — *Frontend Developer* (React, Next.js, and premium UI/UX Specialist)
* **Sarah Johnson** — *Backend + AI Developer* (Python service and IBM watsonx.ai integrations)
* **Michael Park** — *Security Research Lead* (Cybersecurity and threat analysis models)

---

## License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it in accordance with the terms.

---

**SecureBob AI** — *Scan Before You Push!*
