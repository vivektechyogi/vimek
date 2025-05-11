import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 bg-muted/50 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-primary" /> by Vivek & Meghna
        </p>
        <p>&copy; {new Date().getFullYear()} Ever After RSVP. All rights reserved.</p>
      </div>
    </footer>
  );
}
