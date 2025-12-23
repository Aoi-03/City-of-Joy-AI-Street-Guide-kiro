import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import BengaliHeader from './BengaliHeader';

describe('BengaliHeader Property Tests', () => {
  /**
   * **Feature: kolkata-local-guide, Property 9: Bengali header inclusion**
   * For any header text displayed, it must include both Bengali script and English text
   * **Validates: Requirements 3.2**
   */
  it('should always include both Bengali script and English text when both are provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }), // Bengali text
        fc.string({ minLength: 1, maxLength: 50 }), // English text
        fc.constantFrom('h1', 'h2', 'h3', 'h4', 'h5', 'h6'), // Header levels
        (bengaliText, englishText, level) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText={bengaliText}
              englishText={englishText}
              level={level}
            />
          );
          
          // Check that both Bengali and English text are present
          const headerElement = container.querySelector(level);
          expect(headerElement).toBeTruthy();
          
          // Check for Bengali text with lang attribute
          const bengaliSpan = headerElement.querySelector('span[lang="bn"]');
          expect(bengaliSpan).toBeTruthy();
          expect(bengaliSpan.textContent).toBe(bengaliText);
          
          // Check for English text with lang attribute
          const englishSpan = headerElement.querySelector('span[lang="en"]');
          expect(englishSpan).toBeTruthy();
          expect(englishSpan.textContent).toBe(englishText);
          
          // Check for separator between Bengali and English
          const separator = headerElement.textContent.includes('|');
          expect(separator).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle cases with only Bengali text', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }), // Bengali text
        (bengaliText) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText={bengaliText}
              englishText=""
            />
          );
          
          const headerElement = container.querySelector('h1');
          expect(headerElement).toBeTruthy();
          
          // Check for Bengali text
          const bengaliSpan = headerElement.querySelector('span[lang="bn"]');
          expect(bengaliSpan).toBeTruthy();
          expect(bengaliSpan.textContent).toBe(bengaliText);
          
          // Check that English span exists but is empty
          const englishSpan = headerElement.querySelector('span[lang="en"]');
          expect(englishSpan).toBeTruthy();
          expect(englishSpan.textContent).toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle cases with only English text', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }), // English text
        (englishText) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText=""
              englishText={englishText}
            />
          );
          
          const headerElement = container.querySelector('h1');
          expect(headerElement).toBeTruthy();
          
          // Check for English text
          const englishSpan = headerElement.querySelector('span[lang="en"]');
          expect(englishSpan).toBeTruthy();
          expect(englishSpan.textContent).toBe(englishText);
          
          // Check that Bengali span exists but is empty
          const bengaliSpan = headerElement.querySelector('span[lang="bn"]');
          expect(bengaliSpan).toBeTruthy();
          expect(bengaliSpan.textContent).toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });
});