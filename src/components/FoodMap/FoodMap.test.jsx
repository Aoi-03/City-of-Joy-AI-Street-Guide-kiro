import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FoodMap from './FoodMap';

describe('FoodMap', () => {
  const mockFoods = [
    {
      name: "Phuchka",
      description: "Spicy mashed potato, tamarind water with gondhoraj lebu",
      bestSpots: ["Vardaan Market", "Vivekananda Park"],
      category: "Must-Try Items",
      culturalNote: "Not Golgappa/Pani Puri - this is the authentic Kolkata version"
    },
    {
      name: "Kathi Roll",
      description: "Skewered meat wrapped in paratha",
      bestSpots: ["Nizam's", "Kusum Rolls (Park Street)"],
      category: "Must-Try Items",
      culturalNote: "Originated in Kolkata"
    }
  ];

  it('renders the header with Bengali text', () => {
    render(<FoodMap foods={mockFoods} />);
    
    expect(screen.getByText('পেট-পূজো')).toBeInTheDocument();
    expect(screen.getByText('Pet-Pujo (Street Food Guide)')).toBeInTheDocument();
  });

  it('renders view toggle component', () => {
    render(<FoodMap foods={mockFoods} />);
    
    expect(screen.getByText('List View')).toBeInTheDocument();
    expect(screen.getByText('Card View')).toBeInTheDocument();
  });

  it('starts with list view by default', () => {
    render(<FoodMap foods={mockFoods} />);
    
    // Should show list view content
    expect(screen.getByText('Must-Try Items')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to List View')).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches to card view when toggle is clicked', () => {
    render(<FoodMap foods={mockFoods} />);
    
    const cardViewButton = screen.getByLabelText('Switch to Card View');
    fireEvent.click(cardViewButton);
    
    expect(cardViewButton).toHaveAttribute('aria-pressed', 'true');
    // Should show card grid layout
    expect(screen.queryByText('Must-Try Items')).not.toBeInTheDocument();
  });

  it('switches to card view and shows selected food when food is selected from list', () => {
    render(<FoodMap foods={mockFoods} />);
    
    // Click on a food item in list view
    const phuchkaItem = screen.getByText('Phuchka').closest('[role="button"]');
    fireEvent.click(phuchkaItem);
    
    // Should switch to card view and show the selected food
    expect(screen.getByLabelText('Switch to Card View')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Back to List')).toBeInTheDocument();
  });

  it('shows back to list button when viewing individual card', () => {
    render(<FoodMap foods={mockFoods} />);
    
    // Select a food item
    const phuchkaItem = screen.getByText('Phuchka').closest('[role="button"]');
    fireEvent.click(phuchkaItem);
    
    expect(screen.getByText('Back to List')).toBeInTheDocument();
  });

  it('returns to list view when back button is clicked', () => {
    render(<FoodMap foods={mockFoods} />);
    
    // Select a food item
    const phuchkaItem = screen.getByText('Phuchka').closest('[role="button"]');
    fireEvent.click(phuchkaItem);
    
    // Click back to list
    const backButton = screen.getByText('Back to List');
    fireEvent.click(backButton);
    
    // Should be back in list view
    expect(screen.getByLabelText('Switch to List View')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Must-Try Items')).toBeInTheDocument();
    expect(screen.queryByText('Back to List')).not.toBeInTheDocument();
  });

  it('shows all foods in card grid when card view is selected without specific food', () => {
    render(<FoodMap foods={mockFoods} />);
    
    // Switch to card view
    const cardViewButton = screen.getByLabelText('Switch to Card View');
    fireEvent.click(cardViewButton);
    
    // Should show all foods as cards
    expect(screen.getAllByText('Phuchka')).toHaveLength(1);
    expect(screen.getAllByText('Kathi Roll')).toHaveLength(1);
    expect(screen.queryByText('Back to List')).not.toBeInTheDocument();
  });

  it('renders footer with authentic food message', () => {
    render(<FoodMap foods={mockFoods} />);
    
    expect(screen.getByText(/Authentic Kolkata street food recommendations/)).toBeInTheDocument();
  });

  it('uses default foodData when no foods prop is provided', () => {
    render(<FoodMap />);
    
    // Should render with default food data
    expect(screen.getByText('পেট-পূজো')).toBeInTheDocument();
    expect(screen.getByText('List View')).toBeInTheDocument();
  });
});