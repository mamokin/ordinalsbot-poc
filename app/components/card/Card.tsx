import React from 'react';
import './Card.css';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  width?: 'full' | 'lg' | 'md' | 'sm' | 'min';
  height?: number;
}> = ({ children, className, width = 'md', height }) => {
  return (
    <div
      className={`card ${width}${className ? ` ${className}` : ''}`}
      style={height ? { height: `${height}rem` } : undefined}
    >
      {children}
    </div>
  );
};
