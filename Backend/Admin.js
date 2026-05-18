const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv"); 
dotenv.config(); //this loads .env variables
const User = require("./models/userModel");

const createAdmin = async() => {
    await mongoose.connect(process.env.MONGO_URI);
        const existing = await User.findOne({ email: "rona123@gmail.com" });

    if (existing) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("rona123", 10);

    await User.create({
        username: "rona",
        email: "rona123@gmail.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("Admin created successfully");
    process.exit();
};

createAdmin();