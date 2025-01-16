# ExpenSave - Personal Expense Tracker

A modern, full-stack expense tracking application built with React and Node.js that helps users manage their personal finances effectively.

## Features

### Dashboard Analytics
- Interactive pie charts and visualizations for expense breakdown
- Time-based filtering (daily, weekly, monthly, yearly)
- Category-wise expense analysis
- Total spending summaries
- Responsive design for all devices

### Expense Management
- Add, edit, and delete expenses
- Categorize expenses with customizable categories
- Add reference numbers and descriptions
- Date-based expense tracking
- Real-time updates and calculations

### Search & Filtering
- Advanced search functionality
- Filter by date range
- Filter by categories
- Sort expenses by date
- Multiple view options (category/daily view)

### User Interface
- Modern, responsive design
- Dark theme with gradient accents
- Interactive components and animations
- Toast notifications for actions
- Loading states and error handling

## Technologies Used

### Frontend
- **React** (v18.3.1) - UI library
- **Vite** (v6.0.1) - Build tool and development server
- **TailwindCSS** (v3.4.16) - Utility-first CSS framework
- **React Router DOM** (v7.0.2) - Client-side routing
- **Recharts** (v2.15.0) - Charting library for analytics
- **Axios** (v1.7.9) - HTTP client
- **React Toastify** (v10.0.6) - Toast notifications
- **Lucide React** (v0.468.0) - Icon library
- **React Responsive** (v10.0.0) - Responsive design utilities

### Backend
- **Node.js** with **Express** (v4.21.2) - Server framework
- **MongoDB** with **Mongoose** (v8.8.4) - Database
- **JWT** (v9.0.2) - Authentication
- **bcryptjs** (v2.4.3) - Password hashing
- **Cloudinary** (v2.5.1) - Cloud storage
- **Nodemailer** (v6.9.16) - Email functionality
- **Cookie Parser** (v1.4.7) - Cookie handling
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.4.7) - Environment variables
- **Morgan** (v1.10.0) - HTTP request logger

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Murali3824/ExpenSave.git
cd ExpenSave
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Create `.env` file in backend directory with:
```env
PORT=8000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
NODE_ENV = development or production
SMTP_USER=your_email
SMTP_PASS=your_emailpasskey
SENDER_EMAIL=your_email
FRONTEND_URL=your_frontend_url
```

5. Start the development servers

Backend:
```bash
npm run dev
```

Frontend:
```bash
npm run dev
```

