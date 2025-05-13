
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
        src="https://media-hosting.imagekit.io/c43d80a3272a46c6/main.png?Expires=1841763194&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bx8AvDnQpRe2jeqHCdQ7RHvhLHmWKeGDvXL8~ef-8YhASOPfrWsv3y7bFUW6EMRJhDSunHmxWHgKh3RAoDxww2rdjmIGDF~PM59f4pKH1w0LkT28RKr6trUaMX0dbxxokt62SFuM~JSZzR8m69ZwEMtIY8QNpmqZ9YcKGGIzsyh4z2hczkQ3YzZK9JtC4~sy2hlc7saYVa8-7sz9RktfLtPeHB9Itn1q8cwFDkfQuvOQ5HAwJ~1E8H4vDPlfjofeaW7mFke7hf5QUKhJvki49QDMlTjercBeVq-~5qe8yxZ9wsrlSxglj15tAJWGcpAXk4xiQGXKFDB0wHIC0nC-DQ__"
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

