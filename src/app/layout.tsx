
import type { Metadata } from 'next';
import { playfairDisplay, lora, dancingScript } from '@/lib/fonts';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AudioPlayer } from '@/components/layout/AudioPlayer';

export const metadata: Metadata = {
  title: 'Vivek & Meghna - Our Wedding Celebration #MeVek',
  description: 'Join Vivek & Meghna for their wedding celebration on November 23, 2025, in Triyuginarayan. #MeVek. Find event details, RSVP, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(playfairDisplay.variable, lora.variable, dancingScript.variable)}>
      <body className="font-lora antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <AudioPlayer />
      </body>
    </html>
  );
}
