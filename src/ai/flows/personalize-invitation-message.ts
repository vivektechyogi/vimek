'use server';

/**
 * @fileOverview A personalized invitation message generator AI agent.
 *
 * - personalizeInvitationMessage - A function that handles the generation of personalized invitation messages.
 * - PersonalizeInvitationMessageInput - The input type for the personalizeInvitationMessage function.
 * - PersonalizeInvitationMessageOutput - The return type for the personalizeInvitationMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeInvitationMessageInputSchema = z.object({
  inviteeName: z.string().describe('The name of the invitee.'),
  eventDetails: z.string().describe('Details about the event (e.g., date, time, location).'),
  additionalInfo: z.string().optional().describe('Any additional information to include in the invitation.'),
});
export type PersonalizeInvitationMessageInput = z.infer<typeof PersonalizeInvitationMessageInputSchema>;

const PersonalizeInvitationMessageOutputSchema = z.object({
  personalizedMessage: z.string().describe('The personalized invitation message.'),
});
export type PersonalizeInvitationMessageOutput = z.infer<typeof PersonalizeInvitationMessageOutputSchema>;

export async function personalizeInvitationMessage(input: PersonalizeInvitationMessageInput): Promise<PersonalizeInvitationMessageOutput> {
  return personalizeInvitationMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeInvitationMessagePrompt',
  input: {schema: PersonalizeInvitationMessageInputSchema},
  output: {schema: PersonalizeInvitationMessageOutputSchema},
  prompt: `You are an AI assistant specializing in creating personalized wedding invitation messages.

  Create a warm and engaging invitation message for {{inviteeName}}.
  Incorporate the following event details: {{eventDetails}}.
  Here's some additional information you might find useful: {{additionalInfo}}.
  The message should be unique and reflect a personal touch.
  Ensure the tone is appropriate for a wedding invitation - joyous, celebratory, and inviting.`,
});

const personalizeInvitationMessageFlow = ai.defineFlow(
  {
    name: 'personalizeInvitationMessageFlow',
    inputSchema: PersonalizeInvitationMessageInputSchema,
    outputSchema: PersonalizeInvitationMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
