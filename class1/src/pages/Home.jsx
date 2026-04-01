function Home() {
  const categories = [
    { icon: '🎨', title: 'Design & Creative', desc: 'Logos, UI/UX, branding, illustrations and more' },
    { icon: '💻', title: 'Web Development', desc: 'Full-stack, frontend, backend, and CMS solutions' },
    { icon: '📱', title: 'Mobile Apps', desc: 'iOS, Android, and cross-platform app development' },
    { icon: '📈', title: 'Digital Marketing', desc: 'SEO, social media, PPC, and content strategy' },
    { icon: '✍️', title: 'Content Writing', desc: 'Blog posts, copywriting, technical docs, and more' },
    { icon: '🎬', title: 'Video & Animation', desc: 'Motion graphics, editing, explainer videos' },
  ];

  const freelancers = [
    {
      initials: 'AS',
      name: 'Arjun Sharma',
      role: 'Full-Stack Developer',
      rating: 4.9,
      reviews: 234,
      tags: ['React', 'Node.js', 'MongoDB'],
      price: '$45/hr',
    },
    {
      initials: 'PK',
      name: 'Priya Kapoor',
      role: 'UI/UX Designer',
      rating: 5.0,
      reviews: 189,
      tags: ['Figma', 'Adobe XD', 'Branding'],
      price: '$55/hr',
    },
    {
      initials: 'RV',
      name: 'Rohan Verma',
      role: 'Digital Marketer',
      rating: 4.8,
      reviews: 312,
      tags: ['SEO', 'Google Ads', 'Analytics'],
      price: '$40/hr',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Trusted by 10,000+ businesses worldwide
          </div>

          <h1>
            Find & Hire<br />
            <span className="gradient-text">Top Freelancers</span>
          </h1>

          <p>
            Connect with skilled professionals who bring your vision to life.
            From design to development, SkillEX makes hiring talent seamless.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" id="hire-cta">
              🚀 Hire a Freelancer
            </button>
            <button className="btn-secondary" id="become-freelancer-cta">
              Become a Freelancer →
            </button>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Freelancers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">120K+</div>
              <div className="stat-label">Projects Done</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories-section">
        <div className="section-header">
          <h2>Browse by <span className="gradient-text">Category</span></h2>
          <p>Explore services across hundreds of categories tailored to your needs.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div className={`category-card fade-in fade-in-delay-${i % 4 + 1}`} key={cat.title}>
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="section" id="freelancers-section">
        <div className="section-header">
          <h2>Featured <span className="gradient-text">Freelancers</span></h2>
          <p>Top-rated professionals ready to bring your project to life.</p>
        </div>

        <div className="freelancers-grid">
          {freelancers.map((f) => (
            <div className="freelancer-card" key={f.name}>
              <div className="freelancer-header">
                <div className="freelancer-avatar">{f.initials}</div>
                <div className="freelancer-info">
                  <h4>{f.name}</h4>
                  <span>{f.role}</span>
                </div>
              </div>

              <div className="freelancer-rating">
                ⭐ {f.rating} <span>({f.reviews} reviews)</span>
              </div>

              <div className="freelancer-tags">
                {f.tags.map((tag) => (
                  <span className="freelancer-tag" key={tag}>{tag}</span>
                ))}
              </div>

              <div className="freelancer-price">
                Starting at <strong>{f.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
