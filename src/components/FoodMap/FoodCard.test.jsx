import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FoodCard from './FoodCard';

describe('FoodCard', () => {
  const mockFood = {
    name: "Phuchka",
    description: "Spicy mashed potato, tamarind water with gondhoraj lebu",
    bestSpots: ["Vardaan Market", "Vivekananda Park"],
    category: "Must-Try Items",
    culturalNote: "Not Golgappa/Pani Puri - this is the authentic Kolkata version with gondhoraj lebu (a special lime)"
  };

  it('renders food name correctly', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('Phuchka')).toBeInTheDocument();
  });

  it('renders food description correctly', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('Spicy mashed potato, tamarind water with gondhoraj lebu')).toBeInTheDocument();
  });

  it('renders all best spots', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('Vardaan Market')).toBeInTheDocument();
    expect(screen.getByText('Vivekananda Park')).toBeInTheDocument();
  });

  it('renders cultural note when provided', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText(/Not Golgappa\/Pani Puri/)).toBeInTheDocument();
  });

  it('renders error fallback when no food is provided', () => {
    const { container } = render(<FoodCard food={null} />);
    expect(screen.getByText('No Food Data')).toBeInTheDocument();
    expect(screen.getByText('Food information is not available.')).toBeInTheDocument();
  });

  it('does not render cultural note section when culturalNote is not provided', () => {
    const foodWithoutNote = { ...mockFood };
    delete foodWithoutNote.culturalNote;
    
    render(<FoodCard food={foodWithoutNote} />);
    expect(screen.queryByText('Cultural Note:')).not.toBeInTheDocument();
  });
});