import axios from "axios";
import { isAuthenticated } from "./auth";



const loginUrl = "http://localhost:7777/login";
const registerUrl = "http://localhost:7777/register";
const profileViewUrl = "http://localhost:7777/profile/view";
const profileEditUrl = "http://localhost:7777/profile/edit";
const recipeViewUrl = "http://localhost:7777/recipes/view";
const recipeAddUrl = "http://localhost:7777/recipes/add";
const recipeEditUrl = "http://localhost:7777/recipes/edit";
const recipeDeleteUrl = "http://localhost:7777/recipes/remove";
const favoriteUrl = "http://localhost:7777/recipes/favorites";
const favoriteViewUrl = "http://localhost:7777/recipes/favorites/view";
const favoriteRemoveUrl = "http://localhost:7777/recipes/favorites/remove";


export const registerApi = async ( userName, emailId, password, confirmPassword, phoneNo, address) => {
  try {
    const req = await axios.post(registerUrl, {
      userName,
      emailId,
      password,
      confirmPassword,
      phoneNo,
      address,
    });
    return req;
  } catch (error) {
    console.error("Error during Register:", error.message);
    throw error;
  }
};

export const loginApi = async (emailId, password) => {
  try {
    const response = await axios.post(
      loginUrl,
      {
        emailId,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export const HomeViewApi = async () => {
  try {
    const response = await axios.get(recipeViewUrl, { withCredentials: true });
    
    const recipes = response.data.recipes; 

    const filteredRecipes = recipes.filter(recipe => recipe.rating >= 4);
    const limitedRecipes = filteredRecipes.slice(0, 4);

    return limitedRecipes;
  } catch (error) {
    console.error("Error during Recipes View:", error.message);
    throw error;
  }
};

export const categoryViewApi = async (category) => {
  try {
    const response = await axios.get(recipeViewUrl, { withCredentials: true });
    const recipes = response.data.recipes;

    // Normalize the input category and recipe categories to lowercase
    const normalizedCategory = category.toLowerCase();
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category.toLowerCase() === normalizedCategory
    );

    const limitedRecipes = filteredRecipes.slice(0, 4);
    return limitedRecipes;
  } catch (error) {
    console.error("Error during Recipes View:", error.message);
    throw error;
  }
};

export const profileViewApi = async (userName, emailId, phoneNo, address) => {
  try {
    const response = await axios.get(profileViewUrl, {
      params: {
        userName,
        emailId,
        phoneNo,
        address,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error during Profile View:", error.message);
    throw error;
  }
};

export const profileEditApi = async (userName, phoneNo, address) => {
  try {
    const token = isAuthenticated();

    const req = await axios.patch(
      profileEditUrl,
      { userName, phoneNo, address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return req.data;
  } catch (error) {
    console.error("Error during Profile Edit:", error.message);
    throw error;
  }
};

export const recipeViewApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(recipeViewUrl, {
      withCredentials: true,
      params: {
        page, // Pass the page number
        limit, // Pass the number of items per page
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during Recipes View:", error.message);
    throw error;
  }
};

export const recipeAddApi = async (formData) => {
  try {
    const request = await axios.post(recipeAddUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return request;
  } catch (error) {
    console.error("Error during Add Recipes:", error.message);
    throw error;
  }
};

export const recipeEditApi = async (title, updates) => {
  try {
    // Ensure updates is an object and contains valid fields
    if (!updates || typeof updates !== "object" || Object.keys(updates).length === 0) {
      throw new Error("No updates provided");
    }
    const response = await axios.patch(
      `${recipeEditUrl}?title=${encodeURIComponent(title)}`, 
      updates, 
      { withCredentials: true } 
    );
    if (response.status === 200) {
      // console.log("Update Successful:", response.data);
      return response.data; 
    } else {
      throw new Error(`Failed to update recipe: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating recipe:", error.message);
    throw error;
  }
};

export const recipeDeleteApi = async (title) => {
  try {
    const response = await axios.delete( `${recipeDeleteUrl}?title=${encodeURIComponent(title)}`,
    );
    if (response.status === 200) {
    } else {
      throw new Error('Failed to delete recipe');
    }
  } catch (error) {
    console.error('Error deleting recipe:', error.message);
    throw error; 
  }
};

export const favoriteApi = async (title) => {
  try {
    const response = await axios.post(
      `${favoriteUrl}?title=${encodeURIComponent(title)}`,{},
      {withCredentials:true}
    );

    if (response.status === 200) {
      return response.data; // Return the response data if needed
    } else {
      throw new Error('Failed to add recipe to favorites');
    }
  } catch (error) {
    console.error('Error adding recipe to favorites:', error.message);
    throw error;
  }
};

export const favoriteViewApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(favoriteViewUrl, {
      withCredentials: true,
      params: {
        page,
        limit, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during fetching favorite recipes:", error.message);
    throw error;
  }
};

export const favoriteRemoveApi = async (title) => {
  try {
    const response = await axios.delete(favoriteRemoveUrl, {
      params: { title: title }, 
      withCredentials: true,
    });
    if (response.status === 200) {  
    } else {
      throw new Error("Failed to delete Favorite recipe");
    }
  } catch (error) {
    console.error("Error deleting Favorite recipe:", error.message);
    throw error;
  }
};