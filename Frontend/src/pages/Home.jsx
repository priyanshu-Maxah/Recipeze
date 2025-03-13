import React, { useState, useEffect, useRef } from "react";
import CategoryIcon from "../components/CategoryIcon";
import useIsMobile from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import NavBar from "../components/NavBar";
import MySVGIcon from "../components/MySVGIcon";
import SimpleCard from "../components/SimpleCard";
import { HomeViewApi, categoryViewApi } from "../utility/api";
import { Navigation, X } from "lucide-react";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import RecipeDetail from "../components/RecipeDetail";

const Home = () => {
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const modalCloseButtonRef = useRef(null);

  const handleShowMoreClick = () => {
    navigate("/all-recipes");
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setIsCategorySelected(true);
    setIsCategoryLoading(true);
    setError(null); // Clear any previous errors

    try {
      const normalizedCategory = category.toLowerCase();
      const data = await categoryViewApi(normalizedCategory);

      if (data.length === 0) {
        setError("No recipes found for this category.");
      } else {
        setFilteredRecipes(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await HomeViewApi();
        setRecipes(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const categories = [
    { image: "/src/assets/images/burger.png", label: "Food" },
    { image: "/src/assets/images/tea.png", label: "Tea" },
    { image: "/src/assets/images/food1.png", label: "Dinner" },
    { image: "/src/assets/images/pizza.png", label: "Dessert" },
    // { image: "/src/assets/images/french_fries.png", label: "Dessert" },
    // { image: "/src/assets/images/fruit.png", label: "Dessert" },
  ];

  if (isLoading) {
    return (
      <div>
        <MySVGIcon />
      </div>
    );
  }

  return (
    <MainLayout title="Recipeze" NavBar={NavBar}>
      {/* Popular Recipes Section */}
      <section className="px-6 md:px-8 lg:px-10 mb-8 max-w-auto mx-auto">
        <div className="card-head flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            POPULAR RECIPES
          </h2>
          <button
            className="flex items-center text-primary font-semibold hover:text-hovered-color transition-colors duration-300"
            onClick={handleShowMoreClick}
          >
            <span>Show More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 px-4 mb-4 md:text-lg">
          Discover trending recipes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {Array.isArray(recipes) &&
            recipes.map((recipe, index) => (
              <SimpleCard
                key={index}
                recipe={recipe}
                onClick={() => handleCardClick(recipe)}
              />
            ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 md:px-8 lg:px-10 max-w-auto mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            CATEGORIES
          </h2>
        </div>
        <p className="text-gray-600 px-4 mb-6 md:text-lg">
          Explore by meal type
        </p>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                selectedCategory === category.label ? "shadow-lg scale-105" : ""
              } transition-all duration-300`}
              onClick={() => handleCategoryClick(category.label)}
            >
              <CategoryIcon
                image={category.image}
                label={category.label}
              />
            </div>
          ))}
        </div>
        {/* Show More Button */}
        <div className="card-head flex items-center justify-end mt-5 mb-4">
          <button
            className="flex items-center text-primary font-semibold hover:text-hovered-color transition-colors duration-300"
            onClick={handleShowMoreClick}
          >
            <span>Show More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* Display Filtered Recipes or Error Message */}
        {isCategorySelected && (
          <div className="mt-6">
            {error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                {isCategoryLoading ? (
                  <div className="col-span-full flex justify-center items-center min-h-[10vh]">
                    <MySVGIcon className="max-h-[10vh]" /> 
                  </div>
                ) : (
                  Array.isArray(filteredRecipes) &&
                  filteredRecipes.map((recipe, index) => (
                    <SimpleCard
                      key={index}
                      recipe={recipe}
                      onClick={() => handleCardClick(recipe)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Prompt to select a category */}
        {!isCategorySelected && (
          <div className="text-center p-4 text-gray-600">
            Please select a category to view recipes.
          </div>
        )}
      </section>

      {/* Recipe Detail Modal */}
      <IonModal
        isOpen={isModalOpen}
        onDidDismiss={handleModalClose}
        className="custom-modal"
      >
        <IonHeader>
          <IonToolbar className="custom-header">
            <IonTitle className="custom-title">
              {selectedRecipe?.title}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={handleModalClose}
                className="custom-button"
                ref={modalCloseButtonRef}
              >
                <X />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="custom-content">
          {selectedRecipe && <RecipeDetail {...selectedRecipe}  showEditButton={false}/>}
        </IonContent>
      </IonModal>

       {/* Mobile Navigation */}
       {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Navigation />
        </div>
      )}

    </MainLayout>
    
  );
};

export default Home;