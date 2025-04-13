// src/components/wizard/CharacterDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { generatePortrait, getPortraitFallbackText } from '../../lib/imageGenerator';
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
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
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
    
    // Also update the portrait prompt
    const portraitPrompt = generatePortraitPrompt(e.target.value, character.concept);
    
    characters[currentPlayerIndex] = { 
      ...character, 
      appearance: e.target.value,
      portraitPrompt
    };
    updateAppState({ characters });
  };
  
  // Generate a portrait prompt based on appearance description and concept
  const generatePortraitPrompt = (appearance: string, concept: string): string => {
    return `Portrait of a ${concept} character from the sci-fi RPG Coriolis. ${appearance}`;
  };
  
  const handleGeneratePortrait = async () => {
    if (!appearance.trim()) {
      setError('Please provide a character appearance before generating a portrait.');
      return;
    }
    
    setIsGeneratingPortrait(true);
    setError(null);
    
    try {
      const url = await generatePortrait(character);
      setPortraitUrl(url);
      
      // Update character with portrait URL
      characters[currentPlayerIndex] = {
        ...character,
        portraitUrl: url
      };
      updateAppState({ characters });
    } catch (err) {
      console.error('Error generating portrait:', err);
      setError('Failed to generate portrait. Please try again.');
    } finally {
      setIsGeneratingPortrait(false);
    }
  };
  
  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);
    setError(null);
    
    try {
      // Generate the PDF
      const pdfBytes = await generateCharacterSheet(character);
      
      // Convert the PDF to a data URL
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
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
    a.download = `${character.name.replace(/\s+/g, '_')}_character_sheet.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleNextClick = () => {
    // If we're on the last player, proceed to the next step
    if (currentPlayerIndex >= appState.totalPlayers - 1) {
      goToNextStep();
    } else {
      // Otherwise, move to the next player's background page
      updateAppState({ currentPlayerIndex: currentPlayerIndex + 1 });
      if (goToStep) {
        goToStep(3); // Index of the character background page
      }
    }
  };
  
  // Auto-generate portrait when both name and appearance are provided
  useEffect(() => {
    if (name.trim() && appearance.trim() && !portraitUrl && !isGeneratingPortrait) {
      handleGeneratePortrait();
    }
  }, [name, appearance]);
  
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
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Character Appearance</h2>
        <p className="mb-2 text-gray-300">
          Describe your character's physical appearance. This will be used to generate a portrait.
        </p>
        <textarea
          value={appearance}
          onChange={handleAppearanceChange}
          placeholder="Describe your character's appearance, clothing, and distinctive features..."
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
      </Card>
      
      {error && (
        <div className="mb-6 p-3 bg-red-900 bg-opacity-30 border border-red-700 text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {isGeneratingPortrait && (
        <Card className="mb-6 text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p>Generating character portrait...</p>
          </div>
        </Card>
      )}
      
      {portraitUrl && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Character Portrait</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="portrait-container w-40 h-40 flex-shrink-0">
              <img 
                src={portraitUrl} 
                alt={`Portrait of ${name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="mb-4">Your character portrait has been generated based on your description.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGeneratePortrait}
                  disabled={isGeneratingPortrait || !canProceed}
                >
                  Regenerate Portrait
                </Button>
                
                <Button 
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf || !portraitUrl}
                  variant="secondary"
                >
                  {isGeneratingPdf ? 'Generating PDF...' : 'Generate PDF'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {pdfUrl && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Character Sheet PDF</h2>
          <p className="mb-4">Your character sheet has been generated successfully!</p>
          <Button onClick={downloadPdf}>
            Download Character Sheet
          </Button>
        </Card>
      )}
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        <Button 
          onClick={handleNextClick}
          disabled={!canProceed}
        >
          {currentPlayerIndex < appState.totalPlayers - 1 
            ? "Next Player" 
            : "Finish"}
        </Button>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
