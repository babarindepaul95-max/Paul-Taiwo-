import React, { useState } from "react";
import { Hammer, Sparkles, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2, Award, Mail, Phone, MapPin, Briefcase } from "lucide-react";

export default function ServicesSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "Enterprise Web Systems",
    requirements: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      title: "Enterprise Full-Stack Architectures",
      icon: Hammer,
      description: "Robust multi-tier structural design using React, Node.js, Express, and cloud ingress orchestration. Built for security, performance, and volume scalability.",
      perks: ["Zero reliance on templates", "CORS & Security Ingress pre-hardened", "Comprehensive automated integration logs"]
    },
    {
      title: "Generative AI Agent Configurations",
      icon: Sparkles,
      description: "Custom server-side Large Language Model orchestration using advanced @google/genai wrappers. Integrating contextual RAG vectors and conversational state pipelines.",
      perks: ["Client-secret credential isolation", "Exponential retry network resilience", "Optimized token window structures"]
    },
    {
      title: "ICT Network & Infrastructure Security",
      icon: ShieldCheck,
      description: "Architecting private network protocols, secure port routing, database auditing, and serverless hosting infrastructures for business complexes.",
      perks: ["Relational Cloud SQL configurations", "Authorized handshake controls", "Scalable container systems"]
    },
    {
      title: "Elite Corporate Training & Up-Skilling",
      icon: Award,
      description: "Premium computer training and modern programming bootcamps for executive engineering cohorts. Customized for transition into AI-driven industries.",
      perks: ["Direct syllabus designed by Dean Paul", "Hands-on continuous labs", "Lifetime alumni verification portal"]
    }
  ];

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Chime play error:", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    playChime();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 pb-20">
      
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-xs font-mono font-bold rounded-full border border-primary/10">
          <span>Enterprise Services &amp; Counsel</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          High-Authority Technology Services &amp; Consultations
        </h1>
        <p className="font-body text-secondary text-base leading-relaxed">
          In addition to training the elite tech force, Apostle Paul Academy handles real-world software provisioning, AI architecture designs, and high-performance system audits under the exact direction of our Dean, Pastor Paul Babarinde.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-gray-150/80 rounded-2xl p-8 hover:border-tertiary-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="p-4 bg-primary/5 text-primary rounded-xl w-fit">
                <srv.icon size={28} />
              </div>
              <h3 className="font-display font-bold text-primary text-xl sm:text-2xl">{srv.title}</h3>
              <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
                {srv.description}
              </p>
              
              <ul className="space-y-2.5 pt-2">
                {srv.perks.map((perk, pidx) => (
                  <li key={pidx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-semibold font-body">
                    <CheckCircle2 size={16} className="text-tertiary-container" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Host Dean Profile Panel in Services (Fulfills pic and info request beautifully!) */}
      <section className="bg-primary text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 h-[400px] lg:h-auto overflow-hidden relative">
            <img 
              src="/src/assets/images/pastor_paul_wine_suit_1782155821396.jpg" 
              alt="Pastor Paul Babarinde" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:hidden"></div>
            
            {/* Elegant info card overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block">
              <span className="text-[10px] uppercase font-mono tracking-widest text-tertiary-container font-extrabold">Professional Ingress ID</span>
              <p className="font-display text-base font-bold text-white mt-1">Pastor Paul Babarinde</p>
              <p className="font-body text-xs text-gray-300">Apostle Paul Academy Dean of Excellence</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-tertiary-container font-mono text-xs rounded-full border border-white/10">
                <span>The Founder's Business Direction</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                Our Corporate Architecture &amp; Integrity Core
              </h2>
              <p className="font-body text-gray-200 text-sm sm:text-base leading-relaxed">
                As an industrial systems architect for over two decades, I established Apostle Paul Academy to ensure students transition into high-performance technologies with complete professional integrity. We build secure backend structures, manage cloud workloads, and configure proprietary neural logic. Let us accelerate your enterprise systems today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl text-tertiary-container">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-300 font-mono font-bold uppercase">Call / WhatsApp Direct</span>
                  <a href="https://wa.me/2348062244744" className="font-display text-sm font-bold text-white hover:text-tertiary-container transition-colors">+234 806 224 4744</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl text-tertiary-container">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-300 font-mono font-bold uppercase">E-Mail Address</span>
                  <a href="mailto:babarindepaul95@gmail.com" className="font-display text-sm font-bold text-white hover:text-tertiary-container transition-colors">babarindepaul95@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl text-tertiary-container">
                  <Briefcase size={20} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-300 font-mono font-bold uppercase">Business License</span>
                  <span className="font-display text-sm font-bold text-white">APA/ICT/2026-NIG</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 rounded-xl text-tertiary-container">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-300 font-mono font-bold uppercase">Physical Headquarters</span>
                  <span className="font-display text-xs font-bold text-white leading-tight">Adebowale, Ondo Road, Akure, Ondo State, Nigeria</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Service Request Form */}
      <section className="bg-gradient-to-b from-gray-50 to-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary">Inquire About Systems Consulting</h2>
          <p className="font-body text-secondary text-xs sm:text-sm">Submit your digital pipeline constraints. Our leadership team will review and reply within 12 business hours.</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-primary text-xl">Consultation Request Dispatched!</h3>
              <p className="font-body text-secondary text-sm max-w-md mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong>. A structural quote outline has been queued under Dean Paul's direct desk. We are excited to coordinate your system transition.
              </p>
            </div>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", serviceType: "Enterprise Web Systems", requirements: "" });
              }}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg shadow hover:bg-black transition-all"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5Col">
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
                <label className="block text-xs font-mono font-bold text-primary uppercase">Business Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. client@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-primary uppercase">Service Category Requested</label>
              <select 
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
              >
                <option value="Enterprise Web Systems">Enterprise Full-Stack System Design</option>
                <option value="Custom LLM Frameworks">Generative AI Agent Configurations</option>
                <option value="ICT Network Audits">Network & Infrastructure Audits</option>
                <option value="Bespoke Executive Coaching">Custom Corporate Staff Coaching</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-primary uppercase">Detailed Needs &amp; Systems Metrics</label>
              <textarea 
                rows={4}
                required
                placeholder="Give us insights about your infrastructure, team scale, project deliverables, and estimated launch deadlines..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-black text-white rounded-lg font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Transmit Secure Systems Inquiry</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </section>

    </div>
  );
}
