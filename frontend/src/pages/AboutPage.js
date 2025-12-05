import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Target, Eye, Award, Globe2, Shield, Zap, Users, Code, Brain, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const globalPresence = [
    {
      region: 'Americas',
      countries: [
        { flag: '🇺🇸', name: 'USA', description: 'Serving the innovation hubs of North America' },
        { flag: '🇨🇦', name: 'Canada', description: 'Bridging the Atlantic and Pacific corridors' }
      ]
    },
    {
      region: 'Middle East & Africa (MENA)',
      countries: [
        { flag: '🇦🇪', name: 'UAE', description: 'Our regional HQ driving innovation in the Gulf' },
        { flag: '🇸🇦', name: 'KSA', description: 'Powering the digital transformation of Vision 2030' },
        { flag: '🇶🇦', name: 'Qatar', description: 'Connecting the peninsula to the world' },
        { flag: '🇪🇬', name: 'Egypt', description: 'The gateway to African commerce' }
      ]
    },
    {
      region: 'Asia Pacific',
      countries: [
        { flag: '🇮🇳', name: 'India', description: 'Leveraging the world\'s largest technical talent pool' },
        { flag: '🇦🇺', name: 'Australia', description: 'Anchoring our reach in the Southern Hemisphere' }
      ]
    }
  ];

  const stats = [
    { value: 16, suffix: '+', label: 'Years of Continuous Innovation' },
    { value: 25000, suffix: '+', label: 'Enterprise Clients Served' },
    { value: 30, suffix: 'B', label: 'SMS Processed Annually' },
    { value: 20, suffix: 'B', label: 'Emails Delivered Annually' },
    { value: 50, suffix: 'M', label: 'WhatsApp Conversations Facilitated' },
  ];

  const cxoValues = [
    {
      title: 'Scalability on Demand',
      subtitle: 'For the CTO',
      icon: <Zap />,
      content: 'Your business environment is volatile. Demand spikes are unpredictable. MiM\'s cloud-native architecture is built on elastic scalability. Whether you are sending ten messages or ten million, our throughput adjusts dynamically. We utilize AI-driven routing to find the path of least resistance, ensuring near-zero latency delivery rates even during global network congestion.'
    },
    {
      title: 'Fortified Security & Data Sovereignty',
      subtitle: 'For the CISO',
      icon: <Shield />,
      content: 'In the age of cyber threats, communication channels are often the most vulnerable vector. At MiM, security is not an add-on; it is the foundation. We employ end-to-end encryption and adhere to the strictest global data protection standards. Our local data centers ensure that sensitive customer data stays within national borders where required by law, mitigating legal risk and ensuring compliance for banking, healthcare, and government clients.'
    },
    {
      title: 'Omnichannel Unification',
      subtitle: 'For the CMO',
      icon: <Users />,
      content: 'The modern customer journey is non-linear. They start on WhatsApp, confirm via SMS, and engage via Email. MiM consolidates these fragmented channels into a single, cohesive ecosystem. Our "One-View" dashboard allows marketing leaders to orchestrate complex, multi-touchpoint campaigns that follow the user, not the device.'
    }
  ];

  const techFeatures = [
    {
      title: 'The Core Engine',
      icon: <Code />,
      description: 'Our platform is built on a proprietary stack developed over a decade and a half of R&D. Unlike white-label resellers, we own our code. This allows us to push updates, patch vulnerabilities, and deploy custom features faster than the competition.'
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain />,
      description: 'We are pioneering the use of predictive analytics in telecommunication. Our systems analyze delivery patterns in real-time to predict carrier failures before they happen, rerouting traffic instantaneously to ensure delivery guarantees.'
    },
    {
      title: 'Seamless Integration',
      icon: <Sparkles />,
      description: 'We speak your language. Our robust REST APIs and SMPP connections are designed to plug-and-play with the world\'s leading ERPs and CRMs—Salesforce, SAP, Oracle, and Microsoft Dynamics. We minimize the dev-ops burden on your team, allowing for integrations that take hours, not months.'
    }
  ];

  return (
    <div className="page about-page-new" data-testid="about-page">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-hero-title">
              Architecting the Pulse of Global Enterprise
            </h1>
            <p className="about-hero-subtitle">
              We don't just deliver messages. We engineer the infrastructure that powers 25,000+ businesses across 8 nations.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Discover Our Network
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: EXECUTIVE SUMMARY */}
      <section className="executive-summary-section">
        <div className="container">
          <div className="executive-summary-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="executive-summary-image"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/u8cce6au_IMG_2949.jpg" 
                alt="My Inbox Media Network" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="executive-summary-content"
            >
              <h2 className="executive-summary-title">Beyond Communication. Connection.</h2>
              <div className="executive-summary-text">
                <p>
                  In an era where a millisecond of latency can define market leadership, My Inbox Media® (MiM) stands as the silent engine behind the world's most critical business conversations. Founded in 2010, we recognized early on that the future of enterprise was not just in speaking, but in reaching.
                </p>
                <p>
                  We saw a widening gap between rapidly evolving business needs and the stagnating capabilities of traditional telecommunication providers. We set out to close that gap.
                </p>
                <p>
                  Sixteen years later, MiM has evolved from a visionary startup into a multinational powerhouse in IT and telecommunication solutions. We are no longer just a service provider; we are strategic partners to Fortune 500 companies, enabling them to transcend geographical boundaries and technological limitations.
                </p>
                <p className="executive-highlight">
                  Our mission is simple yet profound: to ensure that when business speaks, the world listens—instantly, securely, and seamlessly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: GLOBAL FOOTPRINT */}
      <section className="global-footprint-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-white">A World Without Borders. A Platform Without Limits.</h2>
            <p className="section-subtitle-white">
              Local expertise meets global scale. We navigate the complexities of international telecom regulations so you don't have to.
            </p>

            <div className="global-network-grid">
              {globalPresence.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="region-card"
                >
                  <h3 className="region-title">{region.region}</h3>
                  <div className="countries-list">
                    {region.countries.map((country, idx) => (
                      <div key={idx} className="country-item">
                        <span className="country-flag">{country.flag}</span>
                        <div className="country-info">
                          <h4>{country.name}</h4>
                          <p>{country.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="cxo-relevance-card">
              <h3>The CXO Relevance</h3>
              <p>
                For the Chief Information Officer, this means one contract, one API, and one standard of delivery across continents. 
                We manage the regulatory nuance of data sovereignty in Saudi Arabia, the strict privacy laws of Canada, and the 
                volume demands of India—simultaneously.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: BY THE NUMBERS */}
      <section className="numbers-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="numbers-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="number-card"
                >
                  <div className="number-value">
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
                  </div>
                  <div className="number-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="numbers-narrative"
            >
              <p>
                These aren't just statistics; they are proof of stability. When you process 50 billion touchpoints a year, 
                "downtime" is not in your vocabulary. Our systems are stress-tested to handle peak loads that would cripple 
                standard providers, ensuring your Black Friday campaigns and critical banking OTPs are delivered with equal precision.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: CXO VALUE PROPOSITION */}
      <section className="cxo-value-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why the Fortune 500 Trusts MiM</h2>
            
            <div className="cxo-cards-grid">
              {cxoValues.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`cxo-card ${expandedCard === index ? 'expanded' : ''}`}
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                >
                  <div className="cxo-card-header">
                    <div className="cxo-icon">{item.icon}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="cxo-subtitle">{item.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="cxo-card-content">
                    <p>{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: TECHNOLOGY DNA */}
      <section className="tech-dna-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Engineering the Future of Interaction</h2>
            
            <div className="tech-features-grid">
              {techFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="tech-feature-card"
                >
                  <div className="tech-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CULTURE & VISION */}
      <section className="culture-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-white">Obsessed with Customer Success</h2>
            
            <div className="culture-content">
              <div className="culture-quote">
                <p className="quote-text">
                  "Technology is our product, but service is our business. We believe that B2B technology has lost its human touch. 
                  At MiM, we are bringing it back."
                </p>
              </div>

              <div className="culture-text">
                <p>
                  Every enterprise client is assigned a dedicated success squad—not a chatbot, but real experts in telecommunication strategy.
                </p>
                <p>
                  Our journey from a startup in 2010 to a global leader today was not fueled by venture capital, but by the trust of our clients. 
                  We grow when you grow. This symbiotic relationship drives us to constantly refine our SLAs and push the boundaries of what 
                  is possible in digital communication.
                </p>
              </div>

              <div className="vision-forward-card">
                <h3>The Vision Forward</h3>
                <p>
                  As we look to the next decade, we are expanding our horizons into RCS (Rich Communication Services) and AI-driven 
                  conversational commerce. We are building a future where businesses don't just broadcast to customers, but hold 
                  meaningful, intelligent conversations at scale.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: CTA FOOTER */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-cta-content"
          >
            <h2>Ready to Upgrade Your Infrastructure?</h2>
            <p>
              Join the 25,000+ businesses that have chosen reliability, scale, and expertise. 
              Let's build the future of your communication strategy together.
            </p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a C-Level Consultation
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg">
                View Technical Documentation
              </Link>
            </div>
            <div className="about-footer-certifications">
              <span>My Inbox Media®</span>
              <span>ISO 27001 Certified</span>
              <span>GDPR Compliant</span>
            </div>
            <div className="about-footer-locations">
              India | UAE | Canada | USA | KSA | Egypt | Australia | Qatar
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
