import './App.css';
import profilePic from './profile.jpg';

function App() {
  return (
    <div className="portfolio-root">
      <nav className="navbar">
        <div className="logo">Maanya Chugh</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#awards">Awards</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <main>
        <section id="about" className="section about">
          <div className="about-content">
            <img src={profilePic} alt="Maanya Chugh" className="profile-pic" />
            <div>
              <h1>Hi, I'm Maanya Chugh</h1>
              <p>
                I'm a passionate technologist and Informatics student at UT Austin, blending software engineering, data science, and a commitment to ethical, human-centered technology. Whether I'm building AI tools to improve healthcare, designing engaging games, or leading student initiatives for responsible tech, I thrive at the intersection of innovation and impact. I love collaborating on projects that make a difference, and I'm always eager to learn, create, and connect with others who share my drive for positive change.
              </p>
              <div className="about-links">
                <a href="mailto:maanyac17@utexas.edu">maanyac17@utexas.edu</a> · <a href="tel:8486672427">(848) 667-2427</a> · New Jersey/Texas
                <br/>
                <a href="https://www.linkedin.com/in/maanya-chugh-53999a222/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                <a href="https://github.com/maanyachugh17" target="_blank" rel="noopener noreferrer">GitHub</a> |
                <a href="https://devpost.com/maanyachugh17" target="_blank" rel="noopener noreferrer">Devpost</a>
              </div>
              <a className="cta-btn" href="#contact">Let's Connect!</a>
            </div>
          </div>
        </section>
        <section id="education" className="section">
          <h2>Education</h2>
          <ul>
            <li><b>University of Texas at Austin</b> (Aug 2024 - May 2027)<br/>B.S. in Information Technology, Human-Centered Data Science, Minor in CS, GPA: 4.0</li>
            <li><b>DIS Copenhagen, Denmark</b> (Aug - Dec 2024)<br/>Study Abroad: Research on tech-driven healthcare solutions</li>
            <li><b>New York University</b> (Jun - Aug 2023)<br/>UX Design Course: Designed a mobile app for voter engagement</li>
          </ul>
        </section>
        <section id="experience" className="section">
          <h2>Experience</h2>
          <ul>
            <li><b>Depository Trust Clearing Corporation</b> (May 2025 - Present)<br/>
              <span>IT Intern – Internal Audit & Data Analytics</span><br/>
              <ul>
                <li>Automated manual workflows, including test matrix generation, reducing departmental processing time by 6% and freeing up team resources for higher-impact work.</li>
                <li>Collaborated across two teams to develop a KNIME Business Hub application, centralizing and streamlining audit processes for greater transparency and efficiency.</li>
                <li>Supported the creation of enterprise-wide AI governance policies and contributed to the development of a custom AI model designed to enhance internal audit efficiency and accuracy.</li>
                <li>Gained hands-on experience in cross-functional teamwork, agile development, and the intersection of technology and compliance in the financial sector.</li>
              </ul>
            </li>
            <li><b>A Sustainable Future</b> (Oct 2022 - May 2024)<br/>
              <span>Technology Developer & Outreach Coordinator</span><br/>
              <ul>
                <li>Leveraged advanced data modeling techniques to pinpoint operational inefficiencies within waste management processes, optimizing resource allocation and boosting sustainability performance for ten educational institutions.</li>
                <li>Worked closely with school administrators and sustainability advocates to implement tech-driven solutions, resulting in measurable improvements in recycling rates and resource usage.</li>
                <li>Organized outreach campaigns and educational workshops to raise awareness about environmental responsibility and the power of data-driven decision making.</li>
              </ul>
            </li>
            <li><b>Zwicker, Freiman, & Drulis Political Campaign</b> (May 2023 - Oct 2024)<br/>
              <span>Voter Engagement Intern</span><br/>
              <ul>
                <li>Coordinated a large-scale voting drive, engaging over 5,000 voters and increasing turnout by 8% in the targeted district through creative outreach and community events.</li>
                <li>Organized campaign events to boost political awareness among underrepresented groups, fostering a more inclusive and informed electorate.</li>
                <li>Developed digital content and managed social media to amplify campaign messaging and connect with younger voters.</li>
              </ul>
            </li>
            <li><b>Jetson Financial</b> (May - Sep 2023)<br/>
              <span>Product & Tech Intern</span><br/>
              <ul>
                <li>Conducted user research and testing to identify pain points and optimize the user experience, creating a more intuitive interface for financial products.</li>
                <li>Presented bi-weekly product demos to stakeholders, driving 90% user engagement in the first month and boosting satisfaction scores by 20%.</li>
                <li>Collaborated with cross-functional teams to deliver new features and improvements on a rapid timeline, learning the value of agile development and user-centered design.</li>
              </ul>
            </li>
          </ul>
        </section>
        <section id="resume" className="section">
          <h2>Resume</h2>
          <a className="cta-btn" href="/resume.pdf" download>Download My Resume (PDF)</a>
        </section>
        <section id="techstack" className="section">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" title="C++" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" title="Flask" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" title="Firebase" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" alt="Android Studio" title="Android Studio" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" alt="Xcode" title="Xcode" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" title="Linux" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" title="Figma" />
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/knime.svg" alt="KNIME" title="KNIME" style={{background: '#fff', borderRadius: '8px', padding: '4px'}} />
          </div>
        </section>
        <section id="testimonials" className="section">
          <h2>Testimonials</h2>
          <div className="testimonials-list">
            <blockquote>
              "Maanya is a creative problem solver who brings energy and empathy to every project. Her technical skills are matched only by her passion for making a difference."<br/>
              <span>- Mentor, UT Austin</span>
            </blockquote>
            <blockquote>
              "Working with Maanya was a fantastic experience. She's a natural leader and a true collaborator—always ready to help and inspire those around her."<br/>
              <span>- Peer, Hackathon Team</span>
            </blockquote>
          </div>
        </section>
        <section id="contactform" className="section contact">
          <h2>Contact Me</h2>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out!'); }}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit" className="cta-btn">Send Message</button>
          </form>
        </section>
        <section id="projects" className="section">
          <h2>Projects</h2>
          <ul>
            <li><b>SymptomSync – Clinical NLP Triage Assistant</b>:<br/>
              An intelligent command-line triage assistant that leverages advanced NLP (HuggingFace Transformers, MedNER) and PyTorch to extract symptoms from user input, infer potential diagnoses, and generate structured clinical guidance. Built to empower healthcare professionals with faster, more accurate patient triage and to explore the real-world impact of AI in medicine.
            </li>
            <li><b>AI-Driven Cardiac Risk Classifier</b>:<br/>
              Developed a machine learning pipeline to analyze over 10,000 EHRs and detect cardiac arrhythmias with 85% accuracy using SVMs and decision trees. Cleaned and visualized data with Pandas and Matplotlib, focusing on actionable insights for clinicians and real-world healthcare impact.
            </li>
            <li><b>SpaceShooter</b>:<br/>
              A fast-paced arcade game where players control a spaceship and shoot missiles at incoming objects. Designed engaging gameplay mechanics and visuals, and implemented collision detection and scoring. Built with Unity and C#.
            </li>
            <li><b>RunGame</b>:<br/>
              Inspired by the classic Run game on Coolmath Games, this endless runner challenges players to navigate obstacles and survive as long as possible. Developed in Unity using C#, with custom level design and physics.
            </li>
            <li><b>Tracker</b>:<br/>
              A GPS-based mobile app that allows users to track locations and routes in real time. Built with Java and Android Studio, featuring a clean UI and robust location services integration.
            </li>
            <li><b>WeatherApp</b>:<br/>
              A mobile application that provides detailed weather forecasts for the next several days. Utilized public APIs and focused on delivering a user-friendly, visually appealing interface.
            </li>
            <li><b>TextMessageApp</b>:<br/>
              An app for sending and receiving texts between different phones, featuring auto-generated responses to certain messages. Built in Java, with a focus on seamless user experience and reliability.
            </li>
          </ul>
        </section>
        <section id="awards" className="section">
          <h2>Awards</h2>
          <ul>
            <li><b>Houston Endowment President's Excellence Scholarship @ UT Austin</b>:<br/>Awarded for academic excellence, leadership, and commitment to community impact at UT Austin.</li>
            <li><b>NCWIT Aspirations in Computer Science Award</b>:<br/>Recognized nationally for outstanding achievement and leadership in computer science and technology.</li>
            <li><b>1st Place in Data Visualization @ SB Hackathon</b>:<br/>Led a team to victory by presenting innovative data insights to a panel of Bloomberg engineers, competing against 40+ teams.</li>
            <li><b>1st Place in Technica Hackathon: Best Use of Cryptocurrency @ UMD</b>:<br/>Developed a creative blockchain solution, earning top honors for technical innovation and real-world application.</li>
            <li><b>Best Hack for Social Good @ BRHS</b>:<br/>Recognized for building technology that addresses social challenges and creates positive community impact.</li>
          </ul>
        </section>
        <section id="activities" className="section">
          <h2>Activities</h2>
          <ul>
            <li><b>Co-founder & Advisory Panel Lead, Students for Ethical Use of Technology (SEUT)</b>:<br/>Launched and led a student organization dedicated to promoting responsible and ethical technology development. Structured an advisory panel and organized events to foster dialogue on tech ethics.</li>
            <li><b>Longhorn Developers & UX Design Club – UT Registration Plus: Designer & UX Design Fellow</b>:<br/>Redesigned the core UI for UT Registration Plus in Figma, streamlining course planning and increasing task efficiency by 20% based on user feedback.</li>
            <li><b>Student Government: Community Engagement & Advocacy Agency – Social Events Committee Chair</b>:<br/>Collaborated with committee members to implement social events that enhanced student life and strengthened campus connections at UT Austin.</li>
            <li><b>Global Ambassador, Texas Global</b>:<br/>Created compelling Instagram stories and wrote a blog post to encourage students to study abroad, sharing insights from hands-on research in Scandinavia.</li>
            <li><b>Operations Strategist, CRSH Media</b>:<br/>Managed finances, logistics, and event operations for a college tour spanning multiple universities, ensuring smooth execution and impactful experiences.</li>
            <li><b>Team Lead, JDRF International</b>:<br/>Led a team to support fundraising and awareness initiatives for juvenile diabetes research. Coordinated outreach, organized events, and advocated for health education and community support.</li>
          </ul>
        </section>
        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skills-list">
            <div><b>Languages:</b> Python, Java, C++, Kotlin, Swift, SQL, JavaScript, HTML/CSS</div>
            <div><b>Frameworks/Tools:</b> React, Flask, Firebase, Android Studio, Xcode, Git, KNIME, Postman, Figma, Tableau, Linux CLI</div>
          </div>
        </section>
        <section id="publications" className="section">
          <h2>Publications</h2>
          <ul>
            <li><b>"Dismantling Algorithmic Prejudice"</b> (Greenhouse Publishing, 2023): Theoretical exploration of bias, fairness, and ethics in AI systems.</li>
          </ul>
        </section>
        <section id="contact" className="section contact">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:maanyac17@utexas.edu">maanyac17@utexas.edu</a></p>
          <p>Phone: <a href="tel:8486672427">(848) 667-2427</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/maanya-chugh-53999a222/" target="_blank" rel="noopener noreferrer">maanya-chugh-53999a222</a></p>
        </section>
      </main>
    </div>
  );
}

export default App;
