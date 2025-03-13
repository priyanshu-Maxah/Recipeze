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
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { star, time } from 'ionicons/icons';
import { Edit, Save } from 'lucide-react';
import { recipeEditApi } from '../utility/api';
import toast from 'react-hot-toast'; 

const RecipeDetail = ({
  title,
  image,
  rating,
  prepTime: initialPrepTime,
  cookTime: initialCookTime,
  totalTime: initialTotalTime,
  ingredients: initialIngredients,
  instructions: initialInstructions,
  onUpdate, // Add this prop
  showEditButton = true, // Default to true if not provided
}) => {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prepTime, setPrepTime] = useState(initialPrepTime);
  const [cookTime, setCookTime] = useState(initialCookTime);
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);

  // Toggle between ingredients and instructions
  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
    setShowInstructions(false);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
    setShowIngredients(false);
  };

  // Handle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

   // Handle save changes
   const handleSaveClick = async () => {
    const updates = {
      prepTime: parseInt(prepTime),
      cookTime: parseInt(cookTime),
      totalTime: parseInt(prepTime) + parseInt(cookTime),
      ingredients,
      instructions,
    };

    try {
      await recipeEditApi(title, updates);
      setIsEditing(false);
      toast.success('Recipe updated successfully!');
      onUpdate(updates); // Notify the parent component of the update
    } catch (error) {
      console.error('Error updating recipe:', error);
      toast.error('Failed to update recipe!');
    }
  };

  // Update total time when prepTime or cookTime changes
  const handlePrepTimeChange = (e) => {
    const newPrepTime = e.target.value;
    setPrepTime(newPrepTime);
    setTotalTime(parseInt(newPrepTime) + parseInt(cookTime));
  };

  const handleCookTimeChange = (e) => {
    const newCookTime = e.target.value;
    setCookTime(newCookTime);
    setTotalTime(parseInt(prepTime) + parseInt(newCookTime));
  };

  return (
    <IonCard className="recipe-details-card overflow-hidden">
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
          <IonLabel>
            Prep Time:{' '}
            {isEditing ? (
              <IonInput
                type="number"
                value={prepTime}
                onIonChange={handlePrepTimeChange}
                className="inline-input"
              />
            ) : (
              `${prepTime} mins`
            )}
          </IonLabel>
        </IonItem>

        {/* Cook Time */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={time} slot="start" className="text-gray-600" />
          <IonLabel>
            Cook Time:{' '}
            {isEditing ? (
              <IonInput
                type="number"
                value={cookTime}
                onIonChange={handleCookTimeChange}
                className="inline-input"
              />
            ) : (
              `${cookTime} mins`
            )}
          </IonLabel>
        </IonItem>

        {/* Total Time */}
        <IonItem className="mb-4 details-item">
          <IonIcon icon={time} slot="start" className="text-gray-600 bg-transparent" />
          <IonLabel>Total Time: {totalTime} mins</IonLabel>
        </IonItem>

        {/* Edit and Save Buttons */}
        {showEditButton && (
          <IonGrid className="mb-4">
            <IonRow>
              <IonCol>
                {isEditing ? (
                  <button
                    onClick={handleSaveClick}
                    className="w-full py-2 px-4 rounded-lg font-semibold bg-[#DEB79A] text-black"
                  >
                    <Save size={16} className="inline mr-2" /> Save
                  </button>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="w-full py-2 px-4 rounded-lg font-semibold bg-transparent hover:bg-[#DEB79A] border border-[#DEB79A] text-gray-800"
                  >
                    <Edit size={16} className="inline mr-2" /> Edit
                  </button>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        {/* Toggle Buttons */}
        <IonGrid className="mb-4">
          <IonRow>
            <IonCol>
              <button
                onClick={toggleIngredients}
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                  showIngredients
                    ? 'bg-[#DEB79A] text-black'
                    : 'bg-transparent hover:bg-[#DEB79A] border border-[#DEB79A] text-gray-800'
                }`}
              >
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
              </button>
            </IonCol>
            <IonCol>
              <button
                onClick={toggleInstructions}
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                  showInstructions
                    ? 'bg-[#DEB79A] text-black'
                    : 'bg-transparent hover:bg-[#DEB79A] border border-[#DEB79A] text-gray-800'
                }`}
              >
                {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
              </button>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Ingredients */}
        {showIngredients && (
          <IonText>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Ingredients</h2>
            <IonList style={{ backgroundColor: '#fff0' }}>
              {isEditing ? (
                <IonTextarea
                  value={ingredients.join('\n')}
                  onIonChange={(e) => setIngredients(e.detail.value.split('\n'))}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              ) : (
                ingredients.map((ingredient, index) => (
                  <IonItem key={index} className="list-item mb-2">
                    <IonLabel className="text-gray-700">{ingredient}</IonLabel>
                  </IonItem>
                ))
              )}
            </IonList>
          </IonText>
        )}

        {/* Instructions */}
        {showInstructions && (
          <IonText>
            <h2 className="text-xl font-bold mb-2 text-gray-900">Instructions</h2>
            <IonList style={{ backgroundColor: '#fff0' }}>
              {isEditing ? (
                <IonTextarea
                  value={instructions.join('\n')}
                  onIonChange={(e) => setInstructions(e.detail.value.split('\n'))}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              ) : (
                instructions.map((step, index) => (
                  <IonItem key={index} className="list-item mb-2">
                    <IonLabel className="text-gray-700">{step}</IonLabel>
                  </IonItem>
                ))
              )}
            </IonList>
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeDetail;