/**
 * Property-based tests for FoodCard component
 * Feature: kolkata-local-guide, Property 7: Authentic terminology consistency
 * Validates: Requirements 2.4
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import FoodCard from './FoodCard';
import { foodData, getAllFoodNames, isAuthenticTerminology } from '../../data/foodData.js';

describe('FoodCard Property Tests', () => {
  
  afterEach(() => {
    cleanup();
  });
  
  /**
   * Feature: kolkata-local-guide, Property 7: Authentic terminology consistency
   * For any food item name displayed, it must use the authentic Kolkata terminology 
   * as specified in Product_Data (e.g., "Phuchka" not "Golgappa")
   */
  it('should display only authentic Kolkata food terminology from product.md', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...foodData),
        (foodItem) => {
          // Render the FoodCard with the food item
          const { unmount } = render(<FoodCard food={foodItem} />);
          
          // Verify the displayed name uses authentic terminology
          const displayedName = screen.getByRole('heading', { level: 3 });
          expect(displayedName).toBeInTheDocument();
          
          const foodName = displayedName.textContent;
          
          // The displayed name must be authentic Kolkata terminology
          expect(isAuthenticTerminology(foodName)).toBe(true);
          
          // Verify it's from our approved list from product.md
          const authenticNames = getAllFoodNames();
          expect(authenticNames).toContain(foodName);
          
          // Specific checks for authentic terminology vs common alternatives
          if (foodName === 'Phuchka') {
            // The cultural note should clarify it's not Golgappa/Pani Puri
            // but the heading itself should only show "Phuchka"
            expect(foodName).toBe('Phuchka');
            expect(foodName).not.toContain('Golgappa');
            expect(foodName).not.toContain('Pani Puri');
          }
          
          // Cleanup for next iteration
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Food names in FoodCard match exactly with foodData source
   * Validates that FoodCard displays names exactly as they appear in the data source
   */
  it('should display food names exactly as they appear in the authentic data source', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: foodData.length - 1 }),
        (index) => {
          const foodItem = foodData[index];
          
          const { unmount } = render(<FoodCard food={foodItem} />);
          
          // The displayed name must match exactly with the source data
          const displayedName = screen.getByRole('heading', { level: 3 });
          expect(displayedName.textContent).toBe(foodItem.name);
          
          // Verify the name is from our authentic terminology list
          expect(isAuthenticTerminology(foodItem.name)).toBe(true);
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Cultural notes preserve authentic terminology
   * Validates that cultural notes maintain authentic terminology references
   */
  it('should preserve authentic terminology in cultural notes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...foodData.filter(item => item.culturalNote)),
        (foodItem) => {
          const { unmount, container } = render(<FoodCard food={foodItem} />);
          
          // Find the cultural note text using container query
          const culturalNoteElement = container.querySelector('p.text-sm.text-gray-500.italic');
          expect(culturalNoteElement).toBeTruthy();
          
          const culturalNoteText = culturalNoteElement.textContent;
          
          // Verify cultural note contains the expected content from product.md
          expect(culturalNoteText).toContain('Cultural Note:');
          expect(culturalNoteText).toContain(foodItem.culturalNote);
          
          // If the cultural note mentions alternative names, 
          // it should clarify the authentic terminology
          if (foodItem.name === 'Phuchka') {
            // Should mention it's not Golgappa/Pani Puri
            expect(culturalNoteText).toMatch(/Not Golgappa/);
            expect(culturalNoteText).toMatch(/authentic Kolkata version/);
          }
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});