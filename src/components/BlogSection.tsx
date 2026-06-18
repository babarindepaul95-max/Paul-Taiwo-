import React, { useState } from "react";
import { BookOpen, Search, Clock, User, ChevronRight, X, Sparkles, ScrollText } from "lucide-react";
import { BlogPost } from "../types";
import { BLOGS } from "../data";

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredBlogs = BLOGS.filter((blog) => {
    return blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
           blog.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-display text-4xl font-extrabold text-primary">
          Academy Technical Journals
        </h1>
        <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
          Read strategic insights on full-stack security, human-computer interaction rhythms, and Gemini API integration patterns authored directly by Apostle Paul Academy faculty.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Search our journals (e.g., API key, design)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-body shadow-sm focus:outline-none focus:border-primary"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>
      </section>

      {/* Journals Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <div 
            key={blog.id}
            onClick={() => setSelectedPost(blog)}
            className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer h-full justify-between"
          >
            <div>
              {/* Image visuals */}
              <div className="h-44 bg-gray-100 overflow-hidden relative">
                <img 
                  src={blog.imgUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 bg-primary text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase">
                  {blog.tag}
                </span>
              </div>

              {/* Text info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-gray-400 text-[10px] font-mono font-bold uppercase">
                  <span className="flex items-center gap-1">
                    <User size={10} />
                    {blog.author.split(" ")[1]}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    3 Min Read
                  </span>
                </div>

                <h3 className="font-display font-bold text-primary group-hover:text-tertiary text-base sm:text-lg leading-tight line-clamp-2">
                  {blog.title}
                </h3>

                <p className="font-body text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Read Button */}
            <div className="p-6 pt-0 mt-4 border-t border-gray-50/50 flex justify-between items-center text-xs font-mono font-bold text-secondary group-hover:text-primary transition-all">
              <span className="text-gray-400 uppercase font-mono">{blog.date}</span>
              <span className="flex items-center gap-1 select-none">
                <span>Read Full Journal</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-16 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-4">
            <ScrollText size={44} className="mx-auto text-gray-300" />
            <h3 className="font-display font-bold text-primary text-base">No technical journal matches found</h3>
            <p className="font-body text-secondary text-sm">Clear query terms or try looking for core architectural guidelines.</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="px-5 py-2.5 bg-primary text-white font-semibold text-xs rounded-lg shadow"
            >
              Reset Search Parameters
            </button>
          </div>
        )}
      </section>

      {/* FULL-LENGTH GRAPHIC READING MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 max-w-2xl w-full max-h-[85vh] flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-primary text-white p-5 flex justify-between items-center shrink-0">
              <span className="font-mono text-[9px] bg-white/15 text-tertiary-container font-black px-3 py-1 rounded tracking-wider uppercase select-none">
                {selectedPost.tag}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body container scrollable */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 font-body text-left">
              <div className="space-y-4">
                <h1 className="font-display font-extrabold text-primary text-xl sm:text-2xl leading-tight">
                  {selectedPost.title}
                </h1>
                
                {/* Author card citation */}
                <div className="p-3.5 bg-gray-50 border border-gray-150 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-tertiary-container font-display font-bold rounded-full flex items-center justify-center text-xs border border-primary-container">
                    PA
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-xs sm:text-sm">{selectedPost.author}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold font-mono tracking-wide uppercase">{selectedPost.role} • {selectedPost.date}</p>
                  </div>
                </div>
              </div>

              {/* Graphic separation banner */}
              <div className="h-44 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={selectedPost.imgUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Core blog readability contents parsed into blocks */}
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-body whitespace-pre-wrap">
                {selectedPost.content}
              </div>
            </div>

            {/* Modal Footer actions */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-primary hover:bg-black text-white font-bold text-xs rounded-lg shadow-sm"
              >
                Finished Section Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
