# How to Download and Deploy Your Website

## 📥 Download Options

### Option 1: Download from Emergent Platform (Recommended)

1. **Use the Download Button:**
   - Look for the download/export button in the Emergent interface
   - This will create a ZIP file with your entire codebase
   - Extract the ZIP on your local machine

### Option 2: Connect to GitHub

1. **Connect Repository:**
   - In Emergent, connect your GitHub account
   - Push code to your repository
   - Clone on your server: `git clone your-repo-url`

### Option 3: Manual File Transfer

If you have SSH access to the Emergent container:

```bash
# From your local machine, use SCP to download
scp -r emergent-server:/app ./mim-website

# Or create a tar archive first
ssh emergent-server "cd /app && tar -czf /tmp/mim-website.tar.gz backend frontend tests README.md"
scp emergent-server:/tmp/mim-website.tar.gz ./
tar -xzf mim-website.tar.gz
```

## 🗂️ Files You Need to Download

### Essential Directories:
```
backend/
├── server.py
├── auth.py
├── models.py
├── requirements.txt
├── .env (create new on your server)
└── __pycache__/ (can skip)

frontend/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── pages/
│   ├── components/
│   └── utils/
├── package.json
├── yarn.lock
├── .env (create new on your server)
└── node_modules/ (will reinstall)

tests/
└── test_core.py

README.md
```

## 🚀 Deploy to Your Own Server

### Step 1: Prepare Your Server

**Requirements:**
- Ubuntu 20.04+ or similar Linux distribution
- Sudo access
- Domain name pointed to your server

**Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3.10 python3-pip python3-venv -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install mongodb-org -y
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install nginx -y
```

### Step 2: Upload Your Code

```bash
# Create directory
sudo mkdir -p /var/www/mim-website
cd /var/www/mim-website

# Upload your downloaded code here
# Using SCP from your local machine:
scp -r ./mim-website/* user@your-server:/var/www/mim-website/
```

### Step 3: Setup Backend

```bash
cd /var/www/mim-website/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install production server
pip install gunicorn

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=mim_website
JWT_SECRET_KEY=$(openssl rand -hex 32)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
EOF

# Test backend
uvicorn server:app --host 0.0.0.0 --port 8001
# Press Ctrl+C after verifying it starts
```

### Step 4: Setup Frontend

```bash
cd /var/www/mim-website/frontend

# Install dependencies
npm install -g yarn
yarn install

# Create .env file
cat > .env << EOF
REACT_APP_BACKEND_URL=https://yourdomain.com
EOF

# Build for production
yarn build
```

### Step 5: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/mim-website
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend - Serve React build
    location / {
        root /var/www/mim-website/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable site and restart Nginx:**
```bash
sudo ln -s /etc/nginx/sites-available/mim-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 7: Setup Backend as System Service

```bash
# Create systemd service
sudo nano /etc/systemd/system/mim-backend.service
```

**Paste this configuration:**
```ini
[Unit]
Description=My Inbox Media Backend API
After=network.target mongod.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/mim-website/backend
Environment="PATH=/var/www/mim-website/backend/venv/bin"
ExecStart=/var/www/mim-website/backend/venv/bin/gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001
Restart=always

[Install]
WantedBy=multi-user.target
```

**Enable and start service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable mim-backend
sudo systemctl start mim-backend
sudo systemctl status mim-backend
```

### Step 8: Create Admin User

```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@myinboxmedia.com",
    "name": "Admin User",
    "password": "YourSecurePassword123"
  }'
```

## 🔍 Verify Deployment

1. **Check Backend:**
   ```bash
   curl https://yourdomain.com/api/health
   ```
   Should return: `{"status":"healthy","database":"connected",...}`

2. **Check Frontend:**
   Open browser: `https://yourdomain.com`
   Should show the homepage

3. **Check Services:**
   ```bash
   curl https://yourdomain.com/api/external/services
   ```
   Should return 12 services

4. **Test Admin Login:**
   - Go to: `https://yourdomain.com/admin/login`
   - Login with your credentials
   - Verify dashboard loads

## 🐳 Alternative: Docker Deployment

### Create docker-compose.yml:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=mim_website

  backend:
    build: ./backend
    restart: always
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=mim_website
      - JWT_SECRET_KEY=change-this-to-secure-random-key
      - CORS_ORIGINS=*
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### Create backend/Dockerfile:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

CMD ["gunicorn", "server:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8001"]
```

### Create frontend/Dockerfile:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create frontend/nginx.conf:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://backend:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Deploy with Docker:

```bash
docker-compose up -d
```

## 📊 Monitoring & Maintenance

### Check Backend Logs:
```bash
# If using systemd
sudo journalctl -u mim-backend -f

# If using PM2
pm2 logs mim-backend

# If using Docker
docker-compose logs -f backend
```

### Check MongoDB:
```bash
mongosh
use mim_website
db.contacts.countDocuments()
db.blog_posts.countDocuments()
```

### Backup Database:
```bash
mongodump --db mim_website --out /backup/$(date +%Y%m%d)
```

## 🎨 Customization

### Update Services:
Edit `backend/server.py` - `MIMProfileScraper.extract_services()` method

### Update Client Logos:
Edit `backend/server.py` - `MIMProfileScraper.extract_clients()` method

### Update Colors:
Edit `frontend/src/App.css` - CSS variables at the top

### Update Logo:
Replace logo URL in `frontend/src/components/Navigation.js` and `Footer.js`

## 📧 Email Integration (Optional)

To enable email notifications:

1. **Install SendGrid:**
   ```bash
   pip install sendgrid
   ```

2. **Add to .env:**
   ```
   SENDGRID_API_KEY=your-api-key
   SENDER_EMAIL=noreply@yourdomain.com
   ```

3. **Update contact endpoint** in `server.py` to send emails

## 🌐 CDN & Performance (Optional)

For better performance:
- Use Cloudflare for CDN and DDoS protection
- Enable Nginx gzip compression
- Use Redis for caching (optional)
- Optimize images (already optimized in current version)

## ✅ Deployment Complete!

Your My Inbox Media® website should now be live at your domain!

**Next Steps:**
1. Test all pages thoroughly
2. Login to admin panel and start adding content
3. Set up monitoring and backups
4. Configure email notifications
5. Update DNS records if needed

---

**Need Help?** Contact your system administrator or hosting provider for server-specific assistance.
