import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SlangOfTheDay from './SlangOfTheDay.jsx';

// Mock the slang dictionary
vi.mock('../../data/slangDictionary.js', () => ({
  getRandomSlang: vi.fn()
}));

import { getRandomSlang } from '../../data/slangDictionary.js';

describe('SlangOfTheDay Component', () => {
  const mockSlang = {
    slang: 'Lyadh',
    meaning: 'Creative procrastination',
    context: 'Essential Kolkata concept for a relaxed, unhurried approach to life',
    example: "I'm feeling lyadh today"
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getRandomSlang.mockReturnValue(mockSlang);
  });

  it('renders the component with header and slang content', async () => {
    render(<SlangOfTheDay />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Slang of the Day')).toBeInTheDocument();
      expect(screen.getByText('আজকের বলি')).toBeInTheDocument();
      expect(screen.getByText('Lyadh')).toBeInTheDocument();
      expect(screen.getByText('"Creative procrastination"')).toBeInTheDocument();
      expect(screen.getByText('Cultural Context')).toBeInTheDocument();
      expect(screen.getByText('Usage Example')).toBeInTheDocument();
      expect(screen.getByText('"I\'m feeling lyadh today"')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays loading state initially', () => {
    render(<SlangOfTheDay />);
    
    // Should show loading skeleton initially
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('has a rotation button', async () => {
    render(<SlangOfTheDay />);
    
    // Wait for loading to complete
    await waitFor(() => {
      const rotateButton = screen.getByRole('button', { name: 'New Slang' });
      expect(rotateButton).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays all required cultural information', async () => {
    render(<SlangOfTheDay />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Cultural Context')).toBeInTheDocument();
      expect(screen.getByText('Usage Example')).toBeInTheDocument();
      expect(screen.getByText('Essential Kolkata concept for a relaxed, unhurried approach to life')).toBeInTheDocument();
      expect(screen.getByText('Authentic Kolkata slang • Cultural context included')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('applies correct Kolkata theme styling', async () => {
    render(<SlangOfTheDay />);
    
    // Wait for loading to complete
    await waitFor(() => {
      const slangTerm = screen.getByText('Lyadh');
      expect(slangTerm).toHaveClass('text-kolkata-red');
      
      const headerSection = screen.getByText('Slang of the Day').closest('div');
      expect(headerSection).toHaveClass('bg-kolkata-yellow');
    }, { timeout: 2000 });
  });
});