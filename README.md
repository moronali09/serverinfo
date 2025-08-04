# Serverinfo (Minecraft Status CLI for Vercel)

Deployed on Vercel using Next.js API routes.
Usage: [https://your-project.vercel.app](https://serverinfo-1rodyt3cs-moronali09s-projects.vercel.app/) — type `check <ip>` in the CLI.

## API
GET `/api/status?server=host[:port]`

## Frontend
React + Preformatted CLI-style terminal.

## Deployment
1. Git push to GitHub.
2. Connect repo on Vercel → Automatic build + deploy.

## Environment
No env variables needed; all external calls to mcsrvstat.us
