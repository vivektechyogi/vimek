
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPinned, Car, Train, Plane, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Removed Badge import as it's no longer directly used for origin reachability

const travelRoutes = [
  {
    from: 'Delhi',
    to: 'Triyuginarayan',
    distance: 'Approx. 450-500 km',
    originReachability: {
      train: true,
      flight: true,
      trainCity: 'delhi',
      flightCity: 'delhi',
    },
    modes: [
      {
        type: 'By Road',
        icon: <Car className="h-6 w-6 text-secondary mr-3" />,
        details: [
          'Self-drive or hire a taxi from Delhi. Route typically goes via Haridwar, Rishikesh, Devprayag, Rudraprayag, Guptkashi, Sonprayag, then to Triyuginarayan.',
          'Journey can take 12-15 hours depending on traffic and road conditions.',
          'Overnight buses are available from Delhi to Rishikesh/Haridwar or even further towards Sonprayag. From there, local transport (jeeps/taxis) to Triyuginarayan.',
        ],
      },
      {
        type: 'By Train + Road',
        icon: <Train className="h-6 w-6 text-secondary mr-3" />,
        details: [
          'Nearest major railway station: Haridwar (HW) or Rishikesh (RKSH).',
          'From Haridwar/Rishikesh, hire a taxi or take a bus towards Sonprayag/Guptkashi (approx. 200-230 km, 7-9 hours).',
          'From Sonprayag/Guptkashi, local jeeps/taxis are available to Triyuginarayan (approx. 12-20 km).',
        ],
      },
      {
        type: 'By Air + Road',
        icon: <Plane className="h-6 w-6 text-secondary mr-3" />,
        details: [
          'Nearest airport: Jolly Grant Airport, Dehradun (DED) (approx. 250 km from Triyuginarayan).',
          'From the airport, hire a taxi to Triyuginarayan. This can take 8-10 hours.',
          'Helicopter services might be available to nearby helipads (e.g., Phata, Sersi) during Char Dham Yatra season, from where you can take a taxi.',
        ],
      },
    ],
  },
  {
    from: 'Dehradun',
    to: 'Triyuginarayan',
    distance: 'Approx. 250-280 km',
    originReachability: {
      train: true,
      flight: true,
      trainCity: 'dehradun',
      flightCity: 'dehradun', // Jolly Grant Airport is in Dehradun
    },
    modes: [
      {
        type: 'By Road',
        icon: <Car className="h-6 w-6 text-secondary mr-3" />,
        details: [
          'Self-drive or hire a taxi from Dehradun. Route via Rishikesh, Devprayag, Rudraprayag, Guptkashi, Sonprayag.',
          'Journey typically takes 8-10 hours.',
          'State transport and private buses are available from Dehradun to Rishikesh, Srinagar, Rudraprayag, and further towards Sonprayag.',
        ],
      },
    ],
  },
  {
    from: 'Haridwar/Rishikesh',
    to: 'Triyuginarayan',
    distance: 'Approx. 200-230 km',
    originReachability: {
      train: true, // Haridwar or Rishikesh stations
      flight: true, // Via Dehradun's Jolly Grant Airport
      trainCity: 'haridwar', // Default to Haridwar for trains
      flightCity: 'dehradun', // Flight is to Dehradun for Haridwar/Rishikesh
    },
    modes: [
      {
        type: 'By Road',
        icon: <Car className="h-6 w-6 text-secondary mr-3" />,
        details: [
          'Hire a taxi directly to Triyuginarayan or take a shared jeep/bus towards Sonprayag/Guptkashi.',
          'Journey from Haridwar/Rishikesh takes about 7-9 hours.',
          'From Sonprayag (base for Kedarnath trek), Triyuginarayan is a short drive (approx. 12-15 km). Jeeps and taxis are readily available.',
        ],
      },
    ],
  },
];

export function DirectionsSection() {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <PageWrapper id="directions" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-playfair-display font-bold mb-4 text-primary">How to Reach Triyuginarayan</h2>
        <MapPinned className="h-8 w-8 mx-auto text-secondary" />
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          To reach the sacred village of Triyuginarayan in Uttarakhand, most travelers first arrive at major transit hubs like Delhi, Dehradun, or Haridwar. These cities are well-connected by air, rail, and road from across India. From these points, your journey to Triyuginarayan continues as detailed below:
        </p>
      </div>

      <div className="space-y-8">
        {travelRoutes.map((route) => (
          <Card key={route.from} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
            <CardHeader className="bg-card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle className="font-playfair-display text-2xl md:text-3xl text-foreground">
                    From {route.from} to {route.to}
                  </CardTitle>
                  <CardDescription className="text-md text-muted-foreground mt-1">
                    {route.distance}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 sm:ml-4">
                  {route.originReachability?.train && route.originReachability.trainCity && (
                    <Button asChild size="sm" variant="outline" className="text-xs border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                      <Link href={`https://www.google.com/search?q=trains+to+${encodeURIComponent(route.originReachability.trainCity)}`} target="_blank" rel="noopener noreferrer">
                        <Train className="h-3 w-3 mr-1.5" />
                        Reach {capitalize(route.originReachability.trainCity)} by Train
                      </Link>
                    </Button>
                  )}
                  {route.originReachability?.flight && route.originReachability.flightCity && (
                     <Button asChild size="sm" variant="outline" className="text-xs border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                      <Link href={`https://www.google.com/search?q=flights+to+${encodeURIComponent(route.originReachability.flightCity)}`} target="_blank" rel="noopener noreferrer">
                        <Plane className="h-3 w-3 mr-1.5" />
                        Reach {capitalize(route.originReachability.flightCity)} by Flight
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {route.modes.map((mode) => (
                <div key={mode.type}>
                  <h4 className="text-xl font-semibold font-lora text-primary mb-2 flex items-center">
                    {mode.icon} {mode.type}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-4">
                    {mode.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  {mode.type === 'By Air + Road' && (
                    <div className="mt-3">
                      <Button asChild size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                        <Link href="https://www.ixigo.com/flights" target="_blank" rel="noopener noreferrer">
                          Book Connecting Flights (Ixigo)
                        </Link>
                      </Button>
                    </div>
                  )}
                  {mode.type === 'By Train + Road' && (
                    <div className="mt-3">
                       <Button asChild size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                         <Link href="https://www.ixigo.com/trains" target="_blank" rel="noopener noreferrer">
                           Book Connecting Trains (Ixigo)
                         </Link>
                       </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 bg-destructive/10 border-destructive/30 shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-3 p-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <CardTitle className="font-playfair-display text-2xl text-destructive-foreground">Travel Advisory</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 text-destructive-foreground/80 space-y-2">
          <p>Uttarakhand is a hilly region. Roads can be winding and subject to weather conditions, especially during monsoon (July-August) and winter (Dec-Feb).</p>
          <p>It's advisable to start your road journey early in the morning and avoid driving at night in the hills.</p>
          <p>Check current road conditions and weather forecasts before traveling.</p>
          <p>Ensure your vehicle is in good condition if self-driving. Carry basic medical supplies.</p>
          <p>Network connectivity can be poor in remote areas. Download offline maps.</p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
