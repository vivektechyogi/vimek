'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Hash } from 'lucide-react';

export function HeroSection() {
  const handleScrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('rsvp');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center text-white">
      <Image
        src="https://picsum.photos/1600/900"
        alt="Wedding background"
        fill
        style={{objectFit: 'cover'}}
        quality={80}
        className="brightness-50"
        data-ai-hint="romantic wedding landscape"
        priority // Add priority for LCP image
      />
      <div className="relative z-10 p-4 md:p-8">
        <h1 className="font-playfair-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
          Vivek & Meghna
        </h1>
        <p className="font-lora text-xl md:text-2xl lg:text-3xl mb-2">
          ARE GETTING MARRIED
        </p>
        <div className="flex items-center justify-center space-x-2 text-lg md:text-xl text-gray-200 mb-2">
          <CalendarDays className="h-5 w-5 md:h-6 md:w-6" />
          <span>November 23, 2025</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-lg md:text-xl text-gray-200 mb-8">
          <Hash className="h-5 w-5 md:h-6 md:w-6" />
          <span>#ViMek</span>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg font-playfair-display">
          <Link href="/#rsvp" onClick={handleScrollToRsvp}>RSVP Now</Link>
        </Button>
      </div>
    </section>
  );
}
