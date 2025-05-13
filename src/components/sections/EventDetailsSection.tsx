
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Palette, Sun, Heart } from 'lucide-react';

const events = [
  {
    name: 'Mehendi Ceremony',
    date: 'Friday, November 21, 2025',
    time: '10:00 AM onwards',
    location: 'Venue at Triyuginarayan',
    address: 'Triyuginarayan Village, Rudraprayag District, Uttarakhand, India',
    icon: <Palette className="h-10 w-10 text-primary mb-4" />,
    description: 'Join us for the vibrant Mehendi ceremony, a celebration of joy, color, and intricate henna designs as we kick off the wedding festivities.'
  },
  {
    name: 'Haldi Ceremony',
    date: 'Saturday, November 22, 2025',
    time: '3:00 PM onwards',
    location: 'Venue at Triyuginarayan',
    address: 'Triyuginarayan Village, Rudraprayag District, Uttarakhand, India',
    icon: <Sun className="h-10 w-10 text-primary mb-4" />,
    description: 'Be part of our auspicious Haldi ceremony, a traditional ritual of blessings, purification, and playful moments with friends and family.'
  },
  {
    name: 'Wedding Ceremony & Reception',
    date: 'Sunday, November 23, 2025',
    time: 'Wedding: 11:00 AM | Reception: Following Ceremony',
    location: 'Ceremony: Triyuginarayan Temple | Reception: Nearby Venue',
    address: 'Triyuginarayan Village, Rudraprayag District, Uttarakhand, India',
    icon: <Heart className="h-10 w-10 text-primary mb-4" />,
    description: 'Witness our sacred union at the legendary Triyuginarayan Temple, followed by a joyous reception with dinner, music, and celebrations amidst the serene Himalayas.'
  },
];

export function EventDetailsSection() {
  return (
    <PageWrapper id="event-details" className="bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">Wedding Events</h2>
        <p className="text-lg text-muted-foreground">Join us as we celebrate our special days at the divine Triyuginarayan.</p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8"> {/* Changed to 1 column for potentially longer descriptions or more events */}
        {events.map((event) => (
          <Card key={event.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-card p-6 items-center text-center">
              {event.icon}
              <CardTitle className="font-playfair-display text-3xl text-foreground">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-center md:text-left flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground mb-2">
                  <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>{event.location}</span>
                </div>
                 <p className="text-sm text-muted-foreground/80 text-center md:text-left">{event.address}</p>
              </div>
              <CardDescription className="pt-4 text-foreground/90 text-center md:text-left">{event.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center p-6 bg-card rounded-lg shadow-md">
        <h3 className="text-2xl font-playfair-display font-semibold text-primary mb-3">Important Note</h3>
        <p className="text-muted-foreground">
          Triyuginarayan is a remote, high-altitude pilgrimage site. Please ensure you are adequately prepared for mountain weather and carry necessary warm clothing. Connectivity may be limited. We appreciate your understanding and effort to be part of our special day in this divine location.
        </p>
      </div>
    </PageWrapper>
  );
}
