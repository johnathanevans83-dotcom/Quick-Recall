# Westport Middle School Quick Recall Guide

A single-file study app (flashcards + multiple-choice quizzes) for the KAAC
Governors Cup Quick Recall competition. Five subjects, 29 categories, 969 items.

## Files

- `index.html` — the entire app (HTML + CSS + JS, no external dependencies)
- `server.js` — tiny dependency-free Node server that serves `index.html`
- `package.json` — tells Railway how to start the app (`npm start`)

## Run locally

```
node server.js
# open http://localhost:3000
```

## Deploy on Railway

1. Push this folder to a GitHub repository.
2. In Railway: **New Project → Deploy from GitHub repo** → pick the repo.
3. Railway detects `package.json` and runs `npm start`. No build step is needed.
4. When the deploy finishes, open the service → **Settings → Networking →
   Generate Domain**. Railway will show the port the server is listening on
   (it injects `PORT` automatically); accept it.

Every push to the default branch redeploys automatically.

## Updating content

All study content lives in the `SUBJECTS` array near the top of the `<script>`
block in `index.html`. Edit, commit, push — Railway redeploys.
