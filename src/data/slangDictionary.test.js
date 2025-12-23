/**
 * Property-based tests for slang dictionary integrity
 * Feature: kolkata-local-guide, Property 1: Slang dictionary exclusivity
 * Validates: Requirements 1.2, 4.1
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { 
  slangDictionary, 
  findSlangByMeaning, 
  getAllSlangTerms, 
  getRandomSlang 
} from './slangDictionary.js';

describe('Slang Dictionary Property Tests', () => {
  
  /**
   * Feature: kolkata-local-guide, Property 1: Slang dictionary exclusivity
   * For any English input that receives a translation, the returned slang term 
   * must exist in the Kolkata_Slang dictionary from Product_Data
   */
  it('should only return slang terms that exist in the dictionary', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (englishInput) => {
          const result = findSlangByMeaning(englishInput);
          
          // If a translation is found, it must be from our dictionary
          if (result !== null) {
            const allSlangTerms = getAllSlangTerms();
            expect(allSlangTerms).toContain(result.slang);
            
            // Verify the result has the required structure
            expect(result).toHaveProperty('slang');
            expect(result).toHaveProperty('meaning');
            expect(result).toHaveProperty('context');
            expect(result).toHaveProperty('example');
            
            // Verify all properties are strings
            expect(typeof result.slang).toBe('string');
            expect(typeof result.meaning).toBe('string');
            expect(typeof result.context).toBe('string');
            expect(typeof result.example).toBe('string');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: All dictionary entries must have required structure
   * Validates that every entry in the slang dictionary has the correct format
   */
  it('should have all dictionary entries with required structure', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slangDictionary.length - 1 }),
        (index) => {
          const entry = slangDictionary[index];
          
          // Each entry must have all required fields
          expect(entry).toHaveProperty('slang');
          expect(entry).toHaveProperty('meaning');
          expect(entry).toHaveProperty('context');
          expect(entry).toHaveProperty('example');
          
          // All fields must be non-empty strings
          expect(typeof entry.slang).toBe('string');
          expect(typeof entry.meaning).toBe('string');
          expect(typeof entry.context).toBe('string');
          expect(typeof entry.example).toBe('string');
          
          expect(entry.slang.trim()).not.toBe('');
          expect(entry.meaning.trim()).not.toBe('');
          expect(entry.context.trim()).not.toBe('');
          expect(entry.example.trim()).not.toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Random slang selection always returns valid dictionary entry
   * Validates that getRandomSlang always returns a valid entry from the dictionary
   */
  it('should always return valid dictionary entry for random slang', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }), // Run multiple times
        () => {
          const randomSlang = getRandomSlang();
          const allSlangTerms = getAllSlangTerms();
          
          // Random slang must be from our dictionary
          expect(allSlangTerms).toContain(randomSlang.slang);
          
          // Must have correct structure
          expect(randomSlang).toHaveProperty('slang');
          expect(randomSlang).toHaveProperty('meaning');
          expect(randomSlang).toHaveProperty('context');
          expect(randomSlang).toHaveProperty('example');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Dictionary completeness - all entries from product.md are present
   * Validates that we have all the slang terms from the original product.md
   */
  it('should contain all slang terms from product.md', () => {
    const expectedSlangTerms = [
      'Lyadh', 'Aantel', 'Byapar', 'Khub Bhalo', 'Jhamela', 'Dada', 'Didi'
    ];
    
    const actualSlangTerms = getAllSlangTerms();
    
    expectedSlangTerms.forEach(expectedTerm => {
      expect(actualSlangTerms).toContain(expectedTerm);
    });
    
    // Verify we have exactly the expected number of terms
    expect(actualSlangTerms).toHaveLength(expectedSlangTerms.length);
  });
});