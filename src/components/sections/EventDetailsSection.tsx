import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const events = [
  {
    name: 'Ceremony',
    date: 'Saturday, October 26, 2024',
    time: '2:00 PM',
    location: 'The Grand Cathedral',
    address: '123 Church St, Anytown, USA',
    icon: <CalendarDays className="h-10 w-10 text-primary mb-4" />,
    description: 'Witness our vows in a beautiful, historic setting.'
  },
  {
    name: 'Reception',
    date: 'Saturday, October 26, 2024',
    time: '5:00 PM - 10:00 PM',
    location: 'The Crystal Ballroom',
    address: '456 Celebration Ave, Anytown, USA',
    icon: <Clock className="h-10 w-10 text-primary mb-4" />,
    description: 'Join us for dinner, dancing, and celebration!'
  },
];

export function EventDetailsSection() {
  return (
    <PageWrapper id="event-details" className="bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">Event Details</h2>
        <p className="text-lg text-muted-foreground">Join us as we celebrate our special day.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Card key={event.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
            <CardHeader className="bg-card p-6 items-center text-center">
              {event.icon}
              <CardTitle className="font-playfair-display text-3xl text-foreground">{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                <Clock className="h-5 w-5 mr-2 text-secondary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <span>{event.location} - {event.address}</span>
              </div>
              <CardDescription className="pt-2 text-foreground/90 text-center md:text-left">{event.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
