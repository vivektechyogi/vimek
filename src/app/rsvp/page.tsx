import { RsvpForm } from '@/components/forms/RsvpForm';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Image from 'next/image';

export const metadata = {
  title: 'RSVP - Ever After',
  description: 'Let us know if you can join our celebration.',
};

export default function RsvpPage() {
  return (
    <div className="relative min-h-screen">
       <Image
        src="https://picsum.photos/1920/1080"
        alt="Elegant background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
        data-ai-hint="soft floral background"
      />
      <PageWrapper className="relative z-10 flex flex-col items-center justify-center">
        <RsvpForm />
      </PageWrapper>
    </div>
  );
}
