import './App.css';
import profilePic from './profile.jpg';
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
              <p className="hero-subtitle">Full Stack Developer & AI Engineer</p>
              <p className="hero-description">
                Building end-to-end applications with modern web technologies and AI/ML solutions. 
                From frontend interfaces to backend systems and intelligent algorithms.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary">View My Work</a>
                <a href="#contact" className="btn-secondary">Let's Connect</a>
              </div>
              <div className="hero-links">
                <a href="mailto:maanyac17@utexas.edu" className="social-link">📧</a>
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
                I'm a passionate technologist and Informatics student at UT Austin, blending software engineering, 
                data science, and a commitment to ethical, human-centered technology. Whether I'm building AI tools 
                to improve healthcare, designing engaging games, or leading student initiatives for responsible tech, 
                I thrive at the intersection of innovation and impact.
              </p>
              <p>
                I love collaborating on projects that make a difference, and I'm always eager to learn, create, 
                and connect with others who share my drive for positive change.
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
                <p className="education-degree">B.S. in Information Technology, Human-Centered Data Science</p>
                <p className="education-details">Minor in CS • GPA: 4.0 • Aug 2024 - May 2027</p>
              </div>
            </div>
            <div className="education-item">
              <div className="education-icon">🌍</div>
              <div className="education-content">
                <h3>DIS Copenhagen, Denmark</h3>
                <p className="education-degree">Study Abroad Program</p>
                <p className="education-details">Research on tech-driven healthcare solutions • Aug - Dec 2024</p>
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
                  <h3>IT Intern – Internal Audit & Data Analytics</h3>
                  <span className="timeline-company">Depository Trust Clearing Corporation</span>
                  <span className="timeline-date">May 2025 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Automated manual workflows, reducing departmental processing time by 6%</li>
                  <li>Developed KNIME Business Hub application for centralized audit processes</li>
                  <li>Contributed to enterprise-wide AI governance policies and custom AI model development</li>
                  <li>Gained experience in cross-functional teamwork and agile development</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Voter Engagement Intern</h3>
                  <span className="timeline-company">Zwicker, Freiman, & Drulis Political Campaign</span>
                  <span className="timeline-date">May 2023 - Oct 2024</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Coordinated voting drive engaging 500+ voters, increasing turnout by 8%</li>
                  <li>Organized campaign events for underrepresented groups</li>
                  <li>Developed digital content and managed social media outreach</li>
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
                  <li>Conducted user research and testing to optimize UX</li>
                  <li>Delivered bi-weekly product demos with 90% user engagement</li>
                  <li>Boosted satisfaction scores by 20% through interface improvements</li>
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
                  <h3>UX Design Fellow</h3>
                  <span className="timeline-company">Longhorn Developers - UT Austin</span>
                  <span className="timeline-date">Aug 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Lead UX design initiatives for student-developed applications and platforms</li>
                  <li>Mentor fellow students in user-centered design principles and prototyping</li>
                  <li>Collaborate with development teams to create intuitive user experiences</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Operations Strategist</h3>
                  <span className="timeline-company">Kupid Dating - UT Austin</span>
                  <span className="timeline-date">Aug 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Develop and implement strategic initiatives to enhance user engagement and platform growth</li>
                  <li>Analyze user data and market trends to optimize dating app operations</li>
                  <li>Coordinate cross-functional teams to improve user experience and retention</li>
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
                  <h3>Active Member</h3>
                  <span className="timeline-company">Indian Cultural Association & Type Texas - UT Austin</span>
                  <span className="timeline-date">Aug 2024 - Present</span>
                </div>
                <ul className="timeline-achievements">
                  <li>Participate in cultural events and promote diversity on campus</li>
                  <li>Contribute to typography and design community through Type Texas</li>
                  <li>Foster inclusive environment and cultural exchange among students</li>
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
                  <li>Leveraged advanced data modeling to optimize waste management for 10 educational institutions</li>
                  <li>Implemented tech-driven sustainability solutions with measurable improvements</li>
                  <li>Organized outreach campaigns and educational workshops on environmental responsibility</li>
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
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">Android Studio</span>
                <span className="skill-tag">Xcode</span>
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
              <p>Clinical NLP Triage Assistant leveraging HuggingFace Transformers and PyTorch for symptom extraction and diagnosis inference.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>NLP</span>
                <span>PyTorch</span>
                <span>HuggingFace</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Cardiac Risk Classifier</h3>
                <span className="project-tag">ML/Healthcare</span>
              </div>
              <p>ML pipeline analyzing 10,000+ EHRs to detect cardiac arrhythmias with 85% accuracy using SVMs and decision trees.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Machine Learning</span>
                <span>Pandas</span>
                <span>SVM</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>SpaceShooter Game</h3>
                <span className="project-tag">Game Dev</span>
              </div>
              <p>Fast-paced arcade game with engaging gameplay mechanics, collision detection, and scoring system.</p>
              <div className="project-tech">
                <span>Unity</span>
                <span>C#</span>
                <span>Game Design</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>GPS Tracker App</h3>
                <span className="project-tag">Mobile Dev</span>
              </div>
              <p>Real-time location tracking mobile app with clean UI and robust location services integration.</p>
              <div className="project-tech">
                <span>Java</span>
                <span>Android Studio</span>
                <span>GPS</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Weather App</h3>
                <span className="project-tag">Mobile Dev</span>
              </div>
              <p>Mobile weather application providing detailed forecasts with user-friendly, visually appealing interface.</p>
              <div className="project-tech">
                <span>Mobile Dev</span>
                <span>API Integration</span>
                <span>UI/UX</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Text Message App</h3>
                <span className="project-tag">Mobile Dev</span>
              </div>
              <p>Cross-platform messaging app with auto-generated responses and seamless user experience.</p>
              <div className="project-tech">
                <span>Java</span>
                <span>Mobile Dev</span>
                <span>UX Design</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>QuantFin Analytics</h3>
                <span className="project-tag">Quantitative Finance</span>
              </div>
              <p>Comprehensive financial analysis platform with ML-powered price prediction, risk management, and interactive dashboards. Achieved 85% accuracy in stock direction prediction and 23% risk reduction through portfolio optimization.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Machine Learning</span>
                <span>Financial Modeling</span>
                <span>Risk Analytics</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>MediAI Assistant</h3>
                <span className="project-tag">AI/Healthcare</span>
              </div>
              <p>AI-powered medical diagnosis assistant using computer vision and NLP. Processes medical images and patient symptoms to provide preliminary diagnoses with 92% accuracy. Integrated with hospital EHR systems.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>TensorFlow</span>
                <span>Computer Vision</span>
                <span>NLP</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>EcoTrack Platform</h3>
                <span className="project-tag">Full Stack/ML</span>
              </div>
              <p>Environmental monitoring platform combining IoT sensors, ML predictions, and real-time analytics. Tracks air quality, predicts pollution levels, and provides actionable insights for 10+ cities. 25% improvement in prediction accuracy.</p>
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
              <p>Intelligent recruitment platform using NLP and ML to match candidates with job requirements. Reduces hiring time by 40% and improves candidate-job fit by 30%. Processes 500+ resumes daily.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>NLP</span>
                <span>Machine Learning</span>
                <span>FastAPI</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>CryptoVault Exchange</h3>
                <span className="project-tag">Blockchain/Finance</span>
              </div>
              <p>Secure cryptocurrency exchange platform with real-time trading, portfolio management, and advanced security features. Handles $50K+ daily trading volume with 99.5% uptime and zero security breaches.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>Blockchain</span>
                <span>Web3</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>DataViz Studio</h3>
                <span className="project-tag">Data Science</span>
              </div>
              <p>Interactive data visualization platform for business intelligence. Features real-time dashboards, predictive analytics, and automated reporting. Used by 25+ companies for data-driven decision making.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>D3.js</span>
                <span>Tableau</span>
                <span>SQL</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>VoiceFlow Assistant</h3>
                <span className="project-tag">AI/NLP</span>
              </div>
              <p>Voice-controlled AI assistant with natural language processing and multi-language support. Integrates with smart home devices and provides personalized responses. 85% accuracy in voice recognition.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>Speech Recognition</span>
                <span>NLP</span>
                <span>IoT</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>SecureChat Pro</h3>
                <span className="project-tag">Cybersecurity</span>
              </div>
              <p>End-to-end encrypted messaging platform with advanced security features including biometric authentication, message self-destruct, and secure file sharing. 5,000+ active users with military-grade encryption.</p>
              <div className="project-tech">
                <span>React Native</span>
                <span>Node.js</span>
                <span>Cryptography</span>
                <span>WebRTC</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>Mindful Moments Podcast</h3>
                <span className="project-tag">Mental Health/Tech</span>
              </div>
              <p>Mental health podcast for teens with 150+ Instagram followers. Created content strategy, managed social media, and built community around teen mental health awareness. Featured guest speakers and expert interviews.</p>
              <div className="project-tech">
                <span>Content Creation</span>
                <span>Social Media</span>
                <span>Community Building</span>
                <span>Mental Health</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>TechGirls STEM Platform</h3>
                <span className="project-tag">Education/Tech</span>
              </div>
              <p>Developed coding curriculum and taught STEM workshops to 50+ girls. Wrote AI ethics blogs reaching 500+ subscribers. Led executive board initiatives to increase female representation in tech.</p>
              <div className="project-tech">
                <span>Curriculum Design</span>
                <span>STEM Education</span>
                <span>Content Writing</span>
                <span>Leadership</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h3>VEX Robotics Strategy System</h3>
                <span className="project-tag">Robotics/Engineering</span>
              </div>
              <p>Led robotics team to consecutive state qualifications and nationals invite. Built robot expansion, devised match strategies, and earned Innovate & Design Award competing against 50+ teams.</p>
              <div className="project-tech">
                <span>Robotics</span>
                <span>Engineering</span>
                <span>Strategy</span>
                <span>Team Leadership</span>
              </div>
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
                  <a href="mailto:maanyac17@utexas.edu">maanyac17@utexas.edu</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <a href="tel:8486672427">(848) 667-2427</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>New Jersey / Texas</span>
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
