'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { rsvpFormSchema, type RsvpFormData, submitRsvpAction } from '@/app/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const eventOptions = [
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'reception', label: 'Reception' },
  { id: 'welcome_dinner', label: 'Welcome Dinner (Optional)' },
];

const initialState = {
  success: false,
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg">
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      Send RSVP
    </Button>
  );
}

export function RsvpForm() {
  const [state, formAction] = useFormState(submitRsvpAction, initialState);
  const { toast } = useToast();

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

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset(); // Reset form on successful submission
      } else {
        toast({
          title: 'Error',
          description: state.message || 'An error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, form]);
  
  const fieldErrors = state.errors || {};

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/50 p-6 md:p-8 text-center">
        <CardTitle className="text-3xl md:text-4xl font-playfair-display text-primary">Kindly Respond</CardTitle>
        <CardDescription className="text-md md:text-lg text-muted-foreground mt-2">
          We are thrilled to invite you! Please let us know if you can make it by [RSVP Date].
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="font-semibold text-foreground/80">Full Name</Label>
            <Input id="fullName" {...form.register('fullName')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.fullName && <p className="text-sm text-destructive mt-1">{fieldErrors.fullName[0]}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="font-semibold text-foreground/80">Email Address</Label>
            <Input id="email" type="email" {...form.register('email')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.email && <p className="text-sm text-destructive mt-1">{fieldErrors.email[0]}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="font-semibold text-foreground/80">Phone Number (Optional)</Label>
            <Input id="phoneNumber" type="tel" {...form.register('phoneNumber')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.phoneNumber && <p className="text-sm text-destructive mt-1">{fieldErrors.phoneNumber[0]}</p>}
          </div>
          
          <div>
            <Label htmlFor="guestsCount" className="font-semibold text-foreground/80">Number of Guests Attending</Label>
            <Input id="guestsCount" type="number" {...form.register('guestsCount', { valueAsNumber: true })} min="1" max="10" className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.guestsCount && <p className="text-sm text-destructive mt-1">{fieldErrors.guestsCount[0]}</p>}
          </div>

          <div>
            <Label className="font-semibold text-foreground/80 block mb-2">Events Attending</Label>
            <div className="space-y-2">
              {eventOptions.map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={event.id}
                    value={event.label}
                    {...form.register('eventsAttending')}
                    name="eventsAttending" // ensure name attribute is present for FormData
                  />
                  <Label htmlFor={event.id} className="font-normal text-foreground/90">{event.label}</Label>
                </div>
              ))}
            </div>
            {fieldErrors?.eventsAttending && <p className="text-sm text-destructive mt-1">{fieldErrors.eventsAttending[0]}</p>}
          </div>

          <div>
            <Label htmlFor="notes" className="font-semibold text-foreground/80">Notes or Dietary Restrictions (Optional)</Label>
            <Textarea id="notes" {...form.register('notes')} rows={3} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.notes && <p className="text-sm text-destructive mt-1">{fieldErrors.notes[0]}</p>}
          </div>
          
          {fieldErrors?._form && <p className="text-sm text-destructive mt-1">{fieldErrors._form[0]}</p>}
          
          <CardFooter className="p-0 pt-6 flex justify-center">
             <SubmitButton />
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
