import os
import re

SECRET_PATTERNS = {
    "AWS Access Key": r"AKIA[0-9A-Z]{16}",
    "GitHub Token": r"ghp_[A-Za-z0-9_]{36}",
    "Google API Key": r"AIza[0-9A-Za-z\-_]{35}",
    "OpenAI API Key": r"sk-[A-Za-z0-9]{20,}",
    "JWT Token": r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+",
    "Password": r"(password|passwd|pwd)\s*=\s*[\"'][^\"']{4,}[\"']",
    "API Key": r"(api_key|apikey|apiKey|API_KEY)\s*=\s*[\"'][^\"']{8,}[\"']",
    "Secret Key": r"(secret|secret_key|SECRET_KEY)\s*=\s*[\"'][^\"']{8,}[\"']",
    "Database URL": r"(DATABASE_URL|DB_URL)\s*=\s*[\"'][^\"']+[\"']",
}

SEVERITY_MAP = {
    "AWS Access Key": "Critical",
    "GitHub Token": "Critical",
    "Google API Key": "Critical",
    "OpenAI API Key": "Critical",
    "JWT Token": "High",
    "Password": "High",
    "API Key": "High",
    "Secret Key": "High",
    "Database URL": "High",
}

IGNORED_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    ".next",
    "dist",
    "build",
    "venv",
    ".venv",
}

def scan_file_for_secrets(filepath):
    findings = []

    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()

        for secret_type, pattern in SECRET_PATTERNS.items():
            matches = re.findall(pattern, content)

            if matches:
                findings.append({
                    "type": secret_type,
                    "severity": SEVERITY_MAP.get(secret_type, "Medium"),
                    "file": filepath,
                    "matches_found": len(matches),
                    "message": f"Possible {secret_type} detected in source code.",
                    "recommendation": "Move secrets to environment variables and never commit them to GitHub."
                })

    except Exception:
        pass

    return findings


def run_secret_scan(repo_path):
    all_findings = []

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

        for file in files:
            filepath = os.path.join(root, file)
            findings = scan_file_for_secrets(filepath)
            all_findings.extend(findings)

    return all_findings