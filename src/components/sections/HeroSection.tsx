
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
        src="https://media-hosting.imagekit.io/0d5f6d085ec34beb/Black and Red Scrapbook Wedding Anniversary Vlog YouTube Thumbnail (1).png?Expires=1841817663&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=FryU9AUW8UWIZC0mCJsNZEDusNgl3QxFgKd15EhjzbVhrCdbQKm02ytF3R9-GI13HtJo9TmuxrbrsDr9bWrLbwU2a25d1xaTUfBL2Ws2qfCArRyUmRx4PrC~bNM2gx76r1X06PofTFE8ITzYjhVXcgWYVMdYfjpYpMGsxKnPWd9CBv6FBlCsWmKqOAtlK53W0a~e4ip7ylGHiRlp8S6J4QQq1GlQo0jhVgVBS5x53qMe2Jvzlw5rjwRUoIXHnR0ZOc8OrJ-axkUCPGqD5jAVj5v-7ZwLGCWUuQxEXJmoP5F6-jWzhEOcdLUxkNs~0gci0U1jVVgbOw2b4fCT0iwAXA__"
        alt="Wedding background"
        fill
        style={{objectFit: 'cover'}}
        quality={80}
        className="brightness-50"
        priority // Add priority for LCP image
        data-ai-hint="wedding couple"
      />
      <div className="relative z-10 p-4 md:p-8">
        <h1 className="font-dancing-script text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
          Vivek & Meghna
        </h1>
        <p className="font-dancing-script text-3xl md:text-4xl lg:text-5xl mb-4">
          ARE GETTING MARRIED
        </p>
        <div className="font-dancing-script flex items-center justify-center space-x-3 text-xl md:text-2xl text-gray-200 mb-4">
          <CalendarDays className="h-6 w-6 md:h-7 md:w-7" />
          <span>November 23, 2025</span>
        </div>
        <div className="font-dancing-script flex items-center justify-center space-x-3 text-xl md:text-2xl text-gray-200 mb-10">
          <Hash className="h-6 w-6 md:h-7 md:w-7" />
          <span>#ViMek</span>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-4 text-xl font-playfair-display">
          <Link href="/#rsvp" onClick={handleScrollToRsvp}>RSVP Now</Link>
        </Button>
      </div>
    </section>
  );
}

