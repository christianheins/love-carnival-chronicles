import { LucideIcon } from 'lucide-react';

interface TimelineEvent {
  icon: LucideIcon;
  title: string;
  time: string;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const TimelineSection = ({ events }: TimelineSectionProps) => {
  return (
    <div className="w-full overflow-x-auto pb-6 scrollbar-hide">
      <div className="flex gap-8 md:gap-12 min-w-max md:min-w-0 md:justify-center px-6">
        {events.map((event, index) => (
          <div key={index} className="flex flex-col items-center space-y-4 min-w-[140px] animate-fade-in">
            {/* Circular icon container with enhanced styling */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 border-3 border-pink-200/60 flex items-center justify-center shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105">
                <event.icon className="w-10 h-10 text-primary/80 stroke-[1.5]" />
              </div>
              {/* Elegant connecting line */}
              {index < events.length - 1 && (
                <div className="hidden md:block absolute top-12 left-24 w-12 h-[2px] bg-gradient-to-r from-pink-200/60 via-rose-200/40 to-amber-100/60" />
              )}
            </div>
            
            {/* Event details with refined typography */}
            <div className="text-center space-y-2">
              <p className="font-playfair text-foreground text-base md:text-lg font-medium tracking-wide">
                {event.title}
              </p>
              <p className="font-playfair text-primary text-lg md:text-xl font-semibold">
                {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;