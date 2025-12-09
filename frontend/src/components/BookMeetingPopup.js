import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Send } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'sonner';
import { apiService } from '../utils/api';
import { format } from 'date-fns';

const BookMeetingPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    preferredDate: null,
    preferredTime: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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
      // Combine country code with phone
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      
      // Send to backend API
      await apiService.bookMeeting({
        ...formData,
        phone: fullPhone
      });
      
      toast.success('Meeting request sent! Our team will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        company: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
      
      // Close popup
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast.error('Failed to send request. Please try again.');
      console.error('Book meeting error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="popup-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="popup-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="popup-close-btn" onClick={onClose} type="button">
              <X size={24} />
            </button>

            {/* Header */}
            <div className="popup-header">
              <Calendar size={48} className="popup-icon" />
              <h2>Book a Google Meet with Our Team</h2>
              <p>Let&apos;s discuss how we can help transform your business</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="popup-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
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
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Mobile Number *</label>
                  <div className="phone-input-group">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="country-code-select"
                      required
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+1">🇨🇦 +1</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+974">🇶🇦 +974</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date *</label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Time *</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">What would you like to discuss?</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? 'Sending Request...' : (
                  <>
                    <Send size={20} />
                    Book Google Meet
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookMeetingPopup;
