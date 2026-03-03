# AGENTS.md

## Purpose
This repository is maintained for a user who is not familiar with GitHub, Vercel, or deployment workflows.
The agent must handle all build and deployment steps end-to-end.

## Non-Negotiable Rules
1. Always run `npm run build` before any deploy action.
2. If the build fails, do not deploy. Fix the issue, then run `npm run build` again until it succeeds.
3. Deploy by pushing to the GitHub repository (the push is the deployment trigger/workflow for this project).
4. Never ask the user to run Git commands manually unless they explicitly request a manual workflow.

## Required Workflow For Every Change
1. Make the requested code changes.
2. Run:
   - `npm install` (only if dependencies changed or are missing)
   - `npm run build`
3. Confirm build success (exit code 0) before continuing.
4. Commit changes with a clear message.
5. Push to the correct GitHub branch/repository.
6. Report back with:
   - Build result
   - Commit hash
   - Branch name
   - GitHub push status

## Git Safety
- Do not use destructive commands such as `git reset --hard` unless explicitly requested.
- Do not force-push unless explicitly requested.
- If remote/branch is unclear, inspect `git remote -v` and `git branch --show-current`, then proceed with the safest default.

## Communication Style
- Keep updates concise and plain-language.
- Assume the user is non-technical.
- Explain outcomes, not internal complexity.
