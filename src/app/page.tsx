
'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { DirectionsSection } from '@/components/sections/DirectionsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Edit3, MapPinned } from 'lucide-react';
import { RsvpForm } from '@/components/forms/RsvpForm';
import Image from 'next/image';


export default function HomePage() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <EventDetailsSection />
      <DirectionsSection />
      <PageWrapper id="rsvp" className="relative bg-muted/30">
        <Image
          src="https://media-hosting.imagekit.io/c43d80a3272a46c6/main.png?Expires=1841763194&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bx8AvDnQpRe2jeqHCdQ7RHvhLHmWKeGDvXL8~ef-8YhASOPfrWsv3y7bFUW6EMRJhDSunHmxWHgKh3RAoDxww2rdjmIGDF~PM59f4pKH1w0LkT28RKr6trUaMX0dbxxokt62SFuM~JSZzR8m69ZwEMtIY8QNpmqZ9YcKGGIzsyh4z2hczkQ3YzZK9JtC4~sy2hlc7saYVa8-7sz9RktfLtPeHB9Itn1q8cwFDkfQuvOQ5HAwJ~1E8H4vDPlfjofeaW7mFke7hf5QUKhJvki49QDMlTjercBeVq-~5qe8yxZ9wsrlSxglj15tAJWGcpAXk4xiQGXKFDB0wHIC0nC-DQ__"
          alt="Elegant background for RSVP"
          fill
          style={{objectFit: 'cover'}}
          className="opacity-20 z-0"
          data-ai-hint="indian floral pattern"
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <RsvpForm />
        </div>
      </PageWrapper>
      <PageWrapper className="bg-muted/30 text-center">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-6 text-primary">Ready to Celebrate With Us?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We are so excited to share our special day with you. Please RSVP and check travel directions if you plan to join us in Triyuginarayan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-3 text-xl font-playfair-display">
            <Link href="/#rsvp" onClick={(e) => handleScrollToSection(e, 'rsvp')}>
              <Edit3 className="mr-2 h-5 w-5" />
              RSVP Now
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-full px-10 py-3 text-xl font-playfair-display">
            <Link href="/#directions" onClick={(e) => handleScrollToSection(e, 'directions')}>
              <MapPinned className="mr-2 h-5 w-5" />
              Get Directions
            </Link>
          </Button>
        </div>
      </PageWrapper>
    </>
  );
}

