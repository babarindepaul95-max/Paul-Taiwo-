import React, { useState } from "react";
import { ZoomIn, X, Landmark, Camera, Users, Sparkles } from "lucide-react";

export default function TechGallery() {
  const [activePic, setActivePic] = useState<number | null>(null);

  const images = [
    {
      url: "/src/assets/images/gallery_lab_1782151434152.jpg",
      title: "Interactive AI Lab Ingress Alpha",
      desc: "Young African cohort students collaborating on deep neural network architectures and multi-layered web API controllers inside Block AP-4.",
      tag: "Computer Lab"
    },
    {
      url: "/src/assets/images/gallery_grad_1782151450900.jpg",
      title: "Senior Cohort Graduation Ceremony",
      desc: "Proud African graduates holding their accredited software engineering certifications, ready to join leading tech hubs as industry frontliners.",
      tag: "Graduation Completers"
    },
    {
      url: "/src/assets/images/gallery_code_1782151466981.jpg",
      title: "Continuous Creative Coding Workshop",
      desc: "Sleek back-lit workspace close-up highlighting standard software practices, building Express servers, database JOIN tables, and secure API conduits.",
      tag: "Hands-on Programming"
    },
    {
      url: "/src/assets/images/gallery_lectur_1782151481246.jpg",
      title: "Technical Lecture & Neural Modeling",
      desc: "Our senior software coaches leading mathematical breakdowns of self-attention matrices on whiteboards, answering questions on-the-fly.",
      tag: "HCI & AI Core"
    }
  ];

  return (
    <section id="academy-media-gallery" className="max-w-7xl mx-auto px-6 py-12 space-y-6 scroll-mt-24">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary font-mono text-xs font-bold rounded-full">
          <Camera size={12} className="text-tertiary-container" />
          <span>PORTRAYING ACADEMIC EXCELLENCE</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-primary">Campus Lifecycles Photo Gallery</h2>
        <p className="font-body text-secondary text-sm">
          A visual look at daily technical operations, state-of-the-art computers, and our graduating African student elite.
        </p>
      </div>

      {/* Grid of 4 pictures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {images.map((img, index) => (
          <div 
            key={index}
            onClick={() => setActivePic(index)}
            className="group cursor-pointer bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-tertiary-container shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden bg-gray-150 relative shrink-0">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 inline-block bg-primary text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
                {img.tag}
              </span>
              
              {/* Zoom Trigger overlay */}
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white/95 rounded-full shadow-lg text-primary transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1 gap-2">
              <h3 className="font-display font-bold text-sm sm:text-base text-primary line-clamp-1">{img.title}</h3>
              <p className="font-body text-gray-500 text-xs line-clamp-2 leading-relaxed">
                {img.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image zoom modal */}
      {activePic !== null && (
        <div 
          onClick={() => setActivePic(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20 relative animate-scaleIn"
          >
            <button 
              onClick={() => setActivePic(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/75 hover:bg-black text-white rounded-full shadow transition-colors"
              title="Close Gallery View"
            >
              <X size={18} />
            </button>

            <div className="h-[280px] sm:h-[460px] bg-black">
              <img 
                src={images[activePic].url} 
                alt={images[activePic].title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white border-t border-gray-150/80 space-y-2">
              <span className="inline-block px-2.5 py-1 bg-primary/5 text-primary font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">
                {images[activePic].tag}
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-primary leading-tight">
                {images[activePic].title}
              </h3>
              <p className="font-body text-secondary text-sm leading-relaxed">
                {images[activePic].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
