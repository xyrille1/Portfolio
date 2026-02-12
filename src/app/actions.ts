// @ts-nocheck
'use server';

import {
  draftInquiry,
  type InquiryDraftInput,
} from '@/ai/flows/inquiry-draft-flow';
import { chat, type ChatbotInput } from '@/ai/flows/chatbot-flow';
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

const ChatbotActionSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
  message: z.string().min(1, 'Message cannot be empty.'),
});

export type ChatbotActionState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: {
    message: string;
  };
  message?: string;
};

export async function askChatbot(
  prevState: ChatbotActionState,
  formData: FormData
): Promise<ChatbotActionState> {
  const rawHistory = formData.get('history');
  const message = formData.get('message');
  
  let history = [];
  try {
    if (rawHistory && typeof rawHistory === 'string') {
      history = JSON.parse(rawHistory);
    }
  } catch (e) {
    return {
      status: 'error',
      message: 'Invalid history format.',
    };
  }

  const validatedFields = ChatbotActionSchema.safeParse({
    history,
    message,
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await chat(validatedFields.data as ChatbotInput);
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      status: 'error',
      message: `An error occurred: ${errorMessage}`,
    };
  }
}
