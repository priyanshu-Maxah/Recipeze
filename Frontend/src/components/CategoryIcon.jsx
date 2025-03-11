import React from 'react';

const CategoryIcon = ({ image, label, onClick }) => {
  const handleImageError = (e) => {
    e.target.src = '/path/to/fallback/image.png'; // Fallback image path
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 animate-fade-in cursor-pointer hover:scale-105 focus:scale-105 transition-transform duration-200`}
      onClick={onClick}
      role="button"
      aria-label={`Select ${label} category`}
      tabIndex={0}
    >
      <div className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center">
        <img
          src={image}
          alt={label}
          className="w-full h-full"
          onError={handleImageError}
        />
      </div>
      <span className="text-sm md:text-base text-purple-800 font-medium">{label}</span>
    </div>
  );
};

export default CategoryIcon;