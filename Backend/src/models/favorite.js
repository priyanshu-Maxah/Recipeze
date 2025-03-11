const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config;

const favoriteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe: {
    recipeId:{
        type: String
    },
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 35,
    },
    category: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 35,
    },
    image: {
      type: String, // Store as encoded Base64 or URL
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: function (value) {
          return !isNaN(value) && value >= 1 && value <= 5;
        },
        message: "Rating must be a number between 1 and 5.",
      },
    },
    prepTime: {
      type: Number,
      required: true,
      min: 1,
      max: 60,
      validate: {
        validator: function (value) {
          return !isNaN(value) && value > 0;
        },
        message: "Prep time must be a positive number.",
      },
    },
    cookTime: {
      type: Number,
      required: true,
      min: 1,
      max: 60,
      validate: {
        validator: function (value) {
          return !isNaN(value) && value > 0;
        },
        message: "Cook time must be a positive number.",
      },
    },
    totalTime: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return !isNaN(value) && value > 0;
        },
        message: "Total time must be a positive number.",
      },
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required."],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one ingredient is required.",
      },
    },
    instructions: {
      type: [String],
      required: [true, "Instructions are required."],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one instruction is required.",
      },
    },
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);