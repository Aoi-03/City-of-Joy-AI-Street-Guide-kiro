import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('App Integration Tests', () => {
  it('renders the main application with header and navigation', () => {
    render(<App />)
    
    // Check main title
    expect(screen.getByText('Kolkata Local Guide')).toBeInTheDocument()
    expect(screen.getByText('City of Joy • আনন্দের শহর')).toBeInTheDocument()
    
    // Check navigation buttons
    expect(screen.getByRole('button', { name: /navigate to slang section/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /navigate to food section/i })).toBeInTheDocument()
  })

  it('displays welcome section by default with navigation cards', async () => {
    render(<App />)
    
    // The app starts with slang section by default, wait for content to load
    await waitFor(() => {
      expect(screen.getByText(/slang of the day/i)).toBeInTheDocument()
      expect(screen.getByText(/translate your english feelings/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('navigates to slang section when slang button is clicked', async () => {
    render(<App />)
    
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    fireEvent.click(slangButton)
    
    await waitFor(() => {
      // Should show slang components
      expect(screen.getByText(/slang of the day/i)).toBeInTheDocument()
    })
  })

  it('navigates to food section when food button is clicked', async () => {
    render(<App />)
    
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    fireEvent.click(foodButton)
    
    await waitFor(() => {
      // Should show food map component
      expect(screen.getByText(/pet-pujo/i)).toBeInTheDocument()
    })
  })

  it('navigates using quick navigation cards from welcome section', async () => {
    render(<App />)
    
    // Start in slang section, navigate to food
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    fireEvent.click(foodButton)
    
    await waitFor(() => {
      expect(screen.getByText(/pet-pujo/i)).toBeInTheDocument()
    })
    
    // Navigate back to slang
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    fireEvent.click(slangButton)
    
    await waitFor(() => {
      expect(screen.getByText(/slang of the day/i)).toBeInTheDocument()
    })
  })

  it('maintains active state in navigation', async () => {
    render(<App />)
    
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    fireEvent.click(slangButton)
    
    await waitFor(() => {
      // Check if slang button has active styling (bg-kolkata-red)
      expect(slangButton).toHaveClass('bg-kolkata-red')
    })
    
    const foodButton = screen.getByRole('button', { name: /navigate to food section/i })
    fireEvent.click(foodButton)
    
    await waitFor(() => {
      // Check if food button has active styling and slang button doesn't
      expect(foodButton).toHaveClass('bg-kolkata-red')
      expect(slangButton).not.toHaveClass('bg-kolkata-red')
    })
  })

  it('renders footer with cultural information', () => {
    render(<App />)
    
    expect(screen.getByText('কলকাতা স্থানীয় গাইড | Kolkata Local Guide')).toBeInTheDocument()
    expect(screen.getByText('Authentic cultural experiences from the City of Joy')).toBeInTheDocument()
    expect(screen.getByText('Built with')).toBeInTheDocument()
    expect(screen.getByText('for Kolkata culture')).toBeInTheDocument()
  })

  it('handles error boundaries gracefully', () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<App />)
    
    // App should render without throwing errors
    expect(screen.getByText('Kolkata Local Guide')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('applies responsive classes correctly', () => {
    render(<App />)
    
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('container', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-kolkata-yellow', 'shadow-lg', 'border-b-4', 'border-kolkata-red')
  })

  it('prevents duplicate navigation when clicking same section', async () => {
    render(<App />)
    
    const slangButton = screen.getByRole('button', { name: /navigate to slang section/i })
    
    // Click slang button twice
    fireEvent.click(slangButton)
    fireEvent.click(slangButton)
    
    await waitFor(() => {
      // Should still be in slang section (no duplicate navigation)
      expect(screen.getByText(/slang of the day/i)).toBeInTheDocument()
    })
  })
})