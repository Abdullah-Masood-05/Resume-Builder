// import React from "react";
// import type { ResumeData } from "@/lib/resume";
// import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

// export interface BestPdfTemplateProps {
//   data: ResumeData;
// }

// export function BestHtmlTemplate({ data }: BestPdfTemplateProps) {
//   const safe = (t?: string) => t || "";

//   return (
//     <div className="p-8 bg-white text-black font-serif w-[210mm] min-h-[297mm] mx-auto text-[10pt] leading-relaxed">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-[25pt] font-bold mb-2 leading-none">{safe(data.personal?.fullName)}</h1>
//         <div className="flex justify-center items-center gap-4 text-sm mt-2">
//           {data.personal?.email && (
//             <span className="flex items-center gap-1.5">
//               <FiMail className="text-[10pt]" /> {data.personal.email}
//             </span>
//           )}
//           {data.personal?.phone && (
//             <span className="flex items-center gap-1.5">
//                <FiPhone className="text-[10pt]" /> {data.personal.phone}
//             </span>
//           )}
//           {data.personal?.location && (
//             <span className="flex items-center gap-1.5">
//                <FiMapPin className="text-[10pt]" /> {data.personal.location}
//             </span>
//           )}
//         </div>
//         {data.personal?.summary && (
//           <p className="mt-4 text-left">{data.personal.summary}</p>
//         )}
//       </div>

//       {/* Experience */}
//       {Array.isArray(data.experience) && data.experience.length > 0 && (
//         <section className="mb-5">
//           <h2 className="text-lg font-bold border-b border-black mb-3 pb-0.5 uppercase tracking-wide">Experience</h2>
//           {data.experience.map((exp, i) => (
//             <div key={i} className="mb-4">
//               <div className="flex justify-between font-bold text-[11pt]">
//                 <span>{safe(exp.company)}</span>
//                 <span>{safe(exp.startDate)} – {safe(exp.endDate)}</span>
//               </div>
//               <div className="italic text-[10.5pt] mb-1">{safe(exp.position)}</div>
//               <ul className="list-disc mt-1 space-y-1 pl-4 ml-1">
//                 {safe(exp.description).split('\n').map((line, j) => (
//                   line.trim() && <li key={j} className="pl-1">{line.trim()}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Education */}
//       {Array.isArray(data.education) && data.education.length > 0 && (
//         <section className="mb-5">
//           <h2 className="text-lg font-bold border-b border-black mb-3 pb-0.5 uppercase tracking-wide">Education</h2>
//           {data.education.map((edu, i) => (
//             <div key={i} className="mb-3">
//               <div className="flex justify-between font-bold text-[11pt]">
//                 <span>{safe(edu.school)}</span>
//                 <span>{safe(edu.graduationYear)}</span>
//               </div>
//               <ul className="list-disc mt-1 space-y-1 pl-4 ml-1">
//                 <li className="pl-1">
//                   {safe(edu.degree)} {safe(edu.field) && `in ${safe(edu.field)}`}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Skills */}
//       {Array.isArray(data.skills) && data.skills.length > 0 && (
//         <section className="mb-5">
//           <h2 className="text-lg font-bold border-b border-black mb-3 pb-0.5 uppercase tracking-wide">Technical Skills</h2>
//           <div className="text-[10.5pt]">
//             <strong>Skills: </strong> {data.skills.join(', ')}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }



import React from "react";
import type { ResumeData } from "@/lib/resume";
import { FiMail, FiLinkedin, FiGithub, FiLink } from "react-icons/fi";

export interface BestHtmlTemplateProps {
  data: ResumeData;
}

export function BestHtmlTemplate({ data }: BestHtmlTemplateProps) {
  const safe = (t?: string) => t || "";

  const experienceItems = (data.experience || []).filter(Boolean);
  const educationItems = (data.education || []).filter(Boolean);
  const skillsItems = (data.skills || []).filter(Boolean);
  const personal = data.personal as any;
  const certifications = (data as any).certifications || [];
  const projects = (data as any).projects || [];

  return (
    <div
      className="bg-white text-black w-[210mm] min-h-[297mm] mx-auto"
      style={{
        fontFamily: "'Charter', 'Bitstream Charter', 'Sitka Text', 'Cambria', Georgia, serif",
        fontSize: "10pt",
        lineHeight: "1.4",
        padding: "2cm",
        color: "#000000",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: "16pt" }}>
        <div style={{ fontSize: "25pt", lineHeight: "1", marginBottom: "5pt", fontWeight: "normal" }}>
          {safe(data.personal?.fullName)}
        </div>
        <div style={{ fontSize: "10pt", lineHeight: "1.5" }}>
          {data.personal?.email && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
              <FiMail size={10} />
              {" "}
              <a href={`mailto:${data.personal.email}`} style={{ color: "#000", textDecoration: "none" }}>
                {data.personal.email}
              </a>
            </span>
          )}
          {personal?.linkedin && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginLeft: "1em" }}>
              <FiLinkedin size={10} />
              {" "}
              <a href={personal.linkedin} style={{ color: "#000", textDecoration: "none" }}>
                {personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, "")}
              </a>
            </span>
          )}
          {personal?.github && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginLeft: "1em" }}>
              <FiGithub size={10} />
              {" "}
              <a href={personal.github} style={{ color: "#000", textDecoration: "none" }}>
                {personal.github.replace(/https?:\/\/(www\.)?github\.com\//i, "")}
              </a>
            </span>
          )}
        </div>
      </div>

      {/* ── EDUCATION ── */}
      {educationItems.length > 0 && (
        <section style={{ marginTop: "0" }}>
          <SectionTitle>Education</SectionTitle>
          {educationItems.map((edu, i) => (
            <div key={i} style={{ marginBottom: "12pt" }}>
              <EntryHeader 
                left={safe(edu.school)} 
                right={safe(edu.graduationYear)} 
              />
              <BulletList>
                <BulletItem>
                  {safe(edu.degree)}{safe(edu.field) ? ` in ${safe(edu.field)}` : ""}
                </BulletItem>
                {(edu as any).coursework && (
                  <BulletItem>
                    <strong>Coursework:</strong> {(edu as any).coursework}
                  </BulletItem>
                )}
              </BulletList>
            </div>
          ))}
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <section style={{ marginTop: "4pt" }}>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert: any, i: number) => (
            <div key={i} style={{ marginBottom: "8pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <strong style={{ fontSize: "10pt" }}>{safe(cert.name)}</strong>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8pt", fontSize: "10pt", whiteSpace: "nowrap" }}>
                  {cert.url && (
                    <a href={cert.url} style={{ color: "#000", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                      <FiLink size={9} /> Certificate
                    </a>
                  )}
                  <span style={{ marginLeft: "1em" }}>{safe(cert.date)}</span>
                </span>
              </div>
              <BulletList>
                {(cert.bullets || []).map((b: string, j: number) => (
                  <BulletItem key={j}>{b}</BulletItem>
                ))}
              </BulletList>
            </div>
          ))}
        </section>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {skillsItems.length > 0 && (
        <section style={{ marginTop: "4pt" }}>
          <SectionTitle>Technical Skills</SectionTitle>
          {typeof skillsItems[0] === "string" ? (
            <div style={{ fontSize: "10pt", marginBottom: "4pt" }}>
              <strong>Skills: </strong>{skillsItems.join(", ")}
            </div>
          ) : (
            (skillsItems as any[]).map((s: any, i: number) => (
              <div key={i} style={{ fontSize: "10pt", marginBottom: "4pt" }}>
                <strong>{s.category}: </strong>{Array.isArray(s.items) ? s.items.join(", ") : s.items}
              </div>
            ))
          )}
        </section>
      )}

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <section style={{ marginTop: "4pt" }}>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj: any, i: number) => (
            <div key={i} style={{ marginBottom: "10pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <strong style={{ fontSize: "10pt" }}>{safe(proj.name)}</strong>
                {proj.url && (
                  <a href={proj.url} style={{ color: "#000", textDecoration: "none", fontSize: "10pt", display: "inline-flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>
                    <FiLink size={9} /> {proj.urlLabel || "Link"}
                  </a>
                )}
              </div>
              <BulletList>
                {safe(proj.description)
                  .split("\n")
                  .map((l: string) => l.trim())
                  .filter(Boolean)
                  .map((line: string, j: number) => (
                    <BulletItem key={j}>{line}</BulletItem>
                  ))}
              </BulletList>
            </div>
          ))}
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experienceItems.length > 0 && (
        <section style={{ marginTop: "4pt" }}>
          <SectionTitle>Experience</SectionTitle>
          {experienceItems.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10pt" }}>
              <EntryHeader
                left={safe(exp.company)}
                right={`${safe(exp.startDate)}${exp.endDate ? ` – ${safe(exp.endDate)}` : ""}`}
              />
              {exp.position && (
                <div style={{ fontStyle: "italic", fontSize: "10pt", marginBottom: "2pt" }}>
                  {safe(exp.position)}
                </div>
              )}
              <BulletList>
                {safe(exp.description)
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean)
                  .map((line, j) => (
                    <BulletItem key={j}>{line}</BulletItem>
                  ))}
              </BulletList>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "12pt",
        fontWeight: "bold",
        textTransform: "none",
        borderBottom: "1px solid #000000",
        paddingBottom: "2pt",
        marginBottom: "6pt",
        letterSpacing: "0",
      }}
    >
      {children}
    </div>
  );
}

function EntryHeader({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <strong style={{ fontSize: "10pt" }}>{left}</strong>
      <span style={{ fontSize: "10pt", whiteSpace: "nowrap" }}>{right}</span>
    </div>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ listStyle: "none", margin: "2pt 0 0 0", padding: "0 0 0 0" }}>
      {children}
    </ul>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "2pt", fontSize: "10pt" }}>
      <span style={{ minWidth: "12pt", userSelect: "none" }}>•</span>
      <span style={{ flex: 1 }}>{children}</span>
    </li>
  );
}