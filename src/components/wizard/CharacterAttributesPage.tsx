// src/components/wizard/CharacterAttributesPage.tsx
import React, { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { PLAYER_CONCEPTS, UPBRINGINGS } from '../../lib/data';

interface CharacterAttributesPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const CharacterAttributesPage: React.FC<CharacterAttributesPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  const character = characters[currentPlayerIndex];
  
  const selectedConcept = PLAYER_CONCEPTS.find(c => c.name === character.concept);
  const selectedUpbringing = UPBRINGINGS.find(u => u.name === character.upbringing);
  const totalAttributePoints = selectedUpbringing?.attributePoints ?? 10;
  const keyAttribute = selectedConcept?.keyAttribute || '';
  
  const [attributes, setAttributes] = useState({
    strength: character.strength || 1,
    agility: character.agility || 1,
    wits: character.wits || 1,
    empathy: character.empathy || 1
  });
  
  const [pointsRemaining, setPointsRemaining] = useState(
    totalAttributePoints - (attributes.strength + attributes.agility + attributes.wits + attributes.empathy)
  );
  
  const handleAttributeChange = (attribute: keyof typeof attributes, value: number) => {
    // Check if the new value is valid
    if (value < 1) return; // Minimum value is 1
    
    // For key attribute, maximum is 5, for others it's 4
    const maxValue = attribute.toLowerCase() === keyAttribute.toLowerCase() ? 5 : 4;
    if (value > maxValue) return;
    
    // Calculate points that would be used with this change
    const pointDifference = value - attributes[attribute];
    
    // Check if we have enough points
    if (pointsRemaining - pointDifference < 0) return;
    
    // Update the attribute and remaining points
    const newAttributes = { ...attributes, [attribute]: value };
    setAttributes(newAttributes);
    setPointsRemaining(pointsRemaining - pointDifference);
    
    // Update character
    characters[currentPlayerIndex] = { 
      ...character, 
      strength: newAttributes.strength,
      agility: newAttributes.agility,
      wits: newAttributes.wits,
      empathy: newAttributes.empathy
    };
    updateAppState({ characters });
  };
  
  const randomizeAttributes = () => {
    // Start with all attributes at 1
    let newAttributes = {
      strength: 1,
      agility: 1,
      wits: 1,
      empathy: 1
    };
    
    // Distribute remaining points randomly (totalAttributePoints - 4 starting points)
    let pointsToDistribute = totalAttributePoints - 4;
    
    while (pointsToDistribute > 0) {
      // Randomly select an attribute
      const attributes = ['strength', 'agility', 'wits', 'empathy'] as const;
      const randomAttribute = attributes[Math.floor(Math.random() * attributes.length)];
      
      // Check if we can increase this attribute
      const isKeyAttribute = randomAttribute.toLowerCase() === keyAttribute.toLowerCase();
      const maxValue = isKeyAttribute ? 5 : 4;
      
      if (newAttributes[randomAttribute] < maxValue) {
        newAttributes[randomAttribute]++;
        pointsToDistribute--;
      }
    }
    
    // Update state
    setAttributes(newAttributes);
    setPointsRemaining(0);
    
    // Update character
    characters[currentPlayerIndex] = { 
      ...character, 
      strength: newAttributes.strength,
      agility: newAttributes.agility,
      wits: newAttributes.wits,
      empathy: newAttributes.empathy
    };
    updateAppState({ characters });
  };
  
  const canProceed = pointsRemaining === 0;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Attributes - Player {currentPlayerIndex + 1}
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Distribute Attribute Points</h2>
        <p className="mb-4">
          Distribute {totalAttributePoints} points among your attributes. Your key attribute ({keyAttribute}) can go up to 5, others max at 4.
        </p>
        {/* Emphasized points remaining */}
        <div className="mb-4 flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-accent-primary">{pointsRemaining}</span>
          <span className="text-lg text-secondary">points remaining</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 border rounded-md">
            <h3 className={`font-medium ${keyAttribute === 'Strength' ? 'text-blue-600' : ''}`}>
              Strength {keyAttribute === 'Strength' ? '(Key)' : ''}
            </h3>
            <div className="flex items-center mt-2">
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('strength', attributes.strength - 1)}
              >
                -
              </button>
              <span className="mx-4 text-2xl font-bold text-accent-primary">{attributes.strength}</span>
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('strength', attributes.strength + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <h3 className={`font-medium ${keyAttribute === 'Agility' ? 'text-blue-600' : ''}`}>
              Agility {keyAttribute === 'Agility' ? '(Key)' : ''}
            </h3>
            <div className="flex items-center mt-2">
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('agility', attributes.agility - 1)}
              >
                -
              </button>
              <span className="mx-4 text-2xl font-bold text-accent-primary">{attributes.agility}</span>
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('agility', attributes.agility + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <h3 className={`font-medium ${keyAttribute === 'Wits' ? 'text-blue-600' : ''}`}>
              Wits {keyAttribute === 'Wits' ? '(Key)' : ''}
            </h3>
            <div className="flex items-center mt-2">
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('wits', attributes.wits - 1)}
              >
                -
              </button>
              <span className="mx-4 text-2xl font-bold text-accent-primary">{attributes.wits}</span>
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('wits', attributes.wits + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <h3 className={`font-medium ${keyAttribute === 'Empathy' ? 'text-blue-600' : ''}`}>
              Empathy {keyAttribute === 'Empathy' ? '(Key)' : ''}
            </h3>
            <div className="flex items-center mt-2">
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('empathy', attributes.empathy - 1)}
              >
                -
              </button>
              <span className="mx-4 text-2xl font-bold text-accent-primary">{attributes.empathy}</span>
              <button 
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handleAttributeChange('empathy', attributes.empathy + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <Button 
          variant="secondary"
          onClick={randomizeAttributes}
          className="mt-2"
        >
          Randomize Attributes
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
          Next: Skills
        </Button>
      </div>
    </div>
  );
};

export default CharacterAttributesPage;
