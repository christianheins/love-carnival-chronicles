import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  isSpanish: boolean;
}

const CountdownTimer = ({ isSpanish }: CountdownTimerProps) => {
  const weddingDate = new Date('2026-02-07T16:00:00-05:00'); // 4 PM Colombia time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = weddingDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const labels = isSpanish
    ? { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' }
    : { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col items-center bg-card border border-border rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg transition-smooth hover:shadow-xl"
        >
          <span className="text-3xl md:text-4xl font-bold text-primary font-playfair">
            {value}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-1 font-playfair">
            {labels[key as keyof typeof labels]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
