import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiService.submitContact(formData);
      toast.success('Thank you for contacting us! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to submit contact form. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page contact-page" data-testid="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="contact-title">Let's Talk</h1>
            <p className="page-subtitle">
              Let's discuss how we can transform your business with our solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="content-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="contact-form-wrapper">
                <h2 className="form-title">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form" data-testid="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                      data-testid="contact-name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="contact-email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      data-testid="contact-phone"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      data-testid="contact-service"
                    >
                      <option value="">Select a service</option>
                      <option value="SMS Solutions">SMS Solutions</option>
                      <option value="WhatsApp Business API">WhatsApp Business API</option>
                      <option value="Email Services">Email Services</option>
                      <option value="RCS Messaging">RCS Messaging</option>
                      <option value="Chatbot Solutions">Chatbot Solutions</option>
                      <option value="API Integration">API Integration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={1000}
                      rows={6}
                      data-testid="contact-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={submitting}
                    data-testid="contact-submit"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="contact-info-wrapper">
                <h2 className="info-title">Contact Information</h2>

                <div className="contact-info-card">
                  <Mail className="info-icon" />
                  <div>
                    <h3>Email Us</h3>
                    <a href="mailto:info@myinboxmedia.com">info@myinboxmedia.com</a>
                    <a href="mailto:support@myinboxmedia.com">support@myinboxmedia.com</a>
                  </div>
                </div>

                <div className="contact-info-card">
                  <Phone className="info-icon" />
                  <div>
                    <h3>Call Us</h3>
                    <p>🇮🇳 +91-801 022 1100</p>
                    <p>🇦🇪 +971-47701581</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <MapPin className="info-icon" />
                  <div>
                    <h3>Global Offices</h3>
                    <p><strong>India:</strong> Mumbai, Delhi, Bangalore, Hyderabad</p>
                    <p><strong>International:</strong> UAE, Canada, USA, KSA, Egypt, Australia, Qatar</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;