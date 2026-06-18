const mongoose = require("mongoose");

//Provided in fucntion so as to call this from other files
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log("Error in connecting DB");
        process.exit(1); // "1" is failure. App should not run.
    }
};

//Export the connectDB function so that other files can use it
module.exports = connectDB;