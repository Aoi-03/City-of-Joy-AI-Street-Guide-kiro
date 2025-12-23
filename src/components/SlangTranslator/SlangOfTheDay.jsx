import React, { useState, useEffect } from 'react';
import { getRandomSlang } from '../../data/slangDictionary.js';
import BengaliHeader from '../Common/BengaliHeader.jsx';
import LoadingSkeleton from '../Common/LoadingSkeleton.jsx';
import ErrorFallback from '../Common/ErrorFallback.jsx';

/**
 * SlangOfTheDay Component - Featured slang display with rotation logic
 * Requirements: 1.1
 * 
 * Features:
 * - Displays a featured slang term with full cultural context
 * - Rotation logic to show different slang terms
 * - Cultural context and usage examples
 * - Kolkata visual theme integration
 */
const SlangOfTheDay = () => {
  const [currentSlang, setCurrentSlang] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with a random slang on component mount
  useEffect(() => {
    const loadInitialSlang = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const initialSlang = getRandomSlang();
        if (!initialSlang) {
          throw new Error('No slang data available');
        }
        
        setCurrentSlang(initialSlang);
      } catch (err) {
        console.error('Error loading slang:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialSlang();
  }, []);

  // Function to rotate to a new slang term
  const rotateSlang = async () => {
    try {
      setIsRotating(true);
      setError(null);
      
      // Add a slight delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newSlang = getRandomSlang();
      if (!newSlang) {
        throw new Error('Unable to load new slang');
      }
      
      // Ensure we don't show the same slang twice in a row
      if (currentSlang && newSlang.slang === currentSlang.slang) {
        const anotherSlang = getRandomSlang();
        if (anotherSlang) {
          setCurrentSlang(anotherSlang);
        } else {
          setCurrentSlang(newSlang); // Fallback to the same slang if no alternatives
        }
      } else {
        setCurrentSlang(newSlang);
      }
    } catch (err) {
      console.error('Error rotating slang:', err);
      setError(err.message);
    } finally {
      setIsRotating(false);
    }
  };

  // Auto-rotation every 30 seconds (optional feature)
  useEffect(() => {
    if (!currentSlang || error) return;
    
    const interval = setInterval(() => {
      rotateSlang();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [currentSlang, error]);

  // Handle retry from error state
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setCurrentSlang(null);
    
    // Retry loading
    setTimeout(() => {
      try {
        const initialSlang = getRandomSlang();
        if (!initialSlang) {
          throw new Error('No slang data available');
        }
        setCurrentSlang(initialSlang);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton type="slang-of-the-day" />;
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <ErrorFallback
          type="error"
          title="Slang Loading Failed"
          message={`Unable to load today's slang: ${error}`}
          onRetry={handleRetry}
          showCulturalTouch={true}
        />
      </div>
    );
  }

  // No data state
  if (!currentSlang) {
    return (
      <div className="max-w-md mx-auto">
        <ErrorFallback
          type="warning"
          title="No Slang Available"
          message="No slang data found. Please check back later."
          onRetry={handleRetry}
          showCulturalTouch={true}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-kolkata-yellow">
      {/* Header */}
      <div className="bg-kolkata-yellow p-4 text-center">
        <BengaliHeader 
          bengaliText="আজকের বলি"
          englishText="Slang of the Day"
          level="h3"
          className="text-xl font-bold"
          textColorOverride="text-black"
        />
      </div>

      {/* Content */}
      <div className={`p-6 transition-opacity duration-300 ${isRotating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Featured Slang Term */}
        <div className="text-center mb-4">
          <h4 className="text-3xl font-bold text-kolkata-red mb-2">
            {currentSlang.slang}
          </h4>
          <p className="text-lg text-gray-600 italic">
            "{currentSlang.meaning}"
          </p>
        </div>

        {/* Cultural Context */}
        <div className="mb-4">
          <h5 className="font-semibold text-kolkata-red mb-2 text-sm uppercase tracking-wide">
            Cultural Context
          </h5>
          <p className="text-gray-700 text-sm leading-relaxed">
            {currentSlang.context}
          </p>
        </div>

        {/* Usage Example */}
        <div className="mb-6">
          <h5 className="font-semibold text-kolkata-red mb-2 text-sm uppercase tracking-wide">
            Usage Example
          </h5>
          <div className="bg-kolkata-white p-3 rounded-lg border-l-4 border-kolkata-yellow">
            <p className="text-gray-800 italic">
              "{currentSlang.example}"
            </p>
          </div>
        </div>

        {/* Rotation Button */}
        <div className="text-center">
          <button
            onClick={rotateSlang}
            disabled={isRotating}
            className="px-4 py-2 bg-kolkata-red text-white font-medium rounded-lg hover:bg-red-600 active:bg-red-700 focus:ring-2 focus:ring-kolkata-red focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm"
          >
            {isRotating ? 'Loading...' : 'New Slang'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 text-center">
        <p className="text-xs text-gray-500">
          Authentic Kolkata slang • Cultural context included
        </p>
      </div>
    </div>
  );
};

export default SlangOfTheDay;