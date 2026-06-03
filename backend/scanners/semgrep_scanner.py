import subprocess
import json
import sys

def run_semgrep_scan(repo_path: str):

    try:
        # Use sys.executable to run semgrep via python -m semgrep (works better on Windows)
        result = subprocess.run(
            [
                sys.executable, "-m", "semgrep",
                "--config=auto",
                repo_path,
                "--json",
                "--no-git-ignore"
            ],
            capture_output=True,
            text=True,
            timeout=120  # 2 minute timeout to avoid hanging
        )

        # If semgrep returned nothing or errored
        if not result.stdout.strip():
            return {
                "success": False,
                "error": "Semgrep returned no output. It may not be installed or the scan timed out.",
                "findings": []
            }

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

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "error": "Semgrep scan timed out after 120 seconds.",
            "findings": []
        }

    except json.JSONDecodeError:
        return {
            "success": False,
            "error": "Semgrep output could not be parsed. Check if semgrep is installed correctly.",
            "findings": []
        }

    except FileNotFoundError:
        return {
            "success": False,
            "error": "Semgrep is not installed. Run: pip install semgrep",
            "findings": []
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "findings": []
        }