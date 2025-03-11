import React from "react";
import { Search } from "lucide-react";

const Header = ({ title, isNavbar, NavBar }) => {
  return (
    <header className="sm:px-10 md:px-14 lg:px-16 p-8  max-w-auto ">
      {/* Flex container for title and NavBar */}
      <div className="flex items-center justify-between mb-6 w-full">
        {/* Title */}
        <h1 className="font-header text-[#a43d15] text-[12vw] sm:text-[10vw] md:text-5xl lg:text-6xl custom-text-shadow flex-shrink-0 tracking-[1px] ">
          {title}
        </h1>

        {/* NavBar (conditionally rendered) */}
        {isNavbar && (
          <div className="flex-shrink-0 ml-4"> {/* Add margin-left for spacing */}
            <NavBar />
          </div>
        )}
      </div>


    </header>
  );
};

export default Header;