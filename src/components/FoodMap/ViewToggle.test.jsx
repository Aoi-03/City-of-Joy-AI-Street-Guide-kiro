import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ViewToggle from './ViewToggle';

describe('ViewToggle', () => {
  const mockOnViewChange = vi.fn();

  beforeEach(() => {
    mockOnViewChange.mockClear();
  });

  it('renders both view options', () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    expect(screen.getByText('List View')).toBeInTheDocument();
    expect(screen.getByText('Card View')).toBeInTheDocument();
  });

  it('highlights the current view', () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText('Switch to List View');
    const cardButton = screen.getByLabelText('Switch to Card View');
    
    expect(listButton).toHaveAttribute('aria-pressed', 'true');
    expect(cardButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onViewChange when a different view is clicked', () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const cardButton = screen.getByLabelText('Switch to Card View');
    fireEvent.click(cardButton);
    
    expect(mockOnViewChange).toHaveBeenCalledWith('card');
  });

  it('calls onViewChange when the same view is clicked', () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText('Switch to List View');
    fireEvent.click(listButton);
    
    expect(mockOnViewChange).toHaveBeenCalledWith('list');
  });

  it('applies correct styling for active view', () => {
    render(<ViewToggle currentView="card" onViewChange={mockOnViewChange} />);
    
    const cardButton = screen.getByLabelText('Switch to Card View');
    expect(cardButton).toHaveClass('bg-kolkata-yellow', 'text-black');
  });

  it('applies correct styling for inactive view', () => {
    render(<ViewToggle currentView="card" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText('Switch to List View');
    expect(listButton).toHaveClass('text-gray-600');
    expect(listButton).not.toHaveClass('bg-yellow-100');
  });

  it('has proper accessibility attributes', () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText('Switch to List View');
    const cardButton = screen.getByLabelText('Switch to Card View');
    
    expect(listButton).toHaveAttribute('title', 'View all items in a detailed list');
    expect(cardButton).toHaveAttribute('title', 'View items as individual cards');
  });
});