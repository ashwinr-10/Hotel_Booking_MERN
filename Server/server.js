import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRouter.js';
import bookingRouter from './routes/BookingRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';
import redisClient from "./config/redis.js";
connectDB()
connectCloudinary()
const app = express()
app.use(cors());

app.post('/api/stripe', express.raw({type: "application/json" }),
stripeWebhooks)

//Middleware for Clerk
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk Webhooks.
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => {
    res.send('API is working')
})
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

app.get("/redis-test", async (req, res) => {
  if (!redisClient) {
    return res.json({ message: "Redis not connected" });
  }

  await redisClient.set("test", "hello from upstash");
  const value = await redisClient.get("test");

  res.json({ value });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

