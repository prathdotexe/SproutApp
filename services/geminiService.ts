import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash';

export const geminiService = {
  getChat: () => {
    return ai.chats.create({
      model: model,
      config: {
        systemInstruction: 'You are a fun, expert gardening assistant. Give concise, accurate tips and use light, friendly tone with markdown.',
      },
    });
  },
  
  analyzePlantImage: async (base64Image: string, mimeType: string) => {
    try {
      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      };

      const textPart = {
        text: `
          Identify the plant in this image. 
          If it's not a plant or is unidentifiable, state that clearly.
          If it is a plant, provide the following information in a structured format using markdown:
          - **Common Name:** 
          - **Scientific Name:** 
          - **Description:** A brief overview of the plant.
          - **Care Instructions:**
            - **Sunlight:** 
            - **Watering:** 
            - **Soil:** 
            - **Fertilizer:** 
          - **Additional Details:**
            - **Toxicity:** (Mention if it's toxic to pets or humans)
            - **Common Pests:** (List common pests for this plant)
        `,
      };
      
      const response = await ai.models.generateContent({
        model: model,
        contents: { parts: [imagePart, textPart] },
      });
      
      return response.text;
    } catch (error) {
      console.error("Error analyzing plant image:", error);
      return "Sorry, I encountered an error while analyzing the image. Please try again.";
    }
  },
};