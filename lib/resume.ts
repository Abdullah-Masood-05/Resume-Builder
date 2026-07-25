export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  /** Full LinkedIn profile URL, e.g. https://www.linkedin.com/in/jane-doe */
  linkedin?: string;
  /** Full GitHub profile URL, e.g. https://github.com/jane-doe */
  github?: string;
  /** Personal site / portfolio URL */
  website?: string;
}

/** A labelled hyperlink rendered next to an entry title. */
export interface ResumeLink {
  label: string;
  url: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
  /** Optional start date so a range ("Sept 2022 – Present") can be shown. */
  startDate?: string;
}

export type Skill = string;

export interface Project {
  name: string;
  description: string;
  url?: string;
  urlLabel?: string;
  /** Several labelled links (e.g. Frontend Repo / Backend Repo) shown right-aligned. */
  links?: ResumeLink[];
  /** Right-aligned date or range, used when a project has no links. */
  date?: string;
  /** Rendered as a final bullet prefixed with a bold "Tech Stack:" label. */
  techStack?: string;
}

export interface Certification {
  name: string;
  date: string;
  url?: string;
  /** Link text for `url` (e.g. "Coursera"). Defaults to "Certificate". */
  urlLabel?: string;
  /** Single unbulleted line shown under the certification title. */
  description?: string;
  bullets?: string[];
}

/** Skills grouped under bold category labels (e.g. "Languages: Python, C, ..."). */
export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  /** Optional grouped view of `skills`; templates fall back to `skills` when absent. */
  skillCategories?: SkillCategory[];
  projects?: Project[];
  certifications?: Certification[];
}
