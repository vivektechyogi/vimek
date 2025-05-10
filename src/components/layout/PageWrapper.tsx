import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export function PageWrapper({ children, className, as: Component = 'section', id }: PageWrapperProps) {
  return (
    <Component id={id} className={cn('py-12 md:py-20', className)}>
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {children}
      </div>
    </Component>
  );
}
