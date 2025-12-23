# Kolkata Local Guide - City of Joy

An authentic cultural companion for Kolkata built with React and Tailwind CSS, featuring immersive HD video backgrounds and bilingual Bengali-English interface.

## Features

### Core Functionality
- **Slang Translator**: Convert English expressions into authentic Kolkata slang with cultural context
- **Food Map**: Discover street food recommendations with specific locations and cultural notes
- **Slang of the Day**: Featured daily slang with rotation and cultural explanations
- **Interactive Navigation**: Smooth transitions between slang translator and food map sections

### Visual Experience
- **HD Video Backgrounds**: Rotating playlist of authentic Kolkata cityscape videos
- **Immersive Design**: Beautiful HD videos with optimized overlay for content readability
- **Text Visibility**: Drop-shadow effects and stroke styling for perfect readability over video
- **Compact Header**: Optimized header design for maximum content space

### Cultural Authenticity
- **Bengali Script Integration**: Bilingual headers with Bengali and English text
- **Authentic Content**: All slang and food data sourced from genuine Kolkata cultural intelligence
- **Cultural Context**: Detailed explanations and usage examples for all content
- **Local Intelligence**: Street food recommendations from authentic local knowledge

### Technical Excellence
- **Responsive Design**: Seamless experience across all devices and screen sizes
- **Smooth Animations**: Elegant transitions and hover effects throughout the interface
- **Error Handling**: Comprehensive error boundaries and fallback components
- **Performance Optimized**: Fast loading with local video assets and efficient state management

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom Kolkata color palette
- **Vitest** - Fast unit testing framework
- **fast-check** - Property-based testing library
- **ESLint** - Code linting and formatting

## Custom Color Palette

- **Yellow Taxi**: `#fcdb03` - Iconic Kolkata taxi color (primary background)
- **Terracotta Red**: `#c65d07` - Traditional Bengali terracotta (accents and buttons)
- **Vintage Off-White**: `#faf7f0` - Colonial architecture inspired (content backgrounds)

## Video Background System

The app features a dynamic video background system with:
- **HD Video Playlist**: Automatically cycles through 3 HD Kolkata cityscape videos
- **Seamless Transitions**: Smooth video transitions with fade effects
- **Optimized Overlay**: 20-30% white overlay for perfect content readability
- **Local Assets**: Fast-loading videos stored in `/videos/` directory

### Video Files
- `602447_Cities_City_3840x2160.mp4` - 4K quality primary video
- `14316794_1920_1080_30fps.mp4` - 1080p 30fps secondary video  
- `14623878_1920_1080_25fps.mp4` - 1080p 25fps tertiary video

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Aoi-03/City-of-Joy-AI-Street-Guide-kiro/tree/main
cd kolkata-local-guide

# Install dependencies
npm install

# Start development server
npm run dev
# Server will start at http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run linting
npm run lint
```

### Adding Your Own Videos

1. Create a `videos/` folder in the project root
2. Add your HD Kolkata videos (MP4 format recommended)
3. Update the video playlist in `src/components/Common/BackgroundVideo.jsx`
4. Videos will automatically cycle through the playlist

## Project Structure

```
src/
├── components/
│   ├── SlangTranslator/    # Slang translation and daily slang components
│   │   ├── SlangCard.jsx
│   │   └── SlangOfTheDay.jsx
│   ├── FoodMap/           # Food recommendation and map components
│   │   ├── FoodMap.jsx
│   │   ├── FoodCard.jsx
│   │   ├── FoodList.jsx
│   │   └── ViewToggle.jsx
│   ├── Layout/            # Layout and navigation components
│   │   └── Header.jsx
│   └── Common/            # Shared components
│       ├── BackgroundVideo.jsx  # HD video background system
│       ├── BengaliHeader.jsx    # Bilingual header component
│       ├── ErrorBoundary.jsx    # Error handling
│       ├── ErrorFallback.jsx    # Error UI components
│       └── LoadingSkeleton.jsx  # Loading states
├── data/                  # Cultural data and dictionaries
│   ├── slangDictionary.js # Authentic Kolkata slang data
│   └── foodData.js        # Street food intelligence
├── utils/                 # Utility functions
│   ├── translator.js      # Slang translation logic
│   └── culturalValidator.js # Cultural content validation
├── styles/                # Additional styling
└── test/                  # Test setup and utilities
videos/                    # HD video assets (add your own)
├── 602447_Cities_City_3840x2160.mp4
├── 14316794_1920_1080_30fps.mp4
└── 14623878_1920_1080_25fps.mp4
```

## 🛠️ Development Guidelines

### Code Standards
- All cultural content must be sourced from authentic product data
- Use the custom Kolkata color palette for consistent theming
- Include Bengali script alongside English text in headers using `BengaliHeader` component
- Maintain responsive design principles across all screen sizes
- Implement proper error boundaries and loading states

### Visual Design
- Use `textColorOverride` prop for proper text visibility over video backgrounds
- Apply drop-shadow effects (`drop-shadow-lg`, `drop-shadow-md`) for text readability
- Maintain compact header design for optimal content space
- Ensure smooth transitions and hover effects for better UX

### Component Architecture
- Use the `BackgroundVideo` component for consistent video backgrounds
- Implement proper prop validation with PropTypes
- Follow the established file naming conventions
- Write comprehensive tests for all components

## Testing

The project uses a comprehensive dual testing approach:
- **Unit Tests**: Specific examples and edge cases using Vitest
- **Property-Based Tests**: Universal properties across all inputs using fast-check
- **Component Tests**: UI component behavior and rendering
- **Integration Tests**: Cross-component functionality

### Test Coverage
- ✅ 98.5% test pass rate (130/132 tests passing)
- ✅ All core functionality covered
- ✅ Error handling and edge cases tested
- ✅ Cultural content validation

Run tests with: `npm test`

## Key Components

### BackgroundVideo
Manages the rotating HD video playlist with smooth transitions and optimized overlays.

### BengaliHeader  
Bilingual header component supporting both Bengali and English text with customizable styling.

### SlangOfTheDay
Featured daily slang with rotation logic, cultural context, and usage examples.

### FoodMap
Interactive food discovery with list/card view toggle and detailed location information.

## Recent Updates

- ✅ **HD Video Backgrounds**: Added rotating playlist of authentic Kolkata videos
- ✅ **Text Visibility**: Enhanced with drop-shadow effects and proper contrast
- ✅ **Compact Header**: Optimized header design for better space utilization  
- ✅ **Video Playlist**: Automatic cycling through multiple HD videos
- ✅ **Performance**: Optimized with local video assets and efficient state management
- ✅ **Test Coverage**: Achieved 98.5% test pass rate with comprehensive coverage

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Follow the established code style and component patterns
2. Ensure all tests pass before submitting changes
3. Add tests for new functionality
4. Maintain cultural authenticity in all content
5. Test across different screen sizes and devices
