import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import BengaliHeader from './BengaliHeader';

describe('Visual Palette Consistency Property Tests', () => {
  /**
   * **Feature: kolkata-local-guide, Property 10: Visual palette consistency**
   * For any interactive element providing visual feedback, the colors used must be from the specified Visual_Palette
   * (Yellow Taxi #fcdb03, Terracotta Red, Vintage Off-White)
   * **Validates: Requirements 3.5**
   */
  it('should use Kolkata color palette for all visual elements', () => {
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
          
          const headerElement = container.querySelector(level);
          expect(headerElement).toBeTruthy();
          
          // Check that the header has Kolkata color classes
          const headerClasses = headerElement.className;
          
          // Should contain yellow taxi color class
          expect(headerClasses).toMatch(/text-kolkata-yellow|text-yellow-taxi/);
          
          // Check separator color (should be terracotta red)
          const separator = headerElement.querySelector('span.text-kolkata-red');
          if (bengaliText && englishText) {
            expect(separator).toBeTruthy();
            expect(separator.textContent).toBe('|');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should apply consistent color scheme across different header levels', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.constantFrom('h1', 'h2', 'h3', 'h4', 'h5', 'h6'),
        (bengaliText, englishText, level) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText={bengaliText}
              englishText={englishText}
              level={level}
            />
          );
          
          const headerElement = container.querySelector(level);
          const computedStyle = window.getComputedStyle(headerElement);
          
          // The element should have consistent styling regardless of header level
          expect(headerElement.className).toContain('font-bold');
          expect(headerElement.className).toMatch(/text-kolkata-yellow|text-yellow-taxi/);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain color consistency with custom class names', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.string({ minLength: 0, maxLength: 50 }), // custom className
        (bengaliText, englishText, customClassName) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText={bengaliText}
              englishText={englishText}
              className={customClassName}
            />
          );
          
          const headerElement = container.querySelector('h1');
          const headerClasses = headerElement.className;
          
          // Should always include base Kolkata colors regardless of custom classes
          expect(headerClasses).toMatch(/text-kolkata-yellow|text-yellow-taxi/);
          expect(headerClasses).toContain('font-bold');
          
          // Should also include custom classes if provided
          if (customClassName.trim()) {
            expect(headerClasses).toContain(customClassName);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use Bengali font family for Bengali text spans', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 30 }),
        (bengaliText, englishText) => {
          const { container } = render(
            <BengaliHeader 
              bengaliText={bengaliText}
              englishText={englishText}
            />
          );
          
          const bengaliSpan = container.querySelector('span[lang="bn"]');
          expect(bengaliSpan).toBeTruthy();
          
          // Should have Bengali font family class
          expect(bengaliSpan.className).toContain('font-bengali');
        }
      ),
      { numRuns: 100 }
    );
  });
});