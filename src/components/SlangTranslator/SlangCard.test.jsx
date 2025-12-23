import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SlangCard from './SlangCard.jsx';

// Mock the translator utility
vi.mock('../../utils/translator.js', () => ({
  getTranslationWithContext: vi.fn()
}));

import { getTranslationWithContext } from '../../utils/translator.js';

describe('SlangCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up default mock behavior for empty input
    getTranslationWithContext.mockImplementation((input) => {
      if (!input || !input.trim()) {
        return {
          success: false,
          error: 'Please enter an English expression to translate',
          exactMatch: null,
          suggestions: []
        };
      }
      // Return null for other cases unless specifically mocked
      return null;
    });
  });

  it('renders the component with header and input', () => {
    render(<SlangCard />);
    
    expect(screen.getByText('Slang Translator')).toBeInTheDocument();
    expect(screen.getByText('বলি')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/procrastination, trouble, very good/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Translate' })).toBeInTheDocument();
  });

  it('shows error when trying to translate empty input', async () => {
    render(<SlangCard />);
    
    const translateButton = screen.getByRole('button', { name: 'Translate' });
    fireEvent.click(translateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter an English expression to translate')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('displays exact match translation with cultural context', async () => {
    const mockResult = {
      success: true,
      exactMatch: { slang: 'Lyadh', meaning: 'Creative procrastination' },
      culturalContext: {
        slang: 'Lyadh',
        meaning: 'Creative procrastination',
        context: 'Essential Kolkata concept for a relaxed, unhurried approach to life',
        example: "I'm feeling lyadh today",
        usage: 'Try saying: "I\'m feeling lyadh today"'
      }
    };
    
    getTranslationWithContext.mockReturnValue(mockResult);
    
    render(<SlangCard />);
    
    const input = screen.getByPlaceholderText(/procrastination, trouble, very good/);
    const translateButton = screen.getByRole('button', { name: 'Translate' });
    
    fireEvent.change(input, { target: { value: 'procrastination' } });
    fireEvent.click(translateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Lyadh')).toBeInTheDocument();
      expect(screen.getByText('(Creative procrastination)')).toBeInTheDocument();
      expect(screen.getByText('Cultural Context:')).toBeInTheDocument();
      expect(screen.getByText('Usage Example:')).toBeInTheDocument();
      expect(screen.getByText('"I\'m feeling lyadh today"')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('displays suggestions when no exact match found', async () => {
    const mockResult = {
      success: true,
      exactMatch: null,
      suggestions: [{ slang: 'Jhamela', meaning: 'Trouble' }],
      message: 'No exact match found. Here are some related Kolkata expressions:',
      culturalContext: [{
        slang: 'Jhamela',
        meaning: 'Trouble',
        context: 'Used when situations become complicated',
        example: 'Used when the local bus is too crowded'
      }]
    };
    
    getTranslationWithContext.mockReturnValue(mockResult);
    
    render(<SlangCard />);
    
    const input = screen.getByPlaceholderText(/procrastination, trouble, very good/);
    const translateButton = screen.getByRole('button', { name: 'Translate' });
    
    fireEvent.change(input, { target: { value: 'chaos' } });
    fireEvent.click(translateButton);
    
    await waitFor(() => {
      expect(screen.getByText('No exact match found. Here are some related Kolkata expressions:')).toBeInTheDocument();
      expect(screen.getByText('Jhamela')).toBeInTheDocument();
      expect(screen.getByText('(Trouble)')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('handles keyboard enter key for translation', async () => {
    const mockResult = {
      success: true,
      exactMatch: { slang: 'Khub Bhalo', meaning: 'Very Good' },
      culturalContext: {
        slang: 'Khub Bhalo',
        meaning: 'Very Good',
        context: 'The standard positive response for everything in Kolkata',
        example: 'How was the food? Khub bhalo!',
        usage: 'Try saying: "How was the food? Khub bhalo!"'
      }
    };
    
    getTranslationWithContext.mockImplementation((input) => {
      if (input === 'very good') {
        return mockResult;
      }
      return null;
    });
    
    render(<SlangCard />);
    
    const input = screen.getByPlaceholderText(/procrastination, trouble, very good/);
    
    fireEvent.change(input, { target: { value: 'very good' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(screen.getByText('Khub Bhalo')).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('clears results when user starts typing new input', () => {
    const mockResult = {
      success: true,
      exactMatch: { slang: 'Lyadh', meaning: 'Creative procrastination' },
      culturalContext: {
        slang: 'Lyadh',
        meaning: 'Creative procrastination',
        context: 'Essential Kolkata concept',
        example: "I'm feeling lyadh today",
        usage: 'Try saying: "I\'m feeling lyadh today"'
      }
    };
    
    getTranslationWithContext.mockReturnValue(mockResult);
    
    render(<SlangCard />);
    
    const input = screen.getByPlaceholderText(/procrastination, trouble, very good/);
    const translateButton = screen.getByRole('button', { name: 'Translate' });
    
    // First translation
    fireEvent.change(input, { target: { value: 'procrastination' } });
    fireEvent.click(translateButton);
    
    // Start typing new input - should clear results
    fireEvent.change(input, { target: { value: 'new input' } });
    
    expect(screen.queryByText('Lyadh')).not.toBeInTheDocument();
  });
});