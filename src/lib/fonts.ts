import { Playfair_Display, Lora, Dancing_Script } from 'next/font/google';

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '700'],
  display: 'swap',
});

export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '700'], // Dancing Script typically supports these weights
  display: 'swap',
});
