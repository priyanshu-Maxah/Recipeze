import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { time, heart, heartOutline } from 'ionicons/icons';
import { Trash2 } from 'lucide-react';

const RecipeCard = ({
  title,
  image,
  rating,
  prepTime,
  cookTime,
  totalTime,
  onClick,
  onDelete,
  isFavorite, // Receive favorite state as prop
  toggleFavorite, // Receive toggle function as prop
}) => {
  return (
    <IonCard className="recipe-card bg-transparent rounded-3xl shadow-lg overflow-hidden animate-slide-up" onClick={onClick}>
      <div className="image-container">
        <img src={image} alt={title} className="w-full h-[30vh] object-cover" />
        <div className="overlay"></div>
        {/* Favorites Button */}
        <div
          className="favorite-button absolute top-4 right-4 bg-white bg-opacity-50 rounded-full p-2 flex items-center justify-center cursor-pointer shadow-sm transition-colors duration-300 hover:bg-opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(title); // Call the toggle function from the parent
          }}
        >
          <IonIcon
            icon={isFavorite ? heart : heartOutline}
            className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-800'}`}
          />
        </div>
      </div>
      <IonCardHeader>
        <div className="flex justify-between">
          <IonCardTitle className="text-xl font-semibold text-primary mb-1">
            {title}
          </IonCardTitle>
          <Trash2
            className="text-[#000] hover:text-[#ff3737] cursor-pointer transition duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(title);
            }}
          />
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-2xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
              ★
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <IonIcon icon={time} className="w-4 h-4" />
            <span>Prep {prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <IonIcon icon={time} className="w-4 h-4" />
            <span>Cook {cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <IonIcon icon={time} className="w-4 h-4" />
            <span>Ready In {totalTime}</span>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;