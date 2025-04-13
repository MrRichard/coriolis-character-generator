// src/app/wizard/page.tsx
'use client';

import React from 'react';
import WizardContainer from '../../components/WizardContainer';
import WelcomePage from '../../components/wizard/WelcomePage';
import GroupConceptPage from '../../components/wizard/GroupConceptPage';
import GroupTalentPage from '../../components/wizard/GroupTalentPage';
import CharacterBackgroundPage from '../../components/wizard/CharacterBackgroundPage';
import CharacterConceptPage from '../../components/wizard/CharacterConceptPage';
import CharacterAttributesPage from '../../components/wizard/CharacterAttributesPage';
import CharacterSkillsPage from '../../components/wizard/CharacterSkillsPage';
import CharacterTalentPage from '../../components/wizard/CharacterTalentPage';
import CharacterDetailsPage from '../../components/wizard/CharacterDetailsPage';
import GenerateCharacterSheetsPage from '../../components/wizard/GenerateCharacterSheetsPage';

export default function WizardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <WizardContainer>
        <WelcomePage />
        <GroupConceptPage />
        <GroupTalentPage />
        <CharacterBackgroundPage />
        <CharacterConceptPage />
        <CharacterAttributesPage />
        <CharacterSkillsPage />
        <CharacterTalentPage />
        <CharacterDetailsPage />
        <GenerateCharacterSheetsPage />
      </WizardContainer>
    </main>
  );
}
