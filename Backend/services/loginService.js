const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async(data) => {
    const {email, password} = data;

    if (!email || !password) {
        throw new Error("All fields are required");
    } 

    const user = await User.findOne({email});
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Password is incorrect");
    }

    const accessToken = jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "15m"});
    
    const refreshToken = jwt.sign(
        {id: user.id},
        process.env.REFRESH_SECRET,
        {expiresIn: "1d"});

    user.refreshToken = refreshToken;
    await user.save(); //saving the refresh token in the database

    return { accessToken, refreshToken, 
            user:{ id: user._id, username: user.username, email: user.email, role: user.role}};
}

const refreshToken = async(token) => {

            if(!token) {
                return res.status(401).json({
                    message: "No refresh Token"
                });
            }
    
            const decoded = jwt.verify(token,process.env.REFRESH_SECRET);
            const user = await User.findById(decoded.id);
    
            if (!user || user.refreshToken !== token) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
    
            //Rotation: generate NEW tokens
            const newAccessToken = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
    
            const newRefreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_SECRET,
                { expiresIn: "1d" }
            );
    
            // update DB with new refresh token
            user.refreshToken = newRefreshToken;
            await user.save();
            return { newAccessToken, newRefreshToken };
};

const logoutUser = async(token) => {
        if (!token) {
            throw new Error("Already logged out");
        }

        // find user with this refresh token
        const user = await User.findOne({ refreshToken: token });

        if (user) {
            //remove refresh token from DB
            user.refreshToken = null;
            await user.save();
        }
};

module.exports = {loginUser, refreshToken, logoutUser};