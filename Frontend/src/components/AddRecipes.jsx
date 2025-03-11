import { Trash2 } from "lucide-react";
import React from "react";
import useRecipeForm from "../hooks/useRecipeForm";

const AddRecipes = () => {
  const {
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
  } = useRecipeForm();

  return (
    <div className="recipe-details-card min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-transparent rounded-lg"
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
          {recipe.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Selected Image: {recipe.image.name}
              </p>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Rating:
          </label>
          <input
            type="number"
            name="rating"
            value={recipe.rating}
            onChange={handleChange}
            min="0"
            max="5"
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Preparation Time */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Preparation Time (minutes):
          </label>
          <input
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
          {errors.prepTime && (
            <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
          )}
        </div>

        {/* Cooking Time */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Cooking Time (minutes):
          </label>
          <input
            type="number"
            name="cookTime"
            value={recipe.cookTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
            required
          />
          {errors.cookTime && (
            <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
          )}
        </div>

        {/* Total Time (Calculated) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Total Time (minutes):
          </label>
          <input
            type="number"
            value={calculateTotalTime()}
            readOnly
            className="w-full px-4 py-2 bg-transparent border-[#3b1d0763] cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Ingredients:
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2 flex items-center gap-2">
              <textarea
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
                rows="3"
                required
              />
              {recipe.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-1 text-[#000] hover:text-[#e64949] rounded-lg transition-colors"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
          {recipe.ingredients.length < 2 && (
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-transparent border border-[#75441e] text-black hover:text-white rounded-lg hover:bg-[#5a3417] transition-colors"
            >
              Add Ingredient
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Instructions:
          </label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="mb-2 flex items-center gap-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="w-full px-4 py-2 border bg-transparent border-[#3b1d0763] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#75441e3f]"
                rows="3"
                required
              />
              {recipe.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="px-3 py-1 text-[#000] hover:text-[#e64949] rounded-lg transition-colors"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
          {recipe.instructions.length < 2 && (
            <button
              type="button"
              onClick={addInstruction}
              className="mt-2 px-4 py-2 bg-transparent border border-[#75441e] text-black hover:text-white rounded-lg hover:bg-[#5a3417] transition-colors"
            >
              Add Instruction
            </button>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-transparent border border-[#75441e] text-black hover:text-white rounded-lg hover:bg-[#5a3417] transition-colors"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipes;