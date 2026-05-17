def generate_ai_explanation(finding):
    issue_type = finding.get("type", "Security Issue")
    severity = finding.get("severity", "Medium")
    file_path = finding.get("file", "Unknown file")

    explanations = {
        "SQL Injection": {
            "explanation": "User input may be directly added into a database query. Attackers can manipulate the query and access or modify database data.",
            "fix": "Use parameterized queries or ORM methods instead of string concatenation."
        },
        "Cross-Site Scripting (XSS)": {
            "explanation": "User-controlled input may be inserted into the page as HTML. This can allow attackers to run malicious JavaScript in a user's browser.",
            "fix": "Avoid using innerHTML with user input. Use safe rendering methods and sanitize input."
        },
        "Hardcoded Credentials": {
            "explanation": "Sensitive credentials are directly written in the source code. If pushed to GitHub, attackers may misuse them.",
            "fix": "Move credentials to environment variables and rotate exposed secrets."
        },
        "AWS Secret Key": {
            "explanation": "An AWS-style key appears to be exposed in the code. This can allow unauthorized access to cloud resources.",
            "fix": "Remove the key, rotate it immediately, and use environment variables or a secrets manager."
        },
        "Open CORS Policy": {
            "explanation": "The application may allow requests from any origin. This can expose APIs to unwanted websites.",
            "fix": "Restrict CORS origin to trusted frontend domains only."
        },
        "Weak JWT Secret": {
            "explanation": "A weak or hardcoded JWT secret can allow attackers to forge authentication tokens.",
            "fix": "Use a strong secret stored in environment variables."
        },
        "API Key": {
            "explanation": "An API key appears to be exposed in the source code. Attackers may use it to access external services.",
            "fix": "Store API keys in environment variables and never commit them."
        },
        "GitHub Token": {
            "explanation": "A GitHub token appears to be exposed. This may allow access to repositories or GitHub actions depending on token permissions.",
            "fix": "Revoke the token immediately and generate a new one with limited permissions."
        },
        "Database URL": {
            "explanation": "A database connection URL appears to be exposed. This may reveal database credentials or host information.",
            "fix": "Move database URLs to environment variables and rotate credentials if exposed."
        }
    }

    data = explanations.get(issue_type, {
        "explanation": "This code pattern may introduce a security risk and should be reviewed carefully.",
        "fix": "Review the code, validate inputs, and follow secure coding practices."
    })

    return {
        **finding,
        "ai_explanation": data["explanation"],
        "recommended_fix": data["fix"],
        "risk_summary": f"{severity} risk found in {file_path}"
    }


def explain_findings(findings):
    return [generate_ai_explanation(finding) for finding in findings]