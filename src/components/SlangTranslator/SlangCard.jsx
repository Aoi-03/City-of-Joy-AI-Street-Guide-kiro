import React, { useState } from 'react';
import { getTranslationWithContext } from '../../utils/translator.js';
import BengaliHeader from '../Common/BengaliHeader.jsx';
import LoadingSkeleton from '../Common/LoadingSkeleton.jsx';
import ErrorFallback from '../Common/ErrorFallback.jsx';

/**
 * SlangCard Component - Interactive translation input and output interface
 * Requirements: 1.2, 1.3, 1.5
 * 
 * Features:
 * - Interactive input for English expressions
 * - Translation output with cultural context
 * - Usage examples display
 * - Kolkata visual theme integration
 */
const SlangCard = () => {
  const [englishInput, setEnglishInput] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    if (!englishInput.trim()) {
      setTranslationResult({
        success: false,
        error: 'Please enter an English expression to translate'
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setTranslationResult(null);
      
      // Get translation result
      const result = getTranslationWithContext(englishInput);
      
      if (!result) {
        throw new Error('Translation service unavailable');
      }
      
      // Small delay for better UX, but not in tests
      const delay = typeof window !== 'undefined' && window.location?.hostname !== 'localhost' ? 300 : 0;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      setTranslationResult(result);
    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message);
      setTranslationResult({
        success: false,
        error: 'Translation failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEnglishInput(e.target.value);
    // Clear previous results and errors when user starts typing
    if (translationResult || error) {
      setTranslationResult(null);
      setError(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  const handleRetry = () => {
    setError(null);
    handleTranslate();
  };

  const renderExactMatch = (culturalContext) => (
    <div className="bg-kolkata-white p-4 rounded-lg border-l-4 border-kolkata-yellow">
      <div className="mb-3">
        <span className="text-2xl font-bold text-kolkata-red">
          {culturalContext.slang}
        </span>
        <span className="ml-3 text-gray-600">
          ({culturalContext.meaning})
        </span>
      </div>
      
      <div className="mb-3">
        <h4 className="font-semibold text-kolkata-red mb-1">Cultural Context:</h4>
        <p className="text-gray-700 italic">
          {culturalContext.context}
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-semibold text-kolkata-red mb-1">Usage Example:</h4>
        <p className="text-gray-800 bg-yellow-50 p-2 rounded">
          "{culturalContext.example}"
        </p>
      </div>
      
      <div className="text-sm text-kolkata-red font-medium">
        {culturalContext.usage}
      </div>
    </div>
  );

  const renderSuggestions = (suggestions, message) => (
    <div className="space-y-4">
      {message && (
        <p className="text-kolkata-red font-medium mb-4">{message}</p>
      )}
      
      {suggestions.map((suggestion, index) => (
        <div key={index} className="bg-kolkata-white p-4 rounded-lg border border-gray-200">
          <div className="mb-2">
            <span className="text-xl font-bold text-kolkata-red">
              {suggestion.slang}
            </span>
            <span className="ml-2 text-gray-600">
              ({suggestion.meaning})
            </span>
          </div>
          
          <div className="mb-2">
            <p className="text-gray-700 text-sm italic">
              {suggestion.context}
            </p>
          </div>
          
          <div className="text-sm">
            <span className="font-medium text-kolkata-red">Example: </span>
            <span className="text-gray-800">"{suggestion.example}"</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderError = (error) => (
    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
      <p className="text-red-700">{error}</p>
    </div>
  );

  const renderNoResults = (message) => (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
      <p className="text-gray-600 mb-2">{message}</p>
      <p className="text-sm text-gray-500">
        Try expressions like "procrastination", "intellectual", "trouble", or "very good"
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <BengaliHeader 
          bengaliText="বলি"
          englishText="Slang Translator"
          level="h2"
          className="text-3xl mb-2"
        />
        <p className="text-gray-600">
          Translate your English feelings into authentic Kolkata slang
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label htmlFor="english-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter English Expression:
        </label>
        <div className="flex gap-3">
          <input
            id="english-input"
            type="text"
            value={englishInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., procrastination, trouble, very good..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kolkata-yellow focus:border-kolkata-yellow hover:border-kolkata-red transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <button
            onClick={handleTranslate}
            disabled={isLoading || !englishInput.trim()}
            className="px-6 py-2 bg-kolkata-yellow text-black font-medium rounded-lg hover:bg-yellow-400 active:bg-yellow-500 focus:ring-2 focus:ring-kolkata-yellow focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {isLoading && (
        <div className="mb-4">
          <LoadingSkeleton type="slang-card" />
        </div>
      )}

      {error && !isLoading && (
        <div className="mb-4">
          <ErrorFallback
            type="error"
            title="Translation Error"
            message={error}
            onRetry={handleRetry}
            showCulturalTouch={true}
          />
        </div>
      )}

      {translationResult && !isLoading && !error && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-kolkata-red mb-4">
            Translation Result:
          </h3>
          
          {translationResult.success ? (
            <>
              {translationResult.exactMatch && translationResult.culturalContext && (
                renderExactMatch(translationResult.culturalContext)
              )}
              
              {translationResult.suggestions && translationResult.suggestions.length > 0 && (
                renderSuggestions(translationResult.culturalContext, translationResult.message)
              )}
            </>
          ) : (
            <>
              {translationResult.error && renderError(translationResult.error)}
              {translationResult.message && renderNoResults(translationResult.message)}
            </>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 text-center mt-6">
        <p>
          All translations are sourced from authentic Kolkata slang dictionary. 
          Cultural context and usage examples included.
        </p>
      </div>
    </div>
  );
};

export default SlangCard;