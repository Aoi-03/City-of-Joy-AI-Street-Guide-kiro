/**
 * Translation Utility Functions for Kolkata Slang
 * Requirements: 1.2, 1.4
 * 
 * Provides matching algorithms and fallback logic for translating
 * English expressions into authentic Kolkata slang
 */

import { slangDictionary } from '../data/slangDictionary.js';

/**
 * Calculate similarity score between two strings using simple word matching
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score (0-1)
 */
const calculateSimilarity = (str1, str2) => {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  
  let matches = 0;
  const totalWords = Math.max(words1.length, words2.length);
  
  words1.forEach(word => {
    if (words2.some(w => w.includes(word) || word.includes(w))) {
      matches++;
    }
  });
  
  return matches / totalWords;
};

/**
 * Find exact match for English input in slang dictionary
 * @param {string} englishInput - English expression to translate
 * @returns {object|null} - Exact match or null
 */
export const findExactMatch = (englishInput) => {
  if (!englishInput || typeof englishInput !== 'string') {
    return null;
  }
  
  const input = englishInput.toLowerCase().trim();
  
  return slangDictionary.find(item => 
    item.meaning.toLowerCase() === input ||
    item.meaning.toLowerCase().includes(input) ||
    item.context.toLowerCase().includes(input)
  ) || null;
};

/**
 * Find closest slang suggestions using similarity matching
 * @param {string} englishInput - English expression to translate
 * @param {number} maxSuggestions - Maximum number of suggestions (default: 3)
 * @returns {Array} - Array of suggestion objects with similarity scores
 */
export const findClosestSuggestions = (englishInput, maxSuggestions = 3) => {
  if (!englishInput || typeof englishInput !== 'string') {
    return [];
  }
  
  const input = englishInput.toLowerCase().trim();
  
  const suggestions = slangDictionary
    .map(item => ({
      ...item,
      similarity: Math.max(
        calculateSimilarity(input, item.meaning),
        calculateSimilarity(input, item.context),
        calculateSimilarity(input, item.example)
      )
    }))
    .filter(item => item.similarity > 0.05) // Lowered threshold for better matching
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxSuggestions);
    
  return suggestions;
};

/**
 * Main translation function with fallback logic
 * @param {string} englishInput - English expression to translate
 * @returns {object} - Translation result with match type and suggestions
 */
export const translateToSlang = (englishInput) => {
  if (!englishInput || typeof englishInput !== 'string' || !englishInput.trim()) {
    return {
      success: false,
      error: 'Please enter a valid English expression',
      exactMatch: null,
      suggestions: []
    };
  }
  
  // Try to find exact match first
  const exactMatch = findExactMatch(englishInput);
  
  if (exactMatch) {
    return {
      success: true,
      exactMatch,
      suggestions: [],
      matchType: 'exact'
    };
  }
  
  // If no exact match, find closest suggestions
  const suggestions = findClosestSuggestions(englishInput);
  
  if (suggestions.length > 0) {
    return {
      success: true,
      exactMatch: null,
      suggestions,
      matchType: 'suggestion',
      message: `No exact match found. Here are some related Kolkata expressions:`
    };
  }
  
  // If no suggestions found, return a helpful message
  return {
    success: false,
    exactMatch: null,
    suggestions: [],
    matchType: 'none',
    message: 'No matching Kolkata slang found. Try expressions related to feelings, situations, or common phrases.'
  };
};

/**
 * Get translation with cultural context
 * @param {string} englishInput - English expression to translate
 * @returns {object} - Translation with full cultural context
 */
export const getTranslationWithContext = (englishInput) => {
  const result = translateToSlang(englishInput);
  
  if (result.success && result.exactMatch) {
    return {
      ...result,
      culturalContext: {
        slang: result.exactMatch.slang,
        meaning: result.exactMatch.meaning,
        context: result.exactMatch.context,
        example: result.exactMatch.example,
        usage: `Try saying: "${result.exactMatch.example}"`
      }
    };
  }
  
  if (result.success && result.suggestions.length > 0) {
    return {
      ...result,
      culturalContext: result.suggestions.map(suggestion => ({
        slang: suggestion.slang,
        meaning: suggestion.meaning,
        context: suggestion.context,
        example: suggestion.example,
        usage: `Try saying: "${suggestion.example}"`,
        similarity: suggestion.similarity
      }))
    };
  }
  
  return result;
};

/**
 * Validate that a slang term exists in the dictionary
 * @param {string} slangTerm - Slang term to validate
 * @returns {boolean} - True if slang exists in dictionary
 */
export const validateSlangTerm = (slangTerm) => {
  if (!slangTerm || typeof slangTerm !== 'string') {
    return false;
  }
  
  return slangDictionary.some(item => 
    item.slang.toLowerCase() === slangTerm.toLowerCase()
  );
};

export default {
  translateToSlang,
  getTranslationWithContext,
  findExactMatch,
  findClosestSuggestions,
  validateSlangTerm
};