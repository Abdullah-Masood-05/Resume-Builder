export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Remote";
    salary: string;
    description: string;
    requirements: string[];
    postedDate: string;
    recruiterId: string;
    recruiterName: string;
    applicationsCount: number;
}

export interface Application {
    id: string;
    jobId: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    resumeUrl?: string;
    coverLetter: string;
    appliedDate: string;
    status: "pending" | "reviewed" | "shortlisted" | "rejected";
}

// Job Service
export const jobService = {
    getAll: (): Job[] => {
        const jobs = localStorage.getItem("jobs");
        return jobs ? JSON.parse(jobs) : [];
    },

    getById: (id: string): Job | null => {
        const jobs = jobService.getAll();
        return jobs.find((job) => job.id === id) || null;
    },

    getByRecruiterId: (recruiterId: string): Job[] => {
        const jobs = jobService.getAll();
        return jobs.filter((job) => job.recruiterId === recruiterId);
    },

    create: (job: Omit<Job, "id" | "postedDate" | "applicationsCount">): Job => {
        const jobs = jobService.getAll();
        const newJob: Job = {
            ...job,
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            postedDate: new Date().toISOString(),
            applicationsCount: 0,
        };
        jobs.push(newJob);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        return newJob;
    },

    update: (id: string, updates: Partial<Job>): Job | null => {
        const jobs = jobService.getAll();
        const index = jobs.findIndex((job) => job.id === id);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...updates };
            localStorage.setItem("jobs", JSON.stringify(jobs));
            return jobs[index];
        }
        return null;
    },

    delete: (id: string): boolean => {
        const jobs = jobService.getAll();
        const filtered = jobs.filter((job) => job.id !== id);
        if (filtered.length !== jobs.length) {
            localStorage.setItem("jobs", JSON.stringify(filtered));
            return true;
        }
        return false;
    },

    search: (query: string): Job[] => {
        const jobs = jobService.getAll();
        const lowercaseQuery = query.toLowerCase();
        return jobs.filter(
            (job) =>
                job.title.toLowerCase().includes(lowercaseQuery) ||
                job.company.toLowerCase().includes(lowercaseQuery) ||
                job.location.toLowerCase().includes(lowercaseQuery)
        );
    },
};

// Application Service
export const applicationService = {
    getAll: (): Application[] => {
        const applications = localStorage.getItem("applications");
        return applications ? JSON.parse(applications) : [];
    },

    getById: (id: string): Application | null => {
        const applications = applicationService.getAll();
        return applications.find((app) => app.id === id) || null;
    },

    getByJobId: (jobId: string): Application[] => {
        const applications = applicationService.getAll();
        return applications.filter((app) => app.jobId === jobId);
    },

    getByCandidateId: (candidateId: string): Application[] => {
        const applications = applicationService.getAll();
        return applications.filter((app) => app.candidateId === candidateId);
    },

    create: (application: Omit<Application, "id" | "appliedDate" | "status">): Application => {
        const applications = applicationService.getAll();

        // Check if already applied
        const alreadyApplied = applications.some(
            (app) => app.jobId === application.jobId && app.candidateId === application.candidateId
        );

        if (alreadyApplied) {
            throw new Error("Already applied to this job");
        }

        const newApplication: Application = {
            ...application,
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            appliedDate: new Date().toISOString(),
            status: "pending",
        };

        applications.push(newApplication);
        localStorage.setItem("applications", JSON.stringify(applications));

        // Update job applications count
        const job = jobService.getById(application.jobId);
        if (job) {
            jobService.update(application.jobId, {
                applicationsCount: (job.applicationsCount || 0) + 1,
            });
        }

        return newApplication;
    },

    updateStatus: (id: string, status: Application["status"]): Application | null => {
        const applications = applicationService.getAll();
        const index = applications.findIndex((app) => app.id === id);
        if (index !== -1) {
            applications[index].status = status;
            localStorage.setItem("applications", JSON.stringify(applications));
            return applications[index];
        }
        return null;
    },

    delete: (id: string): boolean => {
        const applications = applicationService.getAll();
        const filtered = applications.filter((app) => app.id !== id);
        if (filtered.length !== applications.length) {
            localStorage.setItem("applications", JSON.stringify(filtered));
            return true;
        }
        return false;
    },

    hasApplied: (jobId: string, candidateId: string): boolean => {
        const applications = applicationService.getAll();
        return applications.some(
            (app) => app.jobId === jobId && app.candidateId === candidateId
        );
    },
};

// Initialize with sample data if empty
export const initializeSampleData = () => {
    const jobs = jobService.getAll();

    // Check for duplicate IDs (fix for existing bad data)
    const jobIds = jobs.map(j => j.id);
    const hasDuplicates = new Set(jobIds).size !== jobIds.length;

    if (jobs.length === 0 || hasDuplicates) {
        // Clear bad data if duplicates exist
        if (hasDuplicates) {
            localStorage.removeItem("jobs");
            localStorage.removeItem("applications");
        }

        const sampleJobs: Omit<Job, "id" | "postedDate" | "applicationsCount">[] = [
            {
                title: "Senior Frontend Developer",
                company: "Tech Innovations Inc",
                location: "San Francisco, CA",
                type: "Full-time",
                salary: "$120k - $160k",
                description: "We're looking for an experienced frontend developer to join our team and build cutting-edge web applications.",
                requirements: [
                    "5+ years of React experience",
                    "Strong TypeScript skills",
                    "Experience with Next.js",
                    "Good understanding of UI/UX principles",
                ],
                recruiterId: "sample-recruiter-1",
                recruiterName: "Sample Recruiter",
            },
            {
                title: "Full Stack Engineer",
                company: "StartUp XYZ",
                location: "Remote",
                type: "Remote",
                salary: "$100k - $140k",
                description: "Join our fast-growing startup and help build products that millions will use.",
                requirements: [
                    "3+ years full stack development",
                    "Node.js and React expertise",
                    "Database design experience",
                    "Startup mentality",
                ],
                recruiterId: "sample-recruiter-1",
                recruiterName: "Sample Recruiter",
            },
            {
                title: "UX/UI Designer",
                company: "Creative Agency",
                location: "New York, NY",
                type: "Full-time",
                salary: "$80k - $110k",
                description: "Create beautiful and intuitive user experiences for our diverse client base.",
                requirements: [
                    "Portfolio showcasing UI/UX work",
                    "Figma proficiency",
                    "Understanding of design systems",
                    "Excellent communication skills",
                ],
                recruiterId: "sample-recruiter-1",
                recruiterName: "Sample Recruiter",
            },
        ];

        sampleJobs.forEach((job) => jobService.create(job));
    }
};
