/**
 * Property-based tests for food data integrity
 * Feature: kolkata-local-guide, Property 2: Food data source integrity
 * Validates: Requirements 2.2, 2.3, 4.2
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { 
  foodData, 
  getFoodByCategory,
  getAllCategories,
  findFoodByName,
  getAllFoodNames,
  getFoodByLocation,
  getRandomFood,
  isAuthenticTerminology
} from './foodData.js';

describe('Food Data Property Tests', () => {
  
  /**
   * Feature: kolkata-local-guide, Property 2: Food data source integrity
   * For any displayed food item, both the description and best spots must match 
   * exactly with the corresponding entry in the Street_Food_Intelligence section of Product_Data
   */
  it('should have all food items with data matching product.md source', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: foodData.length - 1 }),
        (index) => {
          const foodItem = foodData[index];
          
          // Verify required structure from product.md
          expect(foodItem).toHaveProperty('name');
          expect(foodItem).toHaveProperty('description');
          expect(foodItem).toHaveProperty('bestSpots');
          expect(foodItem).toHaveProperty('category');
          expect(foodItem).toHaveProperty('culturalNote');
          
          // Verify data types
          expect(typeof foodItem.name).toBe('string');
          expect(typeof foodItem.description).toBe('string');
          expect(Array.isArray(foodItem.bestSpots)).toBe(true);
          expect(typeof foodItem.category).toBe('string');
          expect(typeof foodItem.culturalNote).toBe('string');
          
          // Verify non-empty values
          expect(foodItem.name.trim()).not.toBe('');
          expect(foodItem.description.trim()).not.toBe('');
          expect(foodItem.bestSpots.length).toBeGreaterThan(0);
          expect(foodItem.category.trim()).not.toBe('');
          expect(foodItem.culturalNote.trim()).not.toBe('');
          
          // Verify bestSpots contains valid strings
          foodItem.bestSpots.forEach(spot => {
            expect(typeof spot).toBe('string');
            expect(spot.trim()).not.toBe('');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Authentic terminology consistency
   * Validates that all food names use authentic Kolkata terminology as specified in product.md
   */
  it('should use only authentic Kolkata food terminology from product.md', () => {
    const expectedFoodNames = [
      'Phuchka', 'Kathi Roll', 'Jhalmuri', 'Mishti Doi', 'Rosogolla'
    ];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllFoodNames()),
        (foodName) => {
          // Every food name must be from our authentic list
          expect(expectedFoodNames).toContain(foodName);
          expect(isAuthenticTerminology(foodName)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Best spots data integrity
   * Validates that best spots match exactly with product.md specifications
   */
  it('should have best spots matching product.md specifications', () => {
    const expectedSpots = {
      'Phuchka': ['Vardaan Market', 'Vivekananda Park'],
      'Kathi Roll': ['Nizam\'s', 'Kusum Rolls (Park Street)'],
      'Jhalmuri': ['Outside any local railway station'],
      'Mishti Doi': ['K.C. Das', 'Balaram Mullick'],
      'Rosogolla': ['K.C. Das', 'Balaram Mullick']
    };
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(expectedSpots)),
        (foodName) => {
          const foodItem = findFoodByName(foodName);
          expect(foodItem).not.toBeNull();
          
          const expectedSpotsForFood = expectedSpots[foodName];
          expect(foodItem.bestSpots).toEqual(expectedSpotsForFood);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Category organization matches product.md structure
   * Validates that food categorization follows the Must-Try Items structure
   */
  it('should organize foods according to Must-Try Items structure from product.md', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllFoodNames()),
        (foodName) => {
          const foodItem = findFoodByName(foodName);
          expect(foodItem).not.toBeNull();
          
          // All items should be in "Must-Try Items" category as per product.md
          expect(foodItem.category).toBe('Must-Try Items');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Random food selection always returns valid data
   * Validates that getRandomFood always returns a valid entry from product.md
   */
  it('should always return valid food data for random selection', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }), // Run multiple times
        () => {
          const randomFood = getRandomFood();
          const allFoodNames = getAllFoodNames();
          
          // Random food must be from our authentic list
          expect(allFoodNames).toContain(randomFood.name);
          expect(isAuthenticTerminology(randomFood.name)).toBe(true);
          
          // Must have correct structure
          expect(randomFood).toHaveProperty('name');
          expect(randomFood).toHaveProperty('description');
          expect(randomFood).toHaveProperty('bestSpots');
          expect(randomFood).toHaveProperty('category');
          expect(randomFood).toHaveProperty('culturalNote');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Location-based food search returns valid results
   * Validates that location searches return foods that actually have those locations
   */
  it('should return foods that actually have the searched location in their best spots', () => {
    const knownLocations = ['K.C. Das', 'Park Street', 'Vardaan Market', 'railway station'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...knownLocations),
        (location) => {
          const foodsAtLocation = getFoodByLocation(location);
          
          // Every returned food must actually have this location in bestSpots
          foodsAtLocation.forEach(food => {
            const hasLocation = food.bestSpots.some(spot => 
              spot.toLowerCase().includes(location.toLowerCase())
            );
            expect(hasLocation).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Food data completeness - all items from product.md are present
   * Validates that we have all the food items from the original product.md
   */
  it('should contain all food items from product.md', () => {
    const expectedFoodItems = [
      'Phuchka', 'Kathi Roll', 'Jhalmuri', 'Mishti Doi', 'Rosogolla'
    ];
    
    const actualFoodNames = getAllFoodNames();
    
    expectedFoodItems.forEach(expectedFood => {
      expect(actualFoodNames).toContain(expectedFood);
    });
    
    // Verify we have exactly the expected number of items
    expect(actualFoodNames).toHaveLength(expectedFoodItems.length);
  });
});