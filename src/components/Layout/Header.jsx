import React from 'react';
import BengaliHeader from '../Common/BengaliHeader.jsx';

/**
 * Header Component - Main navigation with Bengali headers
 * Requirements: 3.2, 5.3
 * 
 * Features:
 * - Main navigation with Bengali script headers
 * - Kolkata visual theme elements
 * - Responsive design
 * - Navigation between slang translator and food map
 */
const Header = ({ currentSection = 'home', onSectionChange }) => {
  const navigationItems = [
    {
      id: 'slang',
      bengaliText: 'বলি',
      englishText: 'Slang',
      description: 'Translate feelings to Kolkata slang'
    },
    {
      id: 'food',
      bengaliText: 'পেট-পূজো',
      englishText: 'Food',
      description: 'Discover authentic street food'
    }
  ];

  const handleNavClick = (sectionId) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <header className="bg-kolkata-yellow shadow-lg border-b-4 border-kolkata-red">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Main Title */}
        <div className="text-center mb-2 sm:mb-3">
          <BengaliHeader 
            bengaliText="কলকাতা স্থানীয় গাইড"
            englishText="Kolkata Local Guide"
            level="h1"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-1 drop-shadow-lg"
            textColorOverride="text-black"
          />
          <p className="text-kolkata-red font-medium text-base sm:text-lg lg:text-xl drop-shadow-md">
            City of Joy • আনন্দের শহর
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                group relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 w-full sm:w-auto
                ${currentSection === item.id 
                  ? 'bg-kolkata-red text-white shadow-lg focus:ring-kolkata-red' 
                  : 'bg-white text-kolkata-red border-2 border-kolkata-red hover:bg-kolkata-red hover:text-white hover:shadow-md active:bg-red-700 focus:ring-kolkata-yellow'
                }
              `}
              aria-label={`Navigate to ${item.englishText} section`}
            >
              {/* Bengali Text */}
              <div className="text-base sm:text-lg font-bold" lang="bn">
                {item.bengaliText}
              </div>
              
              {/* English Text */}
              <div className="text-xs sm:text-sm font-medium" lang="en">
                {item.englishText}
              </div>

              {/* Tooltip - Hidden on mobile */}
              <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </button>
          ))}
        </nav>

        {/* Cultural Elements */}
        <div className="flex justify-center items-center mt-2 sm:mt-3 space-x-2 sm:space-x-4 text-kolkata-red">
          <div className="w-6 sm:w-8 h-0.5 bg-kolkata-red"></div>
          <div className="text-xs sm:text-sm font-medium text-center drop-shadow-sm">
            ★ Authentic Cultural Experience ★
          </div>
          <div className="w-6 sm:w-8 h-0.5 bg-kolkata-red"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;