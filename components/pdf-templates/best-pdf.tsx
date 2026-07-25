import { Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { ResumeData } from "@/lib/resume";

export interface BestPdfTemplateProps {
  data: ResumeData;
}

// Register Times fonts with all variants
Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwjX7fm0.ttf', fontWeight: 400, fontStyle: 'normal' },
    { src: 'https://fonts.gstatic.com/s/tinos/v24/buEzpoGnedXvwjX0TtJuQ0g.ttf', fontWeight: 700, fontStyle: 'normal' },
    { src: 'https://fonts.gstatic.com/s/tinos/v24/buEypoGnedXvwjX3TtBPfg.ttf', fontWeight: 400, fontStyle: 'italic' },
    { src: 'https://fonts.gstatic.com/s/tinos/v24/buE_poGnedXvwjX_fttJOA.ttf', fontWeight: 700, fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: '2cm',
    fontSize: 10,
    fontFamily: 'Times-Roman',
    color: '#000000',
    lineHeight: 1.4,
  },
  // Header
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  name: {
    fontSize: 25,
    fontFamily: 'Times-Roman',
    marginBottom: 5,
  },
  contactRow: {
    fontSize: 10,
    textAlign: 'center',
  },
  // Sections
  section: {
    marginTop: 4,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    fontWeight: 700,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 6,
  },
  // Items
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    fontWeight: 700,
  },
  itemDate: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    whiteSpace: 'nowrap',
  },
  // Position (italic)
  position: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  // Bullet Lists
  bulletList: {
    marginTop: 2,
    marginBottom: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 0,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  // Skills
  skillsContainer: {
    marginBottom: 4,
  },
  skillsCategory: {
    fontFamily: 'Times-Roman',
    fontWeight: 700,
  },
  skillsText: {
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  // Links
  link: {
    color: '#000000',
    textDecoration: 'none',
    fontFamily: 'Times-Roman',
  },
});

export function BestPdfTemplate({ data }: BestPdfTemplateProps) {
  const safeText = (text?: string) => text || '';

  const experienceItems = (data.experience || []).filter(Boolean);
  const educationItems = (data.education || []).filter(Boolean);
  const skillsItems = (data.skills || []).filter(Boolean);
  const personal = data.personal as any;
  const certifications = (data as any).certifications || [];
  const projects = (data as any).projects || [];

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{safeText(data.personal.fullName)}</Text>
        <Text style={styles.contactRow}>
          {data.personal.email && (
            <Text>✉ {safeText(data.personal.email)}</Text>
          )}
          {personal?.linkedin && (
            <Text>    🔗 {safeText(personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, ''))}</Text>
          )}
          {personal?.github && (
            <Text>    ⌨ {safeText(personal.github.replace(/https?:\/\/(www\.)?github\.com\//i, ''))}</Text>
          )}
        </Text>
      </View>

      {/* Education */}
      {educationItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {educationItems.map((edu, i) => (
            <View key={i} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{safeText(edu.school)}</Text>
                <Text style={styles.itemDate}>
                  {safeText(edu.graduationYear)}
                </Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    {safeText(edu.degree)}{safeText(edu.field) ? ` in ${safeText(edu.field)}` : ''}
                  </Text>
                </View>
                {(edu as any).coursework && (
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      <Text style={styles.skillsCategory}>Coursework: </Text>
                      {(edu as any).coursework}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map((cert: any, i: number) => (
            <View key={i} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{safeText(cert.name)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {cert.url && (
                    <Text style={styles.link}>🔗 Certificate    </Text>
                  )}
                  <Text style={styles.itemDate}>{safeText(cert.date)}</Text>
                </View>
              </View>
              <View style={styles.bulletList}>
                {(cert.bullets || []).filter((b: string) => b.trim()).map((b: string, j: number) => (
                  <View key={j} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Technical Skills */}
      {skillsItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {typeof skillsItems[0] === 'string' ? (
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsText}>
                <Text style={styles.skillsCategory}>Skills: </Text>
                {skillsItems.join(', ')}
              </Text>
            </View>
          ) : (
            (skillsItems as any[]).map((s: any, i: number) => (
              <View key={i} style={styles.skillsContainer}>
                <Text style={styles.skillsText}>
                  <Text style={styles.skillsCategory}>{s.category}: </Text>
                  {Array.isArray(s.items) ? s.items.join(', ') : s.items}
                </Text>
              </View>
            ))
          )}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((proj: any, i: number) => (
            <View key={i} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{safeText(proj.name)}</Text>
                {proj.url && (
                  <Text style={styles.link}>🔗 {safeText(proj.urlLabel || 'Link')}</Text>
                )}
              </View>
              <View style={styles.bulletList}>
                {safeText(proj.description)
                  .split('\n')
                  .map((l: string) => l.trim())
                  .filter(Boolean)
                  .map((line: string, j: number) => (
                    <View key={j} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {experienceItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experienceItems.map((exp, i) => (
            <View key={i} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{safeText(exp.company)}</Text>
                <Text style={styles.itemDate}>
                  {safeText(exp.startDate)}{exp.endDate ? ` – ${safeText(exp.endDate)}` : ''}
                </Text>
              </View>
              {exp.position && (
                <Text style={styles.position}>
                  {safeText(exp.position)}
                </Text>
              )}
              <View style={styles.bulletList}>
                {safeText(exp.description)
                  .split('\n')
                  .map((l) => l.trim())
                  .filter(Boolean)
                  .map((line, j) => (
                    <View key={j} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  );
}