import { Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ResumeData } from "@/lib/resume";

export interface BestPdfTemplateProps {
  data: ResumeData;
}

Matches LaTeX: 10pt base, charter-like serif, 2cm margins, letter paper
const styles = StyleSheet.create({
  page: {
    paddingTop: 56,       // ~2cm
    paddingBottom: 56,
    paddingLeft: 56,
    paddingRight: 56,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    color: '#000000',
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },

  // ── Header (centered, like \begin{center}) ──────────────────────────────
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerName: {
    fontSize: 25,
    fontFamily: 'Times-Bold',
    marginBottom: 5,
  },
  headerContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    fontSize: 10,
  },
  headerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  headerSeparator: {
    fontSize: 10,
    color: '#444444',
  },

  // ── Section (matches \section with \titlerule) ───────────────────────────
  section: {
    marginTop: 12,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  // ── Entry block (e.g. Education, Experience item) ───────────────────────
  entryBlock: {
    marginBottom: 8,
  },
  // Row with bold left title and bold right date (\textbf{...} \hfill \textbf{...})
  entryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    flex: 1,
  },
  entryDate: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    textAlign: 'right',
  },
  // Italic subtitle (position/role)
  entrySubtitle: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    marginBottom: 2,
  },

  // ── Bullet list (matches \begin{itemize}[left=0pt]) ─────────────────────
  bulletList: {
    marginTop: 2,
    paddingLeft: 0,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 0,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  bulletBold: {
    fontFamily: 'Times-Bold',
  },

  // ── Technical Skills (bold category + plain list) ────────────────────────
  skillRow: {
    flexDirection: 'row',
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  skillCategory: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
  },
  skillValue: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    flex: 1,
    flexWrap: 'wrap',
  },

  // ── Certifications ────────────────────────────────────────────────────────
  certHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  certTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  certLink: {
    fontSize: 10,
    color: '#000000',
    textDecoration: 'underline',
  },
});

Helper: bullet item
function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

Helper: split description lines into bullets
function DescriptionBullets({ description }: { description?: string }) {
  if (!description) return null;
  const lines = description.split('\n').map(l => l.trim()).filter(Boolean);
  return (
    <View style={styles.bulletList}>
      {lines.map((line, i) => (
        <BulletItem key={i}>{line}</BulletItem>
      ))}
    </View>
  );
}

export function BestPdfTemplate({ data }: BestPdfTemplateProps) {
  const safeText = (text?: string) => text || '';

  const experienceItems = (data.experience || []).filter(Boolean);
  const educationItems = (data.education || []).filter(Boolean);
  const skillsItems = (data.skills || []).filter(Boolean);

  return (
    <Page size="LETTER" style={styles.page}>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerName}>{safeText(data.personal.fullName)}</Text>
        <View style={styles.headerContact}>
          {data.personal.email && (
            <View style={styles.headerContactItem}>
              {/* ✉ icon substitute using unicode */}
              <Text>✉</Text>
              <Text>{safeText(data.personal.email)}</Text>
            </View>
          )}
          {data.personal.phone && (
            <>
              <Text style={styles.headerSeparator}>  </Text>
              <View style={styles.headerContactItem}>
                <Text>☎</Text>
                <Text>{safeText(data.personal.phone)}</Text>
              </View>
            </>
          )}
          {data.personal.location && (
            <>
              <Text style={styles.headerSeparator}>  </Text>
              <View style={styles.headerContactItem}>
                <Text>{safeText(data.personal.location)}</Text>
              </View>
            </>
          )}
          {(data.personal as any).linkedin && (
            <>
              <Text style={styles.headerSeparator}>  </Text>
              <View style={styles.headerContactItem}>
                <Text>in</Text>
                <Text>{safeText((data.personal as any).linkedin)}</Text>
              </View>
            </>
          )}
          {(data.personal as any).github && (
            <>
              <Text style={styles.headerSeparator}>  </Text>
              <View style={styles.headerContactItem}>
                <Text>{safeText((data.personal as any).github)}</Text>
              </View>
            </>
          )}
        </View>
        {/* Summary (if present) — left-aligned below contact, like LaTeX personal statement */}
        {data.personal.summary && (
          <Text style={{ fontSize: 10, marginTop: 6, textAlign: 'left', alignSelf: 'flex-start' }}>
            {safeText(data.personal.summary)}
          </Text>
        )}
      </View>

      {/* ── EDUCATION ────────────────────────────────────────────────── */}
      {educationItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {educationItems.map((edu, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryHeaderRow}>
                <Text style={styles.entryTitle}>{safeText(edu.school)}</Text>
                <Text style={styles.entryDate}>{safeText(edu.graduationYear)}</Text>
              </View>
              <View style={styles.bulletList}>
                <BulletItem>
                  {safeText(edu.degree)}{safeText(edu.field) ? ` in ${safeText(edu.field)}` : ''}
                </BulletItem>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
      {experienceItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experienceItems.map((exp, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryHeaderRow}>
                <Text style={styles.entryTitle}>{safeText(exp.company)}</Text>
                <Text style={styles.entryDate}>
                  {safeText(exp.startDate)}{exp.endDate ? ` – ${safeText(exp.endDate)}` : ''}
                </Text>
              </View>
              {exp.position && (
                <Text style={styles.entrySubtitle}>{safeText(exp.position)}</Text>
              )}
              <DescriptionBullets description={exp.description} />
            </View>
          ))}
        </View>
      )}

      {/* ── TECHNICAL SKILLS ─────────────────────────────────────────── */}
      {skillsItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillRow}>
            <Text style={styles.skillCategory}>Skills: </Text>
            <Text style={styles.skillValue}>{skillsItems.join(', ')}</Text>
          </View>
        </View>
      )}

    </Page>
  );
}




