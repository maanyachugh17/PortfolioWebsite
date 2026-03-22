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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMoreLeadership, setShowMoreLeadership] = useState(false);
  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const [showMoreEducation, setShowMoreEducation] = useState(false);
  const [showMoreVolunteering, setShowMoreVolunteering] = useState(false);
  const [showResearchMap, setShowResearchMap] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState(null);

  const roles = ['AI Engineer', 'Hackathon Director', 'UX Designer', 'Researcher', 'Full Stack Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typePhase, setTypePhase] = useState('typing-in');

  const [statsVisible, setStatsVisible] = useState(false);
  const [statValues, setStatValues] = useState({ gpa: 0, awards: 0, projects: 0 });
  const [statsDone, setStatsDone] = useState(false);
  const statsRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

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
    }, 2000);
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
      animateStat(4.0, 'gpa', 1200, true);
      animateStat(5, 'awards', 1000, false);
      animateStat(18, 'projects', 1400, false);
    }
  }, [statsVisible, animateStat]);

  // Active nav section tracking
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'education', 'experience', 'leadership', 'projects', 'skills', 'contact'];
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
          <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#education" className={activeSection === 'education' ? 'active' : ''}>Education</a></li>
          <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#leadership" className={activeSection === 'leadership' ? 'active' : ''}>Leadership</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
        <div className="nav-right">
          <a href="/Maanya_Chugh_Resume.pdf" className="btn-resume" target="_blank" rel="noopener noreferrer">
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
            <a href="#hero" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#leadership" onClick={closeMenu}>Leadership</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
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
                Multimodal AI researcher at UT Austin specializing in soundscape-to-image generation.
                Building intelligent systems that bridge auditory and visual perceptions for urban planning and environmental monitoring.
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
                <img src={heroPhoto} alt="Maanya Chugh" className="profile-pic" />
              </div>
            </div>
          </div>
        </section>

        {/* Currently */}
        <div className="currently-strip fade-in-section">
          <span className="currently-label">Currently</span>
          <div className="currently-items">
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="building">&#9881;</span> Building <strong>Hook 'Em Hacks</strong>
            </div>
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="research">&#128300;</span> Researching <strong>Multimodal AI</strong>
            </div>
            <div className="currently-item">
              <span className="currently-emoji" role="img" aria-label="reading">&#128214;</span> Reading <strong>Why Buddhism Is True</strong>
            </div>
          </div>
        </div>

        {/* About */}
        <section id="about" className="section fade-in-section">
          <h2>About Me</h2>
          <div className="about-layout">
            <div className="about-photo">
              <img src={aboutPhoto} alt="Maanya Chugh" />
            </div>
            <div className="about-body">
              <p>
                I'm a UT Austin student pursuing a BS in Information Technology with a focus on Data Science.
                Currently a student researcher exploring multimodal agentic AI in geospatial applications,
                as well as contributing to startups in the AI space. Also organizing a hackathon and hacker house in Austin!
                For fun, I like to read, play chess, and DJ.
              </p>
              <div className="about-stats" ref={statsRef}>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? statValues.gpa.toFixed(1) : '0.0'}</span>
                  <span className="stat-label">GPA</span>
                </div>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? `${statValues.awards}+` : '0'}</span>
                  <span className="stat-label">Awards</span>
                </div>
                <div className="stat-item">
                  <span className={`stat-number ${statsVisible ? 'counting' : ''} ${statsDone ? 'done' : ''}`}>{statsVisible ? `${statValues.projects}+` : '0'}</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee ticker */}
        <div className="marquee-strip">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div className="marquee-content" key={i}>
                <span>Python</span><span>PyTorch</span><span>React</span>
                <span>Figma</span><span>Machine Learning</span><span>UX Design</span>
                <span>Full Stack</span><span>Data Science</span><span>KNIME</span>
                <span>Hackathons</span><span>AI Ethics</span><span>Geospatial AI</span>
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
                <p className="education-degree">Bachelor of Science in Information Technology, Data Science</p>
                <p className="education-details">Minor in Computer Science &middot; GPA: 4.0/4.0 &middot; Aug 2024 – May 2027</p>
                <p className="education-details">Activities: Hook 'Em Hacks (Director), Longhorn Developers (UX Design Fellow), Sigma Delta Tau (Social Chair PC '25), Student Government, Indian Cultural Association, Type Texas, Texas Global Ambassador</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-content">
                <h3>DIS – Study Abroad in Copenhagen</h3>
                <p className="education-degree">UT Global Ambassador</p>
                <p className="education-details">Hands-on research in Scandinavian health systems; proposed tech-driven care solutions &middot; Aug – Dec 2024</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-content">
                <h3>Y Combinator</h3>
                <p className="education-degree">AI Startup School</p>
                <p className="education-details">Jun 2025 – Jul 2025</p>
              </div>
            </div>
            {showMoreEducation && (
              <>
                <div className="education-item">
                  <div className="education-content">
                    <h3>New York University</h3>
                    <p className="education-degree">UX Design Summer Program</p>
                    <p className="education-details">Accepted into NYU's competitive summer program; designed a mobile app prototype for voter engagement with professors over 2 weeks &middot; Jul – Aug 2023</p>
                  </div>
                </div>
                <div className="education-item">
                  <div className="education-content">
                    <h3>South Brunswick High School</h3>
                    <p className="education-degree">GPA: 4.0</p>
                    <p className="education-details">2020 – 2024</p>
                    <p className="education-details">Activities: Robotics, Student Council, Computer Science Academy, Girls Who Code, Junior State of America</p>
                  </div>
                </div>
                <div className="education-item">
                  <div className="education-content">
                    <h3>Middlesex College</h3>
                    <p className="education-degree">Dual Enrollment</p>
                    <p className="education-details">Dual enrollment courses taken alongside South Brunswick High School</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="cta-row">
            <button className="btn-secondary" onClick={() => setShowMoreEducation(!showMoreEducation)}>
              {showMoreEducation ? 'See fewer' : 'See more'}
            </button>
          </div>
        </section>

        {/* Photo break — diptych */}
        <div className="photo-diptych fade-in-section">
          <div className="diptych-img">
            <img src={breakPhoto1} alt="" />
          </div>
          <div className="diptych-img">
            <img src={breakPhoto2} alt="" />
          </div>
        </div>

        {/* Experience — dark band */}
        <div className="band-dark fade-in-section">
          <section id="experience" className="section">
            <h2>Experience</h2>
            <div className="entry-list">
              <div className="entry-item entry-incoming">
                <div className="entry-header">
                  <div>
                    <h3>Incoming SWE Intern – Global Technology <span className="incoming-badge">Summer 2026</span></h3>
                    <span className="entry-company">Bank of America</span>
                  </div>
                  <span className="entry-date">Pennington, NJ</span>
                </div>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Austin City Lead</h3>
                    <span className="entry-company">Hack48</span>
                  </div>
                  <span className="entry-date">January 2026 – Present</span>
                </div>
                <ul className="entry-details">
                  <li>Organizing Austin's first Gen-Z hacker house, creating a collaborative space for builders and innovators</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>Undergraduate Researcher – Multimodal AI</h3>
                    <span className="entry-company">SounDIT – GiSense Lab – UT Austin</span>
                  </div>
                  <span className="entry-date">August 2025 – Present</span>
                </div>
                <ul className="entry-details">
                  <li>Developed and optimized Python/PyTorch pipelines for audio-to-image generation, improving model accuracy by 10% through algorithmic fine-tuning and evaluation</li>
                  <li>Automated dataset curation workflows, reducing prep time by 5% and enabling scalable experimentation</li>
                  <li>Collaborated with cross-disciplinary teams to design multimodal AI applications for urban planning and environmental monitoring</li>
                </ul>
              </div>

              <div className="entry-item">
                <div className="entry-header">
                  <div>
                    <h3>IT Internal Audit Intern</h3>
                    <span className="entry-company">The Depository Trust & Clearing Corporation (DTCC)</span>
                  </div>
                  <span className="entry-date">June 2025 – August 2025</span>
                </div>
                <ul className="entry-details">
                  <li>Collaborated across 3 teams to deliver time-saving automation scripts and apps using Python and KNIME</li>
                  <li>Built a KNIME Business Hub app that centralized disparate audit processes, streamlining collaboration across multiple audit teams</li>
                  <li>Co-designed a custom ML model and contributed to AI governance policies, enhancing efficiency and trust in audit outcomes</li>
                </ul>
              </div>

              {showMoreExperience && (
                <>
                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>AI Extern</h3>
                        <span className="entry-company">UT Austin WiSTEM</span>
                      </div>
                      <span className="entry-date">December 2025 – January 2026</span>
                    </div>
                    <ul className="entry-details">
                      <li>Participated in UT Austin's Winter 2025 Women in STEM Externship focused on Artificial Intelligence and Semiconductor technologies</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Campus Ambassador</h3>
                        <span className="entry-company">Perplexity</span>
                      </div>
                      <span className="entry-date">September 2025 – February 2026</span>
                    </div>
                    <ul className="entry-details">
                      <li>Promoted Perplexity AI tools and features within the campus community</li>
                      <li>Organized workshops and events to showcase AI-powered research and productivity tools</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Growth Intern</h3>
                        <span className="entry-company">Fetii</span>
                      </div>
                      <span className="entry-date">August 2025 – November 2025</span>
                    </div>
                    <ul className="entry-details">
                      <li>Supported growth initiatives for a ride-sharing startup in Austin, Texas</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>AI Agent Builder Intern</h3>
                        <span className="entry-company">NeuralSeek – Remote</span>
                      </div>
                      <span className="entry-date">August 2025 – September 2025</span>
                    </div>
                    <ul className="entry-details">
                      <li>Built and deployed a production-ready AI agent using modular architecture, enabling enterprise workflow automation at scale</li>
                      <li>Conducted competitive analysis of generative AI platforms, influencing product roadmap decisions</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Intern</h3>
                        <span className="entry-company">NJDACC – NJ 16th Legislative District</span>
                      </div>
                      <span className="entry-date">July 2023 – June 2024</span>
                    </div>
                    <ul className="entry-details">
                      <li>Conducted voter outreach and event planning for Senator Zwicker and NJ Assembly representatives</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Programmer</h3>
                        <span className="entry-company">VEX Robotics – Team 750C</span>
                      </div>
                      <span className="entry-date">August 2020 – May 2024</span>
                    </div>
                    <ul className="entry-details">
                      <li>Programmed autonomous and driver-controlled routines for competitive robotics</li>
                      <li>Qualified for National championships</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Summer Intern</h3>
                        <span className="entry-company">Jetson</span>
                      </div>
                      <span className="entry-date">May 2023 – August 2023</span>
                    </div>
                    <ul className="entry-details">
                      <li>Summer programming intern for Jetson, a Top 40 company (Ondeck list) making fintech and investment accessible to teens</li>
                      <li>Conducted UX research & usability testing across multiple product flows, leading to a 20% increase in user satisfaction</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Summer Immersion Program</h3>
                        <span className="entry-company">Girls Who Code</span>
                      </div>
                      <span className="entry-date">July 2023</span>
                    </div>
                    <ul className="entry-details">
                      <li>Developed programs partnered with Synchrony Financial to gain hands-on experience with technology</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Sensei</h3>
                        <span className="entry-company">Code Ninjas Kendall Park</span>
                      </div>
                      <span className="entry-date">July 2022 – April 2023</span>
                    </div>
                    <ul className="entry-details">
                      <li>Taught all levels of code from Scratch to UnityHub to students aged 5 to 14</li>
                    </ul>
                  </div>

                  <div className="entry-item">
                    <div className="entry-header">
                      <div>
                        <h3>Technology Developer & Outreach Coordinator</h3>
                        <span className="entry-company">A Sustainable Future</span>
                      </div>
                      <span className="entry-date">October 2022 – May 2024</span>
                    </div>
                    <ul className="entry-details">
                      <li>Leveraged data modeling to optimize waste management for 10 educational institutions</li>
                      <li>Implemented tech-driven sustainability solutions with measurable improvements</li>
                      <li>Organized outreach campaigns and educational workshops on environmental responsibility</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="cta-row">
              <button className="btn-secondary" onClick={() => setShowMoreExperience(!showMoreExperience)}>
                {showMoreExperience ? 'See fewer' : 'See more'}
              </button>
            </div>
          </section>
        </div>

        {/* Leadership */}
        <section id="leadership" className="section fade-in-section">
          <h2>Leadership &amp; Activities</h2>
          <div className="entry-list">
            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Founder & Director</h3>
                  <span className="entry-company">
                    <a href="https://www.hookemhacks.com" target="_blank" rel="noopener noreferrer">
                      Hook 'Em Hacks – UT Austin
                    </a>
                  </span>
                </div>
                <span className="entry-date">November 2025 – Present</span>
              </div>
              <ul className="entry-details">
                <li>Directing an AI-focused hackathon at UT Austin with 250+ builders, 25+ mentors, and $10,000+ in prizes</li>
                <li>Secured sponsorships from Harper (YC W25), IBM, Vercel, Hudson River Trading, AWS, Jane Street, and more</li>
                <li>Building partnerships with SH1P and Velric to create hiring portals directly within the hackathon</li>
              </ul>
            </div>

            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Designer & UX Design Fellow</h3>
                  <span className="entry-company">Longhorn Developers & UX Design Club – UT Registration Plus</span>
                </div>
                <span className="entry-date">March 2025 – Present</span>
              </div>
              <ul className="entry-details">
                <li>Redesigned core UI in Figma, improving course planning efficiency by 20%</li>
                <li>Lead UX design initiatives for student-developed applications and platforms</li>
                <li>Mentor fellow students in user-centered design principles and prototyping</li>
              </ul>
            </div>

            {showMoreLeadership && (
              <>
                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Co-founder & Advisory Panel Lead</h3>
                      <span className="entry-company">Students for Ethical Use of Technology</span>
                    </div>
                    <span className="entry-date">December 2024 – Present</span>
                  </div>
                  <ul className="entry-details">
                    <li>Launched application process and advisory panel for student-led ethical tech initiatives</li>
                    <li>Promote responsible AI development and ethical technology practices on campus</li>
                    <li>Organize workshops and discussions on AI ethics and responsible innovation</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Community Engagement & Advocacy Agency</h3>
                      <span className="entry-company">UT Austin Student Government</span>
                    </div>
                    <span className="entry-date">January 2025 – Present</span>
                  </div>
                  <ul className="entry-details">
                    <li>Actively listened to student concerns and collaborated with committee members to implement social events</li>
                    <li>Enhanced student life and strengthened campus connections through community initiatives</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Texas Global Ambassador</h3>
                      <span className="entry-company">Texas Global – UT Austin</span>
                    </div>
                    <span className="entry-date">August 2024 – January 2025</span>
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
                    <span className="entry-date">2018 – 2024</span>
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
                      <h3>NJ Political Director & Co-founder</h3>
                      <span className="entry-company">High School Democrats of America</span>
                    </div>
                    <span className="entry-date">2021 – 2024</span>
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

        {/* Volunteering */}
        <section id="volunteering" className="section fade-in-section">
          <h2>Volunteering</h2>
          <div className="entry-list">
            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Medical Records Data Entry Volunteer</h3>
                  <span className="entry-company">Austin Pets Alive!</span>
                </div>
                <span className="entry-date">January 2026 – Present</span>
              </div>
              <ul className="entry-details">
                <li>Assist with accurate data entry and organization of animal medical records to support veterinary care and shelter operations</li>
              </ul>
            </div>

            <div className="entry-item">
              <div className="entry-header">
                <div>
                  <h3>Operations Strategist</h3>
                  <span className="entry-company">CRSH Media</span>
                </div>
                <span className="entry-date">January 2025 – January 2026</span>
              </div>
              <ul className="entry-details">
                <li>Managing the finances, logistics, and operations of the company</li>
                <li>Organizing college tour events at UT Austin, UT Dallas, A&M, UIUC, and Rutgers</li>
              </ul>
            </div>

            {showMoreVolunteering && (
              <>
                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Explorer</h3>
                      <span className="entry-company">Kendall Park First Aid & Rescue Squad</span>
                    </div>
                    <span className="entry-date">October 2022 – July 2024</span>
                  </div>
                  <ul className="entry-details">
                    <li>Participated in first aid and emergency response training and community service</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Youth Council Member</h3>
                      <span className="entry-company">American Red Cross</span>
                    </div>
                    <span className="entry-date">December 2022 – July 2024</span>
                  </div>
                  <ul className="entry-details">
                    <li>Served on the youth council supporting health and safety initiatives in the community</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Advisory Board Member</h3>
                      <span className="entry-company">TechGirls</span>
                    </div>
                    <span className="entry-date"></span>
                  </div>
                  <ul className="entry-details">
                    <li>Served on the advisory board supporting science and technology initiatives for young women</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Teaching Assistant</h3>
                      <span className="entry-company">Toastmasters International</span>
                    </div>
                    <span className="entry-date"></span>
                  </div>
                  <ul className="entry-details">
                    <li>Assisted with public speaking and communication skills development programs</li>
                  </ul>
                </div>

                <div className="entry-item">
                  <div className="entry-header">
                    <div>
                      <h3>Volunteer</h3>
                      <span className="entry-company">North South Foundation</span>
                    </div>
                    <span className="entry-date"></span>
                  </div>
                  <ul className="entry-details">
                    <li>Volunteered for educational programs and community outreach</li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="cta-row">
            <button className="btn-secondary" onClick={() => setShowMoreVolunteering(!showMoreVolunteering)}>
              {showMoreVolunteering ? 'See fewer' : 'See more'}
            </button>
          </div>
        </section>

        {/* Photo break — B&W city */}
        <div className="photo-break fade-in-section">
          <img src={cityPhoto} alt="" />
        </div>

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
                  <span className="skill-tag">Flask</span>
                  <span className="skill-tag">PyTorch</span>
                  <span className="skill-tag">Android Studio</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">KNIME</span>
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">Tableau</span>
                  <span className="skill-tag">Linux CLI</span>
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
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" title="C++" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" title="Flask" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" title="Firebase" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" title="Figma" />
              </div>
            </div>
          </section>
        </div>

        {/* Projects */}
        <section id="projects" className="section fade-in-section">
          <h2>Featured Projects</h2>
          <div className="projects-grid stagger-children fade-in-section">
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
                <h3>SymptomSync</h3>
                <span className="project-tag">AI/Healthcare</span>
              </div>
              <p>Clinical NLP triage assistant using HF Transformers + PyTorch for symptom extraction and diagnosis inference.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>NLP</span>
                <span>PyTorch</span>
                <span>HuggingFace</span>
              </div>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>AI-Driven Cardiac Risk Classifier</h3>
                <span className="project-tag">ML/Healthcare</span>
              </div>
              <p>ML pipelines on 10k+ EHRs; achieved 85% prediction accuracy for cardiac risk assessment.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Machine Learning</span>
                <span>Pandas</span>
                <span>EHR Analysis</span>
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

        {/* Photo diptych — Swiss village + Copenhagen */}
        <div className="photo-diptych fade-in-section">
          <div className="diptych-img">
            <img src={villagePhoto} alt="" />
          </div>
          <div className="diptych-img">
            <img src={copenhagenPhoto} alt="" />
          </div>
        </div>

        {/* Hackathon Wins */}
        <section id="hackathons" className="section fade-in-section">
          <h2>Hackathon Wins</h2>
          <div className="projects-grid stagger-children fade-in-section">
            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>1st Place – Marshall Wace Category</h3>
                <span className="project-tag">Hack @ Brown</span>
              </div>
              <p>Earned top honors in the Marshall Wace sponsored category at Brown University's hackathon (February 2026).</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Best Use of Gemini API</h3>
                <span className="project-tag">Hack @ Brown</span>
              </div>
              <p>Recognized for innovative application of Google's Gemini API at Hack @ Brown (February 2026).</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>1st Place – Data Visualization</h3>
                <span className="project-tag">South Brunswick Hackathon</span>
              </div>
              <p>Competed with 40+ teams and presented innovative data insights to Bloomberg employees.</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Best Use of Hedera</h3>
                <span className="project-tag">Technica – UMD Hackathon</span>
              </div>
              <p>Developed creative blockchain solution leveraging Hedera, earning top honors for innovation.</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Best Hack for Social Good</h3>
                <span className="project-tag">Bridgewater-Raritan Hacks</span>
              </div>
              <p>Created impactful solution addressing social challenges in the community.</p>
            </div>

            <div className="project-card" onMouseMove={handleCardMouseMove}>
              <div className="project-header">
                <h3>Honorable Mention</h3>
                <span className="project-tag">South Brunswick Hackathon</span>
              </div>
              <p>Recognized for outstanding project at the South Brunswick High School Hackathon (April 2023).</p>
            </div>
          </div>
        </section>

        {/* Photo break — resort */}
        <div className="photo-break fade-in-section">
          <img src={beachPhoto} alt="" style={{ objectPosition: 'center 35%' }} />
        </div>

        {/* Awards */}
        <section id="awards" className="section fade-in-section">
          <h2>Awards &amp; Recognition</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-content">
                <h3>Houston Endowment President's Excellence Scholarship</h3>
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
                <h3>National Merit Commended Scholar</h3>
                <p>Recognition for exceptional academic performance on the PSAT/NMSQT</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>AP Scholar with Distinction</h3>
                <p>Academic excellence recognition for outstanding performance in advanced placement courses</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>VEX Robotics Innovate & Design Award</h3>
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
                <h3>AI Agent Foundations</h3>
                <p>NeuralSeek &middot; Issued August 2025</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-content">
                <h3>KNIME Level 1 – Associate Certification</h3>
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

        {/* Publications */}
        <section id="publications" className="section fade-in-section">
          <h2>Publications</h2>
          <div className="publication-item">
            <div className="publication-content">
              <h3>"Dismantling Algorithmic Prejudice: Safeguarding Equity and Ethical Deliberation in A.I."</h3>
              <p className="publication-details">Greenhouse Publishing &middot; December 5, 2023</p>
              <p>A theoretical exploration of the intricate interplay between algorithmic decision-making, equity, and ethical considerations within AI systems.</p>
            </div>
          </div>
        </section>

        {/* Photo break — sunset over water */}
        <div className="photo-break fade-in-section">
          <img src={sunsetPhoto} alt="" />
        </div>

        {/* Big CTA */}
        <section className="cta-hero fade-in-section">
          <div className="cta-hero-inner">
            <h2 className="cta-hero-heading">Have an idea?<br />Let's make it real.</h2>
            <p className="cta-hero-sub">I'm always looking for the next interesting problem to solve, whether it's a hackathon, a research project, or a startup.</p>
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
                <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out! I\'ll get back to you soon.'); }}>
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
    </div>
  );
}

export default App;
