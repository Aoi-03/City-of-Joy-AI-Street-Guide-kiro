import React from 'react';

/**
 * BengaliHeader component for displaying bilingual headers
 * Includes both Bengali script and English text as per Kolkata cultural requirements
 */
const BengaliHeader = ({ 
  bengaliText, 
  englishText, 
  level = 'h1', 
  className = '',
  bengaliClassName = '',
  englishClassName = '',
  interactive = false,
  textColorOverride = null
}) => {
  const baseTextColor = textColorOverride || 'text-kolkata-yellow';
  const baseClasses = `font-bold ${baseTextColor}`;
  const interactiveClasses = interactive ? 'hover:text-kolkata-red transition-colors duration-300 cursor-pointer' : '';
  const bengaliClasses = `font-bengali ${bengaliClassName}`;
  const englishClasses = `${englishClassName}`;
  
  const HeaderTag = level;
  
  return (
    <HeaderTag className={`${baseClasses} ${interactiveClasses} ${className}`}>
      <span className={bengaliClasses} lang="bn">
        {bengaliText}
      </span>
      {bengaliText && englishText && (
        <span className="mx-2 text-kolkata-red">|</span>
      )}
      <span className={englishClasses} lang="en">
        {englishText}
      </span>
    </HeaderTag>
  );
};

export default BengaliHeader;