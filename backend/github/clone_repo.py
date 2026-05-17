from git import Repo
import shutil
import os

TEMP_REPO_PATH = "./temp_repo"

def clone_repository(repo_url: str):

    try:

        # Delete old repository if exists
        if os.path.exists(TEMP_REPO_PATH):
            shutil.rmtree(TEMP_REPO_PATH)

        # Clone repository
        Repo.clone_from(repo_url, TEMP_REPO_PATH)

        return {
            "success": True,
            "repo_path": TEMP_REPO_PATH
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }