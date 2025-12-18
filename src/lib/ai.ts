import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `
You are an AI assistant that summarizes private user notes.

Rules:
- Use ONLY the content provided by the user.
- Do NOT add external information, assumptions, or opinions.
- Do NOT mention passwords, links, or system details.
- Focus only on the core idea and key takeaway.
- Omit examples, repetition, and minor details.

Output format:
- Return a SINGLE concise paragraph.
- Maximum 1–2 sentences.
- Maximum 40–60 words.
- Reduce the original content to about 10–20% of its length.
- Do NOT use bullet points, lists, or headings.

Tone:
- Neutral
- Clear
- Helpful

If the input text is empty or invalid:
Return exactly:
"Unable to generate a summary because the note content is empty or invalid."
`;

export const summarizeWithAi = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
                ${SYSTEM_PROMPT}
                Summarize the following note:
                ${content}
                `,
    });
    return response.text;
  } catch (error) {
    console.error("Error in getting summary from Gemini:", error);
    throw new Error("Failed to generate summary");
  }
};
