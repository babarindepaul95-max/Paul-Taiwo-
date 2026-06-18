import React, { useState } from "react";
import { X, Trash2, CheckCircle2, ShoppingCart, UserCheck, ShieldCheck, HelpCircle, Loader2, BookOpen } from "lucide-react";
import { Course } from "../types";

// --- CART MODAL ---
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Course[];
  onRemoveFromCart: (courseId: string) => void;
  onCheckout: () => void;
}

export function CartModal({ isOpen, onClose, cart, onRemoveFromCart, onCheckout }: CartModalProps) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((accum, item) => accum + item.price, 0);

  const handleSimulatedCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        onCheckout();
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full border border-gray-100 flex flex-col max-h-[85vh] animate-scaleUp font-body text-left">
        
        {/* Header */}
        <div className="bg-primary text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-display font-bold">
            <ShoppingCart size={18} className="text-tertiary-container" />
            <span>My Specialty Tuition Cart</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Success Splash */}
        {isSuccess ? (
          <div className="flex-1 p-8 text-center flex flex-col justify-center items-center space-y-4 py-16">
            <div className="p-4 bg-green-100 text-green-600 rounded-full animate-bounce">
              <CheckCircle2 size={44} />
            </div>
            <h3 className="font-display font-medium text-lg text-primary">A APA Enrollment Approved!</h3>
            <p className="text-sm text-secondary">Congratulating matriculated student. Your curriculum pathway is now loaded in your Portal Dashboard.</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <ShoppingCart size={36} className="mx-auto text-gray-300" />
                  <p className="text-sm">Your enrollment cart is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4 p-4.5 bg-gray-50 border border-gray-150 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-primary text-xs sm:text-sm leading-tight line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold font-mono uppercase">{item.duration} • APA ICT CORE</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-primary text-sm">${item.price}</span>
                      <button 
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove Course"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkouts Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-secondary uppercase">Tuition Summary Total:</span>
                  <span className="font-display font-extrabold text-primary text-lg">${total}</span>
                </div>

                <button
                  onClick={handleSimulatedCheckout}
                  disabled={checkingOut}
                  className="w-full py-3 bg-primary text-white font-bold text-sm rounded-lg shadow-md hover:bg-black transition-all active:scale-95 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkingOut ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-tertiary-container" />
                      <span>Approving Matriculation Ledger...</span>
                    </>
                  ) : (
                    <span>Complete Enrollment and Checkout</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

// --- USER ADMISSIONS DASHBOARD PORTAL MODAL ---
interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourses: Course[];
  onEnrollDirectly: (course: Course) => void;
}

export function AdmissionsPortalModal({ isOpen, onClose, enrolledCourses, onEnrollDirectly }: PortalModalProps) {
  const [studentName, setStudentName] = useState("Alexander Sterling");
  const [studentEmail, setStudentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [onboarded, setOnboarded] = useState(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboarded(true);
  };

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg w-full border border-gray-100 flex flex-col max-h-[85vh] animate-scaleUp font-body text-left">
        
        {/* Header */}
        <div className="bg-primary text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-display font-bold">
            <UserCheck size={18} className="text-tertiary-container" />
            <span>Apostle Paul Academy Student Portal</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Portal contents */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {!onboarded ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center max-w-xs mx-auto space-y-2 py-4">
                <GraduationCapIcon className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-display font-bold text-primary text-base">Admissions Certification Record</h3>
                <p className="text-xs text-gray-400">Initialize your standard high-tech school card registry file below.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-primary uppercase">Full Student Name</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-primary"
                  placeholder="Enter full name for accreditation"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-primary uppercase">Admissions Email Ingress</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-primary"
                  placeholder="name@gmail.com"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-bold text-sm shadow hover:bg-black rounded-lg transition-all active:scale-95"
              >
                Log In to Student portal
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Logged in header Card */}
              <div className="bg-primary p-5 rounded-lg border border-primary-container text-white flex items-center justify-between shadow">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm sm:text-base">{studentName}</h4>
                  <p className="text-[10px] text-gray-300 font-mono font-bold uppercase tracking-wider">APA Cohort matriculant ID: #APA-0248</p>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[9px] font-bold text-[#cca830] font-mono tracking-wider">STATUS</span>
                  <span className="text-xs bg-[#cca830] text-primary font-bold px-2.5 py-0.5 rounded shadow mt-0.5 select-none">MATRICULATED</span>
                </div>
              </div>

              {/* Course syllabus status in their panel */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-primary text-sm uppercase font-mono tracking-wider">Active Cohort Engagements</h4>
                
                {enrolledCourses.length === 0 ? (
                  <div className="p-6 text-center bg-gray-50 border border-dashed border-gray-200 rounded-lg space-y-3">
                    <p className="text-xs text-gray-400">You are not actively matriculating any credit programs.</p>
                    <p className="text-xs text-secondary leading-relaxed">Add high-fidelity Specialty classes to your Cart and checkout to see active schedules here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {enrolledCourses.map((c) => (
                      <div key={c.id} className="p-4 bg-gray-50 border border-gray-150 rounded-lg flex justify-between items-center gap-4">
                        <div className="space-y-1">
                          <h5 className="font-display font-bold text-primary text-xs sm:text-sm line-clamp-1">{c.title}</h5>
                          <p className="text-[9px] text-[#cca830] font-mono font-bold uppercase tracking-widest">{c.duration} APA ACCREDITED COURSE</p>
                        </div>
                        <div className="flex items-center gap-2 select-none">
                          <ShieldCheck size={16} className="text-green-600 shrink-0" />
                          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-150">ACTIVE SYLLABUS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Certification Checklist */}
              <div className="p-4.5 bg-gray-50 rounded-lg border border-gray-150/70 space-y-2">
                <h5 className="font-display font-bold text-primary text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 border-b border-gray-200 pb-2">
                  <CheckCircle2 size={14} className="text-primary" />
                  <span>APA Pathway Completion Record</span>
                </h5>
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-500 font-body">
                    <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                    <span>Matriculate admissions file credential</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-body">
                    <CheckCircle2 size={12} className={enrolledCourses.length > 0 ? "text-green-600 shrink-0" : "text-gray-300 shrink-0"} />
                    <span>Schedule Specialty ICT &amp; AI syllabus</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-body">
                    <CheckCircle2 size={12} className="text-gray-300 shrink-0" />
                    <span>Complete 4-week personalized Roadmap checkbooks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-body">
                    <CheckCircle2 size={12} className="text-gray-300 shrink-0" />
                    <span>Obtain 80%+ on dynamic exam Diagnostics</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4.5 bg-gray-50 border-t border-gray-100 flex justify-between shrink-0">
          {onboarded && (
            <button
              onClick={() => setOnboarded(false)}
              className="text-xs text-gray-400 hover:text-red-500 font-bold"
            >
              Sign Out Securely
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary hover:bg-black text-white font-bold text-xs rounded-lg shadow-sm"
          >
            Collapse Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

// --- INDIVIDUAL COURSE DETAIL MODAL ---
interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (course: Course) => void;
  cart: Course[];
  enrolledCourses: string[];
}

export function CourseDetailModal({ course, isOpen, onClose, onAddToCart, cart, enrolledCourses }: CourseDetailModalProps) {
  if (!isOpen || !course) return null;

  const isAdded = cart.some((item) => item.id === course.id);
  const isEnrolled = enrolledCourses.includes(course.id);

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg w-full border border-gray-100 flex flex-col max-h-[85vh] animate-scaleUp font-body text-left">
        
        {/* Header visual */}
        <div className="h-44 bg-gray-100 shrink-0 relative">
          <img src={course.imgUrl} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Detailed details */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] bg-primary text-white font-mono font-bold tracking-widest px-2.5 py-1 rounded inline-block uppercase">
              {course.category} LABORATORY SYLLABUS
            </span>
            <h3 className="font-display font-extrabold text-primary text-xl leading-snug">{course.title}</h3>
            <p className="text-xs text-gray-400 font-mono font-semibold uppercase">{course.duration} TOTAL • LEVEL: {course.level}</p>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-body whitespace-pre-wrap">
            <h4 className="font-display font-bold text-primary uppercase font-mono text-xs tracking-wider border-b border-gray-100 pb-1.5">Program overview</h4>
            <p>{course.description}</p>
          </div>

          <div className="space-y-3 bg-gray-50 p-5 rounded-lg border border-gray-150/70">
            <h4 className="font-display font-bold text-primary font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={13} className="text-primary" />
              <span>Syllabus breakdown modules</span>
            </h4>
            <div className="space-y-2.5 pt-1 text-xs">
              {course.syllabus.map((topic, i) => (
                <div key={i} className="flex gap-2 items-start font-body text-gray-600 leading-relaxed">
                  <span className="w-4 h-4 bg-primary/5 text-primary text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono border border-primary/10">
                    {i + 1}
                  </span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions panel footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0 gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">Tuition Price</span>
            <span className="font-display font-extrabold text-primary text-xl">${course.price}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-transparent border border-gray-250 hover:bg-gray-100 text-primary rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>

            {isEnrolled ? (
              <span className="px-5 py-2.5 bg-green-50 text-green-700 font-bold text-xs select-none rounded-lg border border-green-200 flex items-center gap-1">
                Active Enrolled
              </span>
            ) : (
              <button
                onClick={() => {
                  onAddToCart(course);
                  onClose();
                }}
                disabled={isAdded}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5 ${
                  isAdded
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-primary text-white hover:bg-black"
                }`}
              >
                <ShoppingCart size={13} />
                <span>{isAdded ? "Added to Cart" : "Enroll immediately"}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple internal icon to replace dynamic package assets smoothly
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l-3 1.5M12 14l3 1.5m-3-1.5v6M3 13.06V17a4 4 0 008 0v-3.94" />
    </svg>
  );
}
