import os
import re

# Vulnerability Patterns
PATTERNS = {
    "SQL Injection": r'SELECT .* FROM .* WHERE .* \+',
    "Cross-Site Scripting (XSS)": r'innerHTML\s*=',
    "Hardcoded Credentials": r'password\s*=\s*["\'].*["\']',
    "AWS Secret Key": r'AKIA[0-9A-Z]{16}',
    "Weak JWT Secret": r'jwt_secret\s*=\s*["\'].*["\']',
    "Open CORS Policy": r'Access-Control-Allow-Origin.*\*',
    "Unsafe File Upload": r'multer\(',
    "Authentication Flaw": r'auth\s*=\s*false'
}

# Severity Levels
SEVERITY_MAP = {
    "SQL Injection": "Critical",
    "Cross-Site Scripting (XSS)": "High",
    "Hardcoded Credentials": "High",
    "AWS Secret Key": "Critical",
    "Weak JWT Secret": "High",
    "Open CORS Policy": "Medium",
    "Unsafe File Upload": "Medium",
    "Authentication Flaw": "Critical"
}

def scan_file(filepath):

    findings = []

    try:

        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:

            content = file.read()

            for vulnerability, pattern in PATTERNS.items():

                matches = re.findall(pattern, content)

                if matches:

                    findings.append({
                        "type": vulnerability,
                        "severity": SEVERITY_MAP[vulnerability],
                        "file": filepath,
                        "matches_found": len(matches)
                    })

    except Exception:
        pass

    return findings


def run_custom_scan(repo_path):

    all_findings = []

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            filepath = os.path.join(root, file)

            findings = scan_file(filepath)

            all_findings.extend(findings)

    return all_findings