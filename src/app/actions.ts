'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { RsvpFormData } from '@/lib/schemas';
import { rsvpFormSchema } from '@/lib/schemas';


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
  
  revalidatePath('/'); // Revalidate the homepage

  return {
    success: true,
    message: 'Thank you for your RSVP! We look forward to celebrating with you.',
  };
}
