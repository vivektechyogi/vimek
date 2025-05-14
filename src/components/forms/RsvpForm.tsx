
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
  const [apiFieldErrors, setApiFieldErrors] = useState<Partial<Record<keyof RsvpFormData | '_form', string[]>>>({});


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

  const { register, handleSubmit, formState: { errors: clientErrors }, reset, setError } = form;

  const onSubmitRsvp: SubmitHandler<RsvpFormData> = async (data) => {
    setIsLoading(true);
    setFormAlert(null);
    setApiFieldErrors({});

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormAlert({ type: 'error', message: result.message || 'An error occurred. Please try again.' });
        if (result.errors) {
          setApiFieldErrors(result.errors);
          // Optionally set errors on react-hook-form fields if keys match
          Object.entries(result.errors as Record<string, string[]>).forEach(([key, value]) => {
            if (key !== '_form') {
               setError(key as keyof RsvpFormData, { type: 'server', message: value[0] });
            }
          });
        }
      } else {
        setFormAlert({ type: 'success', message: result.message });
        toast({
          title: 'Success!',
          description: result.message,
        });
        reset(); // Reset form on successful submission
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      setFormAlert({ type: 'error', message: 'A network error occurred. Please try again.' });
      setApiFieldErrors({ _form: ['A network error occurred. Please try again.'] });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Combine client-side and API-side errors for display
  const getCombinedError = (fieldName: keyof RsvpFormData) => {
    return clientErrors[fieldName]?.message || apiFieldErrors[fieldName]?.[0];
  };
  const formLevelError = apiFieldErrors._form?.[0];


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
            {getCombinedError('fullName') && <p className="text-sm text-destructive mt-1">{getCombinedError('fullName')}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="font-semibold text-foreground/80">Email Address</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1 bg-background/70 border-border focus:border-primary" />
             {getCombinedError('email') && <p className="text-sm text-destructive mt-1">{getCombinedError('email')}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="font-semibold text-foreground/80">Phone Number (Optional)</Label>
            <Input id="phoneNumber" type="tel" {...register('phoneNumber')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {getCombinedError('phoneNumber') && <p className="text-sm text-destructive mt-1">{getCombinedError('phoneNumber')}</p>}
          </div>
          
          <div>
            <Label htmlFor="guestsCount" className="font-semibold text-foreground/80">Number of Guests Attending</Label>
            <Input id="guestsCount" type="number" {...register('guestsCount', { valueAsNumber: true })} min="1" max="10" className="mt-1 bg-background/70 border-border focus:border-primary" />
            {getCombinedError('guestsCount') && <p className="text-sm text-destructive mt-1">{getCombinedError('guestsCount')}</p>}
          </div>

          <div>
            <Label className="font-semibold text-foreground/80 block mb-2">Events Attending</Label>
            <div className="space-y-2">
              {eventOptions.map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={event.id}
                    value={event.label}
                    {...register('eventsAttending')}
                    name="eventsAttending"
                  />
                  <Label htmlFor={event.id} className="font-normal text-foreground/90">{event.label}</Label>
                </div>
              ))}
            </div>
            {getCombinedError('eventsAttending') && <p className="text-sm text-destructive mt-1">{getCombinedError('eventsAttending')}</p>}
          </div>

          <div>
            <Label htmlFor="notes" className="font-semibold text-foreground/80">Notes or Dietary Restrictions (Optional)</Label>
            <Textarea id="notes" {...register('notes')} rows={3} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {getCombinedError('notes') && <p className="text-sm text-destructive mt-1">{getCombinedError('notes')}</p>}
          </div>
          
          {formAlert && (
            <div className={`p-3 rounded-md text-sm ${formAlert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-destructive'}`}>
              {formAlert.message}
            </div>
          )}
          {formLevelError && !formAlert && <p className="text-sm text-destructive mt-1">{formLevelError}</p>}
          
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
