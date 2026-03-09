# ⚡ Quick Reference Card

## 🚀 Backend Setup - 3 Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env file with:
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your_random_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Start Server
```bash
npm run dev
```

✅ Running on http://localhost:5000

---

## 📚 Documentation Quick Links

| Need | File |
|------|------|
| **Get Started** | [QUICKSTART.md](QUICKSTART.md) |
| **System Overview** | [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) |
| **Backend Details** | [backend/README.md](backend/README.md) |
| **React Setup** | [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) |
| **Test APIs** | [API_TESTING.md](API_TESTING.md) |
| **Deploy** | [ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md) |
| **File List** | [DELIVERABLES.md](DELIVERABLES.md) |

---

## 🔗 All 14 API Endpoints

### Authentication
```
POST   /api/auth/register          (Public)
POST   /api/auth/login             (Public)
GET    /api/auth/me                (Protected)
```

### Teams
```
POST   /api/team/create            (Protected)
POST   /api/team/join              (Protected)
GET    /api/team/:teamId           (Protected)
GET    /api/team/user/:userId      (Protected)
```

### Projects
```
POST   /api/project/submit         (Protected)
GET    /api/project/status/:teamId (Protected)
```

### Admin
```
GET    /api/admin/users            (Protected + Admin)
GET    /api/admin/teams            (Protected + Admin)
GET    /api/admin/teams/:teamId    (Protected + Admin)
GET    /api/admin/submissions      (Protected + Admin)
GET    /api/admin/download/:id     (Protected + Admin)
```

---

## 🧪 Quick Test

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
    "course": "CS",
    "graduationYear": 2025,
    "password": "password123"
  }'
```

### Create Team
```bash
curl -X POST http://localhost:5000/api/team/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"teamName": "Team Alpha"}'
```

See [API_TESTING.md](API_TESTING.md) for 30+ more examples!

---

## 📁 Backend Structure

```
backend/
├── config/        MongoDB connection
├── models/        User, Team, Submission
├── controllers/   Business logic (4 files)
├── routes/        API endpoints (4 files)
├── middleware/    Auth, admin, upload (3 files)
├── utils/         Email, tokens, codes (3 files)
├── uploads/       PDF storage
└── server.js      Main app
```

---

## 🔐 Key Features

- ✅ User registration & login (JWT)
- ✅ Team creation with invite codes
- ✅ Join teams with unique codes
- ✅ PDF project uploads (max 10MB)
- ✅ Email confirmations
- ✅ Admin panel
- ✅ Complete security
- ✅ Input validation

---

## 💾 Environment Variables

```
MONGODB_URI          MongoDB connection string
JWT_SECRET           Random secret for JWT tokens
PORT                 Server port (default 5000)
EMAIL_SERVICE        Email provider (gmail)
EMAIL_USER           Gmail address
EMAIL_PASSWORD       Gmail app password (16 chars)
FRONTEND_URL         React frontend URL
NODE_ENV             Environment (development/production)
```

---

## 🤔 Troubleshooting

| Issue | Fix |
|-------|-----|
| MongoDB error | Start MongoDB: `mongod` |
| Port in use | Change PORT in .env |
| Email failing | Use app password, enable 2FA |
| CORS error | Check FRONTEND_URL in .env |
| Token error | Verify JWT_SECRET matches |
| File upload fails | Check file is PDF, < 10MB |

---

## 📊 Database Models

### User
```
name, email(unique), mobile, gender,
college, course, graduationYear,
password(hashed), teamId, role, createdAt
```

### Team
```
teamName, leaderId, members[],
inviteCode(unique), maxSize, college, createdAt
```

### Submission
```
teamId, filePath, fileName,
submittedAt, submittedBy
```

---

## 🛠️ Technology Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **Upload**: Multer
- **Email**: Nodemailer
- **Validation**: express-validator

---

## 🚀 Next Steps

1. ✅ Run backend → `npm run dev`
2. ✅ Test API → See [API_TESTING.md](API_TESTING.md)
3. ✅ Setup frontend → See [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
4. ✅ Deploy → See [ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md)

---

## 💡 Pro Tips

1. Keep .env file secure (never commit to git)
2. Use app password for Gmail (not Gmail password)
3. Test with curl before frontend integration
4. Check logs for debugging: `console.error(error)`
5. MongoDB Atlas recommended for production

---

## 📞 Support

| Question | Resource |
|----------|----------|
| How to start? | [QUICKSTART.md](QUICKSTART.md) |
| How do APIs work? | [backend/README.md](backend/README.md) |
| How to use in React? | [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) |
| How to test? | [API_TESTING.md](API_TESTING.md) |
| How to deploy? | [ARCHITECTURE_DEPLOYMENT.md](ARCHITECTURE_DEPLOYMENT.md) |

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies: `npm install`
- [ ] .env file created with config
- [ ] Backend started: `npm run dev`
- [ ] Health check passes: `curl http://localhost:5000/api/health`
- [ ] Frontend integration (see FRONTEND_INTEGRATION.md)

---

## 🎯 Success Indicators

✅ `npm run dev` starts without errors
✅ `curl http://localhost:5000/api/health` returns message
✅ Register endpoint accepts requests
✅ Database connects successfully
✅ Email sends confirmations
✅ File uploads store PDFs

---

## 📈 What's Included

- 20+ backend files
- 2000+ lines of code
- 14 API endpoints
- 3 database models
- 3 middleware layers
- 3 utility modules
- 8 documentation files
- 3000+ lines of docs
- 30+ curl examples
- 2 setup scripts

---

## 🎉 You're Ready!

**Your hackathon backend is complete and ready to use.**

👉 Start with: [QUICKSTART.md](QUICKSTART.md)

---

**Questions? Check the documentation files above!**

*Built with ❤️ for your hackathon success* 🚀
