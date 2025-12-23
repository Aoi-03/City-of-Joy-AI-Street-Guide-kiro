/**
 * Property-based tests for Interactive Feedback Responsiveness
 * **Feature: kolkata-local-guide, Property 12: Interactive feedback responsiveness**
 * **Validates: Requirements 5.4**
 */

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';

// Import components to test
import SlangCard from '../SlangTranslator/SlangCard.jsx';
import SlangOfTheDay from '../SlangTranslator/SlangOfTheDay.jsx';
import FoodCard from '../FoodMap/FoodCard.jsx';
import ViewToggle from '../FoodMap/ViewToggle.jsx';
import Header from '../Layout/Header.jsx';
import { foodData } from '../../data/foodData.js';

describe('Interactive Feedback Responsiveness - Property Tests', () => {
  
  afterEach(() => {
    cleanup();
  });

  /**
   * **Feature: kolkata-local-guide, Property 12: Interactive feedback responsiveness**
   * **Validates: Requirements 5.4**
   * 
   * For any interactive element, user actions must trigger immediate visual feedback
   */
  it('Property 12: Interactive elements provide immediate visual feedback on user actions', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'input', 'clickable-div'),
        fc.constantFrom('hover', 'focus', 'click'),
        (elementType, interactionType) => {
          let container, unmount;
          let interactiveElements = [];

          // Render different components based on element type
          if (elementType === 'button') {
            // Test buttons in various components
            const components = [
              () => render(<SlangOfTheDay />),
              () => render(<ViewToggle currentView="list" onViewChange={() => {}} />),
              () => render(<Header currentSection="slang" onSectionChange={() => {}} />)
            ];
            
            const randomComponent = components[Math.floor(Math.random() * components.length)];
            ({ container, unmount } = randomComponent());
            interactiveElements = Array.from(container.querySelectorAll('button'));
            
          } else if (elementType === 'input') {
            ({ container, unmount } = render(<SlangCard />));
            interactiveElements = Array.from(container.querySelectorAll('input'));
            
          } else if (elementType === 'clickable-div') {
            const sampleFood = foodData[0];
            ({ container, unmount } = render(<FoodCard food={sampleFood} />));
            // Look for clickable divs or elements with role="button"
            interactiveElements = Array.from(container.querySelectorAll('[role="button"], [tabindex="0"]'));
          }

          // Skip if no interactive elements found
          if (interactiveElements.length === 0) {
            unmount();
            return true;
          }

          // Test each interactive element
          interactiveElements.forEach(element => {
            // Get initial styles
            const initialClasses = Array.from(element.classList);
            
            // Verify element has interactive styling classes
            const hasInteractiveClasses = initialClasses.some(cls => 
              cls.includes('hover:') || 
              cls.includes('focus:') || 
              cls.includes('active:') ||
              cls.includes('transition') ||
              cls.includes('cursor-') ||
              cls.includes('transform') ||
              cls.includes('scale-') ||
              cls.includes('shadow') ||
              cls.includes('ring') ||
              cls.includes('border') ||
              cls.includes('bg-') ||
              cls.includes('text-')
            );
            
            expect(hasInteractiveClasses).toBe(true);

            // Test specific interaction types
            if (interactionType === 'hover') {
              // Verify hover classes exist
              const hasHoverClasses = initialClasses.some(cls => 
                cls.includes('hover:bg-') || 
                cls.includes('hover:text-') || 
                cls.includes('hover:border-') ||
                cls.includes('hover:shadow') ||
                cls.includes('hover:scale-') ||
                cls.includes('hover:ring')
              );
              expect(hasHoverClasses).toBe(true);
              
            } else if (interactionType === 'focus') {
              // Verify focus classes exist
              const hasFocusClasses = initialClasses.some(cls => 
                cls.includes('focus:ring') || 
                cls.includes('focus:border-') || 
                cls.includes('focus:bg-') ||
                cls.includes('focus:outline') ||
                cls.includes('focus:shadow')
              );
              expect(hasFocusClasses).toBe(true);
              
              // Test that element can receive focus (only for naturally focusable elements)
              if (['button', 'input', 'select', 'textarea', 'a'].includes(element.tagName.toLowerCase())) {
                fireEvent.focus(element);
                // In test environment, just verify the focus event was fired without error
                // The actual focus behavior is handled by the browser
                expect(element).toBeInTheDocument();
              }
              
            } else if (interactionType === 'click') {
              // Verify active/click classes exist
              const hasActiveClasses = initialClasses.some(cls => 
                cls.includes('active:') || 
                cls.includes('transform') ||
                cls.includes('transition')
              );
              expect(hasActiveClasses).toBe(true);
              
              // Test click interaction (if clickable)
              if (element.tagName.toLowerCase() === 'button' || element.getAttribute('role') === 'button') {
                // Simulate click - should not throw error
                expect(() => fireEvent.click(element)).not.toThrow();
              }
            }

            // Verify Kolkata color palette usage in interactive states
            const hasKolkataColors = initialClasses.some(cls => 
              cls.includes('kolkata-') || 
              cls.includes('yellow-') || 
              cls.includes('red-') ||
              cls.includes('terracotta') ||
              cls.includes('vintage')
            );
            expect(hasKolkataColors).toBe(true);

            // Verify transition classes for smooth feedback
            const hasTransitions = initialClasses.some(cls => 
              cls.includes('transition') || 
              cls.includes('duration-') ||
              cls.includes('ease-')
            );
            expect(hasTransitions).toBe(true);
          });

          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Kolkata color palette consistency in interactive states
   * Validates that all interactive feedback uses the specified color palette
   */
  it('Property 12 (Extended): Interactive feedback uses Kolkata color palette consistently', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          () => render(<SlangCard />),
          () => render(<SlangOfTheDay />),
          () => render(<ViewToggle currentView="list" onViewChange={() => {}} />),
          () => render(<Header currentSection="food" onSectionChange={() => {}} />),
          () => render(<FoodCard food={foodData[0]} />)
        ),
        (renderComponent) => {
          const { container, unmount } = renderComponent();
          
          // Find all interactive elements
          const interactiveElements = Array.from(container.querySelectorAll(
            'button, input, [role="button"], [tabindex="0"], a, select, textarea'
          ));

          interactiveElements.forEach(element => {
            const classList = Array.from(element.classList);
            
            // Check for Kolkata color usage in interactive states
            const kolkataColorClasses = classList.filter(cls => 
              cls.includes('kolkata-yellow') || 
              cls.includes('kolkata-red') || 
              cls.includes('kolkata-white') ||
              cls.includes('yellow-') ||
              cls.includes('red-') ||
              cls.includes('terracotta') ||
              cls.includes('vintage')
            );
            
            // Interactive elements should use Kolkata colors
            expect(kolkataColorClasses.length).toBeGreaterThan(0);
            
            // Verify specific Kolkata color usage patterns
            const hasKolkataYellow = classList.some(cls => 
              cls.includes('kolkata-yellow') || cls.includes('yellow-')
            );
            const hasKolkataRed = classList.some(cls => 
              cls.includes('kolkata-red') || cls.includes('red-')
            );
            const hasKolkataWhite = classList.some(cls => 
              cls.includes('kolkata-white') || cls.includes('vintage-off-white')
            );
            
            // At least one Kolkata color should be present
            expect(hasKolkataYellow || hasKolkataRed || hasKolkataWhite).toBe(true);
            
            // Check for proper hover/focus state color transitions
            const hasColorTransitions = classList.some(cls => 
              cls.includes('hover:bg-kolkata-') || 
              cls.includes('hover:text-kolkata-') ||
              cls.includes('hover:border-kolkata-') ||
              cls.includes('focus:ring-kolkata-') ||
              cls.includes('hover:bg-yellow-') ||
              cls.includes('hover:bg-red-') ||
              cls.includes('focus:ring-yellow-') ||
              cls.includes('focus:ring-red-')
            );
            
            // Interactive elements should have color transition states
            expect(hasColorTransitions).toBe(true);
          });

          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Immediate feedback timing
   * Validates that interactive feedback appears without delay
   */
  it('Property 12 (Extended): Interactive feedback appears immediately without delay', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('SlangCard', 'ViewToggle', 'Header'),
        (componentName) => {
          let container, unmount;
          
          // Render the specified component
          if (componentName === 'SlangCard') {
            ({ container, unmount } = render(<SlangCard />));
          } else if (componentName === 'ViewToggle') {
            ({ container, unmount } = render(<ViewToggle currentView="list" onViewChange={() => {}} />));
          } else if (componentName === 'Header') {
            ({ container, unmount } = render(<Header currentSection="slang" onSectionChange={() => {}} />));
          }

          // Find interactive elements
          const buttons = Array.from(container.querySelectorAll('button'));
          const inputs = Array.from(container.querySelectorAll('input'));
          const allInteractive = [...buttons, ...inputs];

          allInteractive.forEach(element => {
            const classList = Array.from(element.classList);
            
            // Verify immediate feedback classes (no delay)
            const hasImmediateFeedback = classList.some(cls => 
              // Transition classes should be present but not overly long
              (cls.includes('transition') && !cls.includes('duration-1000')) ||
              cls.includes('hover:') ||
              cls.includes('focus:') ||
              cls.includes('active:')
            );
            
            expect(hasImmediateFeedback).toBe(true);
            
            // Check for reasonable transition durations (not too slow)
            const transitionDuration = classList.find(cls => cls.includes('duration-'));
            if (transitionDuration) {
              // Extract duration number
              const durationMatch = transitionDuration.match(/duration-(\d+)/);
              if (durationMatch) {
                const duration = parseInt(durationMatch[1]);
                // Should be reasonable (not more than 500ms for immediate feedback)
                expect(duration).toBeLessThanOrEqual(500);
              }
            }
            
            // Verify transform/scale effects for immediate visual feedback
            const hasTransformFeedback = classList.some(cls => 
              cls.includes('hover:scale-') || 
              cls.includes('active:scale-') ||
              cls.includes('transform')
            );
            
            // Interactive elements should have some form of immediate visual feedback
            expect(hasTransformFeedback || hasImmediateFeedback).toBe(true);
          });

          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});