import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo-container">
              <img 
                src="https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/7ueszcuz_PHOTO-2025-11-24-16-49-11.jpg" 
                alt="My Inbox Media®" 
                className="footer-logo"
              />
            </div>
            <p className="footer-text">
              Leading IT & Telecommunication solutions provider serving 25,000+ businesses globally for 16+ years.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-value">16+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">20+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="footer-stat">
                <span className="stat-value">25K+</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about" data-testid="footer-link-about">About Us</Link></li>
              <li><Link to="/services" data-testid="footer-link-services">Services</Link></li>
              <li><Link to="/case-studies" data-testid="footer-link-case-studies">Case Studies</Link></li>
              <li><Link to="/blog" data-testid="footer-link-blog">Blog</Link></li>
              <li><Link to="/contact" data-testid="footer-link-contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li>SMS Solutions</li>
              <li>WhatsApp Business API</li>
              <li>Email Services</li>
              <li>RCS Messaging</li>
              <li>Chatbot Solutions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <div>
                  <a href="mailto:info@myinboxmedia.com">info@myinboxmedia.com</a>
                  <a href="mailto:support@myinboxmedia.com">support@myinboxmedia.com</a>
                </div>
              </li>
              <li>
                <Phone size={18} />
                <div>
                  <span>🇮🇳 +91 801 022 1100</span>
                  <span>🇦🇪 +971 (0)4 123-4567</span>
                </div>
              </li>
              <li>
                <MapPin size={18} />
                <span>Global Offices: India, UAE, Canada, USA, KSA, Egypt, Australia, Qatar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} My Inbox Media®. All rights reserved.</p>
          <div className="footer-certifications">
            <span>ISO 9001:2015</span>
            <span>ISO 27001:2013</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;