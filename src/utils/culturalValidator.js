/**
 * Cultural Authenticity Validation Utilities
 * Validates content against product.md cultural data
 * Requirements: 4.3, 4.4
 */

import { slangDictionary, getAllSlangTerms } from '../data/slangDictionary.js';
import { foodData, getAllFoodNames } from '../data/foodData.js';

// Reference data from product.md for validation
const AUTHENTIC_PRODUCT_DATA = {
  // Core Identity & Vibe from product.md Section 1
  coreIdentity: {
    atmosphere: ["Colonial architecture", "slow-paced trams", "artistic passion", "crowded but friendly streets"],
    visualPalette: ["#fcdb03", "terracotta red", "vintage off-white"],
    concepts: ["Adda", "tea-stall locations"]
  },
  
  // Slang Dictionary from product.md Section 2
  authenticSlang: [
    "Lyadh", "Aantel", "Byapar", "Khub Bhalo", "Jhamela", "Dada", "Didi"
  ],
  
  // Food Intelligence from product.md Section 3
  authenticFood: {
    names: ["Phuchka", "Kathi Roll", "Jhalmuri", "Mishti Doi", "Rosogolla"],
    terminology: {
      correct: "Phuchka",
      incorrect: ["Golgappa", "Pani Puri"]
    },
    locations: {
      sweets: ["K.C. Das", "Balaram Mullick"],
      rolls: ["Nizam's", "Kusum Rolls (Park Street)"],
      markets: ["Vardaan Market", "Vivekananda Park"],
      stations: ["Outside any local railway station"]
    }
  },
  
  // App Constraints from product.md Section 5
  constraints: {
    slangTranslation: true,
    foodPrioritization: {
      sweets: "Old Kolkata (North)",
      cafes: "Park Street (Central)"
    },
    bengaliScript: true
  }
};

/**
 * Validates if a slang term exists in the authentic Kolkata slang dictionary
 * @param {string} slangTerm - The slang term to validate
 * @returns {object} - Validation result with isValid and details
 */
export const validateSlangAuthenticity = (slangTerm) => {
  const authenticTerms = getAllSlangTerms();
  const isValid = authenticTerms.includes(slangTerm);
  
  return {
    isValid,
    term: slangTerm,
    source: isValid ? 'product.md Section 2: Kolkata Slang Dictionary' : null,
    message: isValid 
      ? `"${slangTerm}" is authentic Kolkata slang from product.md`
      : `"${slangTerm}" is not found in the authentic Kolkata slang dictionary`
  };
};

/**
 * Validates if a food name uses authentic Kolkata terminology
 * @param {string} foodName - The food name to validate
 * @returns {object} - Validation result with isValid and details
 */
export const validateFoodTerminology = (foodName) => {
  const authenticNames = getAllFoodNames();
  const isValid = authenticNames.includes(foodName);
  
  // Special check for common incorrect terminology
  const incorrectTerms = AUTHENTIC_PRODUCT_DATA.authenticFood.terminology.incorrect;
  const isIncorrectTerm = incorrectTerms.includes(foodName);
  
  return {
    isValid,
    foodName,
    source: isValid ? 'product.md Section 3: Street Food Intelligence' : null,
    message: isValid 
      ? `"${foodName}" uses authentic Kolkata terminology from product.md`
      : isIncorrectTerm 
        ? `"${foodName}" is incorrect terminology. Use "${AUTHENTIC_PRODUCT_DATA.authenticFood.terminology.correct}" instead`
        : `"${foodName}" is not found in the authentic Kolkata food list`,
    suggestion: isIncorrectTerm ? AUTHENTIC_PRODUCT_DATA.authenticFood.terminology.correct : null
  };
};

/**
 * Validates if a location is mentioned in product.md food recommendations
 * @param {string} location - The location to validate
 * @returns {object} - Validation result with isValid and details
 */
export const validateFoodLocation = (location) => {
  const allLocations = [
    ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.sweets,
    ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.rolls,
    ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.markets,
    ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.stations
  ];
  
  const isValid = allLocations.some(loc => 
    loc.toLowerCase().includes(location.toLowerCase()) ||
    location.toLowerCase().includes(loc.toLowerCase())
  );
  
  return {
    isValid,
    location,
    source: isValid ? 'product.md Section 3: Street Food Intelligence' : null,
    message: isValid 
      ? `"${location}" is an authentic location from product.md`
      : `"${location}" is not found in the authentic location recommendations`
  };
};

/**
 * Validates if visual colors match the authentic Kolkata palette
 * @param {string} color - The color to validate (hex, name, or CSS value)
 * @returns {object} - Validation result with isValid and details
 */
export const validateVisualPalette = (color) => {
  const authenticColors = AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette;
  const colorLower = color.toLowerCase();
  
  const isValid = authenticColors.some(authColor => 
    authColor.toLowerCase() === colorLower ||
    colorLower.includes(authColor.toLowerCase()) ||
    (colorLower.includes('yellow') && authColor.includes('#fcdb03')) ||
    (colorLower.includes('terracotta') && authColor.includes('terracotta')) ||
    (colorLower.includes('off-white') && authColor.includes('off-white'))
  );
  
  return {
    isValid,
    color,
    source: isValid ? 'product.md Section 1: Core Identity & Vibe' : null,
    message: isValid 
      ? `"${color}" matches the authentic Kolkata visual palette`
      : `"${color}" does not match the authentic Kolkata visual palette`,
    authenticPalette: authenticColors
  };
};

/**
 * Validates if content includes Bengali script alongside English (Constraint 3)
 * @param {string} headerText - The header text to validate
 * @returns {object} - Validation result with isValid and details
 */
export const validateBengaliScriptInclusion = (headerText) => {
  // Check for Bengali Unicode range (U+0980 to U+09FF)
  const bengaliRegex = /[\u0980-\u09FF]/;
  const hasBengali = bengaliRegex.test(headerText);
  
  return {
    isValid: hasBengali,
    headerText,
    source: 'product.md Section 5: App Feature Logic Constraint 3',
    message: hasBengali 
      ? 'Header includes Bengali script as required for cultural authenticity'
      : 'Header missing Bengali script - Constraint 3 requires Bengali alongside English',
    requirement: 'Use Bengali script (Bangla) alongside English for all headers'
  };
};

/**
 * Comprehensive cultural authenticity validator
 * @param {object} content - Content object to validate
 * @param {string} content.type - Type of content ('slang', 'food', 'location', 'color', 'header')
 * @param {string} content.value - The value to validate
 * @returns {object} - Comprehensive validation result
 */
export const validateCulturalAuthenticity = (content) => {
  const { type, value } = content;
  
  switch (type) {
    case 'slang':
      return validateSlangAuthenticity(value);
    case 'food':
      return validateFoodTerminology(value);
    case 'location':
      return validateFoodLocation(value);
    case 'color':
      return validateVisualPalette(value);
    case 'header':
      return validateBengaliScriptInclusion(value);
    default:
      return {
        isValid: false,
        message: `Unknown content type: ${type}. Supported types: slang, food, location, color, header`
      };
  }
};

/**
 * Validates multiple content items at once
 * @param {array} contentItems - Array of content objects to validate
 * @returns {object} - Summary of validation results
 */
export const validateMultipleContent = (contentItems) => {
  const results = contentItems.map(validateCulturalAuthenticity);
  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.length - validCount;
  
  return {
    totalItems: results.length,
    validItems: validCount,
    invalidItems: invalidCount,
    isAllValid: invalidCount === 0,
    results,
    summary: `${validCount}/${results.length} items passed cultural authenticity validation`
  };
};

/**
 * Runtime check for cultural authenticity - throws error if validation fails
 * @param {object} content - Content to validate
 * @throws {Error} - If content fails cultural authenticity validation
 */
export const assertCulturalAuthenticity = (content) => {
  const result = validateCulturalAuthenticity(content);
  
  if (!result.isValid) {
    throw new Error(`Cultural Authenticity Violation: ${result.message}`);
  }
  
  return result;
};

export {
  validateSlangAuthenticity,
  validateFoodTerminology,
  validateFoodLocation,
  validateVisualPalette,
  validateBengaliScriptInclusion,
  validateCulturalAuthenticity,
  validateMultipleContent,
  assertCulturalAuthenticity,
  AUTHENTIC_PRODUCT_DATA
};