'use server';

import { z } from 'zod';
import { personalizeInvitationMessage, type PersonalizeInvitationMessageInput } from '@/ai/flows/personalize-invitation-message';
import { revalidatePath } from 'next/cache';
import type { RsvpFormData, PersonalizeMessageData } from '@/lib/schemas';
import { rsvpFormSchema, personalizeMessageSchema } from '@/lib/schemas';


interface RsvpFormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof RsvpFormData | '_form', string[]>>;
}

export async function submitRsvpAction(
  prevState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const rawFormData = Object.fromEntries(formData.entries());
  
  // Manually handle eventsAttending as it's an array from checkboxes
  const eventsAttending = formData.getAll('eventsAttending') as string[];

  const validatedFields = rsvpFormSchema.safeParse({
    ...rawFormData,
    guestsCount: rawFormData.guestsCount ? parseInt(rawFormData.guestsCount as string, 10) : undefined,
    eventsAttending: eventsAttending,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  // Simulate saving to Firestore and sending notifications
  console.log('RSVP Submitted:', data);

  // In a real app, you would:
  // 1. Add data to Firestore:
  //    await db.collection('rsvp_submissions').add({ ...data, timestamp: FieldValue.serverTimestamp() });
  // 2. The Cloud Function `sendRSVPNotification` would trigger.

  // For now, we'll just return a success message.
  // The Cloud Function would handle email notifications.
  
  revalidatePath('/rsvp'); // Optional: revalidate if showing submissions on a page

  return {
    success: true,
    message: 'Thank you for your RSVP! We look forward to celebrating with you.',
  };
}


interface PersonalizeMessageState {
  success: boolean;
  message: string;
  personalizedMessage?: string;
  errors?: Partial<Record<keyof PersonalizeMessageData | '_form', string[]>>;
}

export async function generatePersonalizedMessageAction(
  prevState: PersonalizeMessageState,
  formData: FormData
): Promise<PersonalizeMessageState> {
  const rawFormData = {
    inviteeName: formData.get('inviteeName') as string,
    eventDetails: formData.get('eventDetails') as string,
    additionalInfo: formData.get('additionalInfo') as string | undefined,
  };

  const validatedFields = personalizeMessageSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const input: PersonalizeInvitationMessageInput = validatedFields.data;

  try {
    const result = await personalizeInvitationMessage(input);
    return {
      success: true,
      message: 'Personalized message generated successfully!',
      personalizedMessage: result.personalizedMessage,
    };
  } catch (error) {
    console.error('AI Personalization Error:', error);
    return {
      success: false,
      message: 'Failed to generate personalized message. Please try again.',
      errors: { _form: ['An unexpected error occurred.'] }
    };
  }
}
