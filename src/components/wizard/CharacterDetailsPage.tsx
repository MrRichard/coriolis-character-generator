// src/components/wizard/CharacterDetailsPage.tsx
import React, { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { generateCharacterSheet } from '../../lib/pdfGenerator';

interface CharacterDetailsPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep?: (step: number) => void;
}

const CharacterDetailsPage: React.FC<CharacterDetailsPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep,
  goToStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  const character = characters[currentPlayerIndex];
  
  const [name, setName] = useState(character.name || '');
  const [appearance, setAppearance] = useState(character.appearance || '');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    characters[currentPlayerIndex] = {
      ...character,
      name: e.target.value
    };
    updateAppState({ characters });
  };

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppearance(e.target.value);
    characters[currentPlayerIndex] = {
      ...character,
      appearance: e.target.value
    };
    updateAppState({ characters });
  };

  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);
    setError(null);
    try {
      const pdfBytes = await generateCharacterSheet(character);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `${(name || 'character').replace(/\s+/g, '_')}_character_sheet.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleNextClick = () => {
    if (currentPlayerIndex >= appState.totalPlayers - 1) {
      goToNextStep();
    } else {
      updateAppState({ currentPlayerIndex: currentPlayerIndex + 1 });
      if (goToStep) goToStep(3);
    }
  };

  const canProceed = name.trim() !== '' && appearance.trim() !== '';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Details - Player {currentPlayerIndex + 1}
      </h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Character Name</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter character name"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Character Appearance</h2>
        <p className="mb-2 text-blue-300">
          Describe your character's physical appearance. This will appear on the character sheet.
        </p>
        <textarea
          value={appearance}
          onChange={handleAppearanceChange}
          placeholder="Describe your character's appearance, clothing, and distinctive features..."
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
      </Card>

      {error && (
        <div className="mb-6 p-3 bg-red-900 bg-opacity-30 border border-red-700 text-red-200 rounded-md">
          {error}
        </div>
      )}

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate PDF</h2>
        <Button
          onClick={handleGeneratePdf}
          disabled={isGeneratingPdf || !canProceed}
          className="w-full"
        >
          {isGeneratingPdf ? 'Generating PDF...' : 'Generate PDF'}
        </Button>
      </Card>

      {pdfUrl && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Character Sheet PDF</h2>
          <p className="mb-4">Your character sheet has been generated successfully!</p>
          <div className="flex gap-3">
            <Button onClick={downloadPdf}>Download Character Sheet</Button>
            <Button onClick={() => window.open(pdfUrl, '_blank')} variant="secondary">
              View PDF in Browser
            </Button>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>
          Back
        </Button>
        <Button onClick={handleNextClick} disabled={!canProceed}>
          {currentPlayerIndex < appState.totalPlayers - 1 ? 'Next Player' : 'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;