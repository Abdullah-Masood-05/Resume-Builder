<div align="center">

# Resume Builder

**A modern, full-stack resume builder and job platform with live preview, one-click PDF export, and role-based job management.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Overview

Resume Builder is a fully client-side resume builder and job platform built with **Next.js 16** and **React 19**. It supports two distinct user roles — **Candidates** and **Recruiters** — each with their own authenticated dashboard. Candidates can build professional resumes and apply to job listings; recruiters can post jobs and manage applications. All data is persisted in `localStorage` — no backend required.

---

## Features

### Resume Builder
- **Live split-screen editor** — changes reflect instantly in the preview pane
- **4 professional PDF templates**
  - Modern 2-Column
  - Creative 2-Column
  - Classic 2-Column
  - Minimal 2-Column
- **One-click PDF export** — generates a pixel-perfect PDF entirely client-side via `@react-pdf/renderer`
- **Structured resume sections** — Personal Info, Work Experience, Education, and Skills
- **Dynamic entry management** — add or remove multiple experience and education entries

### Authentication & Roles
- **User registration & login** — email/password auth stored in `localStorage`
- **Role-based access** — `candidate` and `recruiter` roles with protected routes
- **Dashboard routing** — redirects automatically to the correct role-specific view on login

### Candidate Features
- **Browse jobs** — search and filter all available job listings
- **One-click apply** — submit a cover letter directly from the job board
- **My Applications** — track all applications with live status badges (`pending`, `reviewed`, `shortlisted`, `rejected`)

### Recruiter Features
- **Post jobs** — create job listings with title, company, location, type, salary, description, and requirements
- **Manage postings** — search, view, and delete own job listings
- **View applicants** — inspect all candidates who applied to a specific posting

### General
- **Collapsible sidebar navigation** — maximizes editing space on the resume page
- **Shared UI component library** — `Card`, `Button`, `Badge`, `Modal`, `SearchBar`, `EmptyState`
- **Sample data seeding** — `initializeSampleData()` pre-populates demo jobs on first load
- **Fully typed** — end-to-end TypeScript with strict interfaces for all resume, job, and application data

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
Resume Builder/
├── app/
│   ├── page.tsx                       # Template selection / home
│   ├── dashboard/page.tsx             # Auth gate + role-based redirect
│   ├── resume/page.tsx                # Main editor + live preview
│   ├── profile/page.tsx               # Profile management
│   ├── settings/page.tsx              # App settings
│   ├── auth/
│   │   ├── login/page.tsx             # Login page
│   │   └── register/page.tsx          # Registration page
│   ├── candidate/
│   │   ├── jobs/page.tsx              # Job browsing & apply
│   │   └── applications/page.tsx      # My applications tracker
│   └── recruiter/
│       └── jobs/page.tsx              # Recruiter job management
├── components/
│   ├── resume-editor.tsx              # Tabbed form editor
│   ├── resume-preview.tsx             # Live HTML preview
│   ├── resume-download.tsx            # PDF export button
│   ├── layout-wrapper.tsx             # Root layout wrapper
│   ├── Sidebar.tsx                    # Collapsible navigation
│   ├── ui/
│   │   └── index.tsx                  # Shared UI components (Card, Button, Badge, Modal, …)
│   ├── pdf-templates/                 # @react-pdf/renderer templates
│   │   ├── modern-pdf.tsx
│   │   ├── creative-pdf.tsx
│   │   ├── classic-pdf.tsx
│   │   └── minimal-pdf.tsx
│   └── templates/                     # HTML live-preview templates
│       ├── modern-preview.tsx
│       ├── creative-preview.tsx
│       ├── classic-preview.tsx
│       └── minimal-preview.tsx
├── context/
│   ├── AuthContext.tsx                # Auth state, login/register/logout
│   └── TemplateContext.tsx            # Global selected-template state
└── lib/
    ├── resume.ts                      # Core resume TypeScript interfaces
    ├── defaults.ts                    # Default / sample resume data
    ├── services.ts                    # Job & Application services (localStorage CRUD)
    ├── pdf-registry.ts                # PDF template registry
    └── html-registry.ts              # HTML preview template registry
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [Bun](https://bun.sh) ≥ 1.1 *(recommended)* — or npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Resume Builder.git
cd Resume Builder

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

### As a Candidate
1. **Register** at `/auth/login` — select the *Candidate* role
2. You'll land on the **Browse Jobs** page — search and filter open positions
3. Click **Apply** on any listing, write a cover letter, and submit
4. Track your application statuses under **My Applications**
5. Head to **Resume** to build your resume: pick a template, fill in your details across four tabs (*Personal*, *Experience*, *Education*, *Skills*), then click **Download PDF**

### As a Recruiter
1. **Register** at `/auth/login` — select the *Recruiter* role
2. You'll land on the **My Job Postings** dashboard
3. Click **Post New Job** to create a listing with full details (title, company, location, type, salary, description, requirements)
4. Click **View Applicants** on any posting to see who has applied
5. Delete obsolete listings with the trash icon

---

## Adding a New Template

1. Create a PDF template in `components/pdf-templates/your-template.tsx` using `@react-pdf/renderer` primitives (`Page`, `View`, `Text`, `StyleSheet`)
2. Create a matching HTML component in `components/templates/your-preview.tsx` for the live editor preview
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

The new template will automatically appear on the template selection page — no other changes needed.

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org): `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

Please make sure the project builds (`bun run build`) and lints (`bun run lint`) without errors before submitting.

---

## Roadmap

- [x] Authentication & role-based access (candidate / recruiter)
- [x] Job posting & browsing platform
- [x] Application submission & tracking
- [x] Shared UI component library
- [ ] Cloud resume storage
- [ ] Additional template designs
- [ ] ATS score / keyword analysis
- [ ] Import from LinkedIn / JSON Resume
- [ ] Multi-page PDF support
- [ ] Dark mode

---

## License

Distributed under the [MIT License](LICENSE).
