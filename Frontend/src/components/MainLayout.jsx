import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import useIsMobile from "../hooks/useIsMobile";

const MainLayout = ({ children, title, NavBar, className }) => {
  const { isMobile, isNavbar } = useIsMobile();

  return (
    <div className="flex flex-col h-[100vh] bg-[#DEB79A] overflow-y-auto font-custom">
      {/* Header */}
      <Header title={title} isNavbar={isNavbar} NavBar={NavBar} />
      
      {/* Main Content Area */}
      <main className={`${className} flex-grow p-5 md:p-5 lg:p-5 max-w-auto mx-auto pb-24 `}>
        {children}
      </main>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Navigation />
        </div>
      )}
    </div>
  );
};
export default MainLayout;