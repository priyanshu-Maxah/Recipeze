import React from 'react';
import { Home, User, Heart, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bottom-nav w-full px-4 py-1 bg-transparent shadow-lg">
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <NavLink
          to="/home"
          style={({ isActive }) => ({ color: isActive ? '#9333ea' : '#6b7280' })}
          className="flex flex-col items-center gap-1 w-16"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/all-recipes"
          style={({ isActive }) => ({ color: isActive ? '#9333ea' : '#6b7280' })}
          className="flex flex-col items-center gap-1 w-16"
        >
          <Menu className="w-6 h-6" />
          <span className="text-xs">Recipes</span>
        </NavLink>
        <NavLink
          to="/favorite"
          style={({ isActive }) => ({ color: isActive ? '#9333ea' : '#6b7280' })}
          className="flex flex-col items-center gap-1 w-16"
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs">Favorite</span>
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({ color: isActive ? '#9333ea' : '#6b7280' })}
          className="flex flex-col items-center gap-1 w-16"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;