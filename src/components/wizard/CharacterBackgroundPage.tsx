// src/components/wizard/CharacterBackgroundPage.tsx
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import SelectionCard from '../SelectionCard';
import { AppState } from '../../lib/types';
import { UPBRINGINGS, ORIGINS, HOME_WORLDS, PERSONAL_PROBLEMS, HUMANITIES } from '../../lib/data';

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
        // Background: home world and planetary origin
        homeWorld: '',
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
        portraitPrompt: '',
        startingbirr: 0
      };
      updateAppState({ characters: updatedCharacters });
    }
  }, [appState.characters, currentPlayerIndex, appState.groupConcept, appState.groupTalent, updateAppState]);

  // Tab state to switch between menus
  const [section, setSection] = useState<'homeWorld'|'origin'|'upbringing'|'humanity'>('homeWorld');
  
  // Get the current character (safely)
  const character = appState.characters[currentPlayerIndex] || {
    homeWorld: '',
    origin: '',
    upbringing: '',
    humanity: '',
    startingbirr: 0
  };

  const handleHomeWorldSelect = (homeWorld: string) => {
    const updatedCharacters = [...appState.characters];
    updatedCharacters[currentPlayerIndex] = { 
      ...(updatedCharacters[currentPlayerIndex] || {}), 
      homeWorld 
    };
    updateAppState({ characters: updatedCharacters });
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

  // Require homeWorld, origin, upbringing, and humanity
  const canProceed = character.homeWorld !== '' && character.origin !== '' && character.upbringing !== '' && character.humanity !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Background - Player {currentPlayerIndex + 1}
      </h1>
      {/* Menu Tabs */}
      <div className="flex justify-center mb-6 border-b border-gray-300">
        {[
          { key: 'homeWorld', label: 'Home World' },
          { key: 'origin', label: 'Origin' },
          { key: 'upbringing', label: 'Upbringing' },
          { key: 'humanity', label: 'Humanity' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSection(key as any)}
            className={
              `px-4 py-2 -mb-px font-medium transition-colors ` +
              (section === key
                ? 'text-accent-primary border-b-2 border-accent-primary'
                : 'text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400')
            }
          >
            {label}
          </button>
        ))}
      </div>
      
      {section === 'homeWorld' && (
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Home World</h2>
        <p className="mb-4">
          Select your character's home world:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {HOME_WORLDS.map((hw) => (
            <SelectionCard
              key={hw.name}
              title={hw.name}
              description={hw.description}
              selected={character.homeWorld === hw.name}
              onClick={() => handleHomeWorldSelect(hw.name)}
              className="h-full"
            />
          ))}
        </div>
      </Card>
      )}
      {section === 'origin' && (
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Origin</h2>
        <p className="mb-4">
          Select your character's planetary origin (star system):
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
      )}
      {section === 'upbringing' && (
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
              description={
                `Base Rep: ${upbringing.repBase}, Skill Points: ${upbringing.skillPoints}, ` +
                `Attribute Points: ${upbringing.attributePoints}, Starting Birr: ${upbringing.startingBirr}`
              }
              selected={character.upbringing === upbringing.name}
              onClick={() => handleUpbringingSelect(upbringing.name)}
              className="h-full"
            />
          ))}
        </div>
      </Card>
      )}
      {section === 'humanity' && (
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
              description={
                humanity.description
                  ? humanity.description
                  : `Rep Divisor: ${humanity.repDivisor}`
              }
              selected={character.humanity === humanity.name}
              onClick={() => handleHumanitySelect(humanity.name)}
              className="h-full"
            />
          ))}
        </div>
      </Card>
      )}
      {/* Navigation */}
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