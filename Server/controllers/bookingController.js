import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import transporter from "../config/nodemailer.js";
import stripe from 'stripe' ;                                                                    
import redisClient from "../config/redis.js";

// Function to Check Availablity of Room
const checkAvailability = async ({checkInDate, checkOutDate, room })=>{
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}
// API to check availability of room
//POST/api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) =>{
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        const cacheKey = `availability:${room}:${checkInDate}:${checkOutDate}`;

        const cached = await redisClient.get(cacheKey);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });

        const responseData = { success: true, isAvailable };

        await redisClient.setEx(cacheKey, 300, JSON.stringify(responseData));

        res.json(responseData);

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// API to create a new booking
//POST/api/bookings/book

    export const createBooking = async (req, res) => {
        try {
            const { room, checkInDate, checkOutDate, guests } = req.body;
            const user = req.user._id;

        // Before Booking Check Availability
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room }); 
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available for the selected dates." });
        }
        // Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        
        const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: req.user.email,
        subject: 'Hotel Booking Details',
        html:
            `<h2>Your Booking Details</h2>
                <p>Dear ${req.user.username},</p>
                <p>Thank you for your booking! Here are your details:</p>
            <ul>
                <li><strong>Booking ID:</strong> ${booking._id}</li>
                <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}
                </li>
                <li><strong>Booking Amount:</strong> ${process.env.CURRENCY ||
                '₹'} ${booking.totalPrice}</li>
            </ul>
            <p>We look forward to welcoming you!</p>
            <p>If you need to make any changes, feel free to contact us.</p>
            `
        }

        console.log("Sending email to:", mailOptions.to, "from:", mailOptions.from);
        await transporter.sendMail(mailOptions)
        console.log("Email sent!");
        await redisClient.del(`bookings_user:${req.user._id}`);
        await redisClient.del(`hotel_dashboard:${roomData.hotel.owner}`);
        await redisClient.del("all_rooms");

        res.json({ success: true, message: "Booking created successfully"})
     } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
        }
    };

// API to get all bookings for a user
//GET/api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const cacheKey = `bookings_user:${userId}`;

        const cached = await redisClient.get(cacheKey);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const bookings = await Booking.find({user: userId})
            .populate("room hotel")
            .sort({createdAt: -1})

        const responseData = {success: true, bookings};

        await redisClient.setEx(cacheKey, 900, JSON.stringify(responseData));

        res.json(responseData)

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}



export const getHotelBookings = async (req, res) =>{
    try{
        const userId = req.auth().userId;

        const cacheKey = `hotel_dashboard:${userId}`;

        const cached = await redisClient.get(cacheKey);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const hotel = await Hotel.findOne({owner: userId});

        if(!hotel){
            return res.json({ success: false, message: "No Hotel found" });
        }

        const bookings = await Booking.find({hotel: hotel._id})
            .populate("room hotel user")
            .sort({ createdAt: -1});

        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce(
            (acc, booking)=>acc + booking.totalPrice, 0
        )

        const responseData = {
            success: true,
            dashboardData: {totalBookings, totalRevenue, bookings}
        };

        await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));

        res.json(responseData)

    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"})
    }
}


export const stripePayment = async (req, res)=>{
    try {
        const { bookingId} = req.body;
        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;
        const { origin} = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const line_items = [
            {
                price_data:{
                currency: "inr",
                product_data:{
                    name: roomData.hotel.name,
                },
                    unit_amount: totalPrice*100 
                },
                quantity: 1,
            }
        ]
        // Create Checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/load/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            
            metadata:{
                bookingId,
            }
        })
        await redisClient.del(`bookings_user:${req.user._id}`);

        res.json({success: true, url: session.url})

    } catch (error){
        res.json({success: false, message: "Payment Failed"})

    }
}