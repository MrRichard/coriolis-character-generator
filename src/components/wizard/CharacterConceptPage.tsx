// src/components/wizard/CharacterConceptPage.tsx
import React, { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { PLAYER_CONCEPTS, calculateReputation, UPBRINGINGS, HUMANITIES, GROUP_CONCEPTS } from '../../lib/data';

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
  // Partition into recommended vs others based on selected group
  const groupDef = GROUP_CONCEPTS.find(g => g.name === groupConcept);
  const recommendedConcepts = availableConcepts.filter(c => groupDef?.concepts.includes(c.name));
  const otherConcepts = availableConcepts.filter(c => !groupDef?.concepts.includes(c.name));

  const handleConceptSelect = (conceptName: string) => {
    const selectedConcept = PLAYER_CONCEPTS.find(c => c.name === conceptName);
    
    if (selectedConcept) {
      // Retrieve upbringing and humanity records for calculation
      const selectedUpbringing = UPBRINGINGS.find(u => u.name === character.upbringing);
      const selectedHumanity = HUMANITIES.find(h => h.name === character.humanity);
      if (!selectedUpbringing || !selectedHumanity) {
        return;
      }
      // Calculate reputation using configured data
      const reputation = calculateReputation(
        selectedUpbringing,
        selectedConcept,
        selectedHumanity
      );
      
      characters[currentPlayerIndex] = { 
        ...character, 
        concept: conceptName,
        reputation
      };
      updateAppState({ characters });
    }
  };

  const canProceed = character.concept !== '';
  // State to toggle display of non-recommended concepts
  const [showOther, setShowOther] = useState(false);

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
      
      <div className="mb-6 space-y-6">
        {recommendedConcepts.length > 0 && (
          <Card className="border-2 border-accent-primary bg-accent-primary bg-opacity-10 p-4">
            <h3 className="text-lg font-semibold mb-4">Recommended Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendedConcepts.map(concept => (
                <SelectionCard
                  key={concept.name}
                  title={concept.name}
                  description={`Key Attribute: ${concept.keyAttribute}, Rep Bonus: ${concept.repBonus > 0 ? '+' + concept.repBonus : concept.repBonus}`}
                  selected={character.concept === concept.name}
                  onClick={() => handleConceptSelect(concept.name)}
                />
              ))}
            </div>
          </Card>
        )}
        {otherConcepts.length > 0 && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Other Concepts</h3>
              <Button
                variant="outline"
                className="text-sm px-2 py-1"
                onClick={() => setShowOther(!showOther)}
              >
                {showOther ? 'Hide' : 'Show'} Others
              </Button>
            </div>
            {showOther && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {otherConcepts.map(concept => (
                  <SelectionCard
                    key={concept.name}
                    title={concept.name}
                    description={`Key Attribute: ${concept.keyAttribute}, Rep Bonus: ${concept.repBonus > 0 ? '+' + concept.repBonus : concept.repBonus}`}
                    selected={character.concept === concept.name}
                    onClick={() => handleConceptSelect(concept.name)}
                  />
                ))}
              </div>
            )}
          </Card>
        )}
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
