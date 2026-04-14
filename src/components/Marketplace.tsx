import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Tag, Hotel, Plane } from "lucide-react";
import { motion } from "motion/react";

const MOCK_BOOKINGS = [
  {
    id: 1,
    type: 'hotel',
    provider: 'Marriott Bonvoy',
    location: 'Paris, France',
    dates: 'Jun 12 - Jun 15, 2026',
    originalPrice: 1200,
    price: 850,
    image: 'https://picsum.photos/seed/paris/800/600',
    discount: '29% OFF'
  },
  {
    id: 2,
    type: 'flight',
    provider: 'British Airways',
    location: 'London → New York',
    dates: 'Jul 04, 2026',
    originalPrice: 950,
    price: 600,
    image: 'https://picsum.photos/seed/london/800/600',
    discount: '37% OFF'
  },
  {
    id: 3,
    type: 'hotel',
    provider: 'Four Seasons',
    location: 'Bali, Indonesia',
    dates: 'Aug 20 - Aug 27, 2026',
    originalPrice: 3500,
    price: 2400,
    image: 'https://picsum.photos/seed/bali/800/600',
    discount: '31% OFF'
  },
  {
    id: 4,
    type: 'hotel',
    provider: 'The Ritz-Carlton',
    location: 'Tokyo, Japan',
    dates: 'Sep 10 - Sep 14, 2026',
    originalPrice: 1800,
    price: 1300,
    image: 'https://picsum.photos/seed/tokyo/800/600',
    discount: '28% OFF'
  }
];

export default function Marketplace() {
  return (
    <section id="marketplace" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Deals</h2>
            <p className="text-white/60">Verified bookings available for immediate transfer.</p>
          </div>
          <Button variant="link" className="text-white/60 hover:text-white">View all deals</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BOOKINGS.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-white/20 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={booking.image} 
                    alt={booking.location} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white text-black font-bold">{booking.discount}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                      {booking.type === 'hotel' ? <Hotel className="w-4 h-4" /> : <Plane className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center gap-1 text-xs text-white/40 uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3" />
                    {booking.location}
                  </div>
                  <h3 className="text-lg font-bold text-white truncate">{booking.provider}</h3>
                </CardHeader>
                
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                    <Calendar className="w-4 h-4" />
                    {booking.dates}
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">${booking.price}</span>
                    <span className="text-sm text-white/40 line-through">${booking.originalPrice}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-white/10 text-white hover:bg-white hover:text-black transition-all border-none">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
