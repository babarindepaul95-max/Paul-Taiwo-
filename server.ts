import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

// Lazy-initialization of Gemini SDK to prevent startup crashes when the key is omitted
let genAiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!genAiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAiClient;
}

// Offline Fallbacks for complete API resilience
function getOfflineChatAnswer(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("pastor paul") || m.includes("dean") || m.includes("babarinde")) {
    return "Pastor Paul Babarinde is our Dean of Academic Excellence at Apostle Paul Academy. He is an industrial ICT architect with decades of experience structuring systems worldwide. He is dedicated to mentoring future technology leaders.";
  }
  if (m.includes("course") || m.includes("syllabus") || m.includes("fees") || m.includes("learn") || m.includes("cost") || m.includes("price")) {
    return "Apostle Paul Academy offers premium accredited modules starting from $499. Our core paths cover Full-Stack Web Development, Applied AI Systems, Data Engineering & Analytics, and Modern UI/UX. Flexible schedules are available for fast track learning!";
  }
  if (m.includes("book") || m.includes("room") || m.includes("seat") || m.includes("lab") || m.includes("reservation")) {
    return "You can reserve a high-end software development seat or counseling room instantly. Scroll down to the Academy Room Booking center to secure your workstation ticket!";
  }
  if (m.includes("contact") || m.includes("whatsapp") || m.includes("phone")) {
    return "Get in touch directly! We are available live on WhatsApp/Call at +234 806 224 4744, or visit us at Adebowale, Ondo Road, Akure, Ondo State, Nigeria.";
  }
  return "Welcome to the Apostle Paul Academy student center! Although the active cloud brain is currently processing heavy traffic, our physical campus system is perfectly online. We coordinate leading software paradigms at our state-of-the-art computer labs. How can I guide your admission track today?";
}

function getOfflineRoadmap(careerGoal: string, skillLevel: string) {
  return {
    careerPathTitle: `${careerGoal || "Software & AI Architect"} (${skillLevel || "Intermediate"} Track)`,
    summaryDescription: `A high-intensity, structured curriculum designed by the Apostle Paul Academy Dean of Academic Excellence to guide your career transition and technological mastery.`,
    estimatedHoursPerWeek: 15,
    weeks: [
      {
        weekNum: 1,
        title: "Foundations & High-Performance Paradigm",
        description: "Master modern multi-tiered application logic, full-featured routing protocols, and initial terminal constructs.",
        topics: ["Command Line Interfaces", "Semantic Versioning & Git", "Asynchronous Events & Event Loops"],
        project: {
          projectName: "Single-Tier Workspace Portfolio",
          projectDesc: "Build and containerize an asynchronous terminal registry using standard web architecture protocols."
        }
      },
      {
        weekNum: 2,
        title: "Advanced Data Systems & Server Logic",
        description: "Understand data flow orchestration, secure server endpoints, and relational querying architectures.",
        topics: ["RESTful API Endpoints", "Durable Database Storage", "JWT Security Handshakes"],
        project: {
          projectName: "Secure Backchannel Server",
          projectDesc: "Create an active endpoint controller with validation, schema migrations, and full CRUD capability."
        }
      },
      {
        weekNum: 3,
        title: "Applied Generative AI Integration",
        description: "Connect standard cloud-hosted neural interfaces to process queries, generate curriculums, and guide dynamic actions.",
        topics: ["Large Language Model SDKs", "Secure Credentials Handlers", "Context Window Management"],
        project: {
          projectName: "Interactive Academic Counsel Client",
          projectDesc: "Implement server-side prompt engineering architectures with graceful state fallbacks."
        }
      },
      {
        weekNum: 4,
        title: "Deployment & Production Orchestration",
        description: "Secure, trace, verify, and bundle the final software solution for serverless hosting environments.",
        topics: ["Build Pipelines & Bundlers", "Production Logs Tracking", "Container Orchestration & CORS"],
        project: {
          projectName: "Full-Stack Academy Web App",
          projectDesc: "Optimize, build, and deploy a complete production-grade application on container ingress cloud engines."
        }
      }
    ]
  };
}

function getOfflineQuiz(topic: string) {
  const cleanTopic = (topic || "Web Development").toLowerCase();
  if (cleanTopic.includes("ai") || cleanTopic.includes("intelligence") || cleanTopic.includes("machine")) {
    return [
      {
        questionNum: 1,
        questionText: "What does temperature control in generative LLM content generation?",
        options: ["The processor heat signature", "The degree of randomness or creativity in the output tokens", "The token speed response rate", "The security filtering severity level"],
        correctIndex: 1,
        explanation: "In LLMs, temperature controls the creativity/randomness of output generation. Lower values are more deterministic and exact."
      },
      {
        questionNum: 2,
        questionText: "Why is server-side API proxying preferred over client-side keys?",
        options: ["It bypasses internet network hops", "It secures secret keys away from browser client inspection", "It makes client page sizes smaller", "Browser frames do not support SSL calls"],
        correctIndex: 1,
        explanation: "Keeping keys server-side protects credentials from being inspected, sniffed, or modified in the user's browser."
      },
      {
        questionNum: 3,
        questionText: "What is the primary role of systemInstruction in Gemini models?",
        options: ["To translate code to assembly", "To define the behavior, persona, and core rules of the model", "To limit daily request token volumes", "To trigger server reboot cycles"],
        correctIndex: 1,
        explanation: "System instructions program the style, persona, and constraints the model must follow throughout the dialog."
      },
      {
        questionNum: 4,
        questionText: "What is thinkingLevel in modern Gemini 3 series models?",
        options: ["A hardware clock multiplier", "A parameter controlling the depth of internal reasoning before generating output", "An automatic vocabulary count", "A level of server processor cores requested"],
        correctIndex: 1,
        explanation: "The thinkingLevel configures the model's reasoning capabilities, allocating more thinking resources for complex tasks."
      },
      {
        questionNum: 5,
        questionText: "Which HTTP status code represents temporary API unavailability or high model demand?",
        options: ["404 Not Found", "401 Unauthorized", "503 Service Unavailable", "200 Success"],
        correctIndex: 2,
        explanation: "A 503 status code is returned when a server or model is temporarily unavailable due to high demand or maintenance."
      }
    ];
  }
  
  return [
    {
      questionNum: 1,
      questionText: "Which tool is best suited for fast feedback linting of a React TypeScript codebase?",
      options: ["tsc --watch", "eslint via lint_applet command", "production build compiler", "manual server restart"],
      correctIndex: 1,
      explanation: "Linter tools like ESLint run extremely fast to catch syntax errors, missing imports, and styling conventions."
    },
    {
      questionNum: 2,
      questionText: "What port must all developer servers utilize in our sandboxed container configuration?",
      options: ["3000 (nginx reverse proxy routing destination)", "8080 (legacy Tomcat standard)", "5173 (Vite default preview)", "80 (standard HTTP port)"],
      correctIndex: 0,
      explanation: "Port 3000 is the only externally accessible port routed by nginx in this container environment."
    },
    {
      questionNum: 3,
      questionText: "What is an ES Module (ESM) path resolution requirement?",
      options: ["Omitting all relative file extensions", "Using require statement blocks in HTML files", "Specifying precise file extensions or using bundle pre-compilation (e.g., CJS output)", "Using absolute system server paths exclusively"],
      correctIndex: 2,
      explanation: "Compiling TS source into a unified CommonJS chunk (.cjs) via tools like esbuild bypasses Node's strict ESM relative checks."
    },
    {
      questionNum: 4,
      questionText: "Which React hook is most appropriate for tracking mutable websocket connections that persist without causing re-renders?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      correctIndex: 2,
      explanation: "useRef stores mutable references that can be modified without triggering component lifecycle re-render updates."
    },
    {
      questionNum: 5,
      questionText: "For client-side variables in a React + Vite workspace, what prefix is required?",
      options: ["PROCESS_ENV_", "REACT_APP_", "VITE_", "GEMINI_"],
      correctIndex: 2,
      explanation: "In Vite applications, only environment variables prefixed with VITE_ are compiled and exposed to the browser client."
    }
  ];
}

function getOfflineEvaluation(topic: string, quizQuestions: any[], studentAnswers: any) {
  let correctCount = 0;
  const details = [];
  
  const questions = Array.isArray(quizQuestions) ? quizQuestions : [];
  for (const q of questions) {
    const qNum = q.questionNum;
    const correctIdx = q.correctIndex;
    let studentIdx = studentAnswers[qNum];
    if (studentIdx === undefined) {
      studentIdx = studentAnswers[questions.indexOf(q)];
    }
    
    const isCorrect = String(correctIdx) === String(studentIdx);
    if (isCorrect) correctCount++;
    
    details.push({
      questionNum: qNum,
      isCorrect: isCorrect,
      coachingNote: isCorrect 
        ? `Excellent! You correctly identified the answer for Question ${qNum}.`
        : `Almost! The correct choice was "${q.options[correctIdx]}". ${q.explanation || ""}`
    });
  }
  
  let gradeLabel = "Tech Novice";
  let feedback = "We highly recommend revisiting Apostle Paul Academy's master materials to unlock complete software capability.";
  
  if (correctCount === 5) {
    gradeLabel = "High Distinction Master";
    feedback = "An outstanding perfect performance! You have displayed mastery over advanced technical paradigms. We welcome you to join our advanced Research cohort!";
  } else if (correctCount >= 3) {
    gradeLabel = "Certified Professional";
    feedback = "Great grasp of this technical domain! With slight polishing of specialized concepts, you are ready for advanced engineering roles.";
  }
  
  return {
    score: correctCount,
    maxScore: 5,
    gradeLabel,
    deanFeedback: `[Resilient Evaluation Mode] ${feedback}`,
    details
  };
}

// Helper query function that implements robust exponential retry backoff
async function generateContentWithRetry(
  params: {
    model: string;
    contents: any;
    config?: any;
  },
  fallbackGenerator: () => any
): Promise<any> {
  const maxRetries = 2;
  let delay = 800; // start at 800ms

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const client = getGeminiClient();
      const response = await client.models.generateContent(params);
      if (response && response.text) {
        return response;
      }
      throw new Error("Empty text output returned from model generate call.");
    } catch (error: any) {
      console.warn(`[Gemini API Attempt ${attempt + 1}/${maxRetries + 1} Failed]:`, error.message || error);
      
      const isUnavailable = 
        error.status === 503 || 
        error.message?.includes("503") || 
        error.message?.includes("temporary") || 
        error.message?.includes("high demand") || 
        error.message?.includes("UNAVAILABLE") || 
        error.message?.includes("resource exhausted") || 
        error.message?.includes("429");

      if (isUnavailable && attempt < maxRetries) {
        console.log(`Backing off for ${delay}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2.2; // exponential escalation
        continue;
      }

      // If we are out of retries, or it's a structural key error, trigger fallback generator
      console.log("[Gemini API] Applying pre-orchestrated offline Academy backup content.");
      const fallbackPayload = fallbackGenerator();
      return {
        text: typeof fallbackPayload === "string" ? fallbackPayload : JSON.stringify(fallbackPayload)
      };
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // 1. API: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // 2. API: AI Advisor Chat / Career Counselor
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, chatHistory, isVoice } = req.body;

      // Support multi-turn chat format by building a structural system instruction and query contents
      let systemInstruction = 
        "You are 'Apostle Apostle Paul AI Academy Advisor' - a premium school representative holding ICT & AI Expertise. " + 
        "Speak with prestige, encouragement, and high proficiency in coding, software, data systems, and generative AI. " +
        "Help the student with professional recommendations, explain technological terms clearly as an industry mentor, " +
        "and direct them towards courses at Apostle Paul Academy. Keep responses engaging, structured in markdown, and direct.";

      if (isVoice) {
        systemInstruction = 
          "You are 'Apostle Paul AI Academy Voice Assistant'. To optimize for low-latency response and seamless verbal playback, " +
          "you MUST answer extremely concisely with maximum 1-2 direct, clear sentences. Never use lists, bullet points, asterisks (*), " +
          "hash tags (#), or code snippets. Present your advice like a warm, snappy computer science counselor.";
      }

      // Map chatHistory to a format suitable for Gemini
      const contents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          contents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const aiResponse = await generateContentWithRetry({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      }, () => getOfflineChatAnswer(message));

      res.json({ text: aiResponse.text || "I was unable to formulate a response at this time." });
    } catch (error: any) {
      console.error("Critical fallback in AI Chat advisor:", error);
      res.json({ text: getOfflineChatAnswer(req.body.message || "") });
    }
  });

  // 3. API: AI Study Roadmap Generator (Produces structured, tailored curriculum roadmap)
  app.post("/api/ai/roadmap", async (req, res) => {
    try {
      const { careerGoal, skillLevel } = req.body;

      const prompt = `Create a custom detailed ICT & AI learning curriculum roadmap for a student whose career goal is to become a: "${careerGoal}" with an current skill level of: "${skillLevel}". Generate a professional structure outlining a 4-week intensive path suited for Academy accreditation.`;

      const aiResponse = await generateContentWithRetry({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Curriculum Director of Apostle Paul Academy. You must output detailed curriculum roadmaps tailored for career transition and technological mastery.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              careerPathTitle: { type: Type.STRING, description: "The tailored, professional designation for this track." },
              summaryDescription: { type: Type.STRING, description: "Elegant intro summarizing why this path is critical, matching Apostle Paul Academy standards." },
              estimatedHoursPerWeek: { type: Type.INTEGER, description: "Suggested study time commitment." },
              weeks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    weekNum: { type: Type.INTEGER },
                    title: { type: Type.STRING, description: "Focus of this week. E.g., 'Core Neural Interfaces & Prompt Architecture'" },
                    description: { type: Type.STRING, description: "Brief pedagogical explanation." },
                    topics: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    project: {
                      type: Type.OBJECT,
                      properties: {
                        projectName: { type: Type.STRING },
                        projectDesc: { type: Type.STRING, description: "The hands-on practical assignment for this week." }
                      },
                      required: ["projectName", "projectDesc"]
                    }
                  },
                  required: ["weekNum", "title", "description", "topics", "project"]
                }
              }
            },
            required: ["careerPathTitle", "summaryDescription", "estimatedHoursPerWeek", "weeks"]
          }
        }
      }, () => getOfflineRoadmap(careerGoal, skillLevel));

      const responseText = aiResponse.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Critical fallback generating AI Roadmap:", error);
      res.json(getOfflineRoadmap(req.body.careerGoal, req.body.skillLevel));
    }
  });

  // 4. API: AI Quiz Generator
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { topic } = req.body;

      const prompt = `Generate a high-quality 5-question multi-choice test about this technology domain: "${topic}". Provide clear option selections and record the correct answer reference.`;

      const aiResponse = await generateContentWithRetry({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an examiner at Apostle Paul Academy. Create professional multi-choice questions with a single correct option and clear technical relevance.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionNum: { type: Type.INTEGER },
                questionText: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 4 options"
                },
                correctIndex: { type: Type.INTEGER, description: "Zero-based index of the correct answer inside the options array." },
                explanation: { type: Type.STRING, description: "Short description of why this is correct." }
              },
              required: ["questionNum", "questionText", "options", "correctIndex", "explanation"]
            }
          }
        }
      }, () => getOfflineQuiz(topic));

      const responseText = aiResponse.text || "[]";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Critical fallback generating AI Quiz:", error);
      res.json(getOfflineQuiz(req.body.topic || ""));
    }
  });

  // 5. API: AI Quiz Evaluator (Evaluates student's answers & provides custom coaching/feedback)
  app.post("/api/ai/evaluate-quiz", async (req, res) => {
    try {
      const { topic, quizQuestions, studentAnswers } = req.body;

      const prompt = `Evaluate the student answers for the quiz about: "${topic}".
Quiz questions:
${JSON.stringify(quizQuestions)}
Student selected indices (matching questionNum mapped keys or arrays):
${JSON.stringify(studentAnswers)}

Provide a beautiful, insightful grade report.`;

      const aiResponse = await generateContentWithRetry({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Dean of ICT at Apostle Paul Academy. Evaluate the student answers objectively, award scores, and give concise coaching notes to encourage excellence.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Total correct answers out of 5" },
              maxScore: { type: Type.INTEGER, description: "Always 5" },
              gradeLabel: { type: Type.STRING, description: "E.g., High Distinction, Master, Tech Novice, etc." },
              deanFeedback: { type: Type.STRING, description: "Elegant, encouraging general message about their technical profile." },
              details: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionNum: { type: Type.INTEGER },
                    isCorrect: { type: Type.BOOLEAN },
                    coachingNote: { type: Type.STRING, description: "Precise educational correction or praise tailored to the student response." }
                  },
                  required: ["questionNum", "isCorrect", "coachingNote"]
                }
              }
            },
            required: ["score", "maxScore", "gradeLabel", "deanFeedback", "details"]
          }
        }
      }, () => getOfflineEvaluation(topic, quizQuestions, studentAnswers));

      res.json(JSON.parse(aiResponse.text || "{}"));
    } catch (error: any) {
      console.error("Critical fallback in Quiz Evaluator:", error);
      res.json(getOfflineEvaluation(req.body.topic, req.body.quizQuestions, req.body.studentAnswers));
    }
  });

  // Mount Vite developer server middleware in local development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving of built assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Apostle Paul Academy DevServer] Running on http://localhost:${PORT}`);
  });
}

startServer();
