import React, { useState } from "react";
import { recipeAddApi } from "../utility/api";


const useRecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    image: null,
    rating: "",
    prepTime: "",
    cookTime: "",
    ingredients: [""],
    instructions: [""],
  });

  const [errors, setErrors] = useState({
    title: "",
    rating: "",
    prepTime: "",
    cookTime: "",
  });

  const splitInputByDot = (input) => {
    if (typeof input !== "string") {
      console.error("Input must be a string");
      return [];
    }
    if (!input.trim()) {
      return [];
    }
    if (!input.includes(".")) {
      return [input.trim()];
    }
    return input
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const validateRating = (rating) => {
    if (rating < 0 || rating > 5 || !Number.isInteger(Number(rating))) {
      return "Rating must be between 0 and 5.";
    }
    return "";
  };

  const validateTime = (time) => {
    if (time < 0 || time > 60) {
      return "Time must be between 0 and 60 minutes.";
    }
    return "";
  };

  const validateTitle = (title) => {
    const words = title.split(/\s+/).filter((word) => word.length > 0);
    if (words.length > 5) {
      return "Title must not exceed 35 words.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "title":
        error = validateTitle(value);
        break;
      case "rating":
        error = validateRating(value);
        break;
      case "prepTime":
      case "cookTime":
        error = validateTime(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    if (!error) {
      setRecipe({
        ...recipe,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setRecipe({
          ...recipe,
          image: file,
        });
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({
      ...recipe,
      ingredients: newIngredients,
    });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({
      ...recipe,
      instructions: newInstructions,
    });
  };

  const addIngredient = () => {
    if (recipe.ingredients.length < 2) {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    }
  };

  const removeIngredient = (index) => {
    if (recipe.ingredients.length > 1) {
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe({
        ...recipe,
        ingredients: newIngredients,
      });
    }
  };

  const addInstruction = () => {
    if (recipe.instructions.length < 2) {
      setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, ""],
      });
    }
  };

  const removeInstruction = (index) => {
    if (recipe.instructions.length > 1) {
      const newInstructions = recipe.instructions.filter((_, i) => i !== index);
      setRecipe({
        ...recipe,
        instructions: newInstructions,
      });
    }
  };

  const calculateTotalTime = () => {
    const prepTime = parseInt(recipe.prepTime) || 0;
    const cookTime = parseInt(recipe.cookTime) || 0;
    return prepTime + cookTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleError = validateTitle(recipe.title);
    const ratingError = validateRating(recipe.rating);
    const prepTimeError = validateTime(recipe.prepTime);
    const cookTimeError = validateTime(recipe.cookTime);

    if (titleError || ratingError || prepTimeError || cookTimeError) {
      setErrors({
        title: titleError,
        rating: ratingError,
        prepTime: prepTimeError,
        cookTime: cookTimeError,
      });
      return;
    }

    const processedIngredients = recipe.ingredients.flatMap((ingredient) =>
      splitInputByDot(ingredient)
    );
    const processedInstructions = recipe.instructions.flatMap((instruction) =>
      splitInputByDot(instruction)
    );

    if (processedIngredients.length === 0) {
      alert("Please enter at least one valid ingredient");
      return;
    }
    if (processedInstructions.length === 0) {
      alert("Please enter at least one valid instruction");
      return;
    }

    const submittedRecipe = {
      title: recipe.title,
      category: recipe.category,
      rating: recipe.rating,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      totalTime: calculateTotalTime(),
      ingredients: processedIngredients,
      instructions: processedInstructions,
    };

    const formData = new FormData();

    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    for (const key in submittedRecipe) {
      if (Array.isArray(submittedRecipe[key])) {
        submittedRecipe[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, submittedRecipe[key]);
      }
    }

    try {
      const response = await recipeAddApi(formData);

      if (response) {
        console.log("Recipe added successfully!");
        setRecipe({
          title: "",
          category: "",
          image: null,
          rating: "",
          prepTime: "",
          cookTime: "",
          ingredients: [""],
          instructions: [""],
        });

        setErrors({
          title: "",
          rating: "",
          prepTime: "",
          cookTime: "",
        });

       
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return {
    recipe,
    errors,
    handleChange,
    handleImageChange,
    handleIngredientChange,
    handleInstructionChange,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    calculateTotalTime,
    handleSubmit,
  };
};

export default useRecipeForm;