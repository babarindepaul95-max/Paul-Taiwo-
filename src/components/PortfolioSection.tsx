import React, { useState } from "react";
import { Search, ExternalLink, Github, Monitor, BookOpen, Star, Sparkles, Code } from "lucide-react";
import { STUDENT_PROJECTS } from "../data";

export default function PortfolioSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "AI", "Full-Stack ICT", "Data Systems"];

  const filteredProjects = STUDENT_PROJECTS.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Exact category match or ALL
    const matchesCategory = 
      activeCategory === "ALL" || 
      (activeCategory === "AI" && proj.category.includes("AI")) ||
      (activeCategory === "Full-Stack ICT" && proj.category.includes("Full-Stack")) ||
      (activeCategory === "Data Systems" && proj.category.includes("Data"));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 pb-20">
      
      {/* Page Inbound Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-display text-4xl font-extrabold text-primary">
          Student Portfolios &amp; Blueprints
        </h1>
        <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
          Explore actual high-fidelity, deployed application models created by graduates of Apostle Paul Academy under direct faculty supervision. No mock designs; pure architectural delivery.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Search student works (e.g. trading, database)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-250/90 rounded-lg text-xs sm:text-sm font-body shadow-sm focus:outline-none focus:border-primary"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>
      </section>

      {/* Categories filter banner */}
      <section className="flex justify-center border-b border-gray-150 overflow-x-auto gap-2 pb-3 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeCategory === cat
                ? "bg-primary text-white shadow-sm"
                : "text-secondary hover:text-primary hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Projects Grid Display */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Frame visual */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 bg-primary text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded">
                  {proj.category}
                </span>
              </div>

              {/* Text Specs */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-bold text-primary group-hover:text-tertiary text-lg leading-tight line-clamp-1">
                    {proj.title}
                  </h3>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-mono font-semibold px-2.5 py-0.5 rounded uppercase">
                    By {proj.student}
                  </span>
                </div>

                <p className="font-body text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {proj.description}
                </p>
              </div>
            </div>

            {/* Simulated Live Metadata and Action icons */}
            <div className="p-6 pt-0 border-t border-gray-50/50 mt-4 flex items-center justify-between">
              <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 font-bold uppercase select-none">
                <Code size={12} />
                <span>Reviewed &amp; Accredited</span>
              </div>

              <div className="flex gap-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert("Telemetry simulator: Project launched on sandbox ingress block AP-94"); }}
                  className="p-2 border border-gray-150 text-secondary hover:text-primary hover:bg-gray-50 rounded bg-white transition-colors"
                  title="Launch Live Demo"
                >
                  <ExternalLink size={14} />
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert("Redirecting to student repository sandbox..."); }}
                  className="p-2 border border-gray-150 text-secondary hover:text-primary hover:bg-gray-50 rounded bg-white transition-colors"
                  title="View Git Repos"
                >
                  <Github size={14} />
                </a>
              </div>
            </div>

          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-4">
            <Monitor size={44} className="mx-auto text-gray-300" />
            <h3 className="font-display font-bold text-primary text-base">No portfolios match search filters</h3>
            <p className="font-body text-secondary text-sm">Clear query parameters or try selecting another core discipline.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }} 
              className="px-5 py-2.5 bg-primary text-white font-semibold text-xs rounded-lg"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
