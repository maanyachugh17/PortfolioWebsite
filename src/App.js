import './App.css';
import heroPhoto from './hero.JPG';
import aboutPhoto from './about.jpg';
import breakPhoto1 from './break1.JPG';
import breakPhoto2 from './IMG_9887.jpeg';
import cityPhoto from './IMG_9881.jpeg';
import beachPhoto from './IMG_9890.jpeg';
import villagePhoto from './IMG_9889.jpeg';
import copenhagenPhoto from './IMG_9884.jpeg';
import sunsetPhoto from './IMG_9882.jpeg';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Analytics } from '@vercel/analytics/react';
import { initGoogleAnalytics, trackSectionView, trackEvent } from './analytics';

/** Ticker after About — aligned with Skills & Technologies + your stack */
const MARQUEE_SKILLS = [
  'Python', 'PyTorch', 'Java', 'C#', 'C++', 'JavaScript', 'SQL', 'HTML/CSS',
  'React', 'Flask', 'MongoDB', 'RAG', 'Git', 'KNIME', 'Unity',
  'NLP', 'Multimodal AI', 'Kotlin', 'Swift', 'Android Studio',
  'Machine Learning', 'Human-Centered Data Science', 'Figma', 'Tableau'
];

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'publications', label: 'Publications' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoreLeadership, setShowMoreLeadership] = useState(false);
  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const [showResearchMap, setShowResearchMap] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState(null);

  const roles = ['AI PM', 'AI Engineer', 'Hackathon Director', 'Product Manager', 'AI Researcher', 'Full Stack Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typePhase, setTypePhase] = useState('typing-in');

  const [statsVisible, setStatsVisible] = useState(false);
  const [statValues, setStatValues] = useState({ gpa: 0, hackathon: 0, internships: 0 });
  const [statsDone, setStatsDone] = useState(false);
  const statsRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!isLoading && activeSection) {
      trackSectionView(activeSection);
    }
  }, [activeSection, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Parallax on photo breaks
      document.querySelectorAll('.photo-break').forEach(container => {
        const rect = container.getBoundingClientRect();
        const winH = window.innerHeight;
        const progress = (winH - rect.top) / (winH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const offset = (clamped - 0.5) * -30;
        const img = container.querySelector('img');
        if (img) img.style.transform = `scale(1.15) translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setTypePhase('typing-out');
      setTimeout(() => {
        setRoleIndex(prev => (prev + 1) % roles.length);
        setTypePhase('typing-in');
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Scroll-triggered fade-in
  useEffect(() => {
    const targets = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, [isLoading]);

  // Stat counter observer
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isLoading]);

  // Animate stat numbers
  const animateStat = useCallback((target, key, duration, isFloat) => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = isFloat ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target);
      setStatValues(prev => ({ ...prev, [key]: val }));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setStatValues(prev => ({ ...prev, [key]: target }));
        setStatsDone(true);
      }
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (statsVisible) {
      animateStat(3.8, 'gpa', 1200, true);
      animateStat(250, 'hackathon', 1000, false);
      animateStat(2, 'internships', 1000, false);
    }
  }, [statsVisible, animateStat]);

  // Active nav section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.id);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isLoading]);

  // Cursor spotlight on project cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeMenu = () => setMenuOpen(false);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-content">
            <div className="loading-name">Maanya Chugh</div>
            <div className="loading-line"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`portfolio-root ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">Maanya Chugh</div>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={activeSection === link.id ? 'active' : ''}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a
            href="/Maanya_Chugh_Resume.pdf"
            className="btn-resume"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_download', { link_url: '/Maanya_Chugh_Resume.pdf' })}
          >
            Resume <span className="arrow-down">&#8595;</span>
          </a>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">&times;</button>
            {NAV_LINKS.map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={closeMenu}>{link.label}</a>
            ))}
            <a href="/Maanya_Chugh_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Resume</a>
          </div>
        </div>
      )}

      <main>
        {/* Hero */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-greeting">Hello, I'm</span>
              <h1 className="hero-title">Maanya Chugh</h1>
              <p className="hero-subtitle"><span className={`typed-role ${typePhase}`}>{roles[roleIndex]}</span></p>
              <p className="hero-description">
                IT student at UT Austin, specializing in Human-Centered Data Science. I build RAG and agentic AI systems at Tesla and Bank of America, research multimodal ML at the
                GiSense Lab, and run Hook &apos;Em Hacks.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary">View My Work</a>
                <a href="#contact" className="btn-secondary">Let's Connect</a>
              </div>
              <div className="hero-links">
                <a href="mailto:maanyac17@utexas.edu">Email</a>
                <span className="link-sep">/</span>
                <a href="https://www.linkedin.com/in/maanya-chugh-53999a222/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <span className="link-sep">/</span>
                <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer">GitHub</a>
                <span className="link-sep">/</span>
                <a href="https://devpost.com/maanyachugh17" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-container">
                <img src={heroPhoto} alt="Maanya Chugh" className="profile-pic" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* Currently */}
        <div className="currently-strip fade-in-section">
          <span className="currently-label">Currently</span>
          <div className="currently-items">
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="work">&#128188;</span> AI PM Intern at <strong>Tesla</strong>
            </div>
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="building">&#9881;</span> Building <strong>Hook &apos;Em Hacks</strong>
            </div>
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="research">&#128300;</span> Researching <strong>Multimodal AI</strong>
            </div>
          </div>
        </div>

        {/* About */}
        <section id="about" className="section fade-in-section">
          <h2>About Me</h2>
          <div className="about-layout">
            <div className="about-photo">
              <img src={aboutPhoto} alt="Maanya Chugh" loading="lazy" decoding="async" />
            </div>
            <div className="about-body">
              <p className="about-lede">
                I work where <strong>multimodal AI</strong> meets <strong>shipped software</strong>. In UT Austin&apos;s GiSense Lab that means
                running experiments across 12,000+ samples, fine-tuning models, and building reproducible preprocessing and evaluation pipelines.
              </p>
              <p className="about-follow">
                I run <strong>Hook &apos;Em Hacks</strong> end-to-end (sponsors, partnerships, ops) and help launch <strong>Hack48</strong>&apos;s Gen-Z hacker house in Austin.
                I&apos;m an AI PM intern at <strong>Tesla</strong> and spent this summer as an SWE intern at <strong>Bank of America</strong>, building RAG platforms and production data workflows.
                Open to research, collaborations, and opportunities where ML meets production systems.
              </p>
              <div className="about-stats" ref={statsRef}>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? statValues.gpa.toFixed(1) : '0.0'}</span>
                  <span className="stat-label">GPA</span>
                </div>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? `${statValues.hackathon}+` : '0'}</span>
                  <span className="stat-label">Hackathon Builders</span>
                </div>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? statValues.internships : '0'}</span>
                  <span className="stat-label">Fortune 500 Internships</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills marquee */}
        <div className="marquee-strip fade-in-section">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div className="marquee-content" key={i}>
                {MARQUEE_SKILLS.map(skill => (
                  <span key={`${i}-${skill}`}>{skill}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <section id="education" className="section fade-in-section">
          <h2>Education</h2>
          <div className="education-grid">
            <div className="education-item">
              <div className="education-content">
                <h3>University of Texas at Austin</h3>
                <p className="education-degree">Bachelor of Science in Information Technology (Honors)</p>
                <p className="education-details">Specializing in Human-Centered Data Science &middot; GPA: 3.8/4.0 &middot; Expected graduation: Winter 2027</p>
                <p className="education-details">Relevant Coursework: Data Structures, Applied Machine Learning with Python, Text Mining &amp; NLP Essentials, Mobile Application Development, Virtual Reality &amp; Game Design, Ethical AI, UI/UX Design</p>
                <p className="education-details">Activities: Hook &apos;Em Hacks (Director), Longhorn Developers (UX Design Fellow), Sigma Delta Tau (Social Chair PC &apos;25), Student Government, Indian Cultural Association, Type Texas, Texas Global Ambassador</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-content">
                <h3>Danish Institute for Study Abroad</h3>
                <p className="education-degree">UT Global Ambassador &middot; Copenhagen</p>
                <p className="education-details">Conducted hands-on research in Scandinavian health systems; proposed tech-driven care solutions &middot; Aug to Dec 2024</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-content">
                <h3>Y Combinator</h3>
                <p className="education-degree">AI Startup School</p>
                <p className="education-details">Selective cohort on building AI-native companies &middot; Jun to Jul 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo break — diptych */}
        <div className="photo-diptych fade-in-section">
          <div className="diptych-img">
            <img src={breakPhoto1} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="diptych-img">
            <img src={breakPhoto2} alt="" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Experience — dark band */}
        <div className="band-dark fade-in-section">
          <section id="experience" className="section">
            <h2>Experience</h2>
            <div className="entry-list">
              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>AI PM Intern, Supply Chain Systems</h3>
                    <span className="entry-company">Tesla</span>
                  </div>
                  <span className="entry-date">August 2026 to Present &middot; Fremont, CA</span>
                </div>
                <ul className="entry-details">
                  <li>Scaling an internal Retrieval-Augmented Generation (RAG) platform to support broader supply chain use cases by expanding its knowledge base without compromising retrieval accuracy</li>
                  <li>Partnering with planners to identify new data sources and requirements, translating operational needs into reliable AI-assisted workflows</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>SWE Intern, Global Technology</h3>
                    <span className="entry-company">Bank of America</span>
                  </div>
                  <span className="entry-date">May 2026 to August 2026 &middot; Pennington, NJ</span>
                </div>
                <ul className="entry-details">
                  <li>Architected and deployed an enterprise RAG platform, ingesting 1000+ multi-format internal assets (PDFs, spreadsheets) to generate vector embeddings and leveraging MongoDB vector search to enable AI-powered retrieval and automate 40% of manual tasks</li>
                  <li>Automated MongoDB operational workflows and data-processing pipelines, improving database platform scalability and reducing operational latency by 25%</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Austin City Lead</h3>
                    <span className="entry-company">Hack48</span>
                  </div>
                  <span className="entry-date">January 2026 to Present</span>
                </div>
                <ul className="entry-details">
                  <li>Organizing Austin&apos;s first Gen-Z hacker house for builders and innovators</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>AI Extern</h3>
                    <span className="entry-company">UT Austin WiSTEM</span>
                  </div>
                  <span className="entry-date">December 2025 to January 2026</span>
                </div>
                <ul className="entry-details">
                  <li>Winter 2025 externship focused on AI and semiconductor technologies through labs, talks, and applied projects</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Operations &amp; Technology</h3>
                    <span className="entry-company">Kupid Dating</span>
                  </div>
                  <span className="entry-date">January 2025 to January 2026</span>
                </div>
                <ul className="entry-details">
                  <li>Ran finances, logistics, and ops for multi-campus tours (UT Austin, UT Dallas, A&amp;M, UIUC, Rutgers)</li>
                  <li>Built internal workflows and lightweight tooling for events and coordination</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Founder &amp; Director</h3>
                    <span className="entry-company">
                      <a href="https://www.hookemhacks.com" target="_blank" rel="noopener noreferrer">
                        Hook &apos;Em Hacks at UT Austin
                      </a>
                    </span>
                  </div>
                  <span className="entry-date">September 2025 to Present</span>
                </div>
                <ul className="entry-details">
                  <li>Founded and directed operations for UT Austin&apos;s inaugural AI-focused hackathon with 250+ participants, managing a $10K budget, venue logistics, and sponsor outreach</li>
                  <li>Close sponsor relationships (Harper / YC W25, IBM, Vercel, HRT, AWS, Jane Street, and others)</li>
                  <li>Partner with SH1P and Velric on hiring and mission tracks inside the event</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Campus Ambassador</h3>
                    <span className="entry-company">Perplexity</span>
                  </div>
                  <span className="entry-date">September 2025 to February 2026</span>
                </div>
                <ul className="entry-details">
                  <li>Drove adoption of Perplexity on campus through demos, workshops, and office hours</li>
                  <li>Connected students and orgs with AI-powered research and productivity workflows</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Undergraduate Researcher, Multimodal AI</h3>
                    <span className="entry-company">GiSense Lab, UT Austin</span>
                  </div>
                  <span className="entry-date">August 2025 to Present</span>
                </div>
                <ul className="entry-details">
                  <li>Designed and ran multimodal experiments across nearly 12,000 samples, evaluating audio, visual, text, and spatial features through ablation studies and achieving an R&sup2; of 0.63</li>
                  <li>Fine-tuned models and optimized feature pipelines, hyperparameters, and training configurations, improving predictive performance by 10% and building automated preprocessing and evaluation workflows</li>
                  <li>Partnered across disciplines on multimodal AI for urban planning and environmental monitoring</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Growth Intern</h3>
                    <span className="entry-company">Fetii</span>
                  </div>
                  <span className="entry-date">August 2025 to November 2025</span>
                </div>
                <ul className="entry-details">
                  <li>Supported growth and GTM for an Austin-based ride-sharing startup</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>AI Agent Builder Intern</h3>
                    <span className="entry-company">NeuralSeek (Remote)</span>
                  </div>
                  <span className="entry-date">August 2025 to September 2025</span>
                </div>
                <ul className="entry-details">
                  <li>Built and deployed a custom AI agent on NeuralSeek&apos;s low-code platform, creating a portfolio-ready enterprise workflow tool</li>
                  <li>Delivered a competitive analysis of generative AI platforms, influencing product roadmap and market positioning</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>IT Intern, Internal Audit &amp; Data Analytics</h3>
                    <span className="entry-company">The Depository Trust &amp; Clearing Corporation (DTCC)</span>
                  </div>
                  <span className="entry-date">May 2025 to August 2025 &middot; Jersey City, NJ</span>
                </div>
                <ul className="entry-details">
                  <li>Engineered operational automation workflows using Python and KNIME, cutting audit cycle times by 25% and standardizing processes across 3 internal teams</li>
                  <li>Designed and validated a machine-learning model to support operational decision-making, achieving 86% accuracy and contributing to enterprise AI governance standards</li>
                  <li>Created and deployed a centralized KNIME Business Hub application to streamline audit processes, improving operational visibility and enabling coordination for 50+ users</li>
                </ul>
              </div>

              {showMoreExperience && (
                <>
                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Product &amp; Tech Intern</h3>
                        <span className="entry-company">Jetson Financial (Remote)</span>
                      </div>
                      <span className="entry-date">May 2023 to September 2023</span>
                    </div>
                    <ul className="entry-details">
                      <li>Conducted UX research and usability testing across multiple product flows, leading to a 20% increase in user satisfaction</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="cta-row">
              <button type="button" className="btn-secondary" onClick={() => setShowMoreExperience(!showMoreExperience)}>
                {showMoreExperience ? 'See fewer' : 'See more'}
              </button>
            </div>
          </section>
        </div>

        {/* Photo break — B&W city */}
        <div className="photo-break fade-in-section">
          <img src={cityPhoto} alt="" loading="lazy" decoding="async" />
        </div>

        {/* Projects */}
        <section id="projects" className="section fade-in-section">
          <h2>Featured Projects</h2>
          <div className="projects-grid stagger-children fade-in-section">
            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Enterprise RAG Platform</h3>
                <span className="project-tag">RAG / MongoDB</span>
              </div>
              <p>Built production RAG systems at Bank of America and Tesla: ingested 1000+ multi-format internal documents, MongoDB vector search, and AI-assisted workflows that automated 40% of manual tasks and cut operational latency by 25%.</p>
              <div className="project-tech">
                <span>MongoDB</span>
                <span>RAG</span>
                <span>Python</span>
                <span>Vector Search</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>AI-Driven Cardiac Risk Classifier</h3>
                <span className="project-tag">ML/Healthcare</span>
              </div>
              <p>Engineered machine learning pipelines on 10K+ EHRs, applying feature engineering to achieve 85% classification accuracy using Logistic Regression and Random Forest models. Streamlined data preprocessing stages to ensure fully reproducible workflows, reducing pipeline execution time by 30%.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Scikit-learn</span>
                <span>ML Pipelines</span>
                <span>EHR Analysis</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>SymptomSync</h3>
                <span className="project-tag">Clinical NLP</span>
              </div>
              <p>Developed NLP algorithms to extract clinical symptoms, generate automated triage logic, and support clinic decision-making flows. Optimized query matching using efficient data structures, reducing response latency by 36%.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>NLP</span>
                <span>Data Structures</span>
              </div>
            </div>

            <div
              className="project-card research-map-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowResearchMap(true)}
              onMouseMove={handleCardMouseMove}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowResearchMap(true);
                }
              }}
            >
              <div className="project-header">
                <h3>Research Map: Ethical and Environmental Governance of Space Commercialization</h3>
                <span className="project-tag">Research</span>
              </div>
              <p>Interactive research timeline exploring environmental and ethical governance frameworks for commercial space activity.</p>
              <div className="project-tech">
                <span>Research</span>
                <span>Policy Analysis</span>
                <span>Mixed Methods</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>QuantFin Analytics</h3>
                <span className="project-tag">Quantitative Finance</span>
              </div>
              <p>ML-powered price prediction and risk dashboards; 85% accuracy in stock direction and 23% risk reduction.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Machine Learning</span>
                <span>Financial Modeling</span>
                <span>Risk Analytics</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>EcoTrack Platform</h3>
                <span className="project-tag">Full Stack/ML</span>
              </div>
              <p>IoT + ML monitoring for air quality; improved pollution forecasting accuracy by 25% across 10+ cities.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>Python</span>
                <span>IoT</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>SmartRecruit AI</h3>
                <span className="project-tag">AI/HR Tech</span>
              </div>
              <p>NLP + ML matching engine; reduced hiring time by 40% and improved candidate fit by 30% (500+ resumes/day).</p>
              <div className="project-tech">
                <span>Python</span>
                <span>NLP</span>
                <span>Machine Learning</span>
                <span>FastAPI</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              More Projects on GitHub
            </a>
          </div>
        </section>

        {/* Skills — dark band */}
        <div className="band-dark fade-in-section">
          <section id="skills" className="section">
            <h2>Skills &amp; Technologies</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <div className="skill-grid">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">C#</span>
                  <span className="skill-tag">C++</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">Kotlin</span>
                  <span className="skill-tag">Swift</span>
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">HTML/CSS</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Frameworks &amp; Tools</h3>
                <div className="skill-grid">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">PyTorch</span>
                  <span className="skill-tag">Flask</span>
                  <span className="skill-tag">Unity</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Android Studio</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">KNIME</span>
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">Tableau</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Data Science &amp; Analytics</h3>
                <div className="skill-grid">
                  <span className="skill-tag">Machine Learning</span>
                  <span className="skill-tag">Statistical Analysis</span>
                  <span className="skill-tag">Financial Modeling</span>
                  <span className="skill-tag">Risk Management</span>
                  <span className="skill-tag">Time Series Analysis</span>
                  <span className="skill-tag">Quantitative Finance</span>
                  <span className="skill-tag">Pandas</span>
                  <span className="skill-tag">NumPy</span>
                  <span className="skill-tag">Scikit-learn</span>
                  <span className="skill-tag">TensorFlow</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Spoken Languages</h3>
                <div className="skill-grid">
                  <span className="skill-tag">English (Fluent)</span>
                  <span className="skill-tag">Hindi (Fluent)</span>
                  <span className="skill-tag">French (Basic)</span>
                  <span className="skill-tag">Danish (Basic)</span>
                </div>
              </div>
            </div>

            <div className="tech-showcase">
              <div className="tech-grid">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" title="C++" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" title="Flask" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" title="Firebase" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" loading="lazy" decoding="async" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" title="Figma" loading="lazy" decoding="async" />
              </div>
            </div>
          </section>
        </div>

        {/* Photo diptych — Swiss village + Copenhagen */}
        <div className="photo-diptych fade-in-section">
          <div className="diptych-img">
            <img src={villagePhoto} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="diptych-img">
            <img src={copenhagenPhoto} alt="" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Hackathon Wins */}
        <section id="hackathons" className="section fade-in-section">
          <h2>Hackathon Wins</h2>
          <div className="projects-grid stagger-children fade-in-section">
            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>1st Place, Marshall Wace Category</h3>
                <span className="project-tag">Hack @ Brown</span>
              </div>
              <p>Earned top honors in the Marshall Wace sponsored category at Brown University&apos;s hackathon (February 2026).</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Best Use of Gemini API</h3>
                <span className="project-tag">Hack @ Brown</span>
              </div>
              <p>Recognized for innovative application of Google&apos;s Gemini API at Hack @ Brown (February 2026).</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>1st Place, Best Use of Cryptocurrency</h3>
                <span className="project-tag">Technica at UMD</span>
              </div>
              <p>Top prize for cryptocurrency integration at UMD&apos;s women-focused hackathon.</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>1st Place, Data Visualization</h3>
                <span className="project-tag">South Brunswick Hackathon</span>
              </div>
              <p>Competed with 40+ teams and presented innovative data insights to Bloomberg employees.</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Best Hack for Social Good</h3>
                <span className="project-tag">Bridgewater-Raritan Hacks</span>
              </div>
              <p>Created an impactful solution addressing social challenges in the community.</p>
            </div>
          </div>
        </section>

        {/* Photo break — sunset */}
        <div className="photo-break fade-in-section">
          <img src={sunsetPhoto} alt="" loading="lazy" decoding="async" />
        </div>

        {/* Leadership */}
        <section id="leadership" className="section fade-in-section">
          <h2>Leadership &amp; Activities</h2>
          <div className="entry-list">
            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Designer &amp; UX Design Fellow</h3>
                  <span className="entry-company">Longhorn Developers &amp; UX Design Club, UT Registration Plus</span>
                </div>
                <span className="entry-date">March 2025 to Present</span>
              </div>
              <ul className="entry-details">
                <li>Redesigned core UI in Figma, improving course planning efficiency by 20%</li>
                <li>Lead product and design initiatives for student-developed applications and platforms</li>
                <li>Mentor fellow students in user-centered design principles and prototyping</li>
              </ul>
            </div>

            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Co-founder &amp; Advisory Panel Lead</h3>
                  <span className="entry-company">Students for Ethical Use of Technology</span>
                </div>
                <span className="entry-date">December 2024 to Present</span>
              </div>
              <ul className="entry-details">
                <li>Launched application process and advisory panel for student-led ethical tech initiatives</li>
                <li>Promote responsible AI development and ethical technology practices on campus</li>
                <li>Organize workshops and discussions on AI ethics and responsible innovation</li>
              </ul>
            </div>

            {showMoreLeadership && (
              <>
                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Community Engagement &amp; Advocacy Agency</h3>
                      <span className="entry-company">UT Austin Student Government</span>
                    </div>
                    <span className="entry-date">January 2025 to Present</span>
                  </div>
                  <ul className="entry-details">
                    <li>Represent student voice on community engagement; turn feedback into programming and campus events</li>
                    <li>Partner with SG and UT partners to improve student life and belonging</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Texas Global Ambassador</h3>
                      <span className="entry-company">Texas Global, UT Austin</span>
                    </div>
                    <span className="entry-date">August 2024 to January 2025</span>
                  </div>
                  <ul className="entry-details">
                    <li>Created compelling Instagram stories to encourage students to study abroad</li>
                    <li>Wrote a blog post detailing study abroad experience in Copenhagen</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Youth Ambassador Team Lead</h3>
                      <span className="entry-company">JDRF International</span>
                    </div>
                    <span className="entry-date">2018 to 2024</span>
                  </div>
                  <ul className="entry-details">
                    <li>Led 30+ fundraisers raising $50k+ for T1D research over 6 years</li>
                    <li>Advocated for insulin bill and managed social media campaigns</li>
                    <li>Directed ambassador program and coordinated community outreach</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>NJ Political Director &amp; Co-founder</h3>
                      <span className="entry-company">High School Democrats of America</span>
                    </div>
                    <span className="entry-date">2021 to 2024</span>
                  </div>
                  <ul className="entry-details">
                    <li>Led voting campaigns and coordinated events among 15+ schools</li>
                    <li>Organized pro-choice rally with 400+ students</li>
                    <li>Lobbied for sexual assault prevention bill at state level</li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="cta-row">
            <button className="btn-secondary" onClick={() => setShowMoreLeadership(!showMoreLeadership)}>
              {showMoreLeadership ? 'See fewer' : 'See more'}
            </button>
          </div>
        </section>

        {/* Photo break — resort */}
        <div className="photo-break fade-in-section">
          <img src={beachPhoto} alt="" loading="lazy" decoding="async" style={{ objectPosition: 'center 35%' }} />
        </div>

        {/* Publications */}
        <section id="publications" className="section fade-in-section">
          <h2>Publications</h2>
          <div className="publication-item">
            <div className="publication-content">
              <h3>"Dismantling Algorithmic Prejudice: Safeguarding Equity and Ethical Deliberation in A.I."</h3>
              <p className="publication-details">Greenhouse Publishing &middot; December 5, 2023</p>
              <p>Theoretical exploration of bias detection, mitigation, and fairness in AI systems, with insights into AI ethics, responsible innovation, and societal impact.</p>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="section fade-in-section">
          <h2>Awards &amp; Recognition</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-content">
                <h3>Houston Endowment President&apos;s Excellence Scholarship</h3>
                <p>Merit-based academic award at UT Austin for excellence, leadership, and community impact</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>NCWIT Aspirations in Computer Science</h3>
                <p>National recognition for outstanding achievement and leadership in computer science (December 2022)</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>NCWIT National Honorable Mention</h3>
                <p>Additional national recognition from NCWIT for excellence in computing (April 2023)</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>VEX Robotics Innovate &amp; Design Award</h3>
                <p>Earned prestigious robotics award competing against 50+ teams at state level</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>Bill J. Kennedy Grain of Wheat Scholarship</h3>
                <p>Scholarship awarded at South Brunswick High School</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="section fade-in-section">
          <h2>Certifications</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-content">
                <h3>AI Agents with MongoDB Skill Badge</h3>
                <p>MongoDB University &middot; Issued August 2026</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>AI Agent Foundations</h3>
                <p>NeuralSeek &middot; Issued August 2025</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>KNIME Level 1, Associate Certification</h3>
                <p>KNIME &middot; Issued June 2025</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>IS-700.b: Introduction to NIMS</h3>
                <p>Emergency Management Institute &middot; Issued February 2024</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>First Aid</h3>
                <p>American Heart Association &middot; Issued April 2023</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>CPR &amp; AED</h3>
                <p>American Red Cross &middot; Issued November 2022</p>
              </div>
            </div>
          </div>
        </section>

        {/* Big CTA */}
        <section className="cta-hero fade-in-section">
          <div className="cta-hero-inner">
            <h2 className="cta-hero-heading">Have an idea?<br />Let&apos;s make it real.</h2>
            <p className="cta-hero-sub">Research collaborations, internships, hackathons, or something weird at the edge of AI. I&apos;m easy to reach.</p>
            <div className="cta-hero-actions">
              <a href="mailto:maanyac17@utexas.edu" className="btn-primary">Say Hello</a>
              <a href="https://calendly.com/maanyachugh17/30-minute-meeting-clone" className="btn-secondary" target="_blank" rel="noopener noreferrer">Book a Meeting</a>
            </div>
          </div>
        </section>

        {/* Contact — dark band */}
        <div className="band-dark fade-in-section">
          <section id="contact" className="section">
            <div className="contact-split">
              <div className="contact-left">
                <h2>Contact</h2>
                <div className="contact-links-list">
                  <a href="mailto:maanyac17@utexas.edu" className="contact-link-row">
                    <span className="contact-link-label">UT Email</span>
                    <span className="contact-link-value">maanyac17@utexas.edu</span>
                  </a>
                  <a href="mailto:maanyachugh17@gmail.com" className="contact-link-row">
                    <span className="contact-link-label">Personal</span>
                    <span className="contact-link-value">maanyachugh17@gmail.com</span>
                  </a>
                  <a href="tel:8486672427" className="contact-link-row">
                    <span className="contact-link-label">Phone</span>
                    <span className="contact-link-value">(848) 667-2427</span>
                  </a>
                  <div className="contact-link-row">
                    <span className="contact-link-label">Location</span>
                    <span className="contact-link-value">New Jersey / Texas</span>
                  </div>
                </div>
              </div>
              <div className="contact-right">
                <form
                  className="contact-form"
                  action="https://formsubmit.co/maanyac17@utexas.edu"
                  method="POST"
                >
                  <input type="hidden" name="_subject" value="New portfolio message" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://www.maanyachugh.info/#contact" />
                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Your Email" required />
                  <textarea name="message" placeholder="Your Message" required></textarea>
                  <button type="submit" className="btn-primary">Send Message</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <div className="footer-text">&copy; {new Date().getFullYear()} Maanya Chugh</div>
            <div className="footer-location">Built in Austin, TX</div>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/maanya-chugh-53999a222/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://devpost.com/maanyachugh17" target="_blank" rel="noopener noreferrer">Devpost</a>
            <a href="mailto:maanyac17@utexas.edu">Email</a>
          </div>
        </div>
      </footer>

      {/* Research Map Modal */}
      {showResearchMap && createPortal(
        <div className="research-modal-overlay" onClick={() => setShowResearchMap(false)}>
          <div className="research-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="research-modal-header">
              <h2>Research Map: Ethical and Environmental Governance of Space Commercialization</h2>
              <button className="research-modal-close" onClick={() => setShowResearchMap(false)}>&times;</button>
            </div>
            <div className="research-timeline">
              {[
                { id: 1, title: 'Research Problem', icon: '01', content: 'The commercialization of space has rapidly shifted from government-led missions to privately dominated activity, raising environmental and ethical concerns. Companies such as SpaceX and Blue Origin present their missions as progress, yet research shows that orbital debris, satellite congestion, and unregulated resource extraction pose growing risks. Without enforceable governance structures, space could become another domain where short-term profit undermines long-term sustainability. This problem affects everyone, from scientists and policymakers to the general public who depend on satellite infrastructure. Decisions made now will shape whether outer space becomes a shared global commons or a site of exploitation.' },
                { id: 2, title: 'Literature Review & Gap', icon: '02', content: 'Existing research identifies key patterns: orbital debris behaves like an ecological commons, asteroid mining could support sustainability with strict regulation, and governance proposals exist but lack enforcement. Scholars highlight environmental capacity limits, ethical obligations to future generations, and the risk of unequal resource control. However, the field lacks empirical studies identifying which environmental metrics, monitoring tools, and benefit-sharing mechanisms are considered feasible or legitimate by experts. This gap matters because without empirical grounding, international space governance remains theoretical rather than actionable.' },
                { id: 3, title: 'Research Questions', icon: '03', content: 'RQ1: What environmental metrics do space-policy experts identify as necessary for defining sustainable orbital activity?\n\nRQ2: How do experts evaluate the feasibility of different monitoring tools for enforcing environmental limits in orbit?\n\nRQ3: Which benefit-sharing or compliance mechanisms are seen as equitable and politically viable for asteroid-mining governance?\n\nThese are explanatory questions because they seek to uncover mechanisms and reasoning behind governance preferences and feasibility.' },
                { id: 4, title: 'Methodology', icon: '04', content: 'This study uses a mixed-methods approach, combining qualitative interviews with quantitative analysis of orbital-debris datasets and policy documents. Mixed methods allow me to integrate expert judgment with measurable environmental patterns, which is necessary for connecting ethical principles to practical governance mechanisms.' },
                { id: 5, title: 'Data Collection', icon: '05', content: 'Participants include policymakers, researchers, and industry professionals with at least three years of experience in space governance or sustainability. Recruitment will occur through professional networks, email outreach, and academic/industry conferences. Qualitative data will come from semi-structured interviews conducted on Zoom, while quantitative data will be drawn from NASA orbital debris reports, UNOOSA registries, and Space-Track datasets. Interviews will explore expert views on environmental metrics, monitoring feasibility, and governance mechanisms.' },
                { id: 6, title: 'Data Analysis', icon: '06', content: 'Interview transcripts will be coded thematically using NVivo to identify shared reasoning patterns, definitions of sustainability, and feasibility assessments. Quantitative analysis in Python will summarize launch trends, debris growth, and regulatory adoption. These two data streams will be integrated through mixed-methods triangulation to develop a grounded model of sustainable space governance.' },
                { id: 7, title: 'Ethics', icon: '07', content: 'The study applies the principles of Respect for Persons, Beneficence, and Justice. Participation is voluntary and fully consented, interview data is anonymized upon request, and all files are stored securely. Justice is addressed by ensuring representation from both spacefaring and non-spacefaring perspectives. Because governance research involves expert professionals, questions are designed to minimize burden and avoid sensitive proprietary information.' },
                { id: 8, title: 'Impact', icon: '08', content: 'This research contributes new knowledge on how ethical and environmental principles can be transformed into enforceable governance tools for commercial space activity. The findings will help international agencies, policymakers, NGOs, and private firms design sustainable standards for orbital operations and asteroid mining. Results will be disseminated through academic publications, policy briefs, and presentations to organizations such as the UN Office for Outer Space Affairs. Ultimately, this work aims to support a future in which space is governed responsibly as a shared environment, a global commons, and a domain shaped by ethical foresight rather than unchecked exploitation.' }
              ].map((phase) => (
                <div key={phase.id} className={`research-timeline-item ${expandedPhase === phase.id ? 'expanded' : ''}`}>
                  <div className="research-timeline-marker" onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}>
                    <div className="research-timeline-icon">{phase.icon}</div>
                    <div className="research-timeline-line"></div>
                  </div>
                  <div className="research-timeline-content">
                    <h3 onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}>{phase.title}</h3>
                    {expandedPhase === phase.id && (
                      <div className="research-timeline-details">
                        <p>{phase.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Scroll to top */}
      <button
        className={`scroll-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        &uarr;
      </button>
      <Analytics />
    </div>
  );
}

export default App;
