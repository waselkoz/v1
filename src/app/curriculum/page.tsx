"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Code2,
  Atom,
  Dna,
  Calculator,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FileText,
  Layers,
  GraduationCap,
  Search,
  Star,
  Clock,
  Calendar,
  Download,
  LayoutGrid,
  List,
  Check,
  X,
  ArrowLeft,
  Filter,
  Award
} from "lucide-react";
import { CurriculumGeometricBg } from "@/components/ui/curriculum-geometric-bg";
import { SyllabusDossierModal } from "@/components/ui/syllabus-dossier-modal";

export default function CurriculumPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inspectingCourseId, setInspectingCourseId] = useState<string | null>(null);
  const [expandedCourseModules, setExpandedCourseModules] = useState<{ [key: string]: boolean }>({});
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const disciplines = [
    {
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
      description:
        "Comprehensive clinical coursework spanning gross human anatomy, cellular pathology, pharmacokinetics, and diagnostic decision frameworks with 3D virtual dissections and clinical case simulations.",
      topicImage:
        "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
      track: "Pre-Med Specialist Track",
      topics: [
        "Cardiopulmonary Anatomy & Valvular Pathology",
        "Neuroanatomy & Brainstem Cranial Pathways",
        "Clinical Pharmacology & Pharmacokinetics",
        "Systemic Cellular Pathophysiology & Diagnosis"
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
            "Histopathological grading of epithelial neoplasms",
            "Coagulative vs liquefactive necrosis mechanisms",
            "Chronic granulomatous inflammation"
          ],
          lab: "Digital Light Microscopy Tissue Biopsy Diagnostics"
        },
        {
          num: "04",
          title: "Clinical Pharmacokinetics & Receptor Agonism",
          weeks: "Weeks 40–52",
          topics: [
            "First-order vs zero-order elimination kinetics",
            "Cytochrome P450 induction & drug-drug interactions",
            "Sympathomimetic & beta-blocker hemodynamic profiles",
            "Antimicrobial mechanism vectors & resistance"
          ],
          lab: "Quantitative Pharmacokinetic Dosing Simulations"
        }
      ],
      learningOutcomes: [
        "Diagnose gross anatomical lesions from clinical presentation",
        "Interpret complex multi-lead ECGs and arterial blood gas tracings",
        "Formulate evidence-based diagnostic workups for USMLE Step 1"
      ]
    },
    {
      id: "cs",
      code: "CS-240",
      title: "Distributed Systems & Kernel Architecture",
      category: "Systems & Computer Science",
      levelCategory: "Core",
      levelBadge: "Systems Engineering Track",
      length: "48 Weeks Self-Paced",
      hours: "120 Video Lessons • 36 Kernel Projects",
      prerequisites: "Computer Architecture, Data Structures, C/C++ or Rust",
      examAlignment: "ACM/IEEE CS Guidelines • Systems Engineering Core",
      accreditation: "Systems Architecture Certificate",
      description:
        "Rigorous instruction covering asymptotic analysis, kernel architecture, concurrent programming, and distributed consensus protocols with bootable multitasking operating system kernel projects.",
      topicImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      track: "Systems Engineering Track",
      topics: [
        "Virtual Memory Paging & Multi-Level Page Tables",
        "Lock-Free Concurrency & Hazard Pointers",
        "Raft & Paxos Distributed Consensus Protocols",
        "SIMD Vectorization & Tensor Accelerators"
      ],
      modules: [
        {
          num: "01",
          title: "Kernel Architecture & Hardware Memory Hierarchy",
          weeks: "Weeks 1–12",
          topics: [
            "Multi-level page tables & TLB shootdown invalidation",
            "Virtual memory translation & page fault handlers",
            "Context switching & preemptive interrupt scheduling",
            "Cache coherence (MESI) & memory barriers"
          ],
          lab: "Implementing a 64-bit Virtual Memory Subsystem in C"
        },
        {
          num: "02",
          title: "Concurrency & Lock-Free Data Structures",
          weeks: "Weeks 13–24",
          topics: [
            "Compare-and-swap (CAS) primitives & ABA problem",
            "Read-Copy-Update (RCU) synchronization in kernels",
            "Non-blocking queues & hazard pointer reclamation",
            "Priority inversion & priority inheritance protocols"
          ],
          lab: "Engineering a High-Throughput Lock-Free Concurrent Ring Buffer"
        },
        {
          num: "03",
          title: "Distributed Consensus & Fault Tolerance",
          weeks: "Weeks 25–36",
          topics: [
            "Raft protocol leader election & log replication",
            "Paxos state machines & quorum replication",
            "Byzantine Fault Tolerance & vector clocks",
            "Distributed transactions & Two-Phase Commit (2PC)"
          ],
          lab: "Deploying a Multi-Node Fault-Tolerant Key-Value Cluster"
        },
        {
          num: "04",
          title: "High-Performance Systems & Neural Accelerators",
          weeks: "Weeks 37–48",
          topics: [
            "SIMD vectorization (AVX-512 / Neon) kernels",
            "Asynchronous I/O architectures (io_uring & epoll)",
            "GPU compute pipeline & memory hierarchy",
            "High-throughput tensor memory layout optimization"
          ],
          lab: "Accelerating Matrix Multiplication with Custom SIMD Assembly"
        }
      ],
      learningOutcomes: [
        "Build a bootable multitasking operating system kernel from scratch",
        "Prove safety and liveness properties in distributed state machines",
        "Profile and eliminate CPU cache misses and lock contention"
      ]
    },
    {
      id: "biology",
      code: "BIO-310",
      title: "Molecular Biology, CRISPR & Gene Regulation",
      category: "Biological Sciences",
      levelCategory: "Advanced",
      levelBadge: "Biotechnology & Genetics Track",
      length: "44 Weeks Self-Paced",
      hours: "110 Video Lessons • 40 Simulated Labs",
      prerequisites: "Organic Chemistry, Cell Biology, General Genetics",
      examAlignment: "MCAT Chemical & Physical Foundations • Genetics Core",
      accreditation: "Biotechnology Specialist Certificate",
      description:
        "Laboratory-backed explorations into recombinant DNA technology, enzymology, cellular signal transduction, and structural biochemistry with CRISPR guide RNA design simulations.",
      topicImage:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
      track: "Biotechnology Track",
      topics: [
        "CRISPR-Cas9 & Gene Editing Mechanisms",
        "Enzyme Kinetics & Michaelis-Menten Models",
        "GPCR & RTK Signal Transduction Cascades",
        "Epigenetics & Stem Cell Reprogramming"
      ],
      modules: [
        {
          num: "01",
          title: "CRISPR-Cas9 & Precision Genomic Editing",
          weeks: "Weeks 1–11",
          topics: [
            "Guide RNA engineering & PAM sequence recognition",
            "Non-homologous end joining (NHEJ) vs HDR repair",
            "Prime editing & base editing mechanisms",
            "Off-target cutting quantification via CIRCLE-seq"
          ],
          lab: "In Vitro Cas9 Digestion & Agarose Gel Band Quantification"
        },
        {
          num: "02",
          title: "Structural Enzymology & Kinetic Regulation",
          weeks: "Weeks 12–22",
          topics: [
            "Michaelis-Menten derivation & Lineweaver-Burk models",
            "Allosteric Hill coefficients & cooperative binding",
            "Transition-state analogs & suicide inhibition",
            "Cryo-EM and X-ray crystallographic structural resolution"
          ],
          lab: "Spectrophotometric Enzyme Velocity Assays & Km Calculation"
        },
        {
          num: "03",
          title: "Cellular Signal Transduction Cascades",
          weeks: "Weeks 23–33",
          topics: [
            "G-Protein Coupled Receptor (GPCR) activation vectors",
            "Receptor Tyrosine Kinase (RTK) & MAPK/ERK cascade",
            "JAK-STAT signaling & cytokine transcription factors",
            "Apoptotic extrinsic vs intrinsic pathway cascades"
          ],
          lab: "Western Blot Phosphorylation Profiling & Densitometry"
        },
        {
          num: "04",
          title: "Epigenetics & Stem Cell Pluripotency",
          weeks: "Weeks 34–44",
          topics: [
            "DNA CpG methylation & bisulfite sequencing mechanics",
            "Histone acetyltransferase (HAT) vs HDAC dynamics",
            "Yamanaka reprogramming factors (Oct4, Sox2, Klf4)",
            "Genomic imprinting & non-coding RNA regulation"
          ],
          lab: "Quantitative RT-qPCR Gene Expression Analysis"
        }
      ],
      learningOutcomes: [
        "Design targeted guide RNA vectors with minimal off-target risks",
        "Determine enzyme catalytic efficiency and inhibition coefficients",
        "Analyze transcriptional shifts from high-throughput RNA-Seq data"
      ]
    },
    {
      id: "math",
      code: "MATH-215",
      title: "Pure & Applied Analysis, Vector Fields & Topology",
      category: "Mathematical Sciences",
      levelCategory: "Honors",
      levelBadge: "Pure Mathematics Track",
      length: "40 Weeks Self-Paced",
      hours: "100 Video Lessons • 32 Problem Sets",
      prerequisites: "Multivariable Calculus, Linear Algebra, Introduction to Proofs",
      examAlignment: "Advanced Mathematical Problem-Solving Standard",
      accreditation: "Pure Mathematics Certificate",
      description:
        "Rigorous proof-driven curricula in multivariable calculus, abstract linear algebra, differential equations, and real analysis with formal mathematical problem-solving workshops.",
      topicImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
      track: "Pure Mathematics Track",
      topics: [
        "Differential Forms & Stokes' Theorem on Manifolds",
        "Singular Value Decomposition (SVD) & Jordan Forms",
        "PDE Boundary Value Problems & Fourier Transforms",
        "Metric Space Topology & Lebesgue Integration"
      ],
      modules: [
        {
          num: "01",
          title: "Differential Forms & Stokes' Theorem on Manifolds",
          weeks: "Weeks 1–10",
          topics: [
            "Wedge products & exterior algebra on vector spaces",
            "Exterior derivative properties & Poincaré lemma",
            "Orientable smooth manifolds & boundary orientations",
            "Generalized Stokes' Theorem: proof and classical reductions"
          ],
          lab: "Formal Proof Construction & SymPy Differential Form Computation"
        },
        {
          num: "02",
          title: "Spectral Theory & Advanced Matrix Decompositions",
          weeks: "Weeks 11–20",
          topics: [
            "Characteristic polynomials & Cayley-Hamilton theorem",
            "Spectral decomposition of self-adjoint operators",
            "Singular Value Decomposition (SVD) geometry and pseudo-inverses",
            "Jordan canonical forms & nilpotent operator blocks"
          ],
          lab: "Low-Rank Matrix Approximation & Eigenface Analysis in Julia"
        },
        {
          num: "03",
          title: "Partial Differential Equations & Harmonic Analysis",
          weeks: "Weeks 21–30",
          topics: [
            "Heat equation derivation & fundamental solution",
            "Wave equation & d'Alembert's traveling wave solution",
            "Dirichlet problem for Laplace's equation & maximum principle",
            "Fourier transform in L2 and Sobolev space introduction"
          ],
          lab: "Boundary Value Problem Numerical Simulation & Heat Diffusion"
        },
        {
          num: "04",
          title: "Metric Space Topology & Real Analysis",
          weeks: "Weeks 31–40",
          topics: [
            "Open/closed balls & metric topology foundations",
            "Compactness: Heine-Borel and Bolzano-Weierstrass theorems",
            "Uniform continuity & Arzelà-Ascoli theorem",
            "Lebesgue outer measure & construction of the Lebesgue integral"
          ],
          lab: "Oral Defense of Metric Space Compactness Proofs"
        }
      ],
      learningOutcomes: [
        "Construct rigorous delta-epsilon and topological proofs independently",
        "Apply differential forms to solve physics boundary value problems",
        "Master the spectral theorem across infinite-dimensional spaces"
      ]
    },
    {
      id: "physics",
      code: "PHYS-250",
      title: "Quantum Mechanics, Electrodynamics & Laser Optics",
      category: "Physical Sciences",
      levelCategory: "Core",
      levelBadge: "Theoretical Physics Track",
      length: "46 Weeks Self-Paced",
      hours: "115 Video Lessons • 38 Virtual Physics Labs",
      prerequisites: "Multivariable Calculus, Differential Equations, Classical Mechanics",
      examAlignment: "Advanced Physics & Quantum Principles Core",
      accreditation: "Quantum Physics Specialist Certificate",
      description:
        "Mathematical and simulation foundations in Schrödinger wave mechanics, relativistic electrodynamics, and statistical thermodynamics with single-photon interference lab protocols.",
      topicImage:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000&auto=format&fit=crop",
      track: "Theoretical Physics Track",
      topics: [
        "Schrödinger Equation & Harmonic Ladder Operators",
        "Relativistic Electrodynamics & Maxwell Tensors",
        "Laser Optics, Prism Diffraction & Interferometry",
        "Statistical Mechanics & Quantum Ensembles"
      ],
      modules: [
        {
          num: "01",
          title: "Schrödinger Wave Equation & Quantum Operators",
          weeks: "Weeks 1–12",
          topics: [
            "Wave packets & Heisenberg uncertainty principle",
            "Infinite/finite square well boundary conditions",
            "Quantum harmonic oscillator via creation/annihilation operators",
            "Dirac bra-ket notation & Hermitian observables"
          ],
          lab: "Numerical Quantum Tunneling Wavefunction Simulation in Python"
        },
        {
          num: "02",
          title: "Relativistic Electrodynamics & Maxwell Tensors",
          weeks: "Weeks 13–24",
          topics: [
            "Four-vectors & Lorentz transformations in spacetime",
            "Electromagnetic field strength tensor F_mu_nu",
            "Gauge invariance & Lorenz gauge condition",
            "Lienard-Wiechert potentials & synchrotron radiation"
          ],
          lab: "Relativistic Particle Trajectory Modeling in Magnetic Dipoles"
        },
        {
          num: "03",
          title: "Laser Optics, Prism Diffraction & Interferometry",
          weeks: "Weeks 25–35",
          topics: [
            "Gaussian beam propagation & beam waist parameters",
            "Fabry-Pérot cavity resonance & finesse factors",
            "Michelson-Morley interferometry & phase sensitivity",
            "Stimulated emission & laser population inversion kinetics"
          ],
          lab: "Optical Interferometry Fringe Pattern Analysis Lab"
        },
        {
          num: "04",
          title: "Statistical Mechanics & Quantum Ensembles",
          weeks: "Weeks 36–46",
          topics: [
            "Microcanonical, canonical, and grand canonical ensembles",
            "Maxwell-Boltzmann vs Fermi-Dirac vs Bose-Einstein statistics",
            "Bose-Einstein condensation & critical temperature",
            "Density of states & Debye heat capacity model"
          ],
          lab: "Blackbody Radiation Curve Fitting & Planck Constant Estimation"
        }
      ],
      learningOutcomes: [
        "Solve the time-dependent Schrödinger equation for arbitrary potentials",
        "Calculate relativistic electromagnetic radiation patterns",
        "Quantify coherence and interference phenomena in laser cavities"
      ]
    }
  ];

  const filteredDisciplines = useMemo(() => {
    return disciplines.filter((d) => {
      const matchesCategory =
        selectedDiscipline === "all" || d.id === selectedDiscipline;
      const matchesLevel =
        selectedLevel === "all" || d.levelCategory === selectedLevel;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory && matchesLevel;

      const matchesSearch =
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.track.toLowerCase().includes(q) ||
        d.topics.some((t) => t.toLowerCase().includes(q)) ||
        d.modules.some(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.topics.some((mt) => mt.toLowerCase().includes(q)) ||
            m.lab.toLowerCase().includes(q)
        );

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [disciplines, selectedDiscipline, selectedLevel, searchQuery]);

  const activeInspectingCourse = useMemo(() => {
    if (!inspectingCourseId) return null;
    return disciplines.find((d) => d.id === inspectingCourseId) || null;
  }, [disciplines, inspectingCourseId]);

  const handleDownloadSyllabus = (courseCode: string) => {
    setDownloadSuccess(courseCode);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0d2238] font-sans antialiased selection:bg-[#10b981] selection:text-white">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Course Directory & Syllabi
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student"
              className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Student Space & Zoom</span>
            </Link>

            <Link
              href="/#admissions"
              className="px-4 py-2 bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Apply for Access
            </Link>
          </div>
        </div>
      </header>

      {/* ================= PAGE HERO BANNER ================= */}
      <section className="bg-gradient-to-b from-[#0c2340] to-[#071626] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-emerald-300 text-xs font-medium border border-white/10">
            <Award className="w-3.5 h-3.5" />
            <span>Self-Paced Online Course Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Curriculum & Course Syllabi
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Search across 5 comprehensive STEM tracks with self-paced video modules, browser-based labs, and verifiable certificates.
          </p>
        </div>
      </section>

      {/* ================= MAIN INTERACTIVE EXPLORER ================= */}
      <div className="relative bg-white overflow-hidden">
        <CurriculumGeometricBg />
        <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        {/* SEARCH & COMMAND BAR */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, course code (MED-201, CS-240), professor, exam (USMLE, Putnam), or keyword..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Catalog</span>
              </button>
            </div>
          </div>

          {/* Filter Pills: Disciplines & Academic Levels */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            {/* Discipline Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              {[
                { id: "all", label: "All Masterclasses" },
                { id: "medicine", label: "Medicine (MED)" },
                { id: "cs", label: "Computer Science (CS)" },
                { id: "biology", label: "Biology (BIO)" },
                { id: "math", label: "Mathematics (MATH)" },
                { id: "physics", label: "Physics (PHYS)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDiscipline(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedDiscipline === tab.id
                      ? "bg-[#0c2340] text-white shadow-sm font-semibold"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Level Filter Dropdown / Pills */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider shrink-0 font-medium">
                Level:
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "all", label: "All Levels" },
                  { id: "Pre-Clinical", label: "Pre-Clinical" },
                  { id: "Core", label: "Core STEM" },
                  { id: "Advanced", label: "Advanced" },
                  { id: "Honors", label: "Honors" }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedLevel === lvl.id
                        ? "bg-emerald-600 text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900 bg-slate-100"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE STATUS BAR */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredDisciplines.length}</strong> of {disciplines.length} accredited masterclasses
            {searchQuery && (
              <span> matching &ldquo;<span className="text-emerald-700 font-semibold">{searchQuery}</span>&rdquo;</span>
            )}
          </span>

          {(searchQuery || selectedDiscipline !== "all" || selectedLevel !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDiscipline("all");
                setSelectedLevel("all");
              }}
              className="text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {filteredDisciplines.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching curricula found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              No courses match your active search query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDiscipline("all");
                setSelectedLevel("all");
              }}
              className="px-5 py-2 bg-[#0c2340] text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Clear Search & Filters
            </button>
          </div>
        )}

        {/* ================= VIEW MODE 1: GRID VIEW ================= */}
        {viewMode === "grid" && filteredDisciplines.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDisciplines.map((item) => {
              const isModuleOpen = expandedCourseModules[item.id] ?? false;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.topicImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071626] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                      <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold text-[11px] rounded-md shadow-sm">
                        {item.code}
                      </span>
                      <span className="px-2.5 py-1 bg-[#0c2340]/90 backdrop-blur-md text-emerald-300 text-[10px] font-semibold tracking-wider uppercase rounded-md border border-white/10">
                        {item.levelBadge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#0c2340]/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold rounded-md flex items-center gap-1 border border-white/10">
                      <span>Self-Paced</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-semibold">
                        Aligned Exam Standard
                      </span>
                      <span className="text-xs font-semibold text-white truncate block">
                        {item.examAlignment}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-medium">CURRICULUM</span>
                          <span className="font-bold text-slate-800">4 Core Units</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-medium">DURATION</span>
                          <span className="font-bold text-slate-800">{item.length.split(" ")[0]} Weeks</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-slate-200/60">
                          <span className="text-slate-400 block text-[10px] font-medium">HOURS</span>
                          <span className="font-semibold text-slate-700 text-xs">{item.hours}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5">
                        <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block">
                          Prerequisites
                        </span>
                        <span className="text-slate-700 font-medium">{item.prerequisites}</span>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() =>
                            setExpandedCourseModules((prev) => ({
                              ...prev,
                              [item.id]: !isModuleOpen
                            }))
                          }
                          className="w-full flex items-center justify-between text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 transition-colors cursor-pointer border border-slate-200"
                        >
                          <span className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Syllabus Modules (4 Units)</span>
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                              isModuleOpen ? "rotate-180 text-emerald-600" : ""
                            }`}
                          />
                        </button>

                        {isModuleOpen && (
                          <div className="mt-2 space-y-2 text-xs border-l-2 border-emerald-500 pl-3 pt-1">
                            {item.modules.map((m) => (
                              <div key={m.num} className="space-y-1">
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                                  <span>
                                    Unit {m.num}: {m.title}
                                  </span>
                                  <span className="text-emerald-700 font-semibold text-xs">
                                    {m.weeks}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                  Lab: {m.lab}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                        <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-emerald-950 truncate">
                            Verified Certificate Track
                          </span>
                          <span className="block text-[11px] text-emerald-700 truncate">
                            {item.track} • Interactive Labs
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInspectingCourseId(item.id)}
                          className="flex-1 py-2 px-3 border border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Inspect Syllabus</span>
                        </button>

                        <Link
                          href="/#admissions"
                          className="py-2 px-4 bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm shrink-0"
                        >
                          <span>Enroll</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= VIEW MODE 2: CATALOG TABLE VIEW ================= */}
        {viewMode === "list" && filteredDisciplines.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4 font-semibold">Course Code</th>
                    <th className="py-3.5 px-4 font-semibold">Course Title & Track</th>
                    <th className="py-3.5 px-4 font-semibold">Duration & Hours</th>
                    <th className="py-3.5 px-4 font-semibold">Prerequisites</th>
                    <th className="py-3.5 px-4 font-semibold">Standard Alignment</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDisciplines.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-bold text-xs text-slate-900 block">
                          {item.code}
                        </span>
                        <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          {item.levelBadge}
                        </span>
                      </td>

                      <td className="py-4 px-4 min-w-[260px]">
                        <span className="font-bold text-sm text-slate-900 block">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {item.track} • Self-Paced Online
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs">
                        <span className="text-slate-900 font-bold block">{item.length}</span>
                        <span className="text-slate-500 text-[11px] block">{item.hours}</span>
                      </td>

                      <td className="py-4 px-4 text-slate-600 max-w-xs text-xs">
                        {item.prerequisites}
                      </td>

                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap text-xs">
                        <span className="font-semibold block">{item.examAlignment}</span>
                        <span className="text-slate-400 text-[11px] block">{item.accreditation}</span>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setInspectingCourseId(item.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            Inspect
                          </button>
                          <Link
                            href="/#admissions"
                            className="px-3.5 py-1.5 bg-[#0c2340] hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            Enroll
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      </div>

      {/* ================= FULLSCREEN ANIMATED SYLLABUS ACCORDION DOSSIER ================= */}
      <SyllabusDossierModal
        course={activeInspectingCourse}
        onClose={() => setInspectingCourseId(null)}
        onEnroll={() => {
          window.location.href = "/#admissions";
        }}
      />
    </div>
  );
}
