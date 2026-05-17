from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from github.clone_repo import clone_repository
from scanners.semgrep_scanner import run_semgrep_scan
from scanners.custom_scanner import run_custom_scan

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

    # Step 4: Calculate Security Score
    security_score = 100

    for finding in custom_results:

        severity = finding["severity"]

        if severity == "Critical":
            security_score -= 25

        elif severity == "High":
            security_score -= 15

        elif severity == "Medium":
            security_score -= 10

    if security_score < 0:
        security_score = 0

    return {
        "status": "success",
        "repository": data.repo_url,
        "security_score": security_score,
        "semgrep_results": semgrep_results,
        "custom_results": custom_results
    }