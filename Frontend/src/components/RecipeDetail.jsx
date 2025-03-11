import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { star, time } from 'ionicons/icons';

const RecipeDetail = ({title, image, rating, prepTime, cookTime, totalTime, ingredients, instructions,}) => {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
    setShowInstructions(false);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
    setShowIngredients(false);
  };

  return (
    <IonCard className="recipe-details-card  overflow-hidden">
      {/* Recipe Image */}
      <IonImg src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Recipe Title */}
      <IonCardHeader className="p-4">
        <IonCardTitle className="text-2xl font-bold">{title}</IonCardTitle>
      </IonCardHeader>

      {/* Recipe Details */}
      <IonCardContent className="p-4">
        {/* Rating */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={star} slot="start" className="text-yellow-400" />
          <IonLabel>{rating} / 5</IonLabel>
        </IonItem>

        {/* Prep Time */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={time} slot="start" className="text-gray-600" />
          <IonLabel>Prep Time: {prepTime}</IonLabel>
        </IonItem>

        {/* Cook Time */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={time} slot="start" className="text-gray-600" />
          <IonLabel>Cook Time: {cookTime}</IonLabel>
        </IonItem>

        {/* Total Time */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={time} slot="start" className="text-gray-600 bg-transparent" />
          <IonLabel>Total Time: {totalTime}</IonLabel>
        </IonItem>

        {/* Toggle Buttons */}
        <IonGrid className="mb-4">
          <IonRow>
            <IonCol>
              <button
                onClick={toggleIngredients}
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                  showIngredients ? 'bg-[#DEB79A] text-black  ' : 'bg-transparent hover:bg-[#DEB79A] border border-[#DEB79A] text-gray-800'
                }`}
              >
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
              </button>
            </IonCol>
            <IonCol>
              <button
                onClick={toggleInstructions}
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                  showInstructions ? 'bg-[#DEB79A] text-black  ' : 'bg-transparent hover:bg-[#DEB79A] border border-[#DEB79A] text-gray-800'
                }`}
              >
                {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
              </button>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Ingredients */}
        {showIngredients && (
          <IonText >
            <h2 className="text-xl font-bold mb-2 text-gray-900">Ingredients</h2>
            <IonList style={{ backgroundColor: ' #fff0' }}>
              {ingredients.map((ingredient, index) => (
                <IonItem key={index} className="list-item mb-2" >
                  <IonLabel className=" text-gray-700  ">{ingredient}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonText>
        )}

        {/* Instructions */}
        {showInstructions && (
          <IonText>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Instructions</h2>
            <IonList  style={{ backgroundColor: ' #fff0' }}>
              {instructions.map((step, index) => (
                <IonItem key={index} className="list-item mb-2">
                  <IonLabel className="text-gray-700">{step}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeDetail;