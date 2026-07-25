import type { Project, ResumeLink } from "./resume"

/** Splits a multi-line description field into trimmed, non-empty bullet lines. */
export function splitLines(text?: string): string[] {
  return (text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

/**
 * Pulls a bold lead-in label off a bullet line so templates can render it emphasised,
 * matching LaTeX's `\item \textbf{Tech Stack:} ...` pattern.
 *
 * Recognises explicit markdown (`**Tech Stack:** Django, ...`) and a few conventional
 * labels written plainly (`Tech Stack: Django, ...`).
 */
export function splitLabel(line: string): { label?: string; text: string } {
  const markdown = line.match(/^\*\*(.+?)\*\*\s*(.*)$/)
  if (markdown) return { label: markdown[1], text: markdown[2] }

  const conventional = line.match(/^(Tech Stack|Stack|Technologies|Tools|Coursework):\s*(.*)$/i)
  if (conventional) return { label: `${conventional[1]}:`, text: conventional[2] }

  return { text: line }
}

/**
 * Normalises a project's links into one list, so templates don't each have to handle
 * both the multi-link `links` array and the older single `url` / `urlLabel` pair.
 */
export function projectLinks(project: Project): ResumeLink[] {
  if (project.links?.length) return project.links
  if (project.url) return [{ label: project.urlLabel || "Link", url: project.url }]
  return []
}
