import './App.css';
import profilePic from './pfp.jpeg';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading screen
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">Maanya Chugh</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#leadership">Leadership</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-greeting">👋 Hello, I'm</span>
              <h1 className="hero-title">Maanya Chugh</h1>
              <p className="hero-subtitle">Undergraduate Researcher & AI Engineer</p>
              <p className="hero-description">
                Multimodal AI researcher at UT Austin specializing in soundscape-to-image generation. 
                Building intelligent systems that bridge auditory and visual perceptions for urban planning and environmental monitoring.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary">View My Work</a>
                <a href="#contact" className="btn-secondary">Let's Connect</a>
              </div>
              <div className="hero-links">
                <a href="mailto:maanyachugh17@gmail.com" className="social-link">📧</a>
                <a href="https://www.linkedin.com/in/maanya-chugh-53999a222/" target="_blank" rel="noopener noreferrer" className="social-link">💼</a>
                <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer" className="social-link">💻</a>
                <a href="https://devpost.com/maanyachugh17" target="_blank" rel="noopener noreferrer" className="social-link">🏆</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-container">
                <img src={profilePic} alt="Maanya Chugh" className="profile-pic" />
                <div className="profile-glow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section glass-card">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a UT Austin student pursuing a BSI in Information Technology with a focus on Data Science. Currently contributing as an undergraduate student researcher exploring multimodal agentic AI in geospacial applications as well as contributing to startups in the AI space. I love collaborating on projects that make a difference, and I'm always eager to learn, create, and connect with others who share my drive for positive change.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">4.0</span>
                <span className="stat-label">GPA</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Awards</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">18+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section glass-card">
          <h2>Education</h2>
          <div className="education-grid">
            <div className="education-item">
              <div className="education-icon">🎓</div>
              <div className="education-content">
                <h3>University of Texas at Austin</h3>
                <p className="education-degree">Bachelor of Science in Information Technology</p>
                <p className="education-details">Specializing in Human-Centered Data Science • Minor in Computer Science • GPA: 4.0/4.0 • Aug 2024 - May 2027</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-icon">🌍</div>
              <div className="education-content">
                <h3>Danish Institute for Study Abroad - UT Global Ambassador</h3>
                <p className="education-degree">Study Abroad Program</p>
                <p className="education-details">Hands-on research in Scandinavian health systems; proposed tech-driven care solutions • Aug - Dec 2024</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-icon">🎨</div>
              <div className="education-content">
                <h3>New York University</h3>
                <p className="education-degree">UX Design Course</p>
                <p className="education-details">Designed mobile app for voter engagement • Jun - Aug 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section glass-card">
          <h2>Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Undergraduate Researcher – Multimodal AI</h3>
                  <span className="timeline-company">SounDIT – GiSense Lab – UT Austin</span>
                  <span className="timeline-date">August 2025 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Developed and optimized Python/PyTorch pipelines for audio-to-image generation, improving model accuracy by 10% through algorithmic fine-tuning and evaluation</li>
                  <li>Automated dataset curation workflows, reducing prep time by 5% and enabling scalable experimentation</li>
                  <li>Collaborated with cross-disciplinary teams to design multimodal AI applications for urban planning and environmental monitoring</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>AI Agent Builder Intern</h3>
                  <span className="timeline-company">NeuralSeek - Remote</span>
                  <span className="timeline-date">August 2025 - September 2025</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Built and deployed a production-ready AI agent using modular architecture, enabling enterprise workflow automation at scale</li>
                  <li>Conducted competitive analysis of generative AI platforms, influencing product roadmap decisions</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Campus Ambassador</h3>
                  <span className="timeline-company">Perplexity</span>
                  <span className="timeline-date">September 2025 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Promoting Perplexity AI tools and features within the campus community</li>
                  <li>Organizing workshops and events to showcase AI-powered research and productivity tools</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>IT Intern – Internal Audit & Data Analytics</h3>
                  <span className="timeline-company">Depository Trust Clearing Corporation</span>
                  <span className="timeline-date">May 2025 - August 2025</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Automated audit test matrix generation in KNIME/Python, saving 10–15 hours per audit and scaling across recurring workflows</li>
                  <li>Built a KNIME Business Hub app that centralized disparate audit processes, streamlining collaboration across multiple audit teams</li>
                  <li>Co-designed a custom ML model and contributed to AI governance policies, enhancing efficiency and trust in audit outcomes</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Technology Developer & Outreach Coordinator</h3>
                  <span className="timeline-company">A Sustainable Future</span>
                  <span className="timeline-date">Oct 2022 - May 2024</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Leveraged data modeling to optimize waste management for 10 educational institutions</li>
                  <li>Implemented tech-driven sustainability solutions with measurable improvements</li>
                  <li>Organized outreach campaigns and educational workshops on environmental responsibility</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Product & Tech Intern</h3>
                  <span className="timeline-company">Jetson Financial</span>
                  <span className="timeline-date">May - Sep 2023</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Conducted UX research & usability testing across multiple product flows, leading to a 20% increase in user satisfaction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Activities Section */}
        <section id="leadership" className="section glass-card">
          <h2>Leadership & Activities</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Director</h3>
                  <span className="timeline-company">
                    <a href="https://www.hookemhacks.com" target="_blank" rel="noopener noreferrer">
                      Hook 'Em Hacks - UT Austin
                    </a>
                  </span>
                  <span className="timeline-date">2025 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Leading a new organization at UT Austin dedicated to organizing hackathons and fostering innovation in the tech community</li>
                  <li>Planning and executing hackathon events to bring together students, developers, and innovators</li>
                  <li>Building partnerships with sponsors and coordinating logistics for large-scale tech events</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Designer & UX Design Fellow</h3>
                  <span className="timeline-company">Longhorn Developers & UX Design Club - UT Registration Plus</span>
                  <span className="timeline-date">March 2025 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Redesigned core UI in Figma, improving course planning efficiency by 20%</li>
                  <li>Lead UX design initiatives for student-developed applications and platforms</li>
                  <li>Mentor fellow students in user-centered design principles and prototyping</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Co-founder & Advisory Panel Lead</h3>
                  <span className="timeline-company">Students for Ethical Use of Technology</span>
                  <span className="timeline-date">December 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Launched application process and advisory panel for student-led ethical tech initiatives</li>
                  <li>Promote responsible AI development and ethical technology practices on campus</li>
                  <li>Organize workshops and discussions on AI ethics and responsible innovation</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Community Engagement Agency Member</h3>
                  <span className="timeline-company">Student Government - UT Austin</span>
                  <span className="timeline-date">Aug 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Represent student interests and advocate for community needs at university level</li>
                  <li>Organize campus-wide events and initiatives to foster student engagement</li>
                  <li>Collaborate with administration to implement student-driven policy changes</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Texas Global Ambassador</h3>
                  <span className="timeline-company">Texas Global - UT Austin</span>
                  <span className="timeline-date">Aug 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Represent UT Austin at international events and promote global engagement</li>
                  <li>Assist international students with cultural integration and campus resources</li>
                  <li>Organize cross-cultural events and international student orientation programs</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Youth Ambassador Team Lead</h3>
                  <span className="timeline-company">Juvenile Diabetes Research Foundation (JDRF)</span>
                  <span className="timeline-date">2018 - 2024</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Led 30+ fundraisers raising $50k+ for T1D research over 6 years</li>
                  <li>Advocated for insulin bill and managed social media campaigns</li>
                  <li>Directed ambassador program and coordinated community outreach</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>NJ Political Director & Co-founder</h3>
                  <span className="timeline-company">High School Democrats of America</span>
                  <span className="timeline-date">2021 - 2024</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Led voting campaigns and coordinated events among 15+ schools</li>
                  <li>Organized pro-choice rally with 400+ students</li>
                  <li>Lobbied for sexual assault prevention bill at state level</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Code Ninjas Teacher/Sensei</h3>
                  <span className="timeline-company">Code Ninjas</span>
                  <span className="timeline-date">2019 - 2022</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Mentored 100+ young coders (ages 8-14) in programming fundamentals</li>
                  <li>Oversaw 20+ game development projects using Unity and C#</li>
                  <li>Taught block coding, Java, and advanced programming concepts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section glass-card">
          <h2>Skills & Technologies</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Languages</h3>
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
              <h3>Frameworks & Tools</h3>
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
              <h3>Data Science & Analytics</h3>
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
              <h3>Languages</h3>
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

        {/* Projects Section */}
        <section id="projects" className="section glass-card">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
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

            <div className="project-card">
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

            <div className="project-card">
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

            <div className="project-card">
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

            <div className="project-card">
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

            <div className="project-card">
              <div className="project-header">
                <h3>More on GitHub</h3>
                <span className="project-tag">Portfolio</span>
              </div>
              <p>See additional builds, prototypes, and hackathon projects.</p>
              <div className="project-tech">
                <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.4rem 0.8rem', borderRadius: '12px' }}>View GitHub</a>
              </div>
            </div>
          </div>
        </section>

        {/* Hackathon Wins Section */}
        <section id="hackathons" className="section glass-card">
          <h2>Hackathon Wins</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <h3>1st Place - Data Visualization</h3>
                <span className="project-tag">South Brunswick Hackathon</span>
              </div>
              <p>Led team to victory presenting innovative data insights to Bloomberg engineers.</p>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>1st Place - Best Use of Cryptocurrency</h3>
                <span className="project-tag">Technica UMD Hackathon</span>
              </div>
              <p>Developed creative blockchain solution earning top honors for innovation.</p>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Best Hack for Social Good</h3>
                <span className="project-tag">Bridgewater Raritan Hacks</span>
              </div>
              <p>Created impactful solution addressing social challenges in the community.</p>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="section glass-card">
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <div className="award-content">
                <h3>Houston Endowment President's Excellence Scholarship</h3>
                <p>Awarded for academic excellence, leadership, and community impact at UT Austin</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">💻</div>
              <div className="award-content">
                <h3>NCWIT Aspirations in Computer Science Award</h3>
                <p>National recognition for outstanding achievement and leadership in computer science</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">📊</div>
              <div className="award-content">
                <h3>1st Place in Data Visualization @ SB Hackathon</h3>
                <p>Led team to victory presenting innovative data insights to Bloomberg engineers</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">💰</div>
              <div className="award-content">
                <h3>1st Place Technica Hackathon: Best Use of Cryptocurrency</h3>
                <p>Developed creative blockchain solution earning top honors for innovation</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <div className="award-content">
                <h3>National Merit Commended Scholar & AP Scholar with Honor</h3>
                <p>Academic excellence recognition for outstanding performance in advanced placement courses</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">🤖</div>
              <div className="award-content">
                <h3>VEX Robotics Innovate & Design Award</h3>
                <p>Earned prestigious robotics award competing against 50+ teams at state level</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">📚</div>
              <div className="award-content">
                <h3>Girls Who Code Summer Immersion Program</h3>
                <p>Selected for competitive program teaching advanced programming and computer science concepts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section glass-card">
          <h2>Let's Connect</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>I'm always excited to collaborate on innovative projects and connect with fellow tech enthusiasts!</p>
              <div className="contact-items">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <a href="mailto:maanyachugh17@gmail.com">maanyachugh17@gmail.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <a href="tel:8486672427">(848) 667-2427</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>New Jersey / Texas</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📅</span>
                  <a href="https://calendly.com/maanyachugh17/30min" target="_blank" rel="noopener noreferrer">Book a Meeting</a>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out! I\'ll get back to you soon.'); }}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="section glass-card">
          <h2>Publications</h2>
          <div className="publication-item">
            <div className="publication-icon">📚</div>
            <div className="publication-content">
              <h3>"Dismantling Algorithmic Prejudice"</h3>
              <p className="publication-details">Greenhouse Publishing, 2023</p>
              <p>Theoretical exploration of bias, fairness, and ethics in AI systems.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      <button 
        className={`scroll-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default App;
