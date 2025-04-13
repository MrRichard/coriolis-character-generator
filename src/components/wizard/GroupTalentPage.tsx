// src/components/wizard/GroupTalentPage.tsx
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { GROUP_TALENTS } from '../../lib/data';

interface GroupTalentPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const GroupTalentPage: React.FC<GroupTalentPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const selectedGroupConcept = appState.groupConcept;
  const availableTalents = GROUP_TALENTS.find(
    group => group.name === selectedGroupConcept
  )?.concepts || [];

  const handleTalentSelect = (talent: string) => {
    updateAppState({ groupTalent: talent });
  };

  const canProceed = appState.groupTalent !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Select Group Talent</h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Group Talent for {selectedGroupConcept}</h2>
        <p className="mb-4">
          Your group talent represents a special ability or advantage that all members of your crew share.
        </p>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {availableTalents.map((talent) => (
          <SelectionCard
            key={talent}
            title={talent}
            selected={appState.groupTalent === talent}
            onClick={() => handleTalentSelect(talent)}
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
          Next: Character Creation
        </Button>
      </div>
    </div>
  );
};

export default GroupTalentPage;
