import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = '/api';

function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authAxios } = useAuth();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/gigs/${id}`);
        setGig(data);
      } catch (err) {
        console.error('Failed to fetch gig:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setOrdering(true);
    try {
      await authAxios.post('/orders', {
        gigId: gig._id,
        requirements,
      });
      setOrderSuccess(true);
      setShowOrderForm(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <section className="gig-detail-page">
        <div className="gigs-loading">
          <div className="spinner"></div>
          <p>Loading service details...</p>
        </div>
      </section>
    );
  }

  if (!gig) {
    return (
      <section className="gig-detail-page">
        <div className="gigs-empty">
          <span className="gigs-empty-icon">🔍</span>
          <h3>Service not found</h3>
          <Link to="/gigs" className="btn-primary">Browse Services</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="gig-detail-page" id="gig-detail-page">
      <div className="gig-detail-container">
        {/* Left Column */}
        <div className="gig-detail-main">
          <nav className="gig-breadcrumb">
            <Link to="/gigs">Services</Link>
            <span> / </span>
            <span>{gig.category}</span>
          </nav>

          <h1 className="gig-detail-title">{gig.title}</h1>

          <div className="gig-detail-freelancer-bar">
            <div className="gig-card-avatar">
              {gig.freelancer?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <strong>{gig.freelancer?.name}</strong>
              <span className="gig-detail-role">{gig.category}</span>
            </div>
          </div>

          {gig.image && (
            <div className="gig-detail-image">
              <img src={gig.image} alt={gig.title} />
            </div>
          )}

          <div className="gig-detail-section">
            <h2>About This Service</h2>
            <p>{gig.description}</p>
          </div>

          {gig.tags && gig.tags.length > 0 && (
            <div className="gig-detail-section">
              <h2>Skills & Tags</h2>
              <div className="gig-detail-tags">
                {gig.tags.map((tag) => (
                  <span className="freelancer-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {gig.freelancer?.bio && (
            <div className="gig-detail-section">
              <h2>About the Freelancer</h2>
              <p>{gig.freelancer.bio}</p>
            </div>
          )}
        </div>

        {/* Right Column — Order Card */}
        <div className="gig-detail-sidebar">
          <div className="gig-order-card" id="gig-order-card">
            <div className="gig-order-price">
              <span className="gig-price-label">Starting at</span>
              <span className="gig-price-value">${gig.price}</span>
            </div>

            <div className="gig-order-meta">
              <div className="gig-order-meta-item">
                <span>📦</span>
                <span>Delivery in <strong>{gig.deliveryDays} days</strong></span>
              </div>
              <div className="gig-order-meta-item">
                <span>🏷️</span>
                <span>{gig.category}</span>
              </div>
            </div>

            {orderSuccess ? (
              <div className="order-success-msg" id="order-success">
                <span>✅</span>
                <h3>Order Placed!</h3>
                <p>Your order has been submitted successfully.</p>
                <Link to="/dashboard" className="btn-primary">View Dashboard</Link>
              </div>
            ) : showOrderForm ? (
              <form onSubmit={handleOrder} className="order-form" id="order-form">
                <div className="form-group">
                  <label htmlFor="order-requirements">Project Requirements</label>
                  <textarea
                    id="order-requirements"
                    placeholder="Describe what you need..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={4}
                  />
                </div>
                <button type="submit" className="form-submit" disabled={ordering}>
                  {ordering ? '⏳ Placing Order...' : `Confirm Order — $${gig.price}`}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                  onClick={() => setShowOrderForm(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                className="form-submit"
                id="book-now-btn"
                onClick={() => {
                  if (!user) { navigate('/login'); return; }
                  setShowOrderForm(true);
                }}
              >
                🚀 Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GigDetail;
