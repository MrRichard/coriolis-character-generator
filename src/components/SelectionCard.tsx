// src/components/SelectionCard.tsx
import React from 'react';

interface SelectionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  selected,
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`selection-card p-4 cursor-pointer flex flex-col h-full ${selected ? 'selected' : ''} ${className}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-sm opacity-90 flex-grow">{description}</p>}
    </div>
  );
};

export default SelectionCard;