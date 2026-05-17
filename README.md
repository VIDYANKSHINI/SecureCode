# SecureBob AI 🚀

## Scan Before You Push.

SecureBob AI is an AI-powered DevSecOps security assistant built using IBM watsonx.ai and Granite foundation models that helps developers identify vulnerabilities, exposed secrets, insecure configurations, and risky pull request changes before insecure code reaches production.

The platform combines AI reasoning, cybersecurity awareness, and beginner-friendly explanations into one intelligent security analysis system designed for students, developers, startups, and hackathon teams.

---

# 🌟 Problem Statement

Modern developers frequently push insecure code to repositories without realizing the security risks involved.

## Common Issues

* Hardcoded API keys
* Exposed credentials
* SQL injection vulnerabilities
* Weak JWT secrets
* Open CORS configurations
* Insecure authentication flows
* Unsafe file upload handling

## Problems With Traditional Security Tools

* Difficult for beginners
* Too technical
* Expensive
* Require cybersecurity expertise

As a result, vulnerable code and exposed secrets reach public repositories and production systems, increasing the risk of:

* Data breaches
* API abuse
* Unauthorized access
* Security attacks

---

# 💡 Solution

SecureBob AI acts as an AI-powered cybersecurity reviewer that scans repositories, source code, and pull requests to identify vulnerabilities and explain security risks in simple language.

Using IBM Granite foundation models on watsonx.ai, the system provides:

* Intelligent vulnerability analysis
* Secret leak detection
* AI-powered explanations
* Pull request security reviews
* Security improvement recommendations

The goal is to make cybersecurity understandable and accessible for developers of all skill levels.

---

# 🔥 Key Features

## 1. GitHub Repository Scanner

Analyze repositories to:

* Inspect project structure
* Detect insecure coding practices
* Identify risky configurations
* Scan for exposed secrets

### Detects

* Exposed `.env` files
* Hardcoded credentials
* Insecure dependencies
* Weak authentication logic
* Dangerous configurations

---

## 2. Vulnerability Detection

SecureBob AI detects common vulnerabilities including:

### SQL Injection

```python
query = "SELECT * FROM users WHERE name='" + user_input + "'"
```

### Cross-Site Scripting (XSS)

```javascript
element.innerHTML = userInput;
```

### Hardcoded Credentials

```python
password = "admin123"
```

### Open CORS Policies

```javascript
app.use(cors({ origin: "*" }))
```

### Weak JWT Configurations

```javascript
jwt.sign(data, "secret")
```

### Unsafe File Uploads

```python
file.save(upload_path)
```

### Authentication Flaws

* Missing authorization checks
* Insecure session handling
* Weak password validation

---

## 3. AI-Powered Explanations

Instead of displaying only technical security reports, SecureBob AI explains vulnerabilities in beginner-friendly language.

### Example

> “A hacker may manipulate your database because user input is directly inserted into the SQL query without validation.”

This helps students and beginner developers understand cybersecurity concepts more effectively.

---

## 4. Secret Leak Detection

SecureBob AI detects accidentally exposed:

* API keys
* AWS credentials
* JWT secrets
* Firebase credentials
* Passwords
* GitHub tokens

### Example

```env
OPENAI_API_KEY=sk-xxxxxxxx
```

### AI Warning

🚨 Critical Secret Leak Detected

Exposed credentials may allow attackers to misuse services or access sensitive systems.

---

## 5. Security Score Dashboard

Provides:

* Overall security score
* Vulnerability statistics
* Risk analytics
* Improvement recommendations

### Example

```txt
Security Score: 72/100
Critical: 2
High: 4
Medium: 3
Low: 1
```

---

## 6. Pull Request Security Review

Analyzes pull requests and modified code to identify:

* Newly introduced vulnerabilities
* Exposed secrets
* Insecure logic
* Risky code changes

### Example

```python
API_KEY = "secret123"
```

### AI Response

🚨 Pull Request Risk Detected

A sensitive API key was introduced in this commit. Move credentials to environment variables immediately.

---

# 🧠 IBM Technologies Used

## IBM watsonx.ai

Used for:

* AI inference
* Intelligent reasoning
* Prompt orchestration
* Security analysis workflows

## IBM Granite Foundation Models

Used for:

* Vulnerability reasoning
* Secret detection
* Risk explanation
* Remediation suggestions

---

# 🏗️ System Architecture

```txt
User
 ↓
Frontend Dashboard (Next.js)
 ↓
FastAPI Backend
 ↓
IBM watsonx.ai
 ↓
Granite Foundation Model
 ↓
AI Security Analysis
 ↓
Frontend Security Dashboard
```

---

# ⚙️ Tech Stack

## Frontend

* Next.js
* Tailwind CSS
* shadcn/ui
* Framer Motion

## Backend

* FastAPI
* Python

## AI Layer

* IBM watsonx.ai
* Granite foundation models

## APIs

* GitHub REST API

## Deployment

* Vercel (Frontend)
* Render / Railway (Backend)

---

# 🔄 Workflow

## Step 1

User:

* Pastes code
* Uploads files
* Submits GitHub repository URL

## Step 2

Frontend sends repository/code data to FastAPI backend.

## Step 3

Backend creates structured AI security prompts.

## Step 4

IBM Granite analyzes:

* Vulnerabilities
* Exposed secrets
* Risky configurations
* Authentication flaws

## Step 5

AI returns:

* Severity levels
* Explanations
* Secure coding fixes
* Security recommendations

## Step 6

Frontend displays interactive security reports and analytics.

---

# 📊 Sample AI Output

```json
[
  {
    "issue": "SQL Injection",
    "severity": "High",
    "explanation": "Unsanitized user input used directly in SQL query.",
    "fix": "Use parameterized queries."
  }
]
```

---

# 🎯 Target Users

* Students
* Beginner developers
* Open-source contributors
* Startup teams
* Hackathon participants
* Junior engineers

---

# 🚀 Future Scope

## GitHub Integration

Automatic repository monitoring and scanning.

## VS Code Extension

Real-time vulnerability detection while coding.

## CI/CD Security Integration

Pre-deployment security validation.

## Enterprise Team Dashboards

Organization-level security monitoring.

## AI Secure Code Rewrite

Automatically rewrite insecure code securely.

---

# 🛡️ Competitive Advantage

Unlike traditional security tools, SecureBob AI focuses on:

* Beginner accessibility
* Explainable AI security analysis
* Modern user experience
* Educational cybersecurity assistance

The platform bridges the gap between:

* Cybersecurity tooling
* Beginner developers

---

# 👥 Team Structure

## Member 1 — Frontend Lead

### Responsibilities

* UI/UX
* Dashboard
* Frontend integration
* Animations

## Member 2 — Backend + IBM AI Lead

### Responsibilities

* FastAPI backend
* IBM watsonx integration
* Granite prompts
* API development

## Member 3 — Security + Presentation Lead

### Responsibilities

* OWASP research
* Vulnerability testing
* Documentation
* Deployment
* Demo preparation

---

# 🎥 Demo Flow

1. User pastes vulnerable code or repository URL
2. SecureBob AI scans using IBM Granite models
3. AI detects vulnerabilities and exposed secrets
4. Dashboard displays:

   * Issue type
   * Severity
   * Explanation
   * Secure remediation steps

---

