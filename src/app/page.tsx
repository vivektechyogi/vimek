import { HeroSection } from '@/components/sections/HeroSection';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { RegistrySection } from '@/components/sections/RegistrySection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Edit3 } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <EventDetailsSection />
      <RegistrySection />
      <PageWrapper className="bg-muted/30 text-center">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-6 text-primary">Ready to Celebrate With Us?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We are so excited to share our special day with you. Please let us know if you can make it!
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-3 text-xl font-playfair-display">
          <Link href="/rsvp">
            <Edit3 className="mr-2 h-5 w-5" />
            RSVP Now
          </Link>
        </Button>
      </PageWrapper>
    </>
  );
}
