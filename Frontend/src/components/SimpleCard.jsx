import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react";
import { time } from "ionicons/icons";

const SimpleCard = ({ recipe, onClick }) => {
  return (
    <IonCard className="recipe-card bg-transparent rounded-3xl shadow-lg overflow-hidden animate-slide-up" onClick={onClick}>
      <div className="image-container">
        <img src={recipe.image} alt={recipe.title} className="w-full h-[30vh] object-cover" />
        <div className="overlay"></div>
      </div>
      <IonCardHeader>
        <div className="flex justify-between">
          <IonCardTitle className="text-xl font-semibold text-primary mb-1">
            {recipe.title}
          </IonCardTitle>
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
};

export default SimpleCard;