export const profile = {
  name: "Mahadi Hasan Tanmay",
  location: "Dhaka, Bangladesh",
  email: "mahadihasantanmay.2002@gmail.com",
  phone: "+880 1708 081599",
  github: "https://github.com/mahadi2002",
  githubHandle: "github.com/mahadi2002",
  linkedin: "https://linkedin.com/in/mahadi-hasan-tanmay-b5657528a",
  linkedinHandle: "linkedin.com/in/mahadi-hasan-tanmay",
};

export const education = {
  degree: "B.Sc. in Computer Science and Engineering",
  school: "United International University, Dhaka",
  period: "Fall 2022 - Expected Summer 2027",
  gpa: "CGPA 3.53 / 4.00",
  notes: "Merit scholarships (Spring 2026, Spring 2023) - academic waivers (Summer 2023, Spring 2023, Fall 2022)",
  earlier: [
    { level: "HSC 2020", school: "Bhola Government College (Science)", result: "GPA 5.00" },
    { level: "SSC 2018", school: "Bhola Abdur Rob High School and College (Science)", result: "GPA 4.61" },
  ],
};

export const certifications = ["Multiple professional courses completed through MyGP Academy"];

export const research = {
  title: "Agentic AI Security in Industrial Automation and Cyber-Physical Systems",
  role: "Undergraduate Thesis, in progress",
  supervisor: "Azizur Rahman Anik, Lecturer, Department of CSE, UIU",
  points: [
    "Investigating how autonomous agentic AI deployed for predictive maintenance and smart-grid control introduces physically consequential attack surfaces, including data poisoning, prompt injection, and adversarial manipulation.",
    "Empirically evaluating production agentic frameworks against a defined set of industrial attack scenarios to identify where current defenses fail.",
    "Addresses a gap between LLM/agent security research, which rarely covers industrial control systems, and ICS anomaly detection, which rarely assumes an adversarial or agentic threat model.",
  ],
  footnote: "The Final Year Design Project (FYDP I-III) is this thesis's capstone project: a three-trimester applied track that puts the research into a working implementation. FYDP-I is in progress.",
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  role: string;
  stack: string[];
  points: string[];
  link?: ProjectLink;
  sourceLink?: ProjectLink;
  size: "lg" | "md";
  accent: "amber" | "zinc" | "line";
};

export const projects: Project[] = [
  {
    slug: "hospital-queue",
    name: "Smart Hospital Queue Management System",
    tagline: "Outpatient token and queue system with server-enforced role permissions",
    period: "Solo - Summer 2026",
    role: "Solo build",
    stack: ["React 19", "React Router", "FastAPI", "MongoDB", "JWT", "Bootstrap 5"],
    points: [
      "Full-stack outpatient token and queue system with four roles (guest, patient, doctor, admin), around 35 REST endpoints across 9 routers, and 9 MongoDB collections.",
      "Three-tier design: the React client never touches the database directly, everything is fetched and written through the FastAPI layer, with four React Contexts (auth, directory, queue, notifications) holding client-side state and the queue view polling every 6 seconds for live position updates.",
      "Queue limits, no-show timeouts, and role permissions enforced server-side rather than in the UI, with JWT authentication and bcrypt-hashed passwords.",
    ],
    link: { label: "View source", href: "https://github.com/mahadi2002/smart-hospital-queue-management-system" },
    size: "lg",
    accent: "amber",
  },
  {
    slug: "neuroverse",
    name: "NeuroVerse",
    tagline: "AI-integrated student wellness platform with crisis-aware peer support",
    period: "Team of 5 - Spring 2026",
    role: "Backend coordinator & tester",
    stack: ["Node.js", "Express", "FastAPI", "MongoDB", "Llama 3.3", "NetworkX"],
    points: [
      "Owned the authentication and anonymous peer-forum modules across a Node.js/Express and FastAPI hybrid architecture on MongoDB, including auto-generated anonymous aliases and nested-comment reactions for the peer forum.",
      "Integrated a FastAPI ML service doing sentiment and crisis-keyword analysis via Llama-3.3-70B (Groq), an empathetic chatbot with crisis guardrails, a weekly log summarizer, and a DFS-based learning-path planner over a NetworkX similarity graph built from SentenceTransformer embeddings.",
    ],
    link: { label: "View live", href: "https://neuro-link-rouge.vercel.app" },
    sourceLink: { label: "View source", href: "https://github.com/mahadi2002/NeuroVerse" },
    size: "md",
    accent: "zinc",
  },
  {
    slug: "railway-hci",
    name: "Railway Passenger Information System",
    tagline: "User-centred HCI study of Bangladesh Railway passenger information",
    period: "Team lead, 6 members - Summer 2026",
    role: "Team lead",
    stack: ["Figma", "User research", "HCI"],
    points: [
      "Led a user-centred design study of Bangladesh Railway passenger information: designed the semi-structured interview protocol and ran interviews and non-participant observation with 20-25 participants at Dhaka Airport Railway Station.",
      "Produced the high-fidelity Figma prototype and authored the final report, covering live train tracking, announcement transcripts, seat visualisation, and a Bangla/English toggle.",
    ],
    size: "md",
    accent: "line",
  },
];

export type Product = {
  slug: string;
  name: string;
  nameBn: string;
  tagline: string;
  detail: string;
  stack: string[];
  link: ProjectLink;
};

export const productSeries = {
  intro:
    "Five free, Bangla-first web apps built in order on the same hand-rolled foundation: PHP 8.2 with zero Composer dependencies, a custom MVC (router, middleware, controllers, services, repositories), MySQL/MariaDB with database-backed sessions, and vanilla JS with no bundler. Each release reused and refined the architecture of the one before it.",
  products: [
    {
      slug: "gardenbondhu",
      name: "GardenBondhu",
      nameBn: "বাগানবন্ধু",
      tagline: "Gardening guidance for first-time Bangla-speaking gardeners.",
      detail: "Plant care guides, a leaf-symptom checker, and a personal garden log with watering and fertilizing reminders. First app in the series, and the one that set the architecture the other four reused.",
      stack: ["PHP 8.2", "MySQL", "Vanilla JS"],
      link: { label: "View source", href: "https://github.com/mahadi2002/gardenbondhu" },
    },
    {
      slug: "ielts-master-bd",
      name: "IELTS Master BD",
      nameBn: "শব্দ সোপান",
      tagline: "Daily-goal IELTS vocabulary trainer for Bangladeshi learners.",
      detail: "Spaced-repetition review, band-tagged word lists, quizzes, and a study calendar. Documented in depth: separate architecture, routes, database, security, and deployment docs.",
      stack: ["PHP 8.2 MVC", "MySQL", "Vanilla JS"],
      link: { label: "View source", href: "https://github.com/mahadi2002/ielts-master-bd" },
    },
    {
      slug: "pustisathi",
      name: "PustiSathi",
      nameBn: "পুষ্টিসাথী",
      tagline: "Nutrition and diet planning by body profile, budget, and region.",
      detail: "A free BMI and calorie estimate feeds a personalized diet plan, plus a patient-nutritionist matching and messaging loop. Its rule engine and diet-plan engine are the one part of the codebase written specifically for this domain rather than reused from the series.",
      stack: ["PHP 8.2", "MySQL", "Vanilla JS"],
      link: { label: "View source", href: "https://github.com/mahadi2002/pustisathi" },
    },
    {
      slug: "dinsathi",
      name: "DinSathi",
      nameBn: "দিনসাথী",
      tagline: "Daily planner with recurring to-dos and a habit tracker.",
      detail: "Tasks, lists and tags, a streak-based habit tracker, a focus timer, and a daily review, with a service worker for web push notifications.",
      stack: ["PHP 8.2", "MySQL", "Vanilla JS"],
      link: { label: "View source", href: "https://github.com/mahadi2002/dinsathi" },
    },
    {
      slug: "bytewise",
      name: "Bytewise",
      nameBn: "বাইটওয়াইজ",
      tagline: "Interactive programming education platform for beginners.",
      detail: "Structured tracks from C through Data Structures and Algorithms, inline quizzes, a skill tree, and online code execution. Fifth in the series, with 14 of 15 planned build phases verified end-to-end against a live database.",
      stack: ["PHP 8.2", "MySQL", "Vanilla JS"],
      link: { label: "View source", href: "https://github.com/mahadi2002/bytewise" },
    },
  ] satisfies Product[],
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "JavaScript", "Java", "C"] },
  {
    label: "Web",
    items: ["React", "Vite", "Node.js", "Express", "FastAPI", "REST API design", "JWT auth", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "AI / ML",
    items: ["scikit-learn", "Hugging Face Transformers", "SentenceTransformers", "Groq API (Llama 3.3)", "NetworkX", "PyTorch", "TensorFlow"],
  },
  { label: "Security & Networking", items: ["Wireshark", "Nmap", "Network protocol analysis"] },
  { label: "Data & Tools", items: ["MongoDB", "MySQL", "PostgreSQL", "Git", "Docker", "Linux", "Vercel", "Render", "Figma"] },
];

export const leadership = {
  org: "UIU Robotics Club",
  role: "Photography Team Member",
  period: "2023 - Present",
  point: "Documents club events and competitions, producing the visual record used in club communications.",
};

export const languages = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
