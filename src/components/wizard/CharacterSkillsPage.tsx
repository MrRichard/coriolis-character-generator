// src/components/wizard/CharacterSkillsPage.tsx
import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Button from '../Button';
import { AppState } from '../../lib/types';
import { PLAYER_CONCEPTS, UPBRINGINGS } from '../../lib/data';

interface CharacterSkillsPageProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const CharacterSkillsPage: React.FC<CharacterSkillsPageProps> = ({
  appState,
  updateAppState,
  goToNextStep,
  goToPreviousStep
}) => {
  const currentPlayerIndex = appState.currentPlayerIndex;
  const characters = [...appState.characters];
  const character = characters[currentPlayerIndex];
  
  const selectedConcept = PLAYER_CONCEPTS.find(c => c.name === character.concept);
  const upbringing = UPBRINGINGS.find(u => u.name === character.upbringing);
  const totalSkillPoints = upbringing?.skillPoints || 10;
  
  // Get the advanced skills for this concept
  const advancedSkills = selectedConcept?.advancedSkills || [];
  
  // Determine the cap for each skill: general and concept-advanced => 3, others => 1
  const getSkillCap = (skillKey: keyof typeof skills): number => {
    if (isGeneralSkill(skillKey)) return 3;
    const name = formatSkillName(skillKey);
    return advancedSkills.includes(name) ? 3 : 1;
  };
  
  // Initialize skills state
  const [skills, setSkills] = useState({
    // General skills
    dexterity: character.dexterity || 0,
    force: character.force || 0,
    infiltration: character.infiltration || 0,
    manipulation: character.manipulation || 0,
    meleeCombat: character.meleeCombat || 0,
    observation: character.observation || 0,
    rangedCombat: character.rangedCombat || 0,
    survival: character.survival || 0,
    
    // Advanced skills
    command: character.command || 0,
    culture: character.culture || 0,
    dataDjinn: character.dataDjinn || 0,
    medicurgy: character.medicurgy || 0,
    mysticPowers: character.mysticPowers || 0,
    pilot: character.pilot || 0,
    science: character.science || 0,
    technology: character.technology || 0
  });
  
  // Calculate points used
  const [pointsUsed, setPointsUsed] = useState(
    Object.values(skills).reduce((sum, value) => sum + value, 0)
  );
  
  useEffect(() => {
    setPointsUsed(Object.values(skills).reduce((sum, value) => sum + value, 0));
  }, [skills]);
  
  const handleSkillChange = (skill: keyof typeof skills, value: number) => {
    // Ensure within bounds
    if (value < 0) return;
    const cap = getSkillCap(skill);
    if (value > cap) return;
    
    // Calculate points difference and enforce total
    const diff = value - skills[skill];
    if (pointsUsed + diff > totalSkillPoints) return;
    
    // Apply update
    const newSkills = { ...skills, [skill]: value };
    setSkills(newSkills);
    characters[currentPlayerIndex] = { ...character, ...newSkills };
    updateAppState({ characters });
  };
  
  const randomizeSkills = () => {
    // Start with all skills at 0
    let newSkills = {
      // General skills
      dexterity: 0,
      force: 0,
      infiltration: 0,
      manipulation: 0,
      meleeCombat: 0,
      observation: 0,
      rangedCombat: 0,
      survival: 0,
      
      // Advanced skills
      command: 0,
      culture: 0,
      dataDjinn: 0,
      medicurgy: 0,
      mysticPowers: 0,
      pilot: 0,
      science: 0,
      technology: 0
    };
    
    // Get all available skills for this concept
    const availableSkills: (keyof typeof newSkills)[] = [
      'dexterity', 'force', 'infiltration', 'manipulation', 
      'meleeCombat', 'observation', 'rangedCombat', 'survival'
    ];
    
    // Add advanced skills if available for this concept
    for (const skill of advancedSkills) {
      const skillKey = formatSkillKey(skill);
      if (skillKey in newSkills) {
        availableSkills.push(skillKey as keyof typeof newSkills);
      }
    }
    
    // Distribute points randomly
    let pointsToDistribute = totalSkillPoints;
    
    while (pointsToDistribute > 0) {
      // Randomly select a skill
      const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      
      // Check if we can increase this skill
      if (newSkills[randomSkill] < 3) {
        newSkills[randomSkill]++;
        pointsToDistribute--;
      }
    }
    
    // Update state
    setSkills(newSkills);
    
    // Update character
    characters[currentPlayerIndex] = { 
      ...character,
      ...newSkills
    };
    updateAppState({ characters });
  };
  
  // Helper function to check if a skill is a general skill
  const isGeneralSkill = (skill: string): boolean => {
    const generalSkills = [
      'dexterity', 'force', 'infiltration', 'manipulation', 
      'meleeCombat', 'observation', 'rangedCombat', 'survival'
    ];
    return generalSkills.includes(skill);
  };
  
  // Helper function to format skill name for display
  const formatSkillName = (skill: string): string => {
    // Convert camelCase to Title Case with spaces
    return skill
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };
  
  // Helper function to convert formatted skill name to camelCase key
  const formatSkillKey = (skillName: string): string => {
    // Convert "Data Djinn" to "dataDjinn"
    return skillName
      .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
      .replace(/\s/g, '')
      .replace(/^./, str => str.toLowerCase());
  };
  
  const canProceed = pointsUsed === totalSkillPoints;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Character Skills - Player {currentPlayerIndex + 1}
      </h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Distribute Skill Points</h2>
        <p className="mb-4">
          Distribute {totalSkillPoints} skill points. Each skill can have a maximum of 3 points.
        </p>
        <div className="mb-4 flex items-baseline space-x-2">
          <span className="text-lg text-secondary">Points used:</span>
          <span className="text-2xl font-bold text-accent-primary">{pointsUsed}</span>
          <span className="text-lg text-secondary">/</span>
          <span className="text-2xl font-bold text-accent-primary">{totalSkillPoints}</span>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">General Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['dexterity', 'force', 'infiltration', 'manipulation',
              'meleeCombat', 'observation', 'rangedCombat', 'survival'].map(skill => {
              const key = skill as keyof typeof skills;
              const cap = getSkillCap(key);
              return (
              <div key={skill} className="p-3 border rounded-md">
                <h4 className="font-medium">{formatSkillName(skill)}</h4>
                <div className="flex items-center mt-2">
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                    onClick={() => handleSkillChange(key, skills[key] - 1)}
                    disabled={skills[key] <= 0}
                  >
                    -
                  </button>
                  <span className="mx-4 text-2xl font-bold text-accent-primary">
                    {skills[key]}
                  </span>
                  <button
                    className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                    onClick={() => handleSkillChange(key, skills[key] + 1)}
                    disabled={skills[key] >= cap || pointsUsed >= totalSkillPoints}
                  >
                    +
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Advanced Skills</h3>
          <p className="text-sm text-gray-600 mb-2">
            Your concept ({character.concept}) can use these advanced skills: {advancedSkills.join(', ')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['command', 'culture', 'dataDjinn', 'medicurgy',
              'mysticPowers', 'pilot', 'science', 'technology'].map(skill => {
              const key = skill as keyof typeof skills;
              const cap = getSkillCap(key);
              return (
                <div key={skill} className="p-3 border rounded-md">
                  <h4 className="font-medium">{formatSkillName(skill)}</h4>
                  <div className="flex items-center mt-2">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                      onClick={() => handleSkillChange(key, skills[key] - 1)}
                      disabled={skills[key] <= 0}
                    >
                      -
                    </button>
                    <span className="mx-4 text-2xl font-bold text-accent-primary">
                      {skills[key]}
                    </span>
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
                      onClick={() => handleSkillChange(key, skills[key] + 1)}
                      disabled={skills[key] >= cap || pointsUsed >= totalSkillPoints}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <Button 
          variant="secondary"
          onClick={randomizeSkills}
          className="mt-2"
        >
          Randomize Skills
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
          Next: Talent
        </Button>
      </div>
    </div>
  );
};

export default CharacterSkillsPage;
