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
              data-ai-hint="happy couple black white"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-playfair-display text-3xl text-foreground">From "Hello" to "I Do"</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-muted-foreground space-y-4">
              <p>
                Our journey began on a crisp autumn afternoon, amidst the fallen leaves and the scent of pumpkin spice.
                What started with a shared laugh over a spilled coffee soon blossomed into a story of love, adventure, and endless support.
              </p>
              <p>
                Through sunny days and stormy nights, our bond has only grown stronger. We've built a life filled with joy,
                cherished memories, and a deep understanding of one another. Now, we're thrilled to embark on our greatest adventure yet – marriage.
              </p>
              <p>
                We can't wait to celebrate this special milestone with you, our dearest friends and family, as we say "I do" and start our forever.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
