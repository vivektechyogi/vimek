import { PersonalizeInvitationForm } from '@/components/forms/PersonalizeInvitationForm';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Image from 'next/image';

export const metadata = {
  title: 'Personalize Invitation - Ever After',
  description: 'Use AI to craft unique wedding invitation messages.',
};

export default function PersonalizeInvitationPage() {
  return (
     <div className="relative min-h-screen">
       <Image
        src="https://picsum.photos/1920/1080?blur=2"
        alt="Abstract background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
        data-ai-hint="soft abstract texture"
      />
      <PageWrapper className="relative z-10 flex flex-col items-center justify-center">
        <PersonalizeInvitationForm />
      </PageWrapper>
    </div>
  );
}
