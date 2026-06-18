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
      const { message, chatHistory } = req.body;
      const client = getGeminiClient();

      // Support multi-turn chat format by building a structural system instruction and query contents
      const systemInstruction = 
        "You are 'Apostle Apostle Paul AI Academy Advisor' - a premium school representative holding ICT & AI Expertise. " + 
        "Speak with prestige, encouragement, and high proficiency in coding, software, data systems, and generative AI. " +
        "Help the student with professional recommendations, explain technological terms clearly as an industry mentor, " +
        "and direct them towards courses at Apostle Paul Academy. Keep responses engaging, structured in markdown, and direct.";

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

      const aiResponse = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: aiResponse.text || "I was unable to formulate a response at this time." });
    } catch (error: any) {
      console.error("Error in AI Chat advisor:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI Advisor." });
    }
  });

  // 3. API: AI Study Roadmap Generator (Produces structured, tailored curriculum roadmap)
  app.post("/api/ai/roadmap", async (req, res) => {
    try {
      const { careerGoal, skillLevel } = req.body;
      const client = getGeminiClient();

      const prompt = `Create a custom detailed ICT & AI learning curriculum roadmap for a student whose career goal is to become a: "${careerGoal}" with an current skill level of: "${skillLevel}". Generate a professional structure outlining a 4-week intensive path suited for Academy accreditation.`;

      const aiResponse = await client.models.generateContent({
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
      });

      const responseText = aiResponse.text || "{}";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Error generating AI Roadmap:", error);
      res.status(500).json({ error: error.message || "Failed to generate learning roadmap." });
    }
  });

  // 4. API: AI Quiz Generator
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { topic } = req.body;
      const client = getGeminiClient();

      const prompt = `Generate a high-quality 5-question multi-choice test about this technology domain: "${topic}". Provide clear option selections and record the correct answer reference.`;

      const aiResponse = await client.models.generateContent({
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
      });

      const responseText = aiResponse.text || "[]";
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("Error generating AI Quiz:", error);
      res.status(500).json({ error: error.message || "Failed to generate technical quiz." });
    }
  });

  // 5. API: AI Quiz Evaluator (Evaluates student's answers & provides custom coaching/feedback)
  app.post("/api/ai/evaluate-quiz", async (req, res) => {
    try {
      const { topic, quizQuestions, studentAnswers } = req.body;
      const client = getGeminiClient();

      const prompt = `Evaluate the student answers for the quiz about: "${topic}".
Quiz questions:
${JSON.stringify(quizQuestions)}
Student selected indices (matching questionNum mapped keys or arrays):
${JSON.stringify(studentAnswers)}

Provide a beautiful, insightful grade report.`;

      const aiResponse = await client.models.generateContent({
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
      });

      res.json(JSON.parse(aiResponse.text || "{}"));
    } catch (error: any) {
      console.error("Error in Quiz Evaluator:", error);
      res.status(500).json({ error: error.message || "Failed to evaluate answers." });
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
