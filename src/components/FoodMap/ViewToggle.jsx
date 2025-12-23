import React from 'react';
import PropTypes from 'prop-types';

/**
 * ViewToggle Component
 * Implements switch between list and card views
 * Maintains state and smooth transitions
 * Requirements: 2.1
 */
const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    {
      id: 'list',
      label: 'List View',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      description: 'View all items in a detailed list'
    },
    {
      id: 'card',
      label: 'Card View',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      ),
      description: 'View items as individual cards'
    }
  ];

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      {views.map((view) => {
        const isActive = currentView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isActive 
                ? 'bg-kolkata-yellow text-black shadow-md border border-kolkata-red focus:ring-kolkata-yellow' 
                : 'text-gray-600 hover:text-kolkata-red hover:bg-kolkata-white active:bg-gray-100 focus:ring-gray-300'
              }
            `}
            title={view.description}
            aria-pressed={isActive}
            aria-label={`Switch to ${view.label}`}
          >
            <span className={`transition-colors duration-200 ${isActive ? 'text-kolkata-red' : 'text-gray-500 group-hover:text-kolkata-red'}`}>
              {view.icon}
            </span>
            <span className="font-medium text-sm">
              {view.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

ViewToggle.propTypes = {
  currentView: PropTypes.oneOf(['list', 'card']).isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default ViewToggle;