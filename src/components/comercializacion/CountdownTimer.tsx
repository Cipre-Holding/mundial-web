import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

const CountdownTimer = () => {
  // World Cup 2026 starts June 11, 2026
  const targetDate = new Date("2026-06-11T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { value: timeLeft.days, label: "DÍAS" },
    { value: timeLeft.hours, label: "HORAS" },
    { value: timeLeft.minutes, label: "MINUTOS" },
    { value: timeLeft.seconds, label: "SEGUNDOS" },
  ];

  return (
    <div className="scoreboard rounded-3xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Timer className="h-5 w-5 text-accent" />
        <p className="text-primary-foreground/70 text-sm uppercase tracking-[0.2em] font-semibold">
          Cuenta regresiva para el Mundial
        </p>
      </div>
      
      <div className="flex justify-center gap-3 md:gap-6">
        {timeBlocks.map((block, index) => (
          <div key={block.label} className="text-center">
            <div className="relative">
              {/* Main number display */}
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl md:rounded-2xl px-3 py-4 md:px-6 md:py-6 min-w-[60px] md:min-w-[90px] border border-gray-700 shadow-inner overflow-hidden">
                {/* LED-style dots effect */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-0.5">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className="bg-white rounded-full" />
                    ))}
                  </div>
                </div>
                
                {/* Number with glow */}
                <span className="relative text-3xl md:text-5xl font-black text-accent drop-shadow-[0_0_10px_hsl(45_93%_47%/0.5)]" 
                  style={{ fontFamily: "'Courier New', monospace" }}>
                  {block.value.toString().padStart(2, "0")}
                </span>
                
                {/* Reflection line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              
              {/* Bottom screws decoration */}
              <div className="absolute -bottom-1 left-2 w-2 h-2 bg-gray-600 rounded-full hidden md:block" />
              <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-600 rounded-full hidden md:block" />
            </div>
            
            <span className="text-[10px] md:text-xs text-primary-foreground/50 mt-3 block font-bold tracking-wider">
              {block.label}
            </span>
          </div>
        ))}
      </div>

      {/* Event info */}
      <div className="mt-6 pt-6 border-t border-gray-700/50 flex items-center justify-center gap-6 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-primary-foreground/60">México</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary-foreground/60">USA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary-foreground/60">Canadá</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
