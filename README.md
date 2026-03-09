# 🎯 Disrupt Dev Hackathon 2077 - Full Stack Platform

**Complete full-stack hackathon management platform** with React frontend and Node.js/Express/MongoDB backend.

Modern, futuristic UI with dark gray + golden yellow glassmorphism theme.

---

## 📑 Documentation Index

### 🚀 START HERE
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** - Full system overview

### 💻 Backend Setup & Integration
- **[backend/README.md](backend/README.md)** - Complete backend documentation
- **[FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)** - How to integrate React with backend
- **[API_TESTING.md](API_TESTING.md)** - Test APIs with curl/Postman

### 🏗️ Architecture & Deployment
- **[ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md)** - System architecture and production deployment
- **[DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md)** - UI/UX design specifications

---

## 🚀 Quick Start

### Frontend
```bash
npm install
npm run dev
```
✅ Visit `http://localhost:5173`

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB URI, JWT secret, email, etc.
npm run dev
```
✅ Backend running on `http://localhost:5000`

---

## 📁 Project Structure

```
hack2026/
├── backend/                    ← NEW: Complete Node.js backend
│   ├── config/, models/, controllers/
│   ├── routes/, middleware/, utils/
│   ├── server.js, package.json
│   ├── setup.sh / setup.bat
│   └── .env.example
│
├── src/                        ← React frontend
│   ├── components/, pages/
│   ├── App.jsx, main.jsx
│   └── styles/
│
├── QUICKSTART.md              ← START HERE
├── COMPLETE_GUIDE.md          (Overview)
├── FRONTEND_INTEGRATION.md    (React setup)
├── API_TESTING.md             (Examples)
└── ARCHITECTURE_DEPLOYMENT.md (Production)
```

---

## 🔗 Features

### ✅ User Authentication
- Secure registration with validation
- JWT token-based login
- Password hashing with bcryptjs
- Profile with college/course info

### ✅ Team Management
- Create teams with 6-digit invite codes
- Join teams with invite codes
- Team size validation (2-4 members)
- Team leader designation
- Email notifications

### ✅ Project Submission
- PDF file uploads (max 10MB)
- Team member validation
- Only team leader can submit
- File storage and admin download

### ✅ Admin Panel
- View all users and teams
- Download project submissions
- User and team statistics

### ✅ Security
- JWT authentication
- Password hashing
- Input validation
- File type validation
- Admin authorization

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + bcryptjs |
| **File Upload** | Multer |
| **Email** | Nodemailer |

---

## 📊 API Endpoints (14 total)

### Authentication
```
POST   /api/auth/register          Register user
POST   /api/auth/login             Login
GET    /api/auth/me                Get current user
```

### Teams
```
POST   /api/team/create            Create team
POST   /api/team/join              Join with code
GET    /api/team/:teamId           Get details
GET    /api/team/user/:userId      Get user's team
```

### Projects
```
POST   /api/project/submit         Submit PDF
GET    /api/project/status/:teamId Get submission status
```

### Admin
```
GET    /api/admin/users            View users
GET    /api/admin/teams            View teams
GET    /api/admin/teams/:teamId    View members
GET    /api/admin/submissions      View submissions
GET    /api/admin/download/:id     Download file
```

---

## ⚙️ Configuration

### Frontend - Update Hero Component
```javascript
// src/components/Hero/Hero.jsx
const DEVFOLIO_URL = 'https://your-hackathon.devfolio.co'
```

### Backend - Create .env
```
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your_random_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

---

## 📝 Database Models

### Users
```
name, email, mobile, gender, college, course
graduationYear, password (hashed)
teamId, role (user/admin), createdAt
```

### Teams
```
teamName, leaderId, members [], inviteCode
maxSize (default 4), college, createdAt
```

### Submissions
```
teamId, filePath, fileName
submittedAt, submittedBy
```

---

## 🧪 Test the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "gender": "Male",
    "college": "MIT",
    "course": "Computer Science",
    "graduationYear": 2025,
    "password": "password123"
  }'
```

See [API_TESTING.md](API_TESTING.md) for complete curl examples.

---

## 📖 Next Steps

### 1. Start Backend (5 minutes)
```bash
cd backend && npm install && npm run dev
```

### 2. Run Frontend
```bash
npm install && npm run dev
```

### 3. Integrate Frontend
See [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)

### 4. Test APIs
See [API_TESTING.md](API_TESTING.md)

### 5. Deploy
See [ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md)

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check Node.js installed, MongoDB running |
| CORS error | Verify FRONTEND_URL in .env |
| Email not sending | Use app password, enable 2FA |
| Database error | Ensure MongoDB running or Atlas connection valid |

See detailed help in [backend/README.md#troubleshooting](backend/README.md#troubleshooting)

---

## 📚 Complete Documentation

- [QUICKSTART.md](QUICKSTART.md) - Get running in 5 minutes
- [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) - System overview
- [backend/README.md](backend/README.md) - Backend documentation
- [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) - React integration
- [API_TESTING.md](API_TESTING.md) - API examples
- [ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md) - Deployment guide
- [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md) - UI/UX specs

---

## 📊 What's Included

### Backend (20+ files)
- ✅ Complete user authentication system
- ✅ Team management with invite codes
- ✅ Project submission with file uploads
- ✅ Email notifications
- ✅ Admin dashboard
- ✅ Security middleware
- ✅ Input validation
- ✅ Error handling

### Frontend
- ✅ React components
- ✅ Dark gray + golden glassmorphism theme
- ✅ Responsive design
- ✅ Integration ready

### Documentation
- ✅ 6 comprehensive guides
- ✅ Complete API documentation
- ✅ Setup and deployment instructions
- ✅ Troubleshooting guides
- ✅ Code examples

---

## ✅ Status

- [x] Backend complete
- [x] Frontend structure ready
- [x] Documentation complete
- [x] Setup automation included
- [ ] Frontend-backend integration (See FRONTEND_INTEGRATION.md)
- [ ] Testing (See API_TESTING.md)
- [ ] Production deployment (See ARCHITECTURE_DEPLOYMENT.md)

---

## 🎯 Start Here

👉 Open [QUICKSTART.md](QUICKSTART.md) to get started in 5 minutes!

---

**Built with ❤️ for Disrupt Dev Hackathon 2077**
