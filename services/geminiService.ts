
import { GoogleGenAI, Modality } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

// FIX: Removed unsupported aspectRatio parameter. The image editing model does not support changing the aspect ratio.
export const editImage = async (file: File, prompt: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Image = await fileToBase64(file);

  const fullPrompt = `Transform this product photo into a high-quality, professional image suitable for an e-commerce catalog.
  - Remove any background distractions and replace it with a clean, neutral studio background (light gray or off-white).
  - Apply subtle color correction and enhance lighting to make the product look appealing and true-to-life.
  - Ensure the product's shape, texture, and colors are accurately preserved.
  - The final image should have a modern, polished look.
  - Apply the following specific instruction: "${prompt}"`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: file.type,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    console.warn("No image was generated for the prompt:", fullPrompt);
    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
