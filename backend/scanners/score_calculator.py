def calculate_security_score(all_findings):
    score = 100

    severity_count = {
        "Critical": 0,
        "High": 0,
        "Medium": 0,
        "Low": 0
    }

    for finding in all_findings:
        severity = finding.get("severity", "Low")

        if severity in severity_count:
            severity_count[severity] += 1
        else:
            severity_count["Low"] += 1

        if severity == "Critical":
            score -= 25
        elif severity == "High":
            score -= 15
        elif severity == "Medium":
            score -= 10
        elif severity == "Low":
            score -= 5

    if score < 0:
        score = 0

    total_issues = sum(severity_count.values())

    return {
        "security_score": score,
        "summary": {
            "total_issues": total_issues,
            "critical": severity_count["Critical"],
            "high": severity_count["High"],
            "medium": severity_count["Medium"],
            "low": severity_count["Low"]
        }
    }