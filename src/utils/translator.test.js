/**
 * Property-Based Tests for Translation Utility Functions
 * Feature: kolkata-local-guide
 * Requirements: 1.3, 1.4, 1.5
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  translateToSlang, 
  getTranslationWithContext, 
  findExactMatch,
  findClosestSuggestions,
  validateSlangTerm 
} from './translator.js';
import { slangDictionary } from '../data/slangDictionary.js';

describe('Translation Utility Functions - Property Tests', () => {
  
  /**
   * Property 4: Translation completeness
   * Feature: kolkata-local-guide, Property 4: Translation completeness
   * Validates: Requirements 1.3
   */
  it('Property 4: Translation completeness - any slang translation displayed must include both cultural context and meaning', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...slangDictionary.map(item => item.meaning)),
        (englishInput) => {
          const result = getTranslationWithContext(englishInput);
          
          // If translation is successful and has exact match
          if (result.success && result.exactMatch) {
            expect(result.culturalContext).toBeDefined();
            expect(result.culturalContext.meaning).toBeDefined();
            expect(result.culturalContext.context).toBeDefined();
            expect(result.culturalContext.slang).toBeDefined();
            expect(result.culturalContext.example).toBeDefined();
            
            // Verify the cultural context includes both meaning and context
            expect(typeof result.culturalContext.meaning).toBe('string');
            expect(typeof result.culturalContext.context).toBe('string');
            expect(result.culturalContext.meaning.length).toBeGreaterThan(0);
            expect(result.culturalContext.context.length).toBeGreaterThan(0);
          }
          
          // If translation has suggestions
          if (result.success && result.suggestions && result.suggestions.length > 0) {
            expect(result.culturalContext).toBeDefined();
            expect(Array.isArray(result.culturalContext)).toBe(true);
            
            result.culturalContext.forEach(context => {
              expect(context.meaning).toBeDefined();
              expect(context.context).toBeDefined();
              expect(context.slang).toBeDefined();
              expect(context.example).toBeDefined();
              
              expect(typeof context.meaning).toBe('string');
              expect(typeof context.context).toBe('string');
              expect(context.meaning.length).toBeGreaterThan(0);
              expect(context.context.length).toBeGreaterThan(0);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Fallback translation validity  
   * Feature: kolkata-local-guide, Property 5: Fallback translation validity
   * Validates: Requirements 1.4
   */
  it('Property 5: Fallback translation validity - any English input without direct match must suggest valid dictionary entries', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        (englishInput) => {
          const result = translateToSlang(englishInput);
          
          // If no exact match but suggestions are provided
          if (result.success && !result.exactMatch && result.suggestions.length > 0) {
            result.suggestions.forEach(suggestion => {
              // Each suggestion must be a valid entry from the slang dictionary
              const isValidEntry = slangDictionary.some(dictEntry => 
                dictEntry.slang === suggestion.slang &&
                dictEntry.meaning === suggestion.meaning &&
                dictEntry.context === suggestion.context &&
                dictEntry.example === suggestion.example
              );
              
              expect(isValidEntry).toBe(true);
              
              // Each suggestion must have required fields
              expect(suggestion.slang).toBeDefined();
              expect(suggestion.meaning).toBeDefined();
              expect(suggestion.context).toBeDefined();
              expect(suggestion.example).toBeDefined();
              
              // Each suggestion must have a similarity score
              expect(suggestion.similarity).toBeDefined();
              expect(typeof suggestion.similarity).toBe('number');
              expect(suggestion.similarity).toBeGreaterThan(0);
              expect(suggestion.similarity).toBeLessThanOrEqual(1);
            });
            
            // Must include appropriate explanation
            expect(result.message).toBeDefined();
            expect(typeof result.message).toBe('string');
            expect(result.message.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Translation display format
   * Feature: kolkata-local-guide, Property 6: Translation display format  
   * Validates: Requirements 1.5
   */
  it('Property 6: Translation display format - any slang translation shown must include both slang term and contextual usage example', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...slangDictionary.map(item => item.meaning)),
        (englishInput) => {
          const result = getTranslationWithContext(englishInput);
          
          // If translation is successful with exact match
          if (result.success && result.exactMatch) {
            expect(result.culturalContext.slang).toBeDefined();
            expect(result.culturalContext.example).toBeDefined();
            expect(result.culturalContext.usage).toBeDefined();
            
            // Verify slang term is displayed
            expect(typeof result.culturalContext.slang).toBe('string');
            expect(result.culturalContext.slang.length).toBeGreaterThan(0);
            
            // Verify contextual usage example is displayed
            expect(typeof result.culturalContext.example).toBe('string');
            expect(result.culturalContext.example.length).toBeGreaterThan(0);
            
            // Verify usage instruction includes the example
            expect(result.culturalContext.usage).toContain(result.culturalContext.example);
          }
          
          // If translation has suggestions
          if (result.success && result.suggestions && result.suggestions.length > 0) {
            result.culturalContext.forEach(context => {
              expect(context.slang).toBeDefined();
              expect(context.example).toBeDefined();
              expect(context.usage).toBeDefined();
              
              // Verify slang term is displayed
              expect(typeof context.slang).toBe('string');
              expect(context.slang.length).toBeGreaterThan(0);
              
              // Verify contextual usage example is displayed
              expect(typeof context.example).toBe('string');
              expect(context.example.length).toBeGreaterThan(0);
              
              // Verify usage instruction includes the example
              expect(context.usage).toContain(context.example);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

});

describe('Translation Utility Functions - Unit Tests', () => {
  
  it('should handle empty or invalid input gracefully', () => {
    expect(translateToSlang('')).toEqual({
      success: false,
      error: 'Please enter a valid English expression',
      exactMatch: null,
      suggestions: []
    });
    
    expect(translateToSlang(null)).toEqual({
      success: false,
      error: 'Please enter a valid English expression',
      exactMatch: null,
      suggestions: []
    });
    
    expect(translateToSlang(undefined)).toEqual({
      success: false,
      error: 'Please enter a valid English expression',
      exactMatch: null,
      suggestions: []
    });
  });

  it('should find exact matches for known meanings', () => {
    const result = translateToSlang('Very Good');
    expect(result.success).toBe(true);
    expect(result.exactMatch).toBeDefined();
    expect(result.exactMatch.slang).toBe('Khub Bhalo');
  });

  it('should provide suggestions when no exact match exists', () => {
    const result = translateToSlang('feeling lazy');
    expect(result.success).toBe(true);
    expect(result.suggestions.length).toBeGreaterThan(0);
    expect(result.matchType).toBe('suggestion');
  });

  it('should validate slang terms correctly', () => {
    expect(validateSlangTerm('Lyadh')).toBe(true);
    expect(validateSlangTerm('NonexistentSlang')).toBe(false);
    expect(validateSlangTerm('')).toBe(false);
    expect(validateSlangTerm(null)).toBe(false);
  });

});