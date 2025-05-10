
import { HeroSection } from '@/components/sections/HeroSection';
import { OurStorySection } from '@/components/sections/OurStorySection';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { RegistrySection } from '@/components/sections/RegistrySection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Edit3 } from 'lucide-react';
import { RsvpForm } from '@/components/forms/RsvpForm';
import Image from 'next/image';


export default function HomePage() {
  const handleScrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('rsvp');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <EventDetailsSection />
      <RegistrySection />
      <PageWrapper id="rsvp" className="relative bg-muted/30">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Elegant background for RSVP"
          layout="fill"
          objectFit="cover"
          className="opacity-20 z-0"
          data-ai-hint="soft floral background"
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <RsvpForm />
        </div>
      </PageWrapper>
      <PageWrapper className="bg-muted/30 text-center">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-6 text-primary">Ready to Celebrate With Us?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We are so excited to share our special day with you. Please let us know if you can make it!
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-3 text-xl font-playfair-display">
          <Link href="/#rsvp" onClick={handleScrollToRsvp}>
            <Edit3 className="mr-2 h-5 w-5" />
            RSVP Now
          </Link>
        </Button>
      </PageWrapper>
    </>
  );
}
