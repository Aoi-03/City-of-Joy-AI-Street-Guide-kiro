import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorFallback Component
 * Displays error messages with Kolkata theme for smaller errors
 * Requirements: 5.5
 * 
 * Features:
 * - Kolkata-themed error display
 * - Different error types (warning, error, info)
 * - Cultural context in error messages
 * - Recovery actions
 */
const ErrorFallback = ({ 
  type = 'error', 
  title, 
  message, 
  onRetry, 
  onDismiss,
  showCulturalTouch = true,
  className = '' 
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          containerClasses: 'bg-yellow-50 border-yellow-200 border-l-4 border-l-kolkata-yellow',
          iconClasses: 'text-kolkata-yellow',
          titleClasses: 'text-yellow-800',
          messageClasses: 'text-yellow-700',
          icon: '⚠️'
        };
      case 'info':
        return {
          containerClasses: 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-400',
          iconClasses: 'text-blue-400',
          titleClasses: 'text-blue-800',
          messageClasses: 'text-blue-700',
          icon: 'ℹ️'
        };
      case 'error':
      default:
        return {
          containerClasses: 'bg-red-50 border-red-200 border-l-4 border-l-kolkata-red',
          iconClasses: 'text-kolkata-red',
          titleClasses: 'text-red-800',
          messageClasses: 'text-red-700',
          icon: '❌'
        };
    }
  };

  const styles = getTypeStyles();

  const getCulturalMessage = () => {
    const culturalMessages = {
      error: [
        "Arre! Something went wrong like a tram getting stuck in traffic!",
        "Oops! This is more tangled than the wires in Burrabazar!",
        "Ei ki! Something's not working properly!"
      ],
      warning: [
        "Dhyan dao! Please pay attention to this.",
        "Ektu dekho! Something needs your attention.",
        "Careful! Like crossing the Howrah Bridge during rush hour."
      ],
      info: [
        "Shuno! Here's something you should know.",
        "FYI - Just like the evening adda at Coffee House.",
        "Heads up! Important information ahead."
      ]
    };

    const messages = culturalMessages[type] || culturalMessages.error;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className={`rounded-lg p-4 ${styles.containerClasses} ${className}`}>
      <div className="flex items-start">
        {/* Icon */}
        <div className={`flex-shrink-0 ${styles.iconClasses} text-xl mr-3`}>
          {styles.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          {title && (
            <h3 className={`font-semibold ${styles.titleClasses} mb-2`}>
              {title}
            </h3>
          )}

          {/* Message */}
          <div className={`${styles.messageClasses} mb-3`}>
            {message && (
              <p className="mb-2">{message}</p>
            )}
            
            {showCulturalTouch && (
              <p className="text-sm italic">
                {getCulturalMessage()}
              </p>
            )}
          </div>

          {/* Actions */}
          {(onRetry || onDismiss) && (
            <div className="flex gap-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-kolkata-yellow text-black text-sm font-medium rounded-md hover:bg-yellow-400 active:bg-yellow-500 focus:ring-2 focus:ring-kolkata-yellow focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  🔄 Try Again
                </button>
              )}
              
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 active:bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
                >
                  ✕ Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  onDismiss: PropTypes.func,
  showCulturalTouch: PropTypes.bool,
  className: PropTypes.string
};

export default ErrorFallback;