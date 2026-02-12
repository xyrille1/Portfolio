'use server';
/**
 * @fileOverview A Genkit flow for a portfolio chatbot.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the chat function.
 * - ChatbotOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Message, Role} from 'genkit/generate';
import {XYRILLE_PROFILE} from '@/lib/data';

const ChatbotInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe("The conversation history."),
  message: z.string().describe("The user's latest message."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export type ChatbotOutput = {
  message: string;
};

export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  const result = await chatbotFlow(input);
  return { message: result };
}

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: z.string(),
  },
  async ({ history, message }) => {
    const systemPrompt = `You are a helpful and friendly chatbot on the portfolio website of Xyrille Navora.
Your goal is to answer questions about Xyrille, his skills, and his experience based on the provided profile information.
Be conversational and professional. If you don't know the answer to a question, politely say that you don't have that information but can help with other questions about Xyrille's professional background.
Keep your answers concise and to the point.

**Xyrille Navora's Profile:**
---
${XYRILLE_PROFILE}
---
`;

    const convertedHistory: Message[] = history.map(h => ({
      role: h.role as Role,
      content: [{text: h.content}],
    }));

    const response = await ai.generate({
      prompt: [
        { role: 'system', content: [{ text: systemPrompt }] },
        ...convertedHistory,
        { role: 'user', content: [{ text: message }] },
      ],
    });

    return response.text ?? "I'm sorry, I couldn't generate a response. Please try again.";
  }
);
