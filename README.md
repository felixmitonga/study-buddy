Project Title

# Study Buddy - Collaborative Learning Platform

DESCRIPTION

A web app that helps students find study partners based on shared courses and availability.
FEATURES

- User authentication (JWT)
- Profile management
- Study buddy matching
- Real-time messaging
  TECHNOLOGIES

- **Frontend**: React, Material-UI
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Deployment**: (Optional) Render/Vercel

SETUP INSTRUCTIONS

1. **Clone the repository**:
   ```bash
   git clone https://github.com/felixmitonga/study-buddy.git
   ```
2. BACKEND SETUP:

bash
cd server
npm install
cp .env.example .env # Update with your MongoDB URI
npm start

3. FRONTEND SETUP:

bash
cd ../client
npm install
npm start 4. ACCESS THE APP: Open http://localhost:3000.

### **Environment Variables**

List required variables (e.g., `MONGODB_URI`, `JWT_SECRET`). Provide an example `.env` file:

```markdown
# server/.env

MONGODB_URI=mongodb://localhost:27017/studybuddies
JWT_SECRET=your_secret_key
PORT=5000
Screenshots (Optional)
```
