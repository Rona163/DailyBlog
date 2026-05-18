const registerService = require("../services/registerService");

const registerUser = async(req,res) => {
    try {
        const result = await registerService.registerUser(req.body);

        res.status(201).json({
            message: "User Registered Successfully", 
            user: result
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

};

module.exports = registerUser;