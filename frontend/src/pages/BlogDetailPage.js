import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await apiService.getBlogPost(slug);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-spinner" data-testid="blog-detail-loading">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state" data-testid="blog-not-found">
            <h2>Blog post not found</h2>
            <Link to="/blog" className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page blog-detail-page" data-testid="blog-detail-page">
      <section className="content-section">
        <div className="container-narrow">
          <Link to="/blog" className="back-link" data-testid="back-to-blog">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="blog-detail-content"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="blog-detail-image" />
            )}

            <div className="blog-detail-meta">
              <span>
                <Calendar size={18} />
                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
              </span>
              <span>
                <User size={18} />
                {post.author}
              </span>
            </div>

            <h1 className="blog-detail-title">{post.title}</h1>

            <div className="blog-detail-body" dangerouslySetInnerHTML={{ __html: post.content }} />

            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;