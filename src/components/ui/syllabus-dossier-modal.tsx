"use client";

import React, { useState } from "react";
import {
  X,
  ArrowRight,
  Download,
  BookOpen,
  Award,
  CheckCircle2,
  Play,
  Cpu,
  ShieldCheck,
  Check,
  Laptop,
  ChevronLeft,
  FlaskConical,
  Layers,
  GraduationCap
} from "lucide-react";
import { SyllabusSidesBg, CourseHeroGraphicPlaque } from "@/components/ui/syllabus-abstract-bg";

export interface CourseModule {
  num: string;
  title: string;
  weeks: string;
  topics: string[];
  lab: string;
}

export interface CourseData {
  id: string;
  code: string;
  title: string;
  category: string;
  levelCategory: string;
  levelBadge: string;
  length: string;
  hours: string;
  prerequisites: string;
  examAlignment: string;
  accreditation: string;
  description: string;
  topicImage: string;
  track: string;
  topics: string[];
  modules: CourseModule[];
  learningOutcomes: string[];
}

interface SyllabusDossierModalProps {
  course: CourseData | null;
  onClose: () => void;
  onEnroll?: (course: CourseData) => void;
}

// Curated high-resolution imagery per discipline
const UNIT_IMAGES: Record<string, string[]> = {
  physics: [
    "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  ],
  cs: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
  ],
  biology: [
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop"
  ],
  math: [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop"
  ],
  medicine: [
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
  ]
};

export function SyllabusDossierModal({
  course,
  onClose,
  onEnroll
}: SyllabusDossierModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activeUnitFilter, setActiveUnitFilter] = useState<string>("all");

  if (!course) return null;

  const handleDownload = () => {
    setDownloadSuccess(course.code);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const unitImages = UNIT_IMAGES[course.id] || UNIT_IMAGES.physics;

  const displayedModules = activeUnitFilter === "all"
    ? course.modules
    : course.modules.filter((m) => m.num === activeUnitFilter);

  return (
    <div className="fixed inset-0 z-50 bg-[#f8fafc] text-[#0a2540] overflow-y-auto animate-in fade-in duration-200 flex flex-col font-sans">
      {/* ================= SIDES BACKGROUND (TURQUOISE, BLUE & GREEN SHARDS FLANKING SIDES) ================= */}
      <SyllabusSidesBg />

      {/* ================= TOP FLOATING COMMAND BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Catalog</span>
          </button>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#0c2340] text-white font-bold text-xs rounded-md shadow-xs">
              {course.code}
            </span>
            <span className="text-xs font-bold text-slate-900 hidden md:inline truncate max-w-xs">
              {course.title}
            </span>
          </div>
        </div>

        {/* Quick Jump Section Links */}
        <div className="hidden lg:flex items-center gap-1 text-xs">
          <button
            onClick={() => scrollToSection("academic-foundations")}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0a2540] hover:bg-slate-100 font-bold transition-all cursor-pointer"
          >
            Prerequisites
          </button>
          <button
            onClick={() => scrollToSection("course-modules")}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0a2540] hover:bg-slate-100 font-bold transition-all cursor-pointer"
          >
            Course Units (4)
          </button>
          <button
            onClick={() => scrollToSection("learning-outcomes")}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0a2540] hover:bg-slate-100 font-bold transition-all cursor-pointer"
          >
            Competencies
          </button>
          <button
            onClick={() => scrollToSection("verified-certificate")}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0a2540] hover:bg-slate-100 font-bold transition-all cursor-pointer"
          >
            Certificate
          </button>
        </div>

        {/* Actions: Download, Enroll, Close */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:border-teal-600 text-slate-800 hover:text-teal-800 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-600" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => onEnroll && onEnroll(course)}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 via-teal-700 to-[#0c2340] hover:from-teal-500 hover:to-teal-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            <span>Enroll in Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ================= HERO BANNER: ASYMMETRIC SPLIT WITH 3D PLAQUE ================= */}
      <section className="relative z-10 border-b border-slate-200/80 bg-white py-8 sm:py-12 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side: Course Authority & Overview */}
          <div className="space-y-4 max-w-2xl">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#0c2340] text-white font-bold text-xs rounded-md shadow-xs">
                {course.code}
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 font-bold text-xs rounded-md border border-teal-200">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-sky-50 text-sky-800 font-semibold text-xs rounded-md border border-sky-200">
                {course.levelBadge}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Self-Paced Online</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0a2540] leading-tight">
                {course.title}
              </h1>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {course.description}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Track</span>
                <span className="font-bold text-slate-900 truncate block mt-0.5">{course.track}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Pacing</span>
                <span className="font-bold text-slate-900 block mt-0.5">{course.length}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Structure</span>
                <span className="font-bold text-slate-900 block mt-0.5">{course.hours}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Certificate</span>
                <span className="font-bold text-emerald-950 block mt-0.5">Verified Digital</span>
              </div>
            </div>
          </div>

          {/* Right Side: Recreating User's Uploaded Background as a Gorgeous 3D Identity Plaque */}
          <div className="shrink-0 w-full lg:w-auto flex justify-center">
            <CourseHeroGraphicPlaque
              code={course.code}
              track={course.track}
              category={course.category}
            />
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT VIEWPORT: ALL ELEMENTS VISIBLE IN ONE FLOW ================= */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 sm:px-12 py-10 space-y-14">
        {/* Download Success Banner */}
        {downloadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block text-sm">Download Started</span>
                <span className="text-xs text-emerald-800">
                  Official syllabus PDF specification for {downloadSuccess} is downloaded.
                </span>
              </div>
            </div>
            <button
              onClick={() => setDownloadSuccess(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ================= PART 01: ACADEMIC FOUNDATIONS & PREREQUISITES ================= */}
        <section id="academic-foundations" className="space-y-5 scroll-mt-20">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 block">
                Part 01 • Academic Foundation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a2540]">
                Prerequisites & Exam Benchmark Standards
              </h2>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-lg border border-teal-200 hidden sm:inline">
              Open Curriculum
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wide">
                <Laptop className="w-4 h-4 text-teal-600" />
                <span>Required Academic Prerequisites</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-snug">
                {course.prerequisites}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Diagnostic review lessons are included free to bring you up to speed before Unit 01.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Official Exam & Standard Alignment</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-snug">
                {course.examAlignment}
              </p>
              <p className="text-xs text-teal-700 font-bold">
                {course.accreditation}
              </p>
            </div>
          </div>
        </section>

        {/* ================= PART 02: THE 4 MODULAR UNITS & LESSON BLOCKS ================= */}
        <section id="course-modules" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 block">
                Part 02 • Core Coursework
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a2540]">
                The 4 Modular Units & Practical Lab Projects
              </h2>
            </div>

            {/* Unit Filter Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs self-start sm:self-center">
              <button
                onClick={() => setActiveUnitFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeUnitFilter === "all"
                    ? "bg-white text-[#0a2540] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Units (4)
              </button>
              {course.modules.map((m) => (
                <button
                  key={m.num}
                  onClick={() => setActiveUnitFilter(m.num)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeUnitFilter === m.num
                      ? "bg-[#0c2340] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Unit {m.num}
                </button>
              ))}
            </div>
          </div>

          {/* Paced Unit Modules */}
          <div className="space-y-8">
            {displayedModules.map((m: CourseModule, mIdx: number) => {
              const actualIndex = course.modules.findIndex((mod) => mod.num === m.num);
              const unitImg = unitImages[actualIndex % unitImages.length];

              return (
                <div
                  key={m.num}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 space-y-6 hover:border-teal-300 transition-all"
                >
                  {/* Unit Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0c2340] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {m.num}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                            Unit {m.num} • {m.weeks}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold text-emerald-600">
                            Self-Paced
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#0a2540] leading-snug">
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold shrink-0">
                      <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700">
                        4 Structured Lessons
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                        Lab Deliverable Included
                      </span>
                    </div>
                  </div>

                  {/* Side-by-Side Pacing: Curated Topic Photo + 4 Distinct Lesson Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Topic Photography Banner */}
                    <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[240px] border border-slate-200 shadow-xs">
                      <img
                        src={unitImg}
                        alt={m.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/85 via-[#0a2540]/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300 block">
                          Unit Focus & Lab Deliverable
                        </span>
                        <p className="text-sm font-bold text-white leading-snug">
                          {m.title}
                        </p>
                      </div>
                    </div>

                    {/* 4 Clean Lesson Blocks (High Legibility & Distinct Pacing) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {m.topics.map((t: string, idx: number) => {
                        const types = [
                          { label: "Interactive Video (40m)", icon: Play, tag: "Video" },
                          { label: "Problem Set & Proof (35m)", icon: Cpu, tag: "Hands-on" },
                          { label: "Practical Lab Exercise (45m)", icon: FlaskConical, tag: "Lab Project" },
                          { label: "Unit Milestone Quiz (15m)", icon: CheckCircle2, tag: "Autograded" }
                        ];
                        const meta = types[idx % types.length];
                        const Icon = meta.icon;

                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2.5 hover:bg-teal-50/20 hover:border-teal-200 transition-colors"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-500">
                                Lesson {m.num}.{idx + 1}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-white text-teal-800 font-bold border border-teal-200 text-[10px]">
                                {meta.tag}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {t}
                            </p>

                            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600 font-medium">
                              <Icon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span>{meta.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practical Laboratory Deliverable Card */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-50/80 via-sky-50/50 to-emerald-50/60 border border-teal-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs uppercase tracking-wide">
                        <FlaskConical className="w-4 h-4 text-teal-700" />
                        <span>Unit Practical Project Deliverable</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {m.lab}
                      </p>
                      <p className="text-xs text-slate-600">
                        Comprehensive hands-on laboratory project with structured guidance and autograded problem sets.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white border border-teal-200 text-teal-900 font-bold text-xs shadow-2xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Required Milestone</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= PART 03: TARGET COMPETENCIES & MASTERY OUTCOMES ================= */}
        <section id="learning-outcomes" className="space-y-5 scroll-mt-20">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 block">
              Part 03 • Mastery Matrix
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a2540]">
              Target Graduation Competencies & Outcomes
            </h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#0a2540] uppercase tracking-wide block">
              Verified Technical & Conceptual Competencies
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {course.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-teal-50/40 rounded-xl border border-teal-100 flex items-start gap-3 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                  <span className="font-semibold leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PART 04: OFFICIAL VERIFIED CREDENTIAL ================= */}
        <section id="verified-certificate" className="space-y-5 scroll-mt-20">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 block">
              Part 04 • Official Credential
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a2540]">
              Verified Digital Certificate of Completion
            </h2>
          </div>

          {/* Certificate Showcase Card */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-teal-50 via-sky-50/60 to-emerald-50/40 rounded-2xl border border-teal-200 text-[#0a2540] space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                  <Award className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                    Official Course Credential
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#0a2540] mt-0.5">
                    {course.accreditation}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                    Earned upon completing the 4 core units and their corresponding laboratory projects. Includes cryptographically signed digital verification for LinkedIn and resumes.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-teal-200 rounded-xl space-y-1 sm:text-right shrink-0 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">
                  Credential Identifier
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 block">
                  CERT-2026-{course.code}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block">Instant Digital Verification</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-teal-200/80 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-teal-100">
                <span className="font-bold text-[#0a2540] block mb-0.5">100% Self-Paced</span>
                <p className="text-slate-600 text-[11px]">Learn on your own schedule with permanent lifetime access.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-teal-100">
                <span className="font-bold text-[#0a2540] block mb-0.5">Lifetime Project Access</span>
                <p className="text-slate-600 text-[11px]">Access all course materials, project guidelines, and datasets anytime.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-teal-100">
                <span className="font-bold text-[#0a2540] block mb-0.5">Verified Deliverables</span>
                <p className="text-slate-600 text-[11px]">Build 4 portfolio projects to showcase your competence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM ACTION BAR ================= */}
        <section className="p-6 sm:p-7 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h3 className="text-base font-bold text-[#0a2540]">
              Ready to start {course.title}?
            </h3>
            <p className="text-xs text-slate-500">
              Instant access to all 4 units, laboratory protocols, and verified completion tracks.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-300 hover:border-teal-600 text-slate-800 hover:text-teal-800 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => onEnroll && onEnroll(course)}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-teal-600 via-teal-700 to-[#0c2340] hover:from-teal-500 hover:to-teal-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enroll in Discipline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}