// src/lib/imageGenerator.ts
import { Character } from './types';

export async function generatePortrait(character: Character): Promise<string | null> {
  try {
    // Check if we have an API key in the environment
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      console.warn('OpenAI API key not found or not set. Using fallback.');
      return null;
    }
    
    console.log('Attempting to generate portrait with OpenAI...');
    
    // Import OpenAI dynamically to avoid server-side issues
    const { OpenAI } = await import('openai');
    
    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Allow API calls from browser
    });
    
    // Create a stylized prompt based on user specifications
    // We've added guidance for a portrait-shaped (taller than wide) composition
    const stylizedPrompt = `Detailed pen and ink contour portrait drawing of a ${character.concept} character from the sci-fi RPG Coriolis. 
    The portrait must be composed to fit a portrait-oriented rectangle box (taller than wide, approximately 3:4 ratio).
    Focus only on the head, face, and upper shoulders of the character.
    
    The style should be clean black line art on white background with detailed facial features.
    No text, logos, watermarks, signatures, frames, or backgrounds.
    No color, just black and white line art.
    
    Character description: ${character.appearance}`;
    
    console.log('Portrait prompt:', stylizedPrompt);
    
    // Generate the image using DALL-E
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: stylizedPrompt,
        n: 1,
        size: "1024x1024", // Square image that we'll crop properly
        style: "natural", // Use natural style for cleaner line art
      });
      
      console.log('OpenAI response:', response);
      
      // Return the URL of the generated image
      return response.data[0].url || null;
    } catch (apiError) {
      console.error('Error from OpenAI API:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('Error generating portrait:', error);
    return null;
  }
}

// Fallback function to use when OpenAI API is not available
export function getPortraitFallbackText(character: Character): string {
  return `Character Portrait Prompt: A portrait-oriented pen and ink drawing of ${character.name}, a ${character.concept}. ${character.appearance}`;
}