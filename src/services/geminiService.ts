import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface BookingDetails {
  provider: string;
  type: 'hotel' | 'flight' | 'other';
  location: string;
  dates: string;
  originalPrice: number;
  suggestedPrice: number;
  transferPolicy: string;
  confidence: number;
}

export async function parseBookingConfirmation(text: string): Promise<BookingDetails> {
  const prompt = `
    You are the "Intake Agent" for ReClaim, a marketplace for reselling non-refundable bookings.
    Analyze the following booking confirmation text and extract key details.
    
    Text:
    """
    ${text}
    """
    
    Return a JSON object with the following fields:
    - provider: Name of the hotel, airline, or venue.
    - type: One of "hotel", "flight", or "other".
    - location: City and country.
    - dates: Check-in/out or flight dates.
    - originalPrice: The amount paid (number only).
    - suggestedPrice: A suggested resale price (usually 70-80% of original).
    - transferPolicy: A brief summary of how to transfer this booking based on common knowledge of this provider.
    - confidence: Your confidence level (0-100) that this booking is transferable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            provider: { type: Type.STRING },
            type: { type: Type.STRING },
            location: { type: Type.STRING },
            dates: { type: Type.STRING },
            originalPrice: { type: Type.NUMBER },
            suggestedPrice: { type: Type.NUMBER },
            transferPolicy: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["provider", "type", "location", "dates", "originalPrice", "suggestedPrice", "transferPolicy", "confidence"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error parsing booking:", error);
    throw new Error("Failed to parse booking confirmation. Please try again.");
  }
}
