import type { GeoLocation } from '@/lib/types';

interface LocationMapProps {
  location: GeoLocation;
  businessName: string;
}

export default function LocationMap({ location, businessName }: LocationMapProps) {
  const embedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground mb-4">Location</h2>

      <div className="rounded-xl overflow-hidden border border-border mb-3" style={{ height: 280 }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map: ${businessName}`}
        />
      </div>

      <p className="text-sm text-muted-foreground flex items-start gap-1.5">
        <span>📍</span>
        <span>{location.address}</span>
      </p>

      {location.googleMapsUrl && (
        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 text-sm text-gold hover:underline"
        >
          Get Directions →
        </a>
      )}
    </section>
  );
}
