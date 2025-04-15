// src/lib/portraitUtils.ts
/**
 * Utilities for handling portrait images
 */

/**
 * Creates a canvas element and draws the image on it, then returns a blob
 * This helps work around CORS issues with images hosted on external domains
 */
export async function createBlobFromImageUrl(url: string): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Try to request CORS access
    
    // Set up a timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      console.log("Image loading timed out");
      resolve(null);
    }, 10000); // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeoutId);
      
      try {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Failed to get canvas context");
          resolve(null);
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Try to get a blob from the canvas
        canvas.toBlob((blob) => {
          if (blob) {
            console.log("Successfully created blob from image");
            resolve(blob);
          } else {
            console.error("Failed to create blob from canvas");
            resolve(null);
          }
        }, "image/png");
      } catch (error) {
        console.error("Error creating blob from image:", error);
        resolve(null);
      }
    };
    
    img.onerror = (error) => {
      clearTimeout(timeoutId);
      console.error("Error loading image:", error);
      resolve(null);
    };
    
    // Add a cache-busting query parameter to help with CORS
    img.src = url + (url.includes("?") ? "&" : "?") + "cb=" + new Date().getTime();
  });
}

/**
 * Takes a file input element and returns a promise that resolves 
 * when the user selects a file. Returns the selected file or null if cancelled.
 */
export function promptUserForImageFile(): Promise<File | null> {
  return new Promise((resolve) => {
    // Create a temporary file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    
    // Set up event handler
    input.onchange = (event) => {
      const files = input.files;
      if (files && files.length > 0) {
        resolve(files[0]);
      } else {
        resolve(null);
      }
    };
    
    // Handle cancellation
    window.addEventListener(
      "focus",
      () => {
        // If no file was selected after a short delay, resolve with null
        setTimeout(() => {
          if (input.files?.length === 0 || !input.files) {
            resolve(null);
          }
        }, 300);
      },
      { once: true }
    );
    
    // Trigger the file dialog
    input.click();
  });
}

/**
 * Analyzes an image blob to determine if it's likely a valid image format
 */
export async function analyzeImageBlob(blob: Blob): Promise<{
  isValid: boolean;
  format: string | null;
  width: number | null;
  height: number | null;
  error?: string;
}> {
  try {
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Return a promise that resolves when the image is loaded
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          isValid: true,
          format: blob.type || "unknown",
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({
          isValid: false,
          format: null,
          width: null,
          height: null,
          error: "Failed to load image data"
        });
      };
      
      img.src = url;
    });
  } catch (error) {
    return {
      isValid: false,
      format: null,
      width: null,
      height: null,
      error: `Error analyzing image: ${error}`
    };
  }
}

/**
 * Downloads an image from a URL and returns it as a blob
 * This is specifically designed to handle CORS issues
 */
export async function downloadImage(url: string): Promise<Blob | null> {
  try {
    // First try direct fetch (will likely fail due to CORS with OpenAI URLs)
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        console.log("Successfully fetched image directly");
        return await response.blob();
      }
    } catch (fetchError) {
      console.log("Direct fetch failed:", fetchError);
    }
    
    // If direct fetch fails, try canvas method
    console.log("Trying canvas method...");
    return await createBlobFromImageUrl(url);
  } catch (error) {
    console.error("All download methods failed:", error);
    return null;
  }
}