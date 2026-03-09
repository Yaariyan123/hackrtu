# API Testing Guide

Test all hackathon platform APIs using curl commands or Postman.

## Prerequisites

Backend must be running on `http://localhost:5000`

```bash
cd backend
npm run dev
```

## Test Data

Use these values for testing:

```
User 1:
  Email: john@example.com
  Password: password123
  
User 2:
  Email: jane@example.com
  Password: password123
```

## 1. User Registration

### User 1 - Create Account

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

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65412abc123def456ghi789j",
    "name": "John Doe",
    "email": "john@example.com",
    "college": "MIT",
    "teamId": null
  }
}
```

**Save token:** `TOKEN1=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### User 2 - Create Account

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "mobile": "9876543211",
    "gender": "Female",
    "college": "Stanford",
    "course": "Data Science",
    "graduationYear": 2024,
    "password": "password123"
  }'
```

**Save token:** `TOKEN2=<jwt_token_from_response>`

## 2. User Login

### Login User 1

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User 2

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

## 3. Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN1"
```

## 4. Team Management

### Create Team (User 1 as Leader)

```bash
curl -X POST http://localhost:5000/api/team/create \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "Code Warriors"
  }'
```

**Response:**
```json
{
  "message": "Your team has been created. You can invite friends using the invite code.",
  "team": {
    "id": "65412abc123def456ghi789k",
    "teamName": "Code Warriors",
    "inviteCode": "ABC123",
    "members": ["65412abc123def456ghi789j"],
    "leaderId": "65412abc123def456ghi789j"
  }
}
```

**Save invite code:** `INVITE_CODE=ABC123`

### Get Team Details

```bash
curl -X GET http://localhost:5000/api/team/65412abc123def456ghi789k \
  -H "Authorization: Bearer $TOKEN1"
```

### Join Team (User 2)

```bash
curl -X POST http://localhost:5000/api/team/join \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json" \
  -d '{
    "inviteCode": "ABC123"
  }'
```

**Response:**
```json
{
  "message": "You have successfully joined the team",
  "team": {
    "id": "65412abc123def456ghi789k",
    "teamName": "Code Warriors",
    "inviteCode": "ABC123",
    "members": ["65412abc123def456ghi789j", "65412abc123def456ghi789l"],
    "leaderId": "65412abc123def456ghi789j"
  }
}
```

### Get User's Team

```bash
curl -X GET http://localhost:5000/api/team/user/65412abc123def456ghi789j \
  -H "Authorization: Bearer $TOKEN1"
```

## 5. Project Submission

### Check Submission Status

```bash
curl -X GET http://localhost:5000/api/project/status/65412abc123def456ghi789k \
  -H "Authorization: Bearer $TOKEN1"
```

**Response (Before Submission):**
```json
{
  "applicationStatus": "Application Pending",
  "hasSubmitted": false
}
```

### Submit Project (Team Leader Only)

First, create a test PDF file or use an existing one.

```bash
curl -X POST http://localhost:5000/api/project/submit \
  -H "Authorization: Bearer $TOKEN1" \
  -F "projectFile=@path/to/project.pdf"
```

**Response:**
```json
{
  "message": "Project submitted successfully",
  "submission": {
    "id": "65412abc123def456ghi789m",
    "teamId": "65412abc123def456ghi789k",
    "fileName": "1699564800000_project.pdf",
    "submittedAt": "2023-11-09T12:00:00.000Z"
  }
}
```

### Check Status Again (After Submission)

```bash
curl -X GET http://localhost:5000/api/project/status/65412abc123def456ghi789k \
  -H "Authorization: Bearer $TOKEN1"
```

**Response (After Submission):**
```json
{
  "applicationStatus": "Application Submitted",
  "hasSubmitted": true,
  "submission": {
    "id": "65412abc123def456ghi789m",
    "submittedAt": "2023-11-09T12:00:00.000Z"
  }
}
```

## 6. Admin Panel

### Note: First Make User an Admin

In MongoDB:
```javascript
// Connect to MongoDB
mongosh
use hackathon
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)
```

### Get All Users

```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer $TOKEN1"
```

### Get All Teams

```bash
curl -X GET http://localhost:5000/api/admin/teams \
  -H "Authorization: Bearer $TOKEN1"
```

### Get Specific Team Members

```bash
curl -X GET http://localhost:5000/api/admin/teams/65412abc123def456ghi789k \
  -H "Authorization: Bearer $TOKEN1"
```

### Get All Submissions

```bash
curl -X GET http://localhost:5000/api/admin/submissions \
  -H "Authorization: Bearer $TOKEN1"
```

### Download Project File

```bash
curl -X GET http://localhost:5000/api/admin/download/65412abc123def456ghi789m \
  -H "Authorization: Bearer $TOKEN1" \
  -o downloaded_project.pdf
```

## Error Test Cases

### Test Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User"
  }'
```

**Expected:** 400 Error - Validation error

### Test Invalid Email

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email"
  }'
```

**Expected:** 400 Error - Invalid email format

### Test Duplicate Email

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another John",
    "email": "john@example.com",
    "mobile": "1234567890",
    "gender": "Male",
    "college": "MIT",
    "course": "CS",
    "graduationYear": 2025,
    "password": "password123"
  }'
```

**Expected:** 400 Error - Email already exists

### Test Invalid Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

**Expected:** 400 Error - Invalid email or password

### Test Team Full

Create 2 more users, add them to team, then have a 5th user try to join:

```bash
curl -X POST http://localhost:5000/api/team/join \
  -H "Authorization: Bearer $TOKEN5" \
  -H "Content-Type: application/json" \
  -d '{
    "inviteCode": "ABC123"
  }'
```

**Expected:** 400 Error - Team is already full

### Test Non-Leader Submit

```bash
curl -X POST http://localhost:5000/api/project/submit \
  -H "Authorization: Bearer $TOKEN2" \
  -F "projectFile=@project.pdf"
```

**Expected:** 403 Error - Only team leader can submit project

## Testing Workflow Summary

1. ✅ Register 2 users
2. ✅ Login both users
3. ✅ User 1 creates team → Get invite code
4. ✅ User 2 joins team with invite code
5. ✅ Check both are in team
6. ✅ User 1 submits PDF
7. ✅ Check submission status is "Submitted"
8. ✅ Admin views all teams and submissions
9. ✅ Admin downloads project file

## Using Postman

### Import Collection

Create new collection with folders:
- Authentication
- Team Management
- Project Submission
- Admin Panel

### Set Variables

Use Postman variables:
```
{{base_url}} = http://localhost:5000
{{token}} = <JWT token from login>
{{team_id}} = <Team ID from create response>
{{invite_code}} = <Invite code from create response>
```

### Pre-request Script

Add to requests needing auth:
```javascript
pm.request.headers.add({
  key: 'Authorization',
  value: 'Bearer ' + pm.environment.get('token')
});
```

## Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "message": "Server is running"
}
```

## Common Issues During Testing

### Issue: "Token is not valid"
- Ensure token is properly copied
- Token is case-sensitive
- Don't include "Bearer" prefix twice

### Issue: "User not found"
- Check email is spelled correctly
- Case-sensitive comparison
- User must be registered first

### Issue: "Team is already full"
- Can only have 4 members
- Check current member count
- Create new team if needed

### Issue: "Only team leader can submit"
- Non-leaders cannot submit files
- Only the user who created team can submit
- Ask team leader to submit

### Issue: "File upload fails"
- File must be PDF format
- File size must be < 10MB
- Check file path is correct

## Advanced Testing

### Test Multiple Teams

Create multiple teams with different names:
```bash
curl -X POST http://localhost:5000/api/team/create \
  -H "Authorization: Bearer $TOKEN1" \
  -H "Content-Type: application/json" \
  -d '{"teamName": "Team Alpha"}'

curl -X POST http://localhost:5000/api/team/create \
  -H "Authorization: Bearer $TOKEN2" \
  -H "Content-Type: application/json" \
  -d '{"teamName": "Team Beta"}'
```

### Test Invite Code Uniqueness

Generate multiple teams and verify each has unique invite code.

### Performance Testing

Test with large team member lists using admin endpoint.

## Cleanup

Delete test data:

```bash
mongosh
use hackathon
db.users.deleteMany({ email: { $in: ["test@example.com", "user@example.com"] } })
db.teams.deleteMany({})
db.submissions.deleteMany({})
```

---

For more details on each endpoint, see [backend/README.md](backend/README.md)
