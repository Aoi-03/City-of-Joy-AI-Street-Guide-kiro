import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSkeleton Component
 * Creates loading skeletons with Kolkata theme
 * Requirements: 5.5
 * 
 * Features:
 * - Kolkata-themed loading animations
 * - Various skeleton types (card, list, header, etc.)
 * - Smooth pulse animations using Kolkata colors
 */
const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  className = '',
  showKolkataAccent = true 
}) => {
  const baseSkeletonClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded';
  const kolkataAccentClasses = showKolkataAccent ? 'border-l-4 border-kolkata-yellow' : '';

  const renderCardSkeleton = () => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${kolkataAccentClasses} ${className}`}>
      {/* Header skeleton */}
      <div className={`h-6 ${baseSkeletonClasses} mb-4 w-3/4`}></div>
      
      {/* Content lines */}
      <div className={`h-4 ${baseSkeletonClasses} mb-3 w-full`}></div>
      <div className={`h-4 ${baseSkeletonClasses} mb-3 w-5/6`}></div>
      <div className={`h-4 ${baseSkeletonClasses} mb-4 w-4/5`}></div>
      
      {/* Tags skeleton */}
      <div className="flex gap-2 mb-4">
        <div className={`h-6 ${baseSkeletonClasses} w-20 rounded-full`}></div>
        <div className={`h-6 ${baseSkeletonClasses} w-24 rounded-full`}></div>
        <div className={`h-6 ${baseSkeletonClasses} w-16 rounded-full`}></div>
      </div>
      
      {/* Footer skeleton */}
      <div className={`h-3 ${baseSkeletonClasses} w-2/3`}></div>
    </div>
  );

  const renderListItemSkeleton = () => (
    <div className={`bg-white p-6 border-b border-gray-100 ${kolkataAccentClasses} ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Title */}
          <div className={`h-5 ${baseSkeletonClasses} mb-3 w-1/2`}></div>
          
          {/* Description */}
          <div className={`h-4 ${baseSkeletonClasses} mb-2 w-full`}></div>
          <div className={`h-4 ${baseSkeletonClasses} mb-3 w-4/5`}></div>
          
          {/* Tags */}
          <div className="flex gap-2">
            <div className={`h-5 ${baseSkeletonClasses} w-16 rounded-full`}></div>
            <div className={`h-5 ${baseSkeletonClasses} w-20 rounded-full`}></div>
          </div>
        </div>
        
        {/* Arrow */}
        <div className={`h-5 w-5 ${baseSkeletonClasses} ml-4`}></div>
      </div>
    </div>
  );

  const renderHeaderSkeleton = () => (
    <div className={`bg-kolkata-yellow p-6 ${className}`}>
      {/* Main title */}
      <div className="text-center mb-6">
        <div className={`h-12 ${baseSkeletonClasses} mb-2 w-3/4 mx-auto`}></div>
        <div className={`h-6 ${baseSkeletonClasses} w-1/2 mx-auto`}></div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-center space-x-8">
        <div className={`h-16 w-24 ${baseSkeletonClasses} rounded-lg`}></div>
        <div className={`h-16 w-24 ${baseSkeletonClasses} rounded-lg`}></div>
      </div>
    </div>
  );

  const renderSlangCardSkeleton = () => (
    <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 ${kolkataAccentClasses} ${className}`}>
      {/* Header */}
      <div className="mb-6 text-center">
        <div className={`h-8 ${baseSkeletonClasses} mb-2 w-1/2 mx-auto`}></div>
        <div className={`h-4 ${baseSkeletonClasses} w-3/4 mx-auto`}></div>
      </div>

      {/* Input section */}
      <div className="mb-6">
        <div className={`h-4 ${baseSkeletonClasses} mb-2 w-1/4`}></div>
        <div className="flex gap-3">
          <div className={`flex-1 h-10 ${baseSkeletonClasses} rounded-lg`}></div>
          <div className={`h-10 w-24 ${baseSkeletonClasses} rounded-lg`}></div>
        </div>
      </div>

      {/* Result section */}
      <div className="mb-4">
        <div className={`h-6 ${baseSkeletonClasses} mb-4 w-1/3`}></div>
        <div className={`bg-kolkata-white p-4 rounded-lg border-l-4 border-kolkata-yellow`}>
          <div className={`h-8 ${baseSkeletonClasses} mb-3 w-1/2`}></div>
          <div className={`h-4 ${baseSkeletonClasses} mb-3 w-full`}></div>
          <div className={`h-4 ${baseSkeletonClasses} mb-3 w-4/5`}></div>
          <div className={`h-16 ${baseSkeletonClasses} rounded`}></div>
        </div>
      </div>
    </div>
  );

  const renderSlangOfTheDaySkeleton = () => (
    <div 
      className={`max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-kolkata-yellow ${className}`}
      data-testid="loading-skeleton"
    >
      {/* Header */}
      <div className="bg-kolkata-yellow p-4 text-center">
        <div className={`h-6 ${baseSkeletonClasses} w-3/4 mx-auto`}></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Featured term */}
        <div className="text-center mb-4">
          <div className={`h-10 ${baseSkeletonClasses} mb-2 w-1/2 mx-auto`}></div>
          <div className={`h-6 ${baseSkeletonClasses} w-3/4 mx-auto`}></div>
        </div>

        {/* Context */}
        <div className="mb-4">
          <div className={`h-4 ${baseSkeletonClasses} mb-2 w-1/3`}></div>
          <div className={`h-4 ${baseSkeletonClasses} mb-2 w-full`}></div>
          <div className={`h-4 ${baseSkeletonClasses} w-4/5`}></div>
        </div>

        {/* Example */}
        <div className="mb-6">
          <div className={`h-4 ${baseSkeletonClasses} mb-2 w-1/4`}></div>
          <div className={`bg-kolkata-white p-3 rounded-lg border-l-4 border-kolkata-yellow`}>
            <div className={`h-4 ${baseSkeletonClasses} w-5/6`}></div>
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <div className={`h-8 w-20 ${baseSkeletonClasses} rounded-lg mx-auto`}></div>
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list-item':
        return renderListItemSkeleton();
      case 'header':
        return renderHeaderSkeleton();
      case 'slang-card':
        return renderSlangCardSkeleton();
      case 'slang-of-the-day':
        return renderSlangOfTheDaySkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

LoadingSkeleton.propTypes = {
  type: PropTypes.oneOf(['card', 'list-item', 'header', 'slang-card', 'slang-of-the-day']),
  count: PropTypes.number,
  className: PropTypes.string,
  showKolkataAccent: PropTypes.bool
};

export default LoadingSkeleton;