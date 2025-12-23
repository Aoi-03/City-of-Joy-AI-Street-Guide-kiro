/**
 * Kolkata Slang Dictionary (The "Boli")
 * Extracted from product.md - Section 2: The Kolkata Slang Dictionary
 * 
 * Data structure: { slang, meaning, context, example }
 * Requirements: 1.2, 4.1
 */

export const slangDictionary = [
  {
    slang: "Lyadh",
    meaning: "Creative procrastination",
    context: "Essential Kolkata concept for a relaxed, unhurried approach to life",
    example: "I'm feeling lyadh today"
  },
  {
    slang: "Aantel",
    meaning: "Intellectual / Pretentious",
    context: "Someone who over-analyzes art or cinema",
    example: "Don't be so aantel about that movie"
  },
  {
    slang: "Byapar",
    meaning: "Matter / Affair",
    context: "Used to describe situations or matters, often sensitive ones",
    example: "Chhowa-chhowi byapar" // A touchy matter
  },
  {
    slang: "Khub Bhalo",
    meaning: "Very Good",
    context: "The standard positive response for everything in Kolkata",
    example: "How was the food? Khub bhalo!"
  },
  {
    slang: "Jhamela",
    meaning: "Trouble / Chaos",
    context: "Used when situations become complicated or crowded",
    example: "Used when the local bus is too crowded"
  },
  {
    slang: "Dada",
    meaning: "Brother",
    context: "Essential for calling any male on the street, shows respect",
    example: "Dada, taxi kothay pabo?" // Brother, where can I get a taxi?
  },
  {
    slang: "Didi",
    meaning: "Sister", 
    context: "Essential for calling any female on the street, shows respect",
    example: "Didi, ei rastata kothay jay?" // Sister, where does this road go?
  }
];

/**
 * Helper function to find slang by English meaning or context
 * @param {string} englishInput - English expression to translate
 * @returns {object|null} - Matching slang object or null
 */
export const findSlangByMeaning = (englishInput) => {
  const input = englishInput.toLowerCase().trim();
  
  return slangDictionary.find(item => 
    item.meaning.toLowerCase().includes(input) ||
    item.context.toLowerCase().includes(input) ||
    item.example.toLowerCase().includes(input)
  ) || null;
};

/**
 * Get all slang terms as an array
 * @returns {string[]} - Array of all slang terms
 */
export const getAllSlangTerms = () => {
  return slangDictionary.map(item => item.slang);
};

/**
 * Get random slang for "Slang of the Day" feature
 * @returns {object} - Random slang object
 */
export const getRandomSlang = () => {
  const randomIndex = Math.floor(Math.random() * slangDictionary.length);
  return slangDictionary[randomIndex];
};

export default slangDictionary;