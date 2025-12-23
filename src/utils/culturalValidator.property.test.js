/**
 * Property-based tests for Cultural Authenticity Validation
 * **Feature: kolkata-local-guide, Property 3: Cultural content authenticity**
 * **Validates: Requirements 4.3, 4.4**
 */

import { describe, it } from 'vitest';
import fc from 'fast-check';
import {
  validateCulturalAuthenticity,
  validateSlangAuthenticity,
  validateFoodTerminology,
  validateFoodLocation,
  validateVisualPalette,
  validateBengaliScriptInclusion,
  AUTHENTIC_PRODUCT_DATA
} from './culturalValidator.js';
import { slangDictionary, getAllSlangTerms } from '../data/slangDictionary.js';
import { foodData, getAllFoodNames } from '../data/foodData.js';

describe('Cultural Content Authenticity Properties', () => {
  /**
   * **Feature: kolkata-local-guide, Property 3: Cultural content authenticity**
   * For any cultural content displayed in the application, there must be a 
   * corresponding entry in Product_Data that validates the content's authenticity
   * **Validates: Requirements 4.3, 4.4**
   */
  it('Property 3: Cultural content authenticity - all authentic slang terms validate successfully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllSlangTerms()),
        (slangTerm) => {
          const result = validateSlangAuthenticity(slangTerm);
          
          // All authentic slang terms from product.md must validate as authentic
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md') &&
                 result.term === slangTerm;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - all authentic food names validate successfully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllFoodNames()),
        (foodName) => {
          const result = validateFoodTerminology(foodName);
          
          // All authentic food names from product.md must validate as authentic
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md') &&
                 result.foodName === foodName;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - all authentic locations validate successfully', () => {
    const allAuthenticLocations = [
      ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.sweets,
      ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.rolls,
      ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.markets,
      ...AUTHENTIC_PRODUCT_DATA.authenticFood.locations.stations
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...allAuthenticLocations),
        (location) => {
          const result = validateFoodLocation(location);
          
          // All authentic locations from product.md must validate as authentic
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - all authentic colors validate successfully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette),
        (color) => {
          const result = validateVisualPalette(color);
          
          // All authentic colors from product.md must validate as authentic
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - text with Bengali script validates successfully', () => {
    // Generator for text that includes Bengali script
    const bengaliTextGen = fc.string().map(englishText => {
      // Add some Bengali characters to make it valid
      const bengaliChars = ['হোম', 'খাবার', 'ভাষা', 'কলকাতা', 'বাংলা'];
      const randomBengali = bengaliChars[Math.floor(Math.random() * bengaliChars.length)];
      return `${englishText} / ${randomBengali}`;
    });

    fc.assert(
      fc.property(
        bengaliTextGen,
        (headerText) => {
          const result = validateBengaliScriptInclusion(headerText);
          
          // Text with Bengali script must validate as authentic
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - non-authentic slang terms fail validation', () => {
    // Generator for non-authentic slang terms (avoiding authentic ones)
    const nonAuthenticSlangGen = fc.string({ minLength: 1, maxLength: 20 })
      .filter(term => !getAllSlangTerms().includes(term));

    fc.assert(
      fc.property(
        nonAuthenticSlangGen,
        (fakeSlang) => {
          const result = validateSlangAuthenticity(fakeSlang);
          
          // Non-authentic slang terms must fail validation
          return result.isValid === false &&
                 result.source === null;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - non-authentic food names fail validation', () => {
    // Generator for non-authentic food names (avoiding authentic ones)
    const nonAuthenticFoodGen = fc.string({ minLength: 1, maxLength: 30 })
      .filter(food => !getAllFoodNames().includes(food));

    fc.assert(
      fc.property(
        nonAuthenticFoodGen,
        (fakeFood) => {
          const result = validateFoodTerminology(fakeFood);
          
          // Non-authentic food names must fail validation (unless it's a known incorrect term)
          const isKnownIncorrect = AUTHENTIC_PRODUCT_DATA.authenticFood.terminology.incorrect.includes(fakeFood);
          
          return result.isValid === false &&
                 (result.source === null || isKnownIncorrect);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - text without Bengali script fails validation', () => {
    // Generator for English-only text (no Bengali characters)
    const englishOnlyGen = fc.string({ minLength: 1, maxLength: 50 })
      .filter(text => !/[\u0980-\u09FF]/.test(text)); // Filter out Bengali characters

    fc.assert(
      fc.property(
        englishOnlyGen,
        (englishText) => {
          const result = validateBengaliScriptInclusion(englishText);
          
          // English-only text must fail Bengali script validation
          return result.isValid === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - comprehensive validation maintains consistency', () => {
    // Generator for mixed content types
    const contentGen = fc.oneof(
      fc.record({
        type: fc.constant('slang'),
        value: fc.constantFrom(...getAllSlangTerms())
      }),
      fc.record({
        type: fc.constant('food'),
        value: fc.constantFrom(...getAllFoodNames())
      }),
      fc.record({
        type: fc.constant('color'),
        value: fc.constantFrom(...AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette)
      })
    );

    fc.assert(
      fc.property(
        contentGen,
        (content) => {
          const result = validateCulturalAuthenticity(content);
          
          // All authentic content must validate successfully
          return result.isValid === true &&
                 result.source !== null &&
                 result.source.includes('product.md');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - data consistency between validator and source data', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...slangDictionary),
        (slangItem) => {
          const validationResult = validateSlangAuthenticity(slangItem.slang);
          
          // Validator must be consistent with source data
          return validationResult.isValid === true &&
                 AUTHENTIC_PRODUCT_DATA.authenticSlang.includes(slangItem.slang);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Cultural content authenticity - food data consistency between validator and source data', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...foodData),
        (foodItem) => {
          const validationResult = validateFoodTerminology(foodItem.name);
          
          // Validator must be consistent with source data
          return validationResult.isValid === true &&
                 AUTHENTIC_PRODUCT_DATA.authenticFood.names.includes(foodItem.name);
        }
      ),
      { numRuns: 100 }
    );
  });
});