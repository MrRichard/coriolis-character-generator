// src/components/wizard/CharacterConceptPage.tsx
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { PLAYER_CONCEPTS, calculateReputation } from '../../lib/data';

interface CharacterConceptPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const CharacterConceptPage: React.FC<CharacterConceptPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  const character = characters[currentPlayerIndex];
  
  // Filter concepts based on group concept if needed
  const groupConcept = appState.groupConcept;
  const availableConcepts = PLAYER_CONCEPTS;

  const handleConceptSelect = (conceptName: string) => {
    const selectedConcept = PLAYER_CONCEPTS.find(c => c.name === conceptName);
    
    if (selectedConcept) {
      // Find the upbringing and humanity objects
      const upbringing = { 
        name: character.upbringing,
        repBase: character.upbringing === 'Plebian' ? 2 : 
                 character.upbringing === 'Stationary' ? 4 : 6,
        skillPoints: character.upbringing === 'Plebian' ? 8 : 
                     character.upbringing === 'Stationary' ? 10 : 12
      };
      
      const humanity = {
        name: character.humanity,
        repDivisor: character.humanity === 'Pure-blood' ? 1 : 2
      };
      
      // Calculate reputation
      const reputation = calculateReputation(upbringing, selectedConcept, humanity);
      
      characters[currentPlayerIndex] = { 
        ...character, 
        concept: conceptName,
        reputation
      };
      updateAppState({ characters });
    }
  };

  const canProceed = character.concept !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Concept - Player {currentPlayerIndex + 1}
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Choose Your Concept</h2>
        <p className="mb-4">
          Your concept defines your character's profession and role within the group.
        </p>
        
        {character.concept && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="font-medium">Selected: {character.concept}</p>
            <p>Key Attribute: {PLAYER_CONCEPTS.find(c => c.name === character.concept)?.keyAttribute}</p>
            <p>Reputation: {character.reputation}</p>
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 gap-3 mb-6 max-h-96 overflow-y-auto p-2">
        {availableConcepts.map((concept) => (
          <SelectionCard
            key={concept.name}
            title={concept.name}
            description={`Key Attribute: ${concept.keyAttribute}, Rep Bonus: ${concept.repBonus > 0 ? '+' + concept.repBonus : concept.repBonus}`}
            selected={character.concept === concept.name}
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
          Next: Character Details
        </Button>
      </div>
    </div>
  );
};

export default CharacterConceptPage;
