// utils/geminiAIModel.jsx
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateInterviewQuestions(prompt) {
  // ✅ Always wrap prompt in `parts: [{ text: ... }]` so Gemini gets text
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: String(prompt) }],  // <-- THIS LINE
      },
    ],
  });

  return response.candidates[0].content.parts[0].text;
}
