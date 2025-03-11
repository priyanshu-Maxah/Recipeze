const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Recipes = require("../models/recipes");
const multer = require("multer");
const sharp = require("sharp");
const Favorite = require("../models/Favorite");

const recipesRouter = express.Router();

// using diskStorage store in upload folder
/* const storage = multer.diskStorage({
        destination:(req, file, cb) =>{
            cb(null, 'uploads/');
        },
        filename:(req, file,cb) =>{
            const suffix = Date.now();
            cb(null, suffix + '-' + file.originalname)
        }
    })*/

// using memoryStorage store in direct DB
const storage = multer.memoryStorage();
const allowedMimeTypes = ["image/png", "image/jpeg"];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const uploads = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed."));
    }
  },
});

// Error handling middleware for Multer
const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};

recipesRouter.post("/recipes/add", userAuth, uploads.single("image"), handleMulterError, async (req, res) => {
    try {
      const {
        title,
        category,
        rating,
        prepTime,
        cookTime,
        totalTime,
        ingredients,
        instructions,
      } = req.body;

      let imageBase64 = null;

      if (req.file) {
        //process image with Sharp
        const format = req.file.mimetype === "image/png" ? "png" : "jpeg";
        const processedImage = await sharp(req.file.buffer)
          .resize({
            width: 800,
            height: 800,
            fit: "inside",
            withoutEnlargement: true,
          })
          .toFormat(format, {
            quality: 80, // For JPEG
            compressionLevel: 9, // For PNG (ignored for JPEG)
          })
          .toBuffer();

        imageBase64 = `data:${
          req.file.mimetype
        };base64,${processedImage.toString("base64")}`;
      }

      const recipeDetail = new Recipes({
        title,
        category,
        image: imageBase64,
        rating,
        prepTime,
        cookTime,
        totalTime,
        ingredients,
        instructions,
      });

      await recipeDetail.save();
      res
        .status(200)
        .json({ message: "Recipes added", recipeDetails: recipeDetail });
    } catch (error) {
      res.status(400).send("Error : " + error.message);
    }
  }
);

recipesRouter.get("/recipes/view", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const recipes = await Recipes.find({}).skip(skip).limit(limit);
    const totalRecipes = await Recipes.countDocuments();

    res.status(200).json({
      message: "Recipes fetched successfully",
      recipes,
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

recipesRouter.delete("/recipes/remove", async (req, res) => {
  const { title } = req.query;
  try {
    const recipe = await Recipes.findOneAndDelete({ title });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // Success response
    res.status(200).json({ message: "Recipe deleted successfully", recipe });
  } catch (error) {
    console.error("Error deleting recipe:", error); 

    // Send a single error response
    res.status(500).json({ message: "Internal server error" });
  }
});

recipesRouter.post("/recipes/favorites", userAuth, async (req, res) => {
  const { title } = req.query;
  const userId = req.user._id;

  if (!title) {
    return res.status(400).json({ message: "Recipe title is required" });
  }

  try {
    const recipe = await Recipes.findOne({ title: title });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingFavorite = await Favorite.findOne({
      user: userId,
     "recipe.recipeId": recipe._id,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe is already in favorites" });
    }

    const newFavorite = new Favorite({
      user: userId,
      recipe: {
        recipeId: recipe._id, 
        title: recipe.title,
        category: recipe.category,
        image: recipe.image,
        rating: recipe.rating,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      }
    });

    await newFavorite.save();

    res.status(200).json({
      message: "Recipe added to favorites",
      favorite: newFavorite,
    });
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

recipesRouter.get("/recipes/favorites/view", userAuth, async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const favorites = await Favorite.find({ user: userId })
    .skip(skip)
    .limit(limit)

    const totalFavorites = await Favorite.countDocuments({user : userId});

    res.status(200).json({
      favorites,
      totalFavorites,
      totalPages: Math.ceil(totalFavorites / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

recipesRouter.delete("/recipes/favorites/remove", userAuth, async (req, res) => {
  const { title } = req.query; 
  const userId = req.user._id; 

  if (!title) {
    return res.status(400).json({ message: "Recipe title is required" });
  }

  try {
   
    const deletedFavorite = await Favorite.findOneAndDelete({
      user: userId,
      "recipe.title": title, 
    });

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Recipe not found in favorites" });
    }

    // Success response
    res.status(200).json({ message: "Recipe removed from favorites", deletedFavorite });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = recipesRouter;
