import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = '/api';

const CATEGORIES = [
  'All',
  'Design & Creative',
  'Web Development',
  'Mobile Apps',
  'Digital Marketing',
  'Content Writing',
  'Video & Animation',
];

const CATEGORY_ICONS = {
  'All': '🔥',
  'Design & Creative': '🎨',
  'Web Development': '💻',
  'Mobile Apps': '📱',
  'Digital Marketing': '📈',
  'Content Writing': '✍️',
  'Video & Animation': '🎬',
};

function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeCategory !== 'All') params.category = activeCategory;
      if (search) params.search = search;
      const { data } = await axios.get(`${API_URL}/gigs`, { params });
      setGigs(data);
    } catch (err) {
      console.error('Failed to fetch gigs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs();
  };

  return (
    <section className="gigs-page" id="gigs-page">
      {/* Header */}
      <div className="gigs-hero">
        <h1 className="fade-in">
          Explore <span className="gradient-text">Services</span>
        </h1>
        <p className="fade-in fade-in-delay-1">
          Find the perfect freelancer for your next project
        </p>

        <form className="gigs-search-bar fade-in fade-in-delay-2" onSubmit={handleSearch} id="gigs-search-form">
          <input
            type="text"
            placeholder="Search for services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="gigs-search-input"
          />
          <button type="submit" className="btn-primary" id="gigs-search-btn">
            🔍 Search
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="gigs-filters" id="gigs-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`gigs-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            <span>{CATEGORY_ICONS[cat]}</span> {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="gigs-results" id="gigs-results">
        {loading ? (
          <div className="gigs-loading">
            <div className="spinner"></div>
            <p>Loading services...</p>
          </div>
        ) : gigs.length === 0 ? (
          <div className="gigs-empty">
            <span className="gigs-empty-icon">📭</span>
            <h3>No services found</h3>
            <p>Try adjusting your search or filters, or check back later!</p>
          </div>
        ) : (
          <div className="gigs-grid">
            {gigs.map((gig) => (
              <Link to={`/gigs/${gig._id}`} className="gig-card" key={gig._id} id={`gig-${gig._id}`}>
                <div className="gig-card-image">
                  {gig.image ? (
                    <img src={gig.image} alt={gig.title} />
                  ) : (
                    <div className="gig-card-placeholder">
                      {CATEGORY_ICONS[gig.category] || '💼'}
                    </div>
                  )}
                  <span className="gig-card-category">{gig.category}</span>
                </div>

                <div className="gig-card-body">
                  <div className="gig-card-freelancer">
                    <div className="gig-card-avatar">
                      {gig.freelancer?.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <span>{gig.freelancer?.name || 'Unknown'}</span>
                  </div>
                  <h3>{gig.title}</h3>
                  <p>{gig.description?.substring(0, 100)}...</p>
                  <div className="gig-card-footer">
                    <span className="gig-card-delivery">📦 {gig.deliveryDays} days</span>
                    <span className="gig-card-price">From <strong>${gig.price}</strong></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Gigs;
