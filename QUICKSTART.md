# Quick Start Guide

Get your hackathon platform running in 5 minutes!

## Prerequisites
- Node.js 14+ installed
- MongoDB running locally or MongoDB Atlas connection string
- Gmail account with app password (for email)

## 1. Backend Setup (5 minutes)

### Clone and Setup
```bash
cd backend
npm install
```

### Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and update:
```
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your_random_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
FRONTEND_URL=http://localhost:5173
```

### Start Backend
```bash
npm run dev
```

✅ Backend running on http://localhost:5000

## 2. Frontend Setup (if needed)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

## 3. Test the API

### Register a User
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

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## End-to-End Workflow

### User 1: Create Team
1. Register with email
2. Receive JWT token
3. Create team with name
4. Get invite code (e.g., "ABC123")

### User 2: Join Team
1. Register with email
2. Receive JWT token
3. Use User 1's invite code to join team
4. Both users now in same team

### Team Leader: Submit Project
1. Upload PDF file
2. File stored in `backend/uploads/projects/`
3. Submission recorded in database
4. Status changes to "Application Submitted"

### Admin: View Submissions
1. Login as admin (must have role='admin' in database)
2. Access admin endpoints
3. Download project files
4. View all teams and users

## File Structure

```
hack2026/
├── backend/                    # Node.js server
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   │   └── projects/          # ProjectPDF storage
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── src/                        # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/              # API services
│   ├── utils/
│   └── App.jsx
└── FRONTEND_INTEGRATION.md     # Integration guide
```

## Key Endpoints Quick Reference

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register | POST | `/api/auth/register` |
| Login | POST | `/api/auth/login` |
| Create Team | POST | `/api/team/create` |
| Join Team | POST | `/api/team/join` |
| Submit Project | POST | `/api/project/submit` |
| Get Status | GET | `/api/project/status/:teamId` |
| Admin Users | GET | `/api/admin/users` |
| Admin Teams | GET | `/api/admin/teams` |

## Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "MongoDB connection failed"
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas with proper connection string
- Check `MONGODB_URI` in `.env`

### "Email not sending"
- Use App Password (16 characters) not regular password
- Enable 2-Step Verification on Gmail
- Check `EMAIL_USER` and `EMAIL_PASSWORD`

### "CORS Error"
- Ensure `FRONTEND_URL` in `.env` is correct
- Frontend should be running on `http://localhost:5173`
- Check backend is running on port 5000

### "File upload fails"
- File must be PDF format
- File size must be < 10MB
- Must be team leader to submit
- Team must have 2-4 members

## Database Setup (Optional)

### Create Admin User
```bash
# Connect to MongoDB
mongosh

# Use hackathon database
use hackathon

# Create admin user (replace details)
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Development Tools

### Postman Collection
Import API requests in Postman:
1. Click Import
2. Select raw text
3. Paste endpoint URLs

### MongoDB Compass
Visualize your database: https://www.mongodb.com/products/compass

## Next Steps

1. ✅ Backend API complete
2. ✅ Database models ready
3. ✅ File upload working
4. 📝 Frontend components (see FRONTEND_INTEGRATION.md)
5. 🎨 UI styling and forms
6. 🔐 Security hardening for production
7. 📦 Deploy to production

## Production Checklist

Before deploying:
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Use MongoDB Atlas instead of localhost
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set `NODE_ENV=production`
- [ ] Use strong email password
- [ ] Review CORS settings
- [ ] Add request validation
- [ ] Set up monitoring and logging

## Support

For detailed documentation, see:
- Backend: [backend/README.md](backend/README.md)
- Frontend Integration: [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
- API Docs: Check individual controller files

## Need Help?

1. Check error messages carefully
2. Review logs in terminal
3. Verify MongoDB connection
4. Check environment variables
5. Test with curl before integrating frontend

Happy coding! 🚀
