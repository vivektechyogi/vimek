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
              src="https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22main.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-05-12T16%3A53%3A13.568Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fc43d80a3272a46c6%2Fmain.png%3FExpires%3D1841763194%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3Dbx8AvDnQpRe2jeqHCdQ7RHvhLHmWKeGDvXL8~ef-8YhASOPfrWsv3y7bFUW6EMRJhDSunHmxWHgKh3RAoDxww2rdjmIGDF~PM59f4pKH1w0LkT28RKr6trUaMX0dbxxokt62SFuM~JSZzR8m69ZwEMtIY8QNpmqZ9YcKGGIzsyh4z2hczkQ3YzZK9JtC4~sy2hlc7saYVa8-7sz9RktfLtPeHB9Itn1q8cwFDkfQuvOQ5HAwJ~1E8H4vDPlfjofeaW7mFke7hf5QUKhJvki49QDMlTjercBeVq-~5qe8yxZ9wsrlSxglj15tAJWGcpAXk4xiQGXKFDB0wHIC0nC-DQ__%22%7D"
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
                <span className="font-semibold text-primary">Vivek</span> (son of Smt. Kusum Lalan & brother of Sri. Lokesh Lalan)
                <br />
                and
                <br />
                <span className="font-semibold text-primary">Meghna</span> (daughter of Sri. Nitin Puradkar & Smt. Aarti Puradkar),
                <br />
                joyfully invite you to share in our happiness as we embark on our forever journey.
              </p>
              <p>
                Some stories are written in the stars — ours began with a simple message on a social media platform. A tech guy met a management girl, two souls with different worlds but the same heartbeat. From working together to understanding each other’s dreams, we didn’t even realize when friendship quietly blossomed into love.
              </p>
              <p>
                Our first meeting was at the ISKCON Temple in Mumbai — a moment that felt like destiny. Under the gentle gaze of Radha-Krishna, something divine began between us. From that day forward, our bond only grew stronger, wrapped in grace, trust, and a shared spiritual connection.
              </p>
              <p>
                Our hearts have always been drawn to the stories of Lord Shiva and Parvati — of eternal love, balance, and unbreakable union. That’s why we chose Triyuginarayan Temple, the sacred ground where Shiva and Parvati were married, as the place to begin our forever. For us, it’s more than a wedding venue — it’s a symbol of divine love, the kind we hope to carry in our own journey.
              </p>
              <p>
                In a world where love often comes with conditions, we chose something deeper. We don’t just love each other for the good days, the laughter, and the easy moments — we’ve embraced each other through flaws, fears, and storms. We’ve held hands through the chaos, and found peace in each other’s presence.
              </p>
              <p>
                With Radha-Krishna’s blessings at our beginning, and Lord Shiva and Parvati’s love guiding our next chapter, we are stepping into marriage with hearts full of gratitude and souls deeply in love.
              </p>
              <p>
                We would be truly honoured to have you with us as we take this beautiful step in our journey — a celebration not just of love, but of faith, friendship, and forever.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
