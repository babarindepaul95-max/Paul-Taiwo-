import React, { useState } from "react";
import { MessageSquare, Facebook, Instagram, Music, Send, Check, Phone, ArrowUpRight } from "lucide-react";

export default function SocialContact() {
  const [typedMessage, setTypedMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("WhatsApp");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const socialChannels = [
    {
      name: "WhatsApp",
      handle: "08062244744",
      colorClass: "bg-[#25D366] hover:bg-[#1ebd5d]",
      textColor: "text-white",
      icon: MessageSquare,
      link: "https://wa.me/2348062244744",
      introQuote: "Connect directly with Pastor Paul and our admissions assistants on WhatsApp for immediate feedback."
    },
    {
      name: "Facebook",
      handle: "ApostlePaulAcademy",
      colorClass: "bg-[#1877F2] hover:bg-[#145dbd]",
      textColor: "text-white",
      icon: Facebook,
      link: "https://facebook.com/ApostlePaulAcademy",
      introQuote: "Join our community group of 10,000+ active coders, read weekly milestones, and view lectures."
    },
    {
      name: "Instagram",
      handle: "@ApostlePaulAcademy",
      colorClass: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95",
      textColor: "text-white",
      icon: Instagram,
      link: "https://instagram.com/ApostlePaulAcademy",
      introQuote: "View student showcases, UI/UX prototype reviews, high-speed coding Reels, and facility design updates."
    },
    {
      name: "Telegram",
      handle: "APA_HighTech_Channel",
      colorClass: "bg-[#0088cc] hover:bg-[#0070a8]",
      textColor: "text-white",
      icon: Send,
      link: "https://t.me/APA_HighTech_Channel",
      introQuote: "Download direct curriculum PDFs, library zip modules, open-source code libraries, and hot tech reports."
    },
    {
      name: "TikTok",
      handle: "@ApostlePaulAcademy",
      colorClass: "bg-[#010101] hover:bg-[#1a1a1a]",
      textColor: "text-white",
      icon: Music,
      link: "https://tiktok.com/@ApostlePaulAcademy",
      introQuote: "Watch young African developers complete 24h hackathons, speedcoding breakdowns, and classroom humor!"
    }
  ];

  // Dynamically craft connection url matching standard structures
  const handleLaunchSocial = () => {
    const channel = socialChannels.find(c => c.name === selectedChannel);
    if (!channel) return;

    let finalLink = channel.link;
    if (selectedChannel === "WhatsApp" && typedMessage.trim()) {
      finalLink = `https://wa.me/2348062244744?text=${encodeURIComponent(typedMessage)}`;
    } else if (selectedChannel === "Telegram" && typedMessage.trim()) {
      finalLink = `https://t.me/APA_HighTech_Channel?text=${encodeURIComponent(typedMessage)}`;
    }

    // Safely open in new tab
    window.open(finalLink, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = (linkToCopy: string, name: string) => {
    navigator.clipboard.writeText(linkToCopy);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section id="social-communications-lobby" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left column: Channel grid cards */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary font-mono text-xs font-bold rounded-full">
              <Phone size={12} className="text-tertiary-container animate-pulse" />
              <span>COMMUNITY DIRECT LINKS</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary leading-tight">
              Connect With Us On Social Channels
            </h2>
            <p className="font-body text-secondary text-sm leading-relaxed">
              We maintain active digital corridors worldwide. Speak to admissions, browse daily speed-coding videos, consult code archives, or collaborate with student clusters across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 flex-1">
            {socialChannels.map((chan, idx) => {
              const IconComp = chan.icon;
              const isCopied = copiedLink === chan.name;

              return (
                <div 
                  key={idx}
                  className="p-5 bg-white border border-gray-100 rounded-xl hover:border-primary/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg text-white ${chan.colorClass}`}>
                        <IconComp size={18} />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-tertiary-container">
                        {chan.name}
                      </span>
                    </div>
                    
                    <span className="font-mono text-xs font-bold text-gray-800 tracking-tight block">
                      {chan.handle}
                    </span>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {chan.introQuote}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-50/70">
                    <a
                      href={chan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-primary hover:text-tertiary-container flex items-center gap-1 hover:underline flex-1"
                    >
                      <span>Join Now</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <button
                      onClick={() => handleCopyLink(chan.link, chan.name)}
                      className="px-2 py-1 text-[9px] font-mono font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-gray-500 transition-colors"
                    >
                      {isCopied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive messenger composer */}
        <div className="lg:col-span-5 bg-primary/5 border border-primary/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* subtle decoration background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 relative z-10">
            <h3 className="font-display font-extrabold text-primary text-xl">Academy Fast-Message Composer</h3>
            <p className="font-body text-xs sm:text-sm text-gray-650 leading-relaxed">
              Type your enrollment queries, course questions, or booking specifications below. Select your favorite social app, and click to start an instant structured conversation!
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            
            {/* select target app */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-gray-500 block">Select Messenger App</span>
              <div className="grid grid-cols-2 gap-2">
                {["WhatsApp", "Telegram"].map(app => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => setSelectedChannel(app)}
                    className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 select-none ${
                      selectedChannel === app
                        ? "bg-primary border-primary text-white font-extrabold"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {app === "WhatsApp" ? <MessageSquare size={13} /> : <Send size={13} />}
                    <span>{app}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* compose box */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-gray-500 block">Compose Message</span>
              <textarea
                rows={4}
                placeholder={`Type your custom query here... E.g., "Hi Pastor Paul, I want to reserve a computer lab desk for next Monday to work on full-stack AI networks!"`}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="w-full text-xs sm:text-sm p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none placeholder:text-gray-400 font-body leading-relaxed"
              ></textarea>
            </div>
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={handleLaunchSocial}
              className="w-full py-3.5 bg-primary hover:bg-black text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>Transmit Query via {selectedChannel}</span>
            </button>
            <span className="text-[10px] text-center text-gray-400 block mt-2.5 font-mono">
              Secure TLS proxy routing • Direct student handoff
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
