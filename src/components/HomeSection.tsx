import React, { useState } from "react";
import { ArrowRight, Sparkles, ShoppingCart, Info, BookOpen, Star, HelpCircle, GraduationCap } from "lucide-react";
import { Course, StudentProject } from "../types";
import { COURSES, TESTIMONIALS, STUDENT_PROJECTS } from "../data";

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
  onAddToCart: (course: Course) => void;
  cart: Course[];
  onOpenEnrollModal: () => void;
  onSelectCourse: (course: Course) => void;
}

export default function HomeSection({
  setCurrentTab,
  onAddToCart,
  cart,
  onOpenEnrollModal,
  onSelectCourse
}: HomeSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Categories list
  const categories = ["ALL", "ICT", "AI", "DATA", "DESIGN"];

  // Filter courses based on selections
  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === "ALL" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[550px] lg:min-h-[640px] flex items-center overflow-hidden circuit-bg pt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          
          <div className="space-y-8 animate-fadeIn">
            {/* Awesome tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 text-tertiary font-mono text-xs rounded-full border border-tertiary/20 select-none">
              <Sparkles size={14} className="text-tertiary-container animate-pulse" />
              <span>The Future of Learning is Here</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight">
              Empowering People Through Technology and <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary-container">Artificial Intelligence</span>
            </h1>
            
            <p className="font-body text-base sm:text-lg text-secondary max-w-xl leading-relaxed">
              Master the skills of tomorrow today. Join thousands of students globally in our advanced curriculum designed by industry experts.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onOpenEnrollModal}
                className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-xl hover:shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center gap-2"
              >
                Enroll Now
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setCurrentTab("aicenter")}
                className="px-8 py-4 bg-white/70 backdrop-blur-md border border-gray-200 hover:border-primary text-primary font-bold rounded-lg hover:bg-white transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Initialize Student AI Advisor</span>
                <Sparkles size={16} className="text-tertiary-container" />
              </button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img 
                className="w-full h-[460px] object-cover rounded-lg" 
                alt="Tech enthusiast analyzing code and AI neural networks" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL6vsIxfzU3jadxMP7BJrevDEFhBzr48UveHHjjGRtgh0JqRl5ZLJfMEYlN_sq8b6ca_ycvXKqN_SlroFnyhL_FnHNL2CSORFViy8oKTG-u5moEOBBWIS-3wgMfT4B-k3eZTk3JPwi7cxU26yAelHD_SxC2cBjtMs-UAgIJ6BfdtcfpozQJe6rzR3rELauxFx_BjbwAkeHbLYl6l7WcFJr3xpKyVXcBGCtmnvvo5WjlM51v2MQ0sEl7wNEtY7OUQnWOfz8V2qWgYc"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Art vectors behind hero picture */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl animate-pulse -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12 shadow px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div className="space-y-2 p-4">
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-tertiary-container">5000+</div>
            <div className="text-gray-300 font-mono text-xs uppercase tracking-widest font-semibold">Global Students Enrolled</div>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-primary-container py-6 md:py-4 px-4">
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-tertiary-container">50+</div>
            <div className="text-gray-300 font-mono text-xs uppercase tracking-widest font-semibold">Industry Experts &amp; Mentors</div>
          </div>
          <div className="space-y-2 p-4">
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-tertiary-container">20+</div>
            <div className="text-gray-300 font-mono text-xs uppercase tracking-widest font-semibold">Professional Tech Programs</div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="scroll-mt-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-extrabold">
              Advance Your Career with Expert-Led Courses
            </h2>
            <p className="text-secondary font-body text-sm sm:text-base">
              Explore our popular curricula designed to turn high-potential candidates into modern technology architects.
            </p>
          </div>
          <button 
            onClick={() => setCurrentTab("courses")}
            className="text-primary font-bold hover:text-tertiary-container flex items-center gap-2 hover:gap-4 transition-all duration-300 shrink-0 font-body"
          >
            <span>View All Course Syllabus Catalog</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Categories filters & search box */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
          <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all rounded-lg select-none ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow"
                    : "bg-gray-100 text-secondary hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
            />
            <Sparkles size={16} className="absolute right-3.5 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.slice(0, 4).map((course) => {
            const isInCart = cart.some((item) => item.id === course.id);

            return (
              <div 
                key={course.id}
                className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-tertiary-container hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={course.title}
                    src={course.imgUrl}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-primary text-white text-[10px] font-mono font-bold tracking-wider rounded">
                    {course.category}
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold rounded">
                    {course.duration}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-primary group-hover:text-tertiary text-base sm:text-lg leading-tight line-clamp-2 h-12">
                      {course.title}
                    </h3>
                    <p className="font-body text-gray-500 text-xs sm:text-sm line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="font-display font-extrabold text-primary text-base sm:text-lg">
                      ${course.price}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectCourse(course)}
                        title="View Course Syllabus Info"
                        className="p-2 bg-gray-50 text-secondary hover:text-primary hover:bg-gray-100 rounded-lg transition-colors border border-gray-200/50"
                      >
                        <Info size={16} />
                      </button>
                      
                      <button
                        onClick={() => onAddToCart(course)}
                        disabled={isInCart}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isInCart
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-black"
                        }`}
                      >
                        <ShoppingCart size={12} />
                        <span>{isInCart ? "Added" : "Enroll"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-4">
              <GraduationCap size={40} className="mx-auto text-gray-400" />
              <p className="font-body text-secondary text-sm">No courses matching your filters. Explore full catalog.</p>
              <button 
                onClick={() => { setSelectedCategory("ALL"); setSearchQuery(""); }} 
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* High Authority Philosophy Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary font-mono text-xs font-bold rounded-full">
              <span>Apostle Paul Architectural Paradigm</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-extrabold leading-tight">
              A Hybrid Core: Aligning Strict Industrial ICT &amp; Secure Gemini Integrations
            </h2>
            
            <p className="font-body text-secondary leading-relaxed text-sm sm:text-base">
              Apostle Paul Academy is engineered differently. Rather than replicating standard web playgrounds, we teach rigorous enterprise-grade engineering principles. Our students understand why exposing LLM client-side keys is dangerous, how to orchestrate full-stack Express proxies, and why clean modular React state is critical.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-lg text-primary">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary text-sm sm:text-base">Elite Syllabus Validation</h4>
                  <p className="font-body text-gray-500 text-xs sm:text-sm">Course syllabus covers secure APIs, containerization, vector databases, and advanced LLM architectures.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-lg text-primary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary text-sm sm:text-base">Cognitive Lab Practice</h4>
                  <p className="font-body text-gray-500 text-xs sm:text-sm">Students immediately project real-world applications evaluated directly by physical AI Examiners on-the-fly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-150/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-primary mb-2">94%</div>
                <div className="font-display font-bold text-sm text-gray-800">Job Placement Rate</div>
                <p className="font-body text-xs text-gray-500 mt-1">Within 6 months post-graduation.</p>
              </div>

              <div className="bg-primary text-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-3xl font-extrabold text-tertiary-container mb-2">350+</div>
                <div className="font-display font-bold text-sm">Industrial Partners</div>
                <p className="font-body text-xs text-gray-300 mt-1">Recruiting global elite talents.</p>
              </div>
            </div>

            <div className="space-y-5 pt-8">
              <div className="bg-white p-6 rounded-xl border border-gray-150/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-primary mb-2">100%</div>
                <div className="font-display font-bold text-sm text-gray-800">Practical Projects</div>
                <p className="font-body text-xs text-gray-500 mt-1">Zero simulation, real-world deployments.</p>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-3xl font-extrabold text-primary mb-2">24h</div>
                <div className="font-display font-bold text-sm text-gray-800">On-Call LLM Support</div>
                <p className="font-body text-xs text-secondary mt-1">AI advisors available on every course loop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Student Portfolios */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <h2 className="font-display text-3xl font-bold text-primary">Student Portfolios &amp; Blueprints</h2>
          <p className="font-body text-secondary text-sm">Review actual capstone applications built, optimized, and deployed by our advanced cohort graduates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDENT_PROJECTS.map((proj) => (
            <div 
              key={proj.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="h-44 bg-gray-100 overflow-hidden relative">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 inline-block bg-primary/95 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  {proj.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-bold text-primary text-base line-clamp-1">{proj.title}</h3>
                  <span className="text-xs bg-gray-100 font-semibold px-2 py-0.5 rounded text-gray-600 truncate max-w-[100px]" title={`Student: ${proj.student}`}>{proj.student}</span>
                </div>
                <p className="font-body text-gray-500 text-xs leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-16 scroll-mt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
            <h2 className="font-display text-3xl font-bold text-primary">Student Success Stories</h2>
            <p className="font-body text-secondary text-sm">Hear from our alumni who successfully transitioned from tech enthusiasts into high-performing industry anchors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="glass-card p-8 rounded-xl shadow border-t-4 border-primary bg-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-tertiary-container gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="font-body text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover bg-gray-200 border border-gray-300" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold text-primary">{t.name}</h4>
                    <p className="font-body text-[11px] text-gray-500 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
