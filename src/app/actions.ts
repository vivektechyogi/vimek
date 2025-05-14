

// This file is no longer using 'use server' as the RSVP form has been refactored
// to use a traditional API route (/api/rsvp).
// The submitRsvpAction function remains here but is not directly invoked by the form.
// It could be repurposed or removed if not needed for other server-side logic.

import type { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { RsvpFormData } from '@/lib/schemas';
import { rsvpFormSchema } from '@/lib/schemas';
import { getDbInstance, firebaseInitializationError } from '@/lib/firebase'; 
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface RsvpFormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof RsvpFormData | '_form', string[]>>;
}

export async function submitRsvpAction(
  // prevState: RsvpFormState, // prevState is typically used with useActionState
  rawFormData: RsvpFormData // Direct data for non-action usage
): Promise<RsvpFormState> {

  if (firebaseInitializationError) {
    console.error("RSVP submission blocked: Firebase initialization failed.", firebaseInitializationError);
    const  userFriendlyMessage = "We're experiencing technical difficulties. Please try again later or contact support.";
    return {
      success: false,
      message: userFriendlyMessage,
      errors: {
        _form: [userFriendlyMessage],
      },
    };
  }
  
  // If rawFormData is already RsvpFormData, direct validation can occur
  const validatedFields = rsvpFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    const db = getDbInstance(); 
    await addDoc(collection(db, 'rsvp_submissions'), {
      ...data,
      submittedAt: Timestamp.now(), 
    });

    console.log('RSVP Submitted to Firestore (from actions.ts - potentially unused):', data);
    
    // revalidatePath might not be needed if the form is fully client-side now
    // and doesn't display data that needs immediate revalidation.
    // If there's a page displaying RSVP counts, this might still be useful
    // if this function is called elsewhere.
    // revalidatePath('/'); 

    return {
      success: true,
      message: 'Thank you for your RSVP! We look forward to celebrating with you.',
    };
  } catch (error) {
    console.error('Error submitting RSVP to Firestore (from actions.ts):', error);
    let errorMessage = 'An unexpected error occurred while submitting your RSVP. Please try again later.';
    if (error instanceof Error) {
        if (error.message.startsWith('Firebase not initialized') || 
            error.message.startsWith('Firestore database is not available') ||
            error.message.includes("Failed to get document because the client is offline")) {
            errorMessage = "We're experiencing technical difficulties connecting to our services. Please try again later or contact support.";
        } else if ((error as any).code === 'permission-denied') {
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
