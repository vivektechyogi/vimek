'use server';

import { z } from 'zod';
import { personalizeInvitationMessage, type PersonalizeInvitationMessageInput } from '@/ai/flows/personalize-invitation-message';
import { revalidatePath } from 'next/cache';

// Define Zod schema for RSVP form data
export const rsvpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().optional().or(z.literal("")),
  guestsCount: z.coerce.number().min(1, { message: "Please specify at least 1 guest." }).max(10, { message: "Maximum 10 guests allowed." }),
  eventsAttending: z.array(z.string()).min(1, { message: "Please select at least one event you'll be attending." }),
  notes: z.string().max(500, { message: "Notes must not exceed 500 characters." }).optional(),
});

export type RsvpFormData = z.infer<typeof rsvpFormSchema>;

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


// Define Zod schema for AI Personalization form data
export const personalizeMessageSchema = z.object({
  inviteeName: z.string().min(1, { message: "Invitee name is required." }),
  eventDetails: z.string().min(10, { message: "Event details must be at least 10 characters." }),
  additionalInfo: z.string().optional(),
});

export type PersonalizeMessageData = z.infer<typeof personalizeMessageSchema>;

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
