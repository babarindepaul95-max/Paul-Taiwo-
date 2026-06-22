import React from "react";
import { Shield, BookOpen, GraduationCap, Target, Users, MapPin, Award } from "lucide-react";

export default function AboutSection() {
  const leaders = [
    {
      name: "Pastor Paul Babarinde",
      role: "Dean of Academic Excellence",
      bio: "An industrial ICT architect with decades of experience steering software training systems globally. Pastor Paul coordinates the core tech syllabus at Apostle Paul Academy, bridging fundamental computer science with leading edge multi-layer integrations.",
      img: "/src/assets/images/pastor_paul_wine_suit_1782155821396.jpg"
    },
    {
      name: "Chioma Adebayo",
      role: "Lead Designer & HCI Advisor",
      bio: "An expert UI/UX developer specialized in spatial computing and cognitive layouts. Formerly a senior designer at visual design capitals in Lagos. Chioma leads our human-computer interaction lab.",
      img: "/src/assets/images/chioma_adebayo_1782151401642.jpg"
    },
    {
      name: "Dr. Kwame Boateng",
      role: "Director of Software Engineering",
      bio: "A research veteran with focus on server security and secure API conduits. Dr. Kwame teaches advanced state management, lazy initialization filters, and Express proxying structures.",
      img: "/src/assets/images/kwame_boateng_1782151416433.jpg"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Inception of Apostle Paul Computer Training",
      desc: "Founded as a private lab to provide crucial computer skills, networking fundamentals, and database entry systems to ambitious students."
    },
    {
      year: "2021",
      title: "Transition to Full-Stack Web ICT Academy",
      desc: "Upgraded the curriculum catalog to include comprehensive Javascript software engineering, server orchestration, and Figma UX/UI standards."
    },
    {
      year: "2024",
      title: "Inaugurating the Applied Neural Network Lab",
      desc: "Pioneered interactive artificial intelligence study hubs. Spearheaded safe full-stack Gemini API coding patterns to replace mock simulators."
    },
    {
      year: "2026",
      title: "A Global Digital Ingress",
      desc: "Empowering 5000+ active worldwide students, offering digital cohorts, on-demand AI Study advisers, and verified portfolio accreditations."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 pb-20">
      
      {/* Intro Mission Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full">
            <span>Our Credo</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-primary leading-tight">
            Pioneering Technical Ingress &amp; Master Artificial Intelligence Curriculums
          </h1>
          <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
            At Apostle Paul Academy, we believe technological competence is the single most powerful tool for human advancement. We dismantle the barriers of standard rote learning by wrapping every conceptual lecture inside high-fidelity practical engineering blocks. 
          </p>
          <p className="font-body text-secondary text-sm sm:text-base leading-relaxed">
            Our campus promotes an environment of strict integrity, intellectual curiosity, and architectural safety. Students do not just write code—they build complete digital architectures designed to handle rigorous modern constraints.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-xl aspect-video bg-gray-150">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
              alt="Students collaborating at Apostle Paul Academy" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg hidden sm:block max-w-[200px]">
            <p className="font-display text-3xl font-extrabold text-tertiary-container">100%</p>
            <p className="font-body text-[11px] uppercase tracking-wider text-gray-300 font-bold mt-1">Accredited Practical Learning</p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="font-display text-3xl font-bold text-primary">Core Academic Directives</h2>
          <p className="font-body text-secondary text-sm">Every element of our academy is built around four fundamental values that ensure student success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit mx-auto">
              <Shield size={24} />
            </div>
            <h3 className="font-display font-bold text-primary text-base">Architectural Safety</h3>
            <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
              We teach complete server-side security. Our graduates write secure API conduits and protect keys.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit mx-auto">
              <BookOpen size={24} />
            </div>
            <h3 className="font-display font-bold text-primary text-base">Rigor Curriculum</h3>
            <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
              Updated bi-annually, matching expectations of software capitals around the world.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit mx-auto">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-display font-bold text-primary text-base">AI Core Integration</h3>
            <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
              Applied network modeling and Generative AI are embedded directly into coding routines.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="p-3 bg-primary/5 text-primary rounded-lg w-fit mx-auto">
              <Users size={24} />
            </div>
            <h3 className="font-display font-bold text-primary text-base">Lifetime Counsel</h3>
            <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed">
              Continuous mentorship, active alum pipelines, and automated career counseling services.
            </p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-primary/5 py-16 px-6 sm:px-12 rounded-2xl border border-primary/10">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl font-bold text-primary">Academic Journey &amp; Milestones</h2>
            <p className="font-body text-secondary text-sm">How a simple computer room evolved into a global center for ICT &amp; AI excellence.</p>
          </div>

          <div className="relative border-l-2 border-primary/20 space-y-12 pl-6 sm:pl-10">
            {milestones.map((item, index) => (
              <div key={index} className="relative group">
                {/* Year tag indicator */}
                <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 bg-primary text-tertiary-container hover:bg-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow transition-all">
                  {item.year.slice(2)}
                </span>
                <div className="space-y-1 bg-white p-5 rounded-lg border border-gray-150/80 shadow-sm group-hover:border-tertiary transition-colors">
                  <span className="text-xs font-mono font-bold text-tertiary-container">{item.year}</span>
                  <h3 className="font-display font-bold text-primary text-base sm:text-lg leading-tight">{item.title}</h3>
                  <p className="font-body text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="font-display text-3xl font-bold text-primary">Academy Counselors &amp; Mentors</h2>
          <p className="font-body text-secondary text-sm">Learn alongside global engineering practitioners who actively direct software and AI spaces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((person, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="h-48 bg-gray-100 overflow-hidden shrink-0">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-primary text-base sm:text-lg">{person.name}</h3>
                  <p className="font-body text-xs text-tertiary-container font-mono font-bold uppercase tracking-wider">{person.role}</p>
                  <p className="font-body text-gray-500 text-xs sm:text-sm leading-relaxed pt-2">
                    {person.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50/50 mt-4">
                <div className="flex gap-2.5 items-center font-mono text-[11px] text-gray-400 font-semibold select-none">
                  <MapPin size={12} className="text-gray-300" />
                  <span>Science Campus, Ingress Block Alpha</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
