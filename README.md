<div align="center">

# Resume Builder

**A modern, open-source resume builder with live preview and one-click PDF export.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Overview

InstaCV is a fully client-side resume builder built with **Next.js 16** and **React 19**. Fill in your information on the left, watch a live preview update on the right, pick a professional PDF template, and download your resume in seconds — no sign-up required, no data ever leaves your browser.

---

## Features

- **Live split-screen editor** — changes reflect instantly in the preview pane
- **4 professional PDF templates**
  - Modern 2-Column
  - Creative 2-Column
  - Classic 2-Column
  - Minimal 2-Column
- **One-click PDF export** — generates a pixel-perfect PDF entirely client-side via `@react-pdf/renderer`
- **Structured resume sections** — Personal Info, Work Experience, Education, and Skills
- **Dynamic entry management** — add or remove multiple experience and education entries
- **Collapsible sidebar navigation** — maximizes editing space on the resume page
- **Profile page** — manage personal details in a dedicated view
- **Fully typed** — end-to-end TypeScript with strict interfaces for all resume data

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
instacv/
├── app/
│   ├── page.tsx              # Template selection / home
│   ├── resume/page.tsx       # Main editor + live preview
│   ├── profile/page.tsx      # Profile management
│   └── settings/page.tsx     # App settings
├── components/
│   ├── resume-editor.tsx     # Tabbed form editor
│   ├── resume-preview.tsx    # Live HTML preview
│   ├── resume-download.tsx   # PDF export button
│   ├── layout-wrapper.tsx    # Root layout wrapper
│   ├── Sidebar.tsx           # Collapsible navigation
│   ├── pdf-templates/        # @react-pdf/renderer templates
│   │   ├── modern-pdf.tsx
│   │   ├── creative-pdf.tsx
│   │   ├── classic-pdf.tsx
│   │   └── minimal-pdf.tsx
│   └── templates/            # HTML live-preview templates
│       ├── modern-preview.tsx
│       ├── creative-preview.tsx
│       ├── classic-preview.tsx
│       └── minimal-preview.tsx
├── context/
│   └── TemplateContext.tsx   # Global selected-template state
└── lib/
    ├── resume.ts             # Core TypeScript interfaces
    ├── defaults.ts           # Default / sample resume data
    ├── pdf-registry.ts       # PDF template registry
    └── html-registry.ts      # HTML preview template registry
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [Bun](https://bun.sh) ≥ 1.1 *(recommended)* — or npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/instacv.git
cd instacv

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

1. **Pick a template** on the home page
2. Go to the **Resume** page editor on the left, live preview on the right
3. Fill in your details across four tabs: **Personal**, **Experience**, **Education**, **Skills**
4. Use the **+** / trash buttons to add or remove experience and education entries
5. Click **Download PDF** to export a perfectly formatted PDF named after you

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

- [ ] Authentication & cloud resume storage
- [ ] Additional template designs
- [ ] ATS score / keyword analysis
- [ ] Import from LinkedIn / JSON Resume
- [ ] Multi-page PDF support
- [ ] Dark mode

---

## License

Distributed under the [MIT License](LICENSE).
