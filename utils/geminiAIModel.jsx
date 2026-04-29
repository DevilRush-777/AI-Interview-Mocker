import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateInterviewQuestions(prompt) {
  let retries = 3;

  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: String(prompt) }],
          },
        ],
      });

      return response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    }  catch (err) {
    if (err?.status === 503) {
      throw new Error("Server busy");
    }

    if (err?.status === 429) {
      throw new Error("Quota exceeded");
    }

    throw err;
  }
  }

  throw new Error("Server busy");
}