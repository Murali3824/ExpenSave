import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouters from './routes/authRouters.js';
import userRouters from './routes/userRouters.js';
import transactionRouters from './routes/transactionRouters.js';

// App config
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

// Define allowed origins
// const allowedOrigins = ['http://localhost:5173', 'http://192.168.1.3:5173'];

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configure CORS middleware
const corsConfig = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsConfig));

// Add these headers explicitly
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// API routes
app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);
app.use('/api/transaction', transactionRouters);

// API endpoints
app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(port,'0.0.0.0', () => {
    console.log("Server is running on port: ", port);
});