# EasyStay - Hotel Booking Platform

## Live Demo
[https://easystay-xi.vercel.app/](https://easystay-xi.vercel.app/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [API Documentation](#api-documentation)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)

## Overview
EasyStay is a comprehensive hotel booking platform that connects travelers with hotel owners. The platform provides an intuitive interface for users to discover and book hotels while offering powerful management tools for hotel owners. Built with modern technologies and best practices, EasyStay delivers a seamless booking experience.

## Screenshots

Below are some screenshots of the EasyStay platform in action:

![Homepage](Client/src/assets/Screenshot%202025-06-30%20143436.png)
*Homepage*

![Hotel List](Client/src/assets/Screenshot%202025-06-30%20143505.png)
*Hotel List*

![Room Details](Client/src/assets/Screenshot%202025-06-30%20144349.png)
*Room Details*

![Booking Page](Client/src/assets/Screenshot%202025-06-30%20144410.png)
*Booking Page*

![Owner Dashboard](Client/src/assets/Screenshot%202025-06-30%20144522.png)
*Owner Dashboard*

![Booking Confirmation](Client/src/assets/Screenshot%202025-06-30%20145110.png)
*Booking Confirmation*

## Features

### For Travelers
- **User Authentication**
  - Secure login/signup via Clerk
  - Profile management
  - Booking history
  
- **Hotel Discovery**
  - Search hotels by location
  - Filter by amenities and price
  - View detailed hotel information
  - See room availability in real-time
  
- **Booking Management**
  - Easy booking process
  - Secure payment via Stripe
  - Booking confirmation emails
  - View and manage bookings
  
### For Hotel Owners
- **Hotel Management**
  - Register hotel properties
  - Add and manage rooms
  - Set room availability
  - Upload hotel/room images
  
- **Booking Overview**
  - View all bookings
  - Track revenue
  - Manage room availability
  - Real-time updates

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Context for state management
- Clerk for authentication
- Stripe for payments

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- RESTful API architecture
- Cloudinary for image storage

### Third-party Services
- Clerk - Authentication
- Stripe - Payment processing
- Cloudinary - Image management
- Brevo - Email notifications
- MongoDB Atlas - Database hosting
- Vercel - Application hosting

## System Architecture

### Frontend Architecture
- Built with React.js and Vite
- Responsive design with Tailwind CSS
- Protected routes with Clerk
- Stripe payment integration
- Real-time updates

### Backend Architecture
- Node.js & Express.js server
- MongoDB database with Mongoose ODM
- RESTful API endpoints
- Webhook integrations
- Email notification system

### Cloud Services
- Vercel for frontend and backend hosting
- MongoDB Atlas for database
- Cloudinary for media storage
- Clerk for authentication
- Stripe for payments
- Brevo for email services

## API Documentation

All protected routes require a valid Clerk session token in the Authorization header.

### User Routes
```javascript
GET /api/user - Get user data 
POST /api/user/store-recent-search - Store recently searched cities
```

### Hotel Routes
```javascript
POST /api/hotels - Register a new hotel 
```

### Room Routes
```javascript
POST /api/rooms - Create a new room (Protected, multipart/form-data, max 4 images)
GET /api/rooms - Get all available rooms
GET /api/rooms/owner - Get rooms owned by authenticated user 
POST /api/rooms/toggle-availability - Toggle room availability 
```

### Booking Routes
```javascript
POST /api/bookings/check-availability - Check room availability
POST /api/bookings/book - Create a new booking 
GET /api/bookings/user - Get authenticated user's bookings 
GET /api/bookings/hotel - Get hotel's bookings 
POST /api/bookings/stripe-payment - Process payment through Stripe 
```

### Webhook Routes
```javascript
POST /api/clerk - Handle Clerk webhook events
POST /api/stripe - Handle Stripe payment events
```

## Environment Setup

Create two `.env` files: one in the `Server` directory and one in the `Client` directory.

### Backend (.env in Server directory)
```bash
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=your_mongodb_uri

# Cloudinary Configuration (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (Brevo SMTP)
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
```

### Frontend (.env in Client directory)
```bash
# API Configuration
VITE_APP_API_URL=http://localhost:3000

# Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Payment
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```


## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/easystay.git
cd easystay
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd Server
npm install

# Install frontend dependencies
cd ../Client
npm install
```

3. Set up environment variables
- Create `.env` files in both Server and Client directories
- Fill in the environment variables as described above

4. Start the development servers
```bash
# Start backend server (from Server directory)
npm run server

# Start frontend server (from Client directory)
npm run dev
```

5. Access the application
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Deployment

The application is deployed using the following services:

- **Frontend**: Vercel
  - Automatic deployments from main branch
  - Environment variables configured in Vercel dashboard
  
- **Backend**: Vercel
  - Serverless functions for API endpoints
  - Environment variables configured in Vercel dashboard
  
- **Database**: MongoDB Atlas
  - Cloud-hosted MongoDB cluster
  - Automatic backups and scaling
  
- **Media Storage**: Cloudinary
  - Image optimization and CDN delivery
  - Secure file uploads

## Future Enhancements

1. **Advanced Features**
   - Real-time chat support
   - Multi-language support
   - Advanced search filters
   - Dynamic pricing system

2. **Mobile Application**
   - React Native mobile app
   - Push notifications
   - Offline support

3. **Analytics Dashboard**
   - Revenue analytics
   - Booking trends
   - Customer insights
   - Performance metrics

4. **Additional Integrations**
   - More payment methods
   - Social media sharing
   - Virtual tours
   - Review system

