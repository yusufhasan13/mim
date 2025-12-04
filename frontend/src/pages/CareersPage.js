import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

const CareersPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    countryCode: '+91',
    email: '',
    currentLocation: '',
    position: '',
    experience: '',
    currentCompany: '',
    noticePeriod: '',
    currentSalary: '',
    expectedSalary: '',
    coverLetter: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // TODO: Implement backend API for job applications
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Application submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        countryCode: '+91',
        email: '',
        currentLocation: '',
        position: '',
        experience: '',
        currentCompany: '',
        noticePeriod: '',
        currentSalary: '',
        expectedSalary: '',
        coverLetter: '',
        resume: null
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Users />,
      title: 'Global Team',
      description: 'Work with talented professionals across 8 countries'
    },
    {
      icon: <TrendingUp />,
      title: 'Career Growth',
      description: 'Continuous learning and advancement opportunities'
    },
    {
      icon: <Award />,
      title: 'Competitive Benefits',
      description: 'Industry-leading compensation and benefits package'
    },
    {
      icon: <Briefcase />,
      title: 'Innovative Projects',
      description: 'Work on cutting-edge IT & telecommunication solutions'
    }
  ];

  return (
    <div className=\"page careers-page\" data-testid=\"careers-page\">
      {/* Hero Section */}
      <section className=\"page-hero\">
        <div className=\"container\">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className=\"page-title\" data-testid=\"careers-title\">Join Our Team</h1>
            <p className=\"page-subtitle\">
              Shape the future of digital communication with industry leaders
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className=\"content-section\">
        <div className=\"container\">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className=\"section-title\">Why Work With Us?</h2>
            <div className=\"benefits-grid\">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className=\"benefit-card\" data-testid={`benefit-${index}`}>
                    <div className=\"benefit-icon\">{benefit.icon}</div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className=\"content-section\" style={{ paddingTop: 0 }}>
        <div className=\"container\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className=\"careers-form-wrapper\">
              <h2 className=\"form-title\">Apply Now</h2>
              <form onSubmit={handleSubmit} className=\"careers-form\" data-testid=\"careers-form\">
                <div className=\"form-row\">
                  <div className=\"form-group\">
                    <label htmlFor=\"fullName\">Full Name *</label>
                    <input
                      type=\"text\"
                      id=\"fullName\"
                      name=\"fullName\"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-fullname\"
                    />
                  </div>

                  <div className=\"form-group\">
                    <label htmlFor=\"email\">Email Address *</label>
                    <input
                      type=\"email\"
                      id=\"email\"
                      name=\"email\"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-email\"
                    />
                  </div>
                </div>

                <div className=\"form-row\">
                  <div className=\"form-group phone-group\">
                    <label htmlFor=\"phoneNumber\">Phone Number *</label>
                    <div className=\"phone-input-group\">
                      <select
                        name=\"countryCode\"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className=\"country-code-select\"
                      >
                        <option value=\"+91\">🇮🇳 +91</option>
                        <option value=\"+971\">🇦🇪 +971</option>
                        <option value=\"+1\">🇺🇸 +1</option>
                        <option value=\"+966\">🇸🇦 +966</option>
                        <option value=\"+61\">🇦🇺 +61</option>
                        <option value=\"+974\">🇶🇦 +974</option>
                      </select>
                      <input
                        type=\"tel\"
                        id=\"phoneNumber\"
                        name=\"phoneNumber\"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        data-testid=\"careers-phone\"
                      />
                    </div>
                  </div>

                  <div className=\"form-group\">
                    <label htmlFor=\"currentLocation\">Current Location *</label>
                    <input
                      type=\"text\"
                      id=\"currentLocation\"
                      name=\"currentLocation\"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-location\"
                    />
                  </div>
                </div>

                <div className=\"form-row\">
                  <div className=\"form-group\">
                    <label htmlFor=\"position\">Position Applied For *</label>
                    <select
                      id=\"position\"
                      name=\"position\"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-position\"
                    >
                      <option value=\"\">Select a position</option>
                      <option value=\"Software Developer\">Software Developer</option>
                      <option value=\"Marketing Manager\">Marketing Manager</option>
                      <option value=\"Sales Executive\">Sales Executive</option>
                      <option value=\"Customer Support\">Customer Support</option>
                      <option value=\"Project Manager\">Project Manager</option>
                      <option value=\"HR Manager\">HR Manager</option>
                      <option value=\"Other\">Other</option>
                    </select>
                  </div>

                  <div className=\"form-group\">
                    <label htmlFor=\"experience\">Total Experience *</label>
                    <select
                      id=\"experience\"
                      name=\"experience\"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-experience\"
                    >
                      <option value=\"\">Select experience</option>
                      <option value=\"0-1 years\">0-1 years</option>
                      <option value=\"1-3 years\">1-3 years</option>
                      <option value=\"3-5 years\">3-5 years</option>
                      <option value=\"5-7 years\">5-7 years</option>
                      <option value=\"7-10 years\">7-10 years</option>
                      <option value=\"10+ years\">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className=\"form-row\">
                  <div className=\"form-group\">
                    <label htmlFor=\"currentCompany\">Current Company</label>
                    <input
                      type=\"text\"
                      id=\"currentCompany\"
                      name=\"currentCompany\"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      data-testid=\"careers-current-company\"
                    />
                  </div>

                  <div className=\"form-group\">
                    <label htmlFor=\"noticePeriod\">Notice Period *</label>
                    <select
                      id=\"noticePeriod\"
                      name=\"noticePeriod\"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                      required
                      data-testid=\"careers-notice-period\"
                    >
                      <option value=\"\">Select notice period</option>
                      <option value=\"Immediate\">Immediate</option>
                      <option value=\"15 days\">15 days</option>
                      <option value=\"30 days\">30 days</option>
                      <option value=\"60 days\">60 days</option>
                      <option value=\"90 days\">90 days</option>
                      <option value=\"Other\">Other</option>
                    </select>
                  </div>
                </div>

                <div className=\"form-row\">
                  <div className=\"form-group\">
                    <label htmlFor=\"currentSalary\">Current Salary (Annual)</label>
                    <input
                      type=\"text\"
                      id=\"currentSalary\"
                      name=\"currentSalary\"
                      value={formData.currentSalary}
                      onChange={handleChange}
                      placeholder=\"e.g., $50,000\"
                      data-testid=\"careers-current-salary\"
                    />
                  </div>

                  <div className=\"form-group\">
                    <label htmlFor=\"expectedSalary\">Expected Salary (Annual) *</label>
                    <input
                      type=\"text\"
                      id=\"expectedSalary\"
                      name=\"expectedSalary\"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      required
                      placeholder=\"e.g., $60,000\"
                      data-testid=\"careers-expected-salary\"
                    />
                  </div>
                </div>

                <div className=\"form-group\">
                  <label htmlFor=\"coverLetter\">Cover Letter / Why should we hire you?</label>
                  <textarea
                    id=\"coverLetter\"
                    name=\"coverLetter\"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={6}
                    placeholder=\"Tell us about yourself and why you'd be a great fit...\"
                    data-testid=\"careers-cover-letter\"
                  />
                </div>

                <div className=\"form-group\">
                  <label htmlFor=\"resume\">Upload Resume (PDF, DOC, DOCX - Max 5MB)</label>
                  <input
                    type=\"file\"
                    id=\"resume\"
                    name=\"resume\"
                    accept=\".pdf,.doc,.docx\"
                    onChange={handleFileChange}
                    className=\"file-input\"
                    data-testid=\"careers-resume\"
                  />
                  {formData.resume && (
                    <p className=\"file-name\">Selected: {formData.resume.name}</p>
                  )}
                </div>

                <button
                  type=\"submit\"
                  className=\"btn btn-primary btn-block\"
                  disabled={submitting}
                  data-testid=\"careers-submit\"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
