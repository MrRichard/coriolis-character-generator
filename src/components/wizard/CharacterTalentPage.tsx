// src/components/wizard/CharacterTalentPage.tsx
import React, { useEffect } from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { TALENTS, ICONS, PERSONAL_PROBLEMS, getAvailableTalents, getRandomElement, HUMANITY_TALENTS } from '../../lib/data';

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
  const isMutatedHumanity = ['Sirb', 'Xinghur', 'Nerid'].includes(character.humanity);
  // Map mutated humanity to its inherent talent
  const humanityTalentMap: Record<string, string> = {
    Sirb: 'Pheromones',
    Xinghur: 'Resistant',
    Nerid: 'Water Breathing'
  };
  const innateTalentName = humanityTalentMap[character.humanity] || '';
  // Automatically set the talent for mutated humanities
  useEffect(() => {
    if (isMutatedHumanity && character.talent !== innateTalentName) {
      const updatedChars = [...characters];
      updatedChars[currentPlayerIndex] = { ...character, talent: innateTalentName };
      updateAppState({ characters: updatedChars });
    }
  }, [isMutatedHumanity, innateTalentName, character.talent]);
  
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
    // Update character with icon, its associated talent, and description
    characters[currentPlayerIndex] = { 
      ...character,
      icon: randomIcon.name,
      iconTalent: randomIcon.talent,
      iconTalentDescription: randomIcon.talentDescription,
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
      
      {/* Inherent abilities for mutated humanities */}
      {isMutatedHumanity && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Inherent Ability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {HUMANITY_TALENTS.map((ht) => (
              <SelectionCard
                key={ht.name}
                title={ht.name}
                description={ht.description}
                selected={ht.name === innateTalentName}
                disabled={true}
              />
            ))}
          </div>
        </Card>
      )}
      {/* General talents: only for Pure-blood humans */}
      {!isMutatedHumanity && (
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
      )}
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Icon & Personal Problem</h2>
        <p className="mb-4">
          Your character's icon and personal problem are randomly determined.
        </p>
        
        {character.icon && character.personalProblem ? (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p><strong>Icon:</strong> {character.icon}</p>
            <p><strong>Icon Talent:</strong> {character.iconTalent || `${character.icon} Talent`}</p>
            {character.iconTalentDescription && (
              <p className="text-sm opacity-80 mb-2">{character.iconTalentDescription}</p>
            )}
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
