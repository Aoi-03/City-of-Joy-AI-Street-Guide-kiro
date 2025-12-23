import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FoodList from './FoodList';

describe('FoodList', () => {
  const mockFoods = [
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
    }
  ];

  it('renders food items correctly', () => {
    render(<FoodList foods={mockFoods} />);
    
    expect(screen.getByText('Phuchka')).toBeInTheDocument();
    expect(screen.getByText('Kathi Roll')).toBeInTheDocument();
    expect(screen.getByText('Spicy mashed potato, tamarind water with gondhoraj lebu')).toBeInTheDocument();
  });

  it('groups foods by category', () => {
    render(<FoodList foods={mockFoods} />);
    
    expect(screen.getByText('Must-Try Items')).toBeInTheDocument();
  });

  it('displays best spots for each food item', () => {
    render(<FoodList foods={mockFoods} />);
    
    expect(screen.getByText('📍 Vardaan Market')).toBeInTheDocument();
    expect(screen.getByText('📍 Vivekananda Park')).toBeInTheDocument();
    expect(screen.getByText('📍 Nizam\'s')).toBeInTheDocument();
  });

  it('calls onFoodSelect when food item is clicked', () => {
    const mockOnFoodSelect = vi.fn();
    render(<FoodList foods={mockFoods} onFoodSelect={mockOnFoodSelect} />);
    
    const phuchkaItem = screen.getByText('Phuchka').closest('[role="button"]');
    fireEvent.click(phuchkaItem);
    
    expect(mockOnFoodSelect).toHaveBeenCalledWith(mockFoods[0]);
  });

  it('handles keyboard navigation', () => {
    const mockOnFoodSelect = vi.fn();
    render(<FoodList foods={mockFoods} onFoodSelect={mockOnFoodSelect} />);
    
    const phuchkaItem = screen.getByText('Phuchka').closest('[role="button"]');
    fireEvent.keyDown(phuchkaItem, { key: 'Enter' });
    
    expect(mockOnFoodSelect).toHaveBeenCalledWith(mockFoods[0]);
  });

  it('renders empty state when no foods provided', () => {
    render(<FoodList foods={[]} />);
    
    expect(screen.getByText('No Food Items')).toBeInTheDocument();
  });

  it('truncates long cultural notes', () => {
    const longCulturalNote = 'This is a very long cultural note that should be truncated when displayed in the list view because it exceeds the 100 character limit that we have set for the preview';
    const foodWithLongNote = [{
      ...mockFoods[0],
      culturalNote: longCulturalNote
    }];
    
    render(<FoodList foods={foodWithLongNote} />);
    
    expect(screen.getByText(/This is a very long cultural note that should be truncated when displayed in the list view.../)).toBeInTheDocument();
  });

  it('displays full cultural note when under character limit', () => {
    const shortNote = 'Short cultural note';
    const foodWithShortNote = [{
      ...mockFoods[0],
      culturalNote: shortNote
    }];
    
    render(<FoodList foods={foodWithShortNote} />);
    
    expect(screen.getByText('Short cultural note')).toBeInTheDocument();
  });
});