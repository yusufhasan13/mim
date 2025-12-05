import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Globe2 } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Target />,
      title: 'Our Mission',
      description: 'Empowering businesses globally with innovative IT and telecommunication solutions that drive sustainable growth, enhance customer experiences, and create lasting value in an increasingly digital world.'
    },
    {
      icon: <Eye />,
      title: 'Our Vision',
      description: 'To be the most trusted digital transformation partner globally, recognized for our innovation, quality, and customer-centric approach while setting new standards in the industry.'
    },
    {
      icon: <Award />,
      title: 'Our Values',
      description: 'Excellence, innovation, integrity, and customer success drive everything we do. We are committed to delivering world-class solutions with unwavering dedication.'
    },
    {
      icon: <Globe2 />,
      title: 'Global Reach',
      description: 'With presence in 20+ countries and 11 strategic offices, we ensure local support backed by global expertise, serving 25,000+ business users worldwide.'
    }
  ];

  return (
    <div className="page about-page" data-testid="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="about-title">About My Inbox Media®</h1>
            <p className="page-subtitle">
              Established in 2010, we are a leading MNC providing IT and telecommunication solutions
              to over 25,000+ business users globally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="content-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="content-block"
          >
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Founded in 2010 with a vision to bridge the gap between businesses and cutting-edge digital communication,
              My Inbox Media® has grown from a startup to a global leader in IT and telecommunication solutions.
              Our journey of over 16 years has been marked by continuous innovation, unwavering commitment to quality,
              and an obsession with customer success.
            </p>
            <p className="section-text">
              Today, we proudly serve 25,000+ businesses across the Globe, processing over 30 billion SMS,
              50 million WhatsApp messages, and 20 billion emails annually. Our success is built on a foundation
              of trust, technological excellence, and a deep understanding of our clients' needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="value-card" data-testid={`value-card-${index}`}>
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Trust & Security</h2>
            <p className="section-subtitle">
              Certified excellence in quality and information security with enterprise-grade protection
            </p>
            <div className="certifications-grid">
              <div className="certification-badge" data-testid="cert-iso-9001">
                <h3>ISO 9001:2015</h3>
                <p>Quality Management System Certified</p>
              </div>
              <div className="certification-badge" data-testid="cert-iso-27001">
                <h3>ISO 27001:2013</h3>
                <p>Information Security Management Certified</p>
              </div>
              <div className="certification-badge" data-testid="cert-gdpr">
                <h3>GDPR Compliant</h3>
                <p>Data Protection & Privacy</p>
              </div>
              <div className="certification-badge" data-testid="cert-soc2">
                <h3>SOC2 Compliant</h3>
                <p>Enterprise Grade Security</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;