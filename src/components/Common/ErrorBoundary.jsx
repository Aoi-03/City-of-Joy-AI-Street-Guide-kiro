import React from 'react';
import PropTypes from 'prop-types';
import BengaliHeader from './BengaliHeader.jsx';

/**
 * ErrorBoundary Component
 * Implements error boundaries and fallback UI with Kolkata theme
 * Requirements: 5.5
 * 
 * Features:
 * - Catches JavaScript errors in component tree
 * - Displays Kolkata-themed error fallback UI
 * - Provides recovery options
 * - Maintains cultural authenticity even in error states
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI with Kolkata theme
      return (
        <div className="min-h-screen bg-kolkata-white flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border-2 border-kolkata-red p-8 text-center">
            {/* Error Header */}
            <div className="mb-6">
              <BengaliHeader 
                bengaliText="সমস্যা হয়েছে"
                englishText="Something Went Wrong"
                level="h1"
                className="text-3xl mb-4 text-kolkata-red"
              />
              
              {/* Cultural touch */}
              <div className="text-kolkata-yellow text-6xl mb-4">
                🏛️
              </div>
              
              <p className="text-gray-600 text-lg mb-2">
                Even the best rickshaw sometimes needs a push!
              </p>
              <p className="text-gray-500 text-sm">
                আমাদের সিস্টেমে একটি সমস্যা হয়েছে
              </p>
            </div>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                <pre className="text-xs text-red-700 overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Recovery Options */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-kolkata-yellow text-black font-medium rounded-lg hover:bg-yellow-400 active:bg-yellow-500 focus:ring-2 focus:ring-kolkata-yellow focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  🔄 Try Again
                </button>
                
                <button
                  onClick={this.handleReload}
                  className="px-6 py-3 bg-kolkata-red text-white font-medium rounded-lg hover:bg-red-600 active:bg-red-700 focus:ring-2 focus:ring-kolkata-red focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  🏠 Reload Page
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-kolkata-white rounded-lg border border-kolkata-yellow">
                <h4 className="font-semibold text-kolkata-red mb-2">
                  What can you do?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Try refreshing the page</li>
                  <li>• Check your internet connection</li>
                  <li>• Clear your browser cache</li>
                  <li>• Try again in a few minutes</li>
                </ul>
              </div>

              {/* Cultural Footer */}
              <div className="mt-6 text-xs text-gray-500">
                <p>
                  "Mishti doi khele mon bhalo hoye jay" - Sometimes a sweet treat makes everything better
                </p>
                <p className="mt-1">
                  We're working to fix this issue. Thank you for your patience!
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
  fallback: PropTypes.node
};

export default ErrorBoundary;