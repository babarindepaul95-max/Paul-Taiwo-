import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, X, Play, Loader2, Send, HelpCircle, AudioLines, Settings } from "lucide-react";

interface VoiceAgentProps {
  onNavigateTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function VoiceAgent({ onNavigateTab, onOpenBooking }: VoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [customInputText, setCustomInputText] = useState("");
  const [responseText, setResponseText] = useState("Hello! I am your Apostle Paul Academy AI Voice Counselor. Try speaking, clicking a question, or typing in the chat container below, and I will speak back to you!");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  
  // Custom voices selection
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [isContinuousMode, setIsContinuousMode] = useState(true);

  const isContinuousModeRef = useRef(false);
  useEffect(() => {
    isContinuousModeRef.current = isContinuousMode;
  }, [isContinuousMode]);

  const recognitionRef = useRef<any>(null);
  const isRecognitionActiveRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sound synthesis utility using browser's AudioContext
  const playSynthesizedChime = (type: "start" | "success" | "click" | "off") => {
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "start") {
        // Double rising chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1); // C#5
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "success") {
        // Melodic success triad
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === "off") {
        // Falling de-registration beep
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // Micro organic UI click
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
    } catch (err) {
      // Graceful ignore if blocked by browser autoplay policies
    }
  };

  const presetQuestions = [
    { q: "Who is Pastor Paul?", category: "Faculty" },
    { q: "What courses do you offer?", category: "Syllabus" },
    { q: "How do I book a campus room?", category: "Facilities" },
    { q: "What is your contact WhatsApp?", category: "Support" },
  ];

  // Initialize Web Speech API & load browser voices list
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        isRecognitionActiveRef.current = true;
        setSpeechText("Listening carefully...");
      };

      rec.onresult = async (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          const trimmedFinal = finalTranscript.trim();
          if (trimmedFinal) {
            setSpeechText(`You said: "${trimmedFinal}"`);
            setIsListening(false);
            isRecognitionActiveRef.current = false;
            // Stop the recognition safely before processing
            try {
              rec.stop();
            } catch (e) {}
            await processVoiceCommand(trimmedFinal);
          }
        } else if (interimTranscript) {
          setSpeechText(`Hearing: "${interimTranscript}..."`);
        }
      };

      rec.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
        isRecognitionActiveRef.current = false;
        setSpeechText("I couldn't catch that. Try using the dialogue entry box or preset buttons!");
      };

      rec.onend = () => {
        setIsListening(false);
        isRecognitionActiveRef.current = false;
      };

      recognitionRef.current = rec;
    }

    // Load synthesised voices list
    const loadVoices = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voicesList = window.speechSynthesis.getVoices();
        setAvailableVoices(voicesList);
        
        // Pick an initial elegant default or English voice
        const englishDefault = voicesList.find(v => v.lang.startsWith("en-") && v.name.includes("Google")) || 
                               voicesList.find(v => v.lang.startsWith("en-")) || 
                               voicesList[0];
        if (englishDefault) {
          setSelectedVoiceName(englishDefault.name);
        }
      }
    };

    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Cleanup speech on tab changes/closed
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Vocalize welcome greeting when agent desk expands
  useEffect(() => {
    if (isOpen) {
      // Delay slightly to give browsers time to show animation and prepare voice objects
      const timer = setTimeout(() => {
        speakText(responseText);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      stopSpeaking();
      setIsContinuousMode(false);
      if (recognitionRef.current && isRecognitionActiveRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    }
  }, [isOpen]);

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakText = (textToSpeak: string) => {
    stopSpeaking();
    if (voiceMuted || !window.speechSynthesis) {
      return;
    }

    // Strip out markdown tags for pristine audio broadcasting
    const cleanText = textToSpeak
      .replace(/[\*\#\-\_\`\[\]]/g, "")
      .replace(/\n/g, " ")
      .slice(0, 300); // Keep voice answer concise

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Bind favorite customized voice chosen by user
    if (selectedVoiceName) {
      const activeVoiceObj = availableVoices.find(v => v.name === selectedVoiceName);
      if (activeVoiceObj) {
        utterance.voice = activeVoiceObj;
      }
    }

    utterance.rate = 1.15;
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (isContinuousModeRef.current) {
        setTimeout(() => {
          if (recognitionRef.current && !isRecognitionActiveRef.current) {
            try {
              isRecognitionActiveRef.current = true;
              recognitionRef.current.start();
            } catch (e) {
              isRecognitionActiveRef.current = false;
              console.warn("Continuous hands-free auto-mic failed", e);
            }
          }
        }, 250);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    stopSpeaking();
    if (isListening || isRecognitionActiveRef.current) {
      playSynthesizedChime("off");
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      isRecognitionActiveRef.current = false;
    } else {
      playSynthesizedChime("start");
      if (recognitionRef.current) {
        try {
          isRecognitionActiveRef.current = true;
          recognitionRef.current.start();
        } catch (e) {
          isRecognitionActiveRef.current = false;
          console.error("Failed to boot mic listener", e);
          setSpeechText("Microphone permission required or browser block. Please type or use our quick topics!");
        }
      } else {
        setSpeechText("Speech recognition not fully supported in this outer frame. Please type your query box below!");
      }
    }
  };

  const handleCustomInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;

    playSynthesizedChime("click");
    const textToSend = customInputText;
    setCustomInputText("");
    setSpeechText(`You typed: "${textToSend}"`);
    
    await processVoiceCommand(textToSend);
  };

  const processVoiceCommand = async (command: string) => {
    const query = command.toLowerCase();
    setIsLoading(true);
    stopSpeaking();

    let answer = "";
    
    // Dynamic navigation mapping combined with answers
    if (query.includes("pastor paul") || query.includes("dean") || query.includes("babarinde")) {
      answer = "Pastor Paul Babarinde is our Dean of Academic Excellence at Apostle Paul Academy. He is an experienced industrial ICT architect. I am switching you to our company leader's outline.";
      onNavigateTab("home");
      setTimeout(() => {
        document.getElementById("apply-form-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (query.includes("services") || query.includes("systems consulting") || query.includes("consultation") || query.includes("custom software")) {
      answer = "I am shifting your viewport to our corporate services now. Apostle Paul Academy offers professional full-stack engineering, custom AI agent deployments, and network audits led directly by Pastor Paul.";
      onNavigateTab("services");
    } else if (query.includes("careers") || query.includes("jobs") || query.includes("apply") || query.includes("hiring") || query.includes("positions")) {
      answer = "Absolutely! We are actively recruiting expert instructors, artificial intelligence researchers, and design facilitators. Let me switch you over to our careers application portal.";
      onNavigateTab("career");
    } else if (query.includes("course") || query.includes("syllabus") || query.includes("learn") || query.includes("teach") || query.includes("fee") || query.includes("price")) {
      answer = "We offer world-class accredited pipelines in Web Development, Applied AI, Data Analytics, and UI UX Design. I am switching your viewport to our course catalog now.";
      onNavigateTab("courses");
    } else if (query.includes("book") || query.includes("room") || query.includes("seat") || query.includes("lab") || query.includes("reserve")) {
      answer = "I would be happy to help. You can reserve an interactive computing seat in our high-end computer laboratory block right now. Let me scroll down to our reservation deck!";
      onOpenBooking();
    } else if (query.includes("location") || query.includes("address") || query.includes("where are you") || query.includes("akure") || query.includes("state") || query.includes("country") || query.includes("nigeria")) {
      answer = "Apostle Paul Academy is located at Adebowale, Ondo Road, Akure, Ondo State, Nigeria. We look forward to welcoming you to our high-tech campus!";
    } else if (query.includes("hour") || query.includes("time") || query.includes("schedule") || query.includes("when are you open") || query.includes("open")) {
      answer = "Our physical campus in Akure is open from Monday to Saturday, from 8:00 AM to 6:00 PM. Our dynamic digital portal is available 24/7!";
    } else if (query.includes("certificate") || query.includes("accredited") || query.includes("verify") || query.includes("degree")) {
      answer = "Yes! Completing our practical training programs awards you an accredited Certificate of ICT and AI Excellence to boost your career.";
    } else if (query.includes("whatsapp") || query.includes("contact") || query.includes("social") || query.includes("instagram") || query.includes("facebook") || query.includes("telegram")) {
      answer = "You can interact with our student channels directly on WhatsApp, Facebook, Instagram, TikTok, and Telegram! All direct link details are visible in the screen footer.";
    } else {
      // Query the actual server-side Gemini system
      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: command, chatHistory: [], isVoice: true }),
        });
        const data = await res.json();
        if (data.text) {
          answer = data.text;
        } else {
          answer = "I received your query. Apostle Paul Academy prepares elite software leaders in Africa. How can I guide your admission track today?";
        }
      } catch (e) {
        answer = "Apostle Paul Academy's master system is online. We coordinate leading software paradigms starting at state-of-the-art labs. What coding goal do you want to master?";
      }
    }

    setIsLoading(false);
    setResponseText(answer);
    playSynthesizedChime("success");
    speakText(answer);
  };

  const handleMuteToggle = () => {
    playSynthesizedChime("click");
    if (!voiceMuted) {
      stopSpeaking();
    }
    setVoiceMuted(!voiceMuted);
  };

  const handleTriggerOpen = () => {
    playSynthesizedChime("start");
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Sparkle Micro-Trigger with subtle animation */}
      <button
        id="voice-agent-trigger-btn"
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group ring-4 ring-primary/20 hover:bg-black focus:outline-none"
        onClick={handleTriggerOpen}
        title="Open Student Counsel Voice Desk"
      >
        <div className="relative">
          <Mic size={24} className="group-hover:animate-pulse" />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-tertiary-container rounded-full animate-ping"></span>
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-tertiary-container rounded-full"></span>
        </div>
      </button>

      {/* Slide-out Voice Interface panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center sm:justify-end p-4 animate-fadeIn">
          <div 
            id="voice-agent-pane"
            className="bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-150 max-w-md w-full h-[620px] flex flex-col justify-between overflow-hidden relative sm:mr-6 animate-slideInRight"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <AudioLines size={20} className="text-tertiary-container animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-sm sm:text-base leading-none">AI Dialogue &amp; Voice Center</h3>
                  <span className="text-[10px] text-tertiary-container font-mono tracking-wider mt-1 uppercase block font-bold">Akure Campus Core • Interactive</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => { playSynthesizedChime("click"); setShowSettings(!showSettings); }}
                  className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
                  title="Configure Speech Accent Voice"
                >
                  <Settings size={17} />
                </button>
                <button 
                  onClick={handleMuteToggle}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                  title={voiceMuted ? "Unmute Spoken Speech Output" : "Mute Spoken Speech Output"}
                >
                  {voiceMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>
                <button 
                  onClick={() => { playSynthesizedChime("off"); stopSpeaking(); setIsOpen(false); }}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                  title="Minimize Panel"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Vocal Accordion Panel (Speech customization menu) */}
            {showSettings && (
              <div className="bg-gradient-to-br from-primary to-black text-white p-4 border-b border-white/10 animate-slideDown text-xs space-y-2.5 relative z-20">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold uppercase tracking-wider text-tertiary-container text-[10px]">Select Spoken Assistant Accent</span>
                  <button onClick={() => setShowSettings(false)} className="text-[10px] hover:underline text-gray-300">Close</button>
                </div>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => {
                    setSelectedVoiceName(e.target.value);
                    playSynthesizedChime("click");
                  }}
                  className="w-full bg-white/10 border border-white/25 rounded p-1.5 text-xs text-white focus:outline-none focus:border-tertiary-container"
                >
                  {availableVoices.length === 0 ? (
                    <option className="text-black">No audio synthesis voices loaded</option>
                  ) : (
                    availableVoices.map((voice, idx) => (
                      <option key={idx} value={voice.name} className="text-black text-xs">
                        {voice.name} ({voice.lang})
                      </option>
                    ))
                  )}
                </select>
                
                {/* Continuous Hands-free dialog feature */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-[11px]">Hands-Free Dialog Mode</span>
                    <span className="text-[9px] text-gray-300">Continuous voice loops without tapping</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={isContinuousMode}
                      onChange={(e) => {
                        setIsContinuousMode(e.target.checked);
                        playSynthesizedChime("click");
                      }}
                    />
                    <div className="w-8 h-4 bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-tertiary-container"></div>
                  </label>
                </div>

                <p className="text-[10px] text-gray-350 leading-relaxed italic pt-1">
                  Note: Voice options and continuous loop responsiveness depend on your operating system (Mac, Windows, iOS, Android) speech engines.
                </p>
              </div>
            )}

            {/* Speaking/listening interface */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6 bg-gradient-to-b from-gray-50/50 to-white/80 overflow-y-auto">
              
              {/* Dynamic Equalizer EQ spectrum visual bars */}
              {(isSpeaking || isListening) ? (
                <div className="flex items-end justify-center gap-1 h-8 animate-fadeIn mb-1">
                  {[...Array(9)].map((_, i) => {
                    // Stagger bar rates dynamically
                    const duration = i % 2 === 0 ? "0.6s" : i % 3 === 0 ? "0.9s" : "0.4s";
                    return (
                      <span 
                        key={i} 
                        className={`w-1 rounded-t-sm transition-all ${isListening ? "bg-red-500 animate-[bounce_0.5s_infinite_alternate]" : "bg-primary animate-[bounce_0.5s_infinite_alternate]"}`}
                        style={{ 
                          height: `${Math.floor(Math.random() * 24 + 8)}px`,
                          animationDuration: duration,
                          animationDelay: `${i * 0.08}s`
                        }}
                      ></span>
                    );
                  })}
                </div>
              ) : (
                <div className="h-8 flex items-center justify-center text-gray-300 text-xs gap-1 font-mono uppercase tracking-widest">
                  <HelpCircle size={12} />
                  <span>Interactive Audio Signal</span>
                </div>
              )}

              {/* Glowing Pulse Signal Ring */}
              <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
                
                {/* Listening expansion ring */}
                {isListening && (
                  <>
                    <span className="absolute inset-0 bg-red-500/10 rounded-full animate-ping scale-150 duration-1000"></span>
                    <span className="absolute w-24 h-24 bg-red-500/20 rounded-full animate-ping scale-125 duration-750"></span>
                  </>
                )}

                {/* Speaking expansion ring */}
                {isSpeaking && (
                  <>
                    <span className="absolute inset-0 bg-tertiary-container/20 rounded-full animate-pulse scale-125 duration-1000"></span>
                    <span className="absolute w-24 h-24 bg-tertiary-container/30 rounded-full animate-ping scale-110 duration-700"></span>
                  </>
                )}

                {/* Center Core Capsule Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white transition-all duration-300 shadow-xl relative z-10 focus:outline-none ${
                    isListening 
                      ? "bg-red-500 hover:bg-red-600 scale-95" 
                      : isSpeaking 
                        ? "bg-tertiary-container hover:bg-black" 
                        : "bg-primary hover:bg-black"
                  }`}
                  title={isListening ? "Stop listening and parse" : "Click to use Voice Mode"}
                >
                  {isLoading ? (
                    <Loader2 size={26} className="animate-spin text-white" />
                  ) : isListening ? (
                    <MicOff size={26} />
                  ) : (
                    <Mic size={26} />
                  )}
                  <span className="text-[8px] font-mono font-extrabold mt-1 tracking-wider uppercase">
                    {isListening ? "Listening" : isSpeaking ? "Speaking" : "Tap Speak"}
                  </span>
                </button>
              </div>

              {/* Status Output text bar */}
              <div className="text-center w-full space-y-1 sm:space-y-1.5">
                <p className={`text-xs font-mono font-bold uppercase tracking-wider ${isListening ? "text-red-500" : isContinuousMode ? "text-emerald-600" : "text-tertiary-container"}`}>
                  {isListening 
                    ? "● Audio Signal Recording" 
                    : isSpeaking 
                      ? "🔊 Audio Feedback Streaming" 
                      : isContinuousMode 
                        ? "🔄 Hands-Free Dynamic Loop" 
                        : "🎤 Voice Path Ready"}
                </p>
                <div className="min-h-[16px] flex items-center justify-center">
                  <p className="text-[11px] text-gray-500 italic break-words line-clamp-1 max-w-[280px]">
                    {speechText || 'Try "Who is Pastor Paul?" or "Book a room"'}
                  </p>
                </div>
              </div>

              {/* Subtitles Transcript Box with scrolling capability */}
              <div className="bg-gray-50 border border-gray-150 rounded-xl p-3.5 w-full h-[120px] overflow-y-auto text-left flex flex-col justify-start relative shrink-0">
                <div className="flex gap-1.5 items-center mb-1 bg-primary/5 py-0.5 px-2 rounded w-fit shrink-0">
                  <MessageSquare size={9} className="text-primary" />
                  <span className="text-[9px] font-mono font-extrabold text-primary uppercase">Academic Advisor</span>
                </div>
                <p className="text-xs text-gray-650 leading-relaxed font-body">
                  {responseText}
                </p>
              </div>
            </div>

            {/* Quick Interactive Chat Input (Primary Interactivity Fallback) */}
            <div className="px-4 py-2 border-t border-gray-100 bg-white">
              <form onSubmit={handleCustomInputSubmit} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Can't talk? Type your request here..."
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-body"
                  disabled={isLoading || isListening}
                />
                <button
                  type="submit"
                  disabled={!customInputText.trim() || isLoading || isListening}
                  className={`p-2 rounded-lg text-white transition-all ${
                    customInputText.trim() && !isLoading && !isListening
                      ? "bg-primary hover:bg-black active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  title="Send input"
                >
                  <Send size={13} />
                </button>
              </form>
            </div>

            {/* Quick Preset Query Pins */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2 shrink-0">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest font-extrabold block text-center">Suggested Dialog Topics</span>
              <div className="grid grid-cols-2 gap-2">
                {presetQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { playSynthesizedChime("click"); processVoiceCommand(item.q); }}
                    disabled={isLoading || isListening}
                    className="p-2 bg-white hover:bg-primary/5 hover:border-primary border border-gray-150 rounded-lg text-left text-[11px] text-gray-700 font-semibold hover:text-primary transition-all flex items-center justify-between gap-1 group shadow-xs active:scale-95"
                  >
                    <div className="truncate">
                      <span className="text-[8px] font-mono font-bold uppercase text-tertiary-container bg-tertiary/10 px-1 rounded block w-fit mb-0.5">{item.category}</span>
                      <span className="line-clamp-1 text-[11px]">{item.q}</span>
                    </div>
                    <Play size={10} className="text-gray-300 group-hover:text-primary shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

