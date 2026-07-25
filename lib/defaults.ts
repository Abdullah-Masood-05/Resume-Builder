import type { ResumeData } from "./resume"

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "Jane Alexandra Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://www.linkedin.com/in/jane-doe",
    github: "https://github.com/JaneDoe",
    website: "https://jane-doe.vercel.app/",
    summary:
      "Experienced Full-Stack and Machine Learning Engineer with 5+ years of experience in building scalable web and AI-driven applications. Skilled in designing cloud-native architectures, optimizing ML models, and leading full-cycle development. Proficient in React, Node.js, and Python-based ML frameworks.",
  },
  experience: [
    {
      company: "Independent Contractor, Upwork",
      position: "Freelance Full-Stack Developer",
      startDate: "2025",
      endDate: "Present",
      description:
        "Delivered two production-grade SaaS platforms end-to-end for international clients, covering architecture, implementation, and deployment\nManaged full project lifecycle independently: requirement scoping, technical decision-making, iterative delivery, and client handoff",
    },
  ],
  education: [
    {
      school: "State University of Technology, Springfield",
      degree: "BS",
      field: "Computer Science",
      startDate: "Sept 2022",
      graduationYear: "Present",
    },
  ],
  projects: [
    {
      name: "TalentFlow — AI Recruitment Platform (Final Year Project)",
      date: "Sept 2025 – Present",
      description:
        "Built 4-stage hiring pipeline: semantic CV shortlisting, automated coding tests, AI voice interviews, live video\nRan local embedding inference via ONNX Runtime and offline text-to-speech for AI interviews\nBuilt multi-layer desktop proctoring: face/gaze/pose tracking, object detection, process scans, VM detection\nDesigned microservice architecture with hybrid relational + vector storage and isolated PDF generation service",
      techStack:
        "Django, Next.js, PostgreSQL, Qdrant, MiniLM (ONNX), Llama 3, MediaPipe, Judge0, LiveKit, Tauri (Rust)",
    },
    {
      name: "Rocket Landing Outcome Prediction",
      links: [
        { label: "GitHub", url: "https://github.com/JaneDoe/rocket-landing-prediction" },
        { label: "Demo", url: "https://rocket-landing-prediction.example.com" },
      ],
      description:
        "Built ML pipeline to predict booster landing success via API + web scraping; trained 4 classifiers with tuning\nConducted EDA with SQL queries, geospatial mapping, and statistical visualizations to find launch patterns\nDeveloped interactive dashboard for real-time launch data exploration and model result visualization",
      techStack: "Python, Pandas, Scikit-learn, Dash, Folium, BeautifulSoup, SQLite, Matplotlib, Seaborn",
    },
    {
      name: "VoltMart - E-Commerce Platform (Next.js, MongoDB, Firebase)",
      links: [
        { label: "Frontend Repo", url: "https://github.com/JaneDoe/voltmart-client" },
        { label: "Backend Repo", url: "https://github.com/JaneDoe/voltmart-server" },
      ],
      description:
        "Built scalable electronics marketplace with auth, role-based access, and admin dashboard for full store management\nIntegrated payment processing with card + COD support, coupon discounts, and order lifecycle status tracking\nDesigned secure backend: rate limiting, CSRF/injection middleware, and indexed database schemas for fast queries",
      techStack: "Next.js, Node.js, Express, MongoDB, Firebase Auth, Stripe, Helmet, React Context API",
    },
    {
      name: "Multimodal AI Product Intelligence Platform (FastAPI, CLIP, Qdrant, Groq)",
      links: [
        { label: "Backend Repo", url: "https://github.com/JaneDoe/product-intelligence-api" },
        { label: "Frontend Repo", url: "https://github.com/JaneDoe/product-intelligence-frontend" },
      ],
      description:
        "Built 5-agent pipeline: vision analysis, competitor research, persona simulation, pricing strategy, ad generation\nRan concurrent LLM calls for 5-channel ad copy generation, reducing total latency from ~15s to under 3s\nImplemented vector similarity search for competitor analysis and hybrid edge/cloud deployment architecture",
    },
    {
      name: "TaskForge (Project Management SaaS)",
      links: [
        { label: "Backend Repo", url: "https://github.com/JaneDoe/taskforge-api" },
        { label: "Frontend Repo", url: "https://github.com/JaneDoe/taskforge-web" },
      ],
      description:
        "Built multi-tenant Kanban platform featuring WebSocket sync, org isolation, RBAC, and Tauri desktop app\nImplemented optimistic drag-drop reordering, cursor-paginated activity logs, and background PDF export jobs\nDesigned secure auth with token rotation, brute-force lockout, presigned file uploads, and subscription billing",
      techStack: "Django, DRF, Next.js, PostgreSQL, Redis, Celery, Channels, Stripe, S3, Tauri (Rust)",
    },
  ],
  certifications: [
    {
      name: "Data Science Professional Certificate (12-course)",
      url: "https://coursera.org/verify/professional-cert/EXAMPLE123",
      urlLabel: "Coursera",
      date: "Feb 2025",
      description:
        "Covered full data science lifecycle: Python, SQL, analysis, visualization, ML, and applied capstone project",
    },
  ],
  skillCategories: [
    {
      category: "Languages",
      items: ["Python", "C", "C++", "C#", "Rust", "SQL", "JavaScript"],
    },
    {
      category: "Web & Backend",
      items: ["Django", "React", "Next.js", "Tauri", "Flask", "FastAPI", "PostgreSQL", "MongoDB", "MySQL", "Firebase"],
    },
    {
      category: "ML/AI & CV",
      items: ["PyTorch", "Sentence-BERT", "FaceAPI", "MediaPipe", "YOLOv8", "OpenCV", "Scikit-learn", "ONNX"],
    },
    {
      category: "Data Science",
      items: ["NumPy", "Pandas", "Seaborn", "Matplotlib", "Plotly", "Dash", "SpaCy", "Qdrant"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Git", "Jupyter Notebook", "Judge0"],
    },
  ],
  // Flat list kept for the templates that render skills as individual tags.
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Rust",
    "SQL",
    "React",
    "Next.js",
    "Django",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "PyTorch",
    "Scikit-learn",
    "OpenCV",
    "ONNX",
    "Pandas",
    "NumPy",
    "Docker",
    "Git",
    "AWS",
    "Celery",
    "System Design",
  ],
}
