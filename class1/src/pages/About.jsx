function About() {
  const values = [
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      desc: 'Every transaction is secure and every freelancer is verified. We believe in building relationships rooted in trust.',
    },
    {
      icon: '⚡',
      title: 'Speed & Quality',
      desc: 'Get matched with the right talent in minutes, not days. Our smart algorithms ensure fast, quality connections.',
    },
    {
      icon: '🌍',
      title: 'Global Community',
      desc: 'A diverse network of professionals from 150+ countries bringing unique perspectives to every project.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Freelancers' },
    { number: '120K+', label: 'Completed Projects' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '150+', label: 'Countries' },
  ];

  const team = [
    { emoji: '👨‍💼', name: 'Vikram Mehta', role: 'CEO & Founder' },
    { emoji: '👩‍💻', name: 'Sneha Iyer', role: 'CTO' },
    { emoji: '👨‍🎨', name: 'Aman Gupta', role: 'Head of Design' },
    { emoji: '👩‍📈', name: 'Riya Patel', role: 'Head of Growth' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <h1 className="fade-in">
          We're Building the Future of <span className="gradient-text">Freelancing</span>
        </h1>
        <p className="fade-in fade-in-delay-1">
          SkillEX connects businesses with the world's best freelance talent.
          Our mission is to empower people to work on their own terms while
          helping businesses scale with top-tier professionals.
        </p>
      </section>

      {/* Values */}
      <section className="about-values" id="about-values">
        {values.map((v, i) => (
          <div className={`value-card fade-in fade-in-delay-${i + 1}`} key={v.title}>
            <div className="value-icon">{v.icon}</div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="about-stats" id="about-stats">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="stat-number">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="team-section" id="team-section">
        <h2>Meet Our <span className="gradient-text">Team</span></h2>
        <p>The people behind SkillEX, passionate about empowering freelancers worldwide.</p>

        <div className="team-grid">
          {team.map((m) => (
            <div className="team-member" key={m.name}>
              <div className="team-avatar">{m.emoji}</div>
              <h4>{m.name}</h4>
              <span>{m.role}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;
