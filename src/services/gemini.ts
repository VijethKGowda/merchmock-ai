import { GoogleGenAI } from "@google/genai";

export async function generateMockup(logoBase64: string, productPrompt: string, productBase64?: string): Promise<string | null> {
  // Initialize AI inside the function to ensure fresh key access
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  try {
    console.log("Starting mockup generation. Custom product:", !!productBase64);
    
    // Extract mimeType and data from logo base64 string
    const logoMimeTypeMatch = logoBase64.match(/^data:(image\/[a-z]+);base64,/);
    const logoMimeType = logoMimeTypeMatch ? logoMimeTypeMatch[1] : 'image/png';
    const logoData = logoBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const parts: any[] = [
      {
        inlineData: {
          data: logoData,
          mimeType: logoMimeType,
        },
      },
    ];

    if (productBase64) {
      // Extract mimeType and data from product base64 string
      const productMimeTypeMatch = productBase64.match(/^data:(image\/[a-z]+);base64,/);
      const productMimeType = productMimeTypeMatch ? productMimeTypeMatch[1] : 'image/png';
      const productData = productBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      parts.push({
        inlineData: {
          data: productData,
          mimeType: productMimeType,
        },
      });

      parts.push({
        text: `Place the first image (the logo) naturally onto the second image (the product). 
        The logo should look like it is printed on the material of the product, following its contours, lighting, and texture. 
        Make it look professional and realistic.`,
      });
    } else {
      parts.push({
        text: `Place this logo naturally onto the product in this scene: ${productPrompt}. 
        The logo should look like it is printed on the material, following the contours and lighting of the object. 
        Make it look professional and realistic.`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
    });

    console.log("Gemini response received:", response);

    if (!response.candidates || response.candidates.length === 0) {
      console.error("No candidates returned from Gemini");
      return null;
    }

    for (const part of response.candidates[0].content.parts || []) {
      if (part.inlineData) {
        console.log("Image part found in response");
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      if (part.text) {
        console.log("Text part found in response:", part.text);
      }
    }

    console.error("No image data found in Gemini response parts");
    return null;
  } catch (error) {
    console.error("Error in generateMockup:", error);
    return null;
  }
}
