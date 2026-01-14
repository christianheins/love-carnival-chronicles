import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Languages, CircleAlert, HeartHandshake, Wine, Music2, Sparkles } from 'lucide-react';
import CountdownTimer from "@/components/CountdownTimer";
import watercolorFlower from '@/assets/watercolor-flower.png';
import MapSection from '@/components/MapSection';
import FebruaryCalendar from '@/components/FebruaryCalendar';
import TimelineSection from '@/components/TimelineSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import BackgroundMusic, { BackgroundMusicHandle } from '@/components/Player';

import Foto_1 from "@/assets/Foto_1.jpeg";
import Foto_2 from "@/assets/Foto_2.jpeg";
import Foto_3 from "@/assets/Foto_3.jpeg";
import Foto_4 from "@/assets/Foto_4.jpeg";
import Foto_5 from "@/assets/Foto_5.jpeg";
import Foto_6 from "@/assets/Foto_6.jpeg";
import Foto_7 from "@/assets/Foto_7.jpeg";
import Foto_8 from "@/assets/Foto_8.jpeg";
import Foto_9 from "@/assets/Foto_9.jpeg";
import Foto_10 from "@/assets/Foto_10.jpeg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeddingPage = () => {
  // Ref with correct interface to control BackgroundMusic imperative handle
  const musicRef = useRef<BackgroundMusicHandle | null>(null);

  useEffect(() => {
    const triggerPlay = () => {
      if (musicRef.current) {
        musicRef.current.play();
        // Remove listeners after first user gesture
        window.removeEventListener('mousedown', triggerPlay);
        window.removeEventListener('mouseup', triggerPlay);
        window.removeEventListener('touchstart', triggerPlay);
        window.removeEventListener('touchend', triggerPlay);
        window.removeEventListener('keydown', triggerPlay);
        window.removeEventListener('scroll', triggerPlay);
        window.removeEventListener('mousemove', triggerPlay);
      }
    };

    window.addEventListener('mousedown', triggerPlay);
    window.addEventListener('mouseup', triggerPlay);
    window.addEventListener('touchstart', triggerPlay);
    window.addEventListener('touchend', triggerPlay);
    window.addEventListener('keydown', triggerPlay);
    window.addEventListener('scroll', triggerPlay);
    window.addEventListener('mousemove', triggerPlay);

    return () => {
      window.removeEventListener('mousedown', triggerPlay);
      window.removeEventListener('mouseup', triggerPlay);
      window.removeEventListener('touchstart', triggerPlay);
      window.removeEventListener('touchend', triggerPlay);
      window.removeEventListener('keydown', triggerPlay);
      window.removeEventListener('scroll', triggerPlay);
      window.removeEventListener('mousemove', triggerPlay);
    };
  }, []);

  const [openAmazon, setOpenAmazon] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  
  const amazonUrl = "https://www.amazon.de/wedding/share/kattychristian";


  // 📨 Notify backend when page is opened
  useEffect(() => {
    const notifyPageOpened = async () => {
      try {
        await fetch('https://www.kattychristian.online/api/page_opened', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (err) {
        console.error('Page open notification failed:', err);
      }
    };

    notifyPageOpened();
  }, []);

  const handleContinue = () => {
    window.open(amazonUrl, "_blank");
    setOpen(false);

    const handleSubmit = async () => {
      try {
        const response = await fetch('https://www.kattychristian.online/api/amazon_link_opened', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || t.rsvpError || 'Something went wrong on the server.');
        }

        const result = await response.json();
        setSuccessMessage(result.message || 'Amazon link open notification sent.');
      } catch (err: any) {
        console.error('Amazon link open error:', err);
        setError(err.message || 'Failed to send notification.');
      } finally {
        setIsLoading(false);
      }

    
    };
    handleSubmit()
  

  };
  
  
  const [isSpanish, setIsSpanish] = useState(true);
  const t = isSpanish ? translations.es : translations.en;

  const images = [
    { src: Foto_1, alt: "First Photo" },
    { src: Foto_2, alt: "Second Photo" },
    { src: Foto_3, alt: "Third Photo" },
    { src: Foto_4, alt: "Fourth Photo" },
    { src: Foto_5, alt: "Fith Photo" },
    { src: Foto_6, alt: "Sixth Photo" },
    { src: Foto_7, alt: "Seventh Photo" },
    { src: Foto_8, alt: "Eight Photo" },
    { src: Foto_9, alt: "Nineth Photo" },
    { src: Foto_10, alt: "Tenth Photo" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
    fade: true,
  };

  // RSVP states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError(t.rsvpNameRequired);
      return;
    }
    if (!email.trim()) {
      setError(t.rsvpEmailRequired);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('https://www.kattychristian.online/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t.rsvpError || 'Something went wrong on the server.');
      }

      const result = await response.json();
      setSuccessMessage(result.message || t.rsvpSuccess);
      setName('');
      setEmail('');
    } catch (err: any) {
      console.error('RSVP submission error:', err);
      setError(err.message || t.rsvpError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-background">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${watercolorFlower})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

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

        {/* Quote */}
        <section className="text-center">
          <blockquote className="text-lg md:text-xl font-playfair italic text-foreground max-w-xl mx-auto leading-relaxed">
            "{t.quote}"
          </blockquote>
        </section>

        {/* Countdown */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary mb-6">
            {t.countdownTitle}
          </h3>
          <CountdownTimer isSpanish={isSpanish} />
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
          <h3 className="text-2xl md:text-3xl font-dancing text-primary text-center mb-8">
            {t.timelineTitle}
          </h3>
          <TimelineSection events={t.timeline} />
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

        {/* ================= GIFT SECTION ================= */}
        <section className="text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary">
            {t.giftTitle}
          </h3>

          <p className="font-playfair text-foreground max-w-xl mx-auto">
            {t.giftDesc}
          </p>

          {/* CARD */}
          <div className="p-6 border border-border rounded-2xl bg-secondary/50 max-w-sm mx-auto shadow-lg space-y-6">

            {/* ================= PRIMARY: MONETARY GIFT ================= */}
            <button
              onClick={() => setOpenBank(true)}
              className="
                w-full
                rounded-xl
                bg-primary
                text-white
                py-4
                text-lg
                font-playfair
                shadow-md
                hover:bg-primary/90
                transition-smooth
              "
            >
              💌 {t.bankGiftLink || "Monetary Gift Options"}
            </button>

            <p className="text-xs text-foreground/70 font-playfair">
              Transferencia bancaria, enlaces de pago o lluvia de sobres
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground font-playfair">
                o
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* ================= SECONDARY: AMAZON ================= */}
            <button
              onClick={() => setOpenAmazon(true)}
              className="
                underline
                text-primary
                hover:text-primary/80
                transition-smooth
                font-playfair
                text-sm
              "
            >
              🎁 {t.giftLink}
            </button>
          </div>

          {/* ================= AMAZON DIALOG ================= */}
          <Dialog open={openAmazon} onOpenChange={setOpenAmazon}>
<DialogContent
  className="
    max-w-lg
    bg-white
    rounded-2xl
    shadow-2xl
    p-6
    max-h-[90vh]
    overflow-y-auto
    overscroll-contain
    md:max-h-none
  "
>              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-dancing text-primary">
                  🎁 {t.giftLink}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 text-foreground text-sm md:text-base font-playfair">
                <p className="text-center">
                  Esta lista reúne algunas cosas que reflejan lo que nos gusta y
                  disfrutamos compartir. ¡Gracias de corazón por tomarse el tiempo
                  de verla y elegir un regalo!
                </p>

                <p className="text-center text-foreground/80">
                  This list brings together things that reflect what we love and
                  enjoy sharing. Thank you for taking the time to check it out!
                </p>

                <p className="text-center font-medium mt-4">
                  Christian Heins & Katty Alzamora
                </p>

                {/* ✅ POSTAL CODE MOVED HERE */}
                <p className="text-center">
                  📦 <span className="font-semibold">
                    {t.giftPostalCode}
                  </span>
                </p>

                <div className="border-t pt-3 mt-3 text-xs md:text-sm text-foreground/80">
                  <p className="text-justify">
                    <strong>NOTA:</strong> AL COMPRAR, SELECCIONEN SOLO LOS PRODUCTOS
                    TAL COMO APARECEN EN LA LISTA, AUNQUE AMAZON OFREZCA OTRAS OPCIONES.
                  </p>

                  <p className="text-justify mt-2">
                    <strong>NOTE:</strong> PLEASE SELECT ONLY THE ITEMS AS THEY APPEAR
                    ON THE LIST, EVEN IF AMAZON SHOWS OTHER BUYING OPTIONS.
                  </p>
                </div>
              </div>

              <DialogFooter className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setOpenAmazon(false)}
                  className="font-playfair"
                >
                  {t.close || "Close"}
                </Button>

                <Button
                  onClick={handleContinue}
                  className="bg-primary hover:bg-primary/80 text-white font-playfair"
                >
                  {t.continue || "Continue to Amazon"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

                
          {/* ================= MONETARY GIFT DIALOG ================= */}
          <Dialog open={openBank} onOpenChange={setOpenBank}>
<DialogContent
  className="
    max-w-lg
    bg-white
    rounded-2xl
    shadow-2xl
    p-6
    max-h-[calc(100vh-2rem)]
    overflow-y-auto
    overscroll-contain
  "
>
          <DialogHeader>
                <DialogTitle className="text-center text-2xl font-dancing text-primary">
                  💌 {t.bankGiftLink || "Monetary Gift Options"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 font-playfair text-foreground text-sm md:text-base">

                {/* Intro */}
                <p className="text-center">
                  Si deseas apoyarnos con un regalo monetario, aquí encontrarás distintas
                  opciones seguras y sencillas. ¡Gracias de corazón! 💕
                </p>

                <p className="text-center text-foreground/80">
                  If you’d like to support us with a monetary gift, you can choose any of
                  the options below. Thank you so much! 💕
                </p>

                {/* ================= BANK TRANSFERS ================= */}
                <div className="space-y-4">
                  <h4 className="text-center font-semibold text-primary">
                    🏦 Transferencia Bancaria / Bank Transfer
                  </h4>

                  {/* N26 Germany */}
                  <div className="border rounded-xl p-4 bg-secondary/50 space-y-1">
                    <p className="font-medium">🇩🇪 N26 Bank (Germany)</p>
                    <p><strong>Account holder:</strong> CHRISTIAN MAURICIO HEINS MARTINEZ</p>
                    <p><strong>IBAN:</strong> DE84 1001 1001 2624 1161 19</p>
                    <p><strong>BIC:</strong> NTSBDEB1XXX</p>
                  </div>

                  {/* Optional second bank */}
                  <div className="border rounded-xl p-4 bg-secondary/50 space-y-1">
                    <p className="font-medium">🇨🇴 Banco en Colombia - Cuenta de ahorros NU BANK Nu Financiera</p>
                    <p><strong>A nombre de de la cuenta:</strong> Christian Mauricio Heins Martinez</p>
                    <p><strong>Cuenta:</strong> 52094374</p>
                    <p><strong>Tipo:</strong> Ahorros</p>
                    <p><strong>Nu Placa:</strong> CHM930</p>
                  </div>
                </div>

                {/* ================= PAYMENT LINKS ================= */}
                <div className="space-y-4">
                  <h4 className="text-center font-semibold text-primary">
                    🔗 Enlaces de Pago / Payment Links
                  </h4>

                  <div className="grid gap-3">
                                        <a
                      href="https://www.paypal.com/pool/9lMg76TORQ?sr=accr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center rounded-lg border px-4 py-3 hover:bg-secondary transition-smooth"
                    >
                      💙 TARJETA DE CREDITO / CREDIT CARD / PAYPAL
                    </a>
      


                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-center text-foreground/70 pt-2">
                  Todas las contribuciones son opcionales y recibidas con muchísimo
                  cariño. 💖
                </p>
              </div>

              <DialogFooter className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setOpenBank(false)}
                  className="font-playfair"
                >
                  {t.close || "Close"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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

        {/* Carousel */}
        <section className="mt-12 w-full">
          <Slider {...sliderSettings}>
            {images.map((image, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-2xl shadow-lg max-h-[500px] object-contain mx-auto"
                />
              </div>
            ))}
          </Slider>
        </section>

        {/* RSVP form */}
        <section className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-dancing text-primary">
            {t.rsvpTitle}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <input
              type="text"
              placeholder={t.rsvpNamePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-input bg-background p-3 rounded-lg text-center font-playfair focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              disabled={isLoading} 
            />
            <input
              type="text"
              placeholder={t.rsvpEmailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-input bg-background p-3 rounded-lg text-center font-playfair focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              disabled={isLoading} 
            />
            {error && <p className="text-red-500 text-sm font-playfair">{error}</p>}
            {successMessage && (
              <p className="text-green-600 text-sm font-playfair">
                {successMessage}
              </p>
            )}
            <Button
              type="submit"
              variant="elegant"
              className="w-full text-lg py-6 font-playfair"
              disabled={isLoading}
            >
              {isLoading ? t.rsvpSubmitting : t.rsvpButton}
            </Button>
          </form>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <span className="font-playfair text-muted-foreground text-sm md:text-base">
            Katty & Christian — {t.date}
          </span>
        </footer>

        {/* Background music player with ref for control */}
        <BackgroundMusic videoId="t3nDazy6XXA" />

      </div>
    </div>
  );
};

const translations = {
  es: {
    mainTitle: "¡Vívelo con Nosotros!",
    quote: "En esta vida, decidimos caminar juntos y construir un presente que le dé sentido a lo que compartimos, celebrando nuestra identidad y nuestro amor en lo cotidiano y lo extraordinario. A continuación encontrarás todos los detalles para acompañarnos en esta gran celebración.",
    countdownTitle: "Nuestro día especial en",
    locationDescription: "Celebraremos nuestro matrimonio en Casa Santacoa, un espacio mágico construido en 1920 que conserva el romanticismo y la esencia barranquillera que tanto queremos compartir contigo. Será un honor recibirte en este patrimonio arquitectónico de estilo neoclásico.",
    intro: "Calle 64 #53-94, Barrio El Prado, Barranquilla, Colombia.",
    locationTitle: "Ubicación",
    timelineTitle: "Lo que viviremos juntos",
    timeline: [
      { icon: HeartHandshake, title: "Ceremonia", time: "16:00" },
      { icon: Wine, title: "Recepción y Cena", time: "18:00" },
      { icon: Music2, title: "Fiesta", time: "20:00" },
      { icon: Sparkles, title: "Cierre", time: "02:00" },
    ],
    dressCodeTitle: "Código de Vestimenta",
    dressCodeDesc: "Queremos que luzcas increíble. Inspírate con esta paleta y estilo.",
    carnivalTitle: "Carnaval de Barranquilla",
    carnivalDates: [
      "February 6 – Guacherna",
      "7 de febrero – Día de la Boda 💕",
      "14 de febrero – Batalla de Flores / Desfile del Rey Momo",
      "15 de febrero – Gran Parada de Tradición",
      "16 de febrero – Gran Parada de Comparsas",
      "17 de febrero – Entierro de Joselito",
      "18 de febrero – Miércoles de ceniza",
    ],
    giftTitle: "Lista de Regalos",
    giftDesc: "Si deseas hacernos un detalle especial, podrás encontrar nuestras opciones aquí. También puedes sorprendernos con el regalo que se te ocurra o con una lluvia de sobres:",
    giftLink: "Lista de regalos en Amazon",
    giftPostalCode: "Código postal para el envío: 10439",
    restrictionsTitle: "Por favor ten en cuenta",
    restrictions: [
      "No hay parqueadero",
      "No se permite el ingreso de mascotas",
      "No se permite el ingreso a menores de 13 años",
    ],
    excitement: "Este día es muy especial para nosotros, y nos llena de alegría poder celebrarlo contigo.",
    rsvpTitle: "¿Cambiaste de opinión?",
    rsvpEmailPlaceholder: "Tu email",
    rsvpNamePlaceholder: "Tu nombre",
    rsvpButton: "No podremos acompañarlos",
    rsvpNameRequired: 'Por favor, ingresa tu nombre.', // Added for RSVP form
    rsvpEmailRequired: 'Por favor, ingresa tu nombre.', // Added for RSVP form
    rsvpSuccess: '¡Gracias por tu respuesta!', // Added for RSVP form
    rsvpError: 'Fallo al enviar la respuesta. Inténtalo de nuevo.', // Added for RSVP form    date: "7 de febrero de 2026"
    rsvpSubmitting: 'Enviando...', // Added for RSVP form loading state
    date: '7 de febrero de 2026',

  },
  en: {
    mainTitle: "¡Vívelo con Nosotros!",
    quote: "In this life, we chose to walk together and build a present that gives meaning to what we share—celebrating our identity and our love, in the ordinary and the extraordinary. Below you'll find all the details to join us in this celebration.",
    countdownTitle: "Until our special day in",
    locationDescription: "We will celebrate our wedding at Casa Santacoa, a magical venue built in 1920 that preserves the romance and Barranquilla spirit we wish to share with you. It will be an honor to welcome you to this neoclassical architectural landmark.",
    intro: "Calle 64 #53-94, Barrio El Prado, Barranquilla, Colombia.",
    locationTitle: "Location",
    timelineTitle: "What We'll Experience Together",
    timeline: [
      { icon: HeartHandshake, title: "Ceremony", time: "16:00" },
      { icon: Wine, title: "Reception & Dinner", time: "18:00" },
      { icon: Music2, title: "Party", time: "20:00" },
      { icon: Sparkles, title: "Closing", time: "02:00" },
    ],
    dressCodeTitle: "Dress Code",
    dressCodeDesc: "We want you to look amazing. Get inspired by this palette and mood.",
    carnivalTitle: "Barranquilla Carnival",
    carnivalDates: [
      "February 6 – Guacherna",
      "7 de febrero – Wedding day 💕",
      "14 de febrero – Batalla de Flores / Desfile del Rey Momo",
      "15 de febrero – Gran Parada de Tradicion",
      "16 de febrero – Gran Parada de Comparsas",
      "17 de febrero – Entierro de Joselito",
      "18 de febrero – Miercoles de ceniza",
    ],
    giftTitle: "Gift List",
    giftDesc: "If you’d like to give us a special gift, you can find our options here. You can also surprise us with something of your own choice — or take part in a “shower of envelopes,” a traditional way to share your best wishes with a little something inside.",
    giftLink: "Amazon Gift Registry",
    giftPostalCode: "Shipping postal code: 10439",
    restrictionsTitle: "Please Note",
    restrictions: [
      "No parking available",
      "No pets allowed",
      "No entry for children under 13",
    ],
    excitement: "This day is truly special to us, and it fills us with joy to celebrate it with you.",
    rsvpTitle: "Changed Your Mind?",
    rsvpEmailPlaceholder: "Your email",
    rsvpNamePlaceholder: "Your name",
    rsvpButton: "We won't be able to attend",
    rsvpEmailRequired: 'Please enter your email.', // Added for RSVP form
    rsvpNameRequired: 'Please enter your name.', // Added for RSVP form
    rsvpSuccess: 'Thank you for your response!', // Added for RSVP form
    rsvpSubmitting: 'Submitting...', // Added for RSVP form loading state
    rsvpError: 'Failed to submit response. Please try again.', // Added for RSVP form
    date: "February 7, 2026"
  }
};

export default WeddingPage;