// src/components/wizard/CharacterTalentPage.tsx
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { TALENTS, ICONS, PERSONAL_PROBLEMS, getAvailableTalents, getRandomElement } from '../../lib/data';

interface CharacterTalentPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const CharacterTalentPage: React.FC<CharacterTalentPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  const character = characters[currentPlayerIndex];
  
  // Get the concept type (e.g., "Soldier" from "Soldier (Officer)")
  const conceptType = character.concept.split(' ')[0];
  
  // Get available talents for this concept
  const availableTalents = getAvailableTalents(conceptType);
  
  const handleTalentSelect = (talentName: string) => {
    characters[currentPlayerIndex] = { 
      ...character, 
      talent: talentName
    };
    updateAppState({ characters });
  };
  
  const randomizeIconAndProblem = () => {
    const randomIcon = getRandomElement(ICONS);
    const randomProblem = getRandomElement(PERSONAL_PROBLEMS);
    
    characters[currentPlayerIndex] = { 
      ...character, 
      icon: randomIcon,
      personalProblem: randomProblem
    };
    updateAppState({ characters });
  };
  
  const canProceed = character.talent !== '' && character.icon !== '' && character.personalProblem !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Talent & Icon - Player {currentPlayerIndex + 1}
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Choose Your Talent</h2>
        <p className="mb-4">
          Select a talent for your {character.concept}.
        </p>
        
        <div className="grid grid-cols-1 gap-3 mb-4 max-h-60 overflow-y-auto p-2">
          {availableTalents.map((talent) => (
            <SelectionCard
              key={talent.name}
              title={talent.name}
              description={talent.description}
              selected={character.talent === talent.name}
              onClick={() => handleTalentSelect(talent.name)}
            />
          ))}
        </div>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Icon & Personal Problem</h2>
        <p className="mb-4">
          Your character's icon and personal problem are randomly determined.
        </p>
        
        {character.icon && character.personalProblem ? (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p><strong>Icon:</strong> {character.icon}</p>
            <p><strong>Personal Problem:</strong> {character.personalProblem}</p>
          </div>
        ) : (
          <p className="text-gray-600 italic mb-4">Click the button below to randomly determine your icon and personal problem.</p>
        )}
        
        <Button 
          variant="secondary"
          onClick={randomizeIconAndProblem}
          className="mt-2"
        >
          Randomize Icon & Problem
        </Button>
      </Card>
      
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
          Next: Character Details
        </Button>
      </div>
    </div>
  );
};

export default CharacterTalentPage;
