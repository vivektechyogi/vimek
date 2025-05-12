
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, BookOpen, CalendarCheck, Edit3, Map } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/#hero', label: 'Home', icon: Home },
  { href: '/#our-story', label: 'Our Story', icon: BookOpen },
  { href: '/#event-details', label: 'Event Details', icon: CalendarCheck },
  { href: '/#directions', label: 'Directions', icon: Map },
  { href: '/#rsvp', label: 'RSVP', icon: Edit3 },
];

interface NavLinkItemsProps {
  isMobile?: boolean;
  currentActiveHash: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const NavLinkItems: FC<NavLinkItemsProps> = ({ isMobile = false, currentActiveHash, onLinkClick }) => {
  return (
    <>
      {navLinks.map((link) => {
        // Check if the current hash exactly matches the link's hash part
        // or if it's the home page and the link is to #hero (and hash is empty or #hero)
        const isActive = 
          (link.href.startsWith('/#') && currentActiveHash === link.href.substring(1)) ||
          (link.href === '/#hero' && (currentActiveHash === '' || currentActiveHash === 'hero'));

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
      // Remove '#' from hash for consistency
      setCurrentHash(window.location.hash.substring(1));
    };

    // Set initial hash (without '#')
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash.substring(1));
    }


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentHash(entry.target.id);
            // Update URL hash without causing a page jump, only if it's different
            if (typeof window !== 'undefined' && window.location.hash !== `#${entry.target.id}`) {
                 history.pushState(null, '', `#${entry.target.id}`);
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when element is in the middle of the viewport
    );
    
    let heroElement: HTMLElement | null = null;
    if (typeof document !== 'undefined') {
      navLinks.forEach(link => {
        if (link.href.startsWith("/#")) {
          const element = document.getElementById(link.href.substring(2));
          if (element) observer.observe(element);
        }
      });
      
      // Also observe the hero section if it's not explicitly in navLinks for root path
      heroElement = document.getElementById('hero');
      if (heroElement) observer.observe(heroElement);
    }


    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange, false);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange, false);
      }
      if (typeof document !== 'undefined') {
        navLinks.forEach(link => {
          if (link.href.startsWith("/#")) {
            const element = document.getElementById(link.href.substring(2));
            if (element) observer.unobserve(element);
          }
        });
        if (heroElement) observer.unobserve(heroElement);
      }
    };
  }, [pathname]); // Rerun on pathname change if needed for non-SPA parts

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); 
      if (typeof document !== 'undefined') {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // setCurrentHash(targetId); // Set hash immediately for active state
          // Manually update hash in URL as scrollIntoView doesn't always do it reliably across browsers
          if (typeof window !== 'undefined' && window.location.hash !== `#${targetId}`) {
            history.pushState(null, '', `#${targetId}`);
          }
          if (isSheetOpen) setIsSheetOpen(false); 
        }
      }
    } else {
       if (isSheetOpen) setIsSheetOpen(false); 
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/#hero" onClick={(e) => handleScroll(e, '/#hero')} className="text-2xl font-bold font-playfair-display text-primary">
          Ever After
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinkItems currentActiveHash={currentHash} onLinkClick={handleScroll} />
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
                  <NavLinkItems isMobile currentActiveHash={currentHash} onLinkClick={handleScroll} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

