// src/components/wizard/GroupConceptPage.tsx
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { GROUP_CONCEPTS } from '../../lib/data';

interface GroupConceptPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isFirstStep: boolean;
}

const GroupConceptPage: React.FC<GroupConceptPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep,
  isFirstStep
}) => {
  const handleConceptSelect = (conceptName: string) => {
    updateAppState({ groupConcept: conceptName });
  };

  const canProceed = appState.groupConcept !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Select Group Concept</h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Group Concept</h2>
        <p className="mb-4">
          Your group concept defines your crew's primary purpose and the types of characters that would typically be part of such a group.
        </p>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {GROUP_CONCEPTS.map((concept) => (
          <SelectionCard
            key={concept.name}
            title={concept.name}
            description={`Typical roles: ${concept.concepts.join(', ')}`}
            selected={appState.groupConcept === concept.name}
            onClick={() => handleConceptSelect(concept.name)}
          />
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        <Button 
          onClick={goToNextStep}
          disabled={!canProceed}
        >
          Next: Group Talent
        </Button>
      </div>
    </div>
  );
};

export default GroupConceptPage;
