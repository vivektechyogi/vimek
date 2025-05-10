import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import Link from 'next/link';

export function RegistrySection() {
  return (
    <PageWrapper id="registry" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">Wedding Registry</h2>
        <Gift className="h-8 w-8 mx-auto text-secondary" />
      </div>
      <Card className="shadow-xl text-center p-6 md:p-10">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="font-playfair-display text-3xl text-foreground">Your Presence is Present Enough</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <p className="text-muted-foreground text-lg">
            More than anything, we hope that you can make it to our special day! Your presence is the greatest gift we could ask for.
          </p>
          <p className="text-muted-foreground text-lg">
            However, if you'd like to honor us with a gift, we've registered at a few places.
            You can find our registry links below.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-full px-8">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                View Registry 1
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-full px-8">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                View Registry 2
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
