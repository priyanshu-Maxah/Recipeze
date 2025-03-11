const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const userSchema = mongoose.Schema({
    userName: {
        type:String,
        require:true,
        minLength:3,
        maxLength:30
    },
    emailId:{
        type: String,
        unique: true,
        validate:{
            validator:(value) =>validator.isEmail(value),
            message:"Invalid Email Address",
        },
    },
    password:{
        type:String,
        require:true,
        validator:(value) => validator.isStrongPassword(value),
        message: 'Password is not strong',
    },
    phoneNo: {
        type: Number,
        require:true,
        minLength:10,
        maxLength:10
    },
     address: {
        type:String,
        require:true,
        minLength:3,
        maxLength:70
    },
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.secretJWT,{
        expiresIn: "1d",
    })
    return token;
}

userSchema.methods.validatePassword = async function name(password) {
    const user = this;
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);