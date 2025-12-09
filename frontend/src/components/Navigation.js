import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LoginPopup from './LoginPopup';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/clients', label: 'Clients' },
    // { path: '/case-studies', label: 'Case Studies' }, // Hidden - can be enabled from admin panel
    // { path: '/blog', label: 'Blog' }, // Hidden - can be enabled from admin panel
    // { path: '/testimonials', label: 'Testimonials' }, // Hidden - can be enabled from admin panel
    { path: '/careers', label: 'Careers' },
    { path: 'https://linkext.io/Login.aspx', label: 'Login', external: true },
    { path: '/contact', label: "Let's Talk" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation" data-testid="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <img 
            src="https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/7ueszcuz_PHOTO-2025-11-24-16-49-11.jpg" 
            alt="My Inbox Media®" 
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="mobile-menu-button"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-links-mobile" data-testid="mobile-menu">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link-mobile`}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-mobile ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;