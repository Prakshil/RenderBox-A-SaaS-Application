import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  outline = false,
  className = '', 
  ...props 
}: BadgeProps) => {
  const sizeClasses = {
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
  };

  return (
    <div
      className={`badge badge-${variant} ${sizeClasses[size]} ${outline ? 'badge-outline' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
