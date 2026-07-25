import React from "react"
import type { Certification, Project, ResumeData, ResumeLink } from "@/lib/resume"
import { splitLabel, splitLines } from "@/lib/text-format"
import { FaEnvelope, FaGithub, FaGlobe, FaLink, FaLinkedin } from "react-icons/fa"

export interface CharterHtmlTemplateProps {
  data: ResumeData
}

/**
 * Compact single-column CV modelled on the LaTeX `charter` article layout:
 * letterpaper with 1.5cm margins, 10pt body, 21pt name, ruled section headings
 * and tight itemize lists (leftmargin 1.5em, no item/top separation).
 */
export function CharterHtmlTemplate({ data }: CharterHtmlTemplateProps) {
  const safe = (text?: string) => text || ""

  const personal = data.personal || ({} as ResumeData["personal"])
  const experience = (data.experience || []).filter(Boolean)
  const education = (data.education || []).filter(Boolean)
  const projects = (data.projects || []).filter(Boolean)
  const certifications = (data.certifications || []).filter(Boolean)
  const skills = (data.skills || []).filter(Boolean)
  const skillCategories = (data.skillCategories || []).filter(Boolean)

  return (
    <div
      style={{
        // letterpaper (8.5in x 11in) with geometry margins of 1.5cm
        width: "8.5in",
        minHeight: "11in",
        margin: "0 auto",
        padding: "1.5cm",
        background: "#ffffff",
        color: "#000000",
        fontFamily: "'Charis SIL', Charter, 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif",
        fontSize: "10pt",
        lineHeight: 1.2,
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header style={{ textAlign: "center" }}>
        <div style={{ fontSize: "21pt", lineHeight: 1, marginBottom: "5pt" }}>
          {safe(personal.fullName)}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "11pt",
            rowGap: "2pt",
            fontSize: "9pt",
          }}
        >
          {personal.email && (
            <ContactItem icon={<FaEnvelope size={10} />} href={`mailto:${personal.email}`}>
              {personal.email}
            </ContactItem>
          )}
          {personal.linkedin && (
            <ContactItem icon={<FaLinkedin size={10} />} href={personal.linkedin}>
              {stripProtocol(personal.linkedin, /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\//i)}
            </ContactItem>
          )}
          {personal.github && (
            <ContactItem icon={<FaGithub size={10} />} href={personal.github}>
              {stripProtocol(personal.github, /^(?:https?:\/\/)?(?:www\.)?github\.com\//i)}
            </ContactItem>
          )}
          {personal.website && (
            <ContactItem icon={<FaGlobe size={10} />} href={personal.website}>
              {stripProtocol(personal.website, /^(?:https?:\/\/)?(?:www\.)?/i)}
            </ContactItem>
          )}
          {personal.phone && <ContactItem icon={null}>{personal.phone}</ContactItem>}
        </div>
      </header>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
      {experience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <Entry key={i}>
              <EntryHeader
                title={safe(exp.position) || safe(exp.company)}
                right={joinDates(exp.startDate, exp.endDate)}
              />
              {exp.position && exp.company && <EntrySubtitle>{safe(exp.company)}</EntrySubtitle>}
              <BulletList lines={splitLines(exp.description)} />
            </Entry>
          ))}
        </section>
      )}

      {/* ── PROJECTS ───────────────────────────────────────────────────── */}
      {projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <Entry key={i}>
              <EntryHeader
                title={safe(proj.name)}
                right={proj.date}
                links={projectLinks(proj)}
              />
              <BulletList
                lines={splitLines(proj.description)}
                trailing={proj.techStack ? `**Tech Stack:** ${proj.techStack}` : undefined}
              />
            </Entry>
          ))}
        </section>
      )}

      {/* ── EDUCATION ──────────────────────────────────────────────────── */}
      {education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <Entry key={i}>
              <EntryHeader
                title={safe(edu.school)}
                right={joinDates(edu.startDate, edu.graduationYear)}
              />
              <div>
                {safe(edu.degree)}
                {edu.field ? ` in ${safe(edu.field)}` : ""}
              </div>
            </Entry>
          ))}
        </section>
      )}

      {/* ── CERTIFICATIONS ─────────────────────────────────────────────── */}
      {certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <Entry key={i}>
              <EntryHeader
                title={safe(cert.name)}
                right={cert.date}
                links={certificationLinks(cert)}
              />
              {cert.description && <div>{cert.description}</div>}
              <BulletList lines={cert.bullets || []} />
            </Entry>
          ))}
        </section>
      )}

      {/* ── TECHNICAL SKILLS ───────────────────────────────────────────── */}
      {(skillCategories.length > 0 || skills.length > 0) && (
        <section>
          <SectionTitle>Technical Skills</SectionTitle>
          {skillCategories.length > 0 ? (
            skillCategories.map((group, i) => (
              <div key={i}>
                <strong>{group.category}:</strong> {(group.items || []).join(", ")}
              </div>
            ))
          ) : (
            <div>
              <strong>Skills:</strong> {skills.join(", ")}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

// ── Building blocks ───────────────────────────────────────────────────────

function ContactItem({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode
  href?: string
  children: React.ReactNode
}) {
  const label = href ? (
    <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
      {children}
    </a>
  ) : (
    children
  )

  return (
    <span style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
      {icon && <span style={{ display: "inline-flex", marginRight: "0.15cm" }}>{icon}</span>}
      {label}
    </span>
  )
}

/** `\titleformat{\section}{\bfseries\large}{}{0pt}{}[\titlerule]` */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "12pt",
        fontWeight: 700,
        marginTop: "0.6em",
        paddingBottom: "2.5pt",
        marginBottom: "0.3em",
        borderBottom: "0.5pt solid #000000",
      }}
    >
      {children}
    </div>
  )
}

/** One entry plus the `\vspace{0.3em}` that follows it. */
function Entry({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "0.3em", breakInside: "avoid" }}>{children}</div>
}

/** `\textbf{Title} \hfill Right` */
function EntryHeader({
  title,
  right,
  links,
}: {
  title: string
  right?: string
  links?: ResumeLink[]
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5em" }}>
      <strong>{title}</strong>
      <span
        style={{
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          columnGap: "0.6em",
          whiteSpace: "nowrap",
        }}
      >
        {(links || []).map((link, i) => (
          <a
            key={i}
            href={link.url}
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <FaLink size={9} style={{ marginRight: "0.1cm" }} />
            {link.label}
          </a>
        ))}
        {right && <span>{right}</span>}
      </span>
    </div>
  )
}

/** `\textit{Subtitle}` */
function EntrySubtitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontStyle: "italic" }}>{children}</div>
}

/** `\begin{itemize}` with leftmargin=1.5em, itemsep=0pt, topsep=0pt */
function BulletList({ lines, trailing }: { lines: string[]; trailing?: string }) {
  const items = (trailing ? [...lines, trailing] : lines).map((l) => l.trim()).filter(Boolean)
  if (items.length === 0) return null

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: "0 0 0 0.4em" }}>
      {items.map((line, i) => {
        const { label, text } = splitLabel(line)
        return (
          <li key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <span style={{ width: "1.1em", flexShrink: 0 }}>&bull;</span>
            <span style={{ flex: 1 }}>
              {label && <strong>{label} </strong>}
              {text}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────

function stripProtocol(url: string, pattern: RegExp) {
  return url.replace(pattern, "").replace(/\/$/, "")
}

function joinDates(start?: string, end?: string) {
  if (start && end) return `${start} – ${end}`
  return start || end || ""
}

function projectLinks(project: Project): ResumeLink[] {
  if (project.links?.length) return project.links
  if (project.url) return [{ label: project.urlLabel || "Link", url: project.url }]
  return []
}

function certificationLinks(cert: Certification): ResumeLink[] {
  if (!cert.url) return []
  return [{ label: cert.urlLabel || "Certificate", url: cert.url }]
}
