// @ts-nocheck
'use server';

import {
  draftInquiry,
  type InquiryDraftInput,
} from '@/ai/flows/inquiry-draft-flow';
import { z } from 'zod';

const InquirySchema = z.object({
  senderName: z.string().optional(),
  senderEmail: z
    .string()
    .email('Please enter a valid email address.')
    .optional()
    .or(z.literal('')),
  inquiryType: z.string({ required_error: 'Please select an inquiry type.' }),
  messageDetails: z
    .string()
    .min(20, 'Please provide more details about your inquiry (at least 20 characters).'),
});

export type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: {
    subject: string;
    draftedMessage: string;
  };
  message?: string;
  errors?: {
    senderName?: string[];
    senderEmail?: string[];
    inquiryType?: string[];
    messageDetails?: string[];
  };
};

export async function generateInquiry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (formData.has('clear')) {
    return { status: 'idle' };
  }
  
  const validatedFields = InquirySchema.safeParse({
    senderName: formData.get('senderName'),
    senderEmail: formData.get('senderEmail'),
    inquiryType: formData.get('inquiryType'),
    messageDetails: formData.get('messageDetails'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
    };
  }

  try {
    const result = await draftInquiry(validatedFields.data as InquiryDraftInput);
    if (!result.draftedMessage) {
        throw new Error("The AI failed to generate a message. Please try again.");
    }
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      status: 'error',
      message: `An error occurred while drafting the inquiry: ${errorMessage}`,
    };
  }
}
