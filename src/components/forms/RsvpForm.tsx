
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { type RsvpFormData, rsvpFormSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getDbInstance, firebaseInitializationError } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const eventOptions = [
  { id: 'mehendi', label: 'Mehendi Ceremony (Nov 21)' },
  { id: 'haldi', label: 'Haldi Ceremony (Nov 22)' },
  { id: 'wedding_reception', label: 'Wedding & Reception (Nov 23)' },
];

interface FormAlert {
  type: 'success' | 'error';
  message: string;
}

export function RsvpForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlert | null>(null);

  const form = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      guestsCount: 1,
      eventsAttending: [],
      notes: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, control } = form;

  const onSubmitRsvp: SubmitHandler<RsvpFormData> = async (data) => {
    setIsLoading(true);
    setFormAlert(null);

    if (firebaseInitializationError) {
      console.error("RSVP submission blocked: Firebase initialization failed.", firebaseInitializationError);
      const userFriendlyMessage = "We're experiencing technical difficulties. Please try again later or contact support.";
      setFormAlert({ type: 'error', message: userFriendlyMessage });
      setIsLoading(false);
      return;
    }

    try {
      const db = getDbInstance();
      // IMPORTANT: Ensure your Firestore security rules allow writes to 'rsvp_submissions'
      // from the client (e.g., for unauthenticated users if this form is public).
      // Example rule (allow anyone to write, for development/simple sites ONLY):
      // rules_version = '2';
      // service cloud.firestore {
      //   match /databases/{database}/documents {
      //     match /rsvp_submissions/{documentId} {
      //       allow create: if true;
      //     }
      //   }
      // }
      await addDoc(collection(db, 'rsvp_submissions'), {
        ...data,
        submittedAt: Timestamp.now(),
      });

      toast({
        title: 'Success!',
        description: 'Thank you for your RSVP! We look forward to celebrating with you.',
      });
      setFormAlert({ type: 'success', message: 'Thank you for your RSVP! We look forward to celebrating with you.' });
      reset();
    } catch (error) {
      console.error('Error submitting RSVP to Firestore from client:', error);
      let errorMessage = 'An unexpected error occurred while submitting your RSVP. Please try again later.';
      if (error instanceof Error) {
        if (error.message.includes("offline") || error.message.includes("Failed to get document because the client is offline")) {
            errorMessage = "You appear to be offline. Please check your internet connection and try again.";
        } else if ((error as any).code === 'permission-denied') {
             errorMessage = "We couldn't save your RSVP due to a permissions issue. This might be due to Firestore security rules. Please contact support.";
        } else if (error.message.startsWith('Firebase not initialized') || error.message.startsWith('Firestore database is not available')) {
             errorMessage = "We're experiencing technical difficulties connecting to our services. Please try again later or contact support.";
        }
      }
      setFormAlert({ type: 'error', message: errorMessage });
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/50 p-6 md:p-8 text-center">
        <CardTitle className="text-3xl md:text-4xl font-playfair-display text-primary">Kindly Respond</CardTitle>
        <CardDescription className="text-md md:text-lg text-muted-foreground mt-2">
          We are thrilled to invite you! Please let us know if you can make it by November 1st, 2025.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmitRsvp)} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="font-semibold text-foreground/80">Full Name</Label>
            <Input id="fullName" {...register('fullName')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="font-semibold text-foreground/80">Email Address</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="font-semibold text-foreground/80">Phone Number (Optional)</Label>
            <Input id="phoneNumber" type="tel" {...register('phoneNumber')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {errors.phoneNumber && <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="guestsCount" className="font-semibold text-foreground/80">Number of Guests Attending</Label>
            <Input id="guestsCount" type="number" {...register('guestsCount', { valueAsNumber: true })} min="1" max="10" className="mt-1 bg-background/70 border-border focus:border-primary" />
            {errors.guestsCount && <p className="text-sm text-destructive mt-1">{errors.guestsCount.message}</p>}
          </div>

          <div>
            <Label className="font-semibold text-foreground/80 block mb-2">Events Attending</Label>
            <Controller
              name="eventsAttending"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {eventOptions.map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.id}
                        checked={field.value?.includes(event.label)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, event.label]);
                          } else {
                            field.onChange(currentValues.filter((value) => value !== event.label));
                          }
                        }}
                      />
                      <Label htmlFor={event.id} className="font-normal text-foreground/90">
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.eventsAttending && <p className="text-sm text-destructive mt-1">{errors.eventsAttending.message}</p>}
          </div>

          <div>
            <Label htmlFor="notes" className="font-semibold text-foreground/80">Notes or Dietary Restrictions (Optional)</Label>
            <Textarea id="notes" {...register('notes')} rows={3} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {errors.notes && <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>}
          </div>
          
          {formAlert && (
            <div className={`p-3 rounded-md text-sm ${formAlert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-destructive'}`}>
              {formAlert.message}
            </div>
          )}
          
          <CardFooter className="p-0 pt-6 flex justify-center">
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              Send RSVP
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
