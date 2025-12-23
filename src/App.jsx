import React, { useState } from 'react';
import Header from './components/Layout/Header.jsx';
import SlangCard from './components/SlangTranslator/SlangCard.jsx';
import SlangOfTheDay from './components/SlangTranslator/SlangOfTheDay.jsx';
import FoodMap from './components/FoodMap/FoodMap.jsx';
import ErrorBoundary from './components/Common/ErrorBoundary.jsx';
import BackgroundVideo from './components/Common/BackgroundVideo.jsx';

/**
 * Main App Component
 * Requirements: 5.1, 5.2, 5.3
 * 
 * Features:
 * - Routing between slang translator and food map
 * - Responsive layout structure
 * - State management for current section
 * - Smooth transitions between sections
 * - Integrated navigation and state management
 */
function App() {
  const [currentSection, setCurrentSection] = useState('slang');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionChange = (sectionId) => {
    if (sectionId === currentSection) return;
    
    setIsTransitioning(true);
    
    // Smooth transition with slight delay
    setTimeout(() => {
      setCurrentSection(sectionId);
      setIsTransitioning(false);
    }, 150);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'slang':
        return (
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Slang of the Day */}
            <section className="mb-6 sm:mb-8 lg:mb-12">
              <SlangOfTheDay />
            </section>
            
            {/* Slang Translator */}
            <section>
              <SlangCard />
            </section>
          </div>
        );
      
      case 'food':
        return (
          <section>
            <FoodMap />
          </section>
        );
      
      default:
        return (
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-kolkata-red mb-4 sm:mb-6">
              Welcome to Kolkata Local Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl px-4">
              Your authentic cultural companion for the City of Joy. 
              Discover local slang and street food with genuine Kolkata intelligence.
            </p>
            
            {/* Quick Navigation Cards */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mt-8 sm:mt-12 px-4">
              <button
                onClick={() => handleSectionChange('slang')}
                className="group p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md border-2 border-kolkata-yellow hover:border-kolkata-red hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3" lang="bn">বলি</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-kolkata-red mb-2">Slang Translator</h3>
                <p className="text-gray-600 text-sm sm:text-base">Translate your feelings into authentic Kolkata slang</p>
              </button>
              
              <button
                onClick={() => handleSectionChange('food')}
                className="group p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md border-2 border-kolkata-yellow hover:border-kolkata-red hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3" lang="bn">পেট-পূজো</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-kolkata-red mb-2">Food Map</h3>
                <p className="text-gray-600 text-sm sm:text-base">Discover authentic street food and best spots</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-kolkata-white">
        {/* Header with Navigation */}
        <ErrorBoundary>
          <Header 
            currentSection={currentSection} 
            onSectionChange={handleSectionChange}
          />
        </ErrorBoundary>

        {/* Main Content with Background Video */}
        <BackgroundVideo className="min-h-screen">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
              <ErrorBoundary>
                {renderCurrentSection()}
              </ErrorBoundary>
            </div>
          </main>
        </BackgroundVideo>

        {/* Footer */}
        <footer className="bg-kolkata-yellow border-t-4 border-kolkata-red mt-12 sm:mt-16 lg:mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="text-center">
              <p className="text-black font-medium mb-2 text-sm sm:text-base">
                কলকাতা স্থানীয় গাইড | Kolkata Local Guide
              </p>
              <p className="text-xs sm:text-sm text-kolkata-red mb-2 sm:mb-4">
                Authentic cultural experiences from the City of Joy
              </p>
              <div className="flex justify-center items-center space-x-2 text-xs text-gray-600">
                <span>Built with</span>
                <span className="text-kolkata-red">♥</span>
                <span>for Kolkata culture</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;