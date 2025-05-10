'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { generatePersonalizedMessageAction } from '@/app/actions';
import { type PersonalizeMessageData, personalizeMessageSchema } from '@/lib/schemas';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const initialState = {
  success: false,
  message: '',
  personalizedMessage: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Message
    </Button>
  );
}

export function PersonalizeInvitationForm() {
  const [state, formAction] = useFormState(generatePersonalizedMessageAction, initialState);
  const { toast } = useToast();
  const [generatedMessage, setGeneratedMessage] = useState<string | undefined>('');


  const form = useForm<PersonalizeMessageData>({
    resolver: zodResolver(personalizeMessageSchema),
    defaultValues: {
      inviteeName: '',
      eventDetails: '',
      additionalInfo: '',
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        setGeneratedMessage(state.personalizedMessage);
        // form.reset(); // Optionally reset form
      } else {
        toast({
          title: 'Error',
          description: state.message || 'Failed to generate message. Please try again.',
          variant: 'destructive',
        });
         setGeneratedMessage('');
      }
    }
  }, [state, toast, form]);

  const fieldErrors = state.errors || {};

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="bg-muted/50 p-6 md:p-8 text-center">
        <Sparkles className="h-12 w-12 mx-auto text-secondary mb-3" />
        <CardTitle className="text-3xl md:text-4xl font-playfair-display text-primary">Personalize Invitation Message</CardTitle>
        <CardDescription className="text-md md:text-lg text-muted-foreground mt-2">
          Craft a unique and warm invitation message for your guests using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="inviteeName" className="font-semibold text-foreground/80">Invitee's Name</Label>
            <Input id="inviteeName" {...form.register('inviteeName')} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.inviteeName && <p className="text-sm text-destructive mt-1">{fieldErrors.inviteeName[0]}</p>}
          </div>

          <div>
            <Label htmlFor="eventDetails" className="font-semibold text-foreground/80">Event Details (Date, Time, Location)</Label>
            <Textarea id="eventDetails" {...form.register('eventDetails')} rows={4} className="mt-1 bg-background/70 border-border focus:border-primary" />
            {fieldErrors?.eventDetails && <p className="text-sm text-destructive mt-1">{fieldErrors.eventDetails[0]}</p>}
          </div>

          <div>
            <Label htmlFor="additionalInfo" className="font-semibold text-foreground/80">Additional Information (Optional)</Label>
            <Textarea id="additionalInfo" {...form.register('additionalInfo')} rows={3} className="mt-1 bg-background/70 border-border focus:border-primary" placeholder="e.g., relationship to invitee, specific memory, dress code" />
            {fieldErrors?.additionalInfo && <p className="text-sm text-destructive mt-1">{fieldErrors.additionalInfo[0]}</p>}
          </div>
          
          {fieldErrors?._form && <p className="text-sm text-destructive mt-1">{fieldErrors._form[0]}</p>}

          <CardFooter className="p-0 pt-6 flex flex-col items-center space-y-6">
            <SubmitButton />
            {generatedMessage && (
              <div className="w-full mt-6 p-4 border border-primary/30 rounded-md bg-primary/5">
                <h4 className="font-semibold text-lg font-playfair-display text-primary mb-2">Generated Message:</h4>
                <p className="text-foreground/90 whitespace-pre-wrap">{generatedMessage}</p>
              </div>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
