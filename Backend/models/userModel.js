const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
     refreshToken: { 
        type: String,
        default: null
    }
    },
    {
        timestamps: true //to get createdAt and updatedAt automatically
    }
);

//links schema to mongoDB collection "User"
module.exports = mongoose.model("User", userSchema);