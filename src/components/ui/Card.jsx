import React from 'react';

export const Card = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`glass rounded-xl p-6 ${
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
