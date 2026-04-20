import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-skill">Skill</span>
        <span className="logo-ex">EX</span>
        <span className="logo-dot"></span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/gigs" className={isActive('/gigs')}>Services</Link>
        <Link to="/about" className={isActive('/about')}>About</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>

        {user ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
            <button className="navbar-cta" onClick={handleLogout} id="navbar-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`navbar-login-link ${isActive('/login')}`}>Sign In</Link>
            <Link to="/register" className="navbar-cta" id="navbar-get-started">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
