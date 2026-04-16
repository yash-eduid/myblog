# Niteen Badgujar — Technical Blog

Personal technical blog focused on AI, Agentic AI, LLMs, and production machine learning systems. Built with Next.js 14, MDX, Tailwind CSS, and Shiki.

**Live at:** [niteenbadgujar.me](https://niteenbadgujar.me)

---

## Writing a New Article

1. Create a new `.mdx` file in `content/posts/`:

```bash
touch content/posts/my-new-article.mdx
```

2. Add frontmatter at the top:

```yaml
---
title: "Your Article Title"
date: "2026-04-16"
description: "A clear, one-sentence description for search engines and previews."
tags: ["Agentic AI", "LLM", "Azure"]
featured: false
---
```

3. Write your article in Markdown below the frontmatter.

4. Push to `main` — Vercel auto-deploys within ~60 seconds.

---

## MDX Features

### Syntax Highlighting

Wrap code in triple backticks with a language identifier:

````md
```python
def hello():
    print("Hello, world!")
```
````

Supported: `python`, `typescript`, `javascript`, `bash`, `yaml`, `json`, `go`, `rust`, `sql`, `dockerfile`, and [200+ more via Shiki](https://shiki.style/languages).

Highlight specific lines by adding `{2,4-6}` after the language:

````md
```python {1,3}
# This line is highlighted
def hello():
    print("Hello!")  # This line is highlighted
```
````

### Mermaid Diagrams

Use the `<Mermaid>` component for diagrams:

```mdx
<Mermaid>
flowchart LR
  A[Start] --> B[Process] --> C[End]
</Mermaid>
```

Supports: flowchart, sequence, class, state, ER, Gantt, and more.

### Callout Boxes

```mdx
<Callout type="info">
  This is an informational note.
</Callout>

<Callout type="warning">
  Watch out for this edge case.
</Callout>

<Callout type="tip">
  Pro tip: do it this way.
</Callout>

<Callout type="danger">
  This will break things.
</Callout>
```

### Tables

Standard Markdown tables render with custom dark styling:

```md
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Value A  | Value B  | Value C  |
```

---

## Frontmatter Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Article title |
| `date` | string (YYYY-MM-DD) | ✅ | Publication date |
| `description` | string | ✅ | SEO meta description |
| `tags` | string[] | ✅ | Topic tags (used for filtering) |
| `featured` | boolean | ❌ | Show in Featured section on home page |
| `coverImage` | string (URL) | ❌ | Cover image URL |
| `originalUrl` | string (URL) | ❌ | Original post URL (e.g. Medium) |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Deployment

### First-time Setup (Vercel + GitHub)

1. Push this repo to GitHub (under `yash-eduid` account)
2. Go to [vercel.com](https://vercel.com) → Import Git Repository → select your repo
3. Vercel auto-detects Next.js — click Deploy
4. Add your custom domain `niteenbadgujar.me` in Vercel → Project Settings → Domains
5. Add required secrets to GitHub repo (Settings → Secrets):
   - `VERCEL_TOKEN` — from Vercel account settings
   - `VERCEL_ORG_ID` — from `.vercel/project.json` after first deploy
   - `VERCEL_PROJECT_ID` — from `.vercel/project.json` after first deploy

### After setup

Every `git push` to `main` triggers a production deploy automatically via GitHub Actions.

Pull requests get preview deployments at unique Vercel URLs.

---

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, navbar, footer)
│   ├── page.tsx            # Home page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/page.tsx # Individual article
│   ├── about/page.tsx      # About page
│   └── tags/               # Tag pages
├── components/             # React components
├── content/
│   └── posts/              # ← Your MDX articles go here
├── lib/                    # Utilities (posts, mdx, types)
└── public/                 # Static assets
```
