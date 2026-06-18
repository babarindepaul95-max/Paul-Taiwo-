import React from "react";
import { Terminal, Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenEnrollModal: () => void;
}

export default function Footer({ setCurrentTab, onOpenEnrollModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-gray-300 border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Information */}
        <div className="space-y-6">
          <div 
            onClick={() => setCurrentTab("home")}
            className="font-display text-lg font-bold text-white flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="bg-white/10 text-tertiary-container p-2 rounded">
              <Terminal size={18} strokeWidth={2.5} className="text-tertiary-container" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none tracking-tight">Apostle Paul Academy</span>
              <span className="text-[10px] text-tertiary-container font-mono tracking-wider uppercase mt-0.5">ICT & AI Excellence</span>
            </div>
          </div>
          <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed">
            Leading the charge in technical training, empowering minds with practical computing knowledge and leading Artificial Intelligence curriculum.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded group transition-all text-gray-400 hover:text-white">
              <Linkedin size={16} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded group transition-all text-gray-400 hover:text-white">
              <Github size={16} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded group transition-all text-gray-400 hover:text-white">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs sm:text-sm">Quick Navigation</h3>
          <ul className="space-y-3 font-body text-xs sm:text-sm">
            {[
              { id: "home", label: "Academy Home" },
              { id: "about", label: "About Our Academy" },
              { id: "courses", label: "Specialty Course Catalog" },
              { id: "aicenter", label: "AI Center & Lab" },
              { id: "portfolio", label: "Student Portfolios" },
              { id: "blog", label: "Tech Intelligence Blog" }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => setCurrentTab(link.id)}
                  className="hover:text-tertiary-container hover:pl-1 transition-all text-left text-gray-400 duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Academic Categories */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs sm:text-sm">Discipline Hubs</h3>
          <ul className="space-y-3 font-body text-xs sm:text-sm text-gray-400">
            <li>
              <button onClick={() => setCurrentTab("courses")} className="hover:text-white transition-all text-left">
                Information &amp; Communication Tech (ICT)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("aicenter")} className="hover:text-white transition-all text-left">
                Applied Neural Network Laboratory
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("courses")} className="hover:text-white transition-all text-left">
                Data Engineering &amp; Strategic Analytics
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("courses")} className="hover:text-white transition-all text-left">
                HCI, Figma &amp; Interaction UX Design
              </button>
            </li>
            <li>
              <button onClick={onOpenEnrollModal} className="text-tertiary-container hover:underline font-semibold text-left">
                Admissions Cohorts Information
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs sm:text-sm">Contact Campus</h3>
          <div className="space-y-4 font-body text-xs sm:text-sm text-gray-400">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-tertiary-container shrink-0 mt-0.5" />
              <span>Apostle Paul High-Tech Boulevard, Science Ingress Center, Block AP-4</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-tertiary-container shrink-0" />
              <span>admissions@apostlepaulacademy.edu</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-tertiary-container shrink-0" />
              <span>+1 (555) ICT-ALGO_APA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-container py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-gray-400 font-body">
          <p>© {currentYear} Apostle Paul Academy. All rights reserved. Promoting ICT and AI Excellence globally.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Terms of Enrollment</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Honor Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
