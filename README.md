<div align="center">

# Resume Builder

**A modern, fully client-side resume builder — pick a template, fill in your details, and export a pixel-perfect PDF. No account, no backend.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Overview

Resume Builder is a static web app built with **Next.js 16** and **React 19**. Everything runs in the browser: you edit your details in a split-screen form, watch the resume update live, and generate the PDF client-side. Nothing is uploaded anywhere.

> **Looking for the job portal?** The candidate/recruiter platform (auth, job posting, application tracking) lives on the [`feat/job-portal`](../../tree/feat/job-portal) branch. `main` is the standalone resume builder.

---

## Features

- **Live split-screen editor** — changes reflect instantly in the preview pane
- **6 professional templates**

  | Template | Style |
  |---|---|
  | Charter 1-Column | Compact LaTeX Charter CV with ruled section headings |
  | Best 1-Column | Professional single-column LaTeX style |
  | Modern 2-Column | Clean and modern with sidebar layout |
  | Creative 2-Column | Colour-accented sidebar layout |
  | Classic 2-Column | Traditional professional format |
  | Minimal 2-Column | Minimalist design with focus on content |

- **One-click PDF export** — generated client-side via `@react-pdf/renderer`
- **Structured sections** — Personal Info, Work Experience, Education, Projects, Certifications and Skills
- **Dynamic entry management** — add or remove multiple entries per section
- **End-to-end TypeScript** — strict interfaces for all resume data

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | App framework (App Router, static export) |
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
│   ├── page.tsx                       # Landing page
│   ├── layout.tsx                     # Root layout + template provider
│   ├── globals.css                    # Tailwind entry + Charis SIL @font-face
│   └── resume/page.tsx                # Resume editor + live preview
├── components/
│   ├── resume-editor.tsx              # Tabbed form editor
│   ├── resume-preview.tsx             # Live HTML preview + template selector
│   ├── resume-download.tsx            # PDF export button
│   ├── layout-wrapper.tsx             # Minimum-width guard
│   ├── pdf-templates/                 # @react-pdf/renderer PDF templates
│   │   ├── charter-pdf.tsx
│   │   ├── best-pdf.tsx
│   │   ├── modern-pdf.tsx
│   │   ├── creative-pdf.tsx
│   │   ├── classic-pdf.tsx
│   │   └── minimal-pdf.tsx
│   └── templates/                     # HTML live-preview templates
│       ├── charter-preview.tsx
│       ├── best-preview.tsx
│       ├── modern-preview.tsx
│       ├── creative-preview.tsx
│       ├── classic-preview.tsx
│       └── minimal-preview.tsx
├── context/
│   └── TemplateContext.tsx            # Global selected-template state
└── lib/
    ├── resume.ts                      # Core resume TypeScript interfaces
    ├── defaults.ts                    # Default / sample resume data
    ├── text-format.ts                 # Bullet line + bold label parsing
    ├── pdf-registry.ts                # PDF template registry
    └── html-registry.ts               # HTML preview template registry
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [Bun](https://bun.sh) ≥ 1.1 *(recommended)* — or npm / yarn / pnpm

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Abdullah-Masood-05/Resume-Builder.git
cd Resume-Builder

# 2. Install dependencies
bun install

# 3. Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

The app is configured for static export (`output: "export"`), so a build emits a fully static site to `out/`.

```bash
bun run build
```

### Available Scripts

| Script | Description |
|---|---|
| `bun dev` | Start the development server |
| `bun run build` | Build the static site into `out/` |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |

---

## Usage

1. From the landing page, click **Start Building**
2. Pick a template from the selector above the preview
3. Fill in your details across the tabs: *Personal*, *Experience*, *Education*, *Projects*, *Skills*
4. Watch the resume update live in the preview pane
5. Click **Download PDF** to export

---

## Adding a New Template

1. Create a PDF component in `components/pdf-templates/your-template.tsx` using `@react-pdf/renderer` primitives (`Page`, `View`, `Text`, `StyleSheet`)
2. Create a matching HTML preview in `components/templates/your-preview.tsx`
3. Register both in `lib/pdf-registry.ts` and `lib/html-registry.ts` under the same key

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

The new template appears in the selector automatically — no other changes needed. Keep the two components visually in sync; the preview is what users judge the PDF by.

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

- [x] Standalone resume builder (no auth required)
- [x] 6 professional PDF templates
- [x] Live split-screen preview
- [x] Static export deployment
- [ ] ATS score / keyword analysis
- [ ] Import from LinkedIn / JSON Resume
- [ ] Multi-page PDF support
- [ ] Dark mode

---

## License

Distributed under the [MIT License](LICENSE).
