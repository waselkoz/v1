"use client";

import React, { useState, useMemo } from "react";
import {
  Stethoscope,
  Code2,
  Atom,
  Dna,
  Calculator,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  BookOpen,
  Award,
  Users,
  Compass,
  FileText,
  Layers,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Search,
  Star,
  Clock,
  Calendar,
  Download,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Check
} from "lucide-react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inspectingCourseId, setInspectingCourseId] = useState<string | null>(null);
  const [expandedCourseModules, setExpandedCourseModules] = useState<{ [key: string]: boolean }>({});
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [openAccordionIds, setOpenAccordionIds] = useState<{ [key: string]: boolean }>({
    overview: true,
    module_0: true,
    module_1: true,
    module_2: false,
    module_3: false,
    faculty: true
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAllAccordions = () => {
    setOpenAccordionIds({
      overview: true,
      module_0: true,
      module_1: true,
      module_2: true,
      module_3: true,
      faculty: true
    });
  };

  const collapseAllAccordions = () => {
    setOpenAccordionIds({
      overview: false,
      module_0: false,
      module_1: false,
      module_2: false,
      module_3: false,
      faculty: false
    });
  };

  const [formData, setFormData] = useState({
    name: "Marcus Vance",
    email: "m.vance@stanford.edu",
    major: "Medicine",
    year: "Sophomore (Year 2)",
    notes: "Clinical anatomy and cardiovascular physiology"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ACCURATE DISCIPLINE & TOPIC PHOTOGRAPHY FOR THE SKEWED 3D PERSPECTIVE STREAM
  const streamImages = [
    {
      src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
      tag: "Medicine",
      alt: "Anatomy & Stethoscope"
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      tag: "Computer Science",
      alt: "Algorithms & Terminal Code"
    },
    {
      src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
      tag: "Biology",
      alt: "Optical Microscope Specimen"
    },
    {
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
      tag: "Mathematics",
      alt: "Calculus & Integrals Chalkboard"
    },
    {
      src: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000&auto=format&fit=crop",
      tag: "Physics",
      alt: "Laser Optics Prism Diffraction"
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop",
      tag: "Medicine",
      alt: "Neuroanatomy & Brain Scans"
    },
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
      tag: "Medicine",
      alt: "Clinical Radiology & Diagnostics"
    },
    {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      tag: "Computer Science",
      alt: "Software Engineering Lab"
    },
    {
      src: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1000&auto=format&fit=crop",
      tag: "Biology",
      alt: "Microbiology Cell Culture"
    },
    {
      src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop",
      tag: "Mathematics",
      alt: "Geometry & Trigonometry Proofs"
    },
    {
      src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
      tag: "Physics",
      alt: "Quantum Laboratory Apparatus"
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      tag: "Computer Science",
      alt: "Microprocessor Architecture"
    }
  ];

  // The 5 Core University Masterclasses with explicit academic syllabus architecture
  const disciplines = [
    {
      id: "medicine",
      code: "MED-201",
      title: "Clinical Medicine & Human Pathology",
      category: "Pre-Med & Pre-Clinical",
      levelCategory: "Pre-Clinical",
      levelBadge: "Upper-Division Pre-Med",
      units: "4.0 Units",
      length: "52 Weeks Comprehensive",
      hours: "140 Lecture Hours • 48 Dissection Labs",
      rating: "4.97",
      enrolledCount: "8,420 Undergrads",
      prerequisites: "Organic Chemistry, Molecular Biology, General Physiology",
      examAlignment: "USMLE Step 1 • MCAT Biological Foundations",
      accreditation: "Harvard Med & Johns Hopkins Syllabi Aligned",
      description:
        "Comprehensive clinical coursework spanning gross human anatomy, cellular pathology, pharmacokinetics, and diagnostic decision frameworks with 3D virtual dissections and clinical case recitations.",
      topicImage:
        "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
      faculty: {
        name: "Dr. Sarah Sterling, MD",
        title: "Clinical Professor of Cardiovascular Medicine",
        institution: "Johns Hopkins University School of Medicine",
        officeHours: "Tuesdays & Thursdays 16:00 EST",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
      },
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
      category: "Systems & Theory",
      levelCategory: "Core",
      levelBadge: "Upper-Division CS Core",
      units: "4.0 Units",
      length: "48 Weeks Comprehensive",
      hours: "120 Lecture Hours • 36 Kernel Labs",
      rating: "4.95",
      enrolledCount: "11,800 Undergrads",
      prerequisites: "Computer Architecture, Data Structures, C/C++ or Rust",
      examAlignment: "ACM/IEEE CS2023 Guidelines • ABET Computing Standard",
      accreditation: "MIT EECS & UC Berkeley CS162 Aligned",
      description:
        "Rigorous instruction covering asymptotic analysis, kernel architecture, concurrent programming, and distributed consensus protocols with bootable multitasking operating system kernel projects.",
      topicImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      faculty: {
        name: "Prof. Kenneth Lin, PhD",
        title: "Principal Systems Investigator",
        institution: "MIT EECS / CSAIL",
        officeHours: "Mondays & Wednesdays 14:00 EST",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
      },
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
      category: "Life Sciences",
      levelCategory: "Advanced",
      levelBadge: "Advanced Life Sciences",
      units: "4.0 Units",
      length: "44 Weeks Comprehensive",
      hours: "110 Lecture Hours • 40 Wet Lab Protocols",
      rating: "4.98",
      enrolledCount: "7,650 Undergrads",
      prerequisites: "Organic Chemistry, Cell Biology, General Genetics",
      examAlignment: "MCAT Chemical & Physical Foundations • GRE Biology",
      accreditation: "University of Oxford & Stanford Bio-Design Aligned",
      description:
        "Laboratory-backed explorations into recombinant DNA technology, enzymology, cellular signal transduction, and structural biochemistry with CRISPR guide RNA design simulations.",
      topicImage:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
      faculty: {
        name: "Dr. Alistair Finch, DPhil",
        title: "Reader in Molecular Genetics",
        institution: "University of Oxford",
        officeHours: "Wednesdays & Fridays 15:00 GMT",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
      },
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
      levelBadge: "Honors Undergraduate Math",
      units: "4.0 Units",
      length: "40 Weeks Comprehensive",
      hours: "100 Lecture Hours • 32 Proof Recitations",
      rating: "4.96",
      enrolledCount: "6,200 Undergrads",
      prerequisites: "Multivariable Calculus, Linear Algebra, Introduction to Proofs",
      examAlignment: "Putnam Competition Preparation • GRE Mathematics Core",
      accreditation: "Princeton University & Cambridge Tripos Aligned",
      description:
        "Rigorous proof-driven curricula in multivariable calculus, abstract linear algebra, differential equations, and real analysis with formal mathematical chalkboard recitation workshops.",
      topicImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
      faculty: {
        name: "Prof. Danielle Moreau, PhD",
        title: "Professor of Pure Mathematics",
        institution: "Princeton University",
        officeHours: "Tuesdays & Thursdays 13:00 EST",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
      },
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
      levelBadge: "Upper-Division Physics Core",
      units: "4.0 Units",
      length: "46 Weeks Comprehensive",
      hours: "115 Lecture Hours • 38 Experimental Physics Labs",
      rating: "4.99",
      enrolledCount: "9,100 Undergrads",
      prerequisites: "Multivariable Calculus, Differential Equations, Classical Mechanics",
      examAlignment: "Physics GRE • International Physics Olympiad Standard",
      accreditation: "ETH Zürich & Caltech Physics Aligned",
      description:
        "Mathematical and experimental foundations in Schrödinger wave mechanics, relativistic electrodynamics, and statistical thermodynamics with single-photon interference lab protocols.",
      topicImage:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000&auto=format&fit=crop",
      faculty: {
        name: "Dr. Hendrik Bauer, PhD",
        title: "Chair of Quantum Electronics",
        institution: "ETH Zürich",
        officeHours: "Mondays & Thursdays 11:00 CET",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
      },
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

  // Real-time multi-dimensional filter matching search query, discipline, and level
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
        d.faculty.name.toLowerCase().includes(q) ||
        d.faculty.institution.toLowerCase().includes(q) ||
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

  // Faculty Study Guides
  const studyGuides = [
    {
      date: "November 15, 2026",
      subject: "Clinical Medicine",
      title: "Visualizing the Brainstem: Cranial Nerve Pathways for Pre-Med Finals",
      description:
        "A systematic anatomical review of the medullary and pontine nuclei with annotated cross-sections and clinical lesion correlation.",
      author: "Dr. Rachel Ward, MD",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop"
    },
    {
      date: "November 11, 2026",
      subject: "Mathematics",
      title: "Geometric Intuition for Singular Value Decomposition (SVD)",
      description:
        "Why singular value decomposition is best understood as a hyper-ellipsoid transformation, and how to apply it across linear models.",
      author: "Prof. Marcus Thorne, PhD",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
    },
    {
      date: "November 05, 2026",
      subject: "Computer Science",
      title: "Understanding Virtual Memory Paging and Hardware Translation",
      description:
        "Detailed walkthrough of multi-level page tables, translation lookaside buffers (TLB), and kernel page replacement policies.",
      author: "Prof. Kenneth Lin, PhD",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      const navbarOffset = 84;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDisciplineSelect = (e: React.MouseEvent<HTMLAnchorElement>, discId: string) => {
    e.preventDefault();
    setSelectedDiscipline(discId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    const target = document.getElementById("disciplines");
    if (target) {
      const navbarOffset = 84;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0d2238] font-sans antialiased overflow-x-hidden selection:bg-[#10b981] selection:text-white">
      {/* ================= FIXED STICKY CAPSULE NAVBAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pointer-events-auto">
          <header className="flex items-center justify-between px-6 sm:px-7 py-2.5 bg-white/95 backdrop-blur-md text-slate-700 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 transition-all duration-200">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-slate-600">
              <a href="#" onClick={(e) => scrollToSection(e, "top")} className="text-emerald-600 font-semibold relative py-1 cursor-pointer">
                Home
              </a>

              {/* Disciplines Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("disciplines")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setOpenDropdown(openDropdown === "disciplines" ? null : "disciplines")}
                  className={`flex items-center gap-1.5 transition-colors py-1 cursor-pointer font-medium ${
                    openDropdown === "disciplines" ? "text-emerald-600" : "hover:text-emerald-600"
                  }`}
                >
                  <span>Disciplines</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === "disciplines" ? "rotate-180 text-emerald-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {openDropdown === "disciplines" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider border-b border-slate-100 mb-1">
                      Academic Disciplines
                    </div>
                    <div className="space-y-1">
                      <a
                        href="#disciplines"
                        onClick={(e) => handleDisciplineSelect(e, "medicine")}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold">Clinical Medicine</span>
                          <span className="block text-[11px] text-slate-500 font-normal">Anatomy, Pathology & USMLE</span>
                        </div>
                      </a>

                      <a
                        href="#disciplines"
                        onClick={(e) => handleDisciplineSelect(e, "cs")}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold">Computer Science</span>
                          <span className="block text-[11px] text-slate-500 font-normal">Systems, AI & Algorithms</span>
                        </div>
                      </a>

                      <a
                        href="#disciplines"
                        onClick={(e) => handleDisciplineSelect(e, "biology")}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Dna className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold">Molecular Biology</span>
                          <span className="block text-[11px] text-slate-500 font-normal">Genetics, CRISPR & Cell Biology</span>
                        </div>
                      </a>

                      <a
                        href="#disciplines"
                        onClick={(e) => handleDisciplineSelect(e, "math")}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold">Mathematics</span>
                          <span className="block text-[11px] text-slate-500 font-normal">Calculus, Linear Algebra & Proofs</span>
                        </div>
                      </a>

                      <a
                        href="#disciplines"
                        onClick={(e) => handleDisciplineSelect(e, "physics")}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/70 text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Atom className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold">Quantum Physics</span>
                          <span className="block text-[11px] text-slate-500 font-normal">Wave Mechanics & Electrodynamics</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="#disciplines" onClick={(e) => scrollToSection(e, "disciplines")} className="hover:text-emerald-600 transition-colors py-1 cursor-pointer">
                Curriculum
              </a>

              <a href="#pedagogy" onClick={(e) => scrollToSection(e, "pedagogy")} className="hover:text-emerald-600 transition-colors py-1 cursor-pointer">
                Recitations
              </a>

              <a href="#guides" onClick={(e) => scrollToSection(e, "guides")} className="hover:text-emerald-600 transition-colors py-1 cursor-pointer">
                Study Guides
              </a>

              <a href="#admissions" onClick={(e) => scrollToSection(e, "admissions")} className="hover:text-emerald-600 transition-colors py-1 cursor-pointer">
                Admissions
              </a>
            </nav>

            {/* Mobile Home Link */}
            <a
              href="#"
              onClick={(e) => scrollToSection(e, "top")}
              className="md:hidden text-xs font-bold text-emerald-600 hover:text-emerald-700 py-1 cursor-pointer"
            >
              Home
            </a>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="#admissions"
                onClick={(e) => scrollToSection(e, "admissions")}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                Sign In
              </a>
              <a
                href="#admissions"
                onClick={(e) => scrollToSection(e, "admissions")}
                className="px-5 py-2 rounded-full bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition-all active:translate-y-0.5 cursor-pointer"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </header>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 p-5 bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 text-slate-700 text-xs font-medium space-y-4 max-h-[80vh] overflow-y-auto">
              <a href="#" onClick={(e) => scrollToSection(e, "top")} className="block text-emerald-600 font-semibold cursor-pointer">
                Home
              </a>

              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "disciplines" ? null : "disciplines")}
                  className="w-full flex items-center justify-between text-left text-slate-800 font-semibold py-1 cursor-pointer"
                >
                  <span>Disciplines</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "disciplines" ? "rotate-180 text-emerald-600" : ""}`} />
                </button>
                {mobileExpanded === "disciplines" && (
                  <div className="pl-3 mt-2 space-y-2 border-l border-slate-200 text-slate-600 text-xs">
                    <a href="#disciplines" onClick={(e) => handleDisciplineSelect(e, "medicine")} className="block hover:text-emerald-600 cursor-pointer">Clinical Medicine</a>
                    <a href="#disciplines" onClick={(e) => handleDisciplineSelect(e, "cs")} className="block hover:text-emerald-600 cursor-pointer">Computer Science</a>
                    <a href="#disciplines" onClick={(e) => handleDisciplineSelect(e, "biology")} className="block hover:text-emerald-600 cursor-pointer">Molecular Biology</a>
                    <a href="#disciplines" onClick={(e) => handleDisciplineSelect(e, "math")} className="block hover:text-emerald-600 cursor-pointer">Mathematics</a>
                    <a href="#disciplines" onClick={(e) => handleDisciplineSelect(e, "physics")} className="block hover:text-emerald-600 cursor-pointer">Quantum Physics</a>
                  </div>
                )}
              </div>

              <a href="#disciplines" onClick={(e) => scrollToSection(e, "disciplines")} className="block hover:text-emerald-600 cursor-pointer">
                Curriculum
              </a>
              <a href="#pedagogy" onClick={(e) => scrollToSection(e, "pedagogy")} className="block hover:text-emerald-600 cursor-pointer">
                Recitations
              </a>
              <a href="#guides" onClick={(e) => scrollToSection(e, "guides")} className="block hover:text-emerald-600 cursor-pointer">
                Study Guides
              </a>
              <a href="#admissions" onClick={(e) => scrollToSection(e, "admissions")} className="block hover:text-emerald-600 cursor-pointer">
                Admissions
              </a>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a href="#admissions" onClick={(e) => scrollToSection(e, "admissions")} className="text-xs font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer">
                  Sign In
                </a>
                <a href="#admissions" onClick={(e) => scrollToSection(e, "admissions")} className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer">
                  Apply Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= HERO SECTION (TOP-SPLIT TEXT, CLEAR CENTER CORRIDOR, BOTTOM BUTTONS) ================= */}
      <ImageStreamHero
        images={streamImages}
        cards={12}
        speed={26}
        axis={60}
        className="relative bg-gradient-to-t from-[#246bb0] via-[#14436f] to-[#07192d] text-white pt-28 sm:pt-36 md:pt-40 pb-16 min-h-[800px] md:min-h-[860px] flex flex-col justify-between overflow-hidden"
      >
        {/* Lighter blue gradient overlay fading away from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/35 via-[#1d4ed8]/10 to-transparent pointer-events-none" />

        {/* ================= HERO HEADLINE & SUBTITLE (CLEAN UPPER REGION, BOLDER & POSITIONED DOWN) ================= */}
        <div className="relative z-30 w-full flex flex-col items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_28px_rgba(0,0,0,0.75)]">
              Every field at the palm <br />
              of your hand.
            </h1>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-100/95 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              From clinical anatomy and algorithmic systems to multivariable calculus and quantum physics. Master undergraduate science through proof-driven lectures, interactive models, and faculty recitations.
            </p>
          </div>
        </div>

        {/* ================= CORRIDOR SPACER: Balanced gap connecting text to cards ================= */}
        <div className="flex-1 min-h-[80px] sm:min-h-[100px] pointer-events-none" />

        {/* ================= BOTTOM-HALF HERO BUTTONS (DOWN BELOW, CORRIDOR VISIBLE IN BETWEEN) ================= */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-30 pb-10 sm:pb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#disciplines"
              onClick={(e) => scrollToSection(e, "disciplines")}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-2xl active:translate-y-0.5 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/60 cursor-pointer"
            >
              <span>Explore Disciplines</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#admissions"
              onClick={(e) => scrollToSection(e, "admissions")}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/35 bg-[#040f1a]/80 backdrop-blur-md text-white font-semibold text-xs uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-300 transition-all rounded-full shadow-xl cursor-pointer"
            >
              View Course Directory
            </a>
          </div>
        </div>

        {/* NATIVE SCULPTED 3D WAVE DIVIDER (Transition into page) */}
        <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C340,140 460,-15 880,80 C1180,150 1340,30 1440,50 L1440,140 L0,140 Z"
              fill="#103a61"
              opacity="0.3"
            />
            <path
              d="M0,60 C340,160 460,5 880,100 C1180,170 1340,50 1440,70"
              stroke="#34d399"
              strokeWidth="5"
              fill="none"
              opacity="0.95"
            />
            <path
              d="M0,75 C340,175 460,20 880,115 C1180,185 1340,65 1440,85 L1440,140 L0,140 Z"
              fill="#fafbfc"
            />
          </svg>
        </div>
      </ImageStreamHero>

      {/* ================= UNIVERSITY STANDARDS BAR ================= */}
      <section className="py-7 bg-[#fafbfc] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
            <span>Harvard Medical Curriculum</span>
            <span>MIT EECS Courseware</span>
            <span>Stanford Bio-Design Protocols</span>
            <span>Oxford Natural Sciences</span>
            <span>Princeton Advanced Mathematics</span>
          </div>
        </div>
      </section>

      {/* ================= THE 5 CORE DISCIPLINES & INTERACTIVE CURRICULUM EXPLORER ================= */}
      <section id="disciplines" className="py-20 lg:py-28 relative scroll-mt-24 bg-[#fafbfc] font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
                Academic Syllabi & Masterclasses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#071626]">
                Curriculum & Course Directory
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
                Explore comprehensive undergraduate syllabi with explicit module breakdowns, laboratory protocols, required prerequisites, and official university exam alignments.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 text-xs text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm shrink-0 font-medium">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-900">5 Masterclasses</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>120+ Syllabi Mapped</span>
              </div>
            </div>
          </div>

          {/* SEARCH & COMMAND BAR */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, syllabus code (MED-201, CS-240), professor, exam (USMLE, Putnam), or keyword..."
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
                <span className="text-slate-500 font-semibold text-xs tracking-wide shrink-0">
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
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

          {/* ACTIVE FILTER STATUS BAR */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
            <span>
              Showing{" "}
              <strong className="text-slate-900 font-bold">
                {filteredDisciplines.length}
              </strong>{" "}
              of {disciplines.length} accredited masterclasses
              {searchQuery && (
                <span>
                  {" "}matching &ldquo;
                  <span className="text-emerald-700 font-semibold">
                    {searchQuery}
                  </span>
                  &rdquo;
                </span>
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
              <h3 className="text-lg font-bold text-slate-900">
                No matching curricula found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                No courses match your active search &ldquo;{searchQuery}&rdquo;. Try searching for general topics such as &ldquo;Anatomy&rdquo;, &ldquo;Calculus&rdquo;, &ldquo;Kernels&rdquo;, or reset your filters.
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

          {/* ================= VIEW MODE 1: RICH GRID VIEW ================= */}
          {viewMode === "grid" && filteredDisciplines.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDisciplines.map((item) => {
                const isModuleOpen = expandedCourseModules[item.id] ?? false;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Course Topic Photographic Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.topicImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071626] via-transparent to-transparent opacity-80" />

                      {/* Course Code & Category Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                        <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-md shadow-sm">
                          {item.code}
                        </span>
                        <span className="px-2.5 py-1 bg-[#0c2340]/90 backdrop-blur-md text-emerald-300 text-xs font-semibold tracking-wide uppercase rounded-md border border-white/10">
                          {item.levelBadge}
                        </span>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-md flex items-center gap-1 border border-white/10">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>

                      {/* Bottom Image Overlay: Exam Alignment */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-xs uppercase font-medium tracking-wide text-slate-300 block">
                          Aligned Exam Standard
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {item.examAlignment}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        {/* Title & Description */}
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Academic Specs Grid */}
                        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium">
                          <div>
                            <span className="text-slate-400 block text-[11px]">CREDITS</span>
                            <span className="font-bold text-slate-800">{item.units}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">DURATION</span>
                            <span className="font-bold text-slate-800">{item.length.split(" ")[0]} Weeks</span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-slate-200/60">
                            <span className="text-slate-400 block text-[11px]">HOURS</span>
                            <span className="font-semibold text-slate-700">{item.hours}</span>
                          </div>
                        </div>

                        {/* Prerequisites Tag */}
                        <div className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5">
                          <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wide block">
                            Prerequisites
                          </span>
                          <span className="text-slate-700">{item.prerequisites}</span>
                        </div>

                        {/* Granular Module Breakdown Drawer Toggle */}
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

                          {/* Expanded Modules List */}
                          {isModuleOpen && (
                            <div className="mt-2 space-y-2 text-xs border-l-2 border-emerald-500 pl-3 pt-1">
                              {item.modules.map((m) => (
                                <div key={m.num} className="space-y-1">
                                  <div className="flex items-center justify-between font-semibold text-slate-900 text-xs">
                                    <span>
                                      Unit {m.num}: {m.title}
                                    </span>
                                    <span className="text-emerald-700 text-xs">
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

                      {/* Faculty Info & Bottom Actions */}
                      <div className="space-y-4 pt-3 border-t border-slate-100">
                        {/* Faculty Profile */}
                        <div className="flex items-center gap-3">
                          <img
                            src={item.faculty.avatar}
                            alt={item.faculty.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-slate-900 truncate">
                              {item.faculty.name}
                            </span>
                            <span className="block text-[11px] text-slate-500 truncate">
                              {item.faculty.institution}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setInspectingCourseId(item.id)}
                            className="flex-1 py-2 px-3 border border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Inspect Syllabus</span>
                          </button>

                          <a
                            href="#admissions"
                            onClick={(e) => {
                              setSelectedDiscipline(item.id);
                              scrollToSection(e, "admissions");
                            }}
                            className="py-2 px-4 bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:translate-y-0.5 shrink-0"
                          >
                            <span>Enroll</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= VIEW MODE 2: DETAILED CATALOG TABLE VIEW ================= */}
          {viewMode === "list" && filteredDisciplines.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4 font-semibold">Course Code</th>
                      <th className="py-3.5 px-4 font-semibold">Masterclass & Faculty</th>
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
                          <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                            {item.levelBadge}
                          </span>
                        </td>

                        <td className="py-4 px-4 min-w-[260px]">
                          <span className="font-bold text-sm text-slate-900 block">
                            {item.title}
                          </span>
                          <span className="text-xs text-slate-500 block mt-0.5">
                            {item.faculty.name} • {item.faculty.institution}
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
                            <a
                              href="#admissions"
                              onClick={(e) => {
                                setSelectedDiscipline(item.id);
                                scrollToSection(e, "admissions");
                              }}
                              className="px-3.5 py-1.5 bg-[#0c2340] hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              Enroll
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= FULLSCREEN ANIMATED SYLLABUS ACCORDION DOSSIER ================= */}
      {activeInspectingCourse && (
        <div className="fixed inset-0 z-50 bg-[#fafbfc] text-[#0d2238] overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-300 ease-out flex flex-col font-sans">
          {/* Top Sticky Command Bar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-12 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setInspectingCourseId(null)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Courses</span>
              </button>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-bold text-xs rounded-md">
                  {activeInspectingCourse.code}
                </span>
                <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                  {activeInspectingCourse.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDownloadSyllabus(activeInspectingCourse.code)}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-800 text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download Syllabus (PDF)</span>
              </button>

              <a
                href="#admissions"
                onClick={(e) => {
                  setSelectedDiscipline(activeInspectingCourse.id);
                  setInspectingCourseId(null);
                  scrollToSection(e, "admissions");
                }}
                className="px-4 py-2 bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              >
                <span>Enroll in Discipline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setInspectingCourseId(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close syllabus view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Full-width Hero Banner with Normal Font */}
          <div className="bg-gradient-to-r from-[#071626] to-[#0c2340] text-white py-12 px-6 sm:px-12 border-b border-white/10">
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-md">
                  {activeInspectingCourse.code}
                </span>
                <span className="px-3 py-1 bg-white/10 text-emerald-300 text-xs font-semibold tracking-wide uppercase rounded-md border border-white/10">
                  {activeInspectingCourse.category}
                </span>
                <span className="px-3 py-1 bg-white/10 text-slate-200 text-xs rounded-md border border-white/10">
                  {activeInspectingCourse.levelBadge}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-md text-amber-300 text-xs font-bold border border-white/10 ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{activeInspectingCourse.rating}</span>
                  <span className="text-slate-300 font-normal">({activeInspectingCourse.enrolledCount})</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {activeInspectingCourse.title}
              </h1>

              <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
                {activeInspectingCourse.description}
              </p>

              {/* Specs Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs">
                <div>
                  <span className="text-slate-400 block text-xs">Academic Credits</span>
                  <span className="font-bold text-white text-sm">{activeInspectingCourse.units}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Term Duration</span>
                  <span className="font-bold text-white text-sm">{activeInspectingCourse.length}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Hours & Labs</span>
                  <span className="font-bold text-white text-sm">{activeInspectingCourse.hours}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Curriculum Standard</span>
                  <span className="font-bold text-emerald-300 text-sm">{activeInspectingCourse.accreditation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Accordion Showcase */}
          <main className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-12 py-10 space-y-6">
            {/* Download Toast Notification */}
            {downloadSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 flex items-center justify-between gap-3 shadow-sm animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-sm">Download Started</span>
                    <span className="text-xs text-emerald-800">
                      Official syllabus specification for {downloadSuccess} has been downloaded.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDownloadSuccess(null)}
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Accordion Controls Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Comprehensive Syllabus Architecture
                </h2>
                <p className="text-xs text-slate-500">
                  Click any section below to expand or collapse modular syllabus themes, laboratory protocols, and faculty recitations.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={expandAllAccordions}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAllAccordions}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* ACCORDION 1: Overview, Prerequisites & Diagnostic Outcomes */}
            <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleAccordion("overview")}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Course Prerequisites, Degree Alignment & Core Competencies
                    </h3>
                    <p className="text-xs text-slate-500">
                      Prerequisites, target exam benchmarks, and required prior coursework.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    openAccordionIds.overview ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {openAccordionIds.overview && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                        Required Academic Prerequisites
                      </span>
                      <p className="text-sm font-medium text-slate-800">
                        {activeInspectingCourse.prerequisites}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                        Official Exam Standard & Syllabi Benchmark
                      </span>
                      <p className="text-sm font-medium text-slate-800">
                        {activeInspectingCourse.examAlignment}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activeInspectingCourse.accreditation}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">
                      Target Graduation Competencies & Mastery Outcomes
                    </span>
                    <div className="space-y-2">
                      {activeInspectingCourse.learningOutcomes.map((outcome: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDIONS 2–5: The 4 Chronological Academic Modules */}
            {activeInspectingCourse.modules.map((m: any, mIdx: number) => {
              const accKey = `module_${mIdx}`;
              const isOpen = openAccordionIds[accKey] ?? false;

              return (
                <div
                  key={m.num}
                  className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(accKey)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#0c2340] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {m.num}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                            Unit {m.num} • {m.weeks}
                          </span>
                          <span className="text-xs font-medium text-slate-400">• Lab Protocol Included</span>
                        </div>
                        <h3 className="font-bold text-base text-slate-900 leading-snug truncate">
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-slate-500 block mb-2">
                          Weekly Lecture Themes & Recitations:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                          {m.topics.map((t: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span className="leading-snug">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                          <Layers className="w-4 h-4 text-emerald-700" />
                          <span>Dedicated Laboratory Experiment Protocol</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {m.lab}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ACCORDION 6: Faculty Lead, Mentorship & Recitation Schedule */}
            <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleAccordion("faculty")}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Course Director, Recitations & Office Hours
                    </h3>
                    <p className="text-xs text-slate-500">
                      Instructor credentials, university department, and weekly live recitation times.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    openAccordionIds.faculty ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {openAccordionIds.faculty && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeInspectingCourse.faculty.avatar}
                        alt={activeInspectingCourse.faculty.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-sm shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                          Course Director
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          {activeInspectingCourse.faculty.name}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {activeInspectingCourse.faculty.title} • {activeInspectingCourse.faculty.institution}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 sm:text-right shrink-0">
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Weekly Office Hours
                      </span>
                      <span className="text-xs font-bold text-slate-900 block">
                        {activeInspectingCourse.faculty.officeHours}
                      </span>
                      <span className="text-[11px] text-emerald-700 block">Live Video & Q&A</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <h4 className="font-bold text-sm text-slate-900">Ready to begin this masterclass?</h4>
                <p className="text-xs text-slate-500">
                  Enroll with your university institutional email for complete syllabus and recitation access.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleDownloadSyllabus(activeInspectingCourse.code)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-800 text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download Syllabus (PDF)</span>
                </button>

                <a
                  href="#admissions"
                  onClick={(e) => {
                    setSelectedDiscipline(activeInspectingCourse.id);
                    setInspectingCourseId(null);
                    scrollToSection(e, "admissions");
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0c2340] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enroll in Discipline</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ================= STUDENTS STUDYING & METHODOLOGY ================= */}
      <section id="pedagogy" className="relative py-24 bg-[#071626] text-white overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                Evidence-Based Pedagogy
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Designed around the ways college students actually retain hard science.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Passive lectures fail when complex material meets exam conditions. The curriculum pairs every anatomical model, calculus proof, and systems diagram with interactive problem sets, recitation workshops, and live faculty discussions.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-emerald-400 font-bold text-sm block mb-1">Active Problem Solving</span>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Interleaved practice problem sets every 15 minutes of lecture time.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-emerald-400 font-bold text-sm block mb-1">Step-by-Step Derivations</span>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    No skipped steps. Every formula is derived from first principles.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden border border-white/15 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=700&auto=format&fit=crop"
                    alt="Student studying with open textbooks in quiet university library"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2.5 bg-[#091b2e] text-xs text-gray-300 border-t border-white/10 font-medium">
                    Pre-Med Clinical Anatomy Review
                  </div>
                </div>

                <div className="overflow-hidden border border-white/15 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=700&auto=format&fit=crop"
                    alt="Computer science student coding with dual screens"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 bg-[#091b2e] text-xs text-gray-300 border-t border-white/10 font-medium">
                    Systems Programming Recitation
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="overflow-hidden border border-white/15 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=700&auto=format&fit=crop"
                    alt="Student deriving mathematics equations with notebook"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 bg-[#091b2e] text-xs text-gray-300 border-t border-white/10 font-medium">
                    Multivariable Calculus Derivations
                  </div>
                </div>

                <div className="overflow-hidden border border-white/15 rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=700&auto=format&fit=crop"
                    alt="Biology student working with laboratory assay"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2.5 bg-[#091b2e] text-xs text-gray-300 border-t border-white/10 font-medium">
                    Molecular Biology Assay Prep
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STUDENT ADMISSIONS & REGISTRATION ================= */}
      <section id="admissions" className="py-20 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
        <div className="overflow-hidden border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 bg-white">
          <div className="lg:col-span-6 relative p-10 sm:p-14 bg-[#071626] text-white flex flex-col justify-between overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-500 text-slate-950 text-xs uppercase tracking-wider font-bold rounded">
                Academic Registration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Unlock full course syllabi, lecture transcripts, and problem banks.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with your university study cohort, attend faculty recitations, and download full syllabus packages for the upcoming term.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-3 text-xs border-t border-white/15 pt-6 font-medium">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>14-day full access with a verified university email</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official syllabi alignment for 120+ colleges</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct faculty and TA office hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-10 sm:p-14 bg-white text-[#071626] flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block">
                Enrollment Form
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#071626] mt-1">
                Register Your Student Profile
              </h3>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 space-y-2 text-center rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Registration Complete</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  A confirmation message and your complete syllabus access pass have been sent to your university address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:bg-white outline-none px-3.5 py-2.5 text-gray-900 transition-colors rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                    Institutional Email (University domain)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:bg-white outline-none px-3.5 py-2.5 text-gray-900 transition-colors rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                      Target Discipline
                    </label>
                    <select
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:bg-white outline-none px-3 py-2.5 text-gray-900 rounded-lg text-xs"
                    >
                      <option value="Medicine">Medicine & Clinical</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Biology">Biology & Genetics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics & Optics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                      Academic Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:bg-white outline-none px-3 py-2.5 text-gray-900 rounded-lg text-xs"
                    >
                      <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                      <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                      <option value="Junior (Year 3)">Junior (Year 3)</option>
                      <option value="Senior (Year 4)">Senior (Year 4)</option>
                      <option value="Post-Baccalaureate">Post-Baccalaureate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                    Specific Courses or Goals
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-emerald-500 focus:bg-white outline-none px-3.5 py-2.5 text-gray-900 transition-colors rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs uppercase tracking-wider font-bold transition-all rounded-lg"
                  >
                    Register for Course Access
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= FACULTY STUDY GUIDES ================= */}
      <section id="guides" className="py-20 lg:py-24 border-t border-gray-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                Faculty Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#071626]">
                Academic Study Guides
              </h2>
            </div>
            <a
              href="#disciplines"
              className="text-xs uppercase tracking-wider font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 overflow-hidden flex flex-col group hover:border-emerald-500 hover:shadow-lg transition-all rounded-xl"
              >
                <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#071626]/90 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded">
                    {guide.subject}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block mb-2 font-medium">
                      {guide.date}
                    </span>
                    <h3 className="text-base font-bold text-[#071626] group-hover:text-emerald-700 transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-900">{guide.author}</span>
                    <span>{guide.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#05111d] text-white pt-16 pb-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-base font-bold tracking-tight text-white uppercase block">
                Academic Masterclasses
              </span>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Accredited undergraduate STEM and pre-medical masterclasses mapped to university syllabi worldwide.
              </p>
            </div>

            <div>
              <span className="text-emerald-400 uppercase font-bold tracking-wider block mb-3 text-xs">
                Disciplines
              </span>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li><a href="#disciplines" className="hover:text-white transition-colors">Clinical Anatomy & Medicine</a></li>
                <li><a href="#disciplines" className="hover:text-white transition-colors">Computer Systems & Theory</a></li>
                <li><a href="#disciplines" className="hover:text-white transition-colors">Molecular Biology & Genetics</a></li>
                <li><a href="#disciplines" className="hover:text-white transition-colors">Pure & Applied Mathematics</a></li>
                <li><a href="#disciplines" className="hover:text-white transition-colors">Quantum Mechanics & Physics</a></li>
              </ul>
            </div>

            <div>
              <span className="text-emerald-400 uppercase font-bold tracking-wider block mb-3 text-xs">
                Admissions
              </span>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li><a href="#admissions" className="hover:text-white transition-colors">Syllabus Directory</a></li>
                <li><a href="#pedagogy" className="hover:text-white transition-colors">Faculty Recitations</a></li>
                <li><a href="#admissions" className="hover:text-white transition-colors">Academic Scholarships</a></li>
                <li><a href="#disciplines" className="hover:text-white transition-colors">Laboratory Protocols</a></li>
              </ul>
            </div>

            <div>
              <span className="text-emerald-400 uppercase font-bold tracking-wider block mb-3 text-xs">
                Student Portal
              </span>
              <p className="text-gray-400 text-xs leading-relaxed mb-3 font-sans">
                Log in using your verified institutional university address.
              </p>
              <a
                href="#admissions"
                className="inline-block px-4 py-2 bg-emerald-500 text-slate-950 font-bold uppercase text-xs hover:bg-emerald-400 transition-colors"
              >
                Student Login
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
            <p>© 2026 Meridian Institute of Academic Education. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Next.js</span>
              <span>·</span>
              <span>Tailwind CSS</span>
              <span>·</span>
              <span>Accredited STEM Education</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
