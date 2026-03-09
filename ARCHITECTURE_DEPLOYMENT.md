# Architecture & Deployment Guide

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                  (React Frontend on port 5173)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP/HTTPS Requests
                    (with JWT token in header)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXPRESS SERVER (port 5000)                   │
│                                                                  │
│  ┌────────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  CORS Middleware │  │ JSON Parser  │  │ Static Files    │    │
│  └────────────────┘  └──────────────┘  └──────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    ROUTES LAYER                            │ │
│  │  ┌──────────────┐ ┌────────────┐ ┌────────────────────┐   │ │
│  │  │ /auth/*      │ │ /team/*    │ │ /project/*         │   │ │
│  │  │ /admin/*     │ └────────────┘ └────────────────────┘   │ │
│  │  └──────────────┘                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              MIDDLEWARE LAYER                              │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │ │
│  │  │ JWT Auth     │ │ Admin Check  │ │ File Upload      │   │ │
│  │  └──────────────┘ └──────────────┘ └──────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │             CONTROLLERS LAYER                              │ │
│  │  ┌──────────────┐ ┌────────────┐ ┌────────────────────┐   │ │
│  │  │ authControl  │ │ teamControl│ │ projectControl     │   │ │
│  │  │ adminControl │ └────────────┘ └────────────────────┘   │ │
│  │  └──────────────┘                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                       │
└─────────────────────────────┼───────────────────────────────────┘
                             │
                ┌────────────┼────────────┬──────────────┐
                │            │            │              │
                ▼            ▼            ▼              ▼
        ┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  MongoDB    │ │ Nodemailer│ │ Multer   │ │ File     │
        │  Database   │ │ (Gmail)   │ │ Upload   │ │ System   │
        └─────────────┘ └──────────┘ └──────────┘ └──────────┘
            Users,           Email           PDF          Stored
            Teams,         Send              Upload        Files
            Subs         Notifications      Handling
```

### Data Flow Diagram

```
REGISTRATION
     │
     ├─ Validate input
     ├─ Check email doesn't exist
     ├─ Hash password with bcrypt
     ├─ Save to MongoDB
     ├─ Generate JWT token
     └─ Return token + user info

TEAM CREATION
     │
     ├─ Verify user not in team
     ├─ Generate unique invite code
     ├─ Create Team document
     ├─ Add user as leader
     ├─ Update User.teamId
     ├─ Send confirmation email
     └─ Return team + invite code

TEAM JOIN
     │
     ├─ Verify invite code exists
     ├─ Check team not full (< 4)
     ├─ Verify user not in another team
     ├─ Add user to members array
     ├─ Update User.teamId
     ├─ Send confirmation email
     └─ Return success

PROJECT SUBMISSION
     │
     ├─ Verify user is team leader
     ├─ Check team size (2-4 members)
     ├─ Validate PDF file
     ├─ Save file to disk
     ├─ Create Submission record
     ├─ Update User.applicationStatus
     └─ Return submission ID

ADMIN OPERATIONS
     │
     ├─ Verify user is admin
     ├─ Query MongoDB collections
     └─ Return aggregated data
```

---

## 🗄️ Database Schema Relationships

```
User Schema
├── teamId → Team._id (optional)
├── role (user/admin)
└── password (bcrypt hashed)

Team Schema
├── leaderId → User._id
├── members → [User._id] (array)
├── inviteCode (unique)
└── maxSize (default 4)

Submission Schema
├── teamId → Team._id
├── submittedBy → User._id
├── filePath
└── submittedAt

Relationships:
- One User ← Many Teams (leader)
- One Team → Many Users (members)
- One Team → One Submission
- One User → One or Zero Team
```

---

## 🔄 Request/Response Flow Example

### RegisterUser Request Flow

```javascript
CLIENT (React)
   │
   ├─ User fills form
   ├─ Validates locally
   └─ POST /api/auth/register
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        ...
      }
           │
           ▼
SERVER (Express)
   │
   ├─ CORS middleware checks origin
   └─ Route: POST /api/auth
      │
      ├─ Validation middleware runs
      │  ├─ Check required fields
      │  ├─ Check email format
      │  └─ Check password length
      │
      ├─ authController.register()
      │  ├─ Check email doesn't exist
      │  ├─ Hash password
      │  │  bcrypt.hash(plaintext, 10 rounds)
      │  ├─ Create User object
      │  ├─ Save to MongoDB
      │  │  db.users.insertOne({...})
      │  ├─ Generate JWT token
      │  │  jwt.sign({id: user._id}, secret)
      │  └─ Return response
      │
      └─ Send JSON response
         {
           token: "eyJh...",
           user: {
             id: "507f...",
             name: "John Doe",
             email: "john@example.com"
           }
         }
           │
           ▼
CLIENT (React)
   │
   ├─ Receive response
   ├─ Store token in localStorage
   ├─ Store user in React state/Redux
   └─ Redirect to dashboard
```

---

## 📦 Deployment Guide

### Local Deployment (Development)

#### Prerequisites
- Node.js 14+
- MongoDB running locally
- Gmail account with app password

#### Steps

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with local config
npm run dev
```

2. **Frontend Setup**
```bash
cd ..
npm install
npm run dev
```

3. **Test Health**
```bash
curl http://localhost:5000/api/health
```

---

### Production Deployment

#### Prerequisites for Production
- Hosting: Heroku, AWS, DigitalOcean, or similar
- Database: MongoDB Atlas (cloud)
- Email: Gmail app password
- Domain: Custom domain with SSL

#### Step-by-Step Deployment (Heroku Example)

1. **Create Heroku App**
```bash
heroku create hackathon-platform
```

2. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hackathon
heroku config:set JWT_SECRET=your_strong_random_secret
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set FRONTEND_URL=https://yourdomain.com
heroku config:set NODE_ENV=production
```

3. **Create Procfile**
```
web: node backend/server.js
```

4. **Deploy**
```bash
git push heroku main
```

5. **Verify**
```bash
heroku logs --tail
heroku open
```

---

### AWS Deployment (EC2)

#### Server Setup
1. Launch EC2 instance (Ubuntu 20.04)
2. Install Node.js and npm
3. Install MongoDB Atlas account

#### Application Setup
```bash
# SSH into server
ssh -i key.pem ubuntu@your-instance.amazonaws.com

# Clone repository
git clone your-repo-url
cd backend

# Install dependencies
npm install

# Configure .env
nano .env
# Add MongoDB Atlas URI and other secrets

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "hackathon"
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
# Add upstream node { server 127.0.0.1:5000; }
# Add proxy_pass http://node;

sudo systemctl restart nginx
```

---

### Docker Deployment

#### Create Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY backend/ ./

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "server.js"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/hackathon
      JWT_SECRET: your_secret
    depends_on:
      - mongo
  
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### Deploy
```bash
docker-compose up -d
```

---

## 🔒 Security Checklist for Production

### Application Security
- [ ] Change JWT_SECRET to 32+ character random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL certificates
- [ ] Update FRONTEND_URL to production domain
- [ ] Disable debug logging in production
- [ ] Add rate limiting middleware
- [ ] Implement CSRF protection
- [ ] Add request size limits
- [ ] Sanitize user inputs
- [ ] Add request/response logging

### Database Security
- [ ] Use MongoDB Atlas (not local)
- [ ] Enable IP whitelisting
- [ ] Use strong MongoDB credentials
- [ ] Enable MongoDB authentication
- [ ] Regular database backups
- [ ] Use encrypted connections
- [ ] Monitor database access

### Email Security
- [ ] Use app-specific password (not Gmail password)
- [ ] Enable 2-factor authentication
- [ ] Monitor email sending logs
- [ ] Implement email rate limiting
- [ ] Add email verification for registration

### File Security
- [ ] Restrict upload file types strictly
- [ ] Limit file upload size (10MB)
- [ ] Store files outside webroot
- [ ] Implement file scanning for malware
- [ ] Regular cleanup of old files
- [ ] Restrict download access to admins

### Infrastructure Security
- [ ] Use HTTPS everywhere (SSL certificate)
- [ ] Enable CORS selectively
- [ ] Use firewall rules
- [ ] Enable DDoS protection
- [ ] Monitor server resources
- [ ] Set up alerts for suspicious activity
- [ ] Regular security patching
- [ ] Use strong server passwords

### API Security
- [ ] Implement API rate limiting
- [ ] Add request validation on all endpoints
- [ ] Use helmet.js for security headers
- [ ] Implement API versioning
- [ ] Add API authentication tokens
- [ ] Log all API requests
- [ ] Monitor for suspicious patterns

---

## 📊 Performance Optimization

### Database Optimization
```javascript
// Add indexes for frequently queried fields
db.users.createIndex({ email: 1 })
db.teams.createIndex({ inviteCode: 1 })
db.submissions.createIndex({ teamId: 1 })
db.users.createIndex({ teamId: 1 })
```

### Backend Optimization
```javascript
// Add caching for team data
const cache = new Map();

// Implement pagination for admin endpoints
const limit = 10;
const skip = (page - 1) * limit;
const users = User.find().skip(skip).limit(limit);

// Gzip compression
const compression = require('compression');
app.use(compression());

// Add database query timeouts
mongoose.set('timeoutMS', 5000);
```

### Frontend Optimization
```javascript
// Implement lazy loading for team lists
// Use React.memo() for component optimization
// Implement virtual scrolling for large lists
// Add service worker for offline capability
```

---

## 📈 Monitoring & Logging

### Setup Logging
```javascript
// Use Winston for logging
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});
```

### Setup Error Tracking (Sentry)
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### Monitor Server Health
- CPU usage
- Memory usage
- Database connections
- API response times
- Error rates
- File upload success rates

---

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
        working-directory: ./backend
      - run: npm test
        working-directory: ./backend
      - name: Deploy to Heroku
        run: git push https://heroku.com/hackathon-platform.git main
```

---

## 📋 Pre-Production Checklist

- [ ] All environment variables set
- [ ] Database backups configured
- [ ] Email sending tested
- [ ] File uploads working
- [ ] All test cases passing
- [ ] Security headers configured
- [ ] CORS settings correct
- [ ] Rate limiting enabled
- [ ] Error handling tested
- [ ] Performance tested under load
- [ ] SSL certificate installed
- [ ] Monitoring setup
- [ ] Logging configured
- [ ] Backup and recovery tested
- [ ] Documentation updated
- [ ] Team trained on deployment

---

## 🆘 Troubleshooting Production Issues

| Issue | Solution |
|-------|----------|
| High memory usage | Implement result pagination, add caching |
| Slow API responses | Add database indexes, optimize queries |
| File upload failures | Check disk space, verify permissions |
| Email not sending | Verify SMTP credentials, check logs |
| Database connection drops | Increase connection pool size |
| Token expiration issues | Verify JWT_SECRET consistency |
| CORS errors | Check FRONTEND_URL in production |

---

## 📞 Monitoring & Support

### Key Metrics to Monitor
- Response time (target < 200ms)
- Error rate (target < 1%)
- Uptime (target > 99.9%)
- Database performance
- File upload success rate
- Email delivery rate
- User growth
- File storage usage

### Set Up Alerts For
- Server down
- High error rate
- High response time
- Database connection issues
- Disk space low
- Memory usage > 80%
- Unusual traffic patterns

---

## 📚 Additional Resources

- [Node.js Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Atlas Security](https://docs.mongodb.com/atlas/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [OWASP Security Guidelines](https://owasp.org/)

---

## 🎯 Next Steps

1. ✅ Complete local deployment
2. ✅ Test all endpoints locally
3. ✅ Integrate frontend
4. ⏭️ Setup production environment
5. ⏭️ Configure CI/CD pipeline
6. ⏭️ Deploy to production
7. ⏭️ Monitor and optimize
8. ⏭️ Scale as needed

---

**Your hackathon platform is now ready for production!** 🚀
