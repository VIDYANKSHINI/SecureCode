import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Fallback dictionary (used if no API key or API fails)
FALLBACK_EXPLANATIONS = {
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
    "AWS Access Key": {
        "explanation": "An AWS Access Key is exposed in the code. Attackers can use this to gain access to your AWS cloud services.",
        "fix": "Delete the key from AWS IAM, rotate it, and use environment variables or AWS Secrets Manager."
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
    },
    "Google API Key": {
        "explanation": "A Google API key is exposed. Attackers can misuse it to call Google services and incur billing charges.",
        "fix": "Restrict API key usage in Google Cloud Console and move to environment variables."
    },
    "OpenAI API Key": {
        "explanation": "An OpenAI API key is exposed. Attackers can use your key to run queries and exhaust your credits.",
        "fix": "Revoke the key immediately on platform.openai.com and use environment variables."
    },
    "Secret Key": {
        "explanation": "A secret key is hardcoded in the source. This is a high security risk if pushed to a public repo.",
        "fix": "Store secret keys in environment variables and use a secrets manager in production."
    },
    "Password": {
        "explanation": "A password appears to be hardcoded in the source code. This is a critical security risk.",
        "fix": "Never hardcode passwords. Use environment variables or a secure vault."
    },
    "Unsafe File Upload": {
        "explanation": "File upload handling without proper validation may allow attackers to upload malicious files.",
        "fix": "Validate file types, sizes, and use a sandboxed storage location."
    },
    "Authentication Flaw": {
        "explanation": "Authentication appears to be disabled or bypassed in the code.",
        "fix": "Ensure authentication is always enforced and never set to false in production."
    },
    "Hardcoded Password": {
        "explanation": "A password is hardcoded directly in the source code.",
        "fix": "Move the password to environment variables and rotate it immediately."
    },
    "API Key Exposure": {
        "explanation": "An API key is hardcoded in the source code and may be exposed publicly.",
        "fix": "Use environment variables to store API keys and add them to .gitignore."
    }
}


def get_fallback_explanation(issue_type):
    """Return dictionary-based explanation as fallback."""
    data = FALLBACK_EXPLANATIONS.get(issue_type, {
        "explanation": "This code pattern may introduce a security risk and should be reviewed carefully.",
        "fix": "Review the code, validate inputs, and follow secure coding practices."
    })
    return data["explanation"], data["fix"]


def get_gemini_explanation(issue_type, severity, file_path):
    """Use Gemini AI (google-genai SDK) to generate a smart security explanation."""
    try:
        if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
            return None, None

        from google import genai

        client = genai.Client(api_key=GEMINI_API_KEY, http_options={"api_version": "v1"})

        prompt = f"""You are a cybersecurity expert AI assistant called SecureCode AI.

A security vulnerability has been detected in a code repository scan.

Vulnerability Type: {issue_type}
Severity Level: {severity}
Found In File: {file_path}

Please provide:
1. A clear, concise explanation (2-3 sentences) of why this is dangerous.
2. A specific, actionable fix recommendation (2-3 sentences).

Format your response EXACTLY as:
EXPLANATION: <your explanation here>
FIX: <your fix here>

Keep it developer-friendly and practical."""

        response = client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents=prompt
        )

        text = response.text.strip()

        explanation = ""
        fix = ""

        for line in text.split("\n"):
            if line.startswith("EXPLANATION:"):
                explanation = line.replace("EXPLANATION:", "").strip()
            elif line.startswith("FIX:"):
                fix = line.replace("FIX:", "").strip()

        if explanation and fix:
            return explanation, fix
        return None, None

    except Exception:
        return None, None


def generate_ai_explanation(finding):
    issue_type = finding.get("type", "Security Issue")
    severity = finding.get("severity", "Medium")
    file_path = finding.get("file", "Unknown file")

    # Try Gemini AI first
    explanation, fix = get_gemini_explanation(issue_type, severity, file_path)

    # Fallback to dictionary if Gemini fails or no API key
    if not explanation or not fix:
        explanation, fix = get_fallback_explanation(issue_type)

    return {
        **finding,
        "ai_explanation": explanation,
        "recommended_fix": fix,
        "risk_summary": f"{severity} risk found in {file_path}"
    }


def explain_findings(findings):
    return [generate_ai_explanation(finding) for finding in findings]