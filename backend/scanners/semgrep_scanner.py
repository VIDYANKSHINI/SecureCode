import subprocess
import json

def run_semgrep_scan(repo_path: str):

    try:

        result = subprocess.run(
            [
                "python",
                "-m",
                "semgrep",
                "--config=auto",
                repo_path,
                "--json"
            ],
            capture_output=True,
            text=True
        )

        output = json.loads(result.stdout)

        simplified_results = []

        if "results" in output:

            for finding in output["results"]:

                simplified_results.append({
                    "check_id": finding.get("check_id"),
                    "path": finding.get("path"),
                    "message": finding.get("extra", {}).get("message"),
                    "severity": finding.get("extra", {}).get("severity")
                })

        return {
            "success": True,
            "findings": simplified_results
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }