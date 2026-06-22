import React, { useState, useEffect } from "react";
import { Calendar, Clock, Monitor, User, Mail, CheckCircle2, Ticket, MapPin, X, Trash2 } from "lucide-react";

interface Booking {
  id: string;
  studentName: string;
  studentEmail: string;
  roomName: string;
  bookingDate: string;
  timeSlot: string;
  seatNumber: string;
  ticketCode: string;
  timestamp: string;
}

export default function RoomBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("Apostle Paul Neural-Net Lab (Ingress Alpha)");
  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("09:00 AM - 11:30 AM");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Booking | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Preset rooms
  const roomsPool = [
    { id: "room-1", name: "Apostle Paul Neural-Net Lab (Ingress Alpha)", seatsCount: 16, desc: "Powered by 8x NVIDIA H100 cores for intensive training." },
    { id: "room-2", name: "Chioma's Interaction & HCI Sandbox (Suite B)", seatsCount: 16, desc: "Equipped with high-fidelity Wacom monitors & VR testing bays." },
    { id: "room-3", name: "Dr. Kwame's Software Architecture Office Studio", seatsCount: 16, desc: "Collaborative boardroom style setup for core mentoring." },
    { id: "room-4", name: "Quiet Coding Workspace & Library (Zone 404)", seatsCount: 16, desc: "Ultra-quiet space with dual monitor workspaces." },
  ];

  // Preset Time slots
  const slotsPool = [
    "09:00 AM - 11:30 AM",
    "12:00 PM - 02:30 PM",
    "03:00 PM - 05:30 PM",
    "06:00 PM - 08:30 PM",
  ];

  // Static desk layout (16 computers in 4x4 matrix)
  const columns = ["A", "B", "C", "D"];
  const rows = [1, 2, 3, 4];

  // Simulate reserved seats dynamically depending on room & timeslot choice
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);

  // Local storage management
  useEffect(() => {
    // Load historical bookings
    const cachedBookings = localStorage.getItem("APA_room_bookings");
    if (cachedBookings) {
      try {
        setBookings(JSON.parse(cachedBookings));
      } catch (err) {
        console.error("Failed to load historical bookings", err);
      }
    }
    
    // Default date is today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Update mock reserved seats when room, date or timeslot shifts
  useEffect(() => {
    // Generate deterministic reserved seats based on room and slot to look genuine
    const valueStr = `${selectedRoom}-${bookingDate}-${selectedSlot}`;
    let hash = 0;
    for (let i = 0; i < valueStr.length; i++) {
      hash = valueStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const mockReserved: string[] = [];
    columns.forEach(col => {
      rows.forEach(row => {
        const seatId = `${col}${row}`;
        const finalVal = Math.abs((hash * seatId.charCodeAt(0)) % 100);
        if (finalVal < 35) { // 35% probability of being reserved
          mockReserved.push(seatId);
        }
      });
    });
    setReservedSeats(mockReserved);
    setSelectedSeat(null); // Reset choice
  }, [selectedRoom, bookingDate, selectedSlot]);

  // Submit and reserve seat
  const handleBookRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim() || !studentEmail.trim()) {
      setNotification("Please fill out your name and email addresses.");
      return;
    }
    if (!selectedSeat) {
      setNotification("Please click on a vacant desktop seat inside the map first.");
      return;
    }

    const ticketCode = `APA-BKN-${Math.floor(10000 + Math.random() * 90000)}-${selectedSeat}`;
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      studentName,
      studentEmail,
      roomName: selectedRoom,
      bookingDate,
      timeSlot: selectedSlot,
      seatNumber: selectedSeat,
      ticketCode,
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("APA_room_bookings", JSON.stringify(updated));
    setLastConfirmedBooking(newBooking);
    
    // Update local reserved seat list
    setReservedSeats(prev => [...prev, selectedSeat]);
    setSelectedSeat(null);
    setNotification(null);
  };

  const handleCancelBooking = (id: string, seatNo: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("APA_room_bookings", JSON.stringify(updated));
    setReservedSeats(prev => prev.filter(s => s !== seatNo));
  };

  return (
    <section id="room-booking-engine" className="bg-white border border-gray-150-80 rounded-2xl overflow-hidden shadow-xl scroll-mt-24 max-w-7xl mx-auto my-12">
      <div className="bg-primary text-white p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-tertiary-container font-mono text-xs rounded-full">
          <span>APOSTLE PAUL ACADEMY COGNITIVE SPACE PLANNER</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Interactive Campus Room &amp; Desk Reservation</h2>
        <p className="text-gray-300 font-body text-xs sm:text-sm">
          Book a technical room desk, a quiet computer space workspace, or a professional face-to-face coaching salon with our African counselors.
        </p>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Scheduling Input controls */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleBookRoomSubmit} className="space-y-5">
            <h3 className="font-display font-semibold text-primary text-lg border-b border-gray-100 pb-2">1. Booking Credentials</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter African student name (e.g., Tunde Alao)"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">Student Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email (e.g., tunde@domain.com)"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">Select Technical Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-body"
              >
                {roomsPool.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
              <p className="text-[11px] text-gray-550 leading-relaxed italic mt-1 font-body">
                {roomsPool.find(r => r.name === selectedRoom)?.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">Target Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-primary font-body"
                  />
                  <Calendar size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">Session Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-primary font-body"
                >
                  {slotsPool.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {notification && (
              <div className="p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-xs">
                {notification}
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedSeat}
              className={`w-full py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                selectedSeat
                  ? "bg-primary text-white hover:bg-black"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 size={16} />
              <span>{selectedSeat ? `Confirm Desk Reservation (${selectedSeat})` : "Select a Desks first"}</span>
            </button>
          </form>
        </div>

        {/* Center column: Beautiful Interactive Graphical Seat Layout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display font-semibold text-primary text-lg">2. Room Desktop Matrix</h3>
            <p className="text-xs text-gray-500">Pick any available computer desk inside the lab room block.</p>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 relative">
            
            {/* Front of Room Label (e.g. Projector Board) */}
            <div className="w-2/3 mx-auto py-1.5 bg-gray-200 text-gray-600 rounded text-center text-[10px] font-mono tracking-widest uppercase font-bold mb-8">
              🖥️ Projector Screen &amp; Whiteboard Area
            </div>

            {/* Desktop Graphical matrix board */}
            <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
              {columns.map(col => (
                <div key={col} className="space-y-4">
                  {rows.map(row => {
                    const seatId = `${col}${row}`;
                    const isReserved = reservedSeats.includes(seatId);
                    const isSelected = selectedSeat === seatId;

                    return (
                      <button
                        key={row}
                        type="button"
                        onClick={() => {
                          if (isReserved) return;
                          setSelectedSeat(isSelected ? null : seatId);
                        }}
                        className={`aspect-square w-full rounded-lg border flex flex-col items-center justify-center relative p-1.5 transition-all text-xs font-semibold ${
                          isReserved
                            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-tertiary-container border-primary text-white scale-105 shadow-md ring-2 ring-primary"
                              : "bg-white border-gray-200 hover:border-primary text-primary hover:bg-primary/5 active:scale-95"
                        }`}
                        title={isReserved ? `Desk ${seatId} - Fully Locked` : `Select Desk ${seatId}`}
                      >
                        <Monitor size={16} className={isReserved ? "text-gray-300" : isSelected ? "text-white" : "text-primary"} />
                        <span className="font-mono text-[10px] mt-0.5">{seatId}</span>
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 bg-primary text-white w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend Markers */}
            <div className="flex justify-center items-center gap-6 mt-8 pt-4 border-t border-gray-200 text-xs font-semibold text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-white border border-gray-200 rounded-md block"></span>
                <span>Vacant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-gray-200 border border-gray-300 rounded-md block"></span>
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-tertiary-container rounded-md block ring-1 ring-primary"></span>
                <span>Your Choice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic tickets view + reservations records history */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-primary text-lg border-b border-gray-100 pb-2">3. Ticket Center</h3>
            
            {/* Display newly generated ticket */}
            {lastConfirmedBooking ? (
              <div className="bg-gradient-to-br from-tertiary/10 to-primary/5 border-2 border-dashed border-primary rounded-xl p-5 relative animate-fadeIn space-y-3 shadow-md">
                <button 
                  onClick={() => setLastConfirmedBooking(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-0.5"
                  title="Close Ticket Display"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-bold">
                  <Ticket size={14} className="text-primary" />
                  <span>RESERVATION TICKET ISSUED</span>
                </div>
                
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block leading-none">Code ID</span>
                  <span className="font-mono text-sm font-bold text-gray-800 tracking-wider block">{lastConfirmedBooking.ticketCode}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-dashed border-gray-200 pt-2.5">
                  <div>
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Student</span>
                    <span className="text-[11px] font-bold text-gray-800 truncate block">{lastConfirmedBooking.studentName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Selected Seat</span>
                    <span className="text-[11px] font-mono font-bold text-primary block">Desk {lastConfirmedBooking.seatNumber}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-semibold text-gray-400 uppercase block">Session Schedule</span>
                  <span className="text-[11px] font-semibold text-gray-750 block">{lastConfirmedBooking.bookingDate} | {lastConfirmedBooking.timeSlot}</span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-gray-150 mt-2 flex items-center justify-center">
                  {/* Pseudo QR code */}
                  <div className="w-16 h-16 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#00113a_4px,#00113a_8px)] opacity-85" title="Academic Entrance Gate Pass Scannable"></div>
                </div>
                <p className="text-[10px] text-center text-gray-400 italic">Please bring a copy of this gate ticket to Campus Block AP-4.</p>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 border border-gray-100/85 rounded-xl text-center text-gray-450 italic text-xs py-10">
                Please register a booking above to receive your formal school gate-pass ticket.
              </div>
            )}
          </div>

          {/* Booking History logs list */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-primary text-sm uppercase tracking-wider">My Active Reservations ({bookings.length})</h4>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {bookings.map(b => (
                <div key={b.id} className="p-3 bg-white border border-gray-150 rounded-lg flex items-start justify-between gap-2 shadow-xs text-xs hover:border-primary/20 transition-all">
                  <div className="space-y-1 truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono bg-primary/5 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">Desk {b.seatNumber}</span>
                      <span className="text-[10px] text-gray-400 font-mono font-bold truncate max-w-[100px]">{b.ticketCode.slice(12)}</span>
                    </div>
                    <span className="font-semibold text-gray-800 line-clamp-1 block" title={b.roomName}>{b.roomName.split(" (")[0]}</span>
                    <span className="text-[10px] text-gray-500 block leading-none">{b.bookingDate} • {b.timeSlot.split(" - ")[0]}</span>
                  </div>
                  <button
                    onClick={() => handleCancelBooking(b.id, b.seatNumber)}
                    className="p-1 hover:bg-red-50 text-gray-350 hover:text-red-500 rounded transition-colors shrink-0"
                    title="Cancel Booking Seat"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              
              {bookings.length === 0 && (
                <span className="text-[11px] text-gray-400 italic text-center block py-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-100">No active reservations logged.</span>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
