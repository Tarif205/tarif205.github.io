'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loaderInt: NodeJS.Timeout | null = null;
    let typeTimeout: NodeJS.Timeout | null = null;
    let animationFrameId: number;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleMouseEnter: () => void;
    let handleMouseLeave: () => void;
    let handleResize: () => void;
    let handleFilterClick: (e: Event) => void;
    let handleFormSubmit: (e: Event) => void;
    let observer: IntersectionObserver;

    // --- LOADER ---
    const loaderFill = document.getElementById('loader-fill');
    const loaderPct = document.getElementById('loader-pct');
    const loader = document.getElementById('loader');
    if (loaderFill && loaderPct && loader) {
      let pct = 0;
      loaderInt = setInterval(() => {
        pct += Math.random() * 15;
        if (pct >= 100) {
          pct = 100;
          if (loaderInt) clearInterval(loaderInt);
          setTimeout(() => loader.classList.add('done'), 400);
        }
        loaderFill.style.width = pct + '%';
        loaderPct.textContent = Math.round(pct) + '%';
      }, 100);
    }

    // --- CURSOR ---
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRing) {
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();
    handleMouseEnter = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      if (cursorRing) cursorRing.style.transform = 'translate(-50%,-50%) scale(1.4)';
    };
    handleMouseLeave = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      if (cursorRing) cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    };
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .skill-tag');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // --- CANVAS PARTICLES ---
    const canvas = canvasRef.current;
    const particles: Particle[] = [];
    if (canvas) {
      const ctx = canvas.getContext('2d');
      handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5
        });
      }
      const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,212,255,0.4)';
          ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0,212,255,${0.2 * (1 - d / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        animationFrameId = requestAnimationFrame(draw);
      };
      draw();
    }

    // --- SCROLL REVEAL ---
    const reveals = document.querySelectorAll('.reveal');
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));

    // --- TYPED TEXT ---
    const typedLines = [
      "import numpy as np",
      "model = Sequential()",
      "from transformers import AutoModel",
      "const [x, setX] = useState(0)",
      "print('Hello, World!')"
    ];
    let lineIdx = 0, charIdx = 0;
    const typeLoop = () => {
      const line = typedLines[lineIdx];
      if (typedTextRef.current) {
        typedTextRef.current.textContent = line.slice(0, charIdx + 1);
      }
      charIdx++;
      if (charIdx >= line.length) {
        charIdx = 0;
        lineIdx = (lineIdx + 1) % typedLines.length;
        typeTimeout = setTimeout(typeLoop, 1500);
      } else {
        typeTimeout = setTimeout(typeLoop, 80);
      }
    };
    typeTimeout = setTimeout(typeLoop, 1000);

    // --- TERMINAL ---
    const terminalContent = [
      { delay: 0, html: '<span class="comment"># Loading Tarif Rahman...</span>' },
      { delay: 700, html: '<span class="output">name</span>      = <span class="string">"Tarif Rahman"</span>' },
      { delay: 1200, html: '<span class="output">role</span>      = <span class="string">"CS Student · ML & Full-Stack Dev"</span>' },
      { delay: 1800, html: '<span class="output">university</span>= <span class="string">"BRAC University"</span>' },
      { delay: 2100, html: '<span class="output">cgpa</span>      = <span class="num">3.50</span>' },
      { delay: 2400, html: '<span class="output">skills</span>    = <span class="string">[Python, PyTorch, React, Next.js]</span>' },
      { delay: 2800, html: '<span class="prompt">>>> </span><span class="cmd">hire_now()</span>' },
      { delay: 3200, html: '<span class="output">status</span>    = <span class="accent2">"Available for internships"</span>' }
    ];
    terminalContent.forEach(item => {
      setTimeout(() => {
        if (terminalBodyRef.current) {
          const div = document.createElement('div');
          div.className = 'terminal-line';
          div.innerHTML = item.html;
          terminalBodyRef.current.appendChild(div);
        }
      }, item.delay);
    });

    // --- PROJECT FILTER ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    handleFilterClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };
    filterBtns.forEach(btn => btn.addEventListener('click', handleFilterClick));

    // --- FORM SUBMIT ---
    const formSubmit = document.getElementById('form-submit');
    const formMsg = document.getElementById('form-msg');
    handleFormSubmit = (e: Event) => {
      e.preventDefault();
      if (formMsg) {
        formMsg.style.display = 'block';
      }
    };
    formSubmit?.addEventListener('click', handleFormSubmit);

    // --- CLEANUP ---
    return () => {
      if (loaderInt) clearInterval(loaderInt);
      if (typeTimeout) clearTimeout(typeTimeout);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      filterBtns.forEach(btn => btn.removeEventListener('click', handleFilterClick));
      formSubmit?.removeEventListener('click', handleFormSubmit);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* LOADER */}
      <div id="loader">
        <div className="loader-text">INITIALIZING PORTFOLIO...</div>
        <div className="loader-bar-track"><div className="loader-bar-fill" id="loader-fill"></div></div>
        <div className="loader-pct" id="loader-pct">0%</div>
      </div>

      {/* CURSOR */}
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      {/* BACKGROUND CANVAS */}
      <canvas ref={canvasRef} id="bg-canvas"></canvas>

      {/* NAV */}
      <nav>
        <div className="nav-logo">tarif<span>.rahman</span><span style={{ color: 'var(--accent2)' }}>_</span></div>
        <div className="nav-links">
          <a href="#about">about</a>
          <a href="#skills">skills</a>
          <a href="#experience">experience</a>
          <a href="#projects">projects</a>
          <a href="#education">education</a>
          <a href="#contact">contact</a>
        </div>
        <a href="mailto:tarifrahman93@gmail.com" className="nav-cta">hire_me()</a>
      </nav>

      <main>
        {/* HERO */}
        <section id="hero">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-tag">CS Student · ML & Full-Stack Developer</div>
              <h1 className="hero-name">
                <div>Tarif</div>
                <div className="line2 glitch" data-text="Rahman">Rahman</div>
              </h1>
              <div className="hero-title">
                <span style={{ color: 'var(--text3)' }}>$ </span>
                <span className="typed-text" ref={typedTextRef} id="typed-text"></span><span className="cursor-blink"></span>
              </div>
              <p className="hero-desc">
                CS student at BRAC University building intelligent systems — NLP, deep learning, computer vision, and full-stack ML products. WorldQuant University Applied Data Science Lab graduate.
              </p>
              <div className="hero-btns">
                <a href="#projects" className="btn-primary">View Projects</a>
                <a href="#contact" className="btn-secondary">Get In Touch</a>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">6+</span>
                  <span className="stat-label">ML Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">3.50</span>
                  <span className="stat-label">CGPA / 4.0</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">111</span>
                  <span className="stat-label">Credits Done</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">5.0</span>
                  <span className="stat-label">HSC / SSC GPA</span>
                </div>
              </div>
            </div>
            <div className="hero-terminal">
              <div className="terminal-bar">
                <div className="tbar-dot red"></div>
                <div className="tbar-dot yellow"></div>
                <div className="tbar-dot green"></div>
                <span className="tbar-title">tarif@ml-studio ~ python</span>
              </div>
              <div className="terminal-body" ref={terminalBodyRef} id="terminal-body"></div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>scroll</span>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="section-header reveal">
            <div className="section-tag">01 / about_me</div>
            <h2 className="section-title">Who I <span>Am</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>I'm a <strong>Computer Science student at BRAC University</strong>, Dhaka, specialising in AI/ML and Data Science. I build things that learn — from transformer-based Bangla NLP models to real-time computer vision systems.</p>
              <p>My work spans the full ML lifecycle: data ingestion, feature engineering, model training, evaluation, and production deployment. I care deeply about <strong>low-resource NLP</strong>, especially for Bangla — a language spoken by 300M+ people with too little AI tooling.</p>
              <p>Outside ML, I build full-stack web apps on the <strong>MERN stack</strong>, work with generative AI in production at Aireel Digital, and keep contributing to open-source research projects on GitHub.</p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="hi-icon">🎓</div>
                  <div className="hi-label">University</div>
                  <div className="hi-value">BRAC University</div>
                </div>
                <div className="highlight-item">
                  <div className="hi-icon">📍</div>
                  <div className="hi-label">Location</div>
                  <div className="hi-value">Dhaka, Bangladesh</div>
                </div>
                <div className="highlight-item">
                  <div className="hi-icon">🤖</div>
                  <div className="hi-label">Focus</div>
                  <div className="hi-value">NLP · Computer Vision</div>
                </div>
                <div className="highlight-item">
                  <div className="hi-icon">🏆</div>
                  <div className="hi-label">Certification</div>
                  <div className="hi-value">WorldQuant DS Lab</div>
                </div>
              </div>
            </div>
            <div className="about-card reveal">
              <div className="profile-avatar">
                <img src="/tarif.jpg" alt="Tarif Rahman" />
              </div>
              <div className="profile-name">Tarif Rahman</div>
              <div className="profile-role">CS Student · ML & Full-Stack Developer</div>
              <div className="profile-links">
                <a href="mailto:tarifrahman93@gmail.com" className="profile-link">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  tarifrahman93@gmail.com
                </a>
                <a href="https://github.com/Tarif205" target="_blank" rel="noopener noreferrer" className="profile-link">
                  <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  github.com/Tarif205
                </a>
                <a href="https://linkedin.com/in/tarif-rahman-265951261" target="_blank" rel="noopener noreferrer" className="profile-link">
                  <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                  LinkedIn Profile
                </a>
                <a href="tel:+8801707804714" className="profile-link">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                  +880 1707-804714
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="section-header reveal">
            <div className="section-tag">02 / tech_stack</div>
            <h2 className="section-title">Skills & <span>Technologies</span></h2>
          </div>
          <div className="skills-grid reveal">
            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">🧠</span>
                <span className="skill-cat-name">ML / AI</span>
              </div>
              <div className="skill-tags">
                <span className="skill-tag hot">NLP</span>
                <span className="skill-tag hot">Transformers (BERT)</span>
                <span className="skill-tag hot">LLMs</span>
                <span className="skill-tag hot">sahajBERT</span>
                <span className="skill-tag">CNNs</span>
                <span className="skill-tag">Transfer Learning</span>
                <span className="skill-tag">Unsupervised Learning</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">HuggingFace</span>
                <span className="skill-tag">Scikit-Learn</span>
                <span className="skill-tag">LSTM / VAE</span>
                <span className="skill-tag">XGBoost</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">📊</span>
                <span className="skill-cat-name">Data Science</span>
              </div>
              <div className="skill-tags">
                <span className="skill-tag hot">Python</span>
                <span className="skill-tag hot">Pandas</span>
                <span className="skill-tag hot">NumPy</span>
                <span className="skill-tag">Statistics</span>
                <span className="skill-tag">Data Visualisation</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">FastAPI</span>
                <span className="skill-tag">Feature Engineering</span>
                <span className="skill-tag">Cross-Validation</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">🌐</span>
                <span className="skill-cat-name">Web & Dev</span>
              </div>
              <div className="skill-tags">
                <span className="skill-tag hot">React</span>
                <span className="skill-tag hot">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML / CSS</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">Generative AI</span>
                <span className="skill-tag">Gemini API</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">🔧</span>
                <span className="skill-cat-name">Tools & CS</span>
              </div>
              <div className="skill-tags">
                <span className="skill-tag hot">Git / GitHub</span>
                <span className="skill-tag">Jupyter</span>
                <span className="skill-tag">Linux</span>
                <span className="skill-tag">OOP</span>
                <span className="skill-tag">DSA</span>
                <span className="skill-tag">MVC Architecture</span>
                <span className="skill-tag">Agile</span>
                <span className="skill-tag">API Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="section-header reveal">
            <div className="section-tag">03 / work_exp</div>
            <h2 className="section-title">Work <span>Experience</span></h2>
          </div>
          <div className="exp-timeline reveal">
            <div className="exp-item current">
              <div className="exp-dot"></div>
              <div className="exp-date">2025 — Present</div>
              <div className="exp-role">AI/ML Collaborator</div>
              <div className="exp-company">Aireel Digital (aireel.digital) · Dhaka, BD</div>
              <ul className="exp-desc">
                <li>Contributing to an AI-powered visual content studio producing high-impact reels, UGC, motion graphics, and branded video assets using generative AI tooling.</li>
                <li>Applied ML and automation techniques to streamline content generation workflows, reducing production time significantly.</li>
                <li>Integrated multimodal AI models into creative pipelines, bridging the gap between AI capabilities and commercial visual storytelling.</li>
              </ul>
              <span className="exp-badge">CURRENT ROLE</span>
            </div>
            <div className="exp-item">
              <div className="exp-dot"></div>
              <div className="exp-date">Jun 2024 — Mar 2026</div>
              <div className="exp-role">Software Development Engineer Intern</div>
              <div className="exp-company">uSavior · Dhaka, BD</div>
              <ul className="exp-desc">
                <li>Developed and iterated on web application features using MERN stack within an agile development team.</li>
                <li>Identified algorithmic bottlenecks and designed optimised data structures and logic from scratch.</li>
                <li>Collaborated on API design, database schema, and front-end component architecture across full product cycles.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-header reveal">
            <div className="section-tag">04 / projects</div>
            <h2 className="section-title">Featured <span>Projects</span></h2>
          </div>
          <div className="projects-filter reveal">
            <button className="filter-btn active" data-filter="all">All</button>
            <button className="filter-btn" data-filter="nlp">NLP</button>
            <button className="filter-btn" data-filter="cv">Computer Vision</button>
            <button className="filter-btn" data-filter="ml">Classic ML</button>
            <button className="filter-btn" data-filter="web">Full-Stack</button>
            <button className="filter-btn" data-filter="audio">Audio / Music</button>
          </div>
          <div className="projects-grid reveal">
            <div className="project-card" data-category="web">
              <div className="proj-header">
                <div className="proj-icon">🌿</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/gardeniAR" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">GardeniAR — AR Weed Identification</div>
              <div className="proj-desc">Co-developed a full-stack AR application using Gemini multimodal AI for real-time invasive weed identification via live webcam. Competed in university software project competition — combining computer vision with practical environmental use.</div>
              <div className="proj-stack">
                <span className="proj-tech">MERN Stack</span>
                <span className="proj-tech">Gemini API</span>
                <span className="proj-tech">React-Webcam</span>
                <span className="proj-tech">Multimodal AI</span>
              </div>
              <div className="proj-badge">🏆 Competition Entry</div>
            </div>

            <div className="project-card" data-category="audio">
              <div className="proj-header">
                <div className="proj-icon">🎵</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/Unsupervised-Neural-Network-for-Multi-Genre-Music-Generation" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">Unsupervised Multi-Genre Music Generation</div>
              <div className="proj-desc">Designed and trained an unsupervised deep learning model (LSTM/VAE) to autonomously generate multi-genre musical sequences without labelled training data. Explored latent-space representations for genre-conditioned synthesis.</div>
              <div className="proj-stack">
                <span className="proj-tech">Python</span>
                <span className="proj-tech">LSTM</span>
                <span className="proj-tech">VAE</span>
                <span className="proj-tech">Jupyter</span>
                <span className="proj-tech">Latent Space</span>
              </div>
            </div>

            <div className="project-card" data-category="nlp">
              <div className="proj-header">
                <div className="proj-icon">🔤</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/sahajBERT-finetuning" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">sahajBERT & BanglaBERT Fine-Tuning</div>
              <div className="proj-desc">Fine-tuned sahajBERT and BanglaBERT on downstream Bangla NLP classification tasks, benchmarking across tokenisation strategies and hyperparameter configurations. Contributions relevant to low-resource language model adaptation for 300M+ speakers.</div>
              <div className="proj-stack">
                <span className="proj-tech">Python</span>
                <span className="proj-tech">HuggingFace</span>
                <span className="proj-tech">PyTorch</span>
                <span className="proj-tech">Transformers</span>
                <span className="proj-tech">Bangla NLP</span>
              </div>
            </div>

            <div className="project-card" data-category="ml">
              <div className="proj-header">
                <div className="proj-icon">🌫️</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/air-quality-prediction-platform" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">Air Quality Prediction Platform</div>
              <div className="proj-desc">End-to-end ML pipeline — data ingestion, feature engineering, model training, and a FastAPI REST service — to predict urban air quality indices. Integrated MongoDB for time-series storage and designed REST API for real-time inference.</div>
              <div className="proj-stack">
                <span className="proj-tech">Python</span>
                <span className="proj-tech">Scikit-Learn</span>
                <span className="proj-tech">FastAPI</span>
                <span className="proj-tech">MongoDB</span>
                <span className="proj-tech">REST API</span>
              </div>
            </div>

            <div className="project-card" data-category="cv">
              <div className="proj-header">
                <div className="proj-icon">🤟</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/Lightweight-Sign-Language-Detection-Model" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">Lightweight Sign Language Detection</div>
              <div className="proj-desc">Trained a lightweight CNN with transfer learning for real-time sign language gesture classification. Optimised for deployment on resource-constrained edge devices — making accessibility technology available at scale.</div>
              <div className="proj-stack">
                <span className="proj-tech">Python</span>
                <span className="proj-tech">CNNs</span>
                <span className="proj-tech">Transfer Learning</span>
                <span className="proj-tech">Edge ML</span>
              </div>
            </div>

            <div className="project-card" data-category="ml">
              <div className="proj-header">
                <div className="proj-icon">📈</div>
                <div className="proj-links">
                  <a href="https://github.com/Tarif205/Machine-Learning-Titanic-disaster-Prediction" target="_blank" rel="noopener noreferrer" className="proj-link" title="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="proj-title">Titanic & Obesity ML Predictions</div>
              <div className="proj-desc">Implemented and compared classification algorithms (Logistic Regression, Random Forest, XGBoost) for survival and obesity-type prediction. Achieved strong F1 scores via feature engineering, hyperparameter tuning, and cross-validation.</div>
              <div className="proj-stack">
                <span className="proj-tech">Python</span>
                <span className="proj-tech">Scikit-Learn</span>
                <span className="proj-tech">XGBoost</span>
                <span className="proj-tech">Pandas</span>
                <span className="proj-tech">NumPy</span>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <div className="section-header reveal">
            <div className="section-tag">05 / education</div>
            <h2 className="section-title">Academic <span>Background</span></h2>
          </div>
          <div className="edu-grid reveal">
            <div className="edu-card featured">
              <div>
                <div className="edu-badge degree">BSc Degree</div>
                <div className="edu-institution">BRAC University</div>
                <div className="edu-degree">Computer Science & Engineering</div>
                <div className="edu-date">2022 — Present · Dhaka, Bangladesh</div>
                <div className="edu-courses">
                  <span className="edu-course">Machine Learning</span>
                  <span className="edu-course">Data Structures</span>
                  <span className="edu-course">Algorithms</span>
                  <span className="edu-course">Database Systems</span>
                  <span className="edu-course">Computer Networks</span>
                  <span className="edu-course">Software Engineering</span>
                </div>
              </div>
              <div>
                <div className="edu-gpa">3.50</div>
                <div className="edu-gpa-label">CGPA / 4.00</div>
                <div style={{ marginTop: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--text3)' }}>
                  <div style={{ marginBottom: '4px' }}>Credits Completed</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent2)' }}>111</div>
                </div>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-badge cert">Certificate</div>
              <div className="edu-institution">WorldQuant University</div>
              <div className="edu-degree">Applied Data Science Lab</div>
              <div className="edu-date">2024 — 2025 · Online</div>
              <div className="edu-courses" style={{ marginTop: '14px' }}>
                <span className="edu-course">Data Science</span>
                <span className="edu-course">ML</span>
                <span className="edu-course">Statistics</span>
                <span className="edu-course">Python</span>
                <span className="edu-course">SQL</span>
                <span className="edu-course">MongoDB</span>
                <span className="edu-course">FastAPI</span>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-badge hsc">HSC</div>
              <div className="edu-institution">Govt. Hazi Muhammad Mohsin College</div>
              <div className="edu-degree">Higher Secondary Certificate</div>
              <div className="edu-date">2019 — 2021 · Chittagong, BD</div>
              <div style={{ marginTop: '16px' }}>
                <div className="edu-gpa" style={{ fontSize: '2rem' }}>5.00</div>
                <div className="edu-gpa-label">GPA / 5.00</div>
              </div>
            </div>
            <div className="edu-card" style={{ gridColumn: 'span 1' }}>
              <div className="edu-badge hsc">SSC</div>
              <div className="edu-institution">Chittagong Collegiate School</div>
              <div className="edu-degree">Secondary School Certificate</div>
              <div className="edu-date">2017 — 2019 · Chittagong, BD</div>
              <div style={{ marginTop: '16px' }}>
                <div className="edu-gpa" style={{ fontSize: '2rem' }}>5.00</div>
                <div className="edu-gpa-label">GPA / 5.00</div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="section-header reveal">
            <div className="section-tag">06 / contact</div>
            <h2 className="section-title">Get In <span>Touch</span></h2>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-info">
              <h3>Let's build something intelligent.</h3>
              <p>I'm open to ML engineering roles, data science internships, research collaborations, and interesting full-stack projects. Whether you have a problem that needs ML or just want to connect — reach out.</p>
              <div className="contact-items">
                <a href="mailto:tarifrahman93@gmail.com" className="contact-item">
                  <div className="contact-item-icon">📧</div>
                  <div className="contact-item-text">
                    <div className="contact-item-label">Email</div>
                    tarifrahman93@gmail.com
                  </div>
                </a>
                <a href="https://linkedin.com/in/tarif-rahman-265951261" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-item-icon">💼</div>
                  <div className="contact-item-text">
                    <div className="contact-item-label">LinkedIn</div>
                    tarif-rahman-265951261
                  </div>
                </a>
                <a href="https://github.com/Tarif205" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-item-icon">🐙</div>
                  <div className="contact-item-text">
                    <div className="contact-item-label">GitHub</div>
                    github.com/Tarif205
                  </div>
                </a>
                <a href="tel:+8801707804714" className="contact-item">
                  <div className="contact-item-icon">📱</div>
                  <div className="contact-item-text">
                    <div className="contact-item-label">Phone</div>
                    +880 1707-804714
                  </div>
                </a>
              </div>
            </div>
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="Your name" id="contact-name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" id="contact-email" />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" placeholder="ML Role / Collaboration / ..." id="contact-subject" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell me about the opportunity or project..." id="contact-message"></textarea>
              </div>
              <button className="form-submit" id="form-submit">Send Message →</button>
              <div id="form-msg" style={{ marginTop: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--accent2)', display: 'none' }}>
                ✓ Message sent! I'll reply to your email.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-copy">
          © 2025 <span>Tarif Rahman</span>. Built with precision.
        </div>
        <div className="footer-links">
          <a href="https://github.com/Tarif205" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/tarif-rahman-265951261" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:tarifrahman93@gmail.com" className="footer-link">Email</a>
        </div>
      </footer>
    </>
  );
}
