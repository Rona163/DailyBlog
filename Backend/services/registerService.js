const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async(data) => {
    const {username, email, password} = data;

    if (!username || !email || !password) {
        throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new Error("User Already Exists");
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        return {
         username: user.username,
         email: user.email
        };
    }
};

module.exports = {registerUser};
//exporting as an object, so that when controller imports this
//the registerService would be an object that has function:registerUser
//so the registerService.registerUser() works. If passed
//registerUser as a function then registerService = function, so
//the registerService.registerUser() will not work. Use
//registerService() instead.