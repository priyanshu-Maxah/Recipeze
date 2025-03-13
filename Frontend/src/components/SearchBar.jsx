import { Search } from 'lucide-react';
import React, { useState } from 'react';

function SearchBar({ recipes, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

 
  const handleInputChange = (event) => {
    const query = event.target.value; 
    setSearchQuery(query);
  };

 
  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-2xl mb-3">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-4/5 bg-white rounded-full py-3 md:py-4 px-6 pr-12 text-lg focus:outline-none shadow-md"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleSearchClick();
            }
          }}
        />
        <Search
          className="absolute lg:right-40 right-[22vw] sm:right-28 md:right-40 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer"
          aria-label="Search"
          onClick={handleSearchClick}
        />
      </div>
    </>
  );
}

export default SearchBar;