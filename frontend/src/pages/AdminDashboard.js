import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../utils/api';
import { toast } from 'sonner';
import { LayoutDashboard, FileText, MessageSquare, Briefcase, Mail, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiService.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      toast.error('Please login to access admin panel');
      navigate('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (!user) {
    return <div className="loading-spinner" data-testid="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard" data-testid="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user.name}</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link" data-testid="admin-nav-dashboard">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admin/blog" className="admin-nav-link" data-testid="admin-nav-blog">
            <FileText size={20} />
            Blog Posts
          </Link>
          <Link to="/admin/testimonials" className="admin-nav-link" data-testid="admin-nav-testimonials">
            <MessageSquare size={20} />
            Testimonials
          </Link>
          <Link to="/admin/case-studies" className="admin-nav-link" data-testid="admin-nav-case-studies">
            <Briefcase size={20} />
            Case Studies
          </Link>
          <Link to="/admin/contacts" className="admin-nav-link" data-testid="admin-nav-contacts">
            <Mail size={20} />
            Contacts
          </Link>
        </nav>

        <button onClick={handleLogout} className="admin-logout-btn" data-testid="admin-logout">
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/blog" element={<div className="admin-page"><h2>Blog Management</h2><p>Blog CRUD functionality coming soon...</p></div>} />
          <Route path="/testimonials" element={<div className="admin-page"><h2>Testimonials Management</h2><p>Testimonials CRUD functionality coming soon...</p></div>} />
          <Route path="/case-studies" element={<div className="admin-page"><h2>Case Studies Management</h2><p>Case Studies CRUD functionality coming soon...</p></div>} />
          <Route path="/contacts" element={<div className="admin-page"><h2>Contact Messages</h2><p>Contact management functionality coming soon...</p></div>} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="admin-page" data-testid="admin-dashboard-home">
      <h1>Welcome to Admin Dashboard</h1>
      <p>Manage your website content from here.</p>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <FileText size={32} />
          <h3>Blog Posts</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="admin-stat-card">
          <MessageSquare size={32} />
          <h3>Testimonials</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="admin-stat-card">
          <Briefcase size={32} />
          <h3>Case Studies</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="admin-stat-card">
          <Mail size={32} />
          <h3>Contact Messages</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;