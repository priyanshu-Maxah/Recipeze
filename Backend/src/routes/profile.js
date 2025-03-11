const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;

          const AllowedData = ["userName", "emailId", "phoneNo", "address"];

          const filteredUser = {};
        for (const field of AllowedData) {
            if (user[field] !== undefined) {
                filteredUser[field] = user[field];
            }
        }

        res.send(filteredUser);

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

         const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        loggedInUser.save();

        res.json({message: `${loggedInUser.userName} your Profile updated successfully`, data:loggedInUser})
    } catch (error) {
        res.status(400).send("Error Message: " + error.message);
    }
})



module.exports = profileRouter;