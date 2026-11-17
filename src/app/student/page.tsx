"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Video,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Search,
  FileText,
  Award,
  Layers,
  Laptop
} from "lucide-react";
import { SyllabusDossierModal, CourseData } from "@/components/ui/syllabus-dossier-modal";

interface ZoomSession {
  id: string;
  courseCode: string;
  courseName: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  meetingId: string;
  passcode: string;
  zoomUrl: string;
  isLive: boolean;
}

interface EnrolledCourse {
  id: string;
  code: string;
  title: string;
  track: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  currentUnit: string;
  nextLessonTitle: string;
  nextLessonDuration: string;
  nextZoomDate: string;
  labStatus: string;
  image: string;
}

interface OutlineLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface OutlineModule {
  id: string;
  title: string;
  lessons: OutlineLesson[];
}

export default function StudentSpacePage() {
  const [activeTab, setActiveTab] = useState<"courses" | "zoom" | "reader" | "resources">("courses");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string>("med-201");
  const [inspectingCourse, setInspectingCourse] = useState<CourseData | null>(null);
  const [searchOutline, setSearchOutline] = useState("");
  const [selectedZoomModal, setSelectedZoomModal] = useState<ZoomSession | null>(null);

  // Reader state
  const [activeLessonId, setActiveLessonId] = useState<string>("l-1");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    "l-1", "l-2", "l-3", "l-4", "l-5", "l-6", "l-7", "l-8"
  ]);

  // Student Profile
  const student = {
    name: "Alex Chen",
    id: "STU-2026-8841",
    track: "Pre-Med & Computational Biology Scholar",
    enrolledDate: "Spring Term 2026"
  };

  // Zoom Recitations Schedule
  const zoomSessions: ZoomSession[] = [
    {
      id: "z-1",
      courseCode: "MED-201",
      courseName: "Clinical Medicine & Human Pathology",
      topic: "Valvular Stenosis & Ventricular Pressure-Volume Diagnostics",
      date: "Today",
      time: "3:00 PM EST (in 25 mins)",
      duration: "90 mins",
      meetingId: "849 2039 1192",
      passcode: "MED2026",
      zoomUrl: "https://zoom.us/j/84920391192",
      isLive: true
    },
    {
      id: "z-2",
      courseCode: "PHYS-250",
      courseName: "Theoretical Physics & Quantum Mechanics",
      topic: "Recitation 07: Wavepacket Barrier Tunneling & Operator Proofs",
      date: "Tomorrow",
      time: "1:00 PM EST",
      duration: "60 mins",
      meetingId: "912 4431 8720",
      passcode: "QUANTUM",
      zoomUrl: "https://zoom.us/j/91244318720",
      isLive: false
    },
    {
      id: "z-3",
      courseCode: "CS-106",
      courseName: "Computer Science & Systems Architecture",
      topic: "x86-64 MMU Page Table Translation & Cache Consistency Walkthrough",
      date: "Thursday",
      time: "4:30 PM EST",
      duration: "75 mins",
      meetingId: "773 1902 4419",
      passcode: "KERNEL64",
      zoomUrl: "https://zoom.us/j/77319024419",
      isLive: false
    }
  ];

  // Enrolled Courses
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "med-201",
      code: "MED-201",
      title: "Clinical Medicine & Human Pathology",
      track: "Pre-Med Specialist Track",
      progressPercent: 68,
      completedLessons: 11,
      totalLessons: 16,
      currentUnit: "Unit 03: Cellular Pathology & Neoplastic Transformation",
      nextLessonTitle: "Oncogene Activation & Tumor Suppressor Cascades",
      nextLessonDuration: "35 mins",
      nextZoomDate: "Today @ 3:00 PM EST",
      labStatus: "Passed (98% Verified)",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "phys-250",
      code: "PHYS-250",
      title: "Theoretical Physics & Quantum Mechanics",
      track: "Theoretical Physics Track",
      progressPercent: 44,
      completedLessons: 7,
      totalLessons: 16,
      currentUnit: "Unit 02: Relativistic Electrodynamics & Tensor Calculus",
      nextLessonTitle: "Covariant Maxwell Field-Strength Tensor",
      nextLessonDuration: "40 mins",
      nextZoomDate: "Tomorrow @ 1:00 PM EST",
      labStatus: "In Progress (Due Friday)",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "cs-106",
      code: "CS-106",
      title: "Computer Science & Systems Architecture",
      track: "Systems & Architecture Track",
      progressPercent: 82,
      completedLessons: 13,
      totalLessons: 16,
      currentUnit: "Unit 04: Distributed Memory Allocators & Synchronization",
      nextLessonTitle: "Lock-Free Multi-core Synchronization",
      nextLessonDuration: "45 mins",
      nextZoomDate: "Thursday @ 4:30 PM EST",
      labStatus: "Passed (100% Verified)",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Course Reader Outline
  const courseOutline: OutlineModule[] = [
    {
      id: "m-1",
      title: "Unit 01: Gross Cardiopulmonary Anatomy",
      lessons: [
        { id: "l-1", title: "Coronary arterial vasculature anatomy", duration: "40m", completed: true },
        { id: "l-2", title: "Ventricular pressure-volume loops", duration: "35m", completed: true },
        { id: "l-3", title: "Cardiac auscultation: murmurs", duration: "30m", completed: true },
        { id: "l-4", title: "Systemic vascular resistance reflexes", duration: "25m", completed: true }
      ]
    },
    {
      id: "m-2",
      title: "Unit 02: Neuroanatomy & Brainstem Cranial Pathways",
      lessons: [
        { id: "l-5", title: "Medullary & pontine cranial nerve nuclei", duration: "45m", completed: true },
        { id: "l-6", title: "Corticospinal tract decussation", duration: "40m", completed: true },
        { id: "l-7", title: "Circle of Willis stroke syndromes", duration: "35m", completed: true },
        { id: "l-8", title: "Cerebellar ataxia & vestibular coordination", duration: "30m", completed: true }
      ]
    },
    {
      id: "m-3",
      title: "Unit 03: Cellular Pathology & Neoplastic Transformation",
      lessons: [
        { id: "l-9", title: "Oncogene activation & suppressor pathways", duration: "40m", completed: false },
        { id: "l-10", title: "Granulomatous vs suppurative inflammation", duration: "35m", completed: false },
        { id: "l-11", title: "Apoptosis vs necrosis cascades", duration: "30m", completed: false },
        { id: "l-12", title: "Metastatic dissemination & lymphatic mapping", duration: "25m", completed: false }
      ]
    },
    {
      id: "m-4",
      title: "Unit 04: Clinical Pharmacology & Pharmacokinetics",
      lessons: [
        { id: "l-13", title: "Cytochrome P450 drug clearance", duration: "40m", completed: false },
        { id: "l-14", title: "Autonomic nervous system receptors", duration: "35m", completed: false },
        { id: "l-15", title: "Antimicrobial mechanism of action", duration: "30m", completed: false },
        { id: "l-16", title: "Therapeutic index & volume of distribution", duration: "30m", completed: false }
      ]
    }
  ];

  // Full Syllabus Data for Inspector
  const syllabusData: Record<string, CourseData> = {
    "med-201": {
      id: "medicine",
      code: "MED-201",
      title: "Clinical Medicine & Human Pathology",
      category: "Pre-Med & Pre-Clinical",
      levelCategory: "Pre-Clinical",
      levelBadge: "Pre-Med Specialist Track",
      length: "52 Weeks Self-Paced",
      hours: "140 Video Lessons • 48 Virtual Labs",
      prerequisites: "Organic Chemistry, Molecular Biology, General Physiology",
      examAlignment: "USMLE Step 1 • MCAT Biological Foundations",
      accreditation: "Pre-Med Masterclass Certificate",
      description: "Comprehensive clinical coursework spanning gross human anatomy, cellular pathology, pharmacokinetics, and diagnostic decision frameworks.",
      topicImage: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
      track: "Pre-Med Specialist Track",
      topics: [
        "Cardiopulmonary Anatomy & Valvular Pathology",
        "Neuroanatomy & Brainstem Cranial Pathways",
        "Cellular Pathology & Neoplastic Transformation",
        "Clinical Pharmacology & Pharmacokinetics"
      ],
      modules: [
        {
          num: "01",
          title: "Gross Cardiopulmonary Anatomy & Valvular Hemodynamics",
          weeks: "Weeks 1–13",
          topics: [
            "Coronary arterial vasculature & myocardial infarction cascades",
            "Ventricular pressure-volume loops & Frank-Starling mechanics",
            "Cardiac auscultation: systolic & diastolic murmurs",
            "Systemic vascular resistance & baroreceptor reflexes"
          ],
          lab: "Virtual 3D Cadaveric Dissection & Echocardiogram Tracing"
        },
        {
          num: "02",
          title: "Neuroanatomy & Brainstem Cranial Pathways",
          weeks: "Weeks 14–26",
          topics: [
            "Medullary/pontine cranial nerve nuclei mapping",
            "Corticospinal tract decussation & hemiparesis",
            "Circle of Willis stroke syndromes",
            "Cerebellar ataxia & vestibular coordination"
          ],
          lab: "High-Resolution Axial/Coronal MRI Cross-Section Interpretation"
        },
        {
          num: "03",
          title: "Cellular Pathology & Neoplastic Transformation",
          weeks: "Weeks 27–39",
          topics: [
            "Oncogene activation & tumor suppressor pathways",
            "Granulomatous vs. suppurative inflammation",
            "Apoptosis vs. necrosis biochemical cascades",
            "Metastatic dissemination & lymphatic mapping"
          ],
          lab: "Digital Histopathology Biopsy Slide Review"
        },
        {
          num: "04",
          title: "Clinical Pharmacology, Receptors & Pharmacokinetics",
          weeks: "Weeks 40–52",
          topics: [
            "Cytochrome P450 drug metabolism & clearance",
            "Autonomic nervous system receptor agonists",
            "Antimicrobial mechanism of action & resistance",
            "Therapeutic index & volume of distribution"
          ],
          lab: "Dynamic Drug Dosing & Elimination Kinetic Simulator"
        }
      ],
      learningOutcomes: [
        "Interpret 12-lead EKGs and hemodynamic pressure tracings",
        "Diagnose cranial nerve deficits from neurological exams",
        "Analyze digital histopathology biopsy samples",
        "Calculate clinical pharmacokinetic clearance curves",
        "USMLE Step 1 and MCAT high-yield clinical synthesis"
      ]
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleLessonStatus = (id: string) => {
    if (completedLessonIds.includes(id)) {
      setCompletedLessonIds(completedLessonIds.filter((item) => item !== id));
    } else {
      setCompletedLessonIds([...completedLessonIds, id]);
    }
  };

  const liveMeeting = zoomSessions.find((s) => s.isLive);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0d2238] font-sans antialiased selection:bg-[#0f9596] selection:text-white flex flex-col">
      {/* ================= CLEAN TOP HEADER (NO LOGO, WEBSITE COLORS) ================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-black text-sm tracking-tight text-[#0c2340] hover:text-[#0f9596] transition-colors">
              STUDENT SPACE
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === "courses"
                    ? "bg-[#0c2340] text-white"
                    : "text-slate-600 hover:text-[#0c2340] hover:bg-slate-100"
                }`}
              >
                My Courses (3)
              </button>

              <button
                onClick={() => setActiveTab("zoom")}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "zoom"
                    ? "bg-[#0f9596] text-white"
                    : "text-slate-600 hover:text-[#0f9596] hover:bg-slate-100"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live Zoom Rooms</span>
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </button>

              <button
                onClick={() => setActiveTab("reader")}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === "reader"
                    ? "bg-[#0c2340] text-white"
                    : "text-slate-600 hover:text-[#0c2340] hover:bg-slate-100"
                }`}
              >
                Course Reader
              </button>

              <button
                onClick={() => setActiveTab("resources")}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === "resources"
                    ? "bg-[#0c2340] text-white"
                    : "text-slate-600 hover:text-[#0c2340] hover:bg-slate-100"
                }`}
              >
                Study Guides
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/curriculum"
              className="font-bold text-[#0f9596] hover:underline hidden sm:inline"
            >
              Course Catalog
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <div className="text-right">
                <span className="font-bold text-[#0c2340] block">{student.name}</span>
                <span className="text-[10px] text-slate-400 font-mono block">{student.id}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= LIVE ZOOM HIGHLIGHT STRIP ================= */}
      {liveMeeting && (
        <div className="bg-[#0c2340] text-white px-4 py-3 border-b-2 border-[#0f9596]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-[#10b981] text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Live Now</span>
              </span>
              <div>
                <span className="font-bold">{liveMeeting.courseCode}: {liveMeeting.topic}</span>
                <span className="text-slate-300 ml-2 hidden lg:inline">Meeting ID: {liveMeeting.meetingId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(liveMeeting.zoomUrl, "strip-link")}
                className="px-3 py-1 rounded bg-[#071626] hover:bg-black text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                {copiedKey === "strip-link" ? "Copied!" : "Copy Zoom Link"}
              </button>

              <a
                href={liveMeeting.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded bg-[#0f9596] hover:bg-[#0d8283] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Zoom</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ================= TAB 1: ENROLLED COURSES ================= */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                  My Enrolled Courses & Study Progression
                </h1>
                <p className="text-xs text-slate-500">
                  Track your lesson completion, submit lab deliverables, and jump straight into your coursework.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-100 font-bold text-slate-700">
                  3 Active Masterclasses
                </span>
              </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
              {enrolledCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-[#0f9596] transition-colors space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#0c2340] text-white font-mono font-bold text-[11px]">
                          {c.code}
                        </span>
                        <span className="text-xs font-bold text-[#0f9596]">
                          {c.track}
                        </span>
                        <span className="text-xs font-semibold text-[#10b981]">
                          • Enrolled
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-[#0c2340] mt-1">
                        {c.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-bold uppercase">Progress</div>
                      <div className="text-xl font-black text-[#0c2340]">{c.progressPercent}%</div>
                      <div className="text-[11px] font-semibold text-slate-500">{c.completedLessons} of {c.totalLessons} Lessons</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                    <div className="lg:col-span-3 h-28 rounded-lg overflow-hidden border border-slate-200">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="lg:col-span-6 space-y-2 text-xs">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-0.5">
                        <span className="text-[10px] font-bold uppercase text-[#0f9596] block">
                          Next Lesson:
                        </span>
                        <p className="font-bold text-[#0c2340] text-xs sm:text-sm">
                          {c.nextLessonTitle} ({c.nextLessonDuration})
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-[#10b981]/10 text-[#10b981] font-bold">
                          Lab: {c.labStatus}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#0f9596]/10 text-[#0f9596] font-bold">
                          Next Zoom: {c.nextZoomDate}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setActiveCourseId(c.id);
                          setActiveTab("reader");
                        }}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#0c2340] hover:bg-[#0f9596] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continue Course</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          const matching = zoomSessions.find((s) => s.courseCode === c.code);
                          if (matching) setSelectedZoomModal(matching);
                        }}
                        className="w-full py-2 px-4 rounded-lg bg-white border border-slate-300 hover:border-[#0f9596] text-[#0c2340] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-[#0f9596]" />
                        <span>Live Zoom Link</span>
                      </button>

                      <button
                        onClick={() => {
                          const data = syllabusData[c.id];
                          if (data) setInspectingCourse(data);
                        }}
                        className="w-full py-1.5 text-xs text-slate-500 hover:text-[#0c2340] font-bold text-center cursor-pointer"
                      >
                        Inspect Syllabus Dossier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: LIVE ZOOM RECITATIONS ================= */}
        {activeTab === "zoom" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                  Live Zoom Recitations & Faculty Office Hours
                </h1>
                <p className="text-xs text-slate-500">
                  Access direct meeting links, passcode credentials, and upcoming schedule across your enrolled tracks.
                </p>
              </div>

              <span className="text-xs font-bold text-[#10b981] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Zoom Server Online</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {zoomSessions.map((session) => (
                <div
                  key={session.id}
                  className={`bg-white rounded-xl border p-5 flex flex-col justify-between space-y-4 shadow-xs ${
                    session.isLive ? "border-2 border-[#10b981]" : "border-slate-200 hover:border-[#0f9596]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#0c2340] text-white font-mono font-bold text-xs">
                        {session.courseCode}
                      </span>
                      {session.isLive ? (
                        <span className="px-2 py-0.5 rounded bg-[#10b981] text-white text-[10px] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>LIVE NOW</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {session.date}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#0c2340] leading-snug">
                        {session.topic}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {session.courseName}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Time:</span>
                        <span className="font-bold text-[#0c2340] font-sans">{session.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Meeting ID:</span>
                        <span className="font-bold text-[#0c2340]">{session.meetingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Passcode:</span>
                        <span className="font-bold text-[#0c2340]">{session.passcode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(session.zoomUrl, session.id)}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-md transition-colors cursor-pointer"
                    >
                      {copiedKey === session.id ? "Copied!" : "Copy Link"}
                    </button>

                    <a
                      href={session.zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 py-2 px-3 text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        session.isLive ? "bg-[#10b981] hover:bg-[#059669]" : "bg-[#0c2340] hover:bg-[#0f9596]"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{session.isLive ? "Join Zoom" : "Open Room"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: COURSE READER ================= */}
        {activeTab === "reader" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
            {/* Center Study Console */}
            <div className="flex-1 p-6 lg:p-8 space-y-6">
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#0c2340] text-white font-mono text-xs font-bold">
                    MED-201
                  </span>
                  <span className="text-xs font-bold text-[#0f9596]">
                    Clinical Medicine & Human Pathology
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                  Lesson 3.2: Oncogene Activation & Tumor Suppressor Cascades
                </h2>
                <p className="text-xs text-slate-500">
                  Estimated duration: 35 minutes • Clinical Case Vignette Included
                </p>
              </div>

              {/* Lesson Summary Points */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="font-bold text-[#0c2340] block uppercase text-[11px]">
                    Core Diagnostic Objectives:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Distinguish gain-of-function proto-oncogene mutations (e.g. KRAS, BRAF, ERBB2) from loss-of-function tumor suppressors (TP53, RB1).</li>
                    <li>Analyze cell cycle checkpoints at G1/S transition mediated by Cyclin D-CDK4/6 and pRb phosphorylation.</li>
                    <li>Understand the molecular pathology of apoptosis evasion and telomerase reactivation in solid neoplasms.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#0c2340] text-sm">Key Clinical takeaway:</h4>
                  <p className="text-slate-600">
                    In bilateral retinoblastoma, a germline mutation in the RB1 gene followed by a somatic &quot;second hit&quot; inactivates pRb, causing constitutive E2F release and unchecked entry into the S phase.
                  </p>
                </div>
              </div>

              {/* Lesson Bottom Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  onClick={() => alert("Previous lesson")}
                  className="px-3.5 py-2 border border-slate-300 hover:border-slate-400 rounded-md text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => toggleLessonStatus(activeLessonId)}
                  className={`px-5 py-2 rounded-md font-bold text-xs text-white transition-colors flex items-center gap-2 cursor-pointer ${
                    completedLessonIds.includes(activeLessonId)
                      ? "bg-[#10b981] hover:bg-[#059669]"
                      : "bg-[#0f9596] hover:bg-[#0d8283]"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{completedLessonIds.includes(activeLessonId) ? "Lesson Completed" : "Mark as Completed"}</span>
                </button>

                <button
                  onClick={() => alert("Next lesson")}
                  className="px-3.5 py-2 border border-slate-300 hover:border-slate-400 rounded-md text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Course Outline Drawer */}
            <aside className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-5 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#0c2340]">Course Progress</span>
                  <span className="text-[#0f9596]">68%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0f9596] h-1.5 rounded-full w-[68%]" />
                </div>
              </div>

              {/* Search outline */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchOutline}
                  onChange={(e) => setSearchOutline(e.target.value)}
                  placeholder="Filter lessons..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-[#0c2340]"
                />
              </div>

              {/* Module Outline */}
              <div className="space-y-3 text-xs max-h-[500px] overflow-y-auto pr-1">
                {courseOutline.map((mod) => (
                  <div key={mod.id} className="space-y-1">
                    <span className="font-bold text-[#0c2340] block text-[11px] uppercase tracking-wider">
                      {mod.title}
                    </span>
                    <div className="space-y-0.5">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessonIds.includes(lesson.id);
                        const isCurrent = activeLessonId === lesson.id;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full p-2 rounded text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-white border border-[#0f9596] font-bold text-[#0c2340]"
                                : "hover:bg-white text-slate-600"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  isDone ? "bg-[#10b981]" : "bg-slate-300"
                                }`}
                              />
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* ================= TAB 4: STUDY GUIDES & RESOURCES ================= */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <h1 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                Study Guides, Formula Packets & Reference PDF Documents
              </h1>
              <p className="text-xs text-slate-500">
                Official companion guides and high-yield review materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 hover:border-[#0f9596] transition-colors">
                <div className="w-8 h-8 rounded bg-[#0c2340] text-white flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0c2340]">
                    Clinical EKG & Arrhythmia Quick Guide
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">
                    High-yield 12-lead vector analysis cheat sheet and USMLE diagnostic algorithms.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard("https://example.com/ekg-guide.pdf", "res-1")}
                  className="w-full py-2 bg-slate-100 hover:bg-[#0c2340] text-[#0c2340] hover:text-white font-bold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedKey === "res-1" ? "Downloaded!" : "Download Guide (PDF)"}</span>
                </button>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 hover:border-[#0f9596] transition-colors">
                <div className="w-8 h-8 rounded bg-[#0f9596] text-white flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0c2340]">
                    Quantum Operator Identities & Proofs
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">
                    Complete reference for Hermitian observables, ladder operators, and commutator algebra.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard("https://example.com/quantum-proofs.pdf", "res-2")}
                  className="w-full py-2 bg-slate-100 hover:bg-[#0f9596] text-[#0c2340] hover:text-white font-bold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedKey === "res-2" ? "Downloaded!" : "Download Formulas (PDF)"}</span>
                </button>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 hover:border-[#10b981] transition-colors">
                <div className="w-8 h-8 rounded bg-[#10b981] text-white flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0c2340]">
                    x86-64 Architecture Cheat Sheet
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">
                    Register conventions, PML4 virtual paging calculations, and SIMD instruction set.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard("https://example.com/x86-cheatsheet.pdf", "res-3")}
                  className="w-full py-2 bg-slate-100 hover:bg-[#10b981] text-[#0c2340] hover:text-white font-bold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedKey === "res-3" ? "Downloaded!" : "Download Sheet (PDF)"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ZOOM RECITATION DRAWER ================= */}
      {selectedZoomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border-2 border-[#0c2340] shadow-xl relative">
            <button
              onClick={() => setSelectedZoomModal(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#0f9596] block">
                {selectedZoomModal.courseCode} Recitation
              </span>
              <h3 className="text-base font-black text-[#0c2340]">
                {selectedZoomModal.topic}
              </h3>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Date:</span>
                <span className="font-bold text-[#0c2340] font-sans">{selectedZoomModal.date} @ {selectedZoomModal.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Meeting ID:</span>
                <span className="font-bold text-[#0c2340]">{selectedZoomModal.meetingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Passcode:</span>
                <span className="font-bold text-[#0c2340]">{selectedZoomModal.passcode}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => copyToClipboard(selectedZoomModal.zoomUrl, "modal-copy")}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-[#0c2340] font-bold text-xs rounded transition-colors cursor-pointer"
              >
                {copiedKey === "modal-copy" ? "Copied!" : "Copy Link"}
              </button>

              <a
                href={selectedZoomModal.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-[#0c2340] hover:bg-[#0f9596] text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Launch Zoom</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: COURSE SYLLABUS INSPECTOR ================= */}
      {inspectingCourse && (
        <SyllabusDossierModal
          course={inspectingCourse}
          onClose={() => setInspectingCourse(null)}
          onEnroll={() => {
            setInspectingCourse(null);
            setActiveTab("courses");
          }}
        />
      )}
    </div>
  );
}