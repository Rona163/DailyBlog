const express = require("express");
//Create a mini Express application (router) that can handle 
// routes separately from the main app
const router = express.Router();

router.get("/welcome", (req,res) => {
    res.json({message: "Welcome to Daily Blog"})
});

module.exports = router;