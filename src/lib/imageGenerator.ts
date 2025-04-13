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
    const stylizedPrompt = `A stylized pen contour drawing with comic book styling of ${character.portraitPrompt}. 
    Black and white with one random accent color. Slight influence from Coriolis visual aesthetic. 
    Clean lines, minimalist approach. Suitable for a character portrait.`;
    
    console.log('Portrait prompt:', stylizedPrompt);
    
    // Generate the image using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: stylizedPrompt,
      n: 1,
      size: "1024x1024",
    });
    
    console.log('OpenAI response:', response);
    
    // Return the URL of the generated image
    return response.data[0].url || null;
  } catch (error) {
    console.error('Error generating portrait:', error);
    return null;
  }
}

// Fallback function to use when OpenAI API is not available
export function getPortraitFallbackText(character: Character): string {
  return `Character Portrait Prompt: A stylized pen contour drawing with comic book styling of ${character.portraitPrompt}. Black and white with one random accent color.`;
}
