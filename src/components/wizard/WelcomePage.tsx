// src/components/wizard/WelcomePage.tsx
import React from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';

interface WelcomePageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  isFirstStep: boolean;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  isFirstStep
}) => {
  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0 && count <= 6) {
      updateAppState({ totalPlayers: count });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Coriolis RPG Character Generator</h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Coriolis Character Generator</h2>
        <p className="mb-4">
          This wizard will guide you through creating characters for the Coriolis RPG. 
          We'll start with group-level decisions and then create individual characters.
        </p>
        <p className="mb-4">
          The process includes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Selecting your group concept</li>
          <li>Choosing a group talent</li>
          <li>Creating individual characters with backgrounds, concepts, attributes, and skills</li>
          <li>Generating character portraits</li>
          <li>Producing downloadable character sheets</li>
        </ul>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">How Many Players?</h2>
        <p className="mb-4">
          Please specify the number of players in your group:
        </p>
        <div className="flex items-center mb-4">
          <input
            type="number"
            min="1"
            max="6"
            value={appState.totalPlayers}
            onChange={handlePlayerCountChange}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">players</span>
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={goToNextStep}>
          Begin Character Creation
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
