// src/lib/pdfGenerator.ts
import { PDFDocument } from 'pdf-lib';
import { Character } from './types';

export async function generateCharacterSheet(character: Character): Promise<Uint8Array> {
  try {
    // Fetch the PDF template
    const templateUrl = '/Coriolis_CharacterSheet_Portrait_OlinoneV2_Fillable.pdf';
    const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes);
    
    // Get the form from the document
    const form = pdfDoc.getForm();
    
    // Fill in the character information
    // Personal information
    form.getTextField('Name').setText(character.name);
    form.getTextField('Concept').setText(character.concept);
    form.getTextField('Origin').setText(character.origin);
    form.getTextField('System').setText(character.origin); // Using origin as system
    form.getTextField('Upbringing').setText(character.upbringing);
    form.getTextField('Problem').setText(character.personalProblem);
    form.getTextField('GroupCon').setText(character.groupConcept);
    
    // Attributes
    form.getTextField('STR').setText(character.strength.toString());
    form.getTextField('AGI').setText(character.agility.toString());
    form.getTextField('WIT').setText(character.wits.toString());
    form.getTextField('EMP').setText(character.empathy.toString());
    
    // Skills - General
    form.getTextField('FOR').setText(character.force.toString());
    form.getTextField('MEL').setText(character.meleeCombat.toString());
    form.getTextField('INF').setText(character.infiltration.toString());
    form.getTextField('DEX').setText(character.dexterity.toString());
    form.getTextField('RAN').setText(character.rangedCombat.toString());
    form.getTextField('Obs').setText(character.observation.toString());
    form.getTextField('Sur').setText(character.survival.toString());
    form.getTextField('Man').setText(character.manipulation.toString());
    
    // Skills - Advanced
    form.getTextField('PIL').setText(character.pilot.toString());
    form.getTextField('Med').setText(character.medicurgy.toString());
    form.getTextField('Dat').setText(character.dataDjinn.toString());
    form.getTextField('Tec').setText(character.technology.toString());
    form.getTextField('Sci').setText(character.science.toString());
    form.getTextField('Mys').setText(character.mysticPowers.toString());
    form.getTextField('Cul').setText(character.culture.toString());
    form.getTextField('Com').setText(character.command.toString());
    
    // Other stats
    form.getTextField('Rep').setText(character.reputation.toString());
    form.getTextField('HP').setText((character.strength + character.agility).toString());
    form.getTextField('MP').setText((character.wits + character.empathy).toString());
    
    // Talents
    form.getTextField('TN1').setText(character.talent);
    form.getTextField('TN2').setText(character.groupTalent);
    form.getTextField('Icon').setText(character.icon);
    
    // Appearance
    form.getTextField('Face').setText(character.appearance);
    
    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function addPortraitToSheet(pdfBytes: Uint8Array, portraitImageUrl: string): Promise<Uint8Array> {
  try {
    // Load the PDF with the filled form
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Fetch the portrait image
    const portraitBytes = await fetch(portraitImageUrl).then(res => res.arrayBuffer());
    
    // Embed the image in the PDF
    let portrait;
    if (portraitImageUrl.endsWith('.png')) {
      portrait = await pdfDoc.embedPng(portraitBytes);
    } else if (portraitImageUrl.endsWith('.jpg') || portraitImageUrl.endsWith('.jpeg')) {
      portrait = await pdfDoc.embedJpg(portraitBytes);
    } else {
      throw new Error('Unsupported image format');
    }
    
    // Get the first page of the PDF
    const page = pdfDoc.getPage(0);
    
    // Define the position and size for the portrait
    // These values will need to be adjusted based on the actual PDF layout
    const portraitWidth = 150;
    const portraitHeight = 200;
    const portraitX = 50;
    const portraitY = 650;
    
    // Draw the portrait on the page
    page.drawImage(portrait, {
      x: portraitX,
      y: portraitY,
      width: portraitWidth,
      height: portraitHeight,
    });
    
    // Save the modified PDF
    const updatedPdfBytes = await pdfDoc.save();
    return updatedPdfBytes;
  } catch (error) {
    console.error('Error adding portrait to PDF:', error);
    throw error;
  }
}
