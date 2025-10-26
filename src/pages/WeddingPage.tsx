import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Languages, CircleAlert } from 'lucide-react';
import CountdownTimer from "@/components/CountdownTimer";
import watercolorFlower from '@/assets/watercolor-flower-cool.png';
import MapSection from '@/components/MapSection';
import FebruaryCalendar from '@/components/FebruaryCalendar';

const WeddingPage = () => {
  const [isSpanish, setIsSpanish] = useState(true);
  const t = isSpanish ? translations.es : translations.en;

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Background watermark */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-15"
        style={{
          backgroundImage: `url(${watercolorFlower})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Language toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsSpanish(!isSpanish)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm transition-smooth"
        >
          <Languages className="w-4 h-4 mr-2" />
          {isSpanish ? 'EN' : 'ES'}
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[90%] md:max-w-[800px] px-4 py-12 space-y-16">
        {/* Main Title Hero */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-5xl md:text-6xl font-dancing text-foreground mb-12">
            {t.mainTitle}
          </h1>
          <p className="text-sm md:text-base font-playfair text-foreground tracking-[0.2em] uppercase">
            Katty Alzamora & Christian Heins
          </p>
        </section>


        {/* Countdown */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary mb-6">
            {t.countdownTitle}
          </h3>
          <CountdownTimer isSpanish={isSpanish} />
        </section>

        {/* Quote */}
        <section className="text-center">
          <blockquote className="text-lg md:text-xl font-playfair italic text-foreground max-w-xl mx-auto leading-relaxed">
            "{t.quote}"
          </blockquote>
        </section>

        {/* Map and Location */}
        <section>
          <h3 className="text-2xl md:text-3xl font-dancing text-primary text-center mb-6">
            {t.locationTitle}
          </h3>
          <p className="text-center text-base md:text-lg font-playfair text-foreground mb-6 max-w-2xl mx-auto">
            {t.locationDescription}
          </p>
          <MapSection isSpanish={isSpanish} />
        </section>

        {/* Timeline */}
        <section>
          <h3 className="text-2xl md:text-3xl font-dancing text-primary text-center mb-6">
            {t.timelineTitle}
          </h3>
          <div className="grid gap-4 text-center font-playfair text-foreground">
            <div>
              💍 {t.timeline.ceremony}
            </div>
            <div>
              🥂 {t.timeline.reception}
            </div>
            <div>
              🎶 {t.timeline.party}
            </div>
          </div>
        </section>

        {/* Dress code */}
        <section className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary mb-4">{t.dressCodeTitle}</h3>
          <p className="font-playfair text-foreground">{t.dressCodeDesc}</p>
          <a
            href="https://pin.it/6EmDI9t8L"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline text-primary hover:text-primary/80 transition-smooth font-playfair"
          >
            Pinterest Board ↗
          </a>
        </section>

        {/* Carnival */}
        <section>
          <h3 className="text-2xl md:text-3xl font-dancing text-primary text-center mb-6">
            {t.carnivalTitle}
          </h3>
          <FebruaryCalendar isSpanish={isSpanish} />
          <ul className="space-y-2 text-center text-foreground font-playfair">
            {t.carnivalDates.map((item, idx) => (
              <li key={idx} className="text-sm md:text-base">{item}</li>
            ))}
          </ul>
        </section>

        {/* Gift list */}
        <section className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary">{t.giftTitle}</h3>
          <p className="font-playfair text-foreground">{t.giftDesc}</p>
          <div className="p-6 border border-border rounded-xl bg-secondary/50 max-w-sm mx-auto shadow-md">
            <p className="font-playfair text-foreground">{t.giftPlaceholder}</p>
          </div>
        </section>

        {/* Restrictions */}
        <section>
          <h3 className="text-2xl md:text-3xl font-dancing text-primary text-center mb-6">
            {t.restrictionsTitle}
          </h3>
          <ul className="space-y-3 text-center font-playfair text-foreground">
            {t.restrictions.map((item, idx) => (
              <li key={idx} className="flex items-center justify-center gap-2">
                <CircleAlert className="w-5 h-5 text-destructive flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Excitement */}
        <section className="py-10 px-6 text-center">
          <div className="bg-secondary/50 rounded-xl p-8 border border-border shadow-lg">
            <p className="text-lg md:text-xl text-foreground font-playfair italic">{t.excitement}</p>
          </div>
        </section>

        {/* RSVP */}
        <section className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary">{t.rsvpTitle}</h3>
          <form className="space-y-4 max-w-sm mx-auto">
            <input
              type="text"
              placeholder={t.rsvpNamePlaceholder}
              className="w-full border border-input bg-background p-3 rounded-lg text-center font-playfair focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            />
            <Button
              type="submit"
              variant="elegant"
              className="w-full text-lg py-6 font-playfair"
            >
              {t.rsvpButton}
            </Button>
          </form>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <span className="font-playfair text-muted-foreground text-sm md:text-base">
            Katty & Christian — {t.date}
          </span>
        </footer>
      </div>
    </div>
  );
};

const translations = {
  es: {
    mainTitle: "¡Vívelo con Nosotros!",
    quote: "En esta vida, decidimos caminar juntos y construir un presente que le dé sentido a lo que compartimos, celebrando nuestra identidad y nuestro amor en lo cotidiano y lo extraordinario. A continuación encontrarás todos los detalles para acompañarnos en esta gran celebración.",
    countdownTitle: "Nuestro día especial en",
    locationDescription: "Celebraremos nuestro matrimonio en Casa Santacoa, un espacio mágico construido en 1920 que conserva el romanticismo y la esencia barranquillera que tanto queremos compartir contigo. Será un honor recibirte en este patrimonio arquitectónico de estilo neoclásico, donde los recuerdos cobran vida.",
    intro: "Calle 64 #53-94, Barrio El Prado, Barranquilla, Colombia.",
    locationTitle: "Ubicación",
    timelineTitle: "Lo que viviremos juntos",
    timeline: {
      ceremony: "Ceremonia | 16:00–17:45",
      reception: "Recepción y Cena | 18:00–19:30",
      party: "Fiesta | 20:00–2:00",
    },
    dressCodeTitle: "Código de Vestimenta",
    dressCodeDesc: "Queremos que luzcas increíble. Inspírate con esta paleta y estilo.",
    carnivalTitle: "Carnaval de Barranquilla",
    carnivalDates: [
      "7 de febrero – Día de la Boda 💕",
      "14 de febrero – Guacherna",
      "15 de febrero – Batalla de Flores",
      "16 de febrero – Desfile del Rey Momo",
      "17 de febrero – Gran Parada",
      "18 de febrero – Entierro de Joselito",
    ],
    giftTitle: "Lista de Regalos",
    giftDesc: "Si deseas hacernos un detalle especial, podrás encontrar nuestras opciones aquí:",
    giftPlaceholder: "Pronto compartiremos nuestro enlace de Amazon 🎁",
    restrictionsTitle: "Por favor ten en cuenta",
    restrictions: [
      "No hay parqueadero",
      "No se permite el ingreso de mascotas",
      "No se permite el ingreso a menores de 13 años",
    ],
    excitement: "Este día es muy especial para nosotros, y nos llena de alegría poder celebrarlo contigo.",
    rsvpTitle: "¿Cambiaste de opinión?",
    rsvpNamePlaceholder: "Tu nombre",
    rsvpButton: "No podremos acompañarlos",
    date: "7 de febrero de 2026"
  },
  en: {
    mainTitle: "¡Vívelo con Nosotros!",
    quote: "In this life, we chose to walk together and build a present that gives meaning to what we share—celebrating our identity and our love, in the ordinary and the extraordinary. Below you'll find all the details to join us in this celebration.",
    countdownTitle: "Until our special day in",
    locationDescription: "We will celebrate our wedding at Casa Santacoa, a magical venue built in 1920 that preserves the romance and Barranquilla spirit we wish to share with you. It's a neoclassical architectural landmark where memories come alive, and we'd be honored to welcome you there.",
    intro: "Calle 64 #53-94, Barrio El Prado, Barranquilla, Colombia.",
    locationTitle: "Location",
    timelineTitle: "What We'll Experience Together",
    timeline: {
      ceremony: "Ceremony | 16:00–17:45",
      reception: "Reception & Dinner | 18:00–19:30",
      party: "Party | 20:00–2:00",
    },
    dressCodeTitle: "Dress Code",
    dressCodeDesc: "We want you to look amazing. Get inspired by this palette and mood.",
    carnivalTitle: "Barranquilla Carnival",
    carnivalDates: [
      "February 7 – Wedding Day 💕",
      "February 14 – Guacherna",
      "February 15 – Batalla de Flores",
      "February 16 – Desfile del Rey Momo",
      "February 17 – Gran Parada",
      "February 18 – Entierro de Joselito",
    ],
    giftTitle: "Gift List",
    giftDesc: "If you'd like to make us a special gift, you'll find our options here:",
    giftPlaceholder: "We'll share our Amazon link soon 🎁",
    restrictionsTitle: "Please Note",
    restrictions: [
      "No parking available",
      "No pets allowed",
      "No entry for children under 13",
    ],
    excitement: "This day is truly special to us, and it fills us with joy to celebrate it with you.",
    rsvpTitle: "Changed Your Mind?",
    rsvpNamePlaceholder: "Your name",
    rsvpButton: "We won't be able to attend",
    date: "February 7, 2026"
  }
};

export default WeddingPage;
