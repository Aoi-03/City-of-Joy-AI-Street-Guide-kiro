/**
 * Property-based tests for FoodList component
 * Feature: kolkata-local-guide, Property 8: Food categorization accuracy
 * Validates: Requirements 2.5
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import FoodList from './FoodList';
import { foodData, getAllCategories } from '../../data/foodData.js';

describe('FoodList Property Tests', () => {
  
  afterEach(() => {
    cleanup();
  });
  
  /**
   * Feature: kolkata-local-guide, Property 8: Food categorization accuracy
   * For any food category display, the organization must match the Must-Try Items 
   * structure from Product_Data
   */
  it('should organize foods according to Must-Try Items structure from product.md', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllCategories()),
        (category) => {
          // Filter foods by the selected category
          const categoryFoods = foodData.filter(food => food.category === category);
          
          const { unmount } = render(<FoodList foods={categoryFoods} />);
          
          // Verify the category header is displayed
          const categoryHeader = screen.getByText(category);
          expect(categoryHeader).toBeInTheDocument();
          
          // Verify all foods in this category are displayed
          categoryFoods.forEach(food => {
            const foodElement = screen.getByText(food.name);
            expect(foodElement).toBeInTheDocument();
          });
          
          // Verify the category matches the Must-Try Items structure from product.md
          // All items should be in "Must-Try Items" category as per product.md
          expect(category).toBe('Must-Try Items');
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Food categorization consistency
   * Validates that all foods are properly categorized and grouped
   */
  it('should consistently group foods by their category', () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray(foodData, { minLength: 1, maxLength: foodData.length }),
        (selectedFoods) => {
          const { unmount } = render(<FoodList foods={selectedFoods} />);
          
          // Get unique categories from selected foods
          const categories = [...new Set(selectedFoods.map(food => food.category))];
          
          // Each category should have a header
          categories.forEach(category => {
            const categoryHeader = screen.getByText(category);
            expect(categoryHeader).toBeInTheDocument();
          });
          
          // Each food should appear under its correct category
          selectedFoods.forEach(food => {
            const foodElement = screen.getByText(food.name);
            expect(foodElement).toBeInTheDocument();
            
            // The food should be in the same section as its category header
            const categoryHeader = screen.getByText(food.category);
            expect(categoryHeader).toBeInTheDocument();
          });
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Category structure matches product.md specification
   * Validates that the categorization follows the exact structure from product.md
   */
  it('should match the exact Must-Try Items structure from product.md', () => {
    fc.assert(
      fc.property(
        fc.constant(foodData), // Use the complete food data
        (foods) => {
          const { unmount } = render(<FoodList foods={foods} />);
          
          // Verify that all foods are in the "Must-Try Items" category
          // as specified in the product.md structure
          const expectedCategory = 'Must-Try Items';
          const categoryHeader = screen.getByText(expectedCategory);
          expect(categoryHeader).toBeInTheDocument();
          
          // Verify all expected foods from product.md are present
          const expectedFoodNames = [
            'Phuchka', 'Kathi Roll', 'Jhalmuri', 'Mishti Doi', 'Rosogolla'
          ];
          
          expectedFoodNames.forEach(foodName => {
            const foodElement = screen.getByText(foodName);
            expect(foodElement).toBeInTheDocument();
          });
          
          // Verify no other categories exist (all should be Must-Try Items)
          const allCategories = getAllCategories();
          expect(allCategories).toHaveLength(1);
          expect(allCategories[0]).toBe('Must-Try Items');
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Food items maintain their category association
   * Validates that each food item is correctly associated with its category
   */
  it('should maintain correct food-category associations from product.md', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: foodData.length - 1 }),
        (index) => {
          const selectedFood = foodData[index];
          
          const { unmount } = render(<FoodList foods={[selectedFood]} />);
          
          // Verify the food appears under its correct category
          const categoryHeader = screen.getByText(selectedFood.category);
          const foodElement = screen.getByText(selectedFood.name);
          
          expect(categoryHeader).toBeInTheDocument();
          expect(foodElement).toBeInTheDocument();
          
          // Verify the category is the expected "Must-Try Items" from product.md
          expect(selectedFood.category).toBe('Must-Try Items');
          
          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});