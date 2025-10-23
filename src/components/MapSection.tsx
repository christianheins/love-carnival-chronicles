import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapSectionProps {
  isSpanish: boolean;
}

const MapSection = ({ isSpanish }: MapSectionProps) => {
  const venueAddress = "Casa Santacoa, Calle 64 #53-94, Barrio El Prado, Barranquilla, Colombia";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Casa+Santacoa+Calle+64+53-94+Barrio+El+Prado+Barranquilla+Colombia";
  const wazeUrl = "https://www.waze.com/ul?q=Casa+Santacoa+Calle+64+53-94+Barrio+El+Prado+Barranquilla+Colombia";

  return (
    <div className="space-y-4">
      {/* Address Info */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-lg text-foreground mb-2 font-playfair">
              Casa Santacoa
            </h4>
            <p className="text-muted-foreground font-playfair">
              Calle 64 #53-94<br />
              Barrio El Prado<br />
              Barranquilla, Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="rounded-xl overflow-hidden border border-border shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3564892876816!2d-74.81000!3d10.99000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU5JzI0LjAiTiA3NMKwNDgnMzYuMCJX!5e0!3m2!1sen!2sco!4v1234567890"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Casa Santacoa Location"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          asChild
          variant="outline"
          className="flex-1 transition-smooth hover:bg-primary hover:text-primary-foreground"
        >
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="w-4 h-4 mr-2" />
            {isSpanish ? 'Abrir en Google Maps' : 'Open in Google Maps'}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 transition-smooth hover:bg-accent hover:text-accent-foreground"
        >
          <a href={wazeUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="w-4 h-4 mr-2" />
            {isSpanish ? 'Abrir en Waze' : 'Open in Waze'}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MapSection;
