import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodCard from './FoodCard';
import FoodList from './FoodList';
import ViewToggle from './ViewToggle';
import { foodData } from '../../data/foodData';
import BengaliHeader from '../Common/BengaliHeader';

/**
 * FoodMap Main Component
 * Combines FoodCard, FoodList, and ViewToggle
 * Implements view switching logic
 * Requirements: 2.1
 */
const FoodMap = ({ foods = foodData }) => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedFood, setSelectedFood] = useState(null);

  const handleViewChange = (newView) => {
    setCurrentView(newView);
    // Clear selected food when switching views
    if (newView === 'list') {
      setSelectedFood(null);
    }
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    // Switch to card view when a food is selected from list
    if (currentView === 'list') {
      setCurrentView('card');
    }
  };

  const handleBackToList = () => {
    setSelectedFood(null);
    setCurrentView('list');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <BengaliHeader 
          bengaliText="পেট-পূজো" 
          englishText="Pet-Pujo (Street Food Guide)"
          className="text-3xl font-bold text-center mb-4 drop-shadow-lg"
          textColorOverride="text-black"
        />
        <p className="text-gray-800 text-center max-w-2xl mx-auto drop-shadow-md font-medium">
          Discover authentic Kolkata street food with our curated guide to the city's best spots. 
          From Phuchka to Kathi Rolls, experience the true flavors of the City of Joy.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <ViewToggle 
          currentView={currentView} 
          onViewChange={handleViewChange}
        />
      </div>

      {/* Content Area */}
      <div className="transition-all duration-300 ease-in-out">
        {currentView === 'list' ? (
          <FoodList 
            foods={foods} 
            onFoodSelect={handleFoodSelect}
          />
        ) : (
          <div className="space-y-6">
            {/* Back to List Button (when viewing individual card) */}
            {selectedFood && (
              <div className="flex justify-start">
                <button
                  onClick={handleBackToList}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to List</span>
                </button>
              </div>
            )}

            {/* Card View */}
            {selectedFood ? (
              // Single selected food card
              <div className="max-w-2xl mx-auto">
                <FoodCard food={selectedFood} />
              </div>
            ) : (
              // All foods in card grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food, index) => (
                  <div key={`${food.name}-${index}`}>
                    <FoodCard food={food} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          Authentic Kolkata street food recommendations from local food intelligence. 
          All locations and descriptions sourced from genuine local knowledge.
        </p>
      </div>
    </div>
  );
};

FoodMap.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bestSpots: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string,
      culturalNote: PropTypes.string
    })
  )
};

export default FoodMap;