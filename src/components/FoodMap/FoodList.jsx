import React from 'react';
import PropTypes from 'prop-types';
import LoadingSkeleton from '../Common/LoadingSkeleton.jsx';
import ErrorFallback from '../Common/ErrorFallback.jsx';

/**
 * FoodList Component
 * Implements list view of all street food items
 * Organizes according to Must-Try Items structure
 * Requirements: 2.2, 2.5
 */
const FoodList = ({ foods, onFoodSelect, isLoading = false, error = null, onRetry }) => {
  // Loading state
  if (isLoading) {
    return <LoadingSkeleton type="list-item" count={3} />;
  }

  // Error state
  if (error) {
    return (
      <ErrorFallback
        type="error"
        title="Food Data Error"
        message={error}
        onRetry={onRetry}
        showCulturalTouch={true}
      />
    );
  }

  // No data state
  if (!foods || foods.length === 0) {
    return (
      <ErrorFallback
        type="info"
        title="No Food Items"
        message="No food items are currently available. Check back later for delicious recommendations!"
        onRetry={onRetry}
        showCulturalTouch={true}
      />
    );
  }

  // Group foods by category (following Must-Try Items structure from product.md)
  const groupedFoods = foods.reduce((groups, food) => {
    const category = food.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(food);
    return groups;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedFoods).map(([category, categoryFoods]) => (
        <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Category Header */}
          <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {category}
            </h2>
          </div>

          {/* Food Items List */}
          <div className="divide-y divide-gray-100">
            {categoryFoods.map((food, index) => (
              <div
                key={`${food.name}-${index}`}
                className="group p-6 hover:bg-kolkata-white hover:border-l-4 hover:border-kolkata-yellow transition-all duration-200 cursor-pointer focus:outline-none focus:bg-kolkata-white focus:border-l-4 focus:border-kolkata-red"
                onClick={() => onFoodSelect && onFoodSelect(food)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onFoodSelect && onFoodSelect(food);
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  {/* Food Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-kolkata-red transition-colors duration-200">
                      {food.name}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {food.description}
                    </p>
                    
                    {/* Best Spots */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {food.bestSpots.map((spot, spotIndex) => (
                        <span
                          key={spotIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kolkata-yellow text-black border border-kolkata-red hover:bg-yellow-400 transition-colors duration-200"
                        >
                          📍 {spot}
                        </span>
                      ))}
                    </div>

                    {/* Cultural Note Preview */}
                    {food.culturalNote && (
                      <p className="text-sm text-gray-500 italic mt-2">
                        {food.culturalNote.length > 100 
                          ? `${food.culturalNote.substring(0, 100)}...` 
                          : food.culturalNote
                        }
                      </p>
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="ml-4 flex-shrink-0">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-kolkata-red transition-colors duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

FoodList.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bestSpots: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string,
      culturalNote: PropTypes.string
    })
  ),
  onFoodSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRetry: PropTypes.func
};

export default FoodList;