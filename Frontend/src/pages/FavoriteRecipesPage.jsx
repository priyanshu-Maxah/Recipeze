import React, { useCallback, useEffect, useState } from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react";
import { heart, heartOutline, time, trash } from "ionicons/icons";
import { Trash2 } from "lucide-react";
import Navigation from "../components/Navigation";
import useIsMobile from "../hooks/useIsMobile";
import NavBar from "../components/NavBar";
import MainLayout from "../components/MainLayout";
import SearchBar from "../components/SearchBar";
import { favoriteRemoveApi, favoriteViewApi } from "../utility/api";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import { X } from "lucide-react";
import RecipeDetail from "../components/RecipeDetail";
import MySVGIcon from "../components/MySVGIcon";

const FavoriteRecipesPage = () => {
  const { isMobile } = useIsMobile();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default to 10 items per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalFavorites, setTotalFavorites] = useState(0);

  const fetchFavoriteRecipes = async (page = 1, limit = 10) => {
    try {
      const data = await favoriteViewApi(page, limit);
      const recipesArray = Array.isArray(data.favorites) ? data.favorites : [];
      setRecipes(recipesArray);
      setFilteredRecipes(recipesArray);
      setTotalPages(data.totalPages);
      setTotalFavorites(data.totalFavorites);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteRecipes(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleModalOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (title) => {
    try {
      await favoriteRemoveApi(title);
      console.log("Favorite Recipe deleted successfully");
  
      // Remove from localStorage
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        delete favorites[title]; // Remove the recipe by title
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
  
      // Refresh the list of favorite recipes after deletion
      fetchFavoriteRecipes(page, limit);
    } catch (error) {
      console.error("Error deleting Favorite recipe:", error);
    }
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
    
    const filtered = recipes.filter((favorite) => {
      const recipe = favorite.recipe;
   
      return recipe?.title?.toLowerCase().includes(query.toLowerCase());
    });
  
    setFilteredRecipes(filtered);
  }, [recipes]);

  if (loading) {
    return <div><MySVGIcon /></div>;
  }

  return (
    <MainLayout title="Recipeze" NavBar={NavBar} className={"w-full mx-1 pb-24"}>
      <SearchBar recipes={recipes} onSearch={handleSearch}/>
      {/* Recipe Grid Section */}
      <section className="px-6 md:px-8 lg:px-10 mb-8 max-w-auto mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((favorite, index) => {
              const recipe = favorite.recipe;
              return (
                <IonCard
                  key={index}
                  className="recipe-card bg-transparent rounded-3xl shadow-lg overflow-hidden animate-slide-up"
                  onClick={() => handleModalOpen(recipe)}
                >
                  <div className="image-container">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-[30vh] object-cover" />
                    <div className="overlay"></div>
                  </div>
                  <IonCardHeader>
                    <div className="flex justify-between">
                      <IonCardTitle className="text-xl font-semibold text-primary mb-1">
                        {recipe.title}
                      </IonCardTitle>
                      <Trash2
                        className="text-[#000] hover:text-[#ff3737] cursor-pointer transition duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(recipe.title, index);
                        }}
                      />
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-2xl ${i < recipe.rating ? "text-yellow-500" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <IonIcon icon={time} className="w-4 h-4" />
                        <span>Prep {recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IonIcon icon={time} className="w-4 h-4" />
                        <span>Cook {recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IonIcon icon={time} className="w-4 h-4" />
                        <span>Ready In {recipe.totalTime}</span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              );
            })
          ) : (
            <p className="text-center text-lg mt-7">No favorite recipes found.</p>
          )}
        </div>
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
            className={`pagination-button ${
              pageNumber === page ? "active" : ""
            }`}
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
              >
                <X />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="custom-content">
          {selectedRecipe && <RecipeDetail {...selectedRecipe} />}
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

export default FavoriteRecipesPage;