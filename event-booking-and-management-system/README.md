# 2024-25_KCA353_Project

# Event Booking and Management System

## // Project Overview
/**
 * A full-stack web application for booking and managing events.
 * Users can register, view events, make bookings, and manage their reservations.
 * Admins have CRUD capabilities for events.
 */

## // Project Dependencies
```bash
# Backend Dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Frontend Dependencies
npm instal axios react-redux redux react-router-dom

# Development Tools
npm install --save-dev nodemon edlint prettier 
```



// Project Structure

```plaintext
root/
│
├── backend/                          // Backend (Node.js + Express)
│   ├── controllers/                  // Request handlers (business logic)
│   ├── models/                       // Mongoose models (data schema)
│   ├── routes/                       // API routes
│   ├── middleware/                   // Authentication middleware
│   └── server.js                     // Main server entry point
│
├── frontend/                         // Frontend (React)
│   ├── src/
│   │   ├── components/               // Reusable UI components
│   │   ├── pages/                    // Pages (Home, EventDetail, etc.)
│   │   ├── redux/                    // Redux actions, reducers, store
│   │   └── App.js                    // Main React App
│   └── public/                       // Static assets
│
├── .env                              // Environment variables
├── README.md                         // Project documentation
└── package.json                      // Dependencies and scripts
```


// Installation Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/event-booking-and-management-system.git

# Move into the backend directory
cd event-booking-and-management-system/backend

# Install backend dependencies
npm install

# Move to frontend directory
cd ../frontend

# Install frontend dependencies
npm install
```


// Starting the Application

```bash
# Backend - Run on http://localhost:5000
cd backend
npm run dev

# Frontend - Run on http://localhost:3000
cd frontend
npm start
```