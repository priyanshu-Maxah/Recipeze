const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { isTokenValid } = require("../utils/validation");

const userAuth = async (req, res, next) => {
    try {
   
        const { token } = req.cookies

        if (!token) {
            return res.status(401).send("Please Login!!");
        }

        const decodeObj = await isTokenValid(token);

        if (!decodeObj || !decodeObj._id) {
            throw new Error("Invalid token");
        }

        const user = await User.findById(decodeObj._id);

        if (!user) {
            throw new Error("User not Found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        res.status(400).send("Error: " + error.message);
    }
};

module.exports = { userAuth };