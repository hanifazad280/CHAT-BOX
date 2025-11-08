
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateResponse(message: string, contactName: string): Promise<string> {
  try {
    const prompt = `You are ${contactName}, a friend of the user. Keep your replies very short and conversational, like in a text message. Do not use markdown formatting. Respond to this message: "${message}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error('Error generating response from Gemini:', error);
    return "I'm having trouble connecting right now. Let's talk later.";
  }
}
