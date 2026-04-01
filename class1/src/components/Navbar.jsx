import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-skill">SkillEX</span>
        <span className="logo-dot"></span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/about" className={isActive('/about')}>About</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        <Link to="/" className="navbar-cta">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;
