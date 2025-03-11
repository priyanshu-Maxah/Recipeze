const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateRegisterData = (req) => {
    const { userName, emailId, password, confirmPassword } = req.body;

    // Validate userName
    if (!userName) {
        throw new Error("Username is required.");
    } else if (userName.length < 3 || userName.length > 30) {
        throw new Error("Username must be between 3 and 30 characters.");
    }

    // Validate emailId
    if (!emailId) {
        throw new Error("Email is required.");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid email address.");
    }

    // Validate password
    if (!password) {
        throw new Error("Password is required.");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters");
    }

    // Validate confirmPassword
    if (!confirmPassword) {
        throw new Error("Confirm password is required.");
    } else if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    return true;
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["userName", "phoneNo", "address"];

    if (Object.keys(req.body).length === 0) {
        throw new Error("No fields provided for editing.");
    }

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    if (!isEditAllowed) {
        throw new Error("Invalid field(s) provided for editing.");
    }

    // Additional type validation for phoneNo
    if (req.body.phoneNo !== undefined) {
        const phoneNo = req.body.phoneNo;
        if (typeof phoneNo !== 'number' || isNaN(phoneNo)) {
            throw new Error("phoneNo must be a valid number.");
        }
    }

    return true;
};

const isTokenValid = async (token) => {
    if (!token) {
        throw new Error("Token is required.");
    }

    try {
        const decodedMessage = jwt.verify(token, process.env.secretJWT);
        return decodedMessage;
    } catch (error) {
        throw new Error("Invalid or expired token.");
    }
};

module.exports = { validateRegisterData, isTokenValid, validateEditProfileData };