export const profile = {
  name: "Mahadi Hasan Tanmay",
  location: "Dhaka, Bangladesh",
  email: "mahadihasantanmay.2002@gmail.com",
  phone: "+880 1708 081599",
  github: "https://github.com/mahadi2002",
  githubHandle: "github.com/mahadi2002",
  linkedin: "https://linkedin.com/in/mahadi-hasan-tanmay-b5657528a",
  linkedinHandle: "linkedin.com/in/mahadi-hasan-tanmay",
  resumeUrl: "/Mahadi_Hasan_Tanmay_CV.pdf",
};

export const education = {
  degree: "B.Sc. in Computer Science and Engineering",
  school: "United International University, Dhaka",
  period: "Fall 2022 - Expected Summer 2027",
  gpa: "CGPA 3.53 / 4.00",
  notes: "Merit scholarships (Spring 2026, Spring 2023) - academic waivers (Summer 2023, Spring 2023, Fall 2022)",
};

export const research = {
  title: "Agentic AI Security in Industrial Automation and Cyber-Physical Systems",
  role: "Undergraduate Thesis, in progress",
  supervisor: "Azizur Rahman Anik, Lecturer, Department of CSE, UIU",
  points: [
    "Investigating how autonomous agentic AI deployed for predictive maintenance and smart-grid control introduces physically consequential attack surfaces, including data poisoning, prompt injection, and adversarial manipulation.",
    "Empirically evaluating production agentic frameworks against a defined set of industrial attack scenarios to identify where current defenses fail.",
    "Addresses a gap between LLM/agent security research, which rarely covers industrial control systems, and ICS anomaly detection, which rarely assumes an adversarial or agentic threat model.",
  ],
  footnote: "Final Year Design Project (FYDP I-III) forms the applied three-trimester track of this thesis. FYDP-I is in progress.",
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
  image?: string;
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
    stack: ["React 19", "FastAPI", "MongoDB", "JWT"],
    points: [
      "Full-stack outpatient token and queue system with four roles (guest, patient, doctor, admin), around 35 REST endpoints across 9 routers, and 9 MongoDB collections.",
      "Queue limits, no-show timeouts, and role permissions enforced server-side rather than in the UI, with JWT authentication, bcrypt hashing, and account-status revalidation on every request.",
    ],
    link: { label: "View source", href: "https://github.com/mahadi2002/smart-hospital-queue-management-system" },
    image: "/repo-cards/hospital-queue.png",
    size: "lg",
    accent: "amber",
  },
  {
    slug: "portfolio-website",
    name: "Personal Portfolio Website",
    tagline: "This site: a dark, motion-aware developer portfolio built from scratch",
    period: "Solo - 2026",
    role: "Solo build",
    stack: ["React 19", "Vite", "Tailwind CSS v4", "Motion", "TypeScript"],
    points: [
      "Custom dark-mode site with a procedural canvas node-graph hero, an asymmetric project grid, and a mailto-based contact form that needs no backend.",
      "Content lives in a single typed data file for fast, low-risk edits, deployed via GitHub-connected CI on Vercel.",
    ],
    link: { label: "View source", href: "https://github.com/mahadi2002/mahadi-portfolio" },
    size: "lg",
    accent: "zinc",
  },
  {
    slug: "neuroverse",
    name: "NeuroVerse",
    tagline: "AI-integrated student wellness platform with crisis-aware peer support",
    period: "Team of 5 - Spring 2026",
    role: "Backend coordinator & tester",
    stack: ["Node.js", "Express", "FastAPI", "MongoDB", "Llama 3.3"],
    points: [
      "Owned the authentication and anonymous peer-forum modules across a Node.js/Express and FastAPI hybrid architecture on MongoDB.",
      "Integrated a FastAPI ML service performing sentiment and crisis analysis via Llama-3.3-70B (Groq), with SentenceTransformer embeddings and NetworkX similarity graphs for content recommendation.",
    ],
    link: { label: "View live", href: "https://neuro-link-rouge.vercel.app" },
    sourceLink: { label: "View source", href: "https://github.com/mahadi2002/NeuroVerse" },
    image: "/repo-cards/neuroverse.png",
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
  stack: string[];
};

export const productSeries = {
  intro:
    "Five consumer apps for Bangla-speaking users, each PHP 8.2 with no Composer dependency and billed through Robi/Airtel OTP micro-subscription. Private repositories, in active development.",
  products: [
    {
      slug: "dinsathi",
      name: "DinSathi",
      nameBn: "দিনসাথী",
      tagline: "Daily planner with recurring to-dos, list and tag organisation, a habit tracker with streaks, a focus timer, and a daily review.",
      stack: ["PHP 8.2", "JavaScript", "CSS"],
    },
    {
      slug: "pustisathi",
      name: "PustiSathi",
      nameBn: "পুষ্টিসাথী",
      tagline: "Nutrition and diet planning by body profile, budget, region, and health conditions, plus a free BMI and food-search tier.",
      stack: ["PHP 8.2", "JavaScript", "CSS"],
    },
    {
      slug: "ielts-master-bd",
      name: "IELTS Master BD",
      nameBn: "শব্দ সোপান",
      tagline: "Daily-goal IELTS vocabulary trainer using SM-2 spaced repetition, streaks, and exclusive-word rewards.",
      stack: ["PHP 8.2 MVC", "JavaScript", "CSS"],
    },
    {
      slug: "bytewise",
      name: "Bytewise",
      nameBn: "বাইটওয়াইজ",
      tagline: "Interactive programming education platform, the fifth release in this product series.",
      stack: ["PHP", "JavaScript", "CSS"],
    },
    {
      slug: "gardenbondhu",
      name: "GardenBondhu",
      nameBn: "বাগানবন্ধু",
      tagline: "Gardening guidance for first-time Bangla-speaking gardeners, built with zero external dependencies.",
      stack: ["PHP 8.2"],
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
