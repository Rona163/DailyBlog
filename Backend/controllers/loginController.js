const loginService = require("../services/loginService");
const jwt = require("jsonwebtoken");

const loginUser = async(req,res) => {
    try {
        const result = await loginService.loginUser(req.body);

        res.status(200).json({
            message: "Logged in Successfully",
            ...result
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const refreshToken = async(req,res) => {
    try{
        const token = req.cookies.refreshToken || req.body.refreshToken;
        const { newAccessToken, newRefreshToken } = await loginService.refreshToken(token);

        // send new refresh token
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.json({
            accessToken: newAccessToken
        });

    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};

const logoutUser = async(req,res) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        await loginService.logoutUser(token);
        //clear cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: false
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {loginUser, refreshToken, logoutUser};

