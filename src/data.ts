import { Course, BlogPost, StudentProject } from "./types";

export const COURSES: Course[] = [
  {
    id: "course-1",
    title: "Web Development Mastery",
    category: "ICT",
    description: "Master full-stack development from basic HTML/CSS up to custom enterprise architectures using React, Node.js, and cloud ingress. Learn modern database integration and server deployment.",
    price: 499,
    duration: "12 Weeks",
    level: "Beginner",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdkp7FdT5k917mU5mxS8xbV0xAc3kLtlF-jAIH0fEtjle_3gRIHTUg3mwpWbmRz6eagDSPAPHjqd0-1G6KTFGq61dPvXGIJxP9g4xgtPQkl1MT87GcZ-F2ejhnXAUtfsGhxLyxJbqlpWDWaTRL7V6viOKmgN52r8EaDMVddmls9kgj1EIcxkt_DQRZJBcqCYI4YKUegSbObJ8pvR_I4MkPNONN9htb6_k24on2NPsy5SERN_QDMFuGdaD61Kq-E16dlpmFDsOaKZc",
    syllabus: [
      "Introduction to Semantic HTML5 & Modern CSS Grid/Flexbox",
      "JavaScript Core Syntax, Dynamic UI Manipulation, and Client Fetching",
      "Building Highly Interactive Components in React 18+ & Vite",
      "Express Server Setup, Secure RESTful APIs, and CORS Ingress",
      "Database Modeling: SQL, NoSQL schemas, and CRUD Operations",
      "Capstone Project: Multi-User Web Application Hosting & DevOps Deployment"
    ]
  },
  {
    id: "course-2",
    title: "Applied Artificial Intelligence",
    category: "AI",
    description: "Develop, review, and deploy custom artificial intelligence architectures. Build intelligent agents using Python, PyTorch, TensorFlow, and advanced Large Language Model interfaces.",
    price: 699,
    duration: "10 Weeks",
    level: "Intermediate",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVvJiVPiOPr5hKzSbKEluolqj8NqqfzgHZkPHY4ZLqp-sMew0RiXbkD7s1rRaIz20iOfv1oCEAw3wC01SRvEKF1M9oKuhpMwP7f_zGt9y2mBlbJ0L0yjyctDBU1G3nKxu_1aiVTglYaR4VFCNdVaeiFboiCAx6HKcyQbmj_q7_Y4HcyOzBniAfJD4lQX644aLp2gdbx1x7hvxF1W_az2dYin1MBHpAxm3MZFdWb2bK63ZrSd9Dp0PkIBbO2H57EhRF29CRnTn_3fo",
    syllabus: [
      "Foundational Python Programming for Scientific Computing",
      "Supervised vs Unsupervised Algorithms: Linear Regression to SVMs",
      "Deep Learning Core: Artificial Neural Interfaces and PyTorch Tensors",
      "Natural Language Modeling, Tokenization, and Attention Frameworks",
      "Prompt Engineering & API Core Integrations with Advanced LLMs like Gemini",
      "Building Custom Autonomous AI Agents with Retrieval-Augmented Generation (RAG)"
    ]
  },
  {
    id: "course-3",
    title: "Data Analysis & Visualization",
    category: "DATA",
    description: "Transform complex corporate data matrices into strategic blueprints. Acquire core competencies in database language querying, statistics modeling, and interactive reporting structures.",
    price: 450,
    duration: "8 Weeks",
    level: "Beginner",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfGN68BEyTYTF_7UIh-D10yZgNTUU3S6B3Z2tQAeGkB9YgCZmhlfsS0BtATvhaP8au2XCrEs9mLxFWj11p7M8IdOBkotos6914kOCFlOvXiHsgAZmHTOu47joPjeTxZW9L63bcJ9bX3BV3QnwLmVaEKRjUjwh8d6na3x0V8JF2w285xaQkwEd1QrVm77iYFAGe4-4Go5-yP49s6C4A1CVN-gE_c_okRktXohjyR0LLk_tDgR0UebsnoiEB772yaBYGnwvJzjBg_MU",
    syllabus: [
      "Relational Database Querying & SQL Join Matrix Optimization",
      "Data Manipulation with Python Pandas and Numerical NumPy",
      "Statistical Models: Probability, Distributions, and Hypotheses Testing",
      "Interactive Dashboards using Tableau and PowerBI Integrations",
      "Advanced Programmatic Charting with D3.js and Recharts",
      "Predictive Analytics & Executive Insight Reporting"
    ]
  },
  {
    id: "course-4",
    title: "UI/UX Design Professional",
    category: "DESIGN",
    description: "Design pixel-perfect, human-centric visual interfaces. Gain profound expertise in spacing hierarchies, typography rhythm, Figma prototype crafting, and design framework compliance.",
    price: 550,
    duration: "8 Weeks",
    level: "Advanced",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5otOBzJpxzYviqTrBnJ-IX13FLGysyK0nTKI7qNSwk531Z2Hqtq79iyUXC2pqIgn0gl31qJvtftoJ3cP76NmuxzPckXNscUoMngYLMbYpTC05LAtNsq3XHykBUC2jv1nBHNBcmQ1T48Qye5MIcvfpQ7W_nw2F-EUtwbdS_ugqEM5R2P1pVjFqP9_P-sSj68QYxaUGye2iN4L-0tkk608p0g3CWY5WIn5P-ejBhy35B9Sh9OgHMBBbM-97p11n9OeKu9x7x192yYE",
    syllabus: [
      "Human Psychology & Cognitive Load Design Rules",
      "Wireframing, Typography Pairings, and Color Schemes Theory",
      "Creating Multi-Screen Dynamic Libraries and Components in Figma",
      "High-Fidelity Prototyping, Micro-Animations, and Touch Targets",
      "Conducting Rigorous Usability Testing and Iterative Design Adjustments",
      "Developer Handoff Protocols: Tokens, Asset Exports, and Inspect Modes"
    ]
  },
  {
    id: "course-5",
    title: "Cloud Computing Architect",
    category: "ICT",
    description: "Architect secure, scalable, and resilient cloud infrastructures. Learn about serverless computing, container orchestration, container ingress protocols, and multi-region deployment strategies.",
    price: 599,
    duration: "10 Weeks",
    level: "Advanced",
    imgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    syllabus: [
      "Introduction to Infrastructure as Code with Terraform",
      "Mastering Docker Containers & Microservices Segmentation",
      "Kubernetes Deployment: Pods, Clusters, and Load Balancers",
      "Serverless Paradigms: Architecting REST Endpoints using AWS/GCP Lambdas",
      "Cloud Security Standards: OAuth, CORS, Ingress Control and Firewalls",
      "Automating Delivery Pipelines (CI/CD) and System Monitoring"
    ]
  },
  {
    id: "course-6",
    title: "Advanced NLP with Transformers",
    category: "AI",
    description: "Deep dive into model fine-tuning and retrieval mechanisms to power next-gen applications. Focuses heavily on transformer models, dense vector embeddings, vector databases, and semantic search queries.",
    price: 750,
    duration: "8 Weeks",
    level: "Advanced",
    imgUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200",
    syllabus: [
      "Self-Attention Mathematics and Transformer Block Architecture",
      "Pretrained Model Selection & Downstream Fine-Tuning Protocols",
      "Semantic Search via Large Vectors and Pinecone Similarity Matrices",
      "Integrating Complex Context Maps with the Gemini API",
      "Deployment Optimizations: Quantization, Distillation, and Pruning",
      "Real-world NLP Production Systems: Safety Guards and Bias Audit Filters"
    ]
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Co-Evolution of Modern Web Architectures and General Intelligence Agents",
    excerpt: "How server-side AI integrations are turning static interfaces into fluid, context-aware student companions.",
    content: `We are entering an era of unprecedented transition in human learning systems. For decades, software architectures were programmed under strict deductive specifications—buttons yielded predictable routes, forms went to deterministic database schemas, and pages rendered uniform static content.

Modern web engineering is merging with Artificial Intelligence. Applications built with frameworks like React, Node.js, and advanced cloud ingress now leverage the immediate integration of Large Language Models to deliver personalized real-time guidance. 

At Apostle Paul Academy, our curriculum focuses on the direct translation of user intent. An interface should dynamically model its state around the student. The study roadmaps we generate on-the-fly inside our student AI Center are prime examples. By sending precise metadata (such as your current background and professional goal) to models like Gemini, they generate structured, custom-tailored 4-week paths loaded with core competencies, target topics, and practical projects.

This changes education from a standardized monologue into an infinite, adaptive, contextual dialogue. Developers who master this pipeline—securing keys on Express servers, routing API queries safely, and designing beautiful viewport transitions—place themselves at the forefront of the technological elite.`,
    author: "Pastor Paul Babarinde",
    role: "Dean of Academic Excellence",
    date: "June 15, 2026",
    tag: "AI & Tech Integration",
    imgUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
  },
  {
    id: "blog-2",
    title: "Unlocking Pixel Excellence: Designing Context-Rich UI/UX for ICT Platforms",
    excerpt: "Rethinking web aesthetics around cognitive load constraints, responsive typography, and spatial breathing room.",
    content: `Great design is not simply about placing elements onto a canvas; it is about establishing a cognitive rhythm. For complex technological platforms, such as code sandboxes, learning portals, or data analytical boards, structural clarity is paramount.

A common developer anti-pattern is 'Tech-Larping' or 'AI-Slop'—decorating an interface with unrequested, simulated telemetry, logs, container port statuses, or network lights inside margins. Genuine visual craft values silence. High aesthetic quality comes from spacious margins, custom typography pairing, responsive layouts, and highly intentional micro-interactions.

When designing screens for Apostle Paul Academy, we use a distinct visual palette: deep primary blues (#00113a) to communicate security and prestige, contrasted with rich golden accents (#cca830) indicating elite quality. We pair "Montserrat" for display headers—giving authority to the course titles—with "Inter" for readable bodies. 

By utilizing Tailwind's flexible padding, custom touch target scopes of 44px, and smooth CSS keyframe entries, we create a calm digital environment where complex coding paradigms feel approachable. True craftsmanship respects user intent above all else.`,
    author: "Chioma Adebayo",
    role: "Lead Designer in Residence",
    date: "June 10, 2026",
    tag: "UI/UX & Design",
    imgUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200"
  },
  {
    id: "blog-3",
    title: "Server-Side Gemini Integration: Keeping Secret API Keys Out of the Browser Bundle",
    excerpt: "A technical guide on why React client-side keys are dangerous, and how to write clean Node.js proxy routes.",
    content: `Every developer has made the early mistake of importing an API key into a client-side config or a .env file prefixed with 'VITE_'. In Vite-based single-page applications, anything prefixing with 'VITE_' becomes hardcoded directly into the production JS bundles distributed to everyone's browser.

If you are using LLM engines, search groundings, or third-party payment systems (like Stripe or Google GenAI), exposure is dangerous. The client can examine the source map, extract the key, and consume your quota immediately.

The solution is a strict full-stack architecture. In this project, we utilize an Express server to proxy all AI inquiries. The client never loads '@google/genai' or has access to 'process.env.GEMINI_API_KEY'. Instead, it hits our endpoint /api/ai/chat or /api/ai/roadmap with standard fetch streams, and our server securely queries the Gemini API.

Additionally, to ensure resilience, we employ lazy initialization. If the key is omitted, the server boots up seamlessly and will only reject routes calling the API with clear errors, avoiding catastrophic dev crashes. This is how enterprise-grade scalable platforms are structured.`,
    author: "Dr. Kwame Boateng",
    role: "Director of Software Engineering",
    date: "May 28, 2026",
    tag: "Full-Stack Security",
    imgUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200"
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "proj-1",
    title: "NeuralTrade Predictive Core",
    student: "Alaba K.",
    description: "An advanced machine-learning database analyzer tracking high-frequency trading indices, visualizing real-time metrics with custom Recharts.",
    category: "AI & Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200"
  },
  {
    id: "proj-2",
    title: "ScribeFlow - AI Co-Authoring Canvas",
    student: "Amara M.",
    description: "A gorgeous collaborative content editor powered by server-side Gemini, enabling context-sensitive sentence expansion and design presets.",
    category: "Full-Stack ICT",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200"
  },
  {
    id: "proj-3",
    title: "Apex Logistics Route Optimizer",
    student: "Tariq O.",
    description: "An interactive mapping system designed with D3 and React, optimizing complex multi-stop delivery pathways based on actual real-time traffic grids.",
    category: "Data Systems",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Apostle Paul Academy completely transformed my technical understanding. I went from zero programming knowledge to designing custom AI-driven software pipelines. The mentors are top-tier industry veterans who guide you through genuine project metrics.",
    name: "Sandra Agboola",
    role: "Senior Full-Stack Engineer at Google Cloud",
    avatar: "/src/assets/images/sandra_agboo_1782151528874.jpg"
  },
  {
    quote: "The interactive AI Center at Apostle Paul Academy acts like a highly patient, elite level software engineering lead. It guided me through custom roadmap generations tailormade for my design goal in Figma and React core. Simply brilliant educational design.",
    name: "Farai Ndlovu",
    role: "AI Developer at Siemens Healthcare South Africa",
    avatar: "/src/assets/images/farai_ndlovu_1782151497532.jpg"
  },
  {
    quote: "Unlike other bootcamps focusing on mock projects, Apostle Paul Academy teaches you full-stack security, lazy server-side SDK configs, and database optimizations. Securing enterprise software has become second nature to me.",
    name: "Babajide Benson",
    role: "Chief Technical Architect at MTN Group Lagos",
    avatar: "/src/assets/images/babajide_ben_1782151512413.jpg"
  }
];
