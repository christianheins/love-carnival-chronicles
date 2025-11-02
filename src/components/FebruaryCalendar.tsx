import { Heart } from 'lucide-react';

interface FebruaryCalendarProps {
  isSpanish: boolean;
}

const FebruaryCalendar = ({ isSpanish }: FebruaryCalendarProps) => {
  // February 2026 starts on a Sunday
  const daysInMonth = 28;
  const startDay = 0; // Sunday
  const weekDays = isSpanish 
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Special dates in February 2026
  const specialDates = [6, 7, 14, 15, 16, 17, 18];
  const weddingDay = 7;

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg mb-6">
      <h4 className="text-center font-bold text-xl mb-4 text-primary font-dancing">
        {isSpanish ? 'Febrero 2026' : 'February 2026'}
      </h4>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-semibold text-muted-foreground p-2 font-playfair"
          >
            {day}
          </div>
        ))}
        
        {/* Empty cells before month starts */}
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {/* Calendar days */}
        {days.map((day) => {
          const isWedding = day === weddingDay;
          const isSpecial = specialDates.includes(day);
          
          return (
            <div
              key={day}
              className={`
                relative aspect-square flex items-center justify-center rounded-lg p-2 text-sm md:text-base font-playfair
                transition-smooth
                ${isWedding 
                  ? 'bg-primary text-primary-foreground font-bold shadow-lg scale-110' 
                  : isSpecial 
                    ? 'bg-accent/30 text-accent-foreground font-semibold border border-accent' 
                    : 'text-foreground hover:bg-secondary'
                }
              `}
            >
              {day}
              {isWedding && (
                <Heart className="absolute -top-1 -right-1 w-3 h-3 fill-current text-primary-foreground" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs md:text-sm font-playfair">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
            <Heart className="w-2 h-2 fill-current text-primary-foreground" />
          </div>
          <span className="text-muted-foreground">
            {isSpanish ? 'Día de la Boda' : 'Wedding Day'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/30 border border-accent rounded" />
          <span className="text-muted-foreground">
            {isSpanish ? 'Eventos de Carnaval' : 'Carnival Events'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FebruaryCalendar;
