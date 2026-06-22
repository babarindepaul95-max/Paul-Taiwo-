import React, { useState } from "react";
import { Terminal, ShoppingCart, User, Menu, X, BookOpen } from "lucide-react";
import { Course } from "../types";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: Course[];
  onOpenCart: () => void;
  onOpenEnrollModal: () => void;
  enrolledCourses: string[];
}

export default function Header({
  currentTab,
  setCurrentTab,
  cart,
  onOpenCart,
  onOpenEnrollModal,
  enrolledCourses
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "home", label: "Home Page" },
    { id: "services", label: "Services" },
    { id: "courses", label: "Courses" },
    { id: "aicenter", label: "AI Center" },
    { id: "portfolio", label: "Portfolio" },
    { id: "blog", label: "Blog" },
    { id: "career", label: "Career Page" },
    { id: "about", label: "About" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 h-20">
        {/* Logo and Brand */}
        <div 
          onClick={() => setCurrentTab("home")}
          className="font-display text-base sm:text-lg font-bold text-primary flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <div className="bg-primary text-tertiary p-1.5 sm:p-2 rounded">
            <Terminal size={18} strokeWidth={2.5} className="text-tertiary-container" />
          </div>
          <div className="flex flex-col">
            <span className="leading-none tracking-tight">Apostle Paul Academy</span>
            <span className="text-[9px] sm:text-[10px] text-tertiary-container font-mono tracking-wider uppercase mt-0.5">ICT & AI Excellence</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`font-body text-xs lg:text-sm font-medium transition-colors duration-200 py-1.5 border-b-2 ${
                currentTab === tab.id
                  ? "text-primary border-primary font-semibold"
                  : "text-secondary border-transparent hover:text-primary hover:border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Buttons & Cart */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Shopping Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full hover:bg-gray-50 text-secondary hover:text-primary transition-all active:scale-95"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-tertiary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Account / Enrolled Dashboard Trigger */}
          <button 
            onClick={onOpenEnrollModal}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 border border-gray-200 text-primary text-xs sm:text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all active:scale-95"
          >
            <User size={16} />
            <span className="hidden sm:inline">
              {enrolledCourses.length > 0 ? `Dashboard (${enrolledCourses.length})` : "Student Portal"}
            </span>
          </button>

          <button
            onClick={onOpenEnrollModal}
            className="hidden lg:flex items-center gap-1.5 px-4.5 py-2 bg-primary text-white text-xs sm:text-sm font-bold shadow hover:bg-primary-container transition-all active:scale-95 rounded-lg"
          >
            <BookOpen size={16} />
            Enroll Now
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full hover:bg-gray-50 text-secondary hover:text-primary transition-all xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dynamic Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg absolute top-20 left-0 w-full animate-fadeIn z-40">
          <div className="flex flex-col p-6 space-y-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-body text-base font-medium py-2 transition-all ${
                  currentTab === tab.id
                    ? "text-primary border-l-4 border-primary pl-3 font-semibold"
                    : "text-secondary hover:text-primary pl-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenEnrollModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 bg-gray-100 text-primary font-semibold text-sm rounded-lg active:scale-95 transition-all"
              >
                My Student Portal
              </button>
              <button
                onClick={() => {
                  onOpenEnrollModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow active:scale-95 transition-all"
              >
                Enroll in a Course
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
