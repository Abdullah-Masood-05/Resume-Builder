import React from "react"
import { Font, Link, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer"
import type { Certification, Project, ResumeData, ResumeLink } from "@/lib/resume"
import { splitLabel, splitLines } from "@/lib/text-format"

export interface CharterPdfTemplateProps {
  data: ResumeData
}

// Charis SIL is a Bitstream Charter derivative, matching LaTeX's `charter` package.
Font.register({
  family: "Charis SIL",
  fonts: [
    { src: "https://fonts.gstatic.com/s/charissil/v2/oPWK_kV3l-s-Q8govXvKrPo.ttf", fontWeight: 400, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/charissil/v2/oPWJ_kV3l-s-Q8govXvKlEbJRj4.ttf", fontWeight: 700, fontStyle: "normal" },
    { src: "https://fonts.gstatic.com/s/charissil/v2/oPWI_kV3l-s-Q8govXvKnPjsZg.ttf", fontWeight: 400, fontStyle: "italic" },
    { src: "https://fonts.gstatic.com/s/charissil/v2/oPWX_kV3l-s-Q8govXvKnPjU2jtXRg.ttf", fontWeight: 700, fontStyle: "italic" },
  ],
})

// react-pdf hyphenates on overflow, which mangles technical terms ("implemen-tation",
// "Postgre-SQL"). Registering an identity callback keeps whole words intact.
// Note: this setting is global to @react-pdf/renderer, so it applies to every template.
Font.registerHyphenationCallback((word) => [word])

// Font Awesome Free 6 icon outlines (Icons: CC BY 4.0).
const ICONS = {
  envelope: {
    viewBox: "0 0 512 512",
    d: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
  },
  linkedin: {
    viewBox: "0 0 448 512",
    d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  },
  github: {
    viewBox: "0 0 496 512",
    d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
  },
  globe: {
    viewBox: "0 0 512 512",
    d: "M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z",
  },
  link: {
    viewBox: "0 0 640 512",
    d: "M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z",
  },
} as const

const FONT = "Charis SIL"

const styles = StyleSheet.create({
  page: {
    padding: "1.5cm",
    fontFamily: FONT,
    fontSize: 10,
    lineHeight: 1.2,
    color: "#000000",
  },
  // Header
  name: {
    fontSize: 21,
    lineHeight: 1,
    marginBottom: 5,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 9,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5.5,
  },
  // Sections — \titleformat{\section}{\bfseries\large}{}{0pt}{}[\titlerule]
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 7.2,
    paddingBottom: 2.5,
    marginBottom: 3.6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
  },
  // Entries — trailing \vspace{0.3em}
  entry: {
    marginBottom: 3,
  },
  entryHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  entryTitle: {
    flexGrow: 1,
    flexShrink: 1,
    fontWeight: 700,
    paddingRight: 6,
  },
  entryRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryLink: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    color: "#000000",
    textDecoration: "none",
  },
  subtitle: {
    fontStyle: "italic",
  },
  // Bullets — leftmargin=1.5em, itemsep=0pt, topsep=0pt
  bulletList: {
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    width: 11,
  },
  bulletText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bold: {
    fontWeight: 700,
  },
})

export function CharterPdfTemplate({ data }: CharterPdfTemplateProps) {
  const safe = (text?: string) => text || ""

  const personal = data.personal || ({} as ResumeData["personal"])
  const experience = (data.experience || []).filter(Boolean)
  const education = (data.education || []).filter(Boolean)
  const projects = (data.projects || []).filter(Boolean)
  const certifications = (data.certifications || []).filter(Boolean)
  const skills = (data.skills || []).filter(Boolean)
  const skillCategories = (data.skillCategories || []).filter(Boolean)

  return (
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View>
        <Text style={styles.name}>{safe(personal.fullName)}</Text>
        <View style={styles.contactRow}>
          {personal.email && (
            <ContactItem icon="envelope" href={`mailto:${personal.email}`}>
              {personal.email}
            </ContactItem>
          )}
          {personal.linkedin && (
            <ContactItem icon="linkedin" href={personal.linkedin}>
              {stripProtocol(personal.linkedin, /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\//i)}
            </ContactItem>
          )}
          {personal.github && (
            <ContactItem icon="github" href={personal.github}>
              {stripProtocol(personal.github, /^(?:https?:\/\/)?(?:www\.)?github\.com\//i)}
            </ContactItem>
          )}
          {personal.website && (
            <ContactItem icon="globe" href={personal.website}>
              {stripProtocol(personal.website, /^(?:https?:\/\/)?(?:www\.)?/i)}
            </ContactItem>
          )}
          {personal.phone && <ContactItem>{personal.phone}</ContactItem>}
        </View>
      </View>

      {/* Experience */}
      {experience.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.entry} wrap={false}>
              <EntryHeader
                title={safe(exp.position) || safe(exp.company)}
                right={joinDates(exp.startDate, exp.endDate)}
              />
              {exp.position && exp.company && (
                <Text style={styles.subtitle}>{safe(exp.company)}</Text>
              )}
              <BulletList lines={splitLines(exp.description)} />
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((proj, i) => (
            <View key={i} style={styles.entry} wrap={false}>
              <EntryHeader title={safe(proj.name)} right={proj.date} links={projectLinks(proj)} />
              <BulletList
                lines={splitLines(proj.description)}
                trailing={proj.techStack ? `**Tech Stack:** ${proj.techStack}` : undefined}
              />
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={styles.entry} wrap={false}>
              <EntryHeader
                title={safe(edu.school)}
                right={joinDates(edu.startDate, edu.graduationYear)}
              />
              <Text>
                {safe(edu.degree)}
                {edu.field ? ` in ${safe(edu.field)}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((cert, i) => (
            <View key={i} style={styles.entry} wrap={false}>
              <EntryHeader
                title={safe(cert.name)}
                right={cert.date}
                links={certificationLinks(cert)}
              />
              {cert.description && <Text>{cert.description}</Text>}
              <BulletList lines={cert.bullets || []} />
            </View>
          ))}
        </View>
      )}

      {/* Technical Skills */}
      {(skillCategories.length > 0 || skills.length > 0) && (
        <View>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {skillCategories.length > 0 ? (
            skillCategories.map((group, i) => (
              <Text key={i}>
                <Text style={styles.bold}>{group.category}:</Text> {(group.items || []).join(", ")}
              </Text>
            ))
          ) : (
            <Text>
              <Text style={styles.bold}>Skills:</Text> {skills.join(", ")}
            </Text>
          )}
        </View>
      )}
    </Page>
  )
}

// ── Building blocks ───────────────────────────────────────────────────────

function Icon({ name, size }: { name: keyof typeof ICONS; size: number }) {
  const { viewBox, d } = ICONS[name]
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)

  return (
    <Svg viewBox={viewBox} style={{ width: (size * vbWidth) / vbHeight, height: size }}>
      <Path d={d} fill="#000000" />
    </Svg>
  )
}

function ContactItem({
  icon,
  href,
  children,
}: {
  icon?: keyof typeof ICONS
  href?: string
  children: React.ReactNode
}) {
  return (
    <View style={styles.contactItem}>
      {icon && (
        <View style={{ marginRight: 4.25 }}>
          <Icon name={icon} size={8} />
        </View>
      )}
      {href ? (
        <Link src={href} style={{ color: "#000000", textDecoration: "none" }}>
          <Text>{children}</Text>
        </Link>
      ) : (
        <Text>{children}</Text>
      )}
    </View>
  )
}

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
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{title}</Text>
      <View style={styles.entryRight}>
        {(links || []).map((link, i) => (
          <Link key={i} src={link.url} style={styles.entryLink}>
            <View style={{ marginRight: 2.8 }}>
              <Icon name="link" size={7.5} />
            </View>
            <Text>{link.label}</Text>
          </Link>
        ))}
        {right ? <Text style={{ marginLeft: 6 }}>{right}</Text> : null}
      </View>
    </View>
  )
}

function BulletList({ lines, trailing }: { lines: string[]; trailing?: string }) {
  const items = trailing ? [...lines, trailing] : lines
  if (items.length === 0) return null

  return (
    <View style={styles.bulletList}>
      {items.map((line, i) => {
        const { label, text } = splitLabel(line)
        return (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>&bull;</Text>
            <Text style={styles.bulletText}>
              {label ? <Text style={styles.bold}>{label} </Text> : null}
              {text}
            </Text>
          </View>
        )
      })}
    </View>
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
