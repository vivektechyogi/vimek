
import type { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rsvpFormSchema, type RsvpFormData } from '@/lib/schemas';
import { getDbInstance, firebaseInitializationError } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  if (firebaseInitializationError) {
    console.error("RSVP submission blocked: Firebase initialization failed.", firebaseInitializationError);
    const userFriendlyMessage = "We're experiencing technical difficulties. Please try again later or contact support.";
    return new Response(JSON.stringify({ success: false, message: userFriendlyMessage, errors: { _form: [userFriendlyMessage] } }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  let rawFormData;
  try {
    rawFormData = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request body. Please send JSON.', errors: { _form: ['Invalid request body.'] } }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Ensure eventsAttending is an array, even if not present or empty
  const eventsAttending = Array.isArray(rawFormData.eventsAttending) ? rawFormData.eventsAttending : [];


  const validatedFields = rsvpFormSchema.safeParse({
    ...rawFormData,
    guestsCount: rawFormData.guestsCount ? parseInt(rawFormData.guestsCount as string, 10) : undefined,
    eventsAttending: eventsAttending,
  });

  if (!validatedFields.success) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const data = validatedFields.data;

  try {
    const db = getDbInstance();
    await addDoc(collection(db, 'rsvp_submissions'), {
      ...data,
      submittedAt: Timestamp.now(),
    });

    console.log('RSVP Submitted to Firestore via API:', data);

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your RSVP! We look forward to celebrating with you.',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error submitting RSVP to Firestore via API:', error);
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
    return new Response(JSON.stringify({
      success: false,
      message: errorMessage,
      errors: { _form: [errorMessage] },
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
