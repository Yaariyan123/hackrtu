# Hackathon Platform Backend

Complete Node.js + Express backend for a full-stack hackathon platform with MongoDB, JWT authentication, team management, and project submissions.

## Features

✅ **User Authentication**
- User registration with validation
- JWT-based login
- Password hashing with bcrypt

✅ **Team System**
- Create teams with unique invite codes
- Join teams with invite codes
- Team size validation (2-4 members)
- Team leader functionality

✅ **Project Submission**
- PDF file uploads with Multer
- Team validation before submission
- Only team leader can submit

✅ **Email Notifications**
- Automated emails for team creation/joining
- Nodemailer integration

✅ **Admin Panel**
- View all users
- View all teams and members
- View project submissions
- Download submitted files

✅ **Security**
- JWT middleware for protected routes
- Admin authorization middleware
- Password hashing with bcrypt
- Input validation

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **File Upload:** Multer
- **Email:** Nodemailer
- **Validation:** express-validator
- **Environment:** dotenv, CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/hackathon
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackathon

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Email Configuration (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Node Environment
NODE_ENV=development
```

#### Email Setup (Gmail)

1. Enable 2-Step Verification in your Google Account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password as `EMAIL_PASSWORD`

### 3. Start MongoDB

If using local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas (cloud):
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Run Backend Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection setup
├── models/
│   ├── User.js              # User schema
│   ├── Team.js              # Team schema
│   └── Submission.js        # Project submission schema
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   ├── teamController.js    # Team logic (create, join)
│   ├── projectController.js # Project submission logic
│   └── adminController.js   # Admin panel logic
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── teamRoutes.js        # Team endpoints
│   ├── projectRoutes.js     # Project endpoints
│   └── adminRoutes.js       # Admin endpoints
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── admin.js             # Admin authorization
│   └── upload.js            # File upload configuration
├── utils/
│   ├── email.js             # Email sending
│   ├── tokenGenerator.js    # JWT token generation
│   └── codeGenerator.js     # Invite code generation
├── uploads/
│   └── projects/            # Uploaded project PDFs
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (Protected) |

### Team Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/team/create` | Create new team (Protected) |
| POST | `/api/team/join` | Join team with invite code (Protected) |
| GET | `/api/team/:teamId` | Get team details (Protected) |
| GET | `/api/team/user/:userId` | Get user's team (Protected) |

### Project Submission

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/project/submit` | Submit project PDF (Protected) |
| GET | `/api/project/status/:teamId` | Get submission status (Protected) |

### Admin Panel

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users (Admin) |
| GET | `/api/admin/teams` | Get all teams (Admin) |
| GET | `/api/admin/teams/:teamId` | Get team members (Admin) |
| GET | `/api/admin/submissions` | Get all submissions (Admin) |
| GET | `/api/admin/download/:submissionId` | Download project file (Admin) |

## API Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "gender": "Male",
  "college": "MIT",
  "course": "Computer Science",
  "graduationYear": 2025,
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "college": "MIT",
    "teamId": null
  }
}
```

### Login User

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "college": "MIT",
    "teamId": "507f1f77bcf86cd799439012"
  }
}
```

### Create Team

**Request:**
```json
POST /api/team/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "teamName": "Code Warriors"
}
```

**Response:**
```json
{
  "message": "Your team has been created. You can invite friends using the invite code.",
  "team": {
    "id": "507f1f77bcf86cd799439012",
    "teamName": "Code Warriors",
    "inviteCode": "ABC123",
    "members": ["507f1f77bcf86cd799439011"],
    "leaderId": "507f1f77bcf86cd799439011"
  }
}
```

### Join Team

**Request:**
```json
POST /api/team/join
Authorization: Bearer <token>
Content-Type: application/json

{
  "inviteCode": "ABC123"
}
```

**Response:**
```json
{
  "message": "You have successfully joined the team",
  "team": {
    "id": "507f1f77bcf86cd799439012",
    "teamName": "Code Warriors",
    "inviteCode": "ABC123",
    "members": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439013"],
    "leaderId": "507f1f77bcf86cd799439011"
  }
}
```

### Submit Project

**Request:**
```
POST /api/project/submit
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- projectFile: [PDF file]
```

**Response:**
```json
{
  "message": "Project submitted successfully",
  "submission": {
    "id": "507f1f77bcf86cd799439014",
    "teamId": "507f1f77bcf86cd799439012",
    "fileName": "1699564800000_project.pdf",
    "submittedAt": "2023-11-09T12:00:00.000Z"
  }
}
```

## Validation Rules

### User Registration
- Name: Required, non-empty
- Email: Required, valid email format, unique in database
- Mobile: Required, non-empty
- Gender: Required, one of (Male, Female, Other)
- College: Required, non-empty
- Course: Required, non-empty
- Graduation Year: Required, valid year
- Password: Required, minimum 6 characters

### Team Creation
- Team Name: Required, non-empty
- User: Cannot be in another team already

### Team Join
- Invite Code: Required, must exist
- Team: Must not be full (max 4 members)
- User: Cannot be in another team already

### Project Submission
- File: Must be PDF format
- File Size: Maximum 10MB
- Team: Must have 2-4 members
- User: Must be team leader
- Submission: Team should not have submitted already

## Security Notes

1. **JWT Secret:** Change `JWT_SECRET` in production to a strong random string
2. **CORS:** Update `FRONTEND_URL` to your production frontend URL
3. **Email Password:** Never commit `.env` file with real credentials
4. **File Uploads:** PDFs are stored in `uploads/projects/` - ensure proper access controls
5. **Password Hashing:** All passwords are hashed with bcrypt before storage
6. **Admin Routes:** Require both JWT authentication and admin role

## Troubleshooting

### MongoDB Connection Fails
- Ensure MongoDB is running locally or Atlas cluster is active
- Check `MONGODB_URI` format
- Verify network access if using Atlas

### Email Not Sending
- Enable "Less secure app access" for Gmail or use App Passwords
- Check `EMAIL_USER` and `EMAIL_PASSWORD`
- Verify email service configuration in `.env`

### File Upload Fails
- Ensure `uploads/projects/` directory exists and is writable
- Check file size (max 10MB)
- Verify file is in PDF format

### JWT Token Errors
- Ensure token is sent in `Authorization: Bearer <token>` header format
- Check token expiration (default 30 days)
- Verify `JWT_SECRET` matches between server.js and token generation

## Frontend Integration

### Store JWT Token
After login/register, store the token in localStorage:
```javascript
localStorage.setItem('token', response.token);
```

### Send Token in Requests
Include token in all protected endpoints:
```javascript
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Example Frontend API Call
```javascript
const register = async (formData) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};
```

## Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  mobile: String,
  gender: String,
  college: String,
  course: String,
  graduationYear: Number,
  password: String (hashed),
  teamId: ObjectId (optional),
  role: String (user/admin),
  createdAt: Date
}
```

### Team Schema
```javascript
{
  teamName: String,
  leaderId: ObjectId,
  members: [ObjectId],
  inviteCode: String (unique),
  maxSize: Number (default: 4),
  college: String,
  createdAt: Date
}
```

### Submission Schema
```javascript
{
  teamId: ObjectId,
  filePath: String,
  fileName: String,
  submittedAt: Date,
  submittedBy: ObjectId
}
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/hackathon |
| JWT_SECRET | Secret key for JWT signing | your_secret_key |
| PORT | Server port | 5000 |
| EMAIL_SERVICE | Email service provider | gmail |
| EMAIL_USER | Email account | user@gmail.com |
| EMAIL_PASSWORD | Email password/app password | app_password |
| FRONTEND_URL | Frontend application URL | http://localhost:5173 |
| NODE_ENV | Environment | development |

## Performance Tips

1. **Database Indexes:** Create indexes on frequently queried fields (email, inviteCode)
2. **Pagination:** Implement pagination for large data sets in admin endpoints
3. **Caching:** Cache frequently accessed data like team info
4. **Rate Limiting:** Add rate limiting middleware for production
5. **File Cleanup:** Implement cleanup for old uploaded files

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
