import User from '../models/User.js';
import redisClient from "../config/redis.js";

//GET/api/user/
export const getUserData = async (req, res)=>{
    try {
        const userId = req.user._id;

        const cacheKey = `user:${userId}`;

        const cached = await redisClient.get(cacheKey);

        if (cached) {
            return res.json(JSON.parse(cached));
        }

        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        const responseData = {success: true, role, recentSearchedCities};

        await redisClient.setEx(cacheKey, 1800, JSON.stringify(responseData));

        res.json(responseData);

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res)=>{
    try {
        const { recentSearchedCity } = req.body;
        const user = req.user;

        // Remove duplicate if already exists
        user.recentSearchedCities = user.recentSearchedCities.filter(
            city => city !== recentSearchedCity
        );

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCity);
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
        }

        await user.save();

        // Invalidate Redis Cache
        await redisClient.del(`user:${user._id}`);

        res.json({success: true, message: "City added"})

    } catch (error) {
        res.json({success: false, message: error.message })
    }
};
