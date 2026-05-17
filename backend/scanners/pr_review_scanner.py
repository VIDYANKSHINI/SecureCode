import re

PR_PATTERNS = {
    "Hardcoded Password": r'(password|passwd|pwd)\s*=\s*[\"\\\'].*[\"\\\']',
    "API Key Exposure": r'(api_key|API_KEY)\s*=\s*[\"\\\'].*[\"\\\']',
    "AWS Secret Key": r'AKIA[0-9A-Z]{16}',
    "Open CORS Policy": r'origin\s*:\s*[\"\\\']\*[\"\\\']',
    "SQL Injection": r'SELECT .* FROM .* WHERE .* \+',
    "Cross-Site Scripting (XSS)": r'innerHTML\s*=',
    "Weak JWT Secret": r'jwt.sign\(.*[\"\\\']secret[\"\\\']'
}

SEVERITY_MAP = {
    "Hardcoded Password": "High",
    "API Key Exposure": "High",
    "AWS Secret Key": "Critical",
    "Open CORS Policy": "Medium",
    "SQL Injection": "Critical",
    "Cross-Site Scripting (XSS)": "High",
    "Weak JWT Secret": "High"
}


def review_pull_request(code_content):

    findings = []

    for issue_type, pattern in PR_PATTERNS.items():

        matches = re.findall(pattern, code_content)

        if matches:

            findings.append({
                "type": issue_type,
                "severity": SEVERITY_MAP[issue_type],
                "matches_found": len(matches),
                "message": f"{issue_type} detected in pull request changes.",
                "recommendation": "Review this code before merging into production."
            })

    return findings