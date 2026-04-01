import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactCards = [
    {
      icon: '📧',
      title: 'Email Us',
      text: 'support@skillex.com',
    },
    {
      icon: '📍',
      title: 'Office',
      text: 'Mahoba, Jhansi, Uttar Pradesh, India',
    },
    {
      icon: '📞',
      title: 'Call Us',
      text: '+91 87504 56105',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      text: 'Available 24/7',
    },
  ];

  return (
    <>
      <section className="contact-hero" id="contact-hero">
        <h1 className="fade-in">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="fade-in fade-in-delay-1">
          Have a question, feedback, or a project in mind? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-content" id="contact-content">
        {/* Info Cards */}
        <div className="contact-info">
          {contactCards.map((c) => (
            <div className="contact-info-card" key={c.title}>
              <div className="contact-info-icon">{c.icon}</div>
              <div>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="hiring">Hiring a Freelancer</option>
              <option value="freelancing">Becoming a Freelancer</option>
              <option value="support">Technical Support</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us more about your needs..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="form-submit" id="submit-btn">
            {submitted ? '✅ Message Sent!' : 'Send Message →'}
          </button>
        </form>
      </section>
    </>
  );
}

export default Contact;
