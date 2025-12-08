import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions
export const apiService = {
  // External data
  getServices: () => api.get('/api/external/services'),
  getClients: () => api.get('/api/external/clients'),
  
  // Contact
  submitContact: (data) => api.post('/api/contact', data),
  
  // Book Meeting
  bookMeeting: (data) => api.post('/api/book-meeting', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.company || '',
    message: `${data.preferredDate || ''}|${data.preferredTime || ''}|${data.message || ''}`
  }),
  
  // Blog
  getBlogPosts: (params) => api.get('/api/blog', { params }),
  getBlogPost: (slug) => api.get(`/api/blog/${slug}`),
  
  // Testimonials
  getTestimonials: (params) => api.get('/api/testimonials', { params }),
  
  // Case Studies
  getCaseStudies: (params) => api.get('/api/case-studies', { params }),
  getCaseStudy: (slug) => api.get(`/api/case-studies/${slug}`),
  
  // Auth
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getCurrentUser: () => api.get('/api/auth/me'),
  
  // Admin - Blog
  createBlogPost: (data) => api.post('/api/admin/blog', data),
  updateBlogPost: (id, data) => api.put(`/api/admin/blog/${id}`, data),
  deleteBlogPost: (id) => api.delete(`/api/admin/blog/${id}`),
  
  // Admin - Testimonials
  createTestimonial: (data) => api.post('/api/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/api/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/api/admin/testimonials/${id}`),
  
  // Admin - Case Studies
  createCaseStudy: (data) => api.post('/api/admin/case-studies', data),
  updateCaseStudy: (id, data) => api.put(`/api/admin/case-studies/${id}`, data),
  deleteCaseStudy: (id) => api.delete(`/api/admin/case-studies/${id}`),
  
  // Admin - Contacts
  getContacts: (params) => api.get('/api/admin/contacts', { params }),
  updateContactStatus: (id, status) => api.patch(`/api/admin/contacts/${id}/status`, null, { params: { status_value: status } }),
};

export default api;