import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const response = await apiService.getBlogPosts({ page, limit: 9, published_only: true });
      setPosts(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page blog-page" data-testid="blog-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="blog-title">Blog & News</h1>
            <p className="page-subtitle">
              Insights, updates, and stories from the world of digital communication
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner" data-testid="blog-loading">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state" data-testid="blog-empty">
              <p>No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${post.slug}`} className="blog-card" data-testid={`blog-post-${index}`}>
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="blog-card-image" />
                    )}
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span>
                          <Calendar size={16} />
                          {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </span>
                        <span>
                          <User size={16} />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <span className="blog-card-link">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`pagination-button ${page === pageNum ? 'active' : ''}`}
                  data-testid={`page-${pageNum}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;