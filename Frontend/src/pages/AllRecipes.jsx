import React, { useState, useRef, useEffect, useCallback } from "react";
import RecipeCard from "../components/RecipeCard";
import Navigation from "../components/Navigation";
import useIsMobile from "../hooks/useIsMobile";
import NavBar from "../components/NavBar";
import MainLayout from "../components/MainLayout";
import SearchBar from "../components/SearchBar";
import AddRecipe from "../components/AddRecipes";
import { IonModal, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from "@ionic/react";
import RecipeDetail from "../components/RecipeDetail";
import { X } from "lucide-react";
import { recipeViewApi, recipeDeleteApi, favoriteApi, favoriteRemoveApi } from "../utility/api";
import MySVGIcon from "../components/MySVGIcon";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const AllRecipes = () => {
  const { isMobile } = useIsMobile();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState([]); // Full list of recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered list of recipes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default to 10 items per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  // Favorite state (initialized from localStorage)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  // Ref for the modal's close button
  const modalCloseButtonRef = useRef(null);

  // Fetch recipes from the API
  const fetchRecipes = async (page = 1, limit = 10) => {
    try {
      const data = await recipeViewApi(page, limit);
      setRecipes(data.recipes);
      setFilteredRecipes(data.recipes);
      setTotalPages(data.totalPages);
      setTotalRecipes(data.totalRecipes);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

   // Handle recipe updates
   const handleRecipeUpdate = async (updatedData) => {
    // Update the selected recipe in the modal
    setSelectedRecipe((prevRecipe) => ({
      ...prevRecipe,
      ...updatedData,
    }));

    // Refresh the recipe list
    await fetchRecipes(page, limit);
  };

  // Fetch recipes on component mount or when page/limit changes
  useEffect(() => {
    fetchRecipes(page, limit);
  }, [page, limit]);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle recipe deletion
  const handleDeleteRecipe = async (title) => {
    setIsDeleting(true);
    try {
      await recipeDeleteApi(title);
      await fetchRecipes(page, limit); // Re-fetch recipes after deletion
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      if (error.response?.status === 404) {
        console.error("Recipe not found:", error.response.data);
        toast.error("Recipe not found!");
      } else {
        console.error("Error deleting recipe:", error.response);
        toast.error("Failed to delete recipe!");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Add Recipe success
  const handleAddRecipeSuccess = async () => {
    await fetchRecipes(page, limit);
    toast.success("Recipe added successfully!");
    handleAddRecipeModalClose();
  };

  // Handle recipe card click
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    setIsAddRecipeModalOpen(false);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setIsAddRecipeModalOpen(false);
  };

  // Handle Add Recipe button click
  const handleAddRecipeClick = () => {
    setIsAddRecipeModalOpen(true);
    setIsModalOpen(false);
  };

  // Handle Add Recipe modal close
  const handleAddRecipeModalClose = async () => {
    await fetchRecipes(page, limit);
    setIsAddRecipeModalOpen(false);
  };

  // Handle search functionality
  const handleSearch = useCallback((query) => {
    if (typeof query !== "string") {
      console.error("Invalid query type:", query);
      return;
    }

    if (query.trim() === "") {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredRecipes(filtered);
  }, [recipes]);

  // Handle favorite toggle
  const toggleFavorite = async (title) => {
    try {
      if (favorites[title]) {
        // If already favorited, remove it
        await favoriteRemoveApi(title);
        toast.success("Removed from favorites!", {icon: '❤️'});
      } else {
        // If not favorited, add it
        await favoriteApi(title);
        toast.success("Added to favorites!" , {icon: '❤️'});
      }

      // Update the favorite state in the parent component
      setFavorites((prev) => {
        const newFavorites = { ...prev, [title]: !prev[title] };
        return newFavorites;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites!");
    }
  };

  // Focus management for the modal
  useEffect(() => {
    if (isModalOpen || isAddRecipeModalOpen) {
      modalCloseButtonRef.current?.focus();
    }
  }, [isModalOpen, isAddRecipeModalOpen, selectedRecipe]);

  // Display loading state
  if (loading) {
    return <div><MySVGIcon /></div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout title="Recipeze" NavBar={NavBar} className={"w-full mx-1 pb-24"}>

      {/* Add the Toaster component here */}
        <Toaster
           position="bottom-right" 
           toastOptions={{
             duration: 2000,
             style: {
              background: '#e7d8c9', 
              color: '#343a40', 
              fontWeight: 'bold',
            }, 
           }}
         />
      
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar recipes={recipes} onSearch={handleSearch} />
      </div>

      {/* Add Recipe Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddRecipeClick}
          className="bg-[#75441e] text-white px-[20px] py-[12px] sm:px-[30px] sm:py-[15px] md:px-[40px] md:py-[17px] rounded-[10px] border-0 tracking-[0.5px] text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-300 ease-in-out shadow-[0px_7px_0px_0px_#77441da8] hover:shadow-[0px_7px_0px_0px_#77441da8] active:bg-[#77441d] active:shadow-none active:translate-y-[5px] active:duration-200 cursor-pointer"
        >
          Add Recipes
        </button>
      </div>

      {/* Recipe Grid Section */}
      <section className="px-6 md:px-8 lg:px-10 mb-8 mt-4 max-w-full">
        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-4">
            No recipes found. Try a different search!
          </div>
        ) : (
          // Display the recipe grid if there are matching recipes
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                image={recipe.image}
                rating={recipe.rating}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                totalTime={recipe.totalTime}
                onClick={() => handleRecipeClick(recipe)}
                onDelete={handleDeleteRecipe}
                isFavorite={favorites[recipe.title] || false} // Pass favorite state as prop
                toggleFavorite={toggleFavorite} // Pass toggle function as prop
              />
            ))}
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      <div className="pagination-container">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`pagination-button ${pageNumber === page ? "active" : ""}`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

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
          {selectedRecipe && <RecipeDetail {...selectedRecipe} onUpdate={handleRecipeUpdate} />}
        </IonContent>
      </IonModal>

      {/* Add Recipe Modal */}
      <IonModal
        isOpen={isAddRecipeModalOpen}
        onDidDismiss={handleAddRecipeModalClose}
        className="custom-modal"
      >
        <IonHeader>
          <IonToolbar className="custom-header">
            <IonTitle className="custom-title">Add New Recipe</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={handleAddRecipeModalClose}
                className="custom-button"
              >
                <X />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="custom-content">
          <AddRecipe onClose={handleAddRecipeModalClose} onSuccess={handleAddRecipeSuccess} />
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

export default AllRecipes;