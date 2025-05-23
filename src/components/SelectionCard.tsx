// src/components/SelectionCard.tsx
import React from 'react';

interface SelectionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  /** Disable selection and styling for locked items */
  disabled?: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  selected,
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <div
      className={
        `selection-card p-4 ${selected ? 'selected' : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${className}`
      }
      onClick={disabled ? undefined : onClick}
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm opacity-80">{description}</p>}
    </div>
  );
};

export default SelectionCard;
