import React, { useEffect, useState } from 'react';
import {
  Mail,
  ArrowDown,
  ArrowUpRight,
  Star,
  GitFork,
  MapPin,
} from 'lucide-react';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

/* ---------------------------------------------------------------
   Phillip Vincent — Single-page portfolio
   Black background, white text, blue accent on cards
--------------------------------------------------------------- */

export default function App() {
  return (
    <div
      className="text-white min-h-screen overflow-x-hidden font-sans"
      style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}
    >
      <GlobalStyles />
      <Atmosphere />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Tech />
      <Contact />
      <Footer />
    </div>
  );
}

/* ===================== STYLES ===================== */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      :root {
        --bg: #0a0a0a;
        --surface: #141414;
        --border: rgba(255, 255, 255, 0.08);
        --border-strong: rgba(255, 255, 255, 0.18);
        --text: #ffffff;
        --text-dim: #b8b8b8;
        --text-mute: #777777;
        --accent: #60a5fa;
        --accent-soft: #93c5fd;
        --accent-glow: rgba(96, 165, 250, 0.3);
        --card-accent: #60a5fa;
        --card-accent-soft: #93c5fd;
      }

      html { scroll-behavior: smooth; }
      body {
        font-family: 'Inter', sans-serif;
        background-color: #0a0a0a;
        color: #ffffff;
        margin: 0;
      }

      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }

      @keyframes bounceDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(8px); }
      }
      .bounce-down { animation: bounceDown 2s ease-in-out infinite; }

      @keyframes pulseGlow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }

      .accent-text { color: var(--accent); }

      .accent-gradient {
        background: linear-gradient(120deg, #60a5fa 0%, #93c5fd 50%, #bfdbfe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .nav-link {
        position: relative;
        color: var(--text-dim);
        transition: color 0.2s;
        font-size: 14px;
      }
      .nav-link:hover { color: var(--accent); }
      .nav-link::after {
        content: '';
        position: absolute;
        left: 0; bottom: -4px;
        width: 0; height: 1px;
        background: var(--accent);
        transition: width 0.3s ease;
      }
      .nav-link:hover::after { width: 100%; }

      .pill-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 11px 22px;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid var(--border-strong);
        background: rgba(255, 255, 255, 0.03);
        color: var(--text);
        transition: all 0.25s ease;
        cursor: pointer;
        text-decoration: none;
      }
      .pill-btn:hover {
        border-color: var(--accent);
        color: var(--accent-soft);
        background: rgba(96, 165, 250, 0.08);
      }

      .pill-btn-primary {
        background: var(--accent);
        color: #0a0a0a;
        border-color: var(--accent);
      }
      .pill-btn-primary:hover {
        background: var(--accent-soft);
        color: #0a0a0a;
        box-shadow: 0 8px 30px -8px var(--accent-glow);
      }

      .surface-card {
        background: linear-gradient(180deg, rgba(25, 25, 25, 0.7), rgba(18, 18, 18, 0.85));
        border: 1px solid var(--border);
        backdrop-filter: blur(10px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .surface-card:hover {
        border-color: var(--border-strong);
        transform: translateY(-3px);
      }

      .project-card {
        background: linear-gradient(180deg, rgba(20, 30, 50, 0.55), rgba(15, 22, 38, 0.85));
        border: 1px solid rgba(96, 165, 250, 0.15);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
      }
      .project-card:hover {
        border-color: rgba(96, 165, 250, 0.5);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -20px rgba(96, 165, 250, 0.3);
      }

      .tag-chip {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        padding: 3px 10px;
        border-radius: 6px;
        background: rgba(96, 165, 250, 0.1);
        border: 1px solid rgba(96, 165, 250, 0.25);
        color: #bfdbfe;
      }

      .tech-chip {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border);
        color: var(--text);
        transition: all 0.25s ease;
      }
      .tech-chip:hover {
        border-color: var(--accent);
        color: var(--accent-soft);
        background: rgba(96, 165, 250, 0.08);
      }

      .section-eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        color: var(--accent);
      }

      .card-eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        color: var(--card-accent);
      }

      .input-field {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border);
        color: var(--text);
        transition: all 0.2s ease;
        width: 100%;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
      }
      .input-field::placeholder { color: var(--text-mute); }
      .input-field:focus {
        outline: none;
        border-color: var(--accent);
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
      }

      .glow-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border-strong), transparent);
      }

      .visual-tile {
        background:
          radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.18), transparent 60%),
          radial-gradient(circle at 70% 70%, rgba(96, 165, 250, 0.12), transparent 60%),
          linear-gradient(135deg, #14253f, #0a0a0a);
      }
    `}</style>
  );
}

/* ===================== ATMOSPHERE (gradient-only, no starfield) ===================== */
function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* base */}
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0a' }} />
      {/* subtle gray gradients for depth, no color tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 10%, rgba(255, 255, 255, 0.04), transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 80% 30%, rgba(255, 255, 255, 0.025), transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(96, 165, 250, 0.04), transparent 70%)',
        }}
      />
      {/* noise/grain */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '3px 3px',
        }}
      />
    </div>
  );
}

/* ===================== NAV ===================== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl font-medium tracking-tight">
          Phillip<span className="accent-text">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#tech" className="nav-link">Tech</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/PhilNiel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-blue-300 transition-colors"
          >
            <FaGithub className="w-[18px] h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/phillip-l-v-n/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-blue-300 transition-colors"
          >
            <FaLinkedin className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-3xl text-center">
        <p className="section-eyebrow mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
          Hello, I'm
        </p>
        <h1
          className="font-serif text-[64px] md:text-[104px] font-medium tracking-tight leading-[0.95] mb-6 fade-up"
          style={{ animationDelay: '0.25s' }}
        >
          Phillip<br />
          <em className="accent-gradient not-italic font-semibold">Vincent</em>
        </h1>
        <p
          className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed mb-10 fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Software engineer with a focus on{' '}
          <span className="text-blue-300">distributed systems</span>,{' '}
          <span className="text-blue-300">scalable infrastructure</span>, and{' '}
          <span className="text-blue-300">data intensive applications</span>. Master's in Software Engineering.
        </p>
        <div className="flex flex-wrap justify-center gap-3 fade-up" style={{ animationDelay: '0.55s' }}>
          <a href="#projects" className="pill-btn pill-btn-primary">
            View projects <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="pill-btn">Get in touch</a>
        </div>
      </div>
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-gray-400 hover:text-blue-300 hover:border-blue-300 transition-all bounce-down"
      >
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}

/* ===================== ABOUT ===================== */
function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">About</p>
          <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight">
            A bit <em className="accent-gradient not-italic font-semibold">about me</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-5 text-[16px] md:text-[17px] leading-[1.75] text-gray-200">
            <p>
              I'm a recently graduated Software Engineer based in Hammel. I hold both a Bachelor's and a Master's degree 
              in Software Engineering, with a strong interest in building and understanding complex systems. 
              I'm especially drawn to areas like distributed architectures, scalable backend systems, 
              cloud infrastructure, and big data environments, 
              where design decisions are critical to performance, reliability, and maintainability.
  
            </p>
            <p>
              My Master's thesis explored transformation lineage in Apache Spark. During the thesis we developed a system that
              captures how data moves through pipelines and surfaces it as a directed acyclic graphs for auditability.
              My Bachelor's project and side projects have involved working with microservice architectures, IoT systems, 
              and data platforms.
            </p>
            <p>
              I enjoy working with infrastructure and developer tooling, building systems that make data accessible, maintainable 
              and intuitive to work with for both developers and users.
            </p>
          </div>

          <aside className="md:col-span-2 surface-card rounded-xl p-7">
            <p className="section-eyebrow mb-5">Quick facts</p>
            <ul className="space-y-4 text-sm">
              <FactRow label="Location" value="Hammel, Denmark" />
              <FactRow label="Education" value="MSc in Software Engineering" />
              <FactRow label="Focus" value="Distributed systems · Data engineering" />
              <FactRow label="Status" value="Open to opportunities" highlight />
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FactRow({ label, value, highlight }) {
  return (
    <li className="flex items-start justify-between gap-4 pb-4 border-b border-[color:var(--border)] last:border-0 last:pb-0">
      <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">{label}</span>
      <span className={`text-right text-sm ${highlight ? 'text-blue-300' : 'text-white'}`}>
        {highlight && (
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 align-middle pulse-glow" />
        )}
        {value}
      </span>
    </li>
  );
}

/* ===================== PROJECTS ===================== */
function Projects() {
  const projects = [
    {
      name: 'TransformationLineage',
      role: "Master's Thesis · with Joachim Baumann",
      tagline: 'Lineage tracking for Apache Spark workflows',
      description:
        "Captures transformation metadata from Spark workflows, persists it as a directed acyclic graph in Neo4j, and enables tracking data lineage in a web interface supporting auditability, dependency analysis, and data invalidation.",
      contribution:
        'Co-developed the Spark listener, graph schema, and the web frontend that visualizes lineage relationships.',
      stack: ['Java', 'Apache Spark', 'Neo4j', 'JavaScript', 'Docker', 'Google Cloud'],
      stars: 1,
      forks: 1,
      year: '2025',
      url: 'https://github.com/JoachimBaumann/TransformationLineage',
      featured: true,
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* connections */}
          <path d="M 60 100 L 160 60" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 60 100 L 160 100" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 60 100 L 160 140" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 160 60 L 260 80" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 160 100 L 260 120" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 160 140 L 260 160" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 260 80 L 340 100" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 260 120 L 340 100" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 260 160 L 340 100" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* nodes */}
          {[[60,100],[160,60],[160,100],[160,140],[260,80],[260,120],[260,160],[340,100]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="10" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="3" fill="#60a5fa" />
            </g>
          ))}
        </svg>
      ),
    },
    {
      name: 'DataConcistency-SE06',
      role: "Bachelor's Project · with Joachim Baumann",
      tagline: 'Microservice consistency via the saga pattern',
      description:
        'A microservices-based auction system built around the saga pattern. Independent services for catalog, bidding, and accounts coordinated through Kafka, with a JWT-secured API gateway and Docker deployment.',
      contribution:
        'Co-designed the orchestrator and bidding service. Implemented the API gateway and JWT auth layer.',
      stack: ['Java', 'Spring Boot', 'Kafka', 'Docker', 'JWT'],
      stars: 1,
      forks: 0,
      year: '2023',
      url: 'https://github.com/JoachimBaumann/DataConcistency-SE06',
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* central orchestrator */}
          <circle cx="200" cy="100" r="22" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="200" y="104" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="JetBrains Mono">SAGA</text>
          {/* services */}
          {[[80,60,'Catalog'],[80,140,'Bidding'],[320,60,'Accounts'],[320,140,'Gateway']].map(([x,y,label],i) => (
            <g key={i}>
              <line x1={x} y1={y} x2="200" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <rect x={x-30} y={y-12} width="60" height="24" rx="4" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1" />
              <text x={x} y={y+4} textAnchor="middle" fill="#bfdbfe" fontSize="9" fontFamily="JetBrains Mono">{label}</text>
            </g>
          ))}
        </svg>
      ),
    },
    {
      name: 'wildlife_camera',
      role: 'University Project · Team',
      tagline: 'Drone-simulated wildlife data offload',
      description:
        'A wildlife monitoring system: a Raspberry Pi camera captures images locally, and a drone (simulated by a Linux PC), searches for visible access points, connects, and offloads data automatically.',
      contribution:
        'Set up the imaginary drone with bash scripts and the MQTT publisher; built the access-point discovery and handoff logic.',
      stack: ['Bash', 'Python', 'MQTT', 'Linux', 'Raspberry Pi'],
      stars: 1,
      forks: 0,
      year: '2026',
      url: 'https://github.com/TheActualOskar/wildlife_camera',
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* signal waves */}
          <circle cx="100" cy="100" r="20" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="35" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.1" />
          {/* camera */}
          <rect x="80" y="85" width="40" height="30" rx="4" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="6" fill="#60a5fa" />
          <text x="100" y="135" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="JetBrains Mono">CAM</text>
          {/* drone */}
          <g>
            <line x1="280" y1="50" x2="320" y2="50" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="280" cy="50" r="4" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="320" cy="50" r="4" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
            <rect x="290" y="44" width="20" height="12" rx="2" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
          </g>
          <text x="300" y="80" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="JetBrains Mono">DRONE</text>
          {/* dashed connection */}
          <path d="M 130 95 Q 200 30 280 55" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="4 3" fill="none" opacity="0.6" />
        </svg>
      ),
    },
    {
      name: 'DoorLock',
      role: 'University Project · Team',
      tagline: 'Verified IoT access control',
      description:
        'An IoT door lock system with a backend service, mobile app, embedded firmware, and an Uppaal model used to formally verify the locking protocol.',
      contribution:
        'Worked on the backend service and the protocol design verified in Uppaal.',
      stack: ['Java', 'Kotlin', 'C++', 'JavaScript', 'Uppaal'],
      stars: 1,
      forks: 0,
      year: '2024',
      url: 'https://github.com/TheActualOskar/DoorLock',
      visual: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* lock body */}
          <rect x="160" y="80" width="80" height="80" rx="6" fill="#0a0a0a" stroke="#60a5fa" strokeWidth="1.5" />
          {/* shackle */}
          <path d="M 175 80 L 175 60 Q 175 40 200 40 Q 225 40 225 60 L 225 80" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
          {/* keyhole */}
          <circle cx="200" cy="115" r="6" fill="#60a5fa" />
          <rect x="198" y="118" width="4" height="14" fill="#60a5fa" />
          {/* signals */}
          <circle cx="80" cy="100" r="3" fill="#60a5fa" />
          <circle cx="320" cy="100" r="3" fill="#60a5fa" />
          <line x1="85" y1="100" x2="155" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <line x1="245" y1="100" x2="315" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        </svg>
      ),
    },
  ];

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">Selected Work</p>
          <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight">
            Things I've <em className="accent-gradient not-italic font-semibold">built</em>
          </h2>
          <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
            A mix of academic research, university group projects, and hobby projects.
          </p>
        </div>

        {/* Featured project — wide */}
        {featured && <FeaturedCard p={featured} />}

        {/* Rest in 2-col grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {rest.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ p }) {
  return (
    <article className="project-card rounded-2xl overflow-hidden md:grid md:grid-cols-5">
      <div className="visual-tile md:col-span-2 h-56 md:h-auto flex items-center justify-center p-6">
        {p.visual}
      </div>
      <div className="md:col-span-3 p-7 md:p-9 flex flex-col">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="font-mono text-[11px] tracking-wider uppercase text-blue-300">
            ★ Featured · {p.year}
          </span>
          <Stats stars={p.stars} forks={p.forks} />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-1">
          {p.name}
        </h3>
        <p className="text-blue-300 text-sm md:text-base mb-3">{p.tagline}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {p.stack.map(s => <span key={s} className="tag-chip">{s}</span>)}
        </div>
        <div className="mt-auto">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-primary"
          >
            Source code <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="project-card rounded-2xl overflow-hidden flex flex-col">
      <div className="visual-tile h-44 flex items-center justify-center p-4">
        {p.visual}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="font-mono text-[10px] tracking-wider uppercase text-gray-500">
            {p.year}
          </span>
          <Stats stars={p.stars} forks={p.forks} />
        </div>
        <h3 className="font-serif text-2xl font-medium tracking-tight mb-1">{p.name}</h3>
        <p className="text-blue-300 text-sm mb-2">{p.tagline}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.stack.map(s => <span key={s} className="tag-chip">{s}</span>)}
        </div>
        <div className="mt-auto">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 transition-colors font-medium"
          >
            View source <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Stats({ stars, forks }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="inline-flex items-center gap-1">
        <Star className="w-3 h-3" /> {stars}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork className="w-3 h-3" /> {forks}
      </span>
    </div>
  );
}

/* ===================== TECH ===================== */
function Tech() {
  const groups = [
    {
      label: 'Languages',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'Bash', 'SQL'],
    },
    {
      label: 'Backend & Data',
      items: ['Spring Boot', 'Apache Spark', 'Apache Kafka', 'Neo4j', 'PostgreSQL', 'MQTT'],
    },
    {
      label: 'Frontend',
      items: ['React', 'HTML', 'CSS'],
    },
    {
      label: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'Google Cloud', 'Linux', 'Git'],
    },
    {
      label: 'Testing & Tools',
      items: ['JUnit', 'JMeter', 'Power BI', 'Uppaal'],
    },
  ];
  return (
    <section id="tech" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-3">Toolbox</p>
          <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight">
            What I <em className="accent-gradient not-italic font-semibold">work with</em>
          </h2>
          <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
            Tools and frameworks I have worked with in projects, coursework, and industry.
          </p>
        </div>

        <div className="space-y-10">
          {groups.map(g => (
            <div key={g.label} className="grid md:grid-cols-5 gap-6 items-start">
              <p className="md:col-span-1 font-mono text-[11px] tracking-wider uppercase text-blue-300 pt-1.5">
                {g.label}
              </p>
              <div className="md:col-span-4 flex flex-wrap gap-2">
                {g.items.map(item => <span key={item} className="tech-chip">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CONTACT ===================== */
function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Contact</p>
          <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight">
            Let's <em className="accent-gradient not-italic font-semibold">talk</em>
          </h2>
          <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
            Open to software roles in distributed systems, data engineering, and backend development.
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ContactInfo
            icon={Mail}
            label="Email"
            value="Send a mail"
            href="mailto:phillipvincent@hotmail.dk"
          />
          <ContactInfo
            icon={FaLinkedin}
            label="LinkedIn"
            value="Connect with me"
            href="https://www.linkedin.com/in/phillip-l-v-n/"
          />
          <ContactInfo
            icon={FaGithub}
            label="GitHub"
            value="PhilNiel"
            href="https://github.com/PhilNiel"
          />
          <ContactInfo icon={MapPin} label="Location" value="Hammel, Denmark" />
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="surface-card rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-400/10 border border-blue-400/20 flex-shrink-0">
        <Icon className="w-4 h-4 text-blue-300" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-wider uppercase text-gray-500 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-white truncate">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-90 transition-opacity">
      {inner}
    </a>
  ) : (
    inner
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer className="relative px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="glow-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-gray-500">
            © 2026 Phillip Vincent — Built with React
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/PhilNiel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-blue-300 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/phillip-l-v-n/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-300 transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:phillipvincent@hotmail.dk"
              aria-label="Email"
              className="text-gray-500 hover:text-blue-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
