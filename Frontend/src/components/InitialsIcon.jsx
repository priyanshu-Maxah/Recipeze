import React from 'react';

const InitialsIcon = ({ firstName, lastName }) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  const initials = `${firstInitial}${lastInitial}`;

  return (
    <div className="flex items-center justify-center bg-blue-300 text-white text-4xl font-bold uppercase mx-auto rounded-full w-20 h-20 sm:w-32 sm:h-32 md:w-32  md:h-32  lg:w-48 lg:h-48 mb-4">
    {initials}
  </div>
  );
};

export default InitialsIcon;