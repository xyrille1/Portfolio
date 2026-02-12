'use server';
/**
 * @fileOverview A Genkit flow for drafting professional inquiry messages based on a portfolio.
 *
 * - draftInquiry - A function that handles the inquiry drafting process.
 * - InquiryDraftInput - The input type for the draftInquiry function.
 * - InquiryDraftOutput - The return type for the draftInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { XYRILLE_PROFILE } from '@/lib/data';

// Input Schema for drafting an inquiry
const InquiryDraftInputSchema = z.object({
  senderName: z.string().optional().describe("The name of the person sending the inquiry."),
  senderEmail: z.string().optional().describe("The email address of the person sending the inquiry."),
  inquiryType: z.string().describe("The type of inquiry, e.g., 'Job Opportunity', 'Collaboration', 'Speaking Engagement', 'General Inquiry'."),
  messageDetails: z.string().describe("Detailed description from the sender about their request or purpose of contact."),
});
export type InquiryDraftInput = z.infer<typeof InquiryDraftInputSchema>;

// Output Schema for the drafted inquiry message
const InquiryDraftOutputSchema = z.object({
  subject: z.string().describe("The subject line for the drafted email."),
  draftedMessage: z.string().describe("The full body of the drafted professional message."),
});
export type InquiryDraftOutput = z.infer<typeof InquiryDraftOutputSchema>;

// Exported wrapper function
export async function draftInquiry(input: InquiryDraftInput): Promise<InquiryDraftOutput> {
  return inquiryDraftFlow(input);
}

// Genkit Prompt definition
const inquiryDraftPrompt = ai.definePrompt({
  name: 'inquiryDraftPrompt',
  input: {schema: InquiryDraftInputSchema},
  output: {schema: InquiryDraftOutputSchema},
  prompt: `You are an AI assistant tasked with helping visitors to Xyrille Navora's portfolio website draft a compelling and professional inquiry.
Your tone should be professional, respectful, and slightly warm to encourage a positive interaction.
The goal is to create an email that is clear, concise, and tailored to both the sender's request and Xyrille's professional background.

**Xyrille Navora's Profile:**
---
${XYRILLE_PROFILE}
---

**Visitor's Request Details:**
- Sender's Name: {{senderName}}
- Sender's Email: {{senderEmail}}
- Type of Inquiry: {{inquiryType}}
- Message from Sender: {{messageDetails}}

**Your Task: Draft an Email (Subject and Body)**

1.  **Subject Line:** Create a clear and professional subject. It should include the Inquiry Type and the sender's name if available.
    *Example: "Collaboration Inquiry from John Doe" or "Speaking Engagement Opportunity"*

2.  **Email Body:**
    - **Greeting:** Start with a polite greeting to Xyrille.
    - **Opening:** State the purpose of the email clearly, referencing the inquiry type.
    - **Context/Connection:** Briefly connect the inquiry to Xyrille's expertise shown in the profile. This shows the sender has done their research. *For example, if it's a Web3 collaboration, you might mention his specialization in that area.*
    - **Integrate Sender's Message:** Weave the sender's \`messageDetails\` naturally into the body of the email. This is the core of their request.
    - **Closing:** End with a clear call to action or a polite closing. Mention the sender's contact information (email) as the best way to get back to them if provided.
    - **Sign-off:** Use a professional sign-off. If a sender name is provided, use it (e.g., "Best regards, Jane Doe"). Otherwise, use a generic but professional closing.

**Important Guidelines:**
- The final drafted message should be addressed *to* Xyrille and appear as if it is *from* the visitor.
- Keep the language clean, professional, and free of jargon where possible, unless it's relevant technical language from the sender's details.
- The email should be concise—respect Xyrille's time.
`,
});

// Genkit Flow definition
const inquiryDraftFlow = ai.defineFlow(
  {
    name: 'inquiryDraftFlow',
    inputSchema: InquiryDraftInputSchema,
    outputSchema: InquiryDraftOutputSchema,
  },
  async (input) => {
    const {output} = await inquiryDraftPrompt(input);
    if (!output) {
      throw new Error("Failed to generate inquiry draft.");
    }
    return output;
  }
);
