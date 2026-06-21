# VAIS

VAIS is a small, focused Next.js application that serves as the public website for the project. This repository contains the full source for the site including frontend code, components, static assets, and build configuration.

## Purpose

This app provides a fast, accessible, and maintainable website built with modern web tooling. It is intended to showcase project information and serve as the canonical public site.

## Tech Stack...

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vite-style dev experience via Next.js
- pnpm for package management

## Prerequisites

- Node.js (LTS recommended)
- pnpm (package manager)

## Quick Start

1. Install dependencies

```powershell
pnpm install
```

2. Run the development server

```powershell
pnpm dev
```

3. Build for production

```powershell
pnpm build
pnpm start
```

## Environment

Place runtime configuration and secrets in environment variables or a `.env` file as required. This project expects typical Next.js environment variables; add any service keys or build-time flags before running production builds.

## Project Structure (high level)

- `app/` — Next.js app routes and pages
- `components/` — UI components organized by feature
- `data/` — static data used by the site
- `lib/` — utilities and helper functions
- `public/` — static assets (images, icons)
- `styles/` — global styles and Tailwind config
- `types/` — TypeScript type declarations

## Scripts

- `pnpm dev` — starts the development server
- `pnpm build` — builds the app for production
- `pnpm start` — runs the production server after build

Add any additional scripts for linting, formatting, or testing as needed.

## Deployment

This app can be deployed to any platform that supports Next.js (Vercel, Netlify, Docker, etc.). Use the standard Next.js build output and follow your host provider's recommended deployment guide.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of changes and rationale.

## License

Specify your preferred license in `package.json` and add a `LICENSE` file at the repository root.

---

For more details about individual content or page specifications, see the project documentation or open issues. This README focuses on setup, purpose, and repository structure to get contributors started quickly.
