"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { GeometricGridPattern } from "@/components/ui/GeometricGridPattern";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  campus: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "CampusConnect gives us a verified space exclusive to our college. From finding hackathon teammates to sharing course notes, every interaction is with real classmates.",
    author: "Rohan Varma",
    role: "CS Society & Student Council",
    campus: "Class of 2026",
    initials: "RV",
  },
  {
    quote:
      "Finding verified project partners for our 36-hour hackathon was effortless. Our CampusConnect team built our prototype in record time and took 1st place!",
    author: "Priya Patel",
    role: "Lead Developer, Dev Club",
    campus: "School of Engineering",
    initials: "PP",
  },
  {
    quote:
      "CampusConnect completely changed how student clubs announce events and exchange verified study notes. It has truly become the digital hub of our college.",
    author: "Arjun Sharma",
    role: "Club Organizer & Peer Mentor",
    campus: "School of Design",
    initials: "AS",
  },
];

export function AuthHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full min-h-160 rounded-3xl overflow-hidden p-6 xl:p-8 select-none border border-border bg-card shadow-sm">
      {/* Editorial Student Photograph */}
      <Image
        src="/images/auth-student.jpg"
        alt="College student collaborating on campus"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Subtle Top & Bottom Scrim Gradients - Leaves the center subject 100% luminous & clear */}
      <div
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top-Right: Subtle Geometric Watermark */}
      <div
        className="absolute top-6 right-6 xl:top-8 xl:right-8 z-20 pointer-events-none select-none opacity-20"
        aria-hidden="true"
      >
        <GeometricGridPattern className="w-20 h-20 xl:w-24 xl:h-24" />
      </div>

      {/* Top Bar: Minimal Brand & Verified Community Chips */}
      <div className="relative z-20 flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-tight">CampusConnect</span>
          <span className="text-white/40">&bull;</span>
          <span className="text-white/80">Campus Portal</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs text-white/90 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Network</span>
        </div>
      </div>

      {/* Bottom Section: Floating Editorial Testimonial Glass Card */}
      <div className="relative z-20 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl p-6 xl:p-7 shadow-2xl text-white flex flex-col gap-4.5">
        {/* Student Testimonial Quote */}
        <blockquote className="text-base sm:text-lg xl:text-xl font-normal leading-relaxed text-white/95 tracking-normal">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        {/* Attribution Row with Student Details & Navigation */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* Student Avatar Initials */}
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-xs flex items-center justify-center shrink-0">
              {current.initials}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {current.author}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-medium text-emerald-300">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified Student
                </span>
              </div>
              <span className="text-xs text-white/70">
                {current.role} &bull; {current.campus}
              </span>
            </div>
          </div>

          {/* Interactive Carousel Indicators & Arrow Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Slide Indicators */}
            <div className="flex items-center gap-1.5 mr-1">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/35 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Previous testimonial"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Next testimonial"
            >
              <FiArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
