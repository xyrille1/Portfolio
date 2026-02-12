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

// Xyrille Navora's profile information (extracted from the provided HTML)
const XyrilleProfile = `
Name: Xyrille Navora
Location: Manaoag, Philippines
Role: Full-Stack Software Engineer, Web3 Specialist

About:
As a Full-Stack Software Engineer, I specialize in architecting sophisticated web solutions with a primary focus on Front-End excellence and Web3 integration. My expertise lies in building dynamic, data-driven platforms designed for high performance and maximum security.
I distinguish my work by integrating comprehensive SEO strategies directly into the development lifecycle. From optimizing core performance metrics to implementing advanced rendering patterns, I ensure that decentralized platforms are technically robust and discoverable.

Education:
BS Information Technology (2022 — Present)
Colegio de San Juan de Letran - Manaoag
Focused on Software Development, Web Development and Data Structures. Engaged in building practical solutions and exploring emerging technologies.

Technical Skills (Stack):
Web & Frontend: Next.js, TypeScript, React, Tailwind CSS, Bootstrap
Backend & Core: Python, Flask, Node.js, PHP, MySQL, PostgreSQL, Firebase, MongoDB, Sui, Move

Speaking:
Available for speaking at events about software development and emerging technologies.

Contact Email: xyrillenavora@email.com
`;

// Genkit Prompt definition
const inquiryDraftPrompt = ai.definePrompt({
  name: 'inquiryDraftPrompt',
  input: {schema: InquiryDraftInputSchema},
  output: {schema: InquiryDraftOutputSchema},
  prompt: `You are an AI assistant helping a visitor draft a professional message to Xyrille Navora, a Full-Stack Software Engineer and Web3 Specialist.
Your goal is to generate a professional, context-aware email subject and body based on the visitor's request and Xyrille's profile.

Here is Xyrille Navora's professional profile:
---
${XyrilleProfile}
---

Here is the visitor's inquiry:

Sender Name: {{senderName}}
Sender Email: {{senderEmail}}
Inquiry Type: {{inquiryType}}
Message Details: {{messageDetails}}

Draft a professional email, using a polite and respectful tone. Ensure the message is tailored to Xyrille's expertise and the specific inquiry type. If a sender name is provided, use it in the greeting. If a sender email is provided, consider mentioning it as a way to contact back, but prioritize Xyrille's listed contact email for Xyrille to reply to.
Keep the email concise and to the point while being informative.
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
