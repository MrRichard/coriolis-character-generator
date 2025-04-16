// src/components/wizard/CharacterBackgroundPage.tsx
import React, { useEffect } from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { UPBRINGINGS, ORIGINS, PERSONAL_PROBLEMS, HUMANITIES } from '../../lib/data';

interface CharacterBackgroundPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const CharacterBackgroundPage: React.FC<CharacterBackgroundPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  
  // Move character initialization to useEffect to avoid setState during render
  useEffect(() => {
    // Initialize character if it doesn't exist
    if (!appState.characters[currentPlayerIndex]) {
      const updatedCharacters = [...appState.characters];
      updatedCharacters[currentPlayerIndex] = {
        groupConcept: appState.groupConcept,
        groupTalent: appState.groupTalent,
        name: '',
        concept: '',
        origin: '',
        upbringing: '',
        humanity: '',
        reputation: 0,
        strength: 1,
        agility: 1,
        wits: 1,
        empathy: 1,
        dexterity: 0,
        force: 0,
        infiltration: 0,
        manipulation: 0,
        meleeCombat: 0,
        observation: 0,
        rangedCombat: 0,
        survival: 0,
        command: 0,
        culture: 0,
        dataDjinn: 0,
        medicurgy: 0,
        mysticPowers: 0,
        pilot: 0,
        science: 0,
        technology: 0,
        talent: '',
        icon: '',
        iconTalent: '',
        personalProblem: '',
        appearance: '',
        portraitPrompt: ''
      };
      updateAppState({ characters: updatedCharacters });
    }
  }, [appState.characters, currentPlayerIndex, appState.groupConcept, appState.groupTalent, updateAppState]);

  // Get the current character (safely)
  const character = appState.characters[currentPlayerIndex] || {
    origin: '',
    upbringing: '',
    humanity: ''
  };

  const handleOriginSelect = (origin: string) => {
    const updatedCharacters = [...appState.characters];
    updatedCharacters[currentPlayerIndex] = { 
      ...(updatedCharacters[currentPlayerIndex] || {}), 
      origin 
    };
    updateAppState({ characters: updatedCharacters });
  };

  const handleUpbringingSelect = (upbringing: string) => {
    const updatedCharacters = [...appState.characters];
    updatedCharacters[currentPlayerIndex] = { 
      ...(updatedCharacters[currentPlayerIndex] || {}), 
      upbringing 
    };
    updateAppState({ characters: updatedCharacters });
  };

  const handleHumanitySelect = (humanity: string) => {
    const updatedCharacters = [...appState.characters];
    updatedCharacters[currentPlayerIndex] = { 
      ...(updatedCharacters[currentPlayerIndex] || {}), 
      humanity 
    };
    updateAppState({ characters: updatedCharacters });
  };

  const canProceed = character.origin !== '' && character.upbringing !== '' && character.humanity !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Background - Player {currentPlayerIndex + 1}
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Origin</h2>
        <p className="mb-4">
          Select your character's origin system:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {ORIGINS.map((origin) => (
            <SelectionCard
              key={origin.name}
              title={origin.name}
              description={origin.description}
              selected={character.origin === origin.name}
              onClick={() => handleOriginSelect(origin.name)}
              className="h-full"
            />
          ))}
        </div>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upbringing</h2>
        <p className="mb-4">
          Select your character's upbringing:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {UPBRINGINGS.map((upbringing) => (
            <SelectionCard
              key={upbringing.name}
              title={upbringing.name}
              description={`Base Rep: ${upbringing.repBase}, Skill Points: ${upbringing.skillPoints}`}
              selected={character.upbringing === upbringing.name}
              onClick={() => handleUpbringingSelect(upbringing.name)}
              className="h-full"
            />
          ))}
        </div>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Humanity</h2>
        <p className="mb-4">
          Select your character's humanity:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {HUMANITIES.map((humanity) => (
            <SelectionCard
              key={humanity.name}
              title={humanity.name}
              description={`Rep Divisor: ${humanity.repDivisor}`}
              selected={character.humanity === humanity.name}
              onClick={() => handleHumanitySelect(humanity.name)}
              className="h-full"
            />
          ))}
        </div>
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
          Next: Character Concept
        </Button>
      </div>
    </div>
  );
};

export default CharacterBackgroundPage;