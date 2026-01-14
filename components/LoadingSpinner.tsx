import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-primary',
  text 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className={`${sizeClasses[size]} ${color}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {text && (
        <p className="text-sm text-text-secondary">{text}</p>
      )}
    </div>
  );
};

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ message = '加载中...', fullScreen = false }) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-background-light z-50'
    : 'flex items-center justify-center min-h-[200px]';

  return (
    <div className={containerClass}>
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="mb-4">
        <span className="material-symbols-outlined text-5xl text-gray-300">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-text-main mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-text-secondary mb-6 max-w-xs">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-primary text-text-main font-bold rounded-lg hover:bg-opacity-90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
