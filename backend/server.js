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
app.use(cookieParser(process.env.JWT_SECRET));

// Configure CORS middleware
const corsConfig = {
    origin: function (origin, callback) {
        const allowedOrigins = process.env.FRONTEND_URL.split(',');
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
};

app.use(cors(corsConfig));

// Enable trust proxy for secure cookies behind a proxy (like in Render)
app.set('trust proxy', 1);

// Updated cookie configuration middleware
app.use((req, res, next) => {
    res.cookie = function(name, value, options) {
        options = {
            ...options,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: true,
            path: '/'
        };
        return res.cookie(name, value, options);
    };
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