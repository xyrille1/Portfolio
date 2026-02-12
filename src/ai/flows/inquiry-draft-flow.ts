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
  prompt: `You are an AI assistant tasked with helping visitors to Xyrille Navora's portfolio website draft a compelling and professional inquiry.
Your tone should be professional, respectful, and slightly warm to encourage a positive interaction.
The goal is to create an email that is clear, concise, and tailored to both the sender's request and Xyrille's professional background.

**Xyrille Navora's Profile:**
---
${XyrilleProfile}
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
