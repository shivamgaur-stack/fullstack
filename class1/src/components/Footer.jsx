import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span style={{ color: 'var(--text-primary)' }}>Skill</span>
          <span style={{
            background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>EX</span>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/gigs">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
        </div>

        <p className="footer-copy">© 2026 SkillEX. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
