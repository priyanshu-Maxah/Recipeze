const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateRegisterData } = require("../utils/validation");

const authRouter = express.Router();

// Register Route
authRouter.post("/register", async (req, res) => {
  // validation of Data
  validateRegisterData(req);

  const { userName, emailId, password, phoneNo, address } = req.body;

  try {
    const passHash = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      userName,
      emailId,
      password: passHash,
      phoneNo,
      address,
    });

    await user.save();
    res.send("User added successfully!!!");
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

// login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        httpOnly: false,
        path: "/",
        sameSite: "lax", 
      });

      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = authRouter;
