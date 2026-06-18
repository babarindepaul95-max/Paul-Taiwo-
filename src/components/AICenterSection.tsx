import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Brain, GraduationCap, Compass, ArrowRight, ClipboardCheck, Play, RotateCcw, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { ChatMessage, StudyRoadmap, QuizQuestion, QuizEvaluation } from "../types";

export default function AICenterSection() {
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "roadmap" | "quiz">("chat");

  // Chat counselor state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Study roadmap state
  const [careerGoal, setCareerGoal] = useState("Full-Stack Web Dev with AI Integration");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [studyHours, setStudyHours] = useState(8);
  const [roadmap, setRoadmap] = useState<StudyRoadmap | null>(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [checkedWeeks, setCheckedWeeks] = useState<{ [key: number]: boolean }>({});

  // Quiz state
  const [quizTopic, setQuizTopic] = useState("Prompt Engineering & General Intelligence");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<{ [key: number]: number }>({});
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<QuizEvaluation | null>(null);

  // Auto scroll chat to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isChatLoading]);

  // Initial welcome message for chat
  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          id: "welcome",
          sender: "advisor",
          text: "Welcome to the Apostle Paul Applied Neural Network Laboratory. I am the AI Student Companion. Ask me any questions about our technology curricula, computer science principles, or modern development techniques.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // 1. Submit helper for Chat Advisor
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          chatHistory: chatHistory.slice(-6) // Send recent context for memory
        })
      });

      if (!response.ok) {
        throw new Error("Advisor encountered latency issues.");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: "advisor",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setChatHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "advisor",
          text: `Admissions connection error: ${err.message || "Failed to establish telemetry with the advisor."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // 2. Submit helper for Custom Roadmap
  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRoadmapLoading(true);
    setRoadmap(null);
    setCheckedWeeks({});

    try {
      const response = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerGoal, skillLevel })
      });

      if (!response.ok) {
        throw new Error("Curriculum server rejected request.");
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err: any) {
      alert(`Roadmap Generation Error: ${err.message}`);
    } finally {
      setIsRoadmapLoading(false);
    }
  };

  // 3. Initiate dynamic Quiz
  const handleStartQuiz = async () => {
    setIsQuizLoading(true);
    setQuizQuestions([]);
    setCurrentQuizIndex(0);
    setStudentAnswers({});
    setQuizFinished(false);
    setEvaluation(null);

    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: quizTopic })
      });

      if (!response.ok) {
        throw new Error("Technical examination server is loaded.");
      }

      const data = await response.json();
      setQuizQuestions(data);
    } catch (err: any) {
      alert(`Quiz Load Error: ${err.message}`);
    } finally {
      setIsQuizLoading(false);
    }
  };

  // 4. Submit Quiz answers for Dean evaluation
  const handleSubmitQuiz = async () => {
    if (Object.keys(studentAnswers).length < quizQuestions.length) {
      alert("Please select answers for all examination questions first.");
      return;
    }

    setIsEvaluationLoading(true);
    setQuizFinished(true);

    try {
      const response = await fetch("/api/ai/evaluate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: quizTopic,
          quizQuestions,
          studentAnswers
        })
      });

      if (!response.ok) {
        throw new Error("Evaluator failed to compute metric.");
      }

      const data = await response.json();
      setEvaluation(data);
    } catch (err: any) {
      alert(`Evaluation Error: ${err.message}`);
      setQuizFinished(false);
    } finally {
      setIsEvaluationLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      
      {/* Intro Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-display text-4xl font-extrabold text-primary flex items-center justify-center gap-3">
          <Brain className="text-tertiary-container animate-pulse shrink-0" size={32} />
          <span>Interactive AI Study &amp; Consultation Hub</span>
        </h1>
        <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
          Access immediate academic diagnostics, configure personalized weekly syllabi, or prompt technical examinations graded dynamically by the Apostle Paul AI faculty.
        </p>
      </section>

      {/* Internal Navigation Subtabs */}
      <section className="flex flex-col sm:flex-row shadow-sm border border-gray-150 rounded-xl overflow-hidden bg-white max-w-4xl mx-auto">
        <button
          onClick={() => setActiveSubTab("chat")}
          className={`flex-1 py-4 px-6 text-sm font-display font-bold flex items-center justify-center gap-2.5 transition-all select-none ${
            activeSubTab === "chat"
              ? "bg-primary text-white"
              : "text-secondary hover:text-primary hover:bg-gray-50 bg-white"
          }`}
        >
          <GraduationCap size={18} />
          <span>AI Academy Advisor</span>
        </button>

        <button
          onClick={() => setActiveSubTab("roadmap")}
          className={`flex-1 py-4 px-6 text-sm font-display font-bold flex items-center justify-center gap-2.5 transition-all select-none border-t sm:border-t-0 sm:border-x border-gray-150 ${
            activeSubTab === "roadmap"
              ? "bg-primary text-white"
              : "text-secondary hover:text-primary hover:bg-gray-50 bg-white"
          }`}
        >
          <Compass size={18} />
          <span>Study Path Architect</span>
        </button>

        <button
          onClick={() => setActiveSubTab("quiz")}
          className={`flex-1 py-4 px-6 text-sm font-display font-bold flex items-center justify-center gap-2.5 transition-all select-none ${
            activeSubTab === "quiz"
              ? "bg-primary text-white"
              : "text-secondary hover:text-primary hover:bg-gray-50 bg-white"
          }`}
        >
          <ClipboardCheck size={18} />
          <span>Technical Exam Lab</span>
        </button>
      </section>

      {/* Render active Subtab Module */}
      <section className="max-w-4xl mx-auto">
        
        {/* MODULE 1: AI Academy Advisor CHAT */}
        {activeSubTab === "chat" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Chat header info */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                <div>
                  <h4 className="font-display font-bold text-primary text-sm">Paul Advisor Agent</h4>
                  <p className="text-[10px] text-gray-400 font-semibold font-mono">POWERED BY GEMINI-3.5-FLASH</p>
                </div>
              </div>
              <span className="text-xs bg-gray-100 px-3 py-1 font-mono rounded font-semibold text-gray-500 uppercase">
                Academic Ingress AI
              </span>
            </div>

            {/* Chat Messages display */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((item) => (
                <div 
                  key={item.id}
                  className={`flex flex-col max-w-[85%] ${
                    item.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div 
                    className={`p-4 rounded-xl text-xs sm:text-sm font-body leading-relaxed shadow-sm ${
                      item.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-150"
                    }`}
                  >
                    <p className="whitespace-pre-line prose max-w-none text-left">{item.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold font-mono mt-1 px-1.5">{item.timestamp}</span>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex flex-col max-w-[80%] mr-auto items-start animate-pulse">
                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-tertiary-container" />
                    <span className="text-xs text-gray-400 font-mono">Advisor is formulating path...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input box */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-gray-100 flex gap-3.5 bg-gray-50">
              <input
                type="text"
                placeholder="Ask our coordinator about React, Python, neural structures, or career tracks..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isChatLoading}
                className="flex-1 px-4.5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-primary disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isChatLoading || !userInput.trim()}
                className="px-5 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-black transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shrink-0 flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* MODULE 2: Custom Roadmap Pathway Generator */}
        {activeSubTab === "roadmap" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                  <Sparkles size={20} className="text-tertiary-container" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary text-lg">Curriculum Blueprint Generator</h3>
                  <p className="font-body text-gray-500 text-xs sm:text-sm">Enter your targets and current background to prompt Gemini API for a tailored weekly syllabus.</p>
                </div>
              </div>

              <form onSubmit={handleGenerateRoadmap} className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary uppercase font-mono tracking-wider">Target Tech Career Rule</label>
                  <input
                    type="text"
                    required
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary rounded-lg"
                    placeholder="E.g., PyTorch NLP Dev, Figma UX lead"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary uppercase font-mono tracking-wider">Current Skill Base</label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary rounded-lg"
                  >
                    <option value="Novice (No technical background)">Total Novice</option>
                    <option value="Intermediate Developer (Some programming)">Intermediate Developer</option>
                    <option value="Advanced Engineer (Practicing Architect)">Advanced Professional</option>
                  </select>
                </div>

                <div className="flex items-end pb-0.5">
                  <button
                    type="submit"
                    disabled={isRoadmapLoading}
                    className="w-full py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-black shadow transition-all active:scale-95 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[46px]"
                  >
                    {isRoadmapLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-tertiary-container" />
                        <span>Compiling Roadmap...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Academy Study Path</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Display generated timeline */}
            {roadmap && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-8 animate-fadeIn">
                <div className="border-b border-gray-100 pb-5 space-y-2">
                  <span className="text-[10px] bg-tertiary/10 text-tertiary font-mono font-bold px-3 py-1 rounded">APA GENERATED ACCREDITATION BLUEPRINT</span>
                  <h3 className="font-display font-extrabold text-primary text-2xl tracking-tight">{roadmap.careerPathTitle}</h3>
                  <p className="font-body text-secondary text-sm leading-relaxed">{roadmap.summaryDescription}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-mono font-bold pt-2 text-gray-500">
                    <span>TIMELINE: 4 INTENSIVE WEEKS</span>
                    <span>•</span>
                    <span className="text-secondary">ESTIMATED WEEKLY LOAD: {roadmap.estimatedHoursPerWeek} HOURS</span>
                  </div>
                </div>

                <div className="relative border-l-2 border-primary/20 pl-6 space-y-12">
                  {roadmap.weeks.map((week) => {
                    const isChecked = !!checkedWeeks[week.weekNum];

                    return (
                      <div key={week.weekNum} className="relative group">
                        {/* Circle bullet toggle indicator */}
                        <button
                          onClick={() => setCheckedWeeks(prev => ({ ...prev, [week.weekNum]: !prev[week.weekNum] }))}
                          className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center shadow transition-all ${
                            isChecked 
                              ? "bg-green-500 text-white" 
                              : "bg-white text-gray-400 border border-gray-300 hover:border-primary"
                          }`}
                        >
                          {isChecked ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-mono font-bold">{week.weekNum}</span>}
                        </button>

                        <div className={`p-5 rounded-lg border shadow-sm transition-all ${
                          isChecked 
                            ? "bg-green-50/20 border-green-200" 
                            : "bg-white border-gray-150 hover:border-gray-200"
                        }`}>
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="text-[10px] font-bold text-tertiary-container uppercase font-mono tracking-wider">Week {week.weekNum} Module</span>
                              <h4 className="font-display font-bold text-primary text-base sm:text-lg leading-tight mt-0.5">{week.title}</h4>
                            </div>
                            <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2.5 py-0.5 rounded uppercase shrink-0 font-mono select-none">
                              {isChecked ? "COMPLETED" : "IN PROGRESS"}
                            </span>
                          </div>

                          <p className="font-body text-gray-500 text-xs sm:text-sm mt-2.5 leading-relaxed">{week.description}</p>
                          
                          {/* Syllabus topics list */}
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {week.topics.map((t, idx) => (
                              <span key={idx} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-0.5 rounded font-mono">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Suggested Hand-on Project */}
                          <div className="mt-4 pt-4 border-t border-gray-150/50 bg-gray-50/50 p-3 rounded space-y-1">
                            <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-wider">Weekly Practical Validation:</span>
                            <h5 className="font-display font-bold text-primary text-xs sm:text-sm">{week.project?.projectName || "Custom Target Sandbox"}</h5>
                            <p className="font-body text-gray-500 text-xs mt-1 leading-relaxed">{week.project?.projectDesc || "Submit complete repository structure to evaluation gateway."}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: Live Interactive Exam Diagnostics */}
        {activeSubTab === "quiz" && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-8 animate-fadeIn">
            
            {/* Setting Topic and starting Quiz */}
            {quizQuestions.length === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 text-primary rounded-lg">
                    <ClipboardCheck size={20} className="text-tertiary-container" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary text-lg">Dynamic ICT &amp; AI Diagnostic Examinations</h3>
                    <p className="font-body text-gray-500 text-xs sm:text-sm">Initiate tailored 5-question multi-choice technical diagnostics generated dynamically on-demand.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-primary uppercase font-mono tracking-wider">Choose Examination Focus</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Modern Javascript & React Ingress",
                      "Prompt Engineering & General Intelligence",
                      "Database Language Querying & SQL JOIN Matrices",
                      "Figma Design Tokens & Interface UX Specs",
                      "Secure Express API Routing & Server Controls"
                    ].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setQuizTopic(topic)}
                        className={`p-4 rounded-xl text-left border text-xs sm:text-sm font-body transition-colors ${
                          quizTopic === topic
                            ? "border-primary bg-primary/5 font-semibold text-primary"
                            : "border-gray-150 bg-white text-secondary hover:bg-gray-50"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleStartQuiz}
                    disabled={isQuizLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-black text-white font-bold text-sm rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 pt-2.5"
                  >
                    {isQuizLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-tertiary-container" />
                        <span>Compiling Examination Matrix...</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        <span>Initialize Examination Diagnostic</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Active Quiz Question Panels */}
            {quizQuestions.length > 0 && !quizFinished && (
              <div className="space-y-8 font-body">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 font-mono font-bold">
                    <span>TOPIC STUDY FOCUS: {quizTopic}</span>
                    <span>QUESTION {currentQuizIndex + 1} OF {quizQuestions.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question panel card */}
                <div className="p-6 bg-gray-50 border border-gray-150 rounded-xl space-y-4">
                  <span className="text-[10px] bg-primary text-white font-mono font-bold tracking-wider px-2 py-0.5 rounded">EXAM QUESTION</span>
                  <h4 className="font-display font-bold text-primary text-md sm:text-lg">
                    {quizQuestions[currentQuizIndex].questionText}
                  </h4>
                </div>

                {/* Multiple choices selection lists */}
                <div className="space-y-3">
                  {quizQuestions[currentQuizIndex].options.map((opt, optIdx) => {
                    const isSelected = studentAnswers[quizQuestions[currentQuizIndex].questionNum] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => setStudentAnswers(prev => ({ ...prev, [quizQuestions[currentQuizIndex].questionNum]: optIdx }))}
                        className={`w-full p-4 rounded-xl text-left border text-xs sm:text-sm transition-all flex items-center gap-3 ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                            : "border-gray-150 bg-white text-secondary hover:bg-gray-50"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                          isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Standard step navigations */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button
                    disabled={currentQuizIndex === 0}
                    onClick={() => setCurrentQuizIndex(prev => prev - 1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-secondary disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-lg"
                  >
                    Previous Question
                  </button>

                  {currentQuizIndex < quizQuestions.length - 1 ? (
                    <button
                      disabled={studentAnswers[quizQuestions[currentQuizIndex].questionNum] === undefined}
                      onClick={() => setCurrentQuizIndex(prev => prev + 1)}
                      className="px-5 py-2.5 bg-primary hover:bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold rounded-lg shadow-sm"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={isEvaluationLoading || Object.keys(studentAnswers).length < quizQuestions.length}
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md flex items-center gap-2"
                    >
                      {isEvaluationLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin text-white" />
                          <span>Filing Evaluation Metrics...</span>
                        </>
                      ) : (
                        <span>Submit Exam for AI Evaluation</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quiz Loading Panel during Evaluation */}
            {quizFinished && !evaluation && (
              <div className="py-16 text-center space-y-4 animate-pulse">
                <Loader2 size={44} className="mx-auto text-primary animate-spin" />
                <h3 className="font-display font-medium text-primary text-lg">Dean is Computing Diagnostics Score...</h3>
                <p className="font-body text-secondary text-sm">Validating concept proofs and formatting narrative feedback files.</p>
              </div>
            )}

            {/* HIGH-FIDELITY GRADE REPORT CARD */}
            {evaluation && (
              <div className="space-y-8 animate-fadeIn font-body text-left">
                {/* Overall diagnostic summary badge */}
                <div className="bg-primary text-white p-6 sm:p-8 rounded-xl relative overflow-hidden border-b-4 border-tertiary-container shadow-lg">
                  {/* Art glow */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <span className="text-[10px] bg-white/10 text-tertiary-container font-mono font-bold tracking-widest uppercase px-3 py-1 rounded inline-block">
                        APA ACADEMIC DIAGNOSTICS DIPLOMA
                      </span>
                      <h3 className="font-display font-bold text-white text-2xl tracking-tight">Grade Report: {evaluation.gradeLabel}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-lg italic">
                        "{evaluation.deanFeedback}"
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-white/10 p-5 rounded-lg border border-white/10 text-center shrink-0 min-w-[130px]">
                      <span className="text-[9px] font-bold tracking-widest text-[#dbe1ff] uppercase font-mono">Exam Mark</span>
                      <span className="text-4xl font-display font-extrabold text-tertiary-container my-1">
                        {evaluation.score}/{evaluation.maxScore}
                      </span>
                      <span className="text-[10px] bg-[#cca830] text-primary font-bold px-2 py-0.5 rounded">
                        {Math.round((evaluation.score / evaluation.maxScore) * 100)}% SUCCESS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Individual Question Reviews List */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-primary text-base">Question Breakdown &amp; Academic Coaching</h4>
                  
                  {evaluation.details.map((review, idx) => {
                    const originalQuestion = quizQuestions.find((q) => q.questionNum === review.questionNum);
                    if (!originalQuestion) return null;

                    return (
                      <div 
                        key={idx}
                        className={`p-5 rounded-lg border flex flex-col sm:flex-row gap-4 justify-between transition-colors ${
                          review.isCorrect
                            ? "bg-green-50/20 border-green-200"
                            : "bg-red-50/20 border-red-200"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-400">Question {review.questionNum}</span>
                            <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono border ${
                              review.isCorrect
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }`}>
                              {review.isCorrect ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                              {review.isCorrect ? "CORRECT" : "CORRECTED"}
                            </span>
                          </div>
                          
                          <p className="font-display font-bold text-primary text-xs sm:text-sm">
                            {originalQuestion.questionText}
                          </p>

                          <p className="font-body text-gray-500 text-xs sm:text-sm mt-1">
                            <strong className="text-gray-700 font-semibold font-mono text-[11px] block">COACHING ANALYSIS CELL:</strong> 
                            {review.coachingNote}
                          </p>

                          {!review.isCorrect && (
                            <p className="font-mono text-[10px] text-gray-400 bg-gray-50 p-2 rounded border border-gray-150">
                              <strong className="text-gray-600 font-semibold">Exemplar Key:</strong> {originalQuestion.options[originalQuestion.correctIndex]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Exit / restart trigger */}
                <div className="pt-4 border-t border-gray-150 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setQuizQuestions([]);
                      setEvaluation(null);
                      setQuizFinished(false);
                      setStudentAnswers({});
                    }}
                    className="px-5 py-2.5 bg-primary hover:bg-black text-white text-xs sm:text-sm font-bold rounded-lg shadow flex items-center gap-2"
                  >
                    <RotateCcw size={14} />
                    <span>Attempt New Examination focus</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </section>

    </div>
  );
}
