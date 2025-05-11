
'use server';

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
  prevState: RsvpFormState,
  formData: FormData
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
    const db = getDbInstance(); // Ensures db is available or throws a specific error
    await addDoc(collection(db, 'rsvp_submissions'), {
      ...data,
      submittedAt: Timestamp.now(), 
    });

    console.log('RSVP Submitted to Firestore:', data);
    
    revalidatePath('/'); 

    return {
      success: true,
      message: 'Thank you for your RSVP! We look forward to celebrating with you.',
    };
  } catch (error) {
    console.error('Error submitting RSVP to Firestore:', error);
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
