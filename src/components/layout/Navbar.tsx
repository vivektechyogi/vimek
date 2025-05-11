'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, BookOpen, CalendarCheck, Send, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/#hero', label: 'Home', icon: Home },
  { href: '/#our-story', label: 'Our Story', icon: BookOpen },
  { href: '/#event-details', label: 'Event Details', icon: CalendarCheck },
  { href: '/#registry', label: 'Registry', icon: Send },
  { href: '/#rsvp', label: 'RSVP', icon: Edit3 },
];

interface NavLinkItemsProps {
  isMobile?: boolean;
  currentActiveHash: string;
  pathname: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const NavLinkItems: FC<NavLinkItemsProps> = ({ isMobile = false, currentActiveHash, pathname, onLinkClick }) => {
  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          (link.href.startsWith('/#') && currentActiveHash === link.href.substring(1)) ||
          (link.href === '/#hero' && pathname === '/' && (currentActiveHash === '' || currentActiveHash === '#hero'));

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onLinkClick(e, link.href)}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive
                ? 'text-primary font-playfair-display'
                : 'text-foreground/80 font-playfair-display',
              isMobile ? 'flex items-center gap-2 py-2 text-lg' : ''
            )}
          >
            <link.icon className={cn('h-4 w-4', isMobile ? 'h-5 w-5' : '')} />
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    handleHashChange(); // Set initial hash

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove '/#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update hash manually for immediate state update if needed, though browser does it.
        // setCurrentHash(`#${targetId}`); 
        if (isSheetOpen) setIsSheetOpen(false); // Close mobile menu on click
      }
    } else if (href === '/' && pathname ==='/') { 
        e.preventDefault();
        const targetElement = document.getElementById('hero');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // setCurrentHash('#hero');
          if (isSheetOpen) setIsSheetOpen(false); // Close mobile menu on click
        }
    } else {
       if (isSheetOpen) setIsSheetOpen(false); // Close mobile menu on click
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/#hero" onClick={(e) => handleScroll(e, '/#hero')} className="text-2xl font-bold font-playfair-display text-primary">
          Ever After
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinkItems currentActiveHash={currentHash} pathname={pathname} onLinkClick={handleScroll} />
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="p-6">
                <Link href="/#hero" onClick={(e) => handleScroll(e, '/#hero')} className="mb-8 block text-2xl font-bold font-playfair-display text-primary">
                  Ever After
                </Link>
                <nav className="flex flex-col space-y-4">
                  <NavLinkItems isMobile currentActiveHash={currentHash} pathname={pathname} onLinkClick={handleScroll} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
