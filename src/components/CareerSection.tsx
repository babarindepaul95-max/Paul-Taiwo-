import React, { useState, useRef } from "react";
import { Briefcase, MapPin, DollarSign, Send, CheckCircle2, CloudUpload, Sparkles, Building2, Terminal, ShieldAlert } from "lucide-react";

export default function CareerSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "Senior Full-Stack Instructor & Architect",
    portfolioUrl: "",
    coverLetter: "",
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jobs = [
    {
      title: "Senior Full-Stack Instructor & Architect",
      department: "Academic Operations",
      location: "Akure Headquarters (Hybrid)",
      salary: "$4,500 - $6,000 / month",
      type: "Full-Time",
      requirements: [
        "Profound mastery of React 18+, TypeScript, Express, and Docker ingress networks.",
        "Ability to articulate complex architectural state models and secure APIs without larping.",
        "Prior experience leading engineering units or mentoring technical developer bootcamps."
      ]
    },
    {
      title: "Applied AI Systems Specialist & Researcher",
      department: "Neural Interfaces Lab",
      location: "Akure Tech Park (Remote Friendly)",
      salary: "$5,000 - $7,500 / month",
      type: "Full-Time",
      requirements: [
        "Solid foundations in Python pandas, PyTorch tensor mapping, and generative agent pipelines.",
        "Hands-on expertise configuring secure API proxy routes with advanced models like Gemini.",
        "Demonstrated history of building autonomous retrieval mechanisms (RAG models)."
      ]
    },
    {
      title: "UI/UX Facilitator & Design Architect",
      department: "Human-Computer Interaction (HCI)",
      location: "Akure Campus (Part-Time)",
      salary: "$2,800 - $3,500 / month",
      type: "Contract",
      requirements: [
        "Incredible portfolio showcasing pixel-perfect spatial grid systems and high-fidelity wireframes.",
        "Deep understanding of design token handoffs and touch target requirements.",
        "Passionate about teaching cognitive design paradigms and typography pairing."
      ]
    }
  ];

  const playCareerChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(698.46, ctx.currentTime + 0.12); // F5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.24); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      console.warn("Audio Context block:", e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf") || file.name.endsWith(".docx")) {
        setResumeFile(file);
      } else {
        alert("Please upload standard document formats like PDF, DOC, or DOCX.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !resumeFile) {
      alert("Please enter all required metrics and attach your CV.");
      return;
    }
    playCareerChime();
    setIsApplied(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 pb-20">
      
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 text-tertiary font-mono text-xs font-bold rounded-full border border-tertiary/20">
          <Briefcase size={12} className="text-tertiary-container animate-pulse" />
          <span>Join the Academic Elite</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          Shape the Future of Technology Education
        </h1>
        <p className="font-body text-secondary text-base leading-relaxed">
          At Apostle Paul Academy, we are actively recruiting forward-thinking educators, AI researchers, and master designers who value absolute architectural integrity, spacious visuals, and high-impact human learning.
        </p>
      </section>

      {/* Why Work With Us Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl border border-gray-150/80 shadow-sm space-y-4">
          <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit">
            <Building2 size={24} />
          </div>
          <h3 className="font-display font-bold text-primary text-lg">Leading-Edge Infrastructure</h3>
          <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
            Collaborate in state-of-the-art computer training grids, secure hardware complexes, and robust full-stack container environments designed by physical engineers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-150/80 shadow-sm space-y-4">
          <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit">
            <Terminal size={24} />
          </div>
          <h3 className="font-display font-bold text-primary text-lg">No Tech-Larping Philosophy</h3>
          <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
            Our campus values digital silence and visual craftsmanship over telemetry clutter. We code real structures, build server-side proxy routes, and avoid API slop.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-150/80 shadow-sm space-y-4">
          <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit">
            <Sparkles size={24} />
          </div>
          <h3 className="font-display font-bold text-primary text-lg">Dynamic Compensation</h3>
          <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
            Enjoy premium international caliber salaries, family health insurance cover, flexible workspaces, and dedicated research grants presided by Dean Paul.
          </p>
        </div>
      </section>

      {/* Active Jobs List */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-display text-2.5xl sm:text-3xl font-extrabold text-primary">Open Opportunities</h2>
          <p className="font-body text-secondary text-xs sm:text-sm">Explore our active openings. Match your skill levels to our core professional criteria.</p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, jIdx) => (
            <div 
              key={jIdx}
              className="bg-white rounded-xl border border-gray-150 p-6 sm:p-8 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
                <div className="space-y-1.5">
                  <h3 className="font-display font-extrabold text-primary text-lg sm:text-xl">{job.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-secondary font-semibold font-body">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                    <span className="bg-gray-100 text-primary-container px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-widest">{job.type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setFormData({ ...formData, jobTitle: job.title });
                    document.getElementById("apply-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2 bg-primary hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow active:scale-95"
                >
                  Quick Apply
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-semibold text-primary text-xs sm:text-sm uppercase tracking-wider font-semibold">Core Candidate Expectations:</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-500 font-body leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-tertiary-container rounded-full mt-2 shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Application Form Section with Drag-and-Drop file uploader */}
      <section id="apply-form-section" className="bg-gradient-to-b from-gray-50 to-white px-6 py-12 rounded-2xl border border-gray-200 scroll-mt-20 max-w-3xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="font-display text-2.5xl sm:text-3xl font-extrabold text-primary">Academy Ingress Application</h2>
          <p className="font-body text-secondary text-xs sm:text-sm">Submit your verified portfolio, professional bio, and CV to initialize review with Dr. Kwame Boateng and Dean Paul.</p>
        </div>

        {isApplied ? (
          <div className="text-center py-12 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-primary text-xl">Ingress Payload Transmitted!</h3>
              <p className="font-body text-secondary text-sm max-w-md mx-auto">
                Thank you for applying, <strong>{formData.name}</strong>. Your documents for the <strong>{formData.jobTitle}</strong> opening have been cataloged successfully. Our committee conducts reviews bi-weekly. We will contact you via <u>{formData.email}</u>.
              </p>
            </div>
            <button 
              onClick={() => {
                setIsApplied(false);
                setFormData({ name: "", email: "", jobTitle: "Senior Full-Stack Instructor & Architect", portfolioUrl: "", coverLetter: "" });
                setResumeFile(null);
              }}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg shadow hover:bg-black transition-all"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-primary uppercase">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sandra Agboola"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-primary uppercase">Personal Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. candidate@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-primary uppercase">Desired Position</label>
                <select 
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                >
                  <option value="Senior Full-Stack Instructor & Architect">Senior Full-Stack Instructor &amp; Architect</option>
                  <option value="Applied AI Systems Specialist & Researcher">Applied AI Systems Specialist &amp; Researcher</option>
                  <option value="UI/UX Facilitator & Design Architect">UI/UX Facilitator &amp; Design Architect</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-primary uppercase">Portfolio / GitHub / LinkedIn URL</label>
                <input 
                  type="url" 
                  placeholder="e.g. https://github.com/my-repository"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
              </div>
            </div>

            {/* Drag & Drop File Upload Component */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-primary uppercase">Attach Resume / CV (PDF, DOC, DOCX)</label>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 select-none ${
                  isDragOver 
                    ? "border-tertiary-container bg-tertiary/5 scale-[0.99]" 
                    : resumeFile 
                      ? "border-emerald-500 bg-emerald-50/20" 
                      : "border-gray-300 hover:border-primary bg-white hover:bg-gray-50/50"
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                />
                
                <div className={`p-3 rounded-full ${resumeFile ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-secondary"}`}>
                  <CloudUpload size={24} />
                </div>

                {resumeFile ? (
                  <div className="space-y-1">
                    <p className="font-display font-bold text-emerald-600 text-sm max-w-[280px] truncate" title={resumeFile.name}>
                      {resumeFile.name}
                    </p>
                    <p className="font-body text-gray-400 text-xs font-semibold">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Drag or click to change file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-display font-medium text-gray-700 text-sm">
                      <span className="text-primary font-bold">Drag and drop</span> your file here, or click to browse
                    </p>
                    <p className="font-body text-gray-400 text-xs">
                      Supports PDF, DOC, or DOCX formats (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-primary uppercase">Cover Biography / Statement (Optional)</label>
              <textarea 
                rows={4}
                placeholder="Share critical achievements, academic alignment goals, and engineering philosophy..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary hover:bg-black text-white rounded-lg font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>Submit Accreditation Application</span>
            </button>
          </form>
        )}
      </section>

    </div>
  );
}
