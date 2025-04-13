// src/lib/pdfGenerator.ts
import { PDFDocument } from 'pdf-lib';
import { Character } from './types';

export async function generateCharacterSheet(character: Character): Promise<Uint8Array> {
  try {
    // Fetch the PDF template
    const templateUrl = '/Coriolis_CharacterSheet_Portrait_OlinoneV2_Fillable.pdf';
    console.log('Fetching PDF template from:', templateUrl);
    
    const templateBytes = await fetch(templateUrl).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch PDF template: ${res.status} ${res.statusText}`);
      }
      return res.arrayBuffer();
    });
    
    console.log('PDF template fetched successfully, size:', templateBytes.byteLength, 'bytes');
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes);
    console.log('PDF document loaded successfully');
    
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
    
    console.log('Form fields filled successfully');
    
    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    console.log('PDF saved successfully, size:', pdfBytes.byteLength, 'bytes');
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function addPortraitToSheetFromBlob(pdfBytes: Uint8Array, portraitBlob: Blob): Promise<Uint8Array> {
  try {
    console.log('===============================================');
    console.log('STARTING PORTRAIT EMBEDDING PROCESS');
    console.log('===============================================');
    console.log('Portrait blob:', portraitBlob);
    console.log('Blob type:', portraitBlob.type);
    console.log('Blob size:', portraitBlob.size, 'bytes');
    
    // Load the PDF with the filled form
    console.log('Loading PDF document from bytes...');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    console.log('PDF document loaded successfully');
    
    // Convert the blob to array buffer
    console.log('Converting blob to array buffer...');
    const portraitBytes = await portraitBlob.arrayBuffer();
    console.log('Blob converted to array buffer, size:', portraitBytes.byteLength, 'bytes');
    
    // Get a small sample of the image data to debug
    const sampleBytes = new Uint8Array(portraitBytes.slice(0, 16));
    console.log('Sample bytes (hex):', Array.from(sampleBytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
    
    // Check image header signatures
    const isPNG = 
      sampleBytes[0] === 0x89 && 
      sampleBytes[1] === 0x50 && 
      sampleBytes[2] === 0x4E && 
      sampleBytes[3] === 0x47;
    
    const isJPEG = 
      sampleBytes[0] === 0xFF && 
      sampleBytes[1] === 0xD8;
    
    console.log('Image format detection from header:');
    console.log('- PNG format:', isPNG);
    console.log('- JPEG format:', isJPEG);
    
    // Determine image type based on blob mime type and header check
    console.log('Determining image format...');
    let portrait;
    const mimeType = portraitBlob.type.toLowerCase();
    
    // Try to embed the image based on various checks
    if (isPNG || mimeType.includes('png')) {
      console.log('Attempting to embed as PNG...');
      try {
        portrait = await pdfDoc.embedPng(portraitBytes);
        console.log('Successfully embedded as PNG');
      } catch (pngError) {
        console.error('PNG embedding failed:', pngError);
        throw pngError;
      }
    } else if (isJPEG || mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      console.log('Attempting to embed as JPEG...');
      try {
        portrait = await pdfDoc.embedJpg(portraitBytes);
        console.log('Successfully embedded as JPEG');
      } catch (jpegError) {
        console.error('JPEG embedding failed:', jpegError);
        throw jpegError;
      }
    } else {
      console.log('Image format not clearly determined. Trying both formats...');
      
      try {
        console.log('Trying PNG first...');
        portrait = await pdfDoc.embedPng(portraitBytes);
        console.log('Successfully embedded as PNG (guessed)');
      } catch (pngError) {
        console.log('PNG embedding failed, trying JPEG...', pngError);
        try {
          portrait = await pdfDoc.embedJpg(portraitBytes);
          console.log('Successfully embedded as JPEG (guessed)');
        } catch (jpegError) {
          console.error('Both PNG and JPEG embedding failed');
          throw new Error('Failed to embed image: not a valid PNG or JPEG format');
        }
      }
    }
    
    console.log('Image embedded successfully');
    console.log('Portrait dimensions:', portrait.width, 'x', portrait.height);
    
    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    if (pages.length === 0) {
      throw new Error('PDF has no pages');
    }
    
    const page = pages[0];
    const { width, height } = page.getSize();
    console.log('PDF page dimensions:', width, 'x', height);
    
    // Precisely measured portrait box coordinates for the Coriolis character sheet
    const portraitBox = {
      x: 416,        // Left position
      y: 639,        // Bottom position (PDF coordinates start from bottom left)
      width: 143,    // Width of box 
      height: 163    // Height of box
    };
    
    console.log('Target portrait box:', portraitBox);
    
    // Calculate aspect ratio to fit within box while maintaining proportions
    const imageWidth = portrait.width;
    const imageHeight = portrait.height;
    const imageRatio = imageWidth / imageHeight;
    const boxRatio = portraitBox.width / portraitBox.height;
    
    let drawWidth, drawHeight;
    
    if (imageRatio > boxRatio) {
      // Image is wider than box - constrain by width
      drawWidth = portraitBox.width;
      drawHeight = drawWidth / imageRatio;
    } else {
      // Image is taller than box - constrain by height
      drawHeight = portraitBox.height;
      drawWidth = drawHeight * imageRatio;
    }
    
    // Center within box
    const xOffset = (portraitBox.width - drawWidth) / 2;
    const yOffset = (portraitBox.height - drawHeight) / 2;
    
    console.log('Drawing portrait with dimensions:', drawWidth, 'x', drawHeight);
    console.log('Centered with offsets - X:', xOffset, 'Y:', yOffset);
    
    // Draw the portrait on the page
    page.drawImage(portrait, {
      x: portraitBox.x + xOffset,
      y: portraitBox.y + yOffset,
      width: drawWidth,
      height: drawHeight,
    });
    
    console.log('Portrait drawn successfully on page');
    
    // Save the modified PDF
    console.log('Saving PDF with portrait...');
    const updatedPdfBytes = await pdfDoc.save();
    console.log('PDF saved successfully, size:', updatedPdfBytes.byteLength, 'bytes');
    console.log('===============================================');
    
    return updatedPdfBytes;
  } catch (error) {
    console.error('Error adding portrait to PDF:', error);
    throw error;
  }
}

// Keep this for backward compatibility
export async function addPortraitToSheet(pdfBytes: Uint8Array, portraitImageUrl: string): Promise<Uint8Array> {
  console.log('addPortraitToSheet is deprecated - use addPortraitToSheetFromBlob instead');
  return pdfBytes; // Just return the original PDF
}