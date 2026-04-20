import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'Design & Creative',
  'Web Development',
  'Mobile Apps',
  'Digital Marketing',
  'Content Writing',
  'Video & Animation',
];

function Dashboard() {
  const { user, authAxios, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [myGigs, setMyGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateGig, setShowCreateGig] = useState(false);
  const [gigForm, setGigForm] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    price: '',
    deliveryDays: '3',
    tags: '',
    image: '',
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: ordersData } = await authAxios.get('/orders/me');
      setOrders(ordersData);

      if (user.role === 'freelancer') {
        const { data: gigsData } = await authAxios.get('/gigs');
        const mine = gigsData.filter(
          (g) => g.freelancer?._id === user._id || g.freelancer === user._id
        );
        setMyGigs(mine);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGig = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await authAxios.post('/gigs', {
        ...gigForm,
        price: Number(gigForm.price),
        deliveryDays: Number(gigForm.deliveryDays),
        tags: gigForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setShowCreateGig(false);
      setGigForm({
        title: '',
        description: '',
        category: 'Web Development',
        price: '',
        deliveryDays: '3',
        tags: '',
        image: '',
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create gig');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteGig = async (id) => {
    if (!confirm('Delete this gig?')) return;
    try {
      await authAxios.delete(`/gigs/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete gig');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await authAxios.patch(`/orders/${orderId}/status`, { status });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const clientOrders = orders.filter((o) => o.client?._id === user._id);
  const freelancerOrders = orders.filter((o) => o.freelancer?._id === user._id);

  const STATUS_COLORS = {
    pending: '#fbbf24',
    in_progress: '#6c3ce1',
    completed: '#00d4aa',
    cancelled: '#ef4444',
  };

  return (
    <section className="dashboard-page" id="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar" id="dashboard-sidebar">
          <div className="dashboard-user-card">
            <div className="dashboard-avatar">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <span className="dashboard-role-badge">{user.role}</span>
            <span className="dashboard-email">{user.email}</span>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`dashboard-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`dashboard-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 {user.role === 'freelancer' ? 'Incoming Orders' : 'My Orders'}
            </button>
            {user.role === 'freelancer' && (
              <button
                className={`dashboard-nav-btn ${activeTab === 'gigs' ? 'active' : ''}`}
                onClick={() => setActiveTab('gigs')}
              >
                🎯 My Gigs
              </button>
            )}
            <button className="dashboard-nav-btn logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {loading ? (
            <div className="gigs-loading">
              <div className="spinner"></div>
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="dashboard-overview" id="dashboard-overview">
                  <h2>Welcome back, <span className="gradient-text">{user.name}</span> 👋</h2>

                  <div className="dashboard-stats-grid">
                    <div className="dashboard-stat-card">
                      <span className="dashboard-stat-icon">📦</span>
                      <div className="dashboard-stat-number">
                        {user.role === 'freelancer' ? freelancerOrders.length : clientOrders.length}
                      </div>
                      <div className="dashboard-stat-label">
                        {user.role === 'freelancer' ? 'Incoming Orders' : 'My Orders'}
                      </div>
                    </div>
                    {user.role === 'freelancer' && (
                      <>
                        <div className="dashboard-stat-card">
                          <span className="dashboard-stat-icon">🎯</span>
                          <div className="dashboard-stat-number">{myGigs.length}</div>
                          <div className="dashboard-stat-label">Active Gigs</div>
                        </div>
                        <div className="dashboard-stat-card">
                          <span className="dashboard-stat-icon">💰</span>
                          <div className="dashboard-stat-number">
                            ${freelancerOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)}
                          </div>
                          <div className="dashboard-stat-label">Total Earned</div>
                        </div>
                      </>
                    )}
                    <div className="dashboard-stat-card">
                      <span className="dashboard-stat-icon">✅</span>
                      <div className="dashboard-stat-number">
                        {(user.role === 'freelancer' ? freelancerOrders : clientOrders)
                          .filter((o) => o.status === 'completed').length}
                      </div>
                      <div className="dashboard-stat-label">Completed</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="dashboard-quick-actions">
                    {user.role === 'freelancer' ? (
                      <button
                        className="btn-primary"
                        onClick={() => { setActiveTab('gigs'); setShowCreateGig(true); }}
                      >
                        ➕ Create New Gig
                      </button>
                    ) : (
                      <Link to="/gigs" className="btn-primary">
                        🔍 Browse Services
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="dashboard-orders" id="dashboard-orders">
                  <h2>{user.role === 'freelancer' ? 'Incoming Orders' : 'My Orders'}</h2>

                  {(user.role === 'freelancer' ? freelancerOrders : clientOrders).length === 0 ? (
                    <div className="gigs-empty">
                      <span className="gigs-empty-icon">📭</span>
                      <h3>No orders yet</h3>
                      <p>{user.role === 'freelancer'
                        ? 'Orders will appear here when clients book your gigs.'
                        : 'Browse services and place your first order!'
                      }</p>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {(user.role === 'freelancer' ? freelancerOrders : clientOrders).map((order) => (
                        <div className="order-card" key={order._id} id={`order-${order._id}`}>
                          <div className="order-card-header">
                            <div>
                              <h4>{order.gig?.title || 'Untitled Gig'}</h4>
                              <span className="order-card-date">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <span
                              className="order-status-badge"
                              style={{ background: STATUS_COLORS[order.status] + '22', color: STATUS_COLORS[order.status] }}
                            >
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="order-card-details">
                            <div><strong>{user.role === 'freelancer' ? 'Client:' : 'Freelancer:'}</strong>{' '}
                              {user.role === 'freelancer' ? order.client?.name : order.freelancer?.name}
                            </div>
                            <div><strong>Amount:</strong> ${order.totalPrice}</div>
                            {order.requirements && (
                              <div><strong>Requirements:</strong> {order.requirements}</div>
                            )}
                          </div>

                          {user.role === 'freelancer' && order.status !== 'completed' && order.status !== 'cancelled' && (
                            <div className="order-card-actions">
                              {order.status === 'pending' && (
                                <button
                                  className="btn-primary"
                                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                  onClick={() => handleStatusChange(order._id, 'in_progress')}
                                >
                                  ▶️ Start
                                </button>
                              )}
                              {order.status === 'in_progress' && (
                                <button
                                  className="btn-primary"
                                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                  onClick={() => handleStatusChange(order._id, 'completed')}
                                >
                                  ✅ Complete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Gigs Tab (Freelancer) */}
              {activeTab === 'gigs' && user.role === 'freelancer' && (
                <div className="dashboard-gigs" id="dashboard-gigs">
                  <div className="dashboard-gigs-header">
                    <h2>My Gigs</h2>
                    <button
                      className="btn-primary"
                      onClick={() => setShowCreateGig(!showCreateGig)}
                    >
                      {showCreateGig ? '✖ Cancel' : '➕ New Gig'}
                    </button>
                  </div>

                  {/* Create Gig Form */}
                  {showCreateGig && (
                    <form onSubmit={handleCreateGig} className="create-gig-form" id="create-gig-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="gig-title">Title</label>
                          <input
                            type="text"
                            id="gig-title"
                            placeholder="I will design a stunning website..."
                            value={gigForm.title}
                            onChange={(e) => setGigForm({ ...gigForm, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gig-category">Category</label>
                          <select
                            id="gig-category"
                            value={gigForm.category}
                            onChange={(e) => setGigForm({ ...gigForm, category: e.target.value })}
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="gig-desc">Description</label>
                        <textarea
                          id="gig-desc"
                          placeholder="Describe your service in detail..."
                          value={gigForm.description}
                          onChange={(e) => setGigForm({ ...gigForm, description: e.target.value })}
                          required
                          rows={4}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="gig-price">Price ($)</label>
                          <input
                            type="number"
                            id="gig-price"
                            placeholder="50"
                            min="5"
                            value={gigForm.price}
                            onChange={(e) => setGigForm({ ...gigForm, price: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gig-delivery">Delivery (days)</label>
                          <input
                            type="number"
                            id="gig-delivery"
                            min="1"
                            value={gigForm.deliveryDays}
                            onChange={(e) => setGigForm({ ...gigForm, deliveryDays: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="gig-tags">Tags (comma separated)</label>
                        <input
                          type="text"
                          id="gig-tags"
                          placeholder="React, Node.js, MongoDB"
                          value={gigForm.tags}
                          onChange={(e) => setGigForm({ ...gigForm, tags: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gig-image">Image URL (optional)</label>
                        <input
                          type="text"
                          id="gig-image"
                          placeholder="https://example.com/image.jpg"
                          value={gigForm.image}
                          onChange={(e) => setGigForm({ ...gigForm, image: e.target.value })}
                        />
                      </div>

                      <button type="submit" className="form-submit" disabled={creating}>
                        {creating ? '⏳ Creating...' : '🚀 Publish Gig'}
                      </button>
                    </form>
                  )}

                  {/* My Gigs List */}
                  {myGigs.length === 0 && !showCreateGig ? (
                    <div className="gigs-empty">
                      <span className="gigs-empty-icon">🎯</span>
                      <h3>No gigs yet</h3>
                      <p>Create your first gig to start getting orders!</p>
                    </div>
                  ) : (
                    <div className="my-gigs-list">
                      {myGigs.map((gig) => (
                        <div className="my-gig-card" key={gig._id} id={`my-gig-${gig._id}`}>
                          <div className="my-gig-info">
                            <h4>{gig.title}</h4>
                            <div className="my-gig-meta">
                              <span>🏷️ {gig.category}</span>
                              <span>💰 ${gig.price}</span>
                              <span>📦 {gig.deliveryDays} days</span>
                            </div>
                          </div>
                          <div className="my-gig-actions">
                            <Link to={`/gigs/${gig._id}`} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                              View
                            </Link>
                            <button
                              className="btn-danger"
                              onClick={() => handleDeleteGig(gig._id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
