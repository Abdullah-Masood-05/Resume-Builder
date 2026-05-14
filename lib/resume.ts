export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
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
}

export type Skill = string;

export interface Project {
  name: string;
  description: string;
  url?: string;
  urlLabel?: string;
}

export interface Certification {
  name: string;
  date: string;
  url?: string;
  bullets?: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
}