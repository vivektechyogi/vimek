import { z } from 'zod';

// Define Zod schema for RSVP form data
export const rsvpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().optional().or(z.literal("")),
  guestsCount: z.coerce.number().min(1, { message: "Please specify at least 1 guest." }).max(10, { message: "Maximum 10 guests allowed." }),
  eventsAttending: z.array(z.string()).min(1, { message: "Please select at least one event you'll be attending." }),
  notes: z.string().max(500, { message: "Notes must not exceed 500 characters." }).optional(),
});

export type RsvpFormData = z.infer<typeof rsvpFormSchema>;
