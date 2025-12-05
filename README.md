# My Inbox Media® - Corporate Website

A comprehensive multi-page corporate website built with React, FastAPI, and MongoDB featuring 12 services, dynamic data, admin panel, and liquid glass aesthetic.

## 🌟 Features

- **10 Pages**: Home, About, Services, Clients, Blog, Case Studies, Testimonials, Careers, Contact, Admin
- **12 Services**: Dynamically displayed with detailed features
- **79 Client Logos**: Showcasing global partnerships
- **6 Stat Boxes**: Real-time business metrics
- **Admin Panel**: JWT-authenticated content management
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Liquid Glass UI**: Premium Apple-like aesthetic

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router 7
- Framer Motion (animations)
- React Parallax Tilt (3D effects)
- Embla Carousel (client logos)
- React CountUp (animated stats)
- Axios (API calls)
- Sonner (toast notifications)
- Lucide React (icons)

### Backend
- FastAPI
- Motor (async MongoDB driver)
- PyJWT (authentication)
- Bcrypt (password hashing)
- BeautifulSoup4 (data parsing)
- Python-Multipart (file uploads)

### Database
- MongoDB

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.10+
- MongoDB 5.0+

## 🚀 Installation & Setup

### 1. Clone/Download the Repository

Download the entire project folder to your local machine.

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit backend/.env file with your settings:
MONGO_URL=mongodb://localhost:27017
DB_NAME=mim_website
JWT_SECRET_KEY=your-super-secret-jwt-key-here-change-this-in-production
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Start backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install
# or
npm install

# Configure environment variables
# Edit frontend/.env file:
REACT_APP_BACKEND_URL=http://localhost:8001

# Start development server
yarn start
# or
npm start
```

### 4. MongoDB Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if not running)
mongod --dbpath /path/to/your/data/directory

# Or if using MongoDB as a service:
sudo systemctl start mongod
```

## 🔐 Create Admin User

After backend is running, create an admin user:

```bash
curl -X POST http://localhost:8001/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@myinboxmedia.com",
    "name": "Admin User",
    "password": "YourSecurePassword123"
  }'
```

## 📁 Project Structure

```
/
├── backend/
│   ├── server.py           # Main FastAPI application
│   ├── auth.py             # JWT authentication
│   ├── models.py           # Pydantic models
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment variables
│
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── App.js         # Main React component with routing
│   │   ├── App.css        # All styles (liquid glass aesthetic)
│   │   ├── pages/         # All page components
│   │   │   ├── HomePage.js
│   │   │   ├── AboutPage.js
│   │   │   ├── ServicesPage.js
│   │   │   ├── ClientsPage.js
│   │   │   ├── BlogPage.js
│   │   │   ├── BlogDetailPage.js
│   │   │   ├── CaseStudiesPage.js
│   │   │   ├── CaseStudyDetailPage.js
│   │   │   ├── TestimonialsPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── CareersPage.js
│   │   │   ├── AdminLoginPage.js
│   │   │   └── AdminDashboard.js
│   │   ├── components/    # Reusable components
│   │   │   ├── Navigation.js
│   │   │   └── Footer.js
│   │   └── utils/
│   │       └── api.js     # API service layer
│   ├── package.json       # Node dependencies
│   └── .env              # Frontend environment variables
│
├── tests/
│   └── test_core.py       # Core functionality tests
│
└── README.md              # This file
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/external/services` - Get all services (12)
- `GET /api/external/clients` - Get client logos (79)
- `POST /api/contact` - Submit contact form
- `GET /api/blog` - Get blog posts (paginated)
- `GET /api/blog/{slug}` - Get single blog post
- `GET /api/testimonials` - Get testimonials
- `GET /api/case-studies` - Get case studies
- `GET /api/case-studies/{slug}` - Get single case study

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/me` - Get current user info (requires auth)

### Admin Endpoints (Require JWT Authentication)
- Blog: POST/PUT/DELETE `/api/admin/blog`
- Testimonials: POST/PUT/DELETE `/api/admin/testimonials`
- Case Studies: POST/PUT/DELETE `/api/admin/case-studies`
- Contacts: GET `/api/admin/contacts`

## 🌐 Production Deployment

### Using Nginx + Gunicorn

1. **Build Frontend:**
```bash
cd frontend
yarn build
```

2. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name myinboxmedia.com;

    # Frontend
    location / {
        root /var/www/mim-website/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. **Start Backend with Gunicorn:**
```bash
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001
```

### Using Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🔒 Security Best Practices

1. **Change JWT Secret**: Generate a strong random key (32+ characters)
2. **Update CORS**: Set specific domains instead of "*"
3. **Enable HTTPS**: Use Let's Encrypt for SSL certificates
4. **MongoDB Auth**: Enable authentication in production
5. **Rate Limiting**: Add rate limiting to API endpoints
6. **Backup Database**: Set up automated MongoDB backups

## 📦 How to Download Code

### Method 1: ZIP Download (Emergent Platform)
If using Emergent platform, use the download button to get the entire codebase as ZIP.

### Method 2: Git Clone (If connected to GitHub)
```bash
git clone your-repo-url
cd mim-website
```

### Method 3: Manual Copy
Copy the following directories:
- `/app/backend/` - All backend files
- `/app/frontend/` - All frontend files
- `/app/tests/` - Test files

## 📊 Default Admin Credentials

**Email:** admin@myinboxmedia.com  
**Password:** Admin@123

⚠️ **IMPORTANT:** Change these credentials after first login in production!

## 🎯 Key Files to Update for Your Domain

1. **backend/.env**:
   - Update `CORS_ORIGINS` with your domain
   - Change `JWT_SECRET_KEY` to a secure random value

2. **frontend/.env**:
   - Update `REACT_APP_BACKEND_URL` to your API domain

3. **Frontend Package.json** (for production build):
   - Update `homepage` if deploying to subdirectory

## ✅ Post-Deployment Checklist

- [ ] MongoDB is running and accessible
- [ ] Backend API responds at /api/health
- [ ] Frontend loads at your domain
- [ ] Admin login works
- [ ] Contact form submissions save to database
- [ ] All 12 services display correctly
- [ ] Client logos load (79 logos)
- [ ] All pages navigate correctly
- [ ] Mobile responsive design works
- [ ] Forms are visible and functional

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongosh`
- Verify .env file exists with all variables
- Check logs for errors

### Frontend shows blank page
- Build the app: `yarn build`
- Check REACT_APP_BACKEND_URL is set correctly
- Verify backend API is accessible

### Admin login fails
- Verify JWT_SECRET_KEY is set
- Check admin user was created
- Verify MongoDB connection

### Services not loading
- Check backend API: `curl http://localhost:8001/api/external/services`
- Verify CORS is configured correctly
- Check browser console for errors

## 📞 Support

For technical support or questions about deployment, refer to your server hosting documentation or contact your system administrator.

---

**My Inbox Media® - Transforming Businesses Globally**

**Live Preview:** https://mim-evolution.preview.emergentagent.com
