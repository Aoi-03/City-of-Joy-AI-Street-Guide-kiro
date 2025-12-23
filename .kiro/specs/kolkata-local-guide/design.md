# Design Document

## Overview

The Local Guide is a React application that serves as an authentic cultural companion for Kolkata. The application features two primary components: a Slang Translator that converts English expressions into Kolkata slang, and a Food Map that showcases street food recommendations. The design emphasizes cultural authenticity by strictly adhering to the data provided in product.md, incorporating Bengali script, and using Kolkata's iconic visual palette.

## Architecture

The application follows a component-based React architecture with the following structure:

```
src/
├── components/
│   ├── SlangTranslator/
│   │   ├── SlangCard.jsx
│   │   └── SlangOfTheDay.jsx
│   ├── FoodMap/
│   │   ├── FoodCard.jsx
│   │   ├── FoodList.jsx
│   │   └── ViewToggle.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Navigation.jsx
│   └── Common/
│       └── BengaliHeader.jsx
├── data/
│   ├── slangDictionary.js
│   └── foodData.js
├── utils/
│   └── translator.js
└── styles/
    └── kolkata-theme.css
```

The application uses a single-page application (SPA) approach with component-based state management and Tailwind CSS for styling.

## Components and Interfaces

### SlangTranslator Component
- **SlangOfTheDay**: Displays a featured slang term with cultural context
- **SlangCard**: Interactive component for translating English expressions
- **Input Interface**: Text input for English expressions
- **Translation Output**: Displays Kolkata slang with context and usage examples

### FoodMap Component
- **FoodList**: List view of street food items with descriptions
- **FoodCard**: Card view displaying individual food items with locations
- **ViewToggle**: Switch between list and card views
- **LocationDisplay**: Shows "Best Spots" information from product.md

### Layout Components
- **Header**: Main navigation with Bengali script headers
- **BengaliHeader**: Reusable component for bilingual headers
- **Navigation**: Route management between slang and food sections

## Data Models

### Slang Dictionary Model
```javascript
{
  slang: string,           // Kolkata slang term
  meaning: string,         // English meaning
  context: string,         // Cultural context and usage
  example: string          // Usage example
}
```

### Food Item Model
```javascript
{
  name: string,            // Food item name (authentic terminology)
  description: string,     // Description from product.md
  bestSpots: string[],     // Array of recommended locations
  category: string,        // Food category
  culturalNote: string     // Additional cultural context
}
```

### Translation Request Model
```javascript
{
  englishInput: string,    // User's English expression
  suggestedSlang: string,  // Matched Kolkata slang
  confidence: number,      // Match confidence level
  alternatives: string[]   // Alternative suggestions
}
```

## Data Models

The application manages three primary data structures extracted from product.md:

1. **Slang Dictionary**: Direct mapping from the "Boli" section
2. **Food Intelligence**: Structured data from "Pet-Pujo" section  
3. **Visual Theme**: Color palette and styling constants

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:
- Properties 1.2 and 4.1 both test slang dictionary exclusivity - combined into Property 1
- Properties 2.2, 2.3, and 4.2 all test food data source integrity - combined into Property 2  
- Properties 4.3 and 4.4 both test general data source validation - combined into Property 3

### Core Properties

**Property 1: Slang dictionary exclusivity**
*For any* English input that receives a translation, the returned slang term must exist in the Kolkata_Slang dictionary from Product_Data
**Validates: Requirements 1.2, 4.1**

**Property 2: Food data source integrity**
*For any* displayed food item, both the description and best spots must match exactly with the corresponding entry in the Street_Food_Intelligence section of Product_Data
**Validates: Requirements 2.2, 2.3, 4.2**

**Property 3: Cultural content authenticity**
*For any* cultural content displayed in the application, there must be a corresponding entry in Product_Data that validates the content's authenticity
**Validates: Requirements 4.3, 4.4**

**Property 4: Translation completeness**
*For any* slang translation displayed, the output must include both the cultural context and meaning as specified in Product_Data
**Validates: Requirements 1.3**

**Property 5: Fallback translation validity**
*For any* English input without a direct translation match, the suggested alternative must be a valid entry from the Kolkata_Slang dictionary with appropriate explanation
**Validates: Requirements 1.4**

**Property 6: Translation display format**
*For any* slang translation shown to users, the display must include both the slang term and its contextual usage example
**Validates: Requirements 1.5**

**Property 7: Authentic terminology consistency**
*For any* food item name displayed, it must use the authentic Kolkata terminology as specified in Product_Data (e.g., "Phuchka" not "Golgappa")
**Validates: Requirements 2.4**

**Property 8: Food categorization accuracy**
*For any* food category display, the organization must match the Must-Try Items structure from Product_Data
**Validates: Requirements 2.5**

**Property 9: Bengali header inclusion**
*For any* header text displayed, it must include both Bengali script and English text
**Validates: Requirements 3.2**

**Property 10: Visual palette consistency**
*For any* interactive element providing visual feedback, the colors used must be from the specified Visual_Palette (Yellow Taxi #fcdb03, Terracotta Red, Vintage Off-White)
**Validates: Requirements 3.5**

**Property 11: Responsive layout adaptation**
*For any* screen size change, the layout must maintain usability and proper element positioning
**Validates: Requirements 5.2**

**Property 12: Interactive feedback responsiveness**
*For any* interactive element, user actions must trigger immediate visual feedback
**Validates: Requirements 5.4**

## Error Handling

The application implements comprehensive error handling across all components:

### Translation Errors
- **Invalid Input**: Empty or null inputs display helpful prompts
- **No Match Found**: Graceful fallback to closest slang suggestions
- **Data Loading Errors**: Fallback to cached slang dictionary

### Food Data Errors
- **Missing Location Data**: Display "Location information coming soon"
- **Image Loading Failures**: Use placeholder images with Kolkata theme
- **Data Parsing Errors**: Log errors and display basic food information

### UI/UX Error States
- **Component Loading**: Skeleton screens with Kolkata color palette
- **Network Failures**: Offline mode with cached cultural data
- **Responsive Breakpoints**: Graceful degradation for unsupported screen sizes

## Testing Strategy

The application employs a dual testing approach combining unit tests and property-based tests to ensure comprehensive coverage and correctness validation.

### Property-Based Testing Framework
The application uses **fast-check** for JavaScript property-based testing, configured to run a minimum of 100 iterations per property test to ensure thorough validation across random inputs.

### Unit Testing Approach
Unit tests focus on:
- Component rendering with correct props
- User interaction handling (clicks, form submissions)
- Data transformation functions
- Error boundary behavior
- Specific edge cases like empty states and loading conditions

### Property-Based Testing Approach
Property tests verify universal behaviors:
- Data integrity across all slang translations and food items
- UI consistency across different screen sizes and user inputs
- Cultural authenticity validation for all displayed content
- Visual palette compliance across all interactive elements

### Test Implementation Requirements
- Each property-based test must run a minimum of 100 iterations
- All property tests must include comments referencing the specific correctness property from this design document using the format: **Feature: kolkata-local-guide, Property {number}: {property_text}**
- Each correctness property must be implemented by a single property-based test
- Unit tests and property tests are complementary - unit tests catch specific bugs while property tests verify general correctness

### Testing Coverage Areas
1. **Cultural Data Integrity**: Validate all content sources against product.md
2. **Translation Accuracy**: Ensure slang translations maintain authenticity
3. **Visual Consistency**: Verify color palette and responsive design
4. **User Interaction**: Test all interactive elements and navigation
5. **Error Scenarios**: Validate graceful error handling and fallbacks