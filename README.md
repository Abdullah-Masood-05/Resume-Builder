# Resume Builder

A modern, full-featured resume creation and management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The application will auto-reload as you edit files.

## Project Structure

### Core Architecture
- **App Router**: Next.js App Router with pages in [app/](app/) directory
  - [app/page.tsx](app/page.tsx) - Home page
  - [app/profile/page.tsx](app/profile/page.tsx) - User profile management
  - [app/resume/](app/resume/) - Resume editing and preview
  - [app/settings/](app/settings/) - Application settings

### Components
- [components/resume-editor.tsx](components/resume-editor.tsx) - Resume content editor
- [components/resume-preview.tsx](components/resume-preview.tsx) - Live resume preview
- [components/resume-download.tsx](components/resume-download.tsx) - PDF export functionality
- [components/Sidebar.tsx](components/Sidebar.tsx) - Navigation sidebar
- [components/layout-wrapper.tsx](components/layout-wrapper.tsx) - Layout wrapper component
- [components/pdf-templates/](components/pdf-templates/) - Multiple resume templates

### Data Management
- [lib/resume.ts](lib/resume.ts) - TypeScript types and interfaces for resume data
- [lib/defaults.ts](lib/defaults.ts) - Default resume data and sample content
- [lib/pdf-registry.ts](lib/pdf-registry.ts) - PDF template registry
- [lib/html-registry.ts](lib/html-registry.ts) - HTML template registry

### State Management
- [context/TemplateContext.tsx](context/TemplateContext.tsx) - React Context for template selection

### Styling
- [app/globals.css](app/globals.css) - Global styles
- Tailwind CSS framework integration via [postcss.config.mjs](postcss.config.mjs)

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Linting**: ESLint
- **State Management**: React Context API
- **PDF Generation**: Custom template registry system

## Scripts

Available npm scripts in [package.json](package.json):
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration Files

- [tsconfig.json](tsconfig.json) - TypeScript configuration
- [next.config.ts](next.config.ts) - Next.js configuration
- [eslint.config.mjs](eslint.config.mjs) - ESLint rules
- [postcss.config.mjs](postcss.config.mjs) - PostCSS configuration

## Features

- Multiple resume templates with customizable layouts
- Real-time resume preview
- PDF export with multiple template options
- Profile management
- Settings configuration
- Type-safe data handling with TypeScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)