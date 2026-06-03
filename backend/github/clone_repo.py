import os
import shutil
from git import Repo

# Use absolute path based on this file's location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_REPO_PATH = os.path.join(BASE_DIR, "..", "temp_repo")

def clone_repository(repo_url: str):

    try:
        # Normalize path
        repo_path = os.path.abspath(TEMP_REPO_PATH)

        # Delete old repository if exists
        if os.path.exists(repo_path):
            shutil.rmtree(repo_path)

        # Clone repository
        Repo.clone_from(repo_url, repo_path)

        return {
            "success": True,
            "repo_path": repo_path
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }