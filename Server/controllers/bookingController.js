import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

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
        const { room, checkInDate, checkoutDate } = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate,
        room});
        res.json({ success: true, isAvailable })
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
        const checkout = new Date(checkOutDate)
        const timeDiff = checkout.getTime() - checkIn.getTime();
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
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort
        ({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}

export const getHotelBooking = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort
        ({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" });
    }
}

export const getHotelBookings = async (req, res) =>{
    try{
        const hotel = await Hotel.findOne({owner: req.auth().userId});
    
        if(!hotel){
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({ createdAt: -1});
        // Total Bookings
        const totalBookings = bookings.length;
        // Total Revenue
        const totalRevenue = bookings.reduce((acc, booking)=>acc + booking.totalPrice, 0)
        
        res.json({success: true, dashboardData: {totalBookings, totalRevenue,
        bookings}})
    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"})
    }
}
