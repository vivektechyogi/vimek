
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { RsvpFormData } from '@/lib/schemas';
import { rsvpFormSchema } from '@/lib/schemas';
import { db } from '@/lib/firebase'; // Import Firestore instance
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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

  try {
    // Add data to Firestore
    await addDoc(collection(db, 'rsvp_submissions'), {
      ...data,
      submittedAt: Timestamp.now(), // Add a server timestamp
    });

    console.log('RSVP Submitted to Firestore:', data);
    
    revalidatePath('/'); // Revalidate the homepage

    return {
      success: true,
      message: 'Thank you for your RSVP! We look forward to celebrating with you.',
    };
  } catch (error) {
    console.error('Error submitting RSVP to Firestore:', error);
    let errorMessage = 'An unexpected error occurred while submitting your RSVP. Please try again later.';
    if (error instanceof Error) {
        // Check for specific Firebase errors if needed, e.g., permission denied
        if ((error as any).code === 'permission-denied') {
            errorMessage = "We couldn't save your RSVP due to a permissions issue. Please contact support.";
        }
    }
    return {
      success: false,
      message: errorMessage,
      errors: {
        _form: [errorMessage],
      }
    };
  }
}
