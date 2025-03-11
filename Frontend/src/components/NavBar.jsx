import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <div className="container mx-auto lg:px-8 md:px-5 py-2 font-custom font-semibold">
        <div className="flex items-center justify-between">
          <div className="flex lg:space-x-8 md:space-x-5">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-gray-600 lg:text-2xl md:text-xl hover:text-gray-800 dark:hover:text-gray-900 transition duration-300 ${
                  isActive ? 'text-black dark:text-black' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-recipes"
              className={({ isActive }) =>
                `text-gray-600 lg:text-2xl md:text-xl hover:text-gray-800 dark:hover:text-gray-900 transition duration-300 ${
                  isActive ? 'text-black dark:text-black' : ''
                }`
              }
            >
              Recipes
            </NavLink>
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                `text-gray-600 lg:text-2xl md:text-xl hover:text-gray-800 dark:hover:text-gray-900 transition duration-300 ${
                  isActive ? 'text-black dark:text-black' : ''
                }`
              }
            >
              Favorites
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-600 lg:text-2xl md:text-xl hover:text-gray-800 dark:hover:text-gray-900 transition duration-300 ${
                  isActive ? 'text-black dark:text-black' : ''
                }`
              }
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;