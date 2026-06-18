import React, { useState } from "react";
import { BookOpen, ShoppingCart, Search, ChevronDown, ChevronUp, Star, Sparkles, Check, Info } from "lucide-react";
import { Course } from "../types";
import { COURSES } from "../data";

interface CoursesSectionProps {
  onAddToCart: (course: Course) => void;
  cart: Course[];
  enrolledCourses: string[];
  onSelectCourse: (course: Course) => void;
}

export default function CoursesSection({
  onAddToCart,
  cart,
  enrolledCourses,
  onSelectCourse
}: CoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>(""),
    [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  const categories = ["ALL", "ICT", "AI", "DATA", "DESIGN"];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === "ALL" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSyllabus = (courseId: string) => {
    if (expandedSyllabus === courseId) {
      setExpandedSyllabus(null);
    } else {
      setExpandedSyllabus(courseId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 pb-20">
      
      {/* Search Header */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="font-display text-4xl font-extrabold text-primary">
          Explore Specialty Academic Catalogs
        </h1>
        <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
          Unlock high-fidelity training curated by technical leaders. Toggle categories and filter syllabus maps to establish your customized path toward accreditation.
        </p>

        {/* Big Search Input */}
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search curricula programs (e.g., Python, Figma, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-body shadow-sm focus:outline-none focus:border-primary"
          />
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
        </div>
      </section>

      {/* Category Pills Slider */}
      <section className="flex flex-col gap-6">
        <div className="flex border-b border-gray-150 overflow-x-auto gap-2 pb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs sm:text-sm font-bold transition-all rounded-lg scroll-mt-2 truncate ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-secondary hover:text-primary hover:bg-gray-100 bg-transparent"
              }`}
            >
              {cat === "ALL" ? "All Disciplines" : `${cat} Laboratory`}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-400 font-mono flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-150">
          <span>Displaying {filteredCourses.length} Programs</span>
          <span className="hidden sm:inline">● ACCREDITED ACADEMY PATHS</span>
        </div>
      </section>

      {/* Courses Catalog Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => {
          const isAdded = cart.some((item) => item.id === course.id);
          const isEnrolled = enrolledCourses.includes(course.id);
          const syllabusIsOpen = expandedSyllabus === course.id;

          return (
            <div 
              key={course.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Course Visual Frame */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <img 
                    src={course.imgUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary/95 text-white font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                      {course.category}
                    </span>
                    <span className="bg-white/95 backdrop-blur-md text-primary font-body text-[10px] font-bold px-2 py-1 rounded">
                      {course.level}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-primary text-tertiary-container font-mono text-[10px] font-bold px-2 py-1 rounded border border-primary-container/20 shadow-sm">
                    {course.duration}
                  </div>
                </div>

                {/* Course Details Text */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display font-bold text-primary text-lg leading-tight h-14 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="font-body text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] font-mono font-semibold text-gray-500">
                    <div className="px-2 py-1 bg-gray-50 rounded border border-gray-100">
                      Accredited Course
                    </div>
                    <div className="px-2 py-1 bg-gray-50 rounded border border-gray-100">
                      Portfolio-Led Exams
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Area */}
              <div className="p-6 pt-0 border-t border-gray-50/50 mt-4 space-y-4">
                {/* Expand Syllabus Button */}
                <button
                  onClick={() => toggleSyllabus(course.id)}
                  className="w-full flex items-center justify-between py-2 text-xs font-mono font-bold text-secondary hover:text-primary border-b border-dashed border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} className="text-secondary" />
                    {syllabusIsOpen ? "Collapse Syllabus" : "Expand Full Week-by-Week Syllabus"}
                  </span>
                  {syllabusIsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {/* Syllabus expanded list */}
                {syllabusIsOpen && (
                  <div className="bg-gray-50 p-4 rounded-lg text-xs space-y-2.5 border border-gray-150 animate-slideDown">
                    <p className="font-semibold text-primary uppercase text-[10px] tracking-wider mb-2 font-mono">Curriculum Syllabus Modules:</p>
                    {course.syllabus.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start font-body">
                        <Check size={12} className="text-tertiary-container shrink-0 mt-0.5" />
                        <span className="text-gray-600 line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing and Action trigger */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">Tuition Cost</span>
                    <span className="font-display font-extrabold text-primary text-xl">${course.price}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      title="View Course Info"
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-primary transition-all border border-gray-150"
                    >
                      <Info size={16} />
                    </button>

                    {isEnrolled ? (
                      <span className="px-4 py-2.5 bg-green-50 text-green-700 font-bold text-xs select-none rounded-lg border border-green-250 flex items-center gap-1.5 shrink-0">
                        <Check size={14} strokeWidth={3} />
                        Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => onAddToCart(course)}
                        disabled={isAdded}
                        className={`px-5 py-2.5 rounded-lg text-xs font-bold shadow hover:shadow-md transition-all flex items-center justify-center gap-2 select-none shrink-0 ${
                          isAdded
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                            : "bg-primary text-white hover:bg-black"
                        }`}
                      >
                        <ShoppingCart size={14} />
                        <span>{isAdded ? "Added to Cart" : "Add to Cart"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="col-span-full py-16 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-4">
            <BookOpen size={44} className="mx-auto text-gray-400" />
            <h3 className="font-display font-bold text-primary text-lg">No curricula match your filters</h3>
            <p className="font-body text-secondary text-sm">Try broadening your queries (e.g. "Web", "AI", "Mastery").</p>
            <button 
              onClick={() => { setSelectedCategory("ALL"); setSearchQuery(""); }} 
              className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-lg shadow"
            >
              Reset Search Parameters
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
