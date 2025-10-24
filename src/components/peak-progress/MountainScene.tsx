
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mountain, CheckCircle2, HeartPulse, BrainCircuit, Watch } from 'lucide-react';
import type { UserData } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { parseISO } from 'date-fns';


const Climber = (props: React.SVGProps<SVGSVGElement>) => (
    <motion.g {...props}>
      <motion.rect x="18" y="15" width="4" height="14" fill="#333" />
      <motion.rect x="18" y="15" width="4" height="14" transform="rotate(20 20 22)" fill="#333" />
      <motion.path d="M 20 16 L 28 14" stroke="#333" strokeWidth="3" />
      <motion.path d="M 22 18 L 14 23" stroke="#333" strokeWidth="3" />

      <motion.path d="M15,22 C14,20 14,18 16,16 L18,18 L20,20 C22,20 24,20 25,22 L22,25 C20,26 18,26 15,22 Z" fill="#2E8B57" />

      <motion.circle cx="20" cy="10" r="6" fill="#F0E68C" />
    </motion.g>
  );

  const Cloud = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn("absolute bg-white/80 rounded-full", className)} {...props} />
  );

export function MountainScene({ userData, daysSinceQuitting, debugHour }: { userData: UserData, daysSinceQuitting: number, debugHour: number | null }) {
  const MAX_DAYS_TO_PEAK = 90;
  
  const peaksConquered = Math.floor(daysSinceQuitting / MAX_DAYS_TO_PEAK);
  const daysInCurrentClimb = daysSinceQuitting % MAX_DAYS_TO_PEAK;
  
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const quitDateTime = parseISO(userData.quitDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - quitDateTime;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setTimeElapsed(formattedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [userData.quitDate]);


  const progress = useMemo(() => {
    if (daysSinceQuitting > 0 && daysInCurrentClimb === 0) {
      // If it's a multiple of 90 (but not 0), they are at the peak.
      return 1;
    }
    return daysInCurrentClimb / MAX_DAYS_TO_PEAK;
  }, [daysSinceQuitting, daysInCurrentClimb]);

  const [effectiveHour, setEffectiveHour] = useState(new Date().getHours());

  useEffect(() => {
    setEffectiveHour(debugHour !== null ? debugHour : new Date().getHours());
  }, [debugHour]);

  const isNight = effectiveHour >= 18 || effectiveHour < 6;
  const altitude = daysSinceQuitting * 5; // Simplified altitude calculation
  
  // Path definition (simplified cubic bezier)
  const startX = 50, startY = 250;
  const c1x = 120, c1y = 180;
  const c2x = 220, c2y = 100;
  const peakX = 280, peakY = 50;

  // Function to get point on a cubic bezier curve
  const getPointOnCurve = (t: number) => {
    const x = (1-t)**3 * startX + 3*(1-t)**2*t*c1x + 3*(1-t)*t**2*c2x + t**3*peakX;
    const y = (1-t)**3 * startY + 3*(1-t)**2*t*c1y + 3*(1-t)*t**2*c2y + t**3*peakY;
    return { x, y };
  }

  const hikerPosition = useMemo(() => getPointOnCurve(progress), [progress]);

  const hikerX = useSpring(hikerPosition.x, { stiffness: 100, damping: 30 });
  const hikerY = useSpring(hikerPosition.y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    hikerX.set(hikerPosition.x);
    hikerY.set(hikerPosition.y);
  }, [hikerPosition, hikerX, hikerY]);


  const milestoneIcons = [
      { icon: HeartPulse, days: 1, title: "Improved Circulation", description: "After just 1 day, your circulation improves, and your heart attack risk starts to drop." },
      { icon: Watch, days: 7, title: "Reduced Cravings", description: "After 1 week, nicotine cravings and withdrawal symptoms are significantly reduced." },
      { icon: BrainCircuit, days: 30, title: "Normalized Brain Chemistry", description: "After 30 days, your brain chemistry is returning to normal, reducing irritability and anxiety." },
  ];

  return (
    <Card className="w-full aspect-[4/3] relative overflow-hidden flex items-center justify-center transition-colors duration-500 bg-background">
        {/* Background Gradient */}
        <div className={cn(
            "absolute inset-0 w-full h-full bg-gradient-to-b from-orange-300 via-pink-300 to-blue-400 transition-all duration-1000",
            isNight && "from-blue-900 via-purple-900 to-gray-900"
        )} />

        {/* Sun/Moon */}
        <motion.div
            className="absolute top-8 h-12 w-12 rounded-full bg-yellow-200/80 shadow-2xl shadow-yellow-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
                y: isNight ? 10 : 0, 
                opacity: 1, 
                backgroundColor: isNight ? '#E0E7FF' : '#FEF3C7',
                boxShadow: isNight ? '0 0 25px 5px #A5B4FC' : '0 0 25px 5px #FCD34D'
            }}
            transition={{ duration: 1 }}
        />

        {/* Clouds */}
        <motion.div
          className="absolute top-1/4 w-full h-1/2"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
        >
          <Cloud className={cn("w-64 h-16 top-10 left-1/4", isNight && 'bg-gray-500/30')} />
          <Cloud className={cn("w-48 h-12 top-20 left-3/4", isNight && 'bg-gray-600/30')} />
        </motion.div>
         <motion.div
          className="absolute top-1/3 w-full h-1/2"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
        >
          <Cloud className={cn("w-56 h-14 top-5 left-1/2", isNight && 'bg-gray-500/40')} />
          <Cloud className={cn("w-72 h-20 top-24 left-1/4", isNight && 'bg-gray-600/40')} />
        </motion.div>


        {/* Mountains */}
        <svg
            viewBox="0 0 400 300"
            className="absolute bottom-0 left-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Background Mountains */}
             <path 
                d="M 150,300 L 220,100 L 290,300 Z"
                className={cn("transition-colors duration-500", isNight ? "fill-purple-800/60" : "fill-blue-300/60")}
            />
             <path 
                d="M 250,300 L 320,150 L 390,300 Z"
                className={cn("transition-colors duration-500", isNight ? "fill-indigo-800/50" : "fill-cyan-300/50")}
            />

            {/* Main Mountain */}
            <path
                d={`M -50,300 L ${peakX},${peakY} L 450,300 Z`}
                className={cn("transition-colors duration-500", isNight ? "fill-indigo-900" : "fill-cyan-600")}
            />
            {/* Snow Cap */}
            <path 
                d={`M ${peakX},${peakY} L ${peakX - 40},${peakY + 80} L ${peakX + 40},${peakY + 80} Z`}
                className={cn("transition-colors duration-500", isNight ? "fill-gray-400/80" : "fill-white/90")}
            />
            {/* Dotted Path */}
            <path
                d={`M ${startX},${startY} C ${c1x},${c1y} ${c2x},${c2y} ${peakX},${peakY}`}
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 6"
                strokeOpacity="0.7"
            />
            
            {/* Climber Icon */}
            <motion.g style={{ x: hikerX, y: hikerY, rotate: 10 }}>
                <Climber 
                    style={{ transform: 'translate(-20px, -28px) scale(0.9)'}}
                />
            </motion.g>

        </svg>

        {/* Day Counter */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 text-white/90 drop-shadow-lg">
            <p className="text-5xl font-bold">DAY {daysSinceQuitting}</p>
            <p className="text-lg font-semibold tracking-wider">{altitude}m CLIMBED</p>
        </div>
        
        {/* Peaks Conquered */}
        {peaksConquered > 0 && (
          <div className="absolute top-4 left-4 flex items-center gap-2 text-white/90 bg-black/20 p-2 rounded-lg">
            <Mountain className="h-5 w-5" />
            <span className="font-bold">{peaksConquered} {peaksConquered > 1 ? 'Peaks' : 'Peak'} Conquered</span>
          </div>
        )}

        {/* Elapsed Time Timer */}
        <div className="absolute bottom-4 right-4 text-white/90 drop-shadow-lg text-right">
            <p className="text-2xl font-bold font-mono tracking-widest">{timeElapsed}</p>
        </div>

        {/* Health Milestones */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-4">
            {milestoneIcons.map((item, index) => {
                const achieved = daysSinceQuitting >= item.days;
                return (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <motion.button
                                className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center relative cursor-pointer border-none"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.2 }}
                                aria-label={`View ${item.title} milestone`}
                            >
                                <item.icon className="h-6 w-6 text-white/80" />
                                {achieved && (
                                    <CheckCircle2 className="h-5 w-5 text-green-400 bg-white rounded-full absolute -top-1 -right-1" />
                                )}
                            </motion.button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <item.icon className="h-6 w-6 text-primary" />
                                {item.title}
                            </DialogTitle>
                            <DialogDescription className="pt-4 text-base">
                                {achieved 
                                ? item.description 
                                : `You are ${item.days - daysSinceQuitting} day(s) away from this milestone. Keep going!`}
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                );
            })}
        </div>
    </Card>
  );
}
