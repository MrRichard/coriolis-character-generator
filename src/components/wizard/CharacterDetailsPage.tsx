// src/components/wizard/CharacterDetailsPage.tsx
import React, { useState, useRef } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { generatePortrait, getPortraitFallbackText } from '../../lib/imageGenerator';
import { generateCharacterSheet, addPortraitToSheetFromBlob } from '../../lib/pdfGenerator';

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
  const [portraitUrl, setPortraitUrl] = useState<string | null>(character.portraitUrl || null);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  // Reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Store the actual image blob
  const [portraitBlob, setPortraitBlob] = useState<Blob | null>(null);
  
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
    return `Detailed pen and ink contour portrait drawing of a ${concept} character from the sci-fi RPG Coriolis. 
    The portrait should focus on just the face and shoulders, with no text overlays, signature, watermarks, or additional artwork. 
    Clean black lines on white background. No background elements or scenes.
    
    Character description: ${appearance}`;
  };
  
  const handleGeneratePortrait = async () => {
    if (!appearance.trim()) {
      setError('Please provide a character appearance before generating a portrait.');
      return;
    }
    
    setIsGeneratingPortrait(true);
    setError(null);
    setStatusMessage(null);
    
    try {
      const url = await generatePortrait(character);
      if (!url) {
        throw new Error('Failed to generate portrait');
      }
      
      setPortraitUrl(url);
      
      // Update character with portrait URL
      characters[currentPlayerIndex] = {
        ...character,
        portraitUrl: url
      };
      updateAppState({ characters });
      
      // Try to fetch as blob
      try {
        const response = await fetch(url, { mode: 'no-cors' });
        // Note: with mode: 'no-cors', we can't access the response content due to CORS restrictions
        // This is why we have the upload option as a more reliable approach
        setStatusMessage('Portrait generated successfully. To include it in the PDF, you may need to download and then upload it.');
      } catch (fetchError) {
        console.error('Could not fetch portrait as blob:', fetchError);
        setStatusMessage('Portrait generated. Please download and upload it to include in the PDF.');
      }
    } catch (err) {
      console.error('Error generating portrait:', err);
      setError('Failed to generate portrait. Please try again or upload your own image.');
    } finally {
      setIsGeneratingPortrait(false);
    }
  };
  
  // Handle file upload button click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle when user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Store the file object directly
      setPortraitBlob(file);
      
      // Create a URL for display
      const localUrl = URL.createObjectURL(file);
      setPortraitUrl(localUrl);
      
      // Update character
      characters[currentPlayerIndex] = {
        ...character,
        portraitUrl: localUrl
      };
      updateAppState({ characters });
      
      // Reset messages
      setError(null);
      setStatusMessage('Image uploaded successfully. Ready for PDF generation.');
    }
  };
  
  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);
    setError(null);
    setStatusMessage(null);
    
    try {
      // Generate the basic character sheet
      let pdfBytes = await generateCharacterSheet(character);
      
      // If we have a portrait blob, add it to the PDF
      if (portraitBlob) {
        try {
          console.log('Attempting to add portrait blob to PDF...');
          setStatusMessage('Adding portrait to PDF...');
          pdfBytes = await addPortraitToSheetFromBlob(pdfBytes, portraitBlob);
          setStatusMessage('Portrait added to PDF successfully!');
        } catch (portraitError) {
          console.error('Error adding portrait to PDF:', portraitError);
          setError('Could not add portrait to PDF. Character sheet will be generated without the portrait.');
        }
      } else if (portraitUrl) {
        setStatusMessage('No local portrait data available. PDF will be generated without portrait.');
      }
      
      // Create a blob URL for the PDF
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
  
  // Handle directly downloading the portrait - open in new tab
  const handleViewPortrait = (e: React.MouseEvent) => {
    if (!portraitUrl) return;
    
    // Open in a new tab
    window.open(portraitUrl, '_blank');
  };
  
  // Direct download without opening
  const handleDownloadPortrait = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    
    if (!portraitUrl) return;
    
    // Create a temporary anchor and trigger download
    const a = document.createElement('a');
    a.href = portraitUrl;
    a.download = `${character.name || 'character'}_portrait.png`;
    a.target = '_blank'; // This helps in some browsers
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          Describe your character's physical appearance. This will be used to generate a portrait.
        </p>
        <textarea
          value={appearance}
          onChange={handleAppearanceChange}
          placeholder="Describe your character's appearance, clothing, and distinctive features..."
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
        
        <div className="flex flex-wrap gap-3 mt-4">
          <Button 
            onClick={handleGeneratePortrait}
            disabled={isGeneratingPortrait || !appearance.trim()}
          >
            {isGeneratingPortrait ? 'Generating...' : 'Generate Portrait'}
          </Button>
          
          <Button 
            onClick={handleUploadClick}
            variant="secondary"
          >
            Upload Your Own Portrait
          </Button>
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </Card>
      
      {statusMessage && (
        <div className="mb-6 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 text-blue-200 rounded-md">
          {statusMessage}
        </div>
      )}
      
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
              <p className="mb-4">Your character portrait is ready!</p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleViewPortrait}
                >
                  View Full Image
                </Button>
                
                <Button 
                  onClick={handleDownloadPortrait}
                  variant="secondary"
                >
                  Download Portrait
                </Button>
                
                {!portraitBlob && (
                  <Button 
                    onClick={handleUploadClick}
                    variant="outline"
                  >
                    Save & Upload For PDF
                  </Button>
                )}
                
                <Button 
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                  variant={portraitBlob ? "primary" : "secondary"}
                >
                  {isGeneratingPdf ? 'Generating PDF...' : (portraitBlob ? 'Generate PDF with Portrait' : 'Generate PDF (no portrait)')}
                </Button>
              </div>
              
              {!portraitBlob && (
                <p className="mt-3 text-yellow-300 text-sm">
                  Tip: For best results with PDF integration, first download the portrait, 
                  then click "Save & Upload For PDF" and select the downloaded image.
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
      
      {pdfUrl && (
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Character Sheet PDF</h2>
          <p className="mb-4">Your character sheet has been generated successfully!</p>
          <div className="flex gap-3">
            <Button onClick={downloadPdf}>
              Download Character Sheet
            </Button>
            
            <Button 
              onClick={() => window.open(pdfUrl, '_blank')}
              variant="secondary"
            >
              View PDF in Browser
            </Button>
          </div>
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