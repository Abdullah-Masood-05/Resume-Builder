<div align="center">

# Resume Builder

**A modern, client-side resume builder and job platform — choose between a standalone resume builder or a role-based job portal with live preview, PDF export, and applicant management.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Overview

Resume Builder is a fully client-side web app built with **Next.js 16** and **React 19**. On launch, users choose between two independent paths:

- **Resume Builder** — a standalone tool for building and exporting professional resumes, no account required.
- **Job Portal** — an authenticated platform supporting two roles:
  - **Candidates** — browse jobs, apply, track applications, and build resumes
  - **Recruiters** — post jobs, manage listings, and review applicants

All data is persisted in `localStorage` — no backend required.

---

## Getting Started

Open the app and you'll land on the home page with two cards:

| Path | Auth Required | Description |
|---|---|---|
| **Resume Builder** | No | Jump straight into building a resume |
| **Job Portal** | Yes | Sign in or register with a Candidate or Recruiter role |

---

## Features

### Resume Builder (Standalone)
- **Live split-screen editor** — changes reflect instantly in the preview pane
- **5 professional PDF templates**
  - Best (Professional LaTeX Style)
  - Modern 2-Column
  - Creative 2-Column
  - Classic 2-Column
  - Minimal 2-Column
- **One-click PDF export** — pixel-perfect PDF generated client-side via `@react-pdf/renderer`
- **Structured sections** — Personal Info, Work Experience, Education, Projects, and Skills
- **Dynamic entry management** — add or remove multiple entries per section

### Authentication & Roles (Job Portal)
- **Register & login** — email/password stored in `localStorage`
- **Role selection at signup** — choose *Job Candidate* or *Recruiter* during registration
- **Protected routes** — role-based access control throughout the portal
- **Auto-redirect on login** — routes to the correct dashboard based on role

### Candidate Features
- **Browse jobs** — search and filter all available listings
- **One-click apply** — submit a cover letter directly from the job board
- **My Applications** — track statuses: `pending`, `reviewed`, `shortlisted`, `rejected`
- **Resume builder access** — candidates can also access the resume builder from their sidebar

### Recruiter Features
- **Post jobs** — create listings with title, company, location, type, salary, description, and requirements
- **Manage postings** — search, view, and delete own listings
- **View applicants** — inspect all candidates who applied to a specific posting

### General
- **Fully mobile responsive** — optimized for mobile, tablet, and desktop
- **Collapsible sidebar** — role-aware navigation with click-outside to close
- **Profile dashboard** — unified profile management and statistics
- **Shared UI components** — `Card`, `Button`, `Badge`, `Modal`, `SearchBar`, `EmptyState`
- **Sample data seeding** — demo jobs pre-populated on first load
- **End-to-end TypeScript** — strict interfaces for all resume, job, and application data

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | App framework (App Router) |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling |
| [@react-pdf/renderer](https://react-pdf.org) | 4 | Client-side PDF generation |
| [Lucide React](https://lucide.dev) | latest | Icons |
| [React Icons](https://react-icons.github.io/react-icons) | 5 | Additional icons |
| [Bun](https://bun.sh) | 1.1 | Package manager & runtime |

---

## Project Structure

```
Resume-Builder/
├── app/
│   ├── page.tsx                       # Landing page — choose Resume Builder or Job Portal
│   ├── resume/page.tsx                # Standalone resume editor + live preview
│   ├── dashboard/page.tsx             # Unified profile dashboard (post-login)
│   ├── settings/page.tsx              # App settings
│   ├── auth/
│   │   └── login/page.tsx             # Login / register with role selection
│   ├── candidate/
│   │   ├── jobs/page.tsx              # Job browsing & apply
│   │   └── applications/page.tsx      # Application tracker
│   └── recruiter/
│       └── jobs/page.tsx              # Recruiter job management
├── components/
│   ├── resume-editor.tsx              # Tabbed form editor
│   ├── resume-preview.tsx             # Live HTML preview
│   ├── resume-download.tsx            # PDF export button
│   ├── layout-wrapper.tsx             # Root layout wrapper
│   ├── Sidebar.tsx                    # Role-aware collapsible navigation
│   ├── ui/
│   │   └── index.tsx                  # Shared UI components
│   ├── pdf-templates/                 # @react-pdf/renderer PDF templates
│   │   ├── best-pdf.tsx
│   │   ├── modern-pdf.tsx
│   │   ├── creative-pdf.tsx
│   │   ├── classic-pdf.tsx
│   │   └── minimal-pdf.tsx
│   └── templates/                     # HTML live-preview templates
│       ├── best-preview.tsx
│       ├── modern-preview.tsx
│       ├── creative-preview.tsx
│       ├── classic-preview.tsx
│       └── minimal-preview.tsx
├── context/
│   ├── AuthContext.tsx                # Auth state — login / register / logout
│   └── TemplateContext.tsx            # Global selected-template state
└── lib/
    ├── resume.ts                      # Core resume TypeScript interfaces
    ├── defaults.ts                    # Default / sample resume data
    ├── services.ts                    # Job & application CRUD (localStorage)
    ├── pdf-registry.ts                # PDF template registry
    └── html-registry.ts              # HTML preview template registry
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [Bun](https://bun.sh) ≥ 1.1 *(recommended)* — or npm / yarn / pnpm

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Resume-Builder.git
cd Resume-Builder

# 2. Install dependencies
bun install
# or: npm install

# 3. Start the development server
bun dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun run start
```

### Available Scripts

| Script | Description |
|---|---|
| `bun dev` | Start the development server |
| `bun run build` | Build for production |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |

---

## Usage

### Resume Builder (No account needed)
1. On the landing page, click **Resume Builder**
2. Pick a template from the top selector
3. Fill in your details across five tabs: *Personal*, *Experience*, *Education*, *Projects*, *Skills*
4. See your resume update live in the preview pane
5. Click **Download PDF** to export

### As a Candidate
1. On the landing page, click **Job Portal** → **Sign In / Register**
2. Select *Job Candidate* as your role and create an account
3. Browse and filter open positions from the **Browse Jobs** page
4. Click **Apply**, write a cover letter, and submit
5. Track your application statuses under **My Applications**
6. Use **Build Resume** in the sidebar to access the resume editor

### As a Recruiter
1. On the landing page, click **Job Portal** → **Sign In / Register**
2. Select *Recruiter* as your role and create an account
3. You'll land on **My Job Postings** — click **Post New Job** to create a listing
4. Fill in the title, company, location, type, salary, description, and requirements
5. Click **View Applicants** on any posting to see who applied
6. Delete obsolete listings with the trash icon

---

## Adding a New Template

1. Create a PDF component in `components/pdf-templates/your-template.tsx` using `@react-pdf/renderer` primitives (`Page`, `View`, `Text`, `StyleSheet`)
2. Create a matching HTML preview in `components/templates/your-preview.tsx`
3. Register both in `lib/pdf-registry.ts` and `lib/html-registry.ts`

```ts
// lib/pdf-registry.ts
import { YourPdfTemplate } from "@/components/pdf-templates/your-template"

export const pdfTemplates = {
  // ... existing templates
  "your-key": {
    name: "Your Template Name",
    description: "A short description of the style",
    component: YourPdfTemplate,
  },
}
```

The new template will automatically appear in the template selector — no other changes needed.

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org): `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

Please ensure the project builds (`bun run build`) and lints (`bun run lint`) without errors before submitting.

---

## Roadmap

- [x] Landing page with Resume Builder / Job Portal path selection
- [x] Standalone resume builder (no auth required)
- [x] Authentication & role-based access (candidate / recruiter)
- [x] Job posting & browsing platform
- [x] Application submission & tracking
- [x] 5 professional PDF templates
- [x] Shared UI component library
- [x] Mobile responsiveness
- [ ] ATS score / keyword analysis
- [ ] Import from LinkedIn / JSON Resume
- [ ] Multi-page PDF support
- [ ] Dark mode

---

## License

Distributed under the [MIT License](LICENSE).
