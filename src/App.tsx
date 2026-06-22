import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import CoursesSection from "./components/CoursesSection";
import AICenterSection from "./components/AICenterSection";
import PortfolioSection from "./components/PortfolioSection";
import BlogSection from "./components/BlogSection";
import ServicesSection from "./components/ServicesSection";
import CareerSection from "./components/CareerSection";
import { CartModal, AdmissionsPortalModal, CourseDetailModal } from "./components/Modals";
import { Course } from "./types";
import { COURSES } from "./data";
import VoiceAgent from "./components/VoiceAgent";

export default function App() {
  // Navigation tabs state
  const [currentTab, setCurrentTab] = useState<string>("home");

  // Local storage cache hooks for enrolled paths
  const [cart, setCart] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  
  // Overlay indicators
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Sync enrolled course ids with client local storage
  useEffect(() => {
    const savedIds = localStorage.getItem("APA_enrolled_courses");
    if (savedIds) {
      try {
        setEnrolledCourseIds(JSON.parse(savedIds));
      } catch (e) {
        console.error("Failed to parse cached enrollment keys", e);
      }
    }
  }, []);

  // Update localStorage when enrollment ID changes
  const updateEnrolledIds = (newIds: string[]) => {
    setEnrolledCourseIds(newIds);
    localStorage.setItem("APA_enrolled_courses", JSON.stringify(newIds));
  };

  // Add course to student cart
  const handleAddToCart = (course: Course) => {
    if (cart.some((item) => item.id === course.id)) return;
    setCart((prev) => [...prev, course]);
    setIsCartOpen(true);
  };

  // Remove individual course from cart
  const handleRemoveFromCart = (courseId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== courseId));
  };

  // Checkout and complete admissions/enrollment paths
  const handleCheckout = () => {
    const freshEnrolledIds = [
      ...enrolledCourseIds,
      ...cart.map((item) => item.id).filter((id) => !enrolledCourseIds.includes(id))
    ];
    updateEnrolledIds(freshEnrolledIds);
    setCart([]); // Clear cart
  };

  // Enrich enrollment portal details
  const getEnrolledFullCourses = (): Course[] => {
    return COURSES.filter((c) => enrolledCourseIds.includes(c.id));
  };

  // Scroll to top when tab switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-background text-on-background font-body flex flex-col justify-between selection:bg-tertiary-container selection:text-white overflow-x-hidden">
      
      {/* Dynamic Header */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenEnrollModal={() => setIsEnrollOpen(true)}
        enrolledCourses={enrolledCourseIds}
      />

      {/* Main Sections Body */}
      <main className="pt-20 flex-1 w-full relative">
        {currentTab === "home" && (
          <HomeSection 
            setCurrentTab={setCurrentTab}
            onAddToCart={handleAddToCart}
            cart={cart}
            onOpenEnrollModal={() => setIsEnrollOpen(true)}
            onSelectCourse={(c) => setSelectedCourse(c)}
          />
        )}

        {currentTab === "about" && <AboutSection />}

        {currentTab === "courses" && (
          <CoursesSection 
            onAddToCart={handleAddToCart}
            cart={cart}
            enrolledCourses={enrolledCourseIds}
            onSelectCourse={(c) => setSelectedCourse(c)}
          />
        )}

        {currentTab === "aicenter" && <AICenterSection />}

        {currentTab === "portfolio" && <PortfolioSection />}

        {currentTab === "services" && <ServicesSection />}

        {currentTab === "career" && <CareerSection />}

        {currentTab === "blog" && <BlogSection />}
      </main>

      {/* Elegant Footer */}
      <Footer 
        setCurrentTab={setCurrentTab}
        onOpenEnrollModal={() => setIsEnrollOpen(true)}
      />

      {/* auxiliary overlays */}
      
      {/* 1. Tuition Checkout Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* 2. Admissions, credentials, and portfolios Student Dashboard */}
      <AdmissionsPortalModal 
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        enrolledCourses={getEnrolledFullCourses()}
        onEnrollDirectly={handleAddToCart}
      />

      {/* 3. Syllabus and details inspection dialog */}
      <CourseDetailModal 
        course={selectedCourse}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        onAddToCart={handleAddToCart}
        cart={cart}
        enrolledCourses={enrolledCourseIds}
      />

      {/* Dynamic Voice Agent */}
      <VoiceAgent 
        onNavigateTab={(tab) => setCurrentTab(tab)}
        onOpenBooking={() => {
          setCurrentTab("home");
          setTimeout(() => {
            document.getElementById("room-booking-engine")?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }}
      />

    </div>
  );
}
