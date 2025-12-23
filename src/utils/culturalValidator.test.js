/**
 * Unit tests for Cultural Authenticity Validation Utilities
 * Tests validation functions against product.md data
 */

import { describe, it, expect } from 'vitest';
import {
  validateSlangAuthenticity,
  validateFoodTerminology,
  validateFoodLocation,
  validateVisualPalette,
  validateBengaliScriptInclusion,
  validateCulturalAuthenticity,
  validateMultipleContent,
  assertCulturalAuthenticity,
  AUTHENTIC_PRODUCT_DATA
} from './culturalValidator.js';

describe('Cultural Authenticity Validation', () => {
  describe('validateSlangAuthenticity', () => {
    it('should validate authentic Kolkata slang terms', () => {
      const result = validateSlangAuthenticity('Lyadh');
      expect(result.isValid).toBe(true);
      expect(result.term).toBe('Lyadh');
      expect(result.source).toContain('product.md');
    });

    it('should reject non-authentic slang terms', () => {
      const result = validateSlangAuthenticity('FakeSlang');
      expect(result.isValid).toBe(false);
      expect(result.source).toBe(null);
    });

    it('should validate all authentic slang terms from product.md', () => {
      const authenticTerms = ['Lyadh', 'Aantel', 'Byapar', 'Khub Bhalo', 'Jhamela', 'Dada', 'Didi'];
      
      authenticTerms.forEach(term => {
        const result = validateSlangAuthenticity(term);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('validateFoodTerminology', () => {
    it('should validate authentic Kolkata food names', () => {
      const result = validateFoodTerminology('Phuchka');
      expect(result.isValid).toBe(true);
      expect(result.source).toContain('product.md');
    });

    it('should reject incorrect terminology with suggestions', () => {
      const result = validateFoodTerminology('Golgappa');
      expect(result.isValid).toBe(false);
      expect(result.suggestion).toBe('Phuchka');
      expect(result.message).toContain('incorrect terminology');
    });

    it('should validate all authentic food names from product.md', () => {
      const authenticFoods = ['Phuchka', 'Kathi Roll', 'Jhalmuri', 'Mishti Doi', 'Rosogolla'];
      
      authenticFoods.forEach(food => {
        const result = validateFoodTerminology(food);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('validateFoodLocation', () => {
    it('should validate authentic food locations', () => {
      const result = validateFoodLocation('K.C. Das');
      expect(result.isValid).toBe(true);
      expect(result.source).toContain('product.md');
    });

    it('should handle partial location matches', () => {
      const result = validateFoodLocation('Park Street');
      expect(result.isValid).toBe(true);
    });

    it('should reject non-authentic locations', () => {
      const result = validateFoodLocation('Random Restaurant');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateVisualPalette', () => {
    it('should validate authentic Kolkata colors', () => {
      const result = validateVisualPalette('#fcdb03');
      expect(result.isValid).toBe(true);
      expect(result.source).toContain('product.md');
    });

    it('should validate color names', () => {
      const result = validateVisualPalette('terracotta red');
      expect(result.isValid).toBe(true);
    });

    it('should reject non-authentic colors', () => {
      const result = validateVisualPalette('#ff0000');
      expect(result.isValid).toBe(false);
      expect(result.authenticPalette).toBeDefined();
    });
  });

  describe('validateBengaliScriptInclusion', () => {
    it('should validate text with Bengali script', () => {
      const result = validateBengaliScriptInclusion('Home / হোম');
      expect(result.isValid).toBe(true);
      expect(result.source).toContain('product.md');
    });

    it('should reject text without Bengali script', () => {
      const result = validateBengaliScriptInclusion('Home');
      expect(result.isValid).toBe(false);
      expect(result.requirement).toContain('Bengali script');
    });
  });

  describe('validateCulturalAuthenticity', () => {
    it('should validate different content types', () => {
      const slangResult = validateCulturalAuthenticity({ type: 'slang', value: 'Lyadh' });
      expect(slangResult.isValid).toBe(true);

      const foodResult = validateCulturalAuthenticity({ type: 'food', value: 'Phuchka' });
      expect(foodResult.isValid).toBe(true);

      const colorResult = validateCulturalAuthenticity({ type: 'color', value: '#fcdb03' });
      expect(colorResult.isValid).toBe(true);
    });

    it('should handle unknown content types', () => {
      const result = validateCulturalAuthenticity({ type: 'unknown', value: 'test' });
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Unknown content type');
    });
  });

  describe('validateMultipleContent', () => {
    it('should validate multiple content items', () => {
      const contentItems = [
        { type: 'slang', value: 'Lyadh' },
        { type: 'food', value: 'Phuchka' },
        { type: 'color', value: '#fcdb03' }
      ];

      const result = validateMultipleContent(contentItems);
      expect(result.totalItems).toBe(3);
      expect(result.validItems).toBe(3);
      expect(result.invalidItems).toBe(0);
      expect(result.isAllValid).toBe(true);
    });

    it('should handle mixed valid and invalid content', () => {
      const contentItems = [
        { type: 'slang', value: 'Lyadh' },
        { type: 'food', value: 'Golgappa' },
        { type: 'color', value: '#ff0000' }
      ];

      const result = validateMultipleContent(contentItems);
      expect(result.totalItems).toBe(3);
      expect(result.validItems).toBe(1);
      expect(result.invalidItems).toBe(2);
      expect(result.isAllValid).toBe(false);
    });
  });

  describe('assertCulturalAuthenticity', () => {
    it('should pass for valid content', () => {
      expect(() => {
        assertCulturalAuthenticity({ type: 'slang', value: 'Lyadh' });
      }).not.toThrow();
    });

    it('should throw error for invalid content', () => {
      expect(() => {
        assertCulturalAuthenticity({ type: 'slang', value: 'FakeSlang' });
      }).toThrow('Cultural Authenticity Violation');
    });
  });

  describe('AUTHENTIC_PRODUCT_DATA', () => {
    it('should contain all required product.md data', () => {
      expect(AUTHENTIC_PRODUCT_DATA.coreIdentity).toBeDefined();
      expect(AUTHENTIC_PRODUCT_DATA.authenticSlang).toBeDefined();
      expect(AUTHENTIC_PRODUCT_DATA.authenticFood).toBeDefined();
      expect(AUTHENTIC_PRODUCT_DATA.constraints).toBeDefined();
    });

    it('should have correct visual palette', () => {
      expect(AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette).toContain('#fcdb03');
      expect(AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette).toContain('terracotta red');
      expect(AUTHENTIC_PRODUCT_DATA.coreIdentity.visualPalette).toContain('vintage off-white');
    });

    it('should have correct slang terms', () => {
      const expectedSlang = ['Lyadh', 'Aantel', 'Byapar', 'Khub Bhalo', 'Jhamela', 'Dada', 'Didi'];
      expectedSlang.forEach(term => {
        expect(AUTHENTIC_PRODUCT_DATA.authenticSlang).toContain(term);
      });
    });
  });
});