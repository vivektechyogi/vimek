import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Sparkles, MountainSnow } from 'lucide-react';

const events = [
  {
    name: 'Wedding Ceremony',
    date: 'Saturday, October 26, 2024',
    time: '11:00 AM onwards',
    location: 'Triyuginarayan Temple',
    address: 'Triyuginarayan Village, Rudraprayag District, Uttarakhand, India',
    icon: <MountainSnow className="h-10 w-10 text-primary mb-4" />,
    description: 'Witness our sacred union at the legendary Triyuginarayan Temple, believed to be the venue of Lord Shiva and Goddess Parvati\'s celestial wedding.'
  },
  {
    name: 'Reception & Festivities',
    date: 'Saturday, October 26, 2024',
    time: 'Following the Ceremony',
    location: 'Nearby Venue at Triyuginarayan',
    address: 'Triyuginarayan Village, Rudraprayag District, Uttarakhand, India',
    icon: <Sparkles className="h-10 w-10 text-primary mb-4" />,
    description: 'Join us for a joyous celebration with traditional Garhwali cuisine, music, and dance amidst the serene Himalayan beauty.'
  },
];

export function EventDetailsSection() {
  return (
    <PageWrapper id="event-details" className="bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">Event Details</h2>
        <p className="text-lg text-muted-foreground">Join us as we celebrate our special day at the divine Triyuginarayan.</p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
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
