import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 hover:scale-105';
  
  const variants = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg',
    secondary: 'bg-red-600 text-white hover:bg-red-700 shadow-lg',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
