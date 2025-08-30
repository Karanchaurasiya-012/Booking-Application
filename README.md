# Mini Booking Application

## Tech Stack
- Frontend: React + TailwindCSS
- Backend: Node.js + Express
- Database: JSON file (can be swapped for MongoDB/Postgres)
- Auth: JWT

## Features
- Signup/Login
- View available slots
- Book slots (protected with JWT)
- Responsive UI
- API documentation (Postman)

## Setup Instructions
1. Clone repo
2. Run backend:
   ```bash
   cd backend
   npm install
   npm run dev
3. Run frontend:
   ```bash
   cd frontend
   npm install
   npm start

## Challenges
1. Handling JWT + localStorage sync
2. Making booking state update instantly after API call
3. Deploying backend on Render (cold start issues)
4. Solved by-> keeping APIs lightweight, using Axios interceptors, and refreshing slots after booking.
