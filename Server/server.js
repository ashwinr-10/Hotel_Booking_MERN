import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDB()
const app = express()
app.use(cors());

//Middleware for Clerk
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks.
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => {
    res.send('API is working')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

