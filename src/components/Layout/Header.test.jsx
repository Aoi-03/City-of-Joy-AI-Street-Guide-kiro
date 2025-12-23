import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header Integration Tests', () => {
  const mockOnSectionChange = vi.fn()

  beforeEach(() => {
    mockOnSectionChange.mockClear()
  })

  it('renders header with Bengali and English titles', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    expect(screen.getByText('কলকাতা স্থানীয় গাইড')).toBeInTheDocument()
    expect(screen.getByText('Kolkata Local Guide')).toBeInTheDocument()
    expect(screen.getByText('City of Joy • আনন্দের শহর')).toBeInTheDocument()
  })

  it('renders navigation buttons with Bengali and English text', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    // Check slang button
    expect(screen.getByText('বলি')).toBeInTheDocument()
    expect(screen.getByText('Slang')).toBeInTheDocument()
    
    // Check food button
    expect(screen.getByText('পেট-পূজো')).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
  })

  it('calls onSectionChange when navigation buttons are clicked', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    fireEvent.click(foodButton)
    
    expect(mockOnSectionChange).toHaveBeenCalledWith('food')
  })

  it('applies active styling to current section', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    
    expect(slangButton).toHaveClass('bg-kolkata-red')
    expect(foodButton).not.toHaveClass('bg-kolkata-red')
    expect(foodButton).toHaveClass('bg-white')
  })

  it('applies correct responsive classes', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-kolkata-yellow', 'shadow-lg', 'border-b-4', 'border-kolkata-red')
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('flex', 'flex-col', 'sm:flex-row')
  })

  it('renders cultural elements', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    expect(screen.getByText('★ Authentic Cultural Experience ★')).toBeInTheDocument()
  })

  it('handles missing onSectionChange prop gracefully', () => {
    render(<Header currentSection="slang" />)
    
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    
    // Should not throw error when clicked
    expect(() => fireEvent.click(foodButton)).not.toThrow()
  })

  it('uses correct language attributes', () => {
    const { container } = render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    // Check Bengali text has correct lang attribute
    const bengaliElements = container.querySelectorAll('[lang="bn"]')
    expect(bengaliElements.length).toBeGreaterThan(0)
    
    // Check English text has correct lang attribute
    const englishElements = container.querySelectorAll('[lang="en"]')
    expect(englishElements.length).toBeGreaterThan(0)
  })

  it('provides proper accessibility attributes', () => {
    render(<Header currentSection="slang" onSectionChange={mockOnSectionChange} />)
    
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    
    expect(slangButton).toHaveAttribute('aria-label', 'Navigate to Slang section')
    expect(foodButton).toHaveAttribute('aria-label', 'Navigate to Food section')
  })
})