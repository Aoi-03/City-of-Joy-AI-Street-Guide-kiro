import React from 'react';
import PropTypes from 'prop-types';
import ErrorFallback from '../Common/ErrorFallback.jsx';

/**
 * FoodCard Component
 * Displays individual food items with descriptions and locations
 * Uses authentic terminology from product.md
 * Requirements: 2.2, 2.3, 2.4
 */
const FoodCard = ({ food }) => {
  if (!food) {
    return (
      <ErrorFallback
        type="warning"
        title="No Food Data"
        message="Food information is not available."
        showCulturalTouch={true}
      />
    );
  }

  const { name, description, bestSpots, culturalNote } = food;

  // Validate required fields
  if (!name || !description || !bestSpots) {
    return (
      <ErrorFallback
        type="error"
        title="Incomplete Food Data"
        message="Some food information is missing. Please try refreshing."
        showCulturalTouch={true}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-kolkata-yellow focus-within:ring-2 focus-within:ring-kolkata-yellow focus-within:ring-offset-2 transition-all duration-300 transform hover:scale-105">
      {/* Food Name */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-kolkata-red transition-colors duration-200">
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Best Spots */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-yellow-600 mb-2">
          Best Spots:
        </h4>
        <div className="flex flex-wrap gap-2">
          {bestSpots.map((spot, index) => (
            <span
              key={index}
              className="inline-block bg-kolkata-yellow text-black text-sm px-3 py-1 rounded-full border border-kolkata-red hover:bg-yellow-400 hover:shadow-md transition-all duration-200 cursor-default"
            >
              {spot}
            </span>
          ))}
        </div>
      </div>

      {/* Cultural Note */}
      {culturalNote && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 italic">
            <span className="font-medium text-red-600">Cultural Note:</span> {culturalNote}
          </p>
        </div>
      )}
    </div>
  );
};

FoodCard.propTypes = {
  food: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bestSpots: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string,
    culturalNote: PropTypes.string
  }).isRequired
};

export default FoodCard;