#!/bin/bash
# =============================================================
# Niteen Badgujar Blog — GitHub Setup Script
# Run this from inside the blog/ folder on your local machine
# =============================================================

set -e

REPO_NAME="niteenbadgujar-blog"
GITHUB_USER="yash-eduid"

echo "🚀 Setting up GitHub repository for your blog..."
echo ""

# 1. Initialize git
git init -b main
git add -A

git config user.name "Niteen Badgujar"
git config user.email "niteenhome@gmail.com"

git commit -m "Initial commit: Technical blog portal

- Next.js 14 + MDX + Tailwind CSS + Shiki
- Dark-first modern design with floating TOC, Mermaid diagrams
- 5 articles migrated from Medium
- GitHub Actions → Vercel auto-deploy pipeline"

echo "✅ Local git repo initialized with initial commit"
echo ""

# 2. Create GitHub repo and push
echo "📦 Creating GitHub repository '$REPO_NAME'..."
echo "   (Make sure you're logged in: gh auth login)"
echo ""

gh repo create "$GITHUB_USER/$REPO_NAME" \
  --public \
  --description "Personal technical blog on AI, Agentic AI, and LLMs — niteenbadgujar.me" \
  --push \
  --source=.

echo ""
echo "✅ Repository created and pushed!"
echo "   → https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "📋 Next steps:"
echo "   1. Go to https://vercel.com → Add New → Project"
echo "   2. Import: github.com/$GITHUB_USER/$REPO_NAME"
echo "   3. Click Deploy (Next.js auto-detected)"
echo "   4. Add domain: niteenbadgujar.me in Project → Settings → Domains"
echo "   5. Add GitHub secrets for auto-deploy:"
echo "      VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID"
echo ""
echo "🎉 Done! Your blog will be live at https://niteenbadgujar.me"
