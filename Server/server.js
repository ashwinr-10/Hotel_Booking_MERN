import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRouter.js';

connectDB()
connectCloudinary()
const app = express()
app.use(cors());

//Middleware for Clerk
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks.
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => {
    res.send('API is workingl')
})
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

