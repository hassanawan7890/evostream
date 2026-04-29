# EvoStream

Static multi-page website for the entertainment history assignment.

## Local Git Setup

1. Initialize the repository if needed:
   `git init -b main`
2. Add your remote:
   `git remote add origin <your-git-repo-url>`
3. Commit and push:
   `git add .`
   `git commit -m "Initial EvoStream site"`
   `git push -u origin main`

## Vercel

This project is plain HTML, CSS, and JavaScript, so it can be deployed directly on Vercel without a build step.

Recommended flow:

1. Push the repo to GitHub, GitLab, or Bitbucket
2. In Vercel, choose `New Project`
3. Import the Git repository
4. Keep the framework preset as `Other`
5. Deploy

## Feedback

The feedback page uses `feedback-widget.js` to:

- handle star ratings
- track selected topics
- save a temporary draft in local storage
- open a pre-filled email draft so feedback works on a static deployment
