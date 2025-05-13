import Image from 'next/image';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export function OurStorySection() {
  return (
    <PageWrapper id="our-story" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">Our Story</h2>
        <Heart className="h-8 w-8 mx-auto text-secondary" />
      </div>
      <Card className="shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src="https://picsum.photos/600/400?grayscale"
              alt="Couple photo"
              width={600}
              height={400}
              className="object-cover w-full h-64 md:h-full"
              data-ai-hint="indian couple"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-playfair-display text-3xl text-foreground">Vivek & Meghna: Our Story</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-muted-foreground space-y-4">
              <p className="italic text-md mb-6 text-center md:text-left">
                With the blessings of our families, we,
                <br />
                <span className="font-semibold text-primary">Vivek</span> (son of Smt. Kusum & brother of Sri. Lokesh)
                <br />
                and
                <br />
                <span className="font-semibold text-primary">Meghna</span> (daughter of Sri. Nitin Puradkar & Smt. Aarti Puradkar),
                <br />
                joyfully invite you to share in our happiness as we embark on our forever journey.
              </p>
              <p>
                Our story began in the digital realm, connecting through social media and soon finding ourselves working side-by-side. 
                It was a tale of a tech guy making his way to a management girl, a partnership that blossomed beyond professional collaboration. 
                Our first real-world meeting at the serene ISKCON temple in Mumbai marked the true beginning of our beautiful relationship, blessed by the grace of Radhe-Krishna.
              </p>
              <p>
                Our shared love for Lord Shiva drew us to the sacred Triyuginarayan temple for our wedding, the very place where Shiva and Parvati were united. This choice reflects our deep spiritual connection and reverence for divine unions.
              </p>
              <p>
                Loving each other is common, but true perfection is a myth. We believe our bond isn't just about celebrating happy moments; it's about embracing each other's flaws, sharing difficult times, and holding hands firmly through every high and low. 
                Our journey, which started with the blessings of Radhe-Krishna, now leads us to the hallowed grounds where Shiv and Parvati began their marital life. 
              </p>
              <p>
                We would be overjoyed to have you witness this beautiful and significant step in our shared journey.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
