// src/components/wizard/GenerateCharacterSheetsPage.tsx
import React, { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { generateCharacterSheet, addPortraitToSheet } from '../../lib/pdfGenerator';
import { generatePortrait, getPortraitFallbackText } from '../../lib/imageGenerator';

interface GenerateCharacterSheetsPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

const GenerateCharacterSheetsPage: React.FC<GenerateCharacterSheetsPageProps> = ({
  appState,
  updateAppState,
  goToPreviousStep,
  isLastStep
}) => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<{name: string, url: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const generateCharacterSheets = async () => {
    setGenerating(true);
    setError(null);
    setProgress('Starting character sheet generation...');
    
    try {
      const generatedSheets: {name: string, url: string}[] = [];
      
      // For each character, generate a character sheet
      for (let i = 0; i < appState.characters.length; i++) {
        const character = appState.characters[i];
        setProgress(`Processing character ${i + 1} of ${appState.characters.length}: ${character.name}...`);
        
        // Generate the PDF
        setProgress(`Generating PDF for ${character.name}...`);
        const pdfBytes = await generateCharacterSheet(character);
        
        // Generate the portrait if possible
        setProgress(`Generating portrait for ${character.name}...`);
        let finalPdfBytes = pdfBytes;
        
        try {
          const portraitUrl = await generatePortrait(character);
          
          if (portraitUrl) {
            // Add the portrait to the PDF
            setProgress(`Adding portrait to PDF for ${character.name}...`);
            finalPdfBytes = await addPortraitToSheet(pdfBytes, portraitUrl);
          } else {
            // Use fallback text
            setProgress(`Using fallback text for ${character.name}'s portrait...`);
            // In a real implementation, we would add the fallback text to the PDF
          }
        } catch (err) {
          console.error('Error generating portrait:', err);
          setProgress(`Error generating portrait for ${character.name}, using fallback...`);
          // Continue without the portrait
        }
        
        // Convert the PDF to a data URL
        const pdfBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Add the generated sheet to the list
        const fileName = `${character.name.replace(/\s+/g, '_')}_character_sheet.pdf`;
        generatedSheets.push({
          name: fileName,
          url: pdfUrl
        });
        
        setProgress(`Completed character sheet for ${character.name}`);
      }
      
      setGenerated(generatedSheets);
      setProgress('All character sheets generated successfully!');
    } catch (err) {
      console.error('Error generating character sheets:', err);
      setError('An error occurred while generating character sheets. Please try again.');
      setProgress('');
    } finally {
      setGenerating(false);
    }
  };

  const downloadPdf = (url: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Generate Character Sheets
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Character Summary</h2>
        <p className="mb-4">
          You have created {appState.characters.length} characters:
        </p>
        
        <div className="space-y-3 mb-4">
          {appState.characters.map((character, index) => (
            <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="font-medium">{character.name || `Character ${index + 1}`}</h3>
              <p>Concept: {character.concept}</p>
              <p>Origin: {character.origin}</p>
              <p>Talent: {character.talent}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Character Sheets</h2>
        <p className="mb-4">
          Click the button below to generate character sheets for all characters. 
          This will create PDF files with character information and generate portraits using AI.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {progress && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700">{progress}</p>
          </div>
        )}
        
        {generated.length > 0 ? (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-medium text-green-700 mb-2">Character Sheets Generated!</h3>
            <ul className="list-disc pl-5 space-y-1">
              {generated.map((sheet, index) => (
                <li key={index}>
                  <button 
                    className="text-blue-600 hover:underline"
                    onClick={() => downloadPdf(sheet.url, sheet.name)}
                  >
                    {sheet.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Button
            onClick={generateCharacterSheets}
            disabled={generating}
            className="w-full"
          >
            {generating ? 'Generating...' : 'Generate Character Sheets'}
          </Button>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        
        {generated.length > 0 && (
          <Button 
            onClick={() => {
              // Reset the wizard
              window.location.reload();
            }}
          >
            Create New Characters
          </Button>
        )}
      </div>
    </div>
  );
};

export default GenerateCharacterSheetsPage;
