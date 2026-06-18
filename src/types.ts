export interface Course {
  id: string;
  title: string;
  category: "ICT" | "AI" | "DATA" | "DESIGN";
  description: string;
  price: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  imgUrl: string;
  syllabus: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  tag: string;
  imgUrl: string;
}

export interface StudentProject {
  id: string;
  title: string;
  student: string;
  description: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  timestamp: string;
}

export interface RoadmapWeek {
  weekNum: number;
  title: string;
  description: string;
  topics: string[];
  project: {
    projectName: string;
    projectDesc: string;
  };
}

export interface StudyRoadmap {
  careerPathTitle: string;
  summaryDescription: string;
  estimatedHoursPerWeek: number;
  weeks: RoadmapWeek[];
}

export interface QuizQuestion {
  questionNum: number;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizEvaluationDetail {
  questionNum: number;
  isCorrect: boolean;
  coachingNote: string;
}

export interface QuizEvaluation {
  score: number;
  maxScore: number;
  gradeLabel: string;
  deanFeedback: string;
  details: QuizEvaluationDetail[];
}
