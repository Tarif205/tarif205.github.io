'use client';

import { useEffect, useState } from 'react';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#ffffff', color: '#111827', fontFamily: "'Inter', system-ui, sans-serif" },
  navbar: (scrolled: boolean) => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all 0.3s',
    padding: scrolled ? '16px 0' : '24px 0',
    backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    boxShadow: scrolled ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
    borderBottom: scrolled ? '1px solid #f3f4f6' : 'none'
  }),
  navContent: { maxWidth: '1400px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px' },
  logo: { fontSize: '20px', fontWeight: '800', background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  navLinks: { display: 'flex', gap: '32px' },
  navLink: { fontSize: '15px', fontWeight: '600', color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' },
  hireBtn: {
    padding: '10px 20px', borderRadius: '9999px', backgroundColor: '#2563eb', color: '#fff', fontWeight: '700',
    textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)'
  },
  hero: { padding: '180px 48px 120px' },
  heroContent: { maxWidth: '1400px', margin: '0 auto' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
  heroTag: {
    display: 'inline-block', padding: '6px 16px', backgroundColor: '#eff6ff', color: '#1d4ed8',
    borderRadius: '9999px', fontSize: '14px', fontWeight: '700', marginBottom: '24px'
  },
  heroTitle: { fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' },
  heroDesc: { fontSize: '18px', color: '#4b5563', lineHeight: '1.7', marginBottom: '32px', maxWidth: '420px' },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  btnPrimary: {
    padding: '12px 24px', borderRadius: '12px', backgroundColor: '#111827', color: '#fff', fontWeight: '700',
    textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
  },
  btnSecondary: {
    padding: '12px 24px', borderRadius: '12px', border: '2px solid #e5e7eb', color: '#111827', fontWeight: '700',
    textDecoration: 'none', transition: 'all 0.2s'
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', marginTop: '56px' },
  statCard: { textAlign: 'center', padding: '24px', backgroundColor: '#f9fafb', borderRadius: '16px' },
  section: { padding: '120px 48px' },
  sectionGray: { backgroundColor: '#f9fafb', padding: '120px 48px' },
  sectionHeader: { textAlign: 'center', marginBottom: '64px' },
  sectionTag: { color: '#2563eb', fontSize: '14px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' },
  sectionTitle: { fontSize: '36px', fontWeight: '800', marginTop: '12px' },
  imgContainer: { display: 'flex', justifyContent: 'flex-end' },
  imgWrapper: { position: 'relative' },
  profileImg: {
    width: '360px', height: '360px', borderRadius: '28px', overflow: 'hidden', border: '4px solid #fff',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
  },
  card: {
    padding: '32px', backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f3f4f6',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', transition: 'all 0.2s'
  },
  projectGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', maxWidth: '1400px', margin: '0 auto' },
  projectEmoji: (color: string) => ({
    width: '56px', height: '56px', background: color, borderRadius: '16px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', marginBottom: '20px'
  }),
  contactGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1200px', margin: '0 auto' },
  form: { padding: '40px', backgroundColor: '#fff', borderRadius: '28px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' },
  input: {
    width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #f3f4f6', backgroundColor: '#f9fafb',
    fontSize: '15px', outline: 'none', transition: 'all 0.2s'
  },
  footer: { padding: '48px 48px', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb' }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      alert('Please fill in name, email, and message.');
      return;
    }

    const mailto = `mailto:tarifrahman93@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailto;
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a:hover { text-decoration: none; }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar(scrolled)}>
        <div style={styles.navContent}>
          <div style={styles.logo}>Kazi Tarif Rahman</div>
          <div style={styles.navLinks}>
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{...styles.navLink, ':hover': { color: '#2563eb' }}} onMouseOver={(e) => (e.currentTarget.style.color = '#2563eb')} onMouseOut={(e) => (e.currentTarget.style.color = '#4b5563')}>
                {item}
              </a>
            ))}
          </div>
          <a 
            href="mailto:tarifrahman93@gmail.com" 
            style={styles.hireBtn} 
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37,99,235,0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(37,99,235,0.2)'; }}
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroGrid}>
            <div>
              <span style={styles.heroTag}>CS Student · ML & Full-Stack Developer</span>
              <h1 style={styles.heroTitle}>
                Building intelligent
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  systems & experiences
                </span>
              </h1>
              <p style={styles.heroDesc}>
                CS student at BRAC University specializing in NLP, deep learning, computer vision, and full-stack ML products. WorldQuant Applied DS Lab graduate.
              </p>
              <div style={styles.heroBtns}>
                <a 
                  href="#projects" 
                  style={styles.btnPrimary} 
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1f2937'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111827'; }}
                >
                  View Projects
                </a>
                <a 
                  href="#contact" 
                  style={styles.btnSecondary} 
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#111827'; }}
                >
                  Get in Touch
                </a>
              </div>

              <div style={styles.statsGrid}>
                {[
                  { val: '6+', label: 'ML Projects' },
                  { val: '3.50', label: 'CGPA' },
                  { val: '111', label: 'Credits' },
                  { val: '5.0', label: 'GPA' }
                ].map((stat, i) => (
                  <div key={i} style={styles.statCard}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>{stat.val}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.imgContainer}>
              <div style={styles.imgWrapper}>
                <div style={styles.profileImg}>
                  <img src="/tarif.jpg" alt="Kazi Tarif Rahman" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.sectionGray}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>01. About Me</span>
            <h2 style={styles.sectionTitle}>Who I Am</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div>
              <p style={{ fontSize: '18px', color: '#374151', lineHeight: '1.7', marginBottom: '24px' }}>
                I'm a <strong style={{ color: '#111827' }}>Computer Science student at BRAC University</strong> specializing in AI/ML and Data Science. I build things that learn — from transformer-based Bangla NLP models to real-time computer vision systems.
              </p>
              <p style={{ fontSize: '18px', color: '#374151', lineHeight: '1.7', marginBottom: '32px' }}>
                My work spans the full ML lifecycle: data ingestion, feature engineering, model training, evaluation, and production deployment. I care deeply about <strong style={{ color: '#111827' }}>low-resource NLP</strong>, especially for Bangla.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { icon: '🎓', label: 'University', value: 'BRAC University' },
                  { icon: '📍', label: 'Location', value: 'Dhaka, BD' },
                  { icon: '🤖', label: 'Focus', value: 'NLP · CV' },
                  { icon: '🏆', label: 'Cert', value: 'WorldQuant' }
                ].map((h, i) => (
                  <div key={i} style={{ ...styles.card, ':hover': { boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' } }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.1)'}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{h.icon}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700' }}>{h.label}</div>
                    <div style={{ color: '#111827', fontWeight: '800', marginTop: '4px' }}>{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'AI/ML Collaborator', company: 'Aireel Digital', time: '2025 — Present' },
                { title: 'SDE Intern', company: 'uSavior', time: '2024 — 2026' }
              ].map((exp, i) => (
                <div key={i} style={{ ...styles.card, ':hover': { boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' } }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.1)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontWeight: '800' }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: '800', color: '#111827' }}>{exp.title}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{exp.company}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af' }}>{exp.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={styles.section}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>02. Tech Stack</span>
            <h2 style={styles.sectionTitle}>Skills & Technologies</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '32px' }}>
            {[
              { name: 'ML / AI', tags: ['NLP', 'Transformers', 'PyTorch', 'HuggingFace'] },
              { name: 'Data Science', tags: ['Python', 'Pandas', 'NumPy', 'SQL'] },
              { name: 'Web Dev', tags: ['React', 'Next.js', 'Node.js', 'MongoDB'] },
              { name: 'Tools', tags: ['Git', 'Linux', 'FastAPI', 'AWS'] }
            ].map((cat, i) => (
              <div key={i} style={{ ...styles.card, background: 'linear-gradient(135deg, #f9fafb, #ffffff)' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#dbeafe'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#f3f4f6'; }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{cat.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.tags.map((tag, j) => (
                    <span key={j} style={{ padding: '6px 12px', backgroundColor: '#fff', color: '#374151', borderRadius: '8px', fontSize: '13px', fontWeight: '700', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={styles.sectionGray}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>03. Projects</span>
            <h2 style={styles.sectionTitle}>Featured Work</h2>
          </div>
          <div style={styles.projectGrid}>
            {[
              {
                emoji: '🌿', title: 'GardeniAR', desc: 'Full-stack AR weed detection using Gemini multimodal AI', tags: ['MERN', 'Gemini'], color: 'linear-gradient(135deg, #22c55e, #10b981)', link: 'https://github.com/Tarif205/gardeniAR'
              },
              {
                emoji: '🎵', title: 'Multi-Genre Music Generation', desc: 'Unsupervised LSTM/VAE for music sequence generation', tags: ['Python', 'LSTM', 'VAE'], color: 'linear-gradient(135deg, #ec4899, #f43f5e)', link: 'https://github.com/Tarif205/Unsupervised-Neural-Network-for-Multi-Genre-Music-Generation'
              },
              {
                emoji: '🔤', title: 'Bangla NLP Models', desc: 'Fine-tuned sahajBERT & BanglaBERT for classification', tags: ['PyTorch', 'HuggingFace'], color: 'linear-gradient(135deg, #3b82f6, #6366f1)', link: 'https://github.com/Tarif205'
              },
              {
                emoji: '🌫️', title: 'Air Quality Prediction', desc: 'End-to-end ML pipeline with FastAPI & MongoDB', tags: ['FastAPI', 'MongoDB'], color: 'linear-gradient(135deg, #06b6d4, #0ea5e9)', link: 'https://github.com/Tarif205/air-quality-prediction-platform'
              },
              {
                emoji: '🤟', title: 'Sign Language Detection', desc: 'Lightweight CNN with transfer learning', tags: ['Python', 'CNN'], color: 'linear-gradient(135deg, #a855f7, #8b5cf6)', link: 'https://github.com/Tarif205/Lightweight-Sign-Language-Detection-Model'
              },
              {
                emoji: '📈', title: 'Titanic & Obesity Predictions', desc: 'Classification models with feature engineering', tags: ['Scikit-learn', 'XGBoost'], color: 'linear-gradient(135deg, #f97316, #f59e0b)', link: 'https://github.com/Tarif205/Machine-Learning-Titanic-disaster-Prediction'
              }
            ].map((proj, i) => (
              <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ ...styles.card, padding: '28px', ':hover': { transform: 'translateY(-8px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' } }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.1)'; }}>
                  <div style={{ ...styles.projectEmoji(proj.color), marginBottom: '20px' }}>{proj.emoji}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#111827', transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = '#2563eb')} onMouseOut={(e) => (e.currentTarget.style.color = '#111827')}>{proj.title}</h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '20px' }}>{proj.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {proj.tags.map((tag, j) => (
                      <span key={j} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>04. Contact</span>
          <h2 style={styles.sectionTitle}>Let's Build Together</h2>
        </div>
        <div style={styles.contactGrid}>
          <div>
            <p style={{ fontSize: '18px', color: '#4b5563', marginBottom: '32px', lineHeight: '1.7' }}>
              Open to ML engineering roles, data science internships, research collaborations, and interesting full-stack projects!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '📧', label: 'Email', value: 'tarifrahman93@gmail.com', href: 'mailto:tarifrahman93@gmail.com' },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/tarif-rahman-265951261', href: 'https://linkedin.com/in/tarif-rahman-265951261' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/Tarif205', href: 'https://github.com/Tarif205' },
                { icon: '📱', label: 'Phone', value: '+880 1707-804714', href: 'tel:+8801707804714' }
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '16px', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '700' }}>{c.label}</div>
                    <div style={{ color: '#111827', fontWeight: '800' }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'ML Role / Project' },
                  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about it...' }
                ].map((field, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea name={field.name} rows={4} style={{ ...styles.input, resize: 'vertical' }} placeholder={field.placeholder} onFocus={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.backgroundColor = '#fff'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.backgroundColor = '#f9fafb'; }} />
                    ) : (
                      <input name={field.name} type={field.type} style={styles.input} placeholder={field.placeholder} onFocus={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.backgroundColor = '#fff'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.backgroundColor = '#f9fafb'; }} />
                    )}
                  </div>
                ))}

                <button 
                  type="submit" 
                  style={{
                    padding: '16px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', color: '#fff', fontSize: '16px',
                    fontWeight: '800', border: 'none', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 10px 15px -3px rgba(37,99,235,0.25)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>© 2025 Kazi Tarif Rahman. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['GitHub', 'LinkedIn', 'Email'].map((item, i) => (
              <a 
                key={i} 
                href={i === 0 ? 'https://github.com/Tarif205' : i === 1 ? 'https://linkedin.com/in/tarif-rahman-265951261' : 'mailto:tarifrahman93@gmail.com'} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', fontWeight: '700', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}