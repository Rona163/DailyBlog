const express = require("express"); //Import Express
//Import dotenv and loads the package.
const dotenv = require("dotenv"); 
dotenv.config(); //this loads .env variables
const cookieParser = require("cookie-parser");
//MongoDB
const connectDB = require("./config/db");
connectDB();
const cors = require("cors");

//import Routes
const welcomeRoutes = require("./routes/welcomeRoute");
const registerRoutes = require("./routes/registerRoute");
const loginRoutes = require("./routes/loginRoute");
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");


const app = express(); //create app

//Middleware. This allows my API to read JSON data from requests
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

//attach all routes from welcomeRoutes under /api prefix
app.use("/api", welcomeRoutes);
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);


const PORT = process.env.PORT;
const URL = process.env.URL;

app.listen(PORT, () => {
    console.log(`Server is listening on ${URL}`);
});