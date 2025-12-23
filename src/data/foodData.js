/**
 * Kolkata Street Food Intelligence (The "Pet-Pujo")
 * Extracted from product.md - Section 3: Street Food Intelligence
 * 
 * Data structure: { name, description, bestSpots, category, culturalNote }
 * Requirements: 2.2, 2.3, 4.2
 */

export const foodData = [
  {
    name: "Phuchka",
    description: "Spicy mashed potato, tamarind water with gondhoraj lebu",
    bestSpots: ["Vardaan Market", "Vivekananda Park"],
    category: "Must-Try Items",
    culturalNote: "Not Golgappa/Pani Puri - this is the authentic Kolkata version with gondhoraj lebu (a special lime)"
  },
  {
    name: "Kathi Roll",
    description: "Skewered meat wrapped in paratha",
    bestSpots: ["Nizam's", "Kusum Rolls (Park Street)"],
    category: "Must-Try Items", 
    culturalNote: "Originated in Kolkata, this is the original version of what's now popular across India"
  },
  {
    name: "Jhalmuri",
    description: "Spicy puffed rice snack",
    bestSpots: ["Outside any local railway station"],
    category: "Must-Try Items",
    culturalNote: "A quintessential Kolkata street snack, perfect for evening adda sessions"
  },
  {
    name: "Mishti Doi",
    description: "Sweet yogurt dessert",
    bestSpots: ["K.C. Das", "Balaram Mullick"],
    category: "Must-Try Items",
    culturalNote: "Traditional Bengali sweet, served in earthen pots for authentic flavor"
  },
  {
    name: "Rosogolla",
    description: "Spongy cottage cheese balls in sugar syrup",
    bestSpots: ["K.C. Das", "Balaram Mullick"],
    category: "Must-Try Items",
    culturalNote: "The pride of Bengal - originated in Kolkata and is a UNESCO recognized heritage sweet"
  }
];

/**
 * Get food items by category
 * @param {string} category - Food category to filter by
 * @returns {array} - Array of food items in the specified category
 */
export const getFoodByCategory = (category) => {
  return foodData.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get all food categories
 * @returns {string[]} - Array of unique categories
 */
export const getAllCategories = () => {
  const categories = foodData.map(item => item.category);
  return [...new Set(categories)];
};

/**
 * Find food by name (case-insensitive)
 * @param {string} foodName - Name of the food item
 * @returns {object|null} - Food item object or null if not found
 */
export const findFoodByName = (foodName) => {
  return foodData.find(item => 
    item.name.toLowerCase() === foodName.toLowerCase()
  ) || null;
};

/**
 * Get all food names
 * @returns {string[]} - Array of all food names
 */
export const getAllFoodNames = () => {
  return foodData.map(item => item.name);
};

/**
 * Get foods by best spot location
 * @param {string} location - Location to search for
 * @returns {array} - Array of food items available at the location
 */
export const getFoodByLocation = (location) => {
  return foodData.filter(item => 
    item.bestSpots.some(spot => 
      spot.toLowerCase().includes(location.toLowerCase())
    )
  );
};

/**
 * Get random food item for featured display
 * @returns {object} - Random food item
 */
export const getRandomFood = () => {
  const randomIndex = Math.floor(Math.random() * foodData.length);
  return foodData[randomIndex];
};

/**
 * Validate that food names use authentic Kolkata terminology
 * @param {string} foodName - Food name to validate
 * @returns {boolean} - True if authentic, false otherwise
 */
export const isAuthenticTerminology = (foodName) => {
  const authenticNames = getAllFoodNames();
  return authenticNames.includes(foodName);
};

export default foodData;