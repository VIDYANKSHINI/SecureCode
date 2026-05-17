from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from github.clone_repo import clone_repository
from scanners.semgrep_scanner import run_semgrep_scan
from scanners.custom_scanner import run_custom_scan
from scanners.secret_scanner import run_secret_scan
from scanners.score_calculator import calculate_security_score
from scanners.ai_explainer import explain_findings
from scanners.pr_review_scanner import review_pull_request

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class RepoScanRequest(BaseModel):
    repo_url: str
class PRReviewRequest(BaseModel):
    code_content: str

# Home Endpoint
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "SecureCode AI Backend Running"
    }

# Scan Endpoint
@app.post("/scan")
def scan_repository(data: RepoScanRequest):

    # Step 1: Clone Repository
    clone_result = clone_repository(data.repo_url)

    if not clone_result["success"]:

        return {
            "status": "error",
            "message": "Repository cloning failed",
            "error": clone_result["error"]
        }

    repo_path = clone_result["repo_path"]

    # Step 2: Run Semgrep Scan
    semgrep_results = run_semgrep_scan(repo_path)

    # Step 3: Run Custom Vulnerability Scan
    custom_results = run_custom_scan(repo_path)
    # Step 4: Run Secret Leak Scan
    secret_results = run_secret_scan(repo_path)

   # Step 5: Calculate Security Dashboard
    all_findings = custom_results + secret_results

    dashboard_data = calculate_security_score(all_findings)
    ai_explanations = explain_findings(all_findings)

    return {
        "status": "success",
        "repository": data.repo_url,
        "security_score": dashboard_data["security_score"],
        "dashboard": dashboard_data["summary"],
        "semgrep_results": semgrep_results,
        "custom_results": custom_results,
        "ai_explanations": ai_explanations,
        "secret_results": secret_results
    }

@app.post("/review-pr")
def review_pr(data: PRReviewRequest):

    findings = review_pull_request(data.code_content)

    ai_review = explain_findings(findings)

    return {
        "status": "success",
        "total_issues": len(findings),
        "findings": ai_review
    }